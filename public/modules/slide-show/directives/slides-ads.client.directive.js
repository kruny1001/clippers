'use strict';

angular.module('slide-show').directive('slidesAds',
	function() {
		return {
			templateUrl:'modules/slide-show/directives/template/slides-ads.html',
			restrict: 'E',
			controller: slidesAdsCtrl,
			controllerAs: 'ctrl',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
).animation('.slide-animation', function () {
		return {
			beforeAddClass: function (element, className, done) {
				if (className == 'ng-hide') {
					var scope = element.scope().ctrl,
						finishPoint = element.parent()[0].offsetWidth;
					if(scope.direction !== 'right') finishPoint = -finishPoint;
					console.log('finishPoint' + finishPoint, scope.direction);
					TweenLite.to(element, 0.5, {left:finishPoint, ease: Ease.easeInOut, onComplete: done});
				}
				else {
					done();
				}
			},
			removeClass: function (element, className, done) {
				if (className == 'ng-hide') {
					var scope = element.scope().ctrl,
						startPoint = element.parent()[0].offsetWidth,
						tl = new TimelineLite();
					if(scope.direction === 'right') startPoint = -startPoint;
					console.log('startPoint' + startPoint, scope.direction);
					var ele = $(element);
					tl.fromTo(element, 0.5, { left: startPoint}, {left:0, ease: Ease.easeInOut, onComplete: done})
						.fromTo(ele.find('.title'), 0.5, { left: -200, alpha: 0}, {left:0, alpha:1, ease:Ease.easeInOut} )
						.fromTo(ele.find('.subtitle'), 0.5, { left: -200, alpha: 0}, {left:0, alpha:1, ease:Ease.easeInOut} )
						.fromTo(ele.find('.avatarGsap'), 0.5, { left: 800, alpha: 0}, {left:300, alpha:1, ease:Ease.easeInOut} );
				}
				else {
					done();
				}
			}
		};
	})
	.animation('.transition-animation', function() {
		return {
			enter:function(element, className, done){
				//TweenLite.fromTo(element, 0.6, {scale:0.6},{scale:1, display:'block', opacity:'1'});
			},
			leave: function(element, className, done){
				TweenLite.set(element, {opacity:'0', display:'none'});
			}
		}
	});

function slidesAdsCtrl() {
	var vm = this;
	vm.slides = [
		{bg:'modules/slide-show/img/test/bg1.jpg', avatar: 'modules/slide-show/img/andis/andis_17160.png', title: 'title 1', subtitle: 'sub title 1'},
		{bg:'modules/slide-show/img/test/bg2.jpg', avatar: 'modules/slide-show/img/test/john.png', title: 'title 2', subtitle: 'sub title 2'},
		{bg:'modules/slide-show/img/test/bg3.jpg', avatar: 'modules/slide-show/img/test/lukas.png', title: 'title 3', subtitle: 'sub title 3'}

	];

	vm.direction = 'left';
	vm.currentIndex = 0;

	vm.setCurrentSlideIndex = function (index) {
		console.log(index, vm.currentIndex);

		vm.direction = (index > vm.currentIndex) ? 'left' : 'right';
		vm.currentIndex = index;
	};

	vm.isCurrentSlideIndex = function (index) {
		return vm.currentIndex === index;
	};
}