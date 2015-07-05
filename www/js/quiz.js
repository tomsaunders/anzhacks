var quiz = {
	commonwealthMatches: ['Australian Capital Territory', 'Tasmania', 'New South Wales', 'Australia'],
	currentQuestion: 0, //not 0 indexed. no question 0 or answer 0
	answers: {},

	init: function(){
		this.$pagination = $('#quiz .pagination');
		this.$prev = $('#quiz .pager .prev');
		this.$next = $('#quiz .pager .next');

		this.$prev.click(function(){
			quiz.save();
			quiz.update(-1);
		});

		this.$next.click(function(){
			quiz.save();
			quiz.update(1);
		});

		$('.question').hide();

		$('div.question').on('click', 'button', function(e){
			var $btn = $(e.target);
			var input = $btn.data('input');
			if (input){
				var $input = $('#' + input);
				$input.val($btn.text());
			}
			quiz.$next.click();
		});

		var $input10 = $('#ans10PreviousOwner');
		$('div#question-10').on('click', '.checkbox', function(){
			var newval = [];
			$('.checkbox input').each(function(i,e){
				e = $(e);
				if (e.prop('checked')){
					newval.push(e.val())
				}
			})
			$input10.val(newval.join(', '));
		})
	},
	start: function(user){
		if (user){
			$('#ans1Name').val(user.name).attr('disabled', true);
			this.answers.no = _.random(1000, 500000);
			this.answers.unit = 'Rando Team';
			this.answers.joinedOn = "Jul 1915";
			this.answers.surname = user.last_name;
			this.answers.christianName = user.first_name;

			$('#ans2').val(user.hometown.name);
			var bits = user.hometown.name.split(', ');
			var town = bits[0];
			var country = bits[1];
			this.answers.ans2Town = town;
			this.answers.ans2County = country;

			if (this.commonwealthMatches.indexOf(country) !== -1){
				$('#ans3Radio1').prop('checked', true);
				this.answers.ans3BritishSubject = 'Natural Born';
			} else {
				$('#ans3Radio2').prop('checked', true);
				this.answers.ans3BritishSubject = 'Naturalized'
			}

			var birthdates = user.birthday.split('/'); //in US format mm/dd/yyyy
			var now = new Date();
			var birth = new Date(parseInt(birthdates[2], 10), parseInt(birthdates[0], 10), parseInt(birthdates[1], 10));
			var diff = now - birth;
			var yearInMS = 365 * 24 * 60 * 60 * 1000; //lets ignore leap stuff

			var years = Math.floor(diff / yearInMS);
			var rem = diff / yearInMS % 1;
			var mths = Math.round(rem * 12);

			var age = years + '     ' + mths + '/12';

			$('#ans4Age').val(age);

			$('#ans7Marriage').val(user.significant_other ? 'Yes' : 'No');

			var nok = '';
			if (user.significant_other) nok = user.significant_other.name;
			$('#ans8NextKin1').val(nok);

			$('#ans9addr1').val(user.location.name);

			$('.fb-prefill').show();
		} else {
			$('.fb-prefill').hide();
		}
		this.update(14);
		$("#quiz").show();
	},
	update: function(direction){
		var next = this.currentQuestion + direction;
		$('#question-' + this.currentQuestion).slideUp(500, 'swing', function(){
			$('#question-' + next).slideDown(500);
		});
		this.currentQuestion = next;

		this.$pagination.find('li').removeClass('active');
		this.$pagination.find('li:nth-child(' + this.currentQuestion + 	')').addClass('active');

		if (this.currentQuestion == 1){
			this.$prev.hide();
		} else {
			this.$prev.show();
		}

		if (this.currentQuestion == 15){
			//gone off the edge of the world
			app.gotQuiz(this.answers);
		}

	},
	save: function(){
		$('.question input').each(function(i, e){
			e = $(e);
			var field = e.attr('id');
			quiz.answers[field] = e.val();
		});

		this.answers['support'] = (this.answers['ans7Marriage'] == 'Yes')
			? 'wife'
			: false;
		this.answers['allot'] = (this.answers['ans7Marriage'] == 'Yes')
			? 'two-fifths'
			: false;

		var now = new Date();
		var d = [now.getDate(), now.getMonth() + 1, '1915'];
		this.answers['dateSigned'] = d.join(" / ");
	}
}