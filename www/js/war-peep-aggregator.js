var warPeepAggregator = {

	mapNaa: function(data) {
		return _.map(data.ResultSet, function(value) {
			return {
				name: value.family_name +"," + value.first_name,
				service_numbers : value.service_numbers,
				place_of_enlistment : value.place_of_enlistment,
				impl: value,
			}
		});
	},

	mapAwm: function(data) {
		return _.map(data.results, function(value) {
			return {
				name: value.preferred_name,
				service_numbers : value.service_number,
				impl: value,
			}
		});
	},

	bestGuessSearch: function (lastName, firstName) {
		var self = this;

		/* search with full name
		search with last name
		return results */

		var prom1 = naa.generalRequest({first_name: firstName, last_name: lastName}).then(function(data) {
			return self.mapNaa(data);
		});

		var prom2 = awm.searchPeople("preferred_name:"+lastName +"* AND preferred_name:*"+firstName+"*").then(function(data) {
			return self.mapAwm(data)
		});

		var prom3 = naa.generalRequest({last_name: lastName}).then(function(data) {
			return self.mapNaa(data);
		});

		var prom4 = awm.searchPeople("preferred_name:"+lastName +"*").then(function(data) {
			return self.mapAwm(data)
		});

		return Promise.all([prom1, prom2, prom3, prom4]).then(function(values) {
			return _.flatten(values);
		});

	}

};
