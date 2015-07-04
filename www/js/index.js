$(document).ready(function() {
	console.log('document ready');
	fbController.init();
});

//basically where the main controller of the app will respond to events.
//each data source should only talk to this controller
var app = {
	loggedIn: function(){
		fbController.getUser();
	},
	gotUser: function(user){
		fbController.getFriends();
		naa.getAnzacs(user.last_name, user.first_name);
	}
}