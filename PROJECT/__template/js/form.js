$(document).ready(function() {
    (function () {
        var _initPlugins = {
                inputmask: function ($input) {
                    $input.inputmask({
                        mask: '+7 (999) 999-99-99',
                        showMaskOnHover: false,
                    });
                },
                agreementCheck: function ($form) {
                    $form.each(function() {
            			var _form = $(this),
            				check = _form.find('[data-check]'),
            				send = _form.find('[data-btn]');

            			check.on('change', function () {
            				send.prop('disabled', function(i, v) { return !v; });
            		    });
            		});
                },
                toggleForm: function functionName($wrap) {
                    $wrap.each(function () {
                        var _thisWrap = $(this),
                            toggleBox = _thisWrap.find('[data-popup-togbox]'),
                            btn = _thisWrap.find('[data-popuptoggle]'),
                            btnText = btn.find('span').filter(':first').text();

                        btn.on('click', function () {
                            var _thisBtn = $(this),
                                text = _thisBtn.find('span').filter(':first').text();

                            if (btnText === text) {
                                _thisBtn.find('span').filter(':first').text('Вернуться к плану');
                            } else {
                                _thisBtn.find('span').filter(':first').text(btnText);
                            }

                            toggleBox.toggleClass('planning-popup__main-toggle--active');
                        });
                    });
                },
                setOutputValue: function ($wrap, $output, $src) {
                    $wrap.each(function () {
                        var _thisWrap = $(this),
                            input = _thisWrap.find('[data-setoutput]'),
                            img = _thisWrap.find('[data-scheme]');

                        $output.each(function (i) {
                            var _thisVal = $(this).text();

                            input.eq(i).val(_thisVal);
                        });

                        console.log($src);

                        img.attr('src', $src);
                    });
                },
                selectFloor: function ($wrap) {
                    $wrap.each(function () {
                        var _thisWrap = $(this),
                            box = _thisWrap.find('[data-floor]'),
                            cell = box.find('[data-cell]'),
                            priceInput = _thisWrap.find('[data-setoutput]').filter(':first');

                        cell.on('click', function () {
                            var _thisCell = $(this),
                                siblings = _thisCell.siblings(),
                                price = _thisCell.data('cell');

                            priceInput.val(price);

                            if (!_thisCell.is('.planning-popup__cells-cell--deactive')) {
                                _thisCell.toggleClass('planning-popup__cells-cell--active');
                                siblings.removeClass('planning-popup__cells-cell--active');
                            }
                        });
                    });
                },
            };

        var _initSubmit = {
            submitDisable: function ($form) {
                $form.submit(function() {
                    return false;
                });
            },
            formInit: function ($form) {
                $form.each(function () {
                    var _thisForm = $(this),
                        _data = _thisForm.serialize(),
                        handler = _thisForm.attr('action'),
                        button = _thisForm.find('[data-submit]');

                    _initSubmit.submitDisable(_thisForm);

                    button.on('click', function(){
                        _initSubmit.formAjax(_thisForm, _data, handler);
                    });
                });
            },
            formAjax: function ($form, $data, $handler) {
                $.ajax({
                    url: $handler,
                    type: "POST",
                    data: $data,
                    success: function(msg){
                        _initSubmit.success($form, msg);
                    }
                });
            },
            success: function ($form, $msg) {
                $.magnificPopup.close();

                $form.trigger('reset');

                _initSubmit.popupAfterSend();
            },
            popupAfterSend: function () {
                $.magnificPopup.open({
                    items: {
                        src: '/after-popup/'
                    },
                    type: 'ajax',
                    mainClass: 'popup__mfp',
                    callbacks: {
                        parseAjax: function(mfpResponse) {
                            _popupInit.getPopup(mfpResponse);
                        },
                    },
                }, 0);
            }//-
        };

        var _popupInit = {
            getPopup: function ($parseAjax) {
                $parseAjax.data = $($parseAjax.data).find('[data-popup]');
            },
            popupInit: function ($link) {
                $link.magnificPopup({
                    type: 'ajax',
                    mainClass: 'popup__mfp',
                    callbacks: {
                        parseAjax: function(mfpResponse) {
                            _popupInit.getPopup(mfpResponse);
                        },//-
                        ajaxContentAdded: function () {
                            var _this = this.content,
                                form = _this.find('[data-form]'),
                                phoneInput = _this.find('[data-mask-phone]');

                            _initPlugins.inputmask(phoneInput);
                            _initPlugins.agreementCheck(form);
                            _initSubmit.formInit(form);
                        }//-
                    },
                });
            }
        };

        var _popupAjax = $('[data-popup-ajax]');

        if (_popupAjax.length) {
            _popupInit.popupInit(_popupAjax);
        };

        //
        $('[data-table]').each(function () {
            var _table = $(this),
                outputline = _table.find('[data-outputline]');

            outputline.on('click', function () {
                var _thisOutputline = $(this),
                    output = _thisOutputline.find('[data-output]'),
                    schemeSrc = _thisOutputline.find('[data-outputimg]').data('outputimg');

                $.magnificPopup.open({
                    items: {
                        src: '/planning-popup/'
                    },
                    type: 'ajax',
                    mainClass: 'popup__mfp',
                    callbacks: {
                        parseAjax: function(mfpResponse) {
                            _popupInit.getPopup(mfpResponse);
                        },
                        ajaxContentAdded: function () {
                            var _this = this.content,
                                form = _this.find('[data-form]'),
                                phoneInput = _this.find('[data-mask-phone]');

                            _initPlugins.inputmask(phoneInput);
                            _initPlugins.agreementCheck(form);
                            _initPlugins.toggleForm(_this);
                            _initPlugins.selectFloor(_this);
                            _initPlugins.setOutputValue(_this, output, schemeSrc);
                            _initSubmit.formInit(form);
                        }//-
                    },
                }, 0);

            })
        });
    })();

});// end
