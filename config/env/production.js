'use strict';

module.exports = {
	db: {
		uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/clipper',
		options: {
			user: '',
			pass: ''
		}
	},
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'access.log'
		}
	},
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
				'public/lib/angular-material/angular-material.min.css',
				//'public/lib/nvd3/nv.d3.min.css',
				'public/lib/ionicons/css/ionicons.min.css',
				'public/lib/textAngular/dist/textAngular.css',

				//'public/lib/reveal.js/css/reveal.css',
				//'public/lib/angular-material/default-theme.css',
				//'public/lib/components-font-awesome/css/font-awesome.min.css',
			],
			js: [
				'public/lib/angular/angular.min.js',
				'public/lib/angular-messages/angular-messages.min.js',
				'public/lib/angular-resource/angular-resource.min.js',
				'public/lib/angular-cookies/angular-cookies.min.js',
				'public/lib/angular-animate/angular-animate.min.js',
				'public/lib/angular-touch/angular-touch.min.js',
				'public/lib/angular-sanitize/angular-sanitize.min.js',
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				//'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',

				'public/lib/jquery/dist/jquery.min.js',
				//'public/lib/oclazyload/dist/ocLazyLoad.min.js',
				'public/lib/angular-aria/angular-aria.min.js',
				//'public/lib/hammerjs/hammer.min.js',
				'public/lib/angular-material/angular-material.min.js',

				//'public/lib/tinymce/tinymce.min.js',
				//'public/lib/angular-ui-tinymce/src/tinymce.js',

				'public/lib/gsap/src/minified/TimelineMax.min.js',
				'public/lib/gsap/src/minified/TweenMax.min.js',

				'public/lib/gsap/src/minified/utils/Draggable.min.js',
				//'public/lib/gsap/src/minified/plugins/TextPlugin.min.js',
				'public/lib/gsap/src/minified/plugins/ScrollToPlugin.min.js',
				'public/lib/gsap/src/minified/plugins/ColorPropsPlugin.min.js',
				'public/lib/gsap/src/minified/plugins/CSSPlugin.min.js',

				//'public/lib/Snap.svg/dist/snap.svg-min.js',
				'public/lib/lodash/lodash.min.js',
				//'public/lib/angular-google-maps/dist/angular-google-maps.min.js',

				'public/lib/d3/d3.min.js',
				'public/lib/string/lib/string.min.js',

				'public/lib/braintree-angular/dist/braintree-angular.js',
				'public/lib/localforage/dist/localforage.min.js',

				//'public/lib/angular-localforage/dist/angular-localForage.min.js',
				'public/lib/angular-local-storage/dist/angular-local-storage.min.js',

				'public/lib/textAngular/dist/textAngular-rangy.min.js',
				'public/lib/textAngular/dist/textAngular-sanitize.js',
				'public/lib/textAngular/dist/textAngularSetup.js',
				'public/lib/textAngular/dist/textAngular.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
