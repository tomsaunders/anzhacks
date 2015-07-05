var awm = {
	appKey: 'ww1hack2015',
	url: 'https://www.awm.gov.au/direct/data.php',

	// q is special search query . * for match all.
	// type filters on types of objects available.  See search* functions below for examples
	// returns a promise that you can attach a .then() to be called when complete.
	search: function(q, start, count, type) {

		var rawp = {key: "ww1hack2015", start: start || 1, count: count || 1000, labels:true, format:"json", q:q}
		if (type) {
			rawp.type = type;
		}

		param_str = _.chain(rawp).map(function(value, key) {
			return key+"="+value;
		}).join("&");

		var fullRequest = awm.url + "?" + param_str;
		// console.log("GET: " + fullRequest);

		return fetch (fullRequest)
		  .then(
			function(response) {
				if (response.status !== 200) {
					return Promise.reject ('Looks like there was a problem. Status Code: ' + response.status);
				}
				return response.json();
			}
		)
	},


	searchPeople: function(q, start, count) {
		return awm.search(q, start, count, "people");
	},

	searchUnits: function(q, start, count) {
		return awm.search(q, start, count, "unit");
	},

	searchPlaces: function(q, start, count) {
		return awm.search(q, start, count, "place");
	},

	searchCatalogs: function(q, start, count) {
		return awm.search(q, start, count, "catalog");
	},

	searchRollOfHonor: function(q, start, count) {
		return awm.search(q, start, count, "roll_of_honor");
	},

	dump: function(promprom) {
		promprom.then(function(json) {
			console.log(json);
		})
		.catch(function(err) {
			console.log('Fetch Error bro: ', err);
		});
	},

	//  map name to more common name
	oldTimey: function(name){
		switch (name){
			case 'Tom': name = 'Thomas'; break;
			case "Nick": name = "Nicholas"; break;
			case "Chris": name = "Christopher"; break;
		}
		return name;
	},


	//  used by index.js for example
	getWarPeeps: function(lastName, firstName){
		firstName = this.oldTimey(firstName);
		return awm.searchPeople(firstName).then(function(result) {
			return {
				peeps: result.results,
				totalCount : result.results.length,
				name : firstName
			}
		});
	}


}
