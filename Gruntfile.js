module.exports = function( grunt ) {

	grunt.initConfig({

		// Directory where compiled files go
		distdir: 'dist',

		// Directory to pull from
		srcdir: 'src',

		// Clean directory
		clean: [ '<%= distdir %>' ],

		// Copy assets.
		copy: {
			images: {
				files: [
					{
						src: [ '**' ],
						cwd: '<%= srcdir %>/img',
						dest: '<%= distdir %>/img/',
						expand: true
					}
				]
			},
			css: {
				files: [
					{
						src: [ '**' ],
						cwd: '<%= srcdir %>/css',
						dest: '<%= distdir %>/css/',
						expand: true
					}
				]
			},
			js: {
				files: [
					{
						src: [ '**' ],
						cwd: '<%= srcdir %>/js',
						dest: '<%= distdir %>/js/',
						expand: true
					}
				]
			}
		},

		// Sass
		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'<%= srcdir %>/css/main.css' : '<%= srcdir %>/scss/main.scss'
				}
			}
		},

		// Sets autoprefixer for css files
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')
				]
			},
			dist: {
				src: '<%= srcdir %>/css/*.css'
			}
		},

		// Include files
		includereplacemore: {
			dist: {
				options: {
					includesDir: '<%= srcdir %>/includes/'
				},
				files: [
					{
						src: '*.html',
						dest: '<%= distdir %>/',
						expand: true,
						cwd: '<%= srcdir %>/'
					}
				]
			}
		},

		// Watches for a file save and refreshes browser with livereload
		watch: {
			options: {
				livereload: true,
			},
			sass: {
				options: {
					livereload: false
				},
				files: [ '<%= srcdir %>/scss/*.scss' ],
				tasks: [ 'sass' ]
			},
			images: {
				files: [ '<%= srcdir %>/img/*' ],
				tasks: [ 'copy:images' ]
			},
			css: {
				files: [ '<%= srcdir %>/css/main.css' ],
				tasks: [ 'postcss', 'copy:css' ]
			},
			html: {
				files: [ '<%= srcdir %>/*.html', '<%= srcdir %>/includes/*.html' ],
				tasks: [ 'includereplacemore' ]
			},
			js: {
				files: [ '<%= srcdir %>/js/*.js' ],
				tasks: [ 'copy:js' ]
			}
		},

		// Set up server
		connect: {
			server: {
				options: {
					port: 9000,
					base: '<%= distdir %>'
				}
			}
		}
	});

	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-postcss' );
	grunt.loadNpmTasks( 'grunt-include-replace-more' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );

	grunt.registerTask( 'default', [ 'sass', 'includereplacemore' ] );
	grunt.registerTask( 'local', [ 'clean', 'sass', 'postcss', 'copy', 'includereplacemore', 'connect', 'watch' ] );

};
