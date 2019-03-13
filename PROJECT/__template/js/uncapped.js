$(document).ready(function() {
	//check
	(function () {
		$('[data-form]').each(function() {
			var _form = $(this),
				check = _form.find('[data-check]'),
				send = _form.find('[data-btn]');

			check.on('change', function () {
				send.prop('disabled', function(i, v) { return !v; });
		    });
		});
	})();

	//tabs
	(function () {
		function tabs($target, $classBtn, $classTab, $animate) {
			$target.each(function() {
				var _this = $(this),

					tabline = _this.find('[data-tabsline]').filter(':first'),
					but = tabline.find('> *'),

					contentbox = _this.find('[data-contentbox]').filter(':first'),
					content = contentbox.find('> *');

				but.on('click', function() {
					var _thisBtn = $(this),
						_i = _thisBtn.index(),
						eqContent = content.eq(_i),
						siblings = {
							btn: _thisBtn.siblings(),
							content: eqContent.siblings()
						};

					console.log(_thisBtn);

					if ($animate === true) {
						eqContent.fadeIn('fast').css({'display':''});
						siblings.content.css({'display':''});
					}

					_thisBtn.addClass($classBtn);
					eqContent.addClass($classTab);

					siblings.btn.removeClass($classBtn);
					siblings.content.removeClass($classTab);
				});
			});
		};

		tabs($('[data-tabs-bank]'), 'banks__tabbox-item--active', 'banks__content--active');
		tabs($('[data-tabs-schemebox]'), 'layouts__schemebox-tabline-btn--active', 'layouts__schemebox-tab--active', true);
		tabs($('[data-inner-schemebox]'), 'layouts__schemebox-inner-tabline-btn--active', 'layouts__schemebox-scheme--active', true);
	})();

	$('[data-nav]').each(function () {
		var nav = $(this),
			btn = nav.find('[data-scroll-id]');

		btn.on('click', function (e) {
			e.preventDefault();

			var _this = $(this),
				_siblings = _this.siblings(),
				_target = _this.attr('href'),
				_top = $(_target).offset().top;

			_this.addClass('header__nav-link--active');
			_siblings.removeClass('header__nav-link--active');

			$('body,html').animate({
				scrollTop: _top
			}, 500);
		});
	});

	(function () {
        $('body').each(function() {
        	var _this = $(this),
        		_button = _this.find('[data-scroll-top]');

            $(window).on('scroll', function() {
        		if($(this).scrollTop() > 700) {
        			_button.fadeIn();
        		} else {
        			_button.fadeOut();
        		}
        	});

            _button.on('click', function() {
        		$('body,html').animate({
					scrollTop:0
				},600);
        	});
        });
    })();
	// $("#menu").on("click","a", function (e) {
	// 	e.preventDefault();
	//
	// 	var id  = $(this).attr('href'),
	//
	// 	top = $(id).offset().top;
	//
	// 	$('body,html').animate({scrollTop: top}, 1500);
	// });


	//adaptive menu
	(function () {
		$('[data-header]').each(function() {
			var _this = $(this),
				_btn = _this.find('[data-hamburger]'),
				_nav = _this.find('[data-nav]'),
				_body = $('body');

			_btn.on('click', function() {
				_nav.stop(true,true).fadeToggle(250).css({ 'display' : 'flex' });
				_btn.toggleClass('hamburger--active');
				_body.toggleClass('nav__overflow');
			});

			$(window).resize(function() {
				if (this.innerWidth > 970) {
					_nav.css({ 'display' : '' });
					_btn.removeClass('hamburger--active');
				}
			});
		});
	})();
	//adaptive menu END

	//scroll action
	//animate
	(function () {
		var animate = {
			WatchAnimation: function() {
				var
					_target = $("[data-circles]"),
					_round = _target.find('.a'),
					_tMax = new TimelineMax({
						repeat: -1
					});

				_tMax
					.staggerFrom(_round, 1, {
						//autoAlpha: 0,
						ease: Power0.easeIn
					}, 0.01)
					.staggerTo(_round, 1, {
						scale: 1.1,
						transformOrigin: "50% 50%",
						ease: Power0.easeIn
					}, 0.01, "-=2.05")
					.staggerTo(_round, 1, {
						scale: 1,
						//alpha: 0,
						transformOrigin: "50% 50%",
						ease: Power0.easeOut
					}, 0.01, "-=1"),

				_tMax.timeScale(1.2)
			},
		};

		$(window).on('load resize', function() {
			if (this.innerWidth > 560) {

				//scroll action
				$("[data-viewport-circle]").viewport({
					overflow: false,
					targetVisible: function() {
						this.addClass("b-circle--active");
					},
				});
				//scroll action END

				animate.WatchAnimation();
			}
		});
	})();


	//form
	(function () {
		$('[data-popup]').each(function() {
			var _form = $(this),
				_input = _form.find('[data-input]');

			_input.on('click', function () {
				$(this).addClass('input--active');
			})

			$('body').on('click', function(e) {
				if (
					(!$(e.target).closest(_input).length)
					&&
					(_input.val().length === 0)
				) {
					_input.removeClass('input--active')
				}
			});
		});
	})();
	//form END

	//search
	(function () {
		$('body').each(function() {
			var _body = $(this),
				_search = {
					btn: _body.find('[data-search-btn]'),
					panel: _body.find('[data-search]'),
					close: _body.find('[data-search-close]'),
				},
				_input = _search.panel.find('[data-search__input]'),
				_placeholder = _search.panel.find('[data-search__place]'),
				_form = _search.panel.find('[data-search__form]');

			_search.btn.on('click', function (e) {
				e.preventDefault();
				_search.panel.addClass('search-panel--active');
				_body.addClass('search__overflow');
			});
			_search.close.on('click', function () {
				_search.panel.removeClass('search-panel--active');
				_body.removeClass('search__overflow');
				_placeholder.removeClass('search-placeholder--active');
				_form.trigger('reset');
			});
			_input.on('click', function () {
				_placeholder.addClass('search-placeholder--active');
			});
			$('body').on('click', function(e) {
				if (
					(!$(e.target).closest(_input).length)
					&&
					(_input.val().length === 0)
				) {
					_placeholder.removeClass('search-placeholder--active')
				}
			});
		});
	})();
	//search END

	//rotate slider
	(function () {
		// function rotator() {
		// 	if (_current == 1) {
		// 		$('[data-rotate=1]').removeClass().addClass("active");
		// 		$('[data-rotate=2]').removeClass().addClass("non-active-top");
		// 		$('[data-rotate=3]').removeClass().addClass("non-active-bottom");
		// 		$('[data-rotate=4]').removeClass().addClass("non-active-top--2");
		// 		$('[data-rotate=5]').removeClass().addClass("non-active-bottom--2");
		//
		// 	} else if (_current == 2) {
		// 		$('[data-rotate=1]').removeClass().addClass("non-active-bottom");
		// 		$('[data-rotate=2]').removeClass().addClass("active");
		// 		$('[data-rotate=3]').removeClass().addClass("non-active-bottom--2");
		// 		$('[data-rotate=4]').removeClass().addClass("non-active-top");
		// 		$('[data-rotate=5]').removeClass().addClass("non-active-top--2");
		//
		// 	} else if (_current == 3) {
		// 		$('[data-rotate=1]').removeClass().addClass("non-active-top");
		// 		$('[data-rotate=2]').removeClass().addClass("non-active-top--2");
		// 		$('[data-rotate=3]').removeClass().addClass("active");
		// 		$('[data-rotate=4]').removeClass().addClass("non-active-bottom--2");
		// 		$('[data-rotate=5]').removeClass().addClass("non-active-bottom");
		//
		// 	} else if (_current == 4) {
		// 		$('[data-rotate=1]').removeClass().addClass("non-active-bottom--2");
		// 		$('[data-rotate=2]').removeClass().addClass("non-active-bottom");
		// 		$('[data-rotate=3]').removeClass().addClass("non-active-top--2");
		// 		$('[data-rotate=4]').removeClass().addClass("active");
		// 		$('[data-rotate=5]').removeClass().addClass("non-active-top");
		//
		// 	} else if (_current == 5) {
		// 		$('[data-rotate=1]').removeClass().addClass("non-active-top--2");
		// 		$('[data-rotate=2]').removeClass().addClass("non-active-bottom--2");
		// 		$('[data-rotate=3]').removeClass().addClass("non-active-top");
		// 		$('[data-rotate=4]').removeClass().addClass("non-active-bottom");
		// 		$('[data-rotate=5]').removeClass().addClass("active");
		// 	}
		// }

		// $('.js-rotate-slider').each(function() {
		// 	var _this = $(this),
		// 		_rotator = _this.find('.js-rotator'),
		// 		_slide = _rotator.find('[data-rotate]'),
		// 		_next = _this.find('.js-rotate__btn--next'),
		// 		_prev = _this.find('.js-rotate__btn--prev');
		//
		// 	//height
		// 	$(window).on('load resize', function() {
		// 		var _slideActive = _rotator.find('.active'),
		// 			_heightActive = _slideActive.outerHeight();
		//
		// 		_rotator.outerHeight(_heightActive + 40);
		// 	});
		//
		// 	//slider
		// 	_slide.on('click', function() {
		// 		var _data = $(this).data('rotate');
		// 		_current = _data;
		// 		rotator();
		// 	});
		//
		// 	//button
		// 	_next.on('click', function() {
		// 		_rotator.find('.non-active-top').trigger('click');
		// 	});
		// 	_prev.on('click', function() {
		// 		_rotator.find('.non-active-bottom').trigger('click');
		// 	});
		//
		// //end
		// });

		$('[data-rotate-slider]').each(function() {
			var _this = $(this),
				_slider = _this.find('[data-rotator]'),
				_next = _this.find('[data-next]'),
				_prev = _this.find('[data-prev]');

			$(window).on('load resize', function() {
				var _active = _slider.find('.rotator__slide-1'),
					_height = _active.outerHeight();

				_slider.outerHeight(_height + 40);
			});

			_slider.rotator();

			_next.on('click', function() {
				_slider.find('.rotator__slide-2').trigger('click');
			});
			_prev.on('click', function() {
				_slider.find('.rotator__slide-5').trigger('click');
			});
		});
	})();
	//rotate slider END

	//header fix
	(function () {
		$('.js-header-fxd').each(function() {
			var _header = $(this),
				_height = _header.outerHeight() / 2;

			$(window).on('scroll', function(){
				var _top = $(this).scrollTop();

				if ( _top < _height ) {
					_header.removeClass('header--fixed');
				} else {
					_header.addClass('header--fixed');
				}
		    });
		});
	})();
	//header fix END

	//sub menu
	(function () {
		$('.js-link-sub').each(function() {
			var _link = $(this),
				_menu = _link.find('.js-sub-menu');

			_link.on('click', function(){
				$(this).toggleClass('main-menu__item--sub-active');
			});
		});
	})();
	//sub menu END

	//tabs
	function tabs($tab) {
		$('.js-tab-block').each(function() {
			var _this = $(this),
				_but = _this.find('.js-tab-but'),
				_content = _this.find('.js-tab-content');

			_but.on('click', function() {
				_but.removeClass($tab);
				$(this).addClass($tab);

				_content
					.css({'display':''})
					.removeClass('filter__content-box--active');

				_content.eq($(this).index())
					.fadeIn(300)
					.toggleClass('filter__content-box--active');
			});
		});
	};

	tabs('filter__tab--active');
	//tabs END

	//prices preview
	(function () {
		$('[data-prices]').each(function() {
			var _this = $(this),
				_btnBox = _this.find('[data-buttons]'),
				_btn = _btnBox.find('[data-btn]'),
				_content = _this.find('[data-content]'),
				_item = _content.find('[data-item]'),
				_close = _this.find('[data-close]');

			_btn.on('click', function() {
				var _self = $(this);

				if (_self.not('.prices-preview__tab--active')) {
					_self
						.addClass('prices-preview__tab--active')
						.siblings().removeClass('prices-preview__tab--active');
				}
				_btnBox.addClass('prices-preview__tabs--active');
				_close.addClass('prices-preview__close--active');
				_content.addClass('prices-preview__content--active');

				if (_item.not('.prices-preview__item--active')) {
					_item.eq(_self.index())
						.addClass('prices-preview__item--active')
						.siblings()
							.css({'display':''})
							.removeClass('prices-preview__item--active');
				}
			});

			_close.on('click', function() {
				_btn.removeClass('prices-preview__tab--active');
				_btnBox.removeClass('prices-preview__tabs--active');
				_item.removeClass('prices-preview__item--active');
				_close.removeClass('prices-preview__close--active');
				_content.removeClass('prices-preview__content--active');
			});
		});
	})();
	//prices preview END

	//references
	(function () {
		$('.js-references').each(function() {
			var _this = $(this),
				_box = _this.find('.js-references__box'),
				_more = _this.find('.js-references__more').children(),
				_btn = _this.find('.js-references__btn'),
				_btnText = _btn.text();
				_timer = 200;

			var _html;

			_btn.on('click', function (e) {
				e.preventDefault();
				var _self = $(this);

				if ( _html == undefined ) {
					_html = _more.clone();
					_html.hide().appendTo(_box).slideDown(_timer);
					_self.text('Скрыть').addClass('i-more--top-active');
				} else {
					_html.slideUp(_timer, function() {
						$(this).remove();
						_html = undefined;
					});
					_self.text(_btnText).removeClass('i-more--top-active');
				}

			});

		});
	})();
	//references END

	//slide hover
	(function () {
		var _padding = 5;
	    var _obj = {};

		$('.js-filter__nav').each(function() {
			var _this = $(this),
				_menu = _this.find('.js-filter__tabs');


			_menu.mousemove(function(e) {
				if ( !$(_obj).is($(e.target)) ) {
			      	_obj = $(e.target);

			        if ( _obj.is('.js-tab-but') ) {
						$('.js-filter__target').animate({
							'left': _obj.position().left-_padding,
							width: _obj.width()+_padding*2,
							queue: false
						}, 100);
			        }
			    }
			});
		});
	})();
	//slide hover END

	//scroll button
    (function () {
        $('body').each(function() {
        	var _this = $(this),
        		_button = _this.find('.js-scroll-button');

            $(window).on('scroll', function() {
        		if($(this).scrollTop() > 700) {
        			_button.fadeIn();
        		} else {
        			_button.fadeOut();
        		}
        	});

            _button.on('click', function() {
        		$('body,html').animate({
					scrollTop:0
				},600);
        	});
        });
    })();
    //scroll button END

	//download input
	(function () {
		$('.js-file-loader').each(function() {
			var _this = $(this),
				_input = _this.find('.js-file-input'),
				_name = _this.find('.js-file-name'),
				_nameText = _name.html();

			_input.on('change', function() {
				var _val = $(this).val().replace(/\\/g, '/').replace(/.*\//, '');

				if (_val.length != 0) {
					_name.html(_val);
				} else {
					_name.html(_nameText);
				}
			});
		});
	})();
	//download input END

	//check
	(function () {
		$('.js-form-validate').each(function() {
			var _form = $(this),
				_check = _form.find('.js-check'),
				_send = _form.find('.js-send');

			_check.on('click', function () {
				_send.prop('disabled', function(i, v) { return !v; });
		    });
		});
	})();
	//check END

	//textarea resize
	(function () {
		$('.js-textarea-parent').each(function() {
			var _parent = $(this);

			_parent.on('change keyup keydown paste cut', 'textarea', function (){
		    	$(this).height(0).height(this.scrollHeight);
			}).find('textarea').change();
		});
	})();
	//textarea resize END




/*
** END
*/
});
