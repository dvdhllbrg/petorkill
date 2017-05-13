/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

$(document).ready(function () {
	$('#start-game-button').click(function () {
		$('#start-screen').addClass('hide');
		$('#game-screen').removeClass('hide');
		setCanvasSize();
	});
});

function setCanvasSize() {
	var height = $('.card').height();
	if (height == 0) {
		$('#game-screen').removeClass('hide');
		height = $('.card').height();
		$('#game-screen').addClass('hide');
	}
	$(canvas).height(height);
}

Vue.component('animal', {
	template: '#animal-template',
	data: function data() {
		return {
			animal: {}
		};
	},
	created: function created() {
		this.fetchAnimal();
		setCanvasSize();
	},
	updated: function updated() {
		this.pixelateImage();
		setCanvasSize();
	},

	methods: {
		fetchAnimal: function fetchAnimal() {
			$.getJSON('/animal', function (data) {
				this.animal = data;
			}.bind(this));
		},
		pixelateImage: function pixelateImage() {
			var ctx = canvas.getContext('2d'),
			    img = new Image();

			ctx.mozImageSmoothingEnabled = false;
			ctx.webkitImageSmoothingEnabled = false;
			ctx.imageSmoothingEnabled = false;

			img.src = '/images/animals/' + this.animal.species + '/' + this.animal.imageNumber + '.jpg';

			img.onload = function () {
				var size = 0.017,
				    w = canvas.width * size;
				h = canvas.height * size;

				ctx.drawImage(img, 0, 0, w, h);
				ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
			};
		},
		unPixelateImage: function unPixelateImage() {
			var ctx = canvas.getContext('2d'),
			    img = new Image();

			ctx.mozImageSmoothingEnabled = true;
			ctx.webkitImageSmoothingEnabled = true;
			ctx.imageSmoothingEnabled = true;

			img.src = '/images/animals/' + this.animal.species + '/' + this.animal.imageNumber + '.jpg';

			img.onload = function () {
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			};
		}
	}
});

Vue.component('controls', {
	template: '#controls-template',
	data: function data() {
		return {
			message: 'What do you do?',
			state: 'guessing',
			score: 0
		};
	},
	methods: {
		petOrKill: function petOrKill(action) {
			var animal = vm.$refs.animal.$data.animal;

			this.state = 'showing';

			if (animal.isPet && action == 'pet') {
				Materialize.toast('Hey there little fella! You\'re such a cute ' + animal.species + '!', 2000);
				$('#stamp').text('CORRECT').removeClass('hide correct incorrect').addClass('correct');
				this.score++;
			} else if (animal.isPet && action == 'kill') {
				Materialize.toast('You monster! How could you possibly kill a ' + animal.species + '?!', 2000);
				$('#stamp').text('INCORRECT').removeClass('hide correct incorrect').addClass('incorrect');
				this.state = 'gameover';
			} else if (!animal.isPet && action == 'pet') {
				Materialize.toast('Come on, just kill the ' + animal.species + ' already. What are you, some kind of vegan?', 2000);
				$('#stamp').text('INCORRECT').removeClass('hide correct incorrect').addClass('incorrect');
				this.state = 'gameover';
			} else if (!animal.isPet && action == 'kill') {
				Materialize.toast('Looking forward to dinner, I\'m so glad we have ' + animal.species + 's so we don\'t have to eat something weird like plants!', 2000);
				$('#stamp').text('CORRECT').removeClass('hide correct incorrect').addClass('correct');
				this.score++;
			}

			vm.$refs.animal.unPixelateImage();
		},
		newGameScreen: function newGameScreen() {
			$('#stamp').addClass('hide');
			this.state = 'guessing';
			vm.$refs.animal.fetchAnimal();
		},
		restartGame: function restartGame() {
			this.score = 0;
			this.newGameScreen();
		}
	}
});

var vm = new Vue({
	el: '#game-screen'
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);