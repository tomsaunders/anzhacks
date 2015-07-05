$(document).ready(function() {
	console.log('document ready');
	app.init();
	quiz.init();
	fbController.init();
});

//basically where the main controller of the app will respond to events.
//each data source should only talk to this controller
var app = {
	init: function(){
		$('#enlist').click(function(){
			app.startEnlistment();
		});

		$('#dontenlist').click(function(){
			app.dontEnlist();
		});

		$('#search').click(function(){
			app.searchPeeps();
		});
	},
	startEnlistment: function() {
		console.log('Starting Enlistment...');
		$("#choice").hide();
		quiz.start(this.user);
	},
	dontEnlist: function() {
		console.log('Don\'t Enlist...');
		$("#choice").hide();
		// fbController.getFriends();
		$("#facebook-friends").show();
		friendStats.main();
	},
	searchPeeps: function() {
		console.log('Searching Peeps...');
		$("#choice").hide();

		warPeepAggregator.main(this.user);
	},
	loggedIn: function(){
//		$('.jumbotron').append('<div class="alert alert-success" role="alert">You have logged in with Facebook</div>');
		fbController.getUser();
		//fbController.getProfilePic();
	},
	gotUser: function(user){
		this.user = user;
		$('#choice img').slideDown(1000);
		$('.jumbotron').append('<div class="alert alert-success" role="alert">Hello, ' + user.name + '</div>');

		//to skip straight to the attestment form, uncomment these lines and comment out the #choice animation
//		quiz.start(this.user);
//		quiz.save();
//		app.gotQuiz(quiz.answers);
	},
	gotProfilePic: function(url) {
		//$('.jumbotron').append('<div id="profile"><img class="sepia" src="' + url + '""></div>');
	},
	gotFriends: function(friends){
		$('#friends').show()
		$('#friends').text(friends.length + ' friends loaded');
	},
	gotAnzacs: function(anzacs, totalCount, name){
		$('.jumbotron').append('<div id="anzacs" class="alert alert-warning" role="alert">Loading friends...</div>');
		$('#anzacs').text(anzacs.length + ' ANZACs found matching ' + name);
	},
	gotWarPeeps: function(result) {
		$('.jumbotron').append('<div id="warpeeps" class="alert alert-warning" role="alert">Loading friends...</div>');
		$('#warpeeps').text(result.peeps.length + ' war peeps found matching ' + result.name);
	},
	gotQuiz: function(formData){
		this.formData = formData;
		unit.pickUnit();
	},
	gotUnit: function(unitName){
		this.formData.unit = unitName;
		$('#unitInfoMsg').append('<div class="alert alert-success" role="alert">You have been assigned to ' + unitName + '</div>');

		$('#quiz').slideUp(500);
		$("#render-output").slideDown(2000);
		formRenderer.renderForm(this.formData);

		unit.getInfo($('#unitInfo'));
	}

}
