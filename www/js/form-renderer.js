"use strict";

var formRenderer = {

	exampleData: {
		no: "002749",
		surname: "Smith",
		christianName: "Nicholas",
		unit: "XYZ123",
		joinedOn: "Oct 1915",

		ans1Name: "Nicholas Smith",

		//  only one of these need be set.
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

		ans14Innoc: "yes, no",

		//  if both are undefined/null, then draw big fat line through it all.
		allot: "three-fifths", //  or two-fifths
		support: "wife-children", //  or wife

		dateSigned : "1 / 1/ 1900",
		signature : "XXX"  // not used
	},

	hashCode: function(s) {
		return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
	},

	FONT_FAMILY_NAMES: [
		"Crafty Girls",
		"Just Another Hand",
		"Bad Script",
		"Marck Script",
		"Waiting for the Sunrise",
		"Gochi Hand",
		"Reenie Beanie",
		"Shadows Into Light",
		"Gloria Hallelujah",
		"Indie Flower",
		"Pacifico",
		"Dancing Script",
		"Rock Salt",
		"Homemade Apple",
		"Nothing You Could Do",
		"Sacramento",
		"Rochester",
		"Handlee",
		"Cedarville Cursive",
	],

	uniqueFontFamilyName: function (peepName) {
		var index = Math.abs(formRenderer.hashCode(peepName) % formRenderer.FONT_FAMILY_NAMES.length);
		return formRenderer.FONT_FAMILY_NAMES[index];
	},

	// return a promise that is resolved when font is loaded.
	loadFont: function (familes) {
		return new Promise(function (resolve, reject) {
			WebFont.load({
				google: { families: familes },
				fontactive: function(familyName, fvd) { resolve(familyName); },
				fontinactive: function(familyName, fvd) { reject("error loading font: " + familyName); },
			});
		});
	},

	// return a promise that is resolved when img is loaded.
	loadImg: function (url) {
		return new Promise(function (resolve, reject) {
			var img = new Image();
			img.onload = function() { resolve(img); };
			img.onerror = function() { reject("error loading img: " + url); }
			img.src = url;
		});
	},

	renderForm: function(formData) {
		$("#render-output").show();

		var familyName = formRenderer.uniqueFontFamilyName(formData.surname+formData.christianName);
		var fontLoaded = formRenderer.loadFont([familyName]);

		var imgsNeeded = [
			"form-bg.png",
			"form-line-bottom-para.png",
			"form-line-two-fifths.png",
			"form-line-three-fifths.png",
			"form-line-wife.png",
			"form-line-wife-and-children.png",
			"form-signature.png",
		];
		var imgPromises = _.map(imgsNeeded, function(imgFilename) {
			return formRenderer.loadImg("img/"+imgFilename);
		});

		var allPromises = [fontLoaded].concat(imgPromises);
		return Promise.all(allPromises)
		.then(function(values) {
			var familyName = values[0];
			var formBgImg = values[1];
			var lineBottomParaImg = values[2];
			var lineTwoFifthsImg = values[3];
			var lineThreeFifthsImg = values[4];
			var lineWifeImg = values[5];
			var lineWifeAndChildrenImg = values[6];
			var signatureImg = values[7];

			var canvas = document.getElementById('render-output');
			var context = canvas.getContext('2d');

			context.drawImage(formBgImg, 0, 0);

			context.font = "14pt '" + familyName + "'";

			context.fillText(formData.no, 92, 299);
			context.fillText(formData.surname, 430, 292);
			context.fillText(formData.christianName, 497, 333.5);
			context.fillText(formData.unit, 319, 375);
			context.fillText(formData.joinedOn, 391.5, 417.5);

			context.fillText(formData.ans1Name, 559.5,501.5);
			context.fillText(formData.ans2Parish || '', 676.5,538.5);
			context.fillText(formData.ans2Town || '', 702.5,574.5);
			context.fillText(formData.ans2County || '', 703.5,608.5);
			context.fillText(formData.ans3BritishSubject, 554.5,659.5);
			context.fillText(formData.ans4Age, 551.5,708.5);
			context.fillText(formData.ans5Trade, 553.5,745.5);
			context.fillText(formData.ans6Apprentice, 547.5,781.5);
			context.fillText(formData.ans7Marriage, 548.5,817.5);
			context.fillText(formData.ans8NextKin1, 552.5,857.5);
			context.fillText(formData.ans8NextKin2 || '', 550.5,886.5);
			context.fillText(formData.ans8NextKin3 || '', 550.5,915.5);

			context.fillText(formData.ans9addr1, 551.5,968.5);
			context.fillText(formData.ans9addr2 || '', 554.5,999.5);
			context.fillText(formData.ans9addr3 || '', 554.5,1035.5);
			context.fillText(formData.ans10PreviousOwner, 555.5,1096.5);
			context.fillText(formData.ans11PreviousService, 550.5,1155.5);
			context.fillText(formData.ans12Unfit, 551.5,1191.5);
			context.fillText(formData.ans13SepAllowance, 555.5,1248.5);
			context.fillText(formData.ans14Innoc, 556.5,1310.5);

			context.fillText(formData.ans1Name,124.5,1374.5);

			if (formData.allot === "two-fifths") {
				context.drawImage(lineTwoFifthsImg, 421.5,1428.5);
			} else if (formData.allot === "three-fifths") {
				context.drawImage(lineThreeFifthsImg, 422.5,1444.5);
			}
			if (formData.support === "wife") {
				context.drawImage(lineWifeImg, 216.5,1459.5);
			} else if (formData.support === "wife-children") {
				context.drawImage(lineWifeAndChildrenImg, 217.5,1477.5);
			}

			//  if not data supplied, cross out.
			if (!formData.allot && !formData.support) {
				context.drawImage(lineBottomParaImg, 68.5,1423.5);
			}

			context.fillText(formData.dateSigned, 148.5,1507.5);
			// context.fillText(formData.signature, 615.5,1501.5);
			context.drawImage(signatureImg, 639.5,1443.5);

			return values;
		});
	},

	// render example form + include debugging clicks.
	example: function() {
		//  do something sweet.
		formRenderer.renderForm(formRenderer.exampleData).then(function(values) {
			var formBgImg = values[1];

			var canvas = document.getElementById('render-output');
			var context = canvas.getContext('2d');

			//  For debugging, print text and position.
			$('#render-output').click(function (e) { //Offset mouse Position
				var formBgImg = values[1];
				var lineBottomParaImg = values[2];
				var lineTwoFifthsImg = values[3];
				var lineThreeFifthsImg = values[4];
				var lineWifeImg = values[5];
				var lineWifeAndChildrenImg = values[6];
				var signatureImg = values[7];

				var posX = $(this).offset().left,
					posY = $(this).offset().top;

				var relPosX = e.pageX - posX;
				var relPosY = e.pageY - posY;
				// alert((e.pageX - posX) + ' , ' + (e.pageY - posY));

				//  clear
				context.drawImage(formBgImg, 0, 0);

				context.font = "10pt 'Helvetica'";
				context.fillText('pos:'+relPosX+","+relPosY, 10, 30);
				$("#pos").text(relPosX+","+relPosY);

				context.font = "14pt '" + familyName + "'";
				formRenderer.puts (context, "The quick brown fox jumped over the lazy dogs.", relPosX, relPosY);
				// context.drawImage(signatureImg, relPosX, relPosY);
			});
		});

	},
};
