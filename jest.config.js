const sfdxLwcConfig = require('@salesforce/sfdx-lwc-jest/config.js');
const { jestConfig } = sfdxLwcConfig;

const config = {
    ...jestConfig,
    moduleNameMapper: {
        '^c/(.*)$': ['<rootDir>/force-app/main/default/lwc/$1/$1'],
    },
};

module.exports = config;