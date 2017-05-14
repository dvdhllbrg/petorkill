@extends('layout')

@section('content')
  <div class="row" id="start-screen">
    <p class="flow-text">Your task is simple. Before your eyes will be revealed information about an animal. You are to choose whether that animal should be petted or killed. If you choose the correct action, you will receive a point. If you choose the wrong action, i.e. choose to pet an animal that should be killed or vice versa, you will get a strike. You get three strikes, and the game is over.</p>
    <p class="flow-text">Are you ready?</p>
    <div class="center">
    	<a href="#" id="start-game-button" class="btn-large waves-effect waves-light cyan">Start the game</a>
    </div>
  </div>
  <div class="row hide" id="game-screen">
  	<div class="row">
	  	<animal ref="animal"></animal>
		</div>
		<div class="row">
			<controls ref="controls"></controls>
		</div>
  </div>

  <template id="controls-template">
  	<div class="controls">
  		<div class="col s12 m10 center-align">
				<h5 v-if="state == 'guessing'">What do you do?</h5>
				<div v-if="state == 'guessing'">
					<a href="#" id="pet-button" class="btn-large waves-effect waves-light cyan lighten-2" @click.prevent="petOrKill('pet')"><i class="material-icons left">pan_tool</i>Pet</a>
					<a href="#" id="kill-button" class="btn-large waves-effect waves-light cyan darken-3" @click.prevent="petOrKill('kill')"><i class="material-icons left">content_cut</i>Kill</a>
				</div>
				<div v-else-if="state == 'gameover'" class="left-align">
					<h5>That's it, folks.</h5>
					<p>Did this feel a little weird? Unfair? Did the division between which animals to pet and whch to kill seem arbitrary? Yet, this division is done daily by billions of people, with a far more deadly outcome than in this game.</p>
					<p>We pet cats and play with dogs, yet kill and eat pigs, make clothes from cows, and keep chickens in captivity to steal their eggs. Why is it that we create such a sharp demarcation in our minds, despite the fact that pigs are just as intelligent as dogs, or that cows form emotional bonds every bit as strong as that between a human and a cat? The answer is a phenomenon called "carnism", and <a href="https://youtu.be/ao2GL3NAWQU">here you can watch Dr. Melanie Joy explain it</a>.</p>
					<p>The bad news is that carnism causes suffering for billions of individuals each and every day. The good news is that it can be abolished, and the very first step in helping to abolish it is to become aware of it. Now that you are, you can help by <a href="https://www.vegansociety.com/go-vegan/how-go-vegan">going vegan</a> and, of course, by telling other about carnism and its effects. One way, if you feel like it, is by sharing this very page!</p>

					<a href="#" id="next-button" class="btn waves-effect waves-light cyan" @click.prevent="restartGame">Restart the game</a>
				</div>
				<div v-else>
					<a href="#" id="next-button" class="btn-large waves-effect waves-light cyan" @click.prevent="newGameScreen">Next</a>
				</div>
			</div>
			<div class="col s12 m2 center-align">
				<div class="row">
					<div class="col s6">
						<b>Score</b>
						<h2>@{{ score }}</h2>
					</div>
						<div class="col s6">
							<b>Status</b>
							<h2 v-if="strikes == '0'">😃</h2>
							<h2 v-else-if="strikes == '1'">😐</h2>
							<h2 v-else-if="strikes == '2'">😓</h2>
							<h2 v-else>😭</h2>
						</div>
				</div>
			</div>
		</div>
  </template>

  <template id="animal-template">
    <div class="card horizontal">
    	<div class="card-image">
    		<canvas id="canvas"></canvas>
  		</div>
  		<div class="card-stacked">
  			<div class="card-content">
					<h2 class="light">@{{ animal.name }}</h2>
					<b>Age:</b> @{{ animal.age }} years <br>
					<b>Weight:</b> @{{ animal.weight }} kg <br>
					<b>Best friend:</b> @{{ animal.friend }}<br>
					<b>About @{{ animal.name }}:</b> @{{ animal.description }}
				</div>
			</div>
			<span id="stamp" class="hide"></span>
		</div>
	</template>
@endsection