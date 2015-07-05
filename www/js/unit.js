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

		var index = _.random(keys.length);
		var key = keys[index];

		var selectedUnit = this.options[key];

		app.gotUnit(selectedUnit);
	}
};