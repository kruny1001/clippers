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



	// Load Product
	$scope.loadProduct = EtcProducts.list();
	$scope.loadProduct.$promise.then(function(data){

		$scope.etcProducts = data;
		var images = data.map(function(d){ return d.image});

		Preloadimage.preloadImages(images).then(
			function handleResolve(imageLoactions){
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

	//test split Test
	//var tl = new TimelineLite,
	//
	//	mySplitText = new SplitText("#quote", {type:"words,chars"}),
	//	chars = mySplitText.chars; //an array of all the divs that wrap each character
	//
	//TweenLite.set("#quote", {perspective:400});
	//
	//tl.staggerFrom(chars, 1.2, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:Back.easeOut}, 0.01, "+=0");
	//$scope.splitText = function(){
	//	tl.restart();
	//}

	//var testData =[1,2,3,4];
	//
	//$scope.append = function(){
	//	testData.forEach(function(value){
	//		$scope.etcProducts.push({name:'232', image:'modules/etc/img/products/1.png'});
	//	});
	//	$scope.$digest();
	//}
};

