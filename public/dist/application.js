'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies = [
		'ngResource',
		'ngCookies',  'ngAnimate',  'ngTouch',
		'ngMessages',
		'ngSanitize',  'ui.router',
		'ui.bootstrap', //'ui.utils',
		'ngMaterial', /*'ng-context-menu', 'uiGmapgoogle-maps',*/
		//'smart-table',
		//'oc.lazyLoad',
		//'nvd3',
		'braintree-angular',
		'LocalStorageModule',
		//'textAngular'

	];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('articles');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('etc-products');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('etc');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('footer');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('jumbo-menu');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('payment');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('product-brands');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('reviews');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('shop-cart');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('slide-show');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);
'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		// Create new Article
		$scope.create = function() {
			// Create new Article object
			var article = new Articles({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Article
		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		// Update existing Article
		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Articles
		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		// Find existing Article
		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$compileProvider','localStorageServiceProvider',
	function($stateProvider, $urlRouterProvider, $compileProvider, localStorageServiceProvider) {

		// disable dubug data Information
		$compileProvider.debugInfoEnabled(true);

		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');
		// Home state routing
		$stateProvider.
		state('link-list', {
			url: '/link-list',
			templateUrl: 'modules/core/views/link-list.client.view.html'
		}).
		state('home', {
			url: '/dev',
			templateUrl: 'modules/core/views/home.client.view.html'
		});

		localStorageServiceProvider.setPrefix('shoppingCart');

	}
]).constant("devConfig", {"directive": "red"})


/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.tinymce', [])
	.value('uiTinymceConfig', {
		plugins: "image, link, fullscreen, code, table, contextmenu, media",
		contextmenu: "link media image inserttable | cell row column deletetable",
		image_advtab: true,
		image_class_list: [
			{title: 'Responsive Size', value: 'img-responsive'}

		],
		fullscreen_new_window : true,
		fullscreen_settings : {
			theme_advanced_path_location : "top"
		}
	})
	.directive('uiTinymce', ['uiTinymceConfig', function(uiTinymceConfig) {
		uiTinymceConfig = uiTinymceConfig || {};
		var generatedIds = 0;
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ngModel) {
				var expression, options, tinyInstance;
				// generate an ID if not present
				if (!attrs.id) {
					attrs.$set('id', 'uiTinymce' + generatedIds++);
				}
				options = {
					// Update model when calling setContent (such as from the source editor popup)
					setup: function(ed) {
						ed.on('init', function(args) {
							ngModel.$render();
						});
						// Update model on button click
						ed.on('ExecCommand', function(e) {
							ed.save();
							ngModel.$setViewValue(elm.val());
							if (!scope.$$phase) {
								scope.$apply();
							}
						});
						// Update model on keypress
						ed.on('KeyUp', function(e) {
							console.log(ed.isDirty());
							ed.save();
							ngModel.$setViewValue(elm.val());
							if (!scope.$$phase) {
								scope.$apply();
							}
						});
					},
					mode: 'exact',
					elements: attrs.id
				};
				if (attrs.uiTinymce) {
					expression = scope.$eval(attrs.uiTinymce);
				} else {
					expression = {};
				}
				angular.extend(options, uiTinymceConfig, expression);
				setTimeout(function() {
					tinymce.init(options);
				});


				ngModel.$render = function() {
					if (!tinyInstance) {
						tinyInstance = tinymce.get(attrs.id);
					}
					if (tinyInstance) {
						tinyInstance.setContent(ngModel.$viewValue || '');
					}
				};
			}
		};
	}]);

'use strict';

angular.module('core')
  .run(function ($rootScope) {

  })
  .controller('CoreHeadController',
  ['$scope','$rootScope','$window','$log','$mdSidenav','$location','$state', '$timeout', 'Authentication','stateService',
    function($scope, $rootScope,$window,$log,$mdSidenav, $location, $state, $timeout, Authentication, stateService) {
      $scope.authentication = Authentication;
      $scope.title = "Clippers";
      $scope.subTitle = "";
      $scope.link = "";
      $scope.classroom = false;
      $scope.goTo = function(name){
        $state.go(name);
          $mdSidenav('left').close()
              .then(function(){
                  $log.debug("close LEFT is done");
                  //console.log(target);
                  //TweenMax.to($window, 1.2, {scrollTo:{y:target}, ease:Power4.easeOut});
              });
      };
      $scope.currentState = function(){};
      $scope.onchangeRoute = function(){};

      $scope.toggleLeft = function() {
        $mdSidenav('left').toggle()
          .then(function(){
            $log.debug("toggle left is done");
          });
      };
      $scope.toggleRight = function() {
        //TweenMax.from($('#menuBtn'),2.5, {x:50, ease:Bounce.easeOut});
        $mdSidenav('right').toggle()
          .then(function(){
            $log.debug("toggle RIGHT is done");
            //TweenMax.set($("md-backdrop"),{position:'fixed'});
          });
      };
      var scrollTo = function(){
      };

      $scope.change = function(){
        if(user._id !== undefined){
          $location.path('/d2l-classes/'+user._id);
        }
      };
      $scope.tiles = buildGridModel({
        icon : "avatar:svg-",
        title: "Svg-",
        background: ""
      });
      function buildGridModel(tileTmpl){
        var it, results = [ ];
        for (var j=0; j<6; j++) {
          it = angular.extend({},tileTmpl);
          it.icon  = it.icon + (j+1);
          //it.title = it.title + (j+1);
          it.span  = { row : "1", col : "1" };
          switch(j+1) {
            case 1:
              it.ifCondition = "Authentication.user";
              it.id="profile";
              it.background = "red";
              it.title = "Profile";
              it.span.row = it.span.col = 2;
              break;
            case 2:
              it.ifCondition = "!Authentication.user";
              it.id="signIn";
              it.title = "Sign In";
              it.background = "green";
              it.span.row = it.span.col = 1;
              break;
            case 3:
              it.ifCondition = "Authentication.user";
              it.id="signOut";
              it.title = "Sign Out";
              it.background = "darkBlue";
              break;
            case 4:
              it.ifCondition = true;
              it.id="tutorial";
              it.title = "Tutorial";
              it.background = "blue";
              it.span.col = 2;
              break;
            case 5:
              it.ifCondition = "Authentication.user";
              it.id="urClass";
              it.background = "yellow";
              it.span.col = 2;
              it.title = "Your Classes";
              break;
            case 6:
              it.ifCondition = "Authentication.user";
              it.id="allClass";
              it.background = "red";
              it.span.col = 2;
              it.title = "All Classes";
              break;


          }
          results.push(it);
        }
        return results;
      }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            if(toState.name === "openboard"){
                $scope.title = "Getting Started";
                $scope.subTitle = "Tutorial";
            }
            else if(toState.name === "mean-home")
            {
                $scope.title = "Open Board";
                $scope.subTitle = " ";
            }
            else if(toState.name ==="d2l-home"){
              $scope.title = "Classroom";
              $scope.subTitle = " ";
            }
            else if(toState.name ==="listD2lClasses"){
              $scope.title = "Class List";
              $scope.subTitle = "Select a Class";
            }
            else if(toState.name ==='profile'){
              $scope.title = "Profile";
              $scope.subTitle = "Edit Profile";
            }
        });

      $scope.sliderNavEvent = function(name, target){
        var targetEl = $('#'+target+' figure md-grid-tile-footer h3');
        TweenLite.from(targetEl, 0.8, {scale:1.7});
        $mdSidenav('left').close()
          .then(function(){
            $log.debug("close LEFT is done");
            //console.log(target);
            //TweenMax.to($window, 1.2, {scrollTo:{y:target}, ease:Power4.easeOut});
          });
        if(name === 'Your Classes'){
          $state.go('listD2lClasses');
        }
        else if(name ==='Profile'){
          $state.go('profile');
        }
        else if(name ==='Tutorial'){
          $state.go('openboard');
        }
        else if(name ==='All Classes'){
          $state.go('listD2lClassesAll');
        }
        else if(name ==='Sign In'){
          $location.path('/signin');
        }
        else if(name ==='Sign Out'){
          $window.location.href = 'auth/signout';
        }
      }

      $scope.openCart = function(){
        $rootScope.$broadcast('open-cart');
      }


    }
]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

        $(document).on( 'scroll', function(){
            console.log('11111');
            if($(document).scrollTop() > 150)
                TweenMax.to($('header'), 1, {y:-51});
            else
                TweenMax.set($('header'), {y:0});
        });
	}
]);

'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication, YT_event) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.firstJumbo = 'first-jumbo-content';
		$scope.secondJumbo = 'second-jumbo-content';
		$scope.thirdJumbo = 'third-jumbo-content';
		var texts = angular.element(document.querySelector('.core-text-anni'));
		var tl = new TimelineMax({repeat:6, repeatDelay:1, yoyo:true});
		tl.staggerTo(texts, 0.2, {className:'+=superShadow', top:'-=10px', ease:Power1.easeIn}, '0.3', 'start');
	}
]);

