export default {
  entries: [
    './src/index',
    { input: 'src/runtime/index', name: 'runtime' }
  ],
  externals: [
    'cookie', 'vue'
  ],
  declaration: true,
  emitCJS: false
}
