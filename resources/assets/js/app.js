$(document).ready( () => {
	$('#start-game-button').click(() => {
		$('#start-screen').addClass('hide');
		$('#game-screen').removeClass('hide');
		setCanvasSize();
	});
	if($(window).width() < 768) {
		$('.card').removeClass('horizontal');
	}
});

function setCanvasSize() {
	let height = $('.card-image').height();
	if(height == 0) {
		$('#game-screen').removeClass('hide');
		height = $('.card-image').height();
		$('#game-screen').addClass('hide');
	}
	$(canvas).height(height);
}

Vue.component('animal', {
	template: '#animal-template',
	data: function() {
		return {
			animal: {}
		}
	},
	created() {
		this.fetchAnimal();
		setCanvasSize();
	},
	updated() {
		this.pixelateImage();
		setCanvasSize();
	},
	methods: {
		fetchAnimal: function() {
			$.getJSON('/animal', function(data) {
				this.animal = data;
			}.bind(this));
		},
		pixelateImage() {
			var ctx = canvas.getContext('2d'),
			img = new Image();

			ctx.mozImageSmoothingEnabled = false;
			ctx.webkitImageSmoothingEnabled = false;
			ctx.imageSmoothingEnabled = false;

			img.src = '/images/animals/' + this.animal.species + '/' + this.animal.imageNumber + '.jpg';

			img.onload = () => {
					var size = 0.017,
					w = canvas.width * size;
					h = canvas.height * size;

				ctx.drawImage(img, 0, 0, w, h);
				ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
			}
		},
		unPixelateImage() {
			var ctx = canvas.getContext('2d'),
			img = new Image();

			ctx.mozImageSmoothingEnabled = true;
			ctx.webkitImageSmoothingEnabled = true;
			ctx.imageSmoothingEnabled = true;

			img.src = '/images/animals/' + this.animal.species + '/' + this.animal.imageNumber + '.jpg';

			img.onload = () => {
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			}
		}
	}
});

Vue.component('controls', {
	template: '#controls-template',
	data: function() {
		return {
			state: 'guessing',
			score: 0,
			strikes: 0
		}
	},
	methods: {
		petOrKill(action) {
			let animal = vm.$refs.animal.$data.animal;

			this.state = 'showing';

			if(animal.isPet && action == 'pet') {
				Materialize.toast('Hey there little fella! You\'re such a cute ' + animal.species + '!', 3000);
				$('#stamp').text('CORRECT').removeClass('hide correct incorrect').addClass('correct');
				this.score++;
			} else if(animal.isPet && action == 'kill') {
				Materialize.toast('You monster! How could you possibly kill a ' + animal.species + '?!', 3000);
				$('#stamp').text('INCORRECT').removeClass('hide correct incorrect').addClass('incorrect');
				this.strikes++;
			} else if(!animal.isPet && action == 'pet') {
				Materialize.toast('Come on, just kill the ' + animal.species + ' already. What are you, some kind of vegan?', 3000);
				$('#stamp').text('INCORRECT').removeClass('hide correct incorrect').addClass('incorrect');
				this.strikes++; 
			} else if(!animal.isPet && action == 'kill') {
				Materialize.toast('Looking forward to dinner, I\'m so glad we have ' + animal.species + 's so we don\'t have to eat something weird like plants!', 3000);
				$('#stamp').text('CORRECT').removeClass('hide correct incorrect').addClass('correct');
				this.score++;
			}

			if(this.strikes >= 3) {
				this.state = 'gameover';
			}

			vm.$refs.animal.unPixelateImage();
		},
		newGameScreen() {
			$('#stamp').addClass('hide');
			this.state = 'guessing';
			vm.$refs.animal.fetchAnimal();
		},
		restartGame() {
			this.score = 0;
			this.strikes = 0;
			this.newGameScreen();
		}
	}
});

var vm = new Vue({
	el: '#game-screen'
});