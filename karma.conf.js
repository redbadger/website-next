const commonConfig = require('./common.webpack.config.js');

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

        webpack: commonConfig,

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
