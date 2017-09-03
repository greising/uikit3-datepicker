var fs = require('fs');
var glob = require('glob');
var path = require('path');
var util = require('./util');
var rtlcss = require('rtlcss');
var postcss = require('postcss');
var args = require('minimist')(process.argv)._;

var rtl = ~args.indexOf('rtl');

[

    {src: 'src/less/uikit-datepicker.less', dist: `dist/css/uikit-datepicker${rtl ? '-rtl' : ''}.css`},

].forEach(config => compile(config.src, config.dist));

function compile(file, dist) {
    return util.read(file).then(data =>
        util.renderLess(data, {
            relativeUrls: true,
            rootpath: '../../',
            paths: ['src/less/']
        })
            .then(output => output.replace(/\.\.\/dist\//g, ''))
            .then(output => !rtl && output || postcss([
                css => {
                    css.insertBefore(css.nodes[0], postcss.comment({text: 'rtl:begin:rename'}));
                    css.insertAfter(css.nodes[css.nodes.length - 1], postcss.comment({text: 'rtl:end:rename'}));
                },
                rtlcss({
                    stringMap: [{
                        name: 'previous-next',
                        priority: 100,
                        search: ['previous', 'Previous', 'PREVIOUS'],
                        replace: ['next', 'Next', 'NEXT'],
                        options: {
                            scope: '*',
                            ignoreCase: false
                        }
                    }]
                })
            ]).process(output).css)
            .then(output => util.write(dist, output))
            .then(util.minify),
        error => console.log(error)
    );
}
