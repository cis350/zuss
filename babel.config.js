module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }], // Target the current version of Node
    '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-runtime'],
};
