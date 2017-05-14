/*jslint node: true */
'use strict';

module.exports = function(grunt) {
  var scriptFiles = [
    'src/vendor/angular/angular.js',
    'src/vendor/angular-resource/angular-resource.js',
    'src/vendor/angular-ui-router/release/angular-ui-router.js',
    'src/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
    'src/vendor/angularjs-slider/dist/rzslider.min.js',
    'src/scripts/**/*.js'
  ];
  var styleFiles = [
    'src/vendor/bootstrap/dist/css/bootstrap.css',
    'src/vendor/whhg-font/css/whhg.css',
    'src/vendor/angularjs-slider/dist/rzslider.min.css',
    'src/styles/**/*.css'
  ];
  var addTags = function (srcPattern, tag) {
    if (srcPattern === undefined) {
        throw new Error("srcPattern undefined");
    }
    return grunt.util._.reduce(
        grunt.file.expandMapping(srcPattern, '.', {
            filter: 'isFile',
            flatten: false,
            expand: false,
            cwd: '.'
        }),
        function (sum, file) {
          if (tag === 'scripts') {
            return sum + '\n    <script src="' + file.dest.substr(4) + '" type="text/javascript"></script>';
          } else if (tag === 'styles') {
            return sum + '\n    <link rel="stylesheet" type="text/css" href="' + file.dest.substr(4) + '" />';
          }
        },
        ''
    );
  };

  grunt.initConfig({
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'src/scripts/**/*.js'],
        tasks: ['jshint', 'concat:scripts', 'includereplace'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      styles: {
        files: ['Gruntfile.js', 'src/scripts/**/*.js'],
        tasks: ['concat:styles', 'includereplace']
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
