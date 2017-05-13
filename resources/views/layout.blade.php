<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<title>Pet or Kill?</title>

	<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
	<link rel="stylesheet" href="/css/app.css">
</head>
<body>
	<header class="center cyan lighten-4">
		<h1 class="header center thin">Pet or Kill</h1>
	  <h5 class="header col s12 light">A game about animals.</h5>
  </header>
	<main class="section no-pad">
		<div class="container" id="content">
			@yield('content')
		</div>
	</main>
	<footer class="page-footer cyan lighten-4">
		<div class="container">
			<div class="row valign-wrapper">
				<div class="col s4">
					<!-- Sharingbutton Facebook -->
					<a class="resp-sharing-button__link" href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fpetorkill.dev" target="_blank" aria-label="Share on Facebook">
					  <div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
					    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
					    </div>Share on Facebook</div>
					</a>

					<!-- Sharingbutton Twitter -->
					<a class="resp-sharing-button__link" href="https://twitter.com/intent/tweet/?text=Pet%20or%20Kill%3F&amp;url=http%3A%2F%2Fpetorkill.dev" target="_blank" aria-label="Share on Twitter">
					  <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
					    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/></svg>
					    </div>Share on Twitter</div>
					</a>

				</div>
				<div class="col s8">
      		This page was created by <a href="https://davidhallberg.se">David Hallberg Jönsson</a> with help from the awesome folks at <a href="http://materializecss.com">Materialize</a>. All images were provided by <a href="https://pixabay.com">Pixabay</a>.
      	</div>
      </div>
    </div>
  </footer>
	<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.3/vue.js"></script>
	<script src="/js/app.js"></script>
</body>
</html>