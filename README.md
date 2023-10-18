## Used dependencies & their purposes

(for the sake of my goldfish memory when I need to remove a package/library)

- **Tailwind**: inline styles with classes
  - postcss
  - autoprefixer
- shadcn-ui: use pre-built UI elements
  - @types/node
  - class-variance-authority
  - clsx
  - lucide-react
  - tailwind-merge
  - tailwindcss-animate
  - @tanstack/react-table
  - @radix-ui/react-popover
  - @radix-ui/react-slot
- tinymce: rich text editor
  - @tinymce/tinymce-react
  - fs-extra
- styled-components: confine private styles into their own files
- zod | @hookform/resolvers: form validation and resolver to work with react-hook-form
- @splinetool/react-spline: display Spline's 3D models

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
