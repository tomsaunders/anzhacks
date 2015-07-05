var fields = [
	{"type": "int4", "id": "_id"},
//	{"type": "tsvector", "id": "_full_text"},
	{"type": "text", "id": "Entity"},
	{"type": "text", "id": "Portfolio"},
	{"type": "text", "id": "Classification"},
	{"type": "text", "id": "Entity Classification"},
	{"type": "text", "id": "Display Classification"},
	{"type": "text", "id": "Sector Classification"},
	{"type": "text", "id": "Materiality"},
	{"type": "text", "id": "Established By / Under"},
	{"type": "text", "id": "Creation Date"},
	{"type": "text", "id": "Reported by Function / Sector GFS"},
	{"type": "text", "id": "PS Act Body"},
	{"type": "numeric", "id": " Average Staffing Level (ASL) "},
	{"type": "numeric", "id": " Max No. of  Board / Committee Members "},
	{"type": "text", "id": "Paid Members"},
	{"type": "text", "id": "Board / Committee Appointed By"},
	{"type": "text", "id": "Annual Report Prepared and Tabled ?"},
	{"type": "text", "id": "Auditor"},
	{"type": "text", "id": "ABN"},
	{"type": "text", "id": "Parent Entity of Secondary Body"},
	{"type": "numeric", "id": "2014-15 Budget - Total Appropriations as per BP4 ($m)"},
	{"type": "numeric", "id": "Total 2014-15 Departmental Expenses as per BP4/PBS($m)"},
	{"type": "text", "id": "Location Address (Head Office)"},
	{"type": "text", "id": "Website Address"},
	{"type": "text", "id": "Strategic Plan/Corporate Plan/Organisational Plan"},
	{"type": "text", "id": "Annual Reports"},
	{"type": "text", "id": "Budget Documentation"}
];

var agors = {
//	'854be11a-5d3a-4df7-a7d1-4ec32124f0ee': '22/05/15',
//	'55db8e2c-dff7-435b-932c-4b8e9225de81': '24/04/15', //Apr 24,
//	'55c3a891-30e0-43a6-9d80-5def4506f43d': '16/02/15', //Feb 16
//	'27124ee1-17ad-44c3-abf2-ec256aa62d76': '01/01/15',
	'854be11a-5d3a-4df7-a7d1-4ec32124f0ee': '2015-05-22',
	'55db8e2c-dff7-435b-932c-4b8e9225de81': '2015-04-24', //Apr 24,
	'55c3a891-30e0-43a6-9d80-5def4506f43d': '2015-02-16', //Feb 16
	'27124ee1-17ad-44c3-abf2-ec256aa62d76': '2015-01-01'
};


$(document).ready(function(){
//	$("#agor tbody tr").each(function(i,e){
//		if (parseInt(i,10) % 10 != 0) $(e).remove();
//	})

	$('#agor').DataTable({
		"scrollY": 400,
		"scrollX": true,
		"columnDefs": [
			{ "type": "num", "targets": 0 },
			{ "type": "num", "targets": 12 },
			{ "type": "num", "targets": 13 },
			{ "type": "num", "targets": 20 },
			{ "type": "num", "targets": 21 }
		]
	});
	$('#agor').on('click', 'td', function(e){
		var colIndex = e.target.cellIndex;
		var column = fields[colIndex];
		var $row = $(e.target.parentElement);
		var entity = $row.find('td:nth-child(2)').text();

		console.log('clicked ', column, ' for ', entity);
		igor.fetch(column, entity);
	});
});

var igor = {
	url: 'http://data.gov.au/api/action/datastore_search_sql?sql=',
//	dates: ['01/01/15', '16/02/15', '24/04/15', '22/05/15'],
	dates: ['2015-01-01', '2015-02-16', '2015-04-24', '2015-05-22'],
	current: {},
	found: 0,
	label: '',
	fetch: function(column, entity){
		this.current = {};
		this.found = 0;
		this.column = column;
		this.label = column.id + ' for ' + entity;
		$('#igor').empty();
		$('.igor-label').hide();
		$('.loading').show();
		$('#chart').hide();

		for (var agor in agors){
			var date = agors[agor];
			var SQL = this.sql(column.id, agor, entity);

			$.ajax(this.url + SQL, {success: $.proxy(this.gotRow, this, date, column.id), error: $.proxy(this.error, this)});
		}
	},
	sql: function(column, agor, entity){
		return 'SELECT "' + column + '" FROM "' + agor + '" WHERE "Entity" = \'' + entity + '\'';

	},
	render: function(){
		$('#igor').empty();
		$('.loading').hide();
		$('.igor-label').text(this.label).show();

		var data = new google.visualization.DataTable();
		data.addColumn('date', 'Date');
		data.addColumn(this.column.type == 'numeric' ? 'number' : 'string', 'Value');

		for (var i = 0; i < this.dates.length; i++){
			var date = this.dates[i];
			console.log(i, date, this.current[date]);
			var value = this.current[this.dates[i]] || '';

			$('#igor').append("<tr><td>" + this.dates[i] + "</td><td>" + value + "</td></tr>");
			var bits = this.dates[i].split('-');
			var date = new Date(bits[0], bits[1], bits[2]);
			if (this.column.type == 'numeric') value = value * 1;
			if (value) data.addRows([[date, value]]);
			console.log('rendering ', i, this.dates[i], value, this.current);
		}
		if (this.column.type == 'numeric'){
			this.drawChart(data);
		}
	},
	drawChart: function(data){
		console.log(data);

		// Set chart options
		var options = {
			'title': '',
			'width': 400,
			'height':300
		};

		// Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.LineChart(document.getElementById('chart'));
		chart.draw(data, options);
		$('#chart').show();
	},
	gotRow: function(date, key, data){
		var result = '';
		if (data.result && data.result.records && data.result.records[0]) result=data.result.records[0][key];
		this.current[date] = result;
		this.found++;

		console.log('got row', date, key, result);
		if (this.found == 4){
			this.render();
		}
	},
	error: function(){
		if (this.found != -1){
			this.found = -1;
			this.label += " - Error";
			this.render();
		}
	}
}