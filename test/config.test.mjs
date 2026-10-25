import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { ESLint } from 'eslint';
import config from '../index.mjs';

const fixtures = [
    {
        name: 'valid Preact component and refs',
        code: `import { createRef, render } from 'preact';
import type { VNode } from 'preact';

const imageRef = createRef<HTMLImageElement>();

export default function Example(): VNode {
    return <img ref={imageRef} src="example.png" alt="Example" />;
}

render(<Example />, document.body);
`,
        expected: [],
    },
    {
        name: 'missing list keys',
        code: 'export const items = [<span />];\n',
        expected: ['@eslint-react/no-missing-key'],
    },
    {
        name: 'duplicate list keys',
        code: 'export const items = [<span key="same" />, <span key="same" />];\n',
        expected: ['@eslint-react/no-duplicate-key'],
    },
    {
        name: 'conditional Preact hook',
        code: `import { useState } from 'preact/hooks';
import type { VNode } from 'preact';
export default function Example({ active }: { active: boolean }): VNode {
    if (active) { useState(0); }
    return <span />;
}
`,
        expected: ['@eslint-react/rules-of-hooks'],
    },
    {
        name: 'missing Preact effect dependency',
        code: `import { useEffect } from 'preact/hooks';
import type { VNode } from 'preact';
export default function Example({ value }: { value: string }): VNode {
    useEffect(() => { console.error(value); }, []);
    return <span>{value}</span>;
}
`,
        expected: ['@eslint-react/exhaustive-deps'],
    },
    {
        name: 'accessibility remains enabled',
        code: 'export const image = <img src="example.png" />;\n',
        expected: ['jsx-a11y-x/alt-text'],
    },
];

test('migrated config lints Preact TypeScript with ESLint 10', async (t) => {
    const directory = await mkdtemp(path.join(process.cwd(), 'config-test-'));
    try {
        await writeFile(
            path.join(directory, 'tsconfig.json'),
            JSON.stringify({
                compilerOptions: {
                    strict: true,
                    jsx: 'react-jsx',
                    jsxImportSource: 'preact',
                    module: 'NodeNext',
                    moduleResolution: 'NodeNext',
                    target: 'ES2022',
                    skipLibCheck: true,
                },
                include: ['*.tsx'],
            }),
        );
        const paths = await Promise.all(
            fixtures.map(async (fixture, index) => {
                const file = path.join(directory, `fixture-${index}.tsx`);
                await writeFile(file, fixture.code);
                return file;
            }),
        );
        const eslint = new ESLint({ overrideConfigFile: true, overrideConfig: config });
        const results = await eslint.lintFiles(paths);
        for (const [index, fixture] of fixtures.entries()) {
            await t.test(fixture.name, () => {
                const result = results.find(({ filePath }) => filePath === paths[index]);
                assert.ok(result);
                assert.equal(result.fatalErrorCount, 0, JSON.stringify(result.messages));
                if (fixture.expected.length === 0) {
                    assert.deepEqual(result.messages, []);
                } else {
                    for (const ruleId of fixture.expected) {
                        assert.ok(
                            result.messages.some((message) => message.ruleId === ruleId),
                            `Expected ${ruleId}: ${JSON.stringify(result.messages)}`,
                        );
                    }
                }
            });
        }
    } finally {
        await rm(directory, { recursive: true, force: true });
    }
});

test('ESLint 10 tracks JSX references without the legacy React plugin', async () => {
    const eslint = new ESLint({
        overrideConfigFile: true,
        overrideConfig: [...config, { files: ['**/*.jsx'] }],
    });
    const [result] = await eslint.lintText('const Example = () => <Missing />;\nexport default <Example />;\n', {
        filePath: 'jsx-references.jsx',
    });
    assert.equal(result.fatalErrorCount, 0);
    assert.ok(result.messages.some(({ ruleId, message }) => ruleId === 'no-undef' && message.includes('Missing')));
    assert.ok(!result.messages.some(({ ruleId }) => ruleId === 'no-unused-vars'));
});
