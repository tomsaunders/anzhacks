var awm = {
	appKey: 'ww1hack2015',
	url: 'http://www.awm.gov.au/direct/data.php',

	search: function(q, start, count, type) {

		var param = $.param({key: "ww1hack2015", start: start || 1, count: count || 1000, q: q||"*", labels:true, format:"json"});
		if (type) {
			param.type = type;
		}

		// console.log(param);

		var fullRequest = awm.url + "?" + param;
		console.log("GET: " + fullRequest);

		return fetch (fullRequest)
		  .then(
			function(response) {
				if (response.status !== 200) {
					throw new Exception('Looks like there was a problem. Status Code: ' + response.status)
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

	oldTimey: function(name){
		switch (name){
			case 'Tom': name = 'Thomas'; break;
			case "Nick": name = "Nicholas"; break;
			case "Chris"; name = "Christopher"; break;
		}
		return name;
	},

	getWarPeeps: function(lastName, firstName){
		firstName = this.oldTimey(firstName);
		return awm.searchPeople(firstName).then(function(result) {
			return {
				peeps: result.results,
				totalCount : result.results.length,
				name : firstName,
			}
		});
	},


}
