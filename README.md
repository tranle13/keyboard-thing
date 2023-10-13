## Dependencies

(for the sake of my goldfish memory when I need to remove a package/library)

- Tailwind
  - postcss
  - autoprefixer
- shadcn-ui
  - @types/node
  - class-variance-authority
  - clsx
  - lucide-react
  - tailwind-merge
  - tailwindcss-animate
  - @tanstack/react-table
- tinymce
  - @tinymce/tinymce-react
  - fs-extra

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
