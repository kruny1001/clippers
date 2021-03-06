'use strict';

angular.module('slide-show').controller('AnimationTestController', ['$scope',
	function($scope) {

		'use strict';

		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');

		var MAX_FLIES = 15;
		var FLY_XSPEED_RANGE = [-1, 1];
		var FLY_YSPEED_RANGE = [-0.5, 0.5];
		var FLY_SIZE_RANGE = [1, 5];
		var FLY_LIFESPAN_RANGE = [75, 150];

		var flies = [];

		function randomRange(min, max) {
			return Math.random() * (max - min) + min;
		}

		function Fly(options) {
			if (!options) { options = {}; }

			this.x = options.x || randomRange(0, canvas.width);
			this.y = options.y || randomRange(0, canvas.height);
			this.xSpeed = options.xSpeed || randomRange(FLY_XSPEED_RANGE[0], FLY_XSPEED_RANGE[1]);
			this.ySpeed = options.ySpeed || randomRange(FLY_YSPEED_RANGE[0], FLY_YSPEED_RANGE[1]);
			this.size = options.size || randomRange(FLY_SIZE_RANGE[0], FLY_SIZE_RANGE[1]);
			this.lifeSpan = options.lifeSpan || randomRange(FLY_LIFESPAN_RANGE[0], FLY_LIFESPAN_RANGE[1]);
			this.age = 0;

			this.colors = options.colors || {
					red: 207,
					green: 255,
					blue: 4,
					alpha: 0
				};
		}

		function fitToScreen(element) {
			element.width = window.innerWidth - 8;
			element.height = window.innerHeight - 37;
		}

		function clearScreen() {
			ctx.beginPath();
			ctx.fillStyle = 'rgb(0, 0, 0)';
			ctx.rect(0, 0, canvas.width, canvas.height);
			ctx.fill();
		}

		function createFlies() {
			if (flies.length !== MAX_FLIES) {
				flies.push(new Fly());
			}
		}

		function moveFlies() {
			flies.forEach(function(fly) {
				fly.x += fly.xSpeed;
				fly.y += fly.ySpeed;
				fly.age++;

				if (fly.age < fly.lifeSpan / 2) {
					fly.colors.alpha += 1 / (fly.lifeSpan / 2);

					if (fly.colors.alpha > 1) { fly.colors.alpha = 1; }
				} else {
					fly.colors.alpha -= 1 / (fly.lifeSpan / 2);

					if (fly.colors.alpha < 0) { fly.colors.alpha = 0; }
				}
			});
		}

		function removeFlies() {
			var i = flies.length;

			while (i--) {
				var fly = flies[i];

				if (fly.age >= fly.lifeSpan) {
					flies.splice(i, 1);
				}
			}
		}

		function drawFlies() {
			flies.forEach(function(fly) {
				ctx.beginPath();
				ctx.fillStyle = 'rgba(' + fly.colors.red + ', ' + fly.colors.green + ', ' + fly.colors.blue + ', ' + fly.colors.alpha + ')';
				ctx.arc(
					fly.x,
					fly.y,
					fly.size,
					0,
					Math.PI * 2,
					false
				);
				ctx.fill();
			});
		}

		function render() {
			clearScreen();
			createFlies();
			moveFlies();
			removeFlies();
			drawFlies();
		}

		window.addEventListener('resize', function() {
			fitToScreen(canvas);
		});

		fitToScreen(canvas);

		(function animationLoop() {
			window.requestAnimationFrame(animationLoop);
			render();
		})();



		var tl = new TimelineLite,
			mySplitText = new SplitText("#quote", {type:"words,chars"}),
			chars = mySplitText.chars; //an array of all the divs that wrap each character
		TweenLite.set("#quote", {perspective:400});
		tl.staggerFrom(chars, 0.8, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:Back.easeOut}, 0.01, "+=0");
		tl.staggerFrom(".s24", 1.5, {scale:0.5, opacity:0, delay:0.5, ease:Elastic.easeOut, force3D:true}, 0.2);

		$scope.animate = function() {
			tl.restart();
		}


	}
]);