'use strict';

angular.module('core').controller('LinklistController', ['$scope',
	function($scope) {
		// Link list controller logic
		// ...
		$scope.modules = [
			{
				name:'Animation',
				links:[
					{linkName: 'svg1', linkHref:'/#!/svg1'},
					{linkName: 'ryuhm12', linkHref:'/#!/ryuhm12'},
					{linkName: 'j1', linkHref:'/#!/j1'},
					{linkName: 'three', linkHref:'/#!/three'}
				]
			},
			{
				name:'Banners',
				links:[
					{linkName: 'List', linkHref:'/#!/banners'},
					{linkName: 'Create', linkHref:'/#!/banners/create'},
					{linkName: 'Banner', linkHref:'/#!/banners/:bannerId'},
					{linkName: 'Edit', linkHref:'/#!/banners/:bannerId/edit'}
				]
			},
			{
				name:'Core',
				links:[
					{linkName: 'Dev', linkHref:'/#!/dev'}
				]
			},
			{
				name:'SDSUMAP',
				links:[
					{linkName: 'SDSU Map', linkHref:'/#!/sdsumap-main'}
				]
			},
			{
				name:'Spec-view',
				links:[
					{linkName: 'Jarvis', linkHref:'/#!/jarvis'},
					{linkName: 'Spec Home', linkHref:'/#!/spec-home'}
				]
			},
			{
				name:'Tj-main',
				links:[
					{linkName: 'tj-main', linkHref:'/#!/tj-main'}
				]
			},
			{
				name:'User-interface',
				links:[
					{linkName: 'MCMU', linkHref:'/#!/mcmu'},
					{linkName: 'Front -1 ', linkHref:'/#!/front-1'},
					{linkName: 'Experimental Interface', linkHref:'/#!/experimental-interface'},
					{linkName: 'Product List', linkHref:'/#!/'},
					{linkName: 'detail-product', linkHref:'/#!/detail-product/:productId'}
				]
			},
			{
				name:'Utility',
				links:[
					{linkName: 'test-page-generator', linkHref:'/#!/test-page-generator'}
				]
			}
		]
	}
]);

/**
 * Created by KevinSo on 9/3/2014.
 */

'use strict';


angular.module('core').controller('PlanController', ['$scope', '$element', 'Authentication', 'Getplans',
    function($scope, $element, Authentication, Getplans) {
        //$scope.plans = Getplans;

        $scope.find = function() {
            $scope.plans = Getplans.query();
            //$scope.plans.contents = $sce.trustAsHtml($scope.plans.contents);
        };
        $scope.find();
        //$scope.plans = [{title: 'test1', body:'content', date:""}];
    }

]);


'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [
	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

angular.module('core').factory('stateService', stateService);

function stateService($state) {

    return {
        toGo: function(name) {
            $state.go(name);
        }
    };
}

'use strict';

//Setting up route
angular.module('etc-products').config(['$stateProvider',
	function($stateProvider) {
		// Etc products state routing
		$stateProvider.
		state('listEtcProducts', {
			url: '/etc-products',
			templateUrl: 'modules/etc-products/views/list-etc-products.client.view.html'
		}).
		state('createEtcProduct', {
			url: '/etc-products/create',
			templateUrl: 'modules/etc-products/views/create-etc-product.client.view.html'
		}).
		state('viewEtcProduct', {
			url: '/etc-products/:etcProductId',
			templateUrl: 'modules/etc-products/views/view-etc-product.client.view.html'
		}).
		state('editEtcProduct', {
			url: '/etc-products/:etcProductId/edit',
			templateUrl: 'modules/etc-products/views/edit-etc-product.client.view.html'
		});
	}
]);
'use strict';

// Etc products controller
angular.module('etc-products').controller('EtcProductsController',EtcProductsController);


function DialogController($scope, $mdDialog) {
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
}

