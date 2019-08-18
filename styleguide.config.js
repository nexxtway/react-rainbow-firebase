/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const version = require('./package.json').version;

const env = dotenv.config();
let envKeys;

if (env.parsed && !env.error) {
    envKeys = Object.keys(env.parsed).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env.parsed[next]);
        return prev;
    }, {});
} else {
    envKeys = {};
}

module.exports = {
    version,
    title: 'react-rainbow-firebase',
    ignore: ['**/__tests__/**', '/node_modules/**'],
    skipComponentsWithoutExample: true,
    pagePerSection: true,
    ribbon: {
        url: 'https://github.com/90milesbridge/react-rainbow-firebase',
    },
    template: {
        favicon: 'https://react-rainbow-firebase.firebaseapp.com/favicon.ico',
        head: {
            meta: [
                {
                    name: 'robots',
                    content: 'index,follow'
                },
                {
                    name: 'keywords',
                    content: 'react, firebase, components, library'
                },
                {
                    property: 'og:title',
                    content: 'React Rainbow Firebase'
                },
            ]
        },
    },
    styleguideComponents: {
        Wrapper: path.join(__dirname, 'library/styleguideComponents/Wrapper'),
    },
    sections: [
        {
            name: 'Getting Started',
            sectionDepth: 1,
            content: 'docs/overview.md',
            sections: [
                {
                    name: 'Overview',
                    content: 'docs/overview.md',
                },
            ],
        },
        {
            name: 'Firestore Components',
            components: 'src/firestore/*/index.js',
            sectionDepth: 1,
            usageMode: 'expand',
        },
        {
            name: 'Firestore Hooks',
            components: 'src/firestore/hooks/*/index.js',
            sectionDepth: 1,
            usageMode: 'expand',
        },
    ],
    webpackConfig: {
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, 'src'),
                    loader: 'babel-loader',
                },
                {
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, 'library'),
                    loader: 'babel-loader',
                },
                {
                    test: /\.(css|scss)$/,
                    loaders: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                    },
                },
                {
                    test: /\.(svg|png)$/,
                    loader: 'file-loader',
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
        ],
    },
};
