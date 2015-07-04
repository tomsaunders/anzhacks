var formRenderer = {

	exampleData: {
		no: "002749",
		surname: "Smith",
		christianName: "Nicholas",
		unit: "XYZ123",
		joinedOn: "Oct 1915",


		ans1Name: "Nicholas Smith",

		ans2Parish : "PTown",
		ans2Town : "TTown",
		ans2County : "CTown",

		ans3BritishSubject : "yes or no",

		ans4Age : "30",

		ans5Trade : "Engineer",

		ans6Apprentice : "yes or no, where, to whome what period",

		ans7Marriage : "yes or no",

		ans8NextKin1 : "Jennifer Smith",
		ans8NextKin2 : "0400 123 456",
		ans8NextKin3 : "Jones St",

		ans9addr1 : "1 Jones St",
		ans9addr2 : "Canberra",
		ans9addr3 : "ACT, 2600",

		ans10PreviousOwner : "yes, or no and what",

		ans11PreviousService : "deets",

		ans12Unfit: "yes or not and deets",

		ans13SepAllowance: "yes, no",

		ans13Innoc: "yes, no",

		dateSigned : "1 / 1/ 1900",

		signature : "XXX",
	},

	loadFont: function (familes) {
		return new Promise(function (resolve, reject) {
			WebFont.load({
				google: { families: familes },
				fontactive: function(familyName, fvd) { resolve(familyName); },
				fontinactive: function(familyName, fvd) { reject(familyName); },
			});
		});
	},

	loadImg: function (url) {
		return new Promise(function (resolve, reject) {
			img = new Image();
			img.onload = function() { resolve(img); };
			img.onerror = function() { reject("error loading: " + url); }
			img.src = url;
		});
	},

	puts: function (context, value, x, y) {
		context.font = "14pt 'Homemade Apple'";
		context.fillText(""+value, x, y);
	},

	renderForm: function(formData) {
		var imageLoaded = formRenderer.loadImg("img/form-bg.png");
		var fontLoaded = formRenderer.loadFont(["Homemade Apple"])

		return Promise.all([imageLoaded, fontLoaded])
		.then(function(values) {
			var formBgImage = values[0];

			var canvas = document.getElementById('render-output');
			var context = canvas.getContext('2d');

			context.drawImage(formBgImage, 0, 0);

			formRenderer.puts(context, formData.no, 92, 299);
			formRenderer.puts(context, formData.surname, 430, 292);
			formRenderer.puts(context, formData.christianName, 497, 333.5);
			formRenderer.puts(context, formData.unit, 319, 375);
			formRenderer.puts(context, formData.joinedOn, 391.5, 417.5);

			formRenderer.puts(context, formData.ans1Name, 559.5,501.5);
			formRenderer.puts(context, formData.ans2Parish, 676.5,538.5);
			formRenderer.puts(context, formData.ans2Town, 702.5,574.5);
			formRenderer.puts(context, formData.ans2County, 703.5,608.5);
			formRenderer.puts(context, formData.ans3BritishSubject, 554.5,659.5);
			formRenderer.puts(context, formData.ans4Age, 551.5,708.5);
			formRenderer.puts(context, formData.ans5Trade, 553.5,745.5);
			formRenderer.puts(context, formData.ans6Apprentice, 547.5,781.5);
			formRenderer.puts(context, formData.ans7Marriage, 548.5,817.5);
			formRenderer.puts(context, formData.ans8NextKin1, 552.5,857.5);
			formRenderer.puts(context, formData.ans8NextKin2, 550.5,886.5);
			formRenderer.puts(context, formData.ans8NextKin3, 550.5,915.5);

			formRenderer.puts(context, formData.ans9addr1, 551.5,968.5);
			formRenderer.puts(context, formData.ans9addr2, 554.5,999.5);
			formRenderer.puts(context, formData.ans9addr3, 554.5,1035.5);
			formRenderer.puts(context, formData.ans10PreviousOwner, 555.5,1096.5);
			formRenderer.puts(context, formData.ans11PreviousService, 550.5,1155.5);
			formRenderer.puts(context, formData.ans12Unfit, 551.5,1191.5);
			formRenderer.puts(context, formData.ans13SepAllowance, 555.5,1248.5);
			formRenderer.puts(context, formData.ans13Innoc, 556.5,1310.5);

			formRenderer.puts(context, formData.ans1Name,124.5,1374.5);

			formRenderer.puts(context, formData.dateSigned, 148.5,1507.5);
			formRenderer.puts(context, formData.signature, 615.5,1501.5);

			return values;
		});
	},

	example: function() {
		//  do something sweet.
		formRenderer.renderForm(formRenderer.exampleData).then(function(values) {
			var formBgImage = values[0];

			var canvas = document.getElementById('render-output');
			var context = canvas.getContext('2d');

			//  For debugging, print text and position.
			$('#render-output').click(function (e) { //Offset mouse Position
				var posX = $(this).offset().left,
					posY = $(this).offset().top;

				var relPosX = e.pageX - posX;
				var relPosY = e.pageY - posY;
				// alert((e.pageX - posX) + ' , ' + (e.pageY - posY));

				//  clear
				context.drawImage(formBgImage, 0, 0);

				context.font = "10pt 'Helvetica'";
				context.fillText('pos:'+relPosX+","+relPosY, 10, 30);
				$("#pos").text(relPosX+","+relPosY);

				formRenderer.puts (context, "The quick brown fox jumped over the lazy dogs.", relPosX, relPosY);
			});
		});


	},

};
