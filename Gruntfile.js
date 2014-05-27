module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bem: {
            options: {
                require: './node_modules/bem',
                root: './'
            },
            bundles: {
                targets: 'desktop.bundles'
            }
        },
        copy: {
            blocks: {
                files: {
                    "out/": ["desktop.blocks/**/*"]
                }
            },
            bundles: {
                files: {
                    "out/": ["desktop.bundles/index/*"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bem');

}
