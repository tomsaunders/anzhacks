var naa = {
	appID: '598e8f24',
	appKey: 'bf81bc01f4f7c9b74e20be0ce7527395',
	url: 'https://api.naa.gov.au/naa/api/v1/person/search-series-b2455?',

	getURL: function(){
		return this.url + 'app_id=' + this.appID + '&app_key=' + this.appKey;
	},
	getAnzacs: function(lastName, firstName){
		firstName = this.oldTimey(firstName);
		this.getRequest(lastName, function(){
			console.log('got getrequest', arguments);
		})

		this.postRequest({first_name: firstName, last_name: lastName}, function(){
			console.log('NAA post request result', arguments);
		});
	},
	oldTimey: function(name){
		switch (name){
			case 'Tom': name = 'Thomas'; break;
		}
		return name;
	},
	postRequest: function(queryFields, callback, page, rows){
		page = page || '1';
		rows = rows || '100';

		$.ajax(this.getURL(), {
			contentType: 'application/json',
			method: 'POST',
			data: JSON.stringify({
				page: page,
				rows: rows,
				query_fields: queryFields
			}),
			processData: false,
			success: callback
		})
	},
	getRequest: function(keyword, callback, page, rows){
		page = page || 1;
		rows = rows || 100;
		var url = this.getURL() + '&rows=' + rows + '&page=' + page + '&keyword=' + keyword;

		$.ajax(url, {
			method: 'GET',
			success: callback
		});
	}
}