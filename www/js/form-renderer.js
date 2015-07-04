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

	example: function() {
		//  do something sweet.

		var canvas = document.getElementById('render-output');
        var context = canvas.getContext('2d');

		function puts(value, x, y) {
        	context.font = "14pt 'Homemade Apple'";
			context.fillText(""+value, x, y);
        }

        var formBgImage = new Image();
        formBgImage.onload = function() {
          context.drawImage(this, 0, 0);


			puts(formRenderer.exampleData.no, 92, 299);
			puts(formRenderer.exampleData.surname, 430, 292);
			puts(formRenderer.exampleData.christianName, 497, 333.5);
			puts(formRenderer.exampleData.unit, 319, 375);
			puts(formRenderer.exampleData.joinedOn, 391.5, 417.5);

			puts(formRenderer.exampleData.ans1Name, 559.5,501.5);
			puts(formRenderer.exampleData.ans2Parish, 676.5,538.5);
			puts(formRenderer.exampleData.ans2Town, 702.5,574.5);
			puts(formRenderer.exampleData.ans2County, 703.5,608.5);
			puts(formRenderer.exampleData.ans3BritishSubject, 554.5,659.5);
			puts(formRenderer.exampleData.ans4Age, 551.5,708.5);
			puts(formRenderer.exampleData.ans5Trade, 553.5,745.5);
			puts(formRenderer.exampleData.ans6Apprentice, 547.5,781.5);
			puts(formRenderer.exampleData.ans7Marriage, 548.5,817.5);
			puts(formRenderer.exampleData.ans8NextKin1, 552.5,857.5);
			puts(formRenderer.exampleData.ans8NextKin2, 550.5,886.5);
			puts(formRenderer.exampleData.ans8NextKin3, 550.5,915.5);

			puts(formRenderer.exampleData.ans9addr1, 551.5,968.5);
			puts(formRenderer.exampleData.ans9addr2, 554.5,999.5);
			puts(formRenderer.exampleData.ans9addr3, 554.5,1035.5);
			puts(formRenderer.exampleData.ans10PreviousOwner, 555.5,1096.5);
			puts(formRenderer.exampleData.ans11PreviousService, 550.5,1155.5);
			puts(formRenderer.exampleData.ans12Unfit, 551.5,1191.5);
			puts(formRenderer.exampleData.ans13SepAllowance, 555.5,1248.5);
			puts(formRenderer.exampleData.ans13Innoc, 556.5,1310.5);

			puts(formRenderer.exampleData.ans1Name,124.5,1374.5);


			puts(formRenderer.exampleData.dateSigned, 148.5,1507.5);
			puts(formRenderer.exampleData.signature, 615.5,1501.5);

        };
        formBgImage.src = "img/form-bg.png";

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

			puts ("The quick brown fox jumped over the lazy dogs.", relPosX, relPosY);
	    });

	},

};
