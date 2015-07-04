$(document).ready(function() {
	console.log('document ready');
	fbController.init();
});

//basically where the main controller of the app will respond to events.
//each data source should only talk to this controller
var app = {
	loggedIn: function(){
		$('.jumbotron').append('<div class="alert alert-success" role="alert">You have logged in with Facebook</div>');
		fbController.getUser();
	},
	gotUser: function(user){
		this.user = user;
		$('.jumbotron').append('<div class="alert alert-success" role="alert">Hello, ' + user.name + '</div>');
		$('.jumbotron').append('<div id="friends" class="alert alert-info" role="alert">Loading friends...</div>');
		fbController.getFriends();
		naa.getAnzacs(this.user.last_name, this.user.first_name);
	},
	gotFriends: function(friends){
		$('#friends').text(friends.length + ' friends loaded');
	},
	gotAnzacs: function(anzacs, totalCount, name){
		$('.jumbotron').append('<div id="anzacs" class="alert alert-warning" role="alert">Loading friends...</div>');
		$('#anzacs').text(anzacs.length + ' ANZACs found matching ' + name);
	}
}