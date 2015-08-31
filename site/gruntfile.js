module.exports = function(grunt) { 
    // 加载插件
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-babel'
    ].forEach(function(task){ 
        grunt.loadNpmTasks(task);
    });
    // 配置插件
    grunt.initConfig({
            cafemocha: {
                all: { src: 'test/tests-*.es', options: { ui: 'tdd' } }
            },
            jshint: {
                options: {
                    jshintrc: true,
                    globals: {
                        jQuery: true,
                        suite: true
                    }
                },
                app: ['ganfanheizhongjie.es', 'public/js/**/*.js','lib/**/*.js'],
                test: ['gruntfile.js', 'public/test/**/*.js', 'test/**/*.js'],
            }
    });
    // 注册任务
    grunt.registerTask('default', ['cafemocha','jshint']);
};