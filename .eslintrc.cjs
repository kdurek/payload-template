module.exports = {
  extends: ['next', 'plugin:tailwindcss/recommended'],
  root: true,
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
}
