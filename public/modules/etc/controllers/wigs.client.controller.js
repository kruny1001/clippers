'use strict';



angular.module('etc').controller('WigsController',wigsCtrl);
function wigsCtrl($scope, $state, $timeout, EtcProducts, Preloadimage) {
    //$scope.degree = 0;
    $scope.toGo = function(content){
      //console.log(content);
      $state.go("viewEtcProduct", { etcProductId: content._id })
      //var target = $('#'+targetId);
      //$scope.degree += 180;
      //TweenMax.to(target, 0.4 , {rotationY: $scope.degree});
      //console.log($scope.degree);
    };

	$scope.cartGo = function(stateName){
		$state.go(stateName);
	};

		$scope.isLoading = true;
		$scope.isSuccessful = false;
		$scope.percentLoaded = 0;

	var testData =[1,2,3,4];

	$scope.append = function(){
		testData.forEach(function(value){
			$scope.etcProducts.push({name:'232', image:'modules/etc/img/products/1.png'});
		});
		$scope.$digest();
	}

	$scope.loadProduct = EtcProducts.list();
    $scope.loadProduct.$promise.then(function(data){

	    $scope.etcProducts = data;
	    console.log(data);
	    testData = data;
	    var images = data.map(function(d){ return d.image});

	    Preloadimage.preloadImages(images).then(
		    function handleResolve(imageLoactions){
			    // Loading was successful.
			    console.info( "Preload Successful" );

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
			    console.info( "Percent loaded:", event.percent );
			    angular.element();
		    }
	    )

    })


	//$scope.contents = [
   //   {title:"Clipper1", image:"http://img.auctiva.com/imgdata/1/1/2/0/6/5/5/webimg/613326218_o.jpg", Desc:"Cliper1", price:150.00},
   //   {title:"Clipper2", image:"http://img.auctiva.com/imgdata/1/1/2/0/6/5/5/webimg/613326218_o.jpg", Desc:"Cliper2", price:200.00},
   //   {title:"Clipper2", image:"http://img.auctiva.com/imgdata/1/1/2/0/6/5/5/webimg/613326218_o.jpg", Desc:"Cliper2", price:200.00},
   //   {title:"Clipper2", image:"http://img.auctiva.com/imgdata/1/1/2/0/6/5/5/webimg/613326218_o.jpg", Desc:"Cliper2", price:200.00},
   //   {title:"Clipper2", image:"http://img.auctiva.com/imgdata/1/1/2/0/6/5/5/webimg/613326218_o.jpg", Desc:"Cliper2", price:200.00},
   //   {title:"Clipper2", image:"http://img.auctiva.com/imgdata/1/1/2/0/6/5/5/webimg/613326218_o.jpg", Desc:"Cliper2", price:200.00}
	//];
};