function EtcProductsController($rootScope, $scope, $stateParams, $location, $mdDialog, Authentication,
                               EtcProducts, $timeout, $q, $state, ProductBrands, Cartlist) {

	$scope.thumbNail = [
		{imageUrl:'https://barber-and-beauty.andis.com/images_and_docs/63700-ultraedge-bgrc-clipper-bgrc-straight-thumb.png', actualImage:'https://barber-and-beauty.andis.com/images_and_docs/63700-ultraedge-bgrc-clipper-bgrc-straight.png'},
		{imageUrl:'https://barber-and-beauty.andis.com/images_and_docs/63700-ultraedge-bgrc-clipper-bgrc-angle-thumb.png', actualImage:'https://barber-and-beauty.andis.com/images_and_docs/63700-ultraedge-bgrc-clipper-bgrc-angle.png'},
		{imageUrl:'https://barber-and-beauty.andis.com/images_and_docs/63700-ultraedge-bgrc-clipper-bgrc-package-thumb.png', actualImage:'https://barber-and-beauty.andis.com/images_and_docs/63700-ultraedge-bgrc-clipper-bgrc-package.png'},];

	$scope.clickThumbImage = function(index){
		console.log(index);
		$scope.etcProduct.image =$scope.thumbNail[index].actualImage;
	}

	$scope.loadUsers = function() {
		// Use timeout to simulate a 650ms request.
		$scope.brands = [];
		return $timeout(function() {
			$scope.brands = ProductBrands.query();
		}, 650);
	};

	$scope.addCart = function(){
		//Cartlist.addItem($scope.etcProduct);
		$rootScope.$broadcast('cart-updated', {product: $scope.etcProduct});
	};

	$scope.authentication = Authentication;

	$scope.showDetail = function(ev) {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'modules/etc-products/template/dialogs/showDetail.html',
			targetEvent: ev,
			clickOutsideToClose:true
		})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
	};

	// Create new Etc product
	$scope.create = function() {
		// Create new Etc product object
		var etcProduct = new EtcProducts ({
			name: this.name,
			price: this.price,
			image: this.image,
			brand: this.brand._id
		});

		// Redirect after save
		etcProduct.$save(function(response) {
			$location.path('etc-products/' + response._id);

			// Clear form fields
			$scope.name = '';
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Remove existing Etc product
	$scope.remove = function(etcProduct) {
		if ( etcProduct ) {
			etcProduct.$remove();

			for (var i in $scope.etcProducts) {
				if ($scope.etcProducts [i] === etcProduct) {
					$scope.etcProducts.splice(i, 1);
				}
			}
		} else {
			$scope.etcProduct.$remove(function() {
				$location.path('etc-products');
			});
		}
	};

	// Update existing Etc product
	$scope.update = function() {
		var etcProduct = $scope.etcProduct;
		etcProduct.brand = $scope.etcProduct.brand._id;
		etcProduct.$update(function() {
			$location.path('etc-products/' + etcProduct._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Find a list of Etc products
	$scope.find = function() {
		$scope.etcProducts = EtcProducts.query();
	};

	// Find existing Etc product
	$scope.findOne = function() {
		$scope.etcProduct = EtcProducts.get({
			etcProductId: $stateParams.etcProductId
		});
	}


	$scope.goToParent = function(){
		$state.go('wigs');
	}

	$scope.goToCart = function(){
		$state.go('cart');
	}

	//////
	//var self = this;
	$scope.readonly = false;
	// Lists of fruit names and Vegetable objects
	$scope.fruitNames = ['Apple', 'Banana', 'Orange'];
	$scope.roFruitNames = angular.copy(self.fruitNames);
	$scope.newFruitNames = ['Red', 'Yellow', 'Green'];
	$scope.vegObjs = [
		{
			'name' : 'ModelModel1',
			'type' : 'Red'
		},
		{
			'name' : 'ModelModel2',
			'type' : 'Yellow'
		},
		{
			'name' : 'ModelModel3',
			'type' : 'Green'
		}
	];
	$scope.newVeg = function(chip) {
		return {
			name: chip,
			type: 'unknown'
		};
	};
	/////


	var imagePath = 'modules/etc/img/bunny.png';

	$scope.phones = [
		{ type: 'Home', number: '(555) 251-1234' },
		{ type: 'Cell', number: '(555) 786-9841' },
	];
	$scope.todos = [
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errandsI'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errandsI'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands"
		},
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands"
		},
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands"
		},
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands"
		},
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands"
		},
	];





	$scope.rate = 3;
	$scope.max = 5;
	$scope.isReadonly = true;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};

	$scope.ratingStates = [
		{stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
		{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
		{stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
		{stateOn: 'glyphicon-heart'},
		{stateOff: 'glyphicon-off'}
	];


}



'use strict';

angular.module('etc-products').directive('productCreate', [
	function() {
		return {
			templateUrl: 'modules/etc-products/views/create-etc-product.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);

angular.module('etc-products').directive('productList', [
    function() {
        return {
            templateUrl: 'modules/etc-products/views/list-etc-products.client.view.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    }
]);
'use strict';

//Etc products service used to communicate Etc products REST endpoints
angular.module('etc-products').factory('EtcProducts', ['$resource',
	function($resource) {
		return $resource('etc-products/:etcProductId', { etcProductId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			list : {
				method : 'GET',

				cache : true, isArray:true
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('etc').config(['$stateProvider',
	function($stateProvider) {
		// Etc state routing
		$stateProvider.
		state('admin', {
			url: '/admin',
			templateUrl: 'modules/etc/views/admin.client.view.html'
		}).
		state('wigs', {
			url: '/',
			templateUrl: 'modules/etc/views/wigs.client.view.html'
		}).
		state('etc', {
			url: '/etc',
			templateUrl: 'modules/etc/views/etc.client.view.html'
		});
	}
]);
'use strict';

angular.module('etc').controller('AdminController', ['$scope','$state',
	function($scope, $state) {
		$scope.toGo = function(name){
			$state.go(name);
		}
	}
]);
'use strict';

angular.module('etc').controller('EtcController', ['$scope',
	function($scope) {
		// Etc controller logic
		// ...

		$scope.todos = [
			{
				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
			{

				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
			{
				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
			{
				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
			{
				face : '/modules/etc-products/img/icon1.png',
				what: 'Brunch this weekend?',
				who: 'Min Li Chan',
				when: '3:08PM',
				notes: " I'll be in your neighborhood doing errands"
			},
		];
	}
]);
'use strict';



angular.module('etc').controller('WigsController',wigsCtrl);
function wigsCtrl($scope, $state, $timeout, EtcProducts, Preloadimage) {

	$scope.toGo = function(content){
		$state.go("viewEtcProduct", { etcProductId: content._id })
	};

	$scope.cartGo = function(stateName){
		$state.go(stateName);
	};

	$scope.isLoading = true;
	$scope.isSuccessful = false;
	$scope.percentLoaded = 0;

	//var testData =[1,2,3,4];
	//
	//$scope.append = function(){
	//	testData.forEach(function(value){
	//		$scope.etcProducts.push({name:'232', image:'modules/etc/img/products/1.png'});
	//	});
	//	$scope.$digest();
	//}

	// Load Product
	$scope.loadProduct = EtcProducts.list();
	$scope.loadProduct.$promise.then(function(data){

		$scope.etcProducts = data;
		//console.log(data);
		//testData = data;
		var images = data.map(function(d){ return d.image});

		Preloadimage.preloadImages(images).then(
			function handleResolve(imageLoactions){
				// Loading was successful.
				//console.info( "Preload Successful" );

				$timeout(function(){
					$scope.isLoading = false;
					$scope.isSuccessful = true;
				},500);

			},
			function handleReject(imageLocation){
				// Loading failed on at least one image.
				$scope.isLoading = false;
				$scope.isSuccessful = false;

				console.error( "Image Failed", imageLocation );
				console.info( "Preload Failure" );
			},
			function handleNotify(event){
				$scope.percentLoaded = event.percent;
				//console.info( "Percent loaded:", event.percent );
				angular.element();
			}
		)
	});
};


'use strict';

angular.module('etc').directive('colorPicker', [
	function() {
		return {
			templateUrl: 'modules/etc/directives/template/color-picker.html',
			restrict: 'E',
			controller: ColorPickerCtrl,
			controllerAs: 'vm',
			link: function postLink(scope, element, attrs) {

			}
		};

		function ColorPickerCtrl($scope) {
			this.items=[
				{imgSrc:"modules/etc/img/1.jpg", title:"Color 1"},
				{imgSrc:"modules/etc/img/2.jpg", title:"Color 2"},
				{imgSrc:"modules/etc/img/3.jpg", title:"Color 3"},
				{imgSrc:"modules/etc/img/4.jpg", title:"Color 4"},
				{imgSrc:"modules/etc/img/5.jpg", title:"Color 5"},
				{imgSrc:"modules/etc/img/6.jpg", title:"Color 6"},
				{imgSrc:"modules/etc/img/7.jpg", title:"Color 7"},
				{imgSrc:"modules/etc/img/8.jpg", title:"Color 8"},
				{imgSrc:"modules/etc/img/9.jpg", title:"Color 9"},
				{imgSrc:"modules/etc/img/10.jpg", title:"Color 10"},
				{imgSrc:"modules/etc/img/11.jpg", title:"Color 11"},
				{imgSrc:"modules/etc/img/12.jpg", title:"Color 12"},
				{imgSrc:"modules/etc/img/13.jpg", title:"Color 13"},
				{imgSrc:"modules/etc/img/14.jpg", title:"Color 14"},
				{imgSrc:"modules/etc/img/15.jpg", title:"Color 15"},
				{imgSrc:"modules/etc/img/16.jpg", title:"Color 16"},
			];

			this.coverSelected = function(event) {
				console.log("selected");
				//console.log(event);
				console.log(event.path[2].outerHTML)
				TweenLite.to(event.path[2].outerHTML, 1, {display:"block"});
			}

			this.tiles = buildGridModel({
				icon : "avatar:svg-",
				title: "Svg-",
				background: ""
			});
			function buildGridModel(tileTmpl){
				var it, results = [ ];
				for (var j=0; j<18; j++) {
					it = angular.extend({},tileTmpl);
					it.icon  = it.icon + (j+1);
					it.title = it.title + (j+1);
					it.span  = { row : "1", col : "1" };
					switch(j+1) {
						case 1:
							it.background = "red"; it.img="modules/etc/img/1.jpg"
							it.span.row = it.span.col = 2;
							break;
						case 2: it.background = "green"; it.img="modules/etc/img/2.jpg"; break;
						case 3: it.background = "darkBlue"; it.img="modules/etc/img/3.jpg"; break;
						case 4:
							it.background = "blue";
							it.span.row = it.span.col = 2;
							it.img="modules/etc/img/4.jpg";
							break;
						case 5:
							it.background = "yellow";
							it.span.row = it.span.col = 2;
							it.img="modules/etc/img/5.jpg";
							break;
						case 6:
							//it.span.row = it.span.col = 4;
							it.background = "pink";it.img="modules/etc/img/6.jpg"; break;
						case 7: it.background = "darkBlue";it.img="modules/etc/img/7.jpg"; break;
						case 8:
							//it.span.row = it.span.col = 6;
							it.background = "purple";it.img="modules/etc/img/8.jpg"; break;
						case 9: it.background = "deepBlue";it.img="modules/etc/img/9.jpg"; break;
						case 10: it.span.row = it.span.col = 2; it.background = "lightPurple";it.img="modules/etc/img/10.jpg"; break;
						case 11: it.background = "yellow";it.img="modules/etc/img/11.jpg"; break;
						case 12: it.background = "deepBlue";it.img="modules/etc/img/9.jpg"; break;
						case 13: it.background = "lightPurple";it.img="modules/etc/img/10.jpg"; break;
						case 14: it.background = "yellow";it.img="modules/etc/img/11.jpg"; break;
						case 15: it.background = "deepBlue";it.img="modules/etc/img/9.jpg"; break;
						case 16: it.background = "lightPurple";it.img="modules/etc/img/10.jpg"; break;
						case 17: it.background = "yellow";it.img="modules/etc/img/11.jpg"; break;
						case 18: it.background = "yellow";it.img="modules/etc/img/12.jpg"; break;
					}
					results.push(it);
				}
				return results;
			}
		}
	}
]);
'use strict';

angular.module('etc').directive('gallery', [
	function() {
		return {
			templateUrl: 'modules/etc/directives/template/gallery.html',
			restrict: 'E',
            controller: galleryCtrl,
            controllerAs: 'vm',
			link: function postLink(scope, element, attrs) {
			}
		};

        function galleryCtrl($scope) {
            $scope.title = "DD";
            var COLORS = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4', '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00', '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00', '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00', '#d7ccc8', '#bcaaa4', '#795548', '#d7ccc8', '#bcaaa4', '#8d6e63', '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#cfd8dc', '#b0bec5', '#78909c'];
            $scope.colorTiles = (function() {
                var tiles = [];
                for (var i = 0; i < 46; i++) {
                    tiles.push({
                        color: randomColor(),
                        colspan: randomSpan(),
                        rowspan: randomSpan()
                    });
                }
                return tiles;
            })();

            function randomColor() {
                return COLORS[Math.floor(Math.random() * COLORS.length)];
            }
            function randomSpan() {
                var r = Math.random();
                if (r < 0.8) {
                    return 1;
                } else if (r < 0.9) {
                    return 2;
                } else {
                    return 3;
                }
            }
        };
	}
]);
'use strict';

angular.module('etc').directive('productDetail', [
	function() {
		return {
			templateUrl: 'modules/etc/directives/template/product-detail.html',
			restrict: 'E',
			controller: ProductDetailCtrl,
			controllerAs: 'vm',
			link: function postLink(scope, element, attrs) {

			}
		};

		function ProductDetailCtrl($scope) {

		};
	}
]);
'use strict';

angular.module('etc').factory('Preloadimage', function( $q, $rootScope ) {

	// I manage the preloading of image objects. Accepts an array of image URLs.
	function Preloader( imageLocations ) {

		// I am the image SRC values to preload.
		this.imageLocations = imageLocations;

		// As the images load, we'll need to keep track of the load/error
		// counts when announing the progress on the loading.
		this.imageCount = this.imageLocations.length;
		this.loadCount = 0;
		this.errorCount = 0;

		// I am the possible states that the preloader can be in.
		this.states = {
			PENDING: 1,
			LOADING: 2,
			RESOLVED: 3,
			REJECTED: 4
		};

		// I keep track of the current state of the preloader.
		this.state = this.states.PENDING;

		// When loading the images, a promise will be returned to indicate
		// when the loading has completed (and / or progressed).
		this.deferred = $q.defer();
		this.promise = this.deferred.promise;

	}


	// ---
	// STATIC METHODS.
	// ---


	// I reload the given images [Array] and return a promise. The promise
	// will be resolved with the array of image locations.
	Preloader.preloadImages = function( imageLocations ) {

		var preloader = new Preloader( imageLocations );

		return( preloader.load() );

	};


	// ---
	// INSTANCE METHODS.
	// ---


	Preloader.prototype = {

		// Best practice for "instnceof" operator.
		constructor: Preloader,


		// ---
		// PUBLIC METHODS.
		// ---


		// I determine if the preloader has started loading images yet.
		isInitiated: function isInitiated() {

			return( this.state !== this.states.PENDING );

		},


		// I determine if the preloader has failed to load all of the images.
		isRejected: function isRejected() {

			return( this.state === this.states.REJECTED );

		},


		// I determine if the preloader has successfully loaded all of the images.
		isResolved: function isResolved() {

			return( this.state === this.states.RESOLVED );

		},


		// I initiate the preload of the images. Returns a promise.
		load: function load() {

			// If the images are already loading, return the existing promise.
			if ( this.isInitiated() ) {

				return( this.promise );

			}

			this.state = this.states.LOADING;

			for ( var i = 0 ; i < this.imageCount ; i++ ) {

				this.loadImageLocation( this.imageLocations[ i ] );

			}

			// Return the deferred promise for the load event.
			return( this.promise );

		},


		// ---
		// PRIVATE METHODS.
		// ---


		// I handle the load-failure of the given image location.
		handleImageError: function handleImageError( imageLocation ) {

			this.errorCount++;

			// If the preload action has already failed, ignore further action.
			if ( this.isRejected() ) {

				return;

			}

			this.state = this.states.REJECTED;

			this.deferred.reject( imageLocation );

		},


		// I handle the load-success of the given image location.
		handleImageLoad: function handleImageLoad( imageLocation ) {

			this.loadCount++;

			// If the preload action has already failed, ignore further action.
			if ( this.isRejected() ) {

				return;

			}

			// Notify the progress of the overall deferred. This is different
			// than Resolving the deferred - you can call notify many times
			// before the ultimate resolution (or rejection) of the deferred.
			this.deferred.notify({
				percent: Math.ceil( this.loadCount / this.imageCount * 100 ),
				imageLocation: imageLocation
			});

			// If all of the images have loaded, we can resolve the deferred
			// value that we returned to the calling context.
			if ( this.loadCount === this.imageCount ) {

				this.state = this.states.RESOLVED;

				this.deferred.resolve( this.imageLocations );

			}

		},


		// I load the given image location and then wire the load / error
		// events back into the preloader instance.
		// --
		// NOTE: The load/error events trigger a $digest.
		loadImageLocation: function loadImageLocation( imageLocation ) {

			var preloader = this;

			// When it comes to creating the image object, it is critical that
			// we bind the event handlers BEFORE we actually set the image
			// source. Failure to do so will prevent the events from proper
			// triggering in some browsers.
			var image = $( new Image() )
					.load(
					function( event ) {

						// Since the load event is asynchronous, we have to
						// tell AngularJS that something changed.
						$rootScope.$apply(
							function() {

								preloader.handleImageLoad( event.target.src );

								// Clean up object reference to help with the
								// garbage collection in the closure.
								preloader = image = event = null;

							}
						);

					}
				)
					.error(
					function( event ) {

						// Since the load event is asynchronous, we have to
						// tell AngularJS that something changed.
						$rootScope.$apply(
							function() {

								preloader.handleImageError( event.target.src );

								// Clean up object reference to help with the
								// garbage collection in the closure.
								preloader = image = event = null;

							}
						);

					}
				)
					.prop( "src", imageLocation )
				;

		}

	};


	// Return the factory instance.
	return( Preloader );

});
'use strict';

angular.module('footer').directive('footerInfo', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Footer info directive logic
				// ...
				element.addClass('FI-body');
				element.append('<h2 class="md-title">Top Clippers</h2>');
				element.append('<div class="md-body-1">Best Price</div>');
				element.append('<div class="md-body-1">Best Quality</div>');
				element.append('<div class="md-body-1">Best Choice</div>');
			}
		};
	}
]);
// Jumbo Menus

'use strict';

angular.module('jumbo-menu').directive('jumboMenu', ['$compile',
	function($compile) {
		return {
			restrict: 'E',
			controller: jumboMenuCtrl,
			controllerAs: 'ctrl',
			link: function postLink(scope, element, attrs) {

				var ctrl = element.controller('jumboMenu')
				var menuContainer = angular.element('<div layout="row" layout-align="center center" layout-margin></div>')

				//Create Menus
				angular.forEach(ctrl.menuItems, function(value, key) {
					var menu = angular.element('<div>'+value.menuName+'</div>');

					var crntExpandMenu;

					menu.css('margin','0 15px 0 15px');
					menu.bind("mouseenter",function() {
						//console.log('menu entered ' + this);
						TweenMax.set(expandsMenu, {display: 'none'}); //reset
						TweenMax.set(expandsMenu[key], {display: 'block'});
						element.append(expandsMenu[key]);

						element.bind("mouseleave",function() {
							TweenMax.set(expandsMenu, {display: 'none'});
							expandsMenu[key].detach();
						});
					});

					menuContainer.append(menu);
				});

				// Create Sub Expand Menus
				var expandsMenu = [];
				angular.forEach(ctrl.menuItems, function(value, key) {
					//columns
					var contentList1 = angular.element('<ul class="firstList"></ul>');
					var contentList2 = angular.element('<ul class="secondList" style="display: -webkit-inline-box;"></ul>');

					var expandMenu = angular.element('<div></div>');
					expandMenu.addClass('expand-menu');
					var contentContainer = angular.element('<div class="subMenuExpanded" layout="column"></div>');
					var contentRow = angular.element('<div class="subMenuExpanded" layout="row" layout-sm="column"></div>');
					var contentFirstCol = angular.element('<div class="first-column" flex-gt-sm="30"></div>');

					var contentSecondCol = angular.element('<div layout="row" hide-sm class="second-column" flex-gt-sm="70"></div>');
					var imageList = angular.element('<div layout="row"></div>');

					// Column 1 Contents
					var colContent1 = [];
					angular.forEach(value.subMenus, function(value, key){
						var col1 = angular.element('<li>'+value.name+'</li>');
						this.push(col1);
						contentList1.append(col1);
					}, colContent1);

					// Column 2 Contents
					var colContent2 = [];
					angular.forEach(value.subMenus, function(value, key){
						if(value.imageUrl){
							var col2 = angular.element('<li></li>');
							var imageContainer = angular.element('<img/>');
							imageContainer.attr("src", value.imageUrl);
							imageContainer.css('width', '100px');
							imageContainer.css('height', '100px');
							col2.append(imageContainer);
							contentList2.append(col2);
							this.push(col2);
						}
					}, colContent2);

					contentContainer.append(contentRow);
					contentRow.append(contentFirstCol);
					contentRow.append(contentSecondCol);

					contentFirstCol.append(contentList1);
					contentSecondCol.append(contentList2);
					expandMenu.append(contentContainer);
					this.push(expandMenu);
				},expandsMenu);

				$compile(menuContainer)(scope);
				element.append(menuContainer);

				element.css('background-color', '#e5e9e8');
				element.css('z-index', '99');
				element.css('border-top', '2px rgb(136, 111, 111) solid');
				element.css('border-bottom', '2px rgb(136, 111, 111) solid');
			}
		};
	}
]);

function jumboMenuCtrl() {
	var vm = this;
	vm.title = 'menu';
	vm.expanded = false;
	vm.expandMenu = function(index){
		//console.log(vm.menus[index]);
	}
	vm.menuItems = [
		{menuName: 'Clipers',
			subMenus:[
				{name:'Andis',link:'#/123', imageUrl:'https://at-home.andis.com/images_and_docs/24140-dualvolt-cord-cordless-clipper-kit-rcc-angle-390x460.png'},
				{name:'Wahl',link:'#/123', imageUrl:'https://at-home.andis.com/images_and_docs/68100-headstyler-clipper-kit-rs-1-angle-390x460.png'},
				{name:'Oster',link:'#/123', imageUrl:'https://at-home.andis.com/images_and_docs/18665-home-haircut-19-piece-kit-mc-2-straight-390x460.png'}
			]
		},
		{menuName: 'Trimmers',
			subMenus:[
				{name:'Trimmers1',link:'', imageUrl:'https://at-home.andis.com/images_and_docs/75360-easycut-20-piece-haircutting-kit-raca-angle-390x460.png'},
				{name:'Trimmers2',link:'', imageUrl:'https://at-home.andis.com/images_and_docs/18460-home-haircut-19-piece-kit-mc-2-angle-390x460.png'},
				{name:'Trimmers3',link:'', imageUrl:'https://at-home.andis.com/images_and_docs/18575-home-haircut-9-piece-kit-mc-2-straight-390x460.png'}]
		},
		{menuName: 'Accessaries',
			subMenus:[
				{name:'Accessaries1',link:'', },
				{name:'Accessaries2',link:'', },
				{name:'Accessaries1',link:'', imageUrl:'https://at-home.andis.com/images_and_docs/63765-easycut+-clipper-kit-raca-straight-390x460.png'},
				{name:'Accessaries2',link:'', imageUrl:'https://at-home.andis.com/images_and_docs/18575-home-haircut-9-piece-kit-mc-2-straight-390x460.png'},
				{name:'Accessaries3',link:'', },
				{name:'Accessaries1',link:'', imageUrl:'https://at-home.andis.com/images_and_docs/63765-easycut+-clipper-kit-raca-straight-390x460.png'},

				{name:'Accessaries3',link:'', },
				{name:'Accessaries1',link:'', imageUrl:'https://at-home.andis.com/images_and_docs/63765-easycut+-clipper-kit-raca-straight-390x460.png'},
				{name:'Accessaries2',link:'', },
				{name:'Accessaries3',link:'', imageUrl:'https://barber-and-beauty.andis.com/images_and_docs/64850-ceramic-bgr+-clipper-bgr+-straight-390x460.png'}]}
	];
}
'use strict';

//Setting up route
angular.module('payment').config(['$stateProvider',
	function($stateProvider) {
		// Payment state routing
		$stateProvider.
		state('checkout', {
			url: '/checkout',
			templateUrl: 'modules/payment/views/checkout.client.view.html'
		}).
		state('transactions', {
			url: '/transactions',
			templateUrl: 'modules/payment/views/transactions.client.view.html'
		}).
		state('bt-payment-test', {
			url: '/bt-payment-test',
			templateUrl: 'modules/payment/views/bt-payment-test.client.view.html'
		});
	}
]);
'use strict';

angular.module('payment').controller('BtPaymentTestController', ['$scope','$http', 'clientTokenPath','TokenBraintree',
	function($scope, $http, clientTokenPath, TokenBraintree) {
		var token='';

		//var token = TokenBraintree.get();
		//token.$promise.then(function(data){
		//	console.log(data);
		//})

		//$http.get('/client-token').success(function(data){
		//	console.log(data);
		//	braintree.setup(data, "custom", {
		//		id:"checkout",
		//		hostedFields:{
		//			styles: {
		//				"input": {
		//					"color": "#3A3A3A",
		//					"transition": colorTransition,
		//					"-webkit-transition": colorTransition
		//				},
		//				":focus": { color: "#333333" },
		//				".invalid": { color: "#FF0000" }
		//			},
		//			number:{
		//				selector:"#number"
		//			},
		//			expirationDate:{
		//				selector: "#expiration-date"
		//			}
		//		}
		//	});
		//});
		//var colorTransition = 'color 100ms ease-out';

		$scope.addCustomer = function(){
			$http.get('/addNewCustomer').success(function(data){
				$scope.resultCust = data;
				console.log(data);
			});
		}

	}
]);

angular.module('payment').controller('dropinCtrl', dropinCtrl);
function dropinCtrl($http) {
	var vm = this;
	vm.title = 'dropin test';
	//$http.get('/client-token').success(function (data) {
	//	braintree.setup(data, "dropin", {
	//		container: "payment-form"
	//	});
	//});
}


	angular.module('payment').controller('checkout', checkout);

	function checkout($scope, $http) {

		var client;

		$scope.creditCard = {
			cardholderName: null,
			number: null,
			expirationMonth: null,
			expirationYear:  null,
			cvv: null
		};

		$scope.dropinOptions = {
			onPaymentMethodReceived: function (payload) {
				//e.preventDefault();
				console.log(payload); // yay
				// - Send nonce to your server (e.g. to make a transaction)
				$http.post('/buy-something', {payment_method_nonce: payload.nonce}).success(function(response){
						console.log(response);
						$scope.result = response;
				});
			}
		}
	};



'use strict';

angular.module('payment')
    .constant('clientTokenPath', '/client-token')
    .controller('BtPaymentController', BtPaymentController);

// directive controller
function BtPaymentController($scope, $http, $braintree) {
    $scope.title = "등록하기";
    var client;
    $scope.creditCard = {
        number: '',
        expirationDate: ''
    };

    var startup = function() {
        $braintree.getClientToken().success(function(token) {
            client = new $braintree.api.Client({
                clientToken: token
            });
        });
    }

    $scope.creditCard.number = "4111111111111111";
    $scope.creditCard.expirationDate ="10/18";

    $scope.payButtonClicked = function() {
        console.log("clicked");
        // - Validate $scope.creditCard
        // - Make sure client is ready to use
        client.tokenizeCard({
            number: $scope.creditCard.number,
            cardholderName: "John Smith",
            expirationDate: $scope.creditCard.expirationDate,
            cvv:"832",
            billingAddress: {
                postalCode: "94107"
            }

        }, function (err, nonce) {
            console.log("err: " + err);
            console.log("nonce: "+nonce);

            $http.post('/buy-something', {nonce:nonce}).success(function(data){
                console.log(data);
                alert('1');
            })
            .error(function(){
                alert('2');
                })


            // - Send nonce to your server (e.g. to make a transaction)
        });
    };
    startup();

}
'use strict';

angular.module('payment').controller('CheckoutController', CheckoutController);

function CheckoutController($scope, Cartlist) {
	var vm = this;
	vm.total = 0;

	vm.items = Cartlist.getItems();
	vm.total = Cartlist.getTotal();
}

'use strict';

angular.module('payment').controller('CustomCheckoutController', CustomCheckoutController);

	function CustomCheckoutController($scope, $http, $braintree) {
		// Custom checkout controller logic
		// ...

		var client;
		$scope.cCard = {
			number: '',
			expirationDate: ''
		};

		var startup = function() {
			$braintree.getClientToken().success(function(token) {
				client = new $braintree.api.Client({
					clientToken: token
				});
			});
		}

		$scope.cCard.number = "4111111111111111";
		$scope.cCard.expirationDate ="10/18";

		$scope.makePayment = function() {

			// - Validate $scope.creditCard
			// - Make sure client is ready to use

			client.tokenizeCard({
				number: $scope.cCard.number,
				expirationDate: $scope.cCard.expirationDate
			}, function (err, nonce) {

				console.log("err: " + err);
				console.log("nonce: "+nonce);

				$http.post('/buy-something', {nonce:nonce}).success(function(data){
					console.log(data);
					alert('1');
				})
					.error(function(){
						alert('2');
					})

			});
		};

		startup();

		//braintree.setup("CLIENT-TOKEN-FROM-SERVER", "custom", {id: "checkout"});

	}
'use strict';

angular.module('payment').controller('TransactionsController', TransactionsController);
	function TransactionsController($scope, $http) {
		 $http.get('findTransactions').success(function(data){
			 $scope.transactions = data;
		});

		$scope.result = '';
		var test = function(id){
			$http.get('findTransaction/'+id).success(function(data){
				$scope.result = data;
			});
		};

		$scope.findT = function(id){
			console.log(id);
			test(id);
		}



	}

'use strict';

angular.module('payment').directive('btPayment', [
	function() {
		return {
			templateUrl: 'modules/payment/directives/template/bt-payment.html',
			restrict: 'E',
            controller: 'BtPaymentController',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);
'use strict';

angular.module('payment').factory('TokenBraintree', ['$resource',
	function($resource) {
		// Tokenbraintree service logic
		// ...
		// Public API
		return $resource('/client-token',{},
			{ 'get':    {method:'GET'},
			'save':   {method:'POST'},
			'query':  {method:'GET', isArray:true},
			'remove': {method:'DELETE'},
			'delete': {method:'DELETE'} });
	}
]);

'use strict';

//Setting up route
angular.module('product-brands').config(['$stateProvider',
	function($stateProvider) {
		// Product brands state routing
		$stateProvider.
		state('listProductBrands', {
			url: '/product-brands',
			templateUrl: 'modules/product-brands/views/list-product-brands.client.view.html'
		}).
		state('createProductBrand', {
			url: '/product-brands/create',
			templateUrl: 'modules/product-brands/views/create-product-brand.client.view.html'
		}).
		state('viewProductBrand', {
			url: '/product-brands/:productBrandId',
			templateUrl: 'modules/product-brands/views/view-product-brand.client.view.html'
		}).
		state('editProductBrand', {
			url: '/product-brands/:productBrandId/edit',
			templateUrl: 'modules/product-brands/views/edit-product-brand.client.view.html'
		});
	}
]);
'use strict';

// Product brands controller
angular.module('product-brands').controller('ProductBrandsController', ['$scope', '$stateParams', '$location', 'Authentication', 'ProductBrands',
	function($scope, $stateParams, $location, Authentication, ProductBrands) {
		$scope.authentication = Authentication;

		// Create new Product brand
		$scope.create = function() {
			// Create new Product brand object
			var productBrand = new ProductBrands ({
				name: this.name
			});

			// Redirect after save
			productBrand.$save(function(response) {
				$location.path('product-brands/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Product brand
		$scope.remove = function(productBrand) {
			if ( productBrand ) { 
				productBrand.$remove();

				for (var i in $scope.productBrands) {
					if ($scope.productBrands [i] === productBrand) {
						$scope.productBrands.splice(i, 1);
					}
				}
			} else {
				$scope.productBrand.$remove(function() {
					$location.path('product-brands');
				});
			}
		};

		// Update existing Product brand
		$scope.update = function() {
			var productBrand = $scope.productBrand;

			productBrand.$update(function() {
				$location.path('product-brands/' + productBrand._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Product brands
		$scope.find = function() {
			$scope.productBrands = ProductBrands.query();
		};

		// Find existing Product brand
		$scope.findOne = function() {
			$scope.productBrand = ProductBrands.get({ 
				productBrandId: $stateParams.productBrandId
			});
		};
	}
]);
'use strict';

angular.module('product-brands').directive('brandCreate', [
	function() {
		return {
			templateUrl: 'modules/product-brands/directives/template/brand-create.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);

angular.module('product-brands').directive('brandList', [
    function() {
        return {
            templateUrl: 'modules/product-brands/views/list-product-brands.client.view.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    }
]);
'use strict';

//Product brands service used to communicate Product brands REST endpoints
angular.module('product-brands').factory('ProductBrands', ['$resource',
	function($resource) {
		return $resource('product-brands/:productBrandId', { productBrandId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('reviews').config(['$stateProvider',
	function($stateProvider) {
		// Reviews state routing
		$stateProvider.
		state('listReviews', {
			url: '/reviews',
			templateUrl: 'modules/reviews/views/list-reviews.client.view.html'
		}).
		state('createReview', {
			url: '/reviews/create',
			templateUrl: 'modules/reviews/views/create-review.client.view.html'
		}).
		state('viewReview', {
			url: '/reviews/:reviewId',
			templateUrl: 'modules/reviews/views/view-review.client.view.html'
		}).
		state('editReview', {
			url: '/reviews/:reviewId/edit',
			templateUrl: 'modules/reviews/views/edit-review.client.view.html'
		});
	}
]);
'use strict';

// Reviews controller
angular.module('reviews').controller('ReviewsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Reviews',
	function($scope, $stateParams, $location, Authentication, Reviews) {
		$scope.authentication = Authentication;

		// Create new Review
		$scope.create = function() {
			// Create new Review object
			var review = new Reviews ({
				title: this.title,
				rate: this.rate,
				pros: this.pros,
				cons: this.cons,
				notes: this.notes
			});

			// Redirect after save
			review.$save(function(response) {
				$location.path('reviews/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Review
		$scope.remove = function(review) {
			if ( review ) { 
				review.$remove();

				for (var i in $scope.reviews) {
					if ($scope.reviews [i] === review) {
						$scope.reviews.splice(i, 1);
					}
				}
			} else {
				$scope.review.$remove(function() {
					$location.path('reviews');
				});
			}
		};

		// Update existing Review
		$scope.update = function() {
			var review = $scope.review;

			review.$update(function() {
				$location.path('reviews/' + review._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Reviews
		$scope.find = function() {
			$scope.reviews = Reviews.query();
		};

		// Find existing Review
		$scope.findOne = function() {
			$scope.review = Reviews.get({ 
				reviewId: $stateParams.reviewId
			});
		};
	}
]);
'use strict';

angular.module('reviews').directive('reviewList', ['$compile','Reviews',
	function($compile) {
		return {
			restrict: 'E',
			controller: reviewCtrl,
			controllerAs: 'review',
			link: function postLink(scope, element, attrs) {
				var container = angular.element('<md-content class="review-list-container"></md-content>');
				var list = angular.element('<md-list></md-list>');
				var subHeader = angular.element('<md-subheader class="md-no-sticky"></md-subheader>');
				var listItem = angular.element('<md-list-item class="md-3-line" ng-repeat="item in review.reviews"></md-list-item>');
				var image = angular.element('<img ng-src="{{item.face}}" class="md-avatar" alt="{{item.who}}">');
				var reviewContent = angular.element('<div class="md-list-item-text"></div>');
				var reviewContent_what = angular.element('<h3 class="md-title">{{item.title}}</h3>');
				var reviewContent_rate = angular.element('<rating ng-model="item.rate" max="review.max" readonly="review.isReadonly" on-hover="review.hoveringOver(value)" on-leave="review.overStar = null"></rating>');
				var reviewContent_who = angular.element('<h3>{{item.user.displayName}}</h3>');
				var reviewContent_notes = angular.element('<p>{{item.notes}}</p>');
				var reviewContent_prosConsContainer = angular.element('<div layout="column" layout-gt-sm="row" layout-align="center center" layout-align-gt-sm="space-around start" layout-margin layout-padding></div>');
				var reviewContent_pros = angular.element('<div flex-gt-sm="50" flex="100"><div class="md-body-2">Pros</div><p ng-bind="item.pros"></p></div>');
				var reviewContent_cons = angular.element('<div flex-gt-sm="50" flex="100"><div class="md-body-2">Cons</div><p ng-bind="item.cons"></p></div>');

				reviewContent_rate.css('pointer-events','none');

				//container.addClass('review-list-container');
				container.append(list);
				list.append(subHeader);
				list.append(listItem);
				listItem.append(image);
				listItem.append(reviewContent);
				reviewContent.append(reviewContent_what);
				reviewContent.append(reviewContent_rate);
				reviewContent.append(reviewContent_who);
				reviewContent.append(reviewContent_notes);


				reviewContent_prosConsContainer.append(reviewContent_pros);
				reviewContent_prosConsContainer.append(reviewContent_cons);
				reviewContent.append(reviewContent_prosConsContainer);

				$compile(container)(scope);
				element.append(container);
			}
		};
	}
]);

function reviewCtrl(Reviews){
	var vm = this;
	vm.max = 5;
	vm.isReadonly = true;
	vm.hoveringOver = function(value) {
		vm.overStar = value;
		vm.percent = 100 * (value / vm.max);
	};
	var imagePath = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ39h-I8zmB9QVskyCaly2VpKL07s1NgkZxYn6VXQYA796U5daOQ';
	var reviewQuery = Reviews.query();
	reviewQuery.$promise.then(function(result){
		vm.reviews = result.map(function(data){
			var review = {};
			review = data;
			review.face = imagePath;
			return review;
		})
	});
}


'use strict';


angular.module('reviews').directive('reviewSummary', reviewSummary);

function reviewSummary($compile) {
	return {
		restrict: 'E',
		controller: reviewSummaryCtrl,
		controllerAs: 'reviewSumCtrl',

		link: function postLink(scope, element, attrs) {
			var container = angular.element('<md-content></md-content>');
			var recentReview;
			var NoRecentReview;
			var header = angular.element(
				'<md-fab-toolbar md-open="reviewSumCtrl.isOpen" count="reviewSumCtrl.demo.count" ng-class="reviewSumCtrl.demo.selectedAlignment">'+
					'<md-fab-trigger class="align-with-text">'+
						'<md-button aria-label="menu" class="md-fab md-primary">'+
							'<md-icon md-svg-src="modules/reviews/img/menu.svg"></md-icon>'+
						'</md-button>'+
					'</md-fab-trigger>'+
					'<md-toolbar>'+
						'<md-fab-actions class="md-toolbar-tools">'+
							'<md-button aria-label="comment" class="md-icon-button">'+
								//'<md-icon md-svg-src="modules/reviews/img/menu.svg"></md-icon>'+
								'Best'+
							'</md-button>'+
							'<md-button aria-label="label" class="md-icon-button">'+
								//'<md-icon md-svg-src="modules/reviews/img/menu.svg"></md-icon>'+
								'Worst'+
							'</md-button>'+
							'<md-button aria-label="photo" class="md-icon-button">'+
								//'<md-icon md-svg-src="modules/reviews/img/menu.svg"></md-icon>'+
								'Write'+
							'</md-button>'+
					'</md-fab-actions>'+
					'</md-toolbar>'+
				'</md-fab-toolbar>');
			$compile(header)(scope);

			element.append(header);
		}
	};
}


function reviewSummaryCtrl($scope) {
	var vm = this;
  vm.isOpen = false;
	vm.demo = {
		isOpen: false,
		count: 0,
		selectedAlignment: 'md-left'
	};
}

'use strict';

angular.module('reviews').directive('reviewWrite', ['$compile',
	function($compile) {
		return {
			controller: reviewWriteCtrl,
			controllerAs: 'ctrl',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				var container = angular.element('<md-content></md-content>');

				//var textField = angular.element('<textarea ng-model="htmlcontent" style="width: 100%"></textarea>');
				var angularText = angular.element('<div text-angular="text-angular" name="htmlcontent" ng-model="htmlcontent" ta-disabled="disabled"></div>')
				var btnContainer = angular.element('<div layout="row"></div>');
				var addVideo = angular.element('<md-button class="md-primary md-raised">Add Video</md-button>')
				var addPhoto = angular.element('<md-button class="md-primary md-raised">Add Image</md-button>')
				//textField.addClass('review-textarea');
				//container.append(textField);
				btnContainer.append(addVideo);
				btnContainer.append(addPhoto);
				container.append(btnContainer);

				$compile(container)(scope);
				$compile(angularText)(scope);
				element.append(angularText);
				element.append(container);
			}
		};
	}
]);

function reviewWriteCtrl($scope) {
	$scope.orightml = '<h2>Try me!</h2>'+
		'<p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p>'
		+'<p><img class="ta-insert-video" ta-insert-video="http://www.youtube.com/embed/2maA1-mvicY" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/></p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p><h4>Supports non-latin Characters</h4>';
	$scope.htmlcontent = $scope.orightml;
	$scope.disabled = false;
}
'use strict';

//Reviews service used to communicate Reviews REST endpoints
angular.module('reviews').factory('Reviews', ['$resource',
	function($resource) {
		return $resource('reviews/:reviewId', { reviewId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('shop-cart').config(['$stateProvider',
	function($stateProvider) {
		// Shop cart state routing
		$stateProvider.
		state('cart', {
			url: '/cart',
			templateUrl: 'modules/shop-cart/views/cart.client.view.html'
		});
	}
]);
'use strict';

angular.module('shop-cart').controller('ShopCartController', ShopCartController);

function ShopCartController($scope, Cartlist) {
	//Add Item

	var vm = this;
	vm.imagePath = 'https://material.angularjs.org/img/washedout.png';
	vm.itemlist = Cartlist.getItems();

	vm.allContacts = loadContacts();
	vm.contacts = [vm.allContacts[0]];
	vm.filterSelected = true;

	function loadContacts() {
		var contacts = [
			'Marina Augustine',
			'Oddr Sarno',
			'Nick Giannopoulos',
			'Narayana Garner',
			'Anita Gros',
			'Megan Smith',
			'Tsvetko Metzger',
			'Hector Simek',
			'Some-guy withalongalastaname'
		];
		return contacts.map(function (c, index) {
			var cParts = c.split(' ');
			var contact = {
				name: c,
				email: cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com',
				image: 'http://lorempixel.com/50/50/people?' + index
			};
			contact._lowername = contact.name.toLowerCase();
			return contact;
		});
	}
}
//<md-icon md-svg-icon="modules/shop-cart/img/codepen.svg"></md-icon>
'use strict';

angular.module('shop-cart').directive('shopCart', shopCartDirective);

function shopCartDirective($compile, $state, Cartlist) {
	return {
		template: '<div layout="row">' +
								'<md-button class="md-fab md-mini" ng-click="close()" aria-label="Shopping Cart Close (shop-cart)">' +
									'<span><md-icon class="ion-close-round"></md-icon></span></md-button></div>',
		controller:shopCartDirectiveCtrl,
		controllerAs:'shCtrl',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
			var cartContainer, cartTotal, content, noContent, checkOut, testAdd, clearAll;
			var isOpen = false;
			var shopCartCtrl;

			element.addClass('shopCartFloat');
			scope.total = 0;

			function create(){
				cartContainer = angular.element('<div class="shopCartContainer" ></div>');
				noContent = angular.element('<div ng-if="items" layout="column" class="md-body-1" layout-align="center center"><div flex>No Items</div></div>');
				content = angular.element('<div layout="row" class="md-caption" ng-repeat="item in shCtrl.items track by $index"><img width="45" height="45" ng-src="{{item.image}}"><div class="item-name" flex="50">{{item.name}}</div><div flex="25" class="item-price">{{item.price | currency:"$"}}</div><div flex="10" class="item-qnt">{{item.qnt}}</div></div>');
				cartTotal = angular.element('<hr/><div layout="row" class="md-caption"><div flex="70">Total: </div><div flex="30" class="shopCartTotal" >{{shCtrl.total | currency:"USD$"}}</div></div>');
				checkOut = angular.element('<div style="text-align:center;">Proceed to Checkout</div>');
				clearAll = angular.element('<div style="text-align:center;">Clear Add</div>');

				if(shopCartCtrl == undefined){
					shopCartCtrl = element.controller('shopCart');
				}

				// Content Container
				element.append(cartContainer);
				// No content tag
				cartContainer.append(noContent);
				// content tag
				cartContainer.append(content);
				// Content Total
				element.append(cartTotal);
				element.append(checkOut);
				element.append(clearAll);

				//Compile tag
				$compile(noContent)(scope);
				$compile(cartTotal)(scope);
				$compile(content)(scope);

				$compile(cartContainer)(scope);

				checkOut.on('click', function(){
					$state.go('checkout');
				})
				clearAll.on('click', shopCartCtrl.clearAll);

				//Broadcast listner
				scope.$on('cart-updated', function(event, args){
					scope.open();

					var targetUpdate = _.findIndex(shopCartCtrl.items, function(chr) {
						return chr._id === args.product._id;
					});

					Cartlist.addItem(args.product, targetUpdate);
					shopCartCtrl.total = Cartlist.getTotal();
				});

				scope.$on('open-cart', function(event, args){
					scope.open();
				});

			};

			// Close Shopping Cart Directive
			scope.close = function(){
				var tlClose = new TimelineMax({paused:true});
				tlClose
					.to(element, 0.4, {scale:0, alpha:0})
					.set(element, {display:'none'}, 0.4);
				tlClose.restart();
				isOpen = false;
			};

			// Open Shopping Cart Directive
			scope.open = function(){
				var tlOpen = new TimelineMax({paused:true});
				tlOpen
					.set(element, {display:'block'})
					.to(element, 0.4, {scale:1, alpha:1});
				tlOpen.restart();
				isOpen = true;
			};

			create();
		}
	};
}

function shopCartDirectiveCtrl($scope, $state, Cartlist, localStorageService){

	var shCtrl = this;
	shCtrl.total = 0;
	shCtrl.items = Cartlist.getItems();
	shCtrl.total = Cartlist.getTotal();

	shCtrl.checkOut = function(){
		console.log('checkout');
		$state.go('checkout');
	};

	shCtrl.clearAll = function(){
		localStorageService.clearAll;
		shCtrl.items = Cartlist.clearItem();
		$scope.$digest();
		console.log('cleared All items');
	};
}

'use strict';

angular.module('shop-cart').factory('Cartlist', Cartlist);

function Cartlist(localStorageService) {
	var items = localStorageService.get('shoppingList') || [];
	var total = 0;

	return {
		addItem: function(item, exist) {
			if(item.qnt === undefined)
				item.qnt = 1;
			else
				item.qnt += 1;

			if(exist < 0)
				items.push(item);
			localStorageService.set('shoppingList', items);
		},
		getItems: function(){
			return items;
		},
		clearItem: function(){
			localStorageService.remove('shoppingList');
			return items = [];
		},
		getTotal: function(){
			console.log('total');
			total = 0;
			items.forEach(function(value){
				total += value.qnt * value.price;
			})
			return total;
		}


	};
}

'use strict';

//Setting up route
angular.module('slide-show').config(['$stateProvider',
	function($stateProvider) {
		// Slide show state routing
		$stateProvider.
		state('slide-show-view', {
			url: '/slide-show-view',
			templateUrl: 'modules/slide-show/views/slide-show-view.client.view.html'
		});
	}
]);
'use strict';

angular.module('slide-show').controller('SlideShowViewController', ['$scope',
	function($scope) {
		// Slide show view controller logic
		// ...
	}
]);
'use strict';

angular.module('slide-show').directive('slideShowCust', [
	function() {
		return {
			templateUrl: 'modules/slide-show/directives/template/slide-show.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				var
					slider = $('#slider'),
					slides = slider.children(),
					slideCount = slides.length,
					currentSlide = 0,
					duration = 4,
					fadeSpeed = 1,

					slide1 = $("#slide1"),
					slide2 = $("#slide2"),
					slide3 = $("#slide3"),

					playBtn = $("#playbtn"),
					pauseBtn = $("#pausebtn"),
					resumeBtn = $("#resumebtn"),
					stopBtn = $("#stopbtn"),
					restartBtn = $("#restartbtn"),
					reverseBtn = $("#reversebtn"),
					nextBtn = $("#nextbtn"),
					prevBtn = $("#prevbtn"),

					slide1Btn = $("#slide1btn"),
					slide2Btn = $("#slide2btn"),
					slide3Btn = $("#slide3btn"),

					progressBar = $("#progressBar"),
					tl = new TimelineMax({
						paused:true,
						repeat:1,
						//onComplete: restartTimeline,
						//onCompleteParams: ["{self}"],
						//onReverseComplete: reverseTimeline,
						//onReverseCompleteParams: ["{self}"]
					});

				updateZindex();


				var windowWidth = $(window).outerWidth();
				var titleWIdth = 300;//$('.slide-title')[0].outerWidth();

				///////////////////////////////////////////////////////
				// functions for building nested timelines
				function animateSlide1() {
					var header = $('.title');
					var p1 = $('.product1');
					var p2 = $('.product2');
					var p3 = $('.product3');

					var slideTL1 = new TimelineMax({
						onComplete: prepNext,
						onCompleteParams: ["{self}", slide1]
					});


					slideTL1
						.add(TweenMax.set('.slide-title',{x:0}))
						.add("slide1fade")
						.set(slide1,{'opacity':1})
						.add( TweenMax.to(slide1, fadeSpeed, {css:{autoAlpha:0}}))
						.add( TweenMax.to('.slide-title', 2, {x:(windowWidth - titleWIdth)/2}))
						.add("slide1afterfade")
						.fromTo(header, 0.7, {y:'-200'},{y:0}, 0)
						.add( TweenMax.to(slide1, duration) )
						.from(progressBar, slideTL1.duration(), {scaleX:0, transformOrigin:"0px 0px", ease:Linear.easeNone}, 0)


					return slideTL1;
				}

				function animateSlide2() {

					var slideTL2 = new TimelineMax({
						onComplete: prepNext,
						onCompleteParams: ["{self}", slide2]
					});

					slideTL2
						.add(TweenMax.set('.slide-title',{x:0}))
						.add("slide2fade")
						//.set(slide2,{'opacity':1})
						.add(TweenMax.to(slide2, fadeSpeed, {css:{autoAlpha:0}}) )
						.add( TweenMax.to('.slide-title', 2, {x:(windowWidth - titleWIdth)/2}))
						.add("slide2afterfade")
						.add(TweenMax.to(slide2, duration))
						.from(progressBar, slideTL2.duration(), {scaleX:0, transformOrigin:"0px 0px", ease:Linear.easeNone}, 0);

					return slideTL2;
				}

				function animateSlide3() {

					var slideTL3 = new TimelineMax({
						onComplete: prepNext,
						onCompleteParams: ["{self}", slide3]
					});

					slideTL3
						.add(TweenMax.set('.slide-title',{x:0}))
						.add("slide3fade")
						//.set(slide3, {'opacity':1})
						.add(TweenMax.to(slide3, fadeSpeed, {css:{autoAlpha:0}}))
						.add( TweenMax.to('.slide-title', 2, {x:(windowWidth - titleWIdth)/2}))
						.add("slide3afterfade")
						.add(TweenMax.to(slide3, duration))
						.from(progressBar, slideTL3.duration(), {scaleX:0, transformOrigin:"0px 0px", ease:Linear.easeNone}, 0);

					return slideTL3;
				}

				// update zindex on all slides
				function updateZindex(){

					$('#slider').children().css('zIndex',function(i){
						return slideCount-i;
					});
				}

				// prep next slide
				function prepNext(timeline, slide){
					slide.appendTo(slide.parent());
					updateZindex();
					timeline.set(slide,{autoAlpha:1});
					currentSlide = ++currentSlide % slideCount;
					//$('#msg').html(currentSlide);
				}

				function showProgress(timeline) {
					timeline.set(progressBar, {scaleX:timeline.progress(), transformOrigin: "0px 0px"});

				}


				slide1Btn.click(function() {
					tl.play("slide1afterfade");
				});

				//controls
				slide1Btn.click(function() {
					tl.play("slide1afterfade");
				});

				slide2Btn.click(function() {
					tl.play("slide2afterfade");
				});

				slide3Btn.click(function() {
					tl.play("slide3afterfade");
				});

				playBtn.click(function() {
					tl.play("slide1afterfade");
				});

				pauseBtn.click(function() {
					console.log('p');
					tl.pause();
				});

				resumeBtn.click(function() {
					tl.resume();
				});

				stopBtn.click(function() {
					tl.stop();
				});

				restartBtn.click(function() {
					tl.restart();
				});

				reverseBtn.click(function() {
					tl.reverse();
				});

				slider.on("mouseenter",function(){
					tl.pause();
				}).on("mouseleave",function(){
					tl.resume();
				});
					//////////////////////////////////
					// build timeline
						scope.build = function(){
						tl
							.add(animateSlide3(), "slide1")
							.add(animateSlide1(), "slide2")
							.add(animateSlide2(), "slide3")
							.play();
						}
				scope.build();


			}
		};
	}
]);



angular.module('slide-show').controller('DemoCtrl', DemoCtrl);
function DemoCtrl ($timeout, $q, $log) {
	var self = this;
	self.simulateQuery = false;
	self.isDisabled = false;
	self.repos = loadAll();
	self.querySearch = querySearch;
	self.selectedItemChange = selectedItemChange;
	self.searchTextChange = searchTextChange;
	// ******************************
	// Internal methods
	// ******************************
	/**
	 * Search for repos... use $timeout to simulate
	 * remote dataservice call.
	 */
	function querySearch(query) {
		var results = query ? self.repos.filter(createFilterFor(query)) : self.repos,
			deferred;
		if (self.simulateQuery) {
			deferred = $q.defer();
			$timeout(function () {
				deferred.resolve(results);
			}, Math.random() * 1000, false);
			return deferred.promise;
		} else {
			return results;
		}
	}

	function searchTextChange(text) {
		$log.info('Text changed to ' + text);
	}

	function selectedItemChange(item) {
		$log.info('Item changed to ' + JSON.stringify(item));
	}

	/**
	 * Build `components` list of key/value pairs
	 */
	function loadAll() {
		var repos = [
			{
				'name': 'Angular 1',
				'url': 'https://github.com/angular/angular.js',
				'watchers': '3,623',
				'forks': '16,175',
			},
			{
				'name': 'Angular 2',
				'url': 'https://github.com/angular/angular',
				'watchers': '469',
				'forks': '760',
			},
			{
				'name': 'Angular Material',
				'url': 'https://github.com/angular/material',
				'watchers': '727',
				'forks': '1,241',
			},
			{
				'name': 'Bower Material',
				'url': 'https://github.com/angular/bower-material',
				'watchers': '42',
				'forks': '84',
			},
			{
				'name': 'Material Start',
				'url': 'https://github.com/angular/material-start',
				'watchers': '81',
				'forks': '303',
			}
		];
		return repos.map(function (repo) {
			repo.value = repo.name.toLowerCase();
			return repo;
		});
	}

	/**
	 * Create filter function for a query string
	 */
	function createFilterFor(query) {
		var lowercaseQuery = angular.lowercase(query);
		return function filterFn(item) {
			return (item.value.indexOf(lowercaseQuery) === 0);
		};
	}
};
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {

		var wistiaEmbed = Wistia.embed("29b0fbf547", {
			version: "v1",
			videoWidth: 640,
			videoHeight: 360,
			playerColor: "688AAD"
		});
		// insert the 'bind on play' function
		wistiaEmbed.bind('play', function() {
			// use the .time() method to jump ahead 10 seconds
			wistiaEmbed.time(10);
			return this.unbind;
		});

		$scope.play = function(){
			wistiaEmbed.time(30).play();
		};

		//$scope.play();

		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window', function($window) {
	var auth = {
		user: $window.user
	};
	
	return auth;
}]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);