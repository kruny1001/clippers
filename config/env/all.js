'use strict';

module.exports = {
  app: {
    title: 'MEAN.JS',
    description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
    keywords: 'mongodb, express, angularjs, node.js, mongoose, passport'
  },
  port: process.env.PORT || 5000,
  templateEngine: 'swig',
  // The secret should be set to a non-guessable string that
  // is used to compute a session hash
  sessionSecret: 'CL',
  // The name of the MongoDB collection to store sessions in
  sessionCollection: 'sessions',
  // The session cookie settings
  sessionCookie: {
    path: '/',
    httpOnly: true,
    // If secure is set to true then it will cause the cookie to be set
    // only when SSL-enabled (HTTPS) is used, and otherwise it won't
    // set a cookie. 'true' is recommended yet it requires the above
    // mentioned pre-requisite.
    secure: false,
    // Only set the maxAge to null if the cookie shouldn't be expired
    // at all. The cookie will expunge when the browser is closed.
    maxAge: null,
    // To set the cookie in a specific domain uncomment the following
    // setting:
    // domain: 'yourdomain.com'
  },
  // The session cookie name
  sessionName: 'connect.sid',
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
        'public/lib/bootstrap/dist/css/bootstrap.css',
        //'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/angular-material/angular-material.min.css',

        //'public/lib/nvd3/nv.d3.min.css',
        'public/lib/ionicons/css/ionicons.min.css',
        'public/lib/textAngular/dist/textAngular.css',
        'public/lib/jquery-ui/themes/smoothness/jquery-ui.min.css',

        //'public/lib/reveal.js/css/reveal.css',
        //'public/lib/angular-material/default-theme.css',
        //'public/lib/components-font-awesome/css/font-awesome.min.css',
      ],
      js: [
        'public/lib/angular/angular.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-cookies/angular-cookies.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-touch/angular-touch.js',
        'public/lib/angular-sanitize/angular-sanitize.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        //'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',

        'public/lib/jquery/dist/jquery.js',
        //'public/lib/oclazyload/dist/ocLazyLoad.js',
        'public/lib/angular-aria/angular-aria.js',
        //'public/lib/hammerjs/hammer.js',
        'public/lib/angular-material/angular-material.js',

        //'public/lib/angular-ui-tinymce/src/tinymce.js',


        'public/3rd/gsap/src/minified/TimelineMax.min.js',
        'public/3rd/gsap/src/minified/TweenMax.min.js',
        'public/3rd/gsap/src/minified/utils/Draggable.min.js',
        'public/3rd/gsap/src/minified/plugins/ScrollToPlugin.min.js',
        'public/3rd/gsap/src/minified/plugins/ColorPropsPlugin.min.js',
        'public/3rd/gsap/src/minified/plugins/CSSPlugin.min.js',
        'public/3rd/gsap/src/minified/plugins/TextPlugin.min.js',
        'public/3rd/gsap/src/minified/utils/SplitText.min.js',
        'public/3rd/gsap/src/minified/plugins/DrawSVGPlugin.min.js',

        //'public/lib/3rd/SplitText.min.js'

        //'public/lib/threejs/build/three.min.js',

        /*
         'public/lib/tremulajs/libs/hammer.js',
         'public/lib/tremulajs/libs/jsBezier-0.6.js',
         'public/lib/tremulajs/dist/Tremula.js',
         */

        //'public/lib/Snap.svg/dist/snap.svg-min.js',
        'public/lib/lodash/lodash.min.js',

        //'public/lib/angular-google-maps/dist/angular-google-maps.js',

        'public/lib/d3/d3.min.js',
        //'public/lib/d3-timeline/src/d3-timeline.js',

        //'public/lib/topojson/topojson.js',

        //'public/lib/angular-smart-table/dist/smart-table.min.js',

        //'public/lib/tinymce/tinymce.min.js',
        //'public/lib/tinymce/plugins/image/plugin.min.js',
        //'public/lib/tinymce/plugins/link/plugin.min.js',
        //'public/lib/tinymce/plugins/fullscreen/plugin.min.js',
        //'public/lib/tinymce/plugins/code/plugin.min.js',
        //'public/lib/tinymce/plugins/table/plugin.min.js',
        //'public/lib/tinymce/plugins/contextmenu/plugin.min.js',
        //'public/lib/tinymce/plugins/media/plugin.min.js',

        'public/lib/string/lib/string.js',
        //'public/lib/moment/min/moment-with-locales.min.js',
        'public/lib/angular-local-storage/dist/angular-local-storage.js',

        //'public/third/prism/prism.js',
        //'public/lib/nvd3/nv.d3.min.js',
        //'public/lib/angular-nvd3/dist/angular-nvd3.min.js',

        'public/lib/braintree-angular/dist/braintree-angular.js',
        //'public/lib/braintree-web/dist/braintree.js',
        //'public/lib/reveal.js/js/reveal.js',
        'public/lib/localforage/dist/localforage.js',
        'public/lib/angular-localforage/dist/angular-localForage.js',

        'public/lib/textAngular/dist/textAngular-rangy.min.js',
        'public/lib/textAngular/dist/textAngular-sanitize.js',
        'public/lib/textAngular/dist/textAngularSetup.js',
        'public/lib/textAngular/dist/textAngular.js',
        'public/lib/jquery-ui/jquery-ui.js',



      ]
    },
    css: [
      'public/modules/**/css/*.css'
    ],
    js: [
      'public/config.js',
      'public/application.js',
      'public/modules/*/*.js',
      'public/modules/*/*[!tests]*/*.js'
    ],
    tests: [
      'public/lib/angular-mocks/angular-mocks.js',
      'public/modules/*/tests/*.js'
    ]
  }
};
