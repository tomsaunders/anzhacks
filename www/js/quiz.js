var quiz = {
	currentQuestion: 0, //not 0 indexed. no question 0 or answer 0
	answers: ['dummy'],

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
			console.log('checkbox click');
			var newval = [];
			$('.checkbox input').each(function(i,e){
				console.log(i,e);
				e = $(e);
				if (e.prop('checked')){
					console.log('checked!', e.val());
					newval.push(e.val())
				}
			})
			$input10.val(newval.join(', '));
		})
	},
	start: function(user){
		if (user){
			$('#ans1Name').val(user.name).attr('disabled', true);
			$('#ans2').val(user.hometown.name);
			var bits = user.hometown.name.split(', ');
			var town = bits[0];
			var country = bits[1]; //TODO check whether 'Sydney, Australia' is a typical format

			if (country == 'Australia'){ //TODO check all countries in commonwealth
				$('#ans3Radio1').prop('checked', true);
			} else {
				$('#ans3Radio2').prop('checked', true);
			}

			var birthdates = user.birthday.split('/');
			//TODO calculate birthday properly
			var now = new Date();
			var age = now.getFullYear() - parseInt(birthdates[2], 10);
			$('#ans4age').val(age);

			$('#ans7Marriage').val(user.significant_other ? 'Yes' : 'No');

			var nok = '';
			if (user.significant_other) nok = user.significant_other.name;
			$('#ans8NextKin1').val(nok);

			$('#ans9addr1').val(user.location.name);

			$('.fb-prefill').show();
		} else {
			$('.fb-prefill').hide();
		}
		this.update(1);
		$("#quiz").show();
	},
	update: function(direction){
		var next = this.currentQuestion + direction;
		console.log('up', '#question-' + this.currentQuestion, 'down', '#question-' + next);
		$('#question-' + this.currentQuestion).slideUp(1000, 'swing', function(){
			$('#question-' + next).slideDown(1000);
		});
		this.currentQuestion = next;

		this.$pagination.find('li').removeClass('active');
		this.$pagination.find('li:nth-child(' + this.currentQuestion + 	')').addClass('active');

		if (this.currentQuestion == 1){
			this.$prev.hide();
		} else {
			this.$prev.show();
		}
	},
	save: function(){
		var answer = {};
		$('.question input').each(function(i, e){
			e = $(e);
			var field = e.attr('name');
			answer[field] = e.val();
		})
		quiz.answers[quiz.currentQuestion] = answer;
	}
}