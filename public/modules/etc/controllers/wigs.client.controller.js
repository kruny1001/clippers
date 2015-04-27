'use strict';

angular.module('etc').controller('WigsController',wigsCtrl);

	function wigsCtrl($scope, EtcProducts) {
    $scope.degree = 0;
    $scope.flipCard = function(targetId){
      var target = $('#'+targetId);
      $scope.degree += 180;
      TweenMax.to(target, 0.4 , {rotationY: $scope.degree});
      console.log($scope.degree);
    };

    $scope.etcProducts = EtcProducts.query();

    $scope.contents = [
      {title:"Clipper1", image:"http://img.auctiva.com/imgdata/1/1/2/0/6/5/5/webimg/613326218_o.jpg", Desc:"Cliper1", price:150.00},
      {title:"Clipper2", image:"http://img.auctiva.com/imgdata/1/1/2/0/6/5/5/webimg/613326218_o.jpg", Desc:"Cliper2", price:200.00},
      {title:"Clipper2", image:"http://img.auctiva.com/imgdata/1/1/2/0/6/5/5/webimg/613326218_o.jpg", Desc:"Cliper2", price:200.00},
      {title:"Clipper2", image:"http://img.auctiva.com/imgdata/1/1/2/0/6/5/5/webimg/613326218_o.jpg", Desc:"Cliper2", price:200.00},
      {title:"Clipper2", image:"http://img.auctiva.com/imgdata/1/1/2/0/6/5/5/webimg/613326218_o.jpg", Desc:"Cliper2", price:200.00},
      {title:"Clipper2", image:"http://img.auctiva.com/imgdata/1/1/2/0/6/5/5/webimg/613326218_o.jpg", Desc:"Cliper2", price:200.00}
    ];

  };
