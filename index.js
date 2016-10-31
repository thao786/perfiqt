var quizScore = 0;

$(function(){	
	var vpw = $(window).width();
    var vph = $(window).height();

    $('.full-page').height(vph);
	
	$(window).on('resize', function(){
		var vpw = $(window).width();
		var vph = $(window).height();
		
		$('.full-page').height(vph);
	});

	
	$('.postit').click(function(){
		$('.postit').removeClass('postit-pinned');
		$(this).addClass('postit-pinned');
	});
	
	$('#see-proof-btn').click(function(){
		$('#proof-setup').hide();
		$('.proof-question-first').fadeIn(500);
	});
	
	$('.proof-choice').click(function(){
	
		if($(this).parent().hasClass('proof-choice-selected')){
			return false;
		}
	
		$(this).parent().addClass('proof-choice-selected');
		
		var index = $(".proof-question").index($(this).parent());
		
		switch(index){
			case 0:
				$('#pr1').find('.pr-answer').text($(this).text());
				break;
			case 1:
				$('#pr2').find('.pr-answer').text($(this).text());
				break;
			case 2:
				$('#pr3').find('.pr-answer').text($(this).text());
				break;
		}
		
		$(this).find('img').attr('src', 'images/blotchchk.png');
		
		setTimeout(function(){
			toNextProofQuestion();
		}, 1000);
		
	});
	
	$('.quiz-choice').click(function(){
	
		if($(this).parent().hasClass('quiz-choice-selected')){
			return false;
		}
	
		$(this).parent().addClass('quiz-choice-selected');
	
		if($(this).hasClass('quiz-choice-c')){
			$(this).find('img').attr('src', 'images/blotchchk.png');
			quizScore++;
			
			$('#quiz-score').text(quizScore);
		}
		else{
			$(this).find('img').attr('src', 'images/blotchx.png');
			$(this).parent().find('.quiz-choice-c').find('img').attr('src', 'images/blotchchk.png');
		}
		
		$(this).parent().find('.quiz-explanation').fadeIn(300);
		$(this).parent().find('.next-q-btn').fadeIn(300);

	});
	
	$('.next-q-btn').click(function(){
		toNextQuizQuestion();
	});
	
	$('#redo-quiz-btn').click(function(){
		$(this).parent().parent().hide();
		resetQuiz();
	});
	
	$('.new-get-started-btn').click(function(){
		
		if($(this).parent().find('input').val() == ''){
			$(this).parent().addClass('no-email-animate');
			var el = $(this).parent();       
			//Prepend the clone & then remove the original element
			el.before( el.clone(true) ).remove();
		}
		else{
			$('#logInModal').modal('show');
			$('#logInModal .email').val($('#topEmail').val());
		}
	});
	
	$('.postit').mouseenter(function(){
		
		if(!$(this).hasClass('swing-animate')){
			$(this).addClass('swing-animate');
			var el = $(this);     

			//Prepend the clone & then remove the original element
			//el.before( el.clone(true) ).remove();
		
			el.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
				el.removeClass('swing-animate');
			});
		}
		
	});
	
	$('.team-member').mouseenter(function(){
	
		$('#team-member-name').text($(this).find('.tm-name').text());
		$('#team-member-position').text($(this).find('.tm-position').text());
	
		$('#team-member-name').show();
		$('#team-member-position').show();
	});
	
	$('.team-member').mouseleave(function(){
		$('#team-member-name').hide();
		$('#team-member-position').hide();
	});
	
	$('.tli-btn').mouseenter(function(){
		$('#tli-info').html($(this).parent().find('.tli-btn-info').html());
		$('#tli-info').show();
	});
	
	$('.tli-btn').mouseleave(function(){
		$('#tli-info').hide();
	});

});

function toNextProofQuestion(){
	$('.proof-question').each(function() {
		if(!$(this).hasClass('proof-choice-selected')){
			
			$(this).show();
			$(this).prev().hide();
	
			$(this).animate({left:'50%', "opacity": 1}, {queue: false, duration: 300, complete: function (){

			}});
			
			return false;
		}
	});
}

function toNextQuizQuestion(){
	$('.quiz-question').each(function() {
		if(!$(this).hasClass('quiz-choice-selected')){
			
			$(this).show();
			$(this).prev().hide();
	
			$(this).animate({left:'50%', "opacity": 1}, {queue: false, duration: 300, complete: function (){

			}});
			
			return false;
		}
	});
}

function resetQuiz(){

	quizScore = 0;

	$('.next-q-btn').hide();
	$('.quiz-choice-selected').removeClass('quiz-choice-selected');
	$('.quiz-question').css('opacity', '0.0');
	$('.quiz-question').css('left', '60%');
	$('.quiz-explanation').hide();
	$('.quiz-choice-a').find('img').attr('src', 'images/blotcha.png');
	$('.quiz-choice-b').find('img').attr('src', 'images/blotchb.png');
	$('.quiz-choice-c').find('img').attr('src', 'images/blotchc.png');
	
	toNextQuizQuestion();

}