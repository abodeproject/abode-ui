/*jslint node: true */
'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'src/scripts/**/*.js'],
        tasks: ['jshint', 'concat:scripts'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      styles: {
        files: ['Gruntfile.js', 'src/scripts/**/*.js'],
        tasks: ['concat:styles']
      },
      templates: {
        files: ['src/views/**/*.html'],
        tasks: ['ngtemplates']
      }
    },
    jshint: {
      options: {
        force: true
      },
      files: ['Gruntfile.js', 'src/scripts/**/*.js']
    },
    connect: {
      server: {
        options: {
          base: 'src',
          port: 8000,
          useAvailablePort: true,
          open: true,
          hostname: '0.0.0.0',
          keepalive: true,
          debug: true,
          middleware: function (connect, options, middlewares) {
            var httpProxy = require('http-proxy');
            var server_alive = true;

            var proxy = httpProxy.createProxyServer(options); // See (†)
            proxy.on('error', function(e) {
              console.error('Could not proxy api endpoint');
              proxy = httpProxy.createProxyServer(options);
              server_alive = true;
            });

            middlewares.unshift(function (req, res, next) {

              if (req.url.indexOf('/api') === 0 && server_alive) {
                proxy.web(req, res, { target: 'http://localhost:8080' });
                return;
              }

              next();
            });

            return middlewares;
          }
        },
        proxies: [
          {
            context: '/api',
            host: 'localhost',
            port: 8080,
            https: false,
            xforward: true
          }
        ]
      }
    },
    concurrent: {
      dev: {
        tasks: ['watch:scripts', 'configureProxies:server', 'connect:server'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    ngtemplates:  {
      abode:        {
        cwd: 'src',
        src: [
          'views/**/*.html',
          'vendor/angularjs-slider/src/rzSliderTpl.html'
        ],
        dest: 'src/scripts/templates.js'
      }
    },
    concat: {
      options: {
        separator: '\n\n'
      },
      scripts: {
        src: [
          'src/vendor/angular/angular.js',
          'src/vendor/angular-resource/angular-resource.js',
          'src/vendor/angular-ui-router/release/angular-ui-router.js',
          'src/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
          'src/vendor/angularjs-slider/dist/rzslider.min.js',
          'src/scripts/**/*.js'
        ],
        dest: 'dist/lib/scripts.js'
      },
      styles: {
        src: [
          'src/vendor/bootstrap/dist/css/bootstrap.css',
          'src/vendor/whhg-font/css/whhg.css',
          'src/vendor/angularjs-slider/dist/rzslider.min.css',
          'src/styles/**/*.css'
        ],
        dest: 'dist/lib/styles.css'
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            cwd: 'src/styles',
            src: [
              '*.eot',
              '*.svg',
              '*.ttf',
              '*.woff',
              '*.woff2'
            ],
            dest: 'dist/lib',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: 'src',
            src: [
              'favicon.ico',
              'manifest.json',
              'worker.js',
              'fonts/*.*',
              'images/*.*'
            ],
            dest: 'dist',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: 'src/vendor/whhg-font',
            src: [
              'font/*.*'
            ],
            dest: 'dist',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: 'src/vendor/bootstrap/dist/css',
            src: [
              'bootstrap.css.map'
            ],
            dest: 'dist/lib',
            filter: 'isFile'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jshint', 'concurrent:dev']);
  grunt.registerTask('gen', ['copy','ngtemplates', 'jshint', 'concat']);
};
