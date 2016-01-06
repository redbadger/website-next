const testConfig = require('./test.webpack.config.js');
delete testConfig.output;

module.exports = function(config) {
    config.set({
        browsers: ['Firefox'],
        frameworks: ['mocha'],
        files: [
            'src/**/*.spec.js'
        ],

        preprocessors: {
            'src/**/*.js': ['webpack']
        },

        webpack: testConfig,

        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            require("karma-webpack"),
            require("karma-mocha"),
            require("karma-firefox-launcher")
        ],
        singleRun: true

    });
};
