module.exports = function(config) {
    config.node('desktop.bundles/index', function(nodeConfig) {
    });
    config.nodeMask(/^desktop.bundles\/.*/, function(nodeConfig) {
    nodeConfig.addTechs([
        new (require('enb/techs/file-provider'))({ target: '?.bemjson.js' }),
        new (require('enb/techs/levels'))({ levels: getLevels(config) }),
        new (require('enb/techs/files'))(),

        // BEMDECL
        new (require('enb/techs/bemdecl-from-bemjson'))(),

        // DEPS
        new (require('enb-modules/techs/deps-with-modules')),

        // JS
        new (require('enb-diverse-js/techs/vanilla-js'))(),
        new (require('enb-diverse-js/techs/node-js'))(),
        new (require('enb-diverse-js/techs/browser-js'))(),
        new (require('enb-modules/techs/prepend-modules'))({ source: '?.browser.js' }),

        /*require('enb/techs/deps-old'),*/
        require('enb-bemxjst/techs/bemhtml-old'),
        require('enb-bemxjst/techs/html-from-bemjson'),
        /*require('enb/techs/js'),*/
        require('enb/techs/css'),
        [require('enb-borschik/techs/borschik'), { sourceTarget: '?.js', destTarget: '?.min.js' }],
        [require('enb-borschik/techs/borschik'), { sourceTarget: '?.css', destTarget: '?.min.css' }]
    ]);

    nodeConfig.addTargets(['?.min.js', '?.min.css', '?.html']);
    });
};

function getLevels(config) {
    return [
    {path: 'libs/bem-core/common.blocks', check: false},
    {path: 'libs/bem-core/desktop.blocks', check: false},
    {path: 'libs/bem-components/common.blocks', check: false},
    {path: 'libs/bem-components/desktop.blocks', check: false},
    {path: 'libs/bem-components/design/common.blocks', check: false},
    {path: 'libs/bem-components/design/desktop.blocks', check: false},
    {path: 'libs/bem-highlight.js/blocks', check: false},
    /*'common.blocks',*/
    'desktop.blocks'
    ].map(function(levelPath) { return config.resolvePath(levelPath); });
}

