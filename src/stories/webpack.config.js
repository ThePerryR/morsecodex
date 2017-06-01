const baseConfig = require('../../webpack/webpack.config')

module.exports = storybookBaseConfig =>
  Object.assign({}, storybookBaseConfig, {
    resolve: {
      modulesDirectories: baseConfig.resolve.modules
    },
    module: Object.assign({}, storybookBaseConfig.module, {
      loaders: storybookBaseConfig.module.loaders.concat(baseConfig.module.rules)
    }),
    externals: {
      'jsdom': 'window',
      'cheerio': 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/addons': true,
      'react/lib/ReactContext': 'window'
    }
  })
