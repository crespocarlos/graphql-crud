const common = require('../jest.config.json')

module.exports = {
  ...common,
  name: 'graphql-frontend',
  globals: {
    'ts-jest': {
      tsconfig: './src/tsconfig.json',
      isolatedModules: true,
    },
  },
}
