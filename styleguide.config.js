/* eslint-disable */
const path = require('path');
const withRainbowStyles = require('react-rainbow-styleguide');
const version = require('./package.json').version;

module.exports = withRainbowStyles({
    version,
    title: 'react-rainbow-firebase',
    ignore: ['**/__tests__/**', '/node_modules/**'],
    skipComponentsWithoutExample: true,
    pagePerSection: true,
    assetsDir: 'public',
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
            components: 'src/firestore/**/index.js',
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
    },
});
