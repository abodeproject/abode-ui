/*jslint node: true */
'use strict';

module.exports = function(grunt) {
  var server_port = process.env.ABODE_WEB_PORT || 8080;

  var scriptFiles = [
    'src/vendor/moment/moment.js',
    'src/vendor/chart.js/dist/Chart.js',
    'src/vendor/angular/angular.js',
    'src/vendor/angular-resource/angular-resource.js',
    'src/vendor/angular-ui-router/release/angular-ui-router.js',
    'src/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
    'src/vendor/angularjs-slider/dist/rzslider.min.js',
    'src/vendor/lodash/dist/lodash.js',
    'src/vendor/angular-simple-logger/dist/angular-simple-logger.js',
    'src/vendor/angular-google-maps/dist/angular-google-maps.js',
    'src/vendor/angular-chart.js/dist/angular-chart.js',
    'src/modules/**/*.js',
    'src/scripts/**/*.js'
  ];

  var styleFiles = [
    'src/vendor/bootstrap/dist/css/bootstrap.css',
    'src/vendor/whhg-font/css/whhg.css',
    'src/vendor/angularjs-slider/dist/rzslider.min.css',
    'src/modules/**/*.css',
    'src/styles/**/*.css'
  ];

  var addTags = function (srcPattern, tag) {
    if (srcPattern === undefined) {
        throw new Error("srcPattern undefined");
    }
    return grunt.util._.reduce(
        grunt.file.expand({
          filter: 'isFile',
          flatten: false,
          expand: false,
        }, srcPattern),
        function (sum, file) {
          if (tag === 'scripts') {
            return sum + '\n    <script src="' + file.substr(4) + '" type="text/javascript"></script>';
          } else if (tag === 'styles') {
            return sum + '\n    <link rel="stylesheet" type="text/css" href="' + file.substr(4) + '" />';
          }
        },
        ''
    );
  };

  grunt.initConfig({
    watch: {
      scripts: {
        files: [
          'Gruntfile.js',
          'src/scripts/**/*.js',
          'src/modules/**/*.js'
        ],
        tasks: ['jshint', 'concat:scripts', 'includereplace'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      styles: {
        files: [
          'src/styles/**/*.css',
          'src/scripts/**/*.css',
          'src/modules/**/*.css'
        ],
        tasks: ['concat:styles', 'includereplace']
      },
      templates: {
        files: [
          'src/views/**/*.html',
          'src/scripts/**/*.html',
          'src/modules/**/*.html'
        ],
        tasks: ['ngtemplates']
      },
      index: {
        files: ['src/index.html'],
        tasks: ['includereplace']
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
          base: {
            path: 'src',
            options: {
              index: 'index.debug.html'
            }
          },
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
                proxy.web(req, res, { target: 'http://localhost:' + server_port });
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
            port: server_port,
            https: false,
            xforward: true
          }
        ]
      }
    },
    concurrent: {
      dev: {
        tasks: ['watch', 'configureProxies:server', 'connect:server'],
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
          'modules/**/*.html',
          'scripts/**/*.html',
          'vendor/angularjs-slider/src/rzSliderTpl.html'
        ],
        dest: 'src/modules/templates.js'
      }
    },
    concat: {
      options: {
        separator: '\n\n'
      },
      scripts: {
        src: [
          'src/vendor/moment/moment.js',
          'src/vendor/chart.js/dist/Chart.js',
          'src/vendor/angular/angular.js',
          'src/vendor/angular-resource/angular-resource.js',
          'src/vendor/angular-ui-router/release/angular-ui-router.js',
          'src/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
          'src/vendor/angularjs-slider/dist/rzslider.min.js',
          'src/vendor/lodash/dist/lodash.js',
          'src/vendor/angular-simple-logger/dist/angular-simple-logger.js',
          'src/vendor/angular-google-maps/dist/angular-google-maps.js',
          'src/vendor/angular-chart.js/dist/angular-chart.js',
          'src/modules/**/*.js',
          'src/scripts/**/*.js'
        ],
        dest: 'dist/lib/scripts.js'
      },
      styles: {
        src: [
          'src/vendor/bootstrap/dist/css/bootstrap.css',
          'src/vendor/whhg-font/css/whhg.css',
          'src/vendor/angularjs-slider/dist/rzslider.min.css',
          'src/styles/**/*.css',
          'src/modules/**/*.css',
          'src/scripts/**/*.css'
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
    },
    includereplace: {
      debug: {
        options: {
          globals: {
            scriptTags: '<%= addTags(styleFiles, "styles")%>',
            styleTags: '<%= addTags(scriptFiles, "scripts")%>'
          }
        },
        src: 'src/index.html',
        dest: 'src/index.debug.html',
        expand: false,
        flatten: true,
      },
      prod: {
        options: {
          globals: {
            scriptTags: '<script src="lib/scripts.js" type="text/javascript"></script>',
            styleTags: '<link rel="stylesheet" type="text/css" href="lib/styles.css" />'
          }
        },
        src: 'src/index.html',
        dest: 'dist/index.html'
      }
    },
    addTags: addTags,
    scriptFiles: scriptFiles,
    styleFiles: styleFiles
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-include-replace');

  grunt.registerTask('default', ['jshint', 'concurrent:dev']);
  grunt.registerTask('gen', ['copy','ngtemplates', 'jshint', 'concat', 'includereplace']);
};
