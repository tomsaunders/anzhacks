var unit = {
	options: {
		'U51441': '1st Australian Infantry Battalion',
		'U51442': '2nd Australian Infantry Battalion',
		'U51445': '5th Australian Infantry Battalion',
		'U51446': '6th Australian Infantry Battalion',
		'U51448': '8th Australian Infantry Battalion',
		'U51449': '9th Australian Infantry Battalion',
		'U51451': '11th Australian Infantry Battalion',
		'U51452': '12th Australian Infantry Battalion',
		'U51457': '17th Australian Infantry Battalion',
		'U51462': '22nd Australian Infantry Battalion',
		'U51472': '32nd Australian Infantry Battalion',
		'U51480': '40th Australian Infantry Battalion',
		'U51481': '41st Australian Infantry Battalion',
		'U51483': '43rd Australian Infantry Battalion'
	},

	pickUnit: function(){
		var keys = [];
		for (var uid in this.options) keys.push(uid);

		var key = _.sample(keys);

		this.unitID = key;
		var selectedUnit = this.options[key];

		app.gotUnit(selectedUnit);
	},
	getInfo: function($display){
//		awm.searchUnits()
		return awm.searchUnits('id:' + this.unitID).then(function(result) {
			result = result.results[0];

			console.log('search unit result', result, result.description, result.decorations[0], result.casualties[0]);
			var title = result.title;

			$display.append(
				'<div class="well">' + result.description + '</div>'
			)
			$display.append(
				'<div class="alert alert-success" role="alert">In total, the soliders of the ' + title + ' were awarded ' + result.decorations[0] + '</div>'
			);
			$display.append(
				'<div class="alert alert-warning" role="alert">Casualties:  ' + result.casualties[0] + '</div>'
			)
//			return {
//				peeps: result.results,
//				totalCount : result.results.length,
//				name : firstName
//			}
		});
	}
};
