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

			FB.getLoginStatus($.proxy(fbController.gotLogin, fbController));
		});
	},

	loginBtnClick: function(){
		FB.login($.proxy(fbController.gotLogin, fbController), {scope: fbController.requiredScope, return_scopes: true});
	},

	gotLogin: function(response){
		console.log ("FB Login:", response);
		if (response.status === 'connected') {
			fbController.saveAuth(response.authResponse);
			app.loggedIn();
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
			app.gotUser(me);
		});
	},

	getProfilePic: function() {
		FB.api('/me/picture?width=200&height=200', function(me) {
			console.log('/me/picture response', me.data.url);
			app.gotProfilePic(me.data.url);
        });
	},

	getFriends: function(url){
		url = url || '/' + this.userID + '/taggable_friends';

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
		app.gotFriends(this.friends);
	}
}
