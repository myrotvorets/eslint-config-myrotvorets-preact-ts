# eslint-config-myrotvorets-preact-ts

ESLint configuration for Preact (TypeScript).

Requires ESLint 10 and Node.js `^20.19.0 || ^22.13.0 || >=24`.

The config installs its directly used plugins as dependencies. ESLint remains a
peer dependency; the base TypeScript config declares its own plugin requirements.
Preact is a development dependency used only for this package's tests.

Uses `@eslint-react/eslint-plugin`'s `recommended-typescript` preset with
`react-x.importSource` set to `preact`. The analyzer retains the previous React
compatibility level (`16.0.0`) to avoid React 19 migration suggestions in Preact
projects. Type-aware rules use the base TypeScript config's project service, so
TypeScript files must be included in a `tsconfig.json`.

## Migration from the previous config

`eslint-plugin-react` and `eslint-plugin-react-hooks` are no longer required.
`@eslint-react/eslint-plugin` is installed by this config. The new preset includes
`@eslint-react/rules-of-hooks` and `@eslint-react/exhaustive-deps`, which also check
hooks imported from `preact/hooks`.

Rule overrides now use the `@eslint-react/*` namespace. For example,
`react/jsx-key` is replaced by `@eslint-react/no-missing-key`,
`@eslint-react/no-duplicate-key`, and the type-aware
`@eslint-react/no-implicit-key`. The config also maps comment text, display names,
unsafe link targets, dangerous HTML, and lifecycle state updates to their new
rules. The new recommended preset adds checks, so diagnostics can change.

This is not an exact rule-for-rule replacement:

- JSX formatting is handled by Prettier. ESLint 10 tracks JSX variable references
  natively, replacing the old JSX scope and variable usage rules.
- TypeScript checks duplicate JSX props. The new plugin does not provide the old
  `jsx-no-duplicate-props` or `jsx-no-bind` checks out of the box.
- Legacy class rules without direct equivalents are removed: `prefer-es6-class`,
  `prefer-stateless-function`, `require-render-return`, `no-is-mounted`,
  `no-string-refs`, and `sort-comp`.
- React Compiler-specific hooks checks without equivalents are removed. Other
  hooks checks can have different behavior in the new plugin.

See the upstream [React migration guide](https://eslint-react.xyz/docs/migrating-from-eslint-plugin-react)
and [hooks migration guide](https://eslint-react.xyz/docs/migrating-from-eslint-plugin-react-hooks)
for the full rule comparisons.

## Accessibility with ESLint 10

Accessibility checks use `eslint-plugin-jsx-a11y-x`'s `recommended` preset, which
supports ESLint 10 without peer dependency overrides.

The config installs `eslint-plugin-jsx-a11y-x` automatically. Consuming projects
can remove `eslint-plugin-jsx-a11y` and its previous ESLint override. Custom
rule overrides use `jsx-a11y-x/*` instead of `jsx-a11y/*`; custom component and
attribute mappings belong under `settings['jsx-a11y-x']`.
