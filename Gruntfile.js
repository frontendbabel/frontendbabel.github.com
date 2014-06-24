module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            enb: {
                command: './node_modules/enb/bin/enb make'
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
                    "out/": ["desktop.bundles/*/*.min.*"]
                }
            },
            cname: {
                files: {
                    "out/": ["./CNAME"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

}
