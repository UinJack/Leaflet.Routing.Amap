module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            all: ['dist/**', 'dist/*.*'],
            image: 'dist/images',
            css: 'dist/css',
            html: 'dist/**/*'
        },
        concat: {
            js: {
                src: [

                    'src/L.Routing.js',
                    'src/L.ChinaProj.js',
                    'src/L.Request.js',

                    'src/L.Routing.Conf.js',
                    'src/L.Routing.Reader.js',
                    'src/L.Routing.Bywalk.js',
                    'src/L.Routing.Bybus.js',
                    'src/L.Routing.Bycar.js',
                    'src/L.Routing.Query.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false, //不混淆变量名
                preserveComments: false, //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                footer: '\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
            },
            dist: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        }


    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.registerTask('deleteAll', ['clean']);
    grunt.registerTask('default', ['clean', 'concat', 'uglify']);


};