//https://developers.facebook.com/docs/facebook-login/login-flow-for-web/v2.3
//https://developers.facebook.com/docs/javascript/quickstart/v2.3
//https://developers.facebook.com/docs/facebook-login/permissions/v2.3#reference-extended-profile

var fbController = {

	requiredScope: 'public_profile, user_friends, user_birthday, user_hometown, user_location, user_relationships, read_custom_friendlists',
	friends: [],

	init: function(){
		console.log('fb controller init');
		$.ajaxSetup({ cache: true });
		$.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
			FB.init({
				appId: '1601909030080264',
				version: 'v2.3'
			});


//			FB.login($.proxy(fbController.gotLogin, fbController), {scope: fbController.requiredScope, return_scopes: true});
			FB.getLoginStatus($.proxy(fbController.gotLogin, fbController));
		});
	},

	loginBtnClick: function(){
		FB.login($.proxy(fbController.gotLogin, fbController), {scope: fbController.requiredScope, return_scopes: true});
	},

	gotLogin: function(response){
		console.log ("Response: " + response.status);
		if (response.status === 'connected') {
			console.log('Logged in.', response);
			$('.jumbotron').append('<div class="alert alert-success" role="alert">You have logged in with Facebook</div>');
			fbController.saveAuth(response.authResponse);
			fbController.getUser();
		} else {
			var $loginBtn = $('#fbLogin');
			$loginBtn.show().unbind(fbController.loginBtnClick).click(fbController.loginBtnClick);
		}
	},

	//maybe unnecessary. the FB library handles all this
	saveAuth: function(authResponse){
		this.accessToken = authResponse.accessToken;
		this.userID = authResponse.userID;
	},

	getUser: function(){
		FB.api('/me', function(me){
			console.log('/me response', me);
			$('.jumbotron').append('<div class="alert alert-success" role="alert">Hello, ' + me.name + '</div>');
			$('.jumbotron').append('<div id="friends" class="alert alert-info" role="alert">Loading friends...</div>');
			fbController.getFriends();
		});
	},

	getFriends: function(url){
		url = url || '/' + this.userID + '/taggable_friends';

		console.log('get friends', url);
		FB.api(url, $.proxy(this.gotFriends, this));
	},

	gotFriends: function(friends){
		if (friends.data.length){
			this.addFriends(friends.data);
		}
		if (friends.paging && friends.paging.next){
			this.getFriends(friends.paging.next);
		}
	},

	addFriends: function(friends){
		for (var f = 0; f < friends.length; f++){
			this.friends.push(friends[f].name);
		}
		$('#friends').text(this.friends.join(', '));
	},



	// This is called with the results from from FB.getLoginStatus().
	statusChangeCallback: function(response) {
		console.log('statusChangeCallback');
		console.log(response);
		// The response object is returned with a status field that lets the
		// app know the current login status of the person.
		// Full docs on the response object can be found in the documentation
		// for FB.getLoginStatus().
		if (response.status === 'connected') {
			// Logged into your app and Facebook.
			fbController.testAPI();
		} else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
			$('#status').text('Please log into this app.');
		} else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
			$('#status').text('Please log into Facebook');
		}
	},

	// This function is called when someone finishes with the Login
	// Button.  See the onlogin handler attached to it in the sample
	// code below.
	checkLoginState: function() {
		FB.getLoginStatus(function(response) {
			fbController.statusChangeCallback(response);
		});
	},

	// Here we run a very simple test of the Graph API after login is
	// successful.  See statusChangeCallback() for when this call is made.
	testAPI: function() {
		console.log('Welcome!  Fetching your information.... ');
		FB.api('/me', function(response) {
			console.log('Successful login for: ' + response.name);
			document.getElementById('status').innerHTML =
				'Thanks for logging in, ' + response.name + '!';
		});
	}
}
