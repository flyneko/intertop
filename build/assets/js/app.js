$(function () {
    var $body = $('body');
    var carouselOptions = function () {
        return {
            dots: true,
            nav: false,
            slidesPerView: 1,
            spaceBetween: 30,
            loop: false,
            slidesPerColumn: 1,
            watchOverflow: true,
            pagination: {
                clickable: true
            }
        };
    };

    function isMobile() {
        return $('.js-nav-toggle').is(':visible');
    }

    function ProductCarousel($el) {
        if ($el.data('gallery-init'))
            return;
        SwiperProxy($el, {
            dots: true,
            nav: false,
            slidesPerView: 5,
            slidesPerColumn: $el.data('rows') || 1,
            spaceBetween: 30,
            watchOverflow: true,
            pagination: {
                clickable: true
            },
            breakpoints: {
                1100: { slidesPerView: 4},
                992: { slidesPerView: 3, spaceBetween: 20 },
                767: { spaceBetween: 15, slidesPerView: 2, slidesPerColumn: 2 },
                480: { spaceBetween: 10, slidesPerView: 2, slidesPerColumn: 2 }
            }
        });
        $el.data('gallery-init', true);
    }

    SwiperProxy($('.js-reviews-carousel'), $.extend(carouselOptions(), {
        slidesPerView: 1,
        slidesPerColumn: 5,
        breakpoints: {
            1100: { slidesPerColumn: 4 },
            992: { slidesPerColumn: 3 },
            767: { slidesPerColumn: 2 },
            480: { slidesPerColumn: 1, slidesPerView: 1 }
        }
    }));

    SwiperProxy($('.js-order-items-carousel'), $.extend(carouselOptions(), {
        spaceBetween: 15,
        slidesPerView: 'auto',
        freeMode: true
    }));

    SwiperProxy($('.js-features-carousel'), $.extend(carouselOptions(), {
        slidesPerView: 5,
        slidesPerColumn: 2,
        spaceBetween: 30,
        breakpoints: {
            1100: { slidesPerView: 4 },
            992: { spaceBetween: 20, slidesPerColumn: 1 },
            767: { spaceBetween: 15, slidesPerView: 3, slidesPerColumn: 1  },
            480: { spaceBetween: 10, slidesPerView: 2, slidesPerColumn: 1  }
        }
    }));

    SwiperProxy($('.js-single-carousel'), {
        dots: true,
        nav: false,
        slidesPerView: 1,
        loop: true,
        pagination: {
            clickable: true
        },
    });

    SwiperProxy($('.js-brands-carousel'), $.extend(carouselOptions(), {
        slidesPerView: 5,
        slidesPerColumn: 3,
        spaceBetween: 30,
        breakpoints: {
            992: { spaceBetween: 20 },
            767: { spaceBetween: 15, slidesPerView: 4, slidesPerColumn: 2 },
            480: { spaceBetween: 10, slidesPerView: 3, slidesPerColumn: 1 }
        }
    }));

    SwiperProxy($('.js-brands-about-carousel'), $.extend(carouselOptions(), {
        slidesPerView: 4,
        slidesPerColumn: 3,
        spaceBetween: 30,
        breakpoints: {
            992: { spaceBetween: 20 },
            767: { spaceBetween: 15, slidesPerColumn: 2 },
            480: { spaceBetween: 10, slidesPerView: 3, slidesPerColumn: 1 }
        }
    }));

    $('.js-products-carousel:visible').each(function () {
        ProductCarousel($(this));
    });

    $('.js-select').each(function () {
        var $select = $(this);
        function stateHandler(state) {
            var icon = $(state.element).data('icon');
            var color = $(state.element).data('icon-color');

            if (!state.id || !icon)
                return state.text;

            var $state = $(
                '<span class="select2-icon-container">' +
                '<svg ' + (color ? 'style="fill: ' + color + ';"' : '') + ' class="icon icon-' + icon + '"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-' + icon + '"></use></svg>' +
                state.text +
                '</span>'
            );
            return $state;
        }

        $select.select2({
            placeholder: $select.data('placeholder') || '',
            minimumResultsForSearch: Infinity,
            width: '100%',
            templateSelection: stateHandler,
            templateResult: stateHandler
        });
    });

    $('.js-phone-mask').each(function () {
        var $this = $(this);
        var placeholder = "(___) ___-__-__";
        $this.mask("(000) 000-00-00", { placeholder: placeholder });
        if (!$this.attr('placeholder'))
            $this.attr('placeholder', placeholder);
    })

    $('.js-tabs').each(function () {
        var $this = $(this);
        $this.tabs();
        $this.on('tabs:show', function (e, $pane) {
            var $carousel = $pane.find('.js-products-carousel');
            if ($carousel.length)
                ProductCarousel($carousel);
        })
    });

    $('.js-dropdown').each(function () {
        var $this = $(this);
        $this.dropdown();
        $this.on('dropdown.open', function () {
            setTimeout(function () {
                $this.find('.js-tabs').tabs('update');
            }, 201);
        })
    });

    // Catalog
    (function () {
        var $navBar = $('.js-nav-bar'),
            $catalog = $('.js-catalog'),
            $navLinks = $('.js-nav-item'),
            $header = $('js-header'),
            $htmlBody = $('html, body'),
            scrollTop = 0,
            showTimeout, closeTimeout,
            showDelay = 200, closeDelay = 100;
        var scrollbarWidth = (function() {
            var result = 0,
                $outer = $('<div>').css({ overflow: 'scroll', visibility: 'hidden', height: '100px', position: 'absolute', msOverflowStyle: 'scrollbar', left: 0, top: 0, width: '100%', zIndex: -9999}),
                $inner = $('<div>').css({ width: '100%', height: '1px'});
            $outer.append($inner);
            $body.append($outer);
            result = $outer.width() - $inner.width();
            $outer.remove();
            return result;
        })();
        var close = function () {
            if (!$catalog.hasClass('is-active'))
                return;
            if (!$header.hasClass('is-fixed')) {
                $body.css('padding-top', 0);
            }
            $header.css('top', 0);
            $navLinks.removeClass('is-active');
            $catalog.removeClass('is-active');
            $header.removeClass('is-active');
            //$htmlBody.removeClass('scroll-lock');
            //$(document).scrollTop(scrollTop);
            $navBar.fadeOut();
            if ($header.find('> *').height() <= window.innerHeight) {
                $body.css('padding-right', 0)
                $header.css('margin-right', 0);
                $header.find('.header__inn > *').css('padding-right', 0);
            }
        };
        $navLinks.mouseenter(function () {
            var $this = $(this);
            clearTimeout(closeTimeout);
            clearTimeout(showTimeout);
            showTimeout = setTimeout(function () {
                scrollTop = $(document).scrollTop();
                $navLinks.removeClass('is-active');
                $this.addClass('is-active');
                $navBar.fadeIn().css({
                    left: $this.find('span').position().left,
                    width: $this.find('span').width()
                });
                if ($catalog.hasClass('is-active'))
                    return false;


                $catalog.addClass('is-active');
                $header.addClass('is-active');
                //$htmlBody.addClass('scroll-lock');

                // Убираем дергание страницы при скрытии скроллбара
                if ($header.find('> *').height() <= window.innerHeight) {
                    $body.css('padding-right', scrollbarWidth)
                    $header.css('margin-right', -1 * scrollbarWidth);
                    $header.find('.header__inn > *').css('padding-right', scrollbarWidth);
                }
            }, showDelay);
        }).mouseleave(function () {
            clearTimeout(showTimeout);
            closeTimeout = setTimeout(close, closeDelay);
        });

        $(window).resize(function () {
            if (isMobile())
                close();
        });

        $catalog.mouseenter(function () {
            clearTimeout(closeTimeout);
        }).mouseleave(function () {
            closeTimeout = setTimeout(close, closeDelay);
        });

        // Mobile catalog
        (function () {
            var $mCatalog = $('.js-m-catalog');
            var isTranslating = false;
            var isAjax = false;
            var prevLists = [];
            var showList = function ($current, $new, title) {
                if (isTranslating)
                    return false;
                isTranslating = true;
                $current.width($current.width());
                $new.width($current.width());
                if (title) {
                    $new.prepend('<li class="m-catalog__title js-m-catalog-back">' + title + '</li>');
                }
                $new.css({ position: 'absolute', top: 0, left: (title ? 1 : -1) * $current.width(), zIndex: 1 }).insertAfter($current);
                $current.css('left', (title ? -1 : 1) * $current.width());
                $new.css('left', 0);
                $mCatalog.height($new.height());
                setTimeout(function () {
                    $mCatalog.css('height', $new.height());
                    $current.remove();
                    $new.css('position', 'relative');
                    isTranslating = false;
                }, 500);
            }
            $body.on('click', '.js-m-catalog-link', function () {
                var $link = $(this);
                var $list = $link.parents('.m-catalog__list:first');
                if (isAjax)
                    return false;
                isAjax = true;
                prevLists.push($mCatalog.html());
                $mCatalog.height($mCatalog.height());
                $.get('submenu.html?id=' + $link.data('id'), function (response) {
                    var $sub = $(response);
                    showList($list, $sub, $link.text());
                    isAjax = false;
                });
                return false;
            });

            $body.on('click', '.js-m-catalog-back', function () {
                showList($(this).parents('.m-catalog__list:first'), $(prevLists.pop()));
                return false;
            })
        })();
    })();

    (function () {
        $('.product').mouseenter(function () {
            $(this).closest('.products-carousel').addClass('is-hover');
        }).mouseleave(function () {
            $(this).closest('.products-carousel').removeClass('is-hover');
        })
    })();

    // Header
    (function () {
        var $header = $(".js-header");
        var pos = $header.offset().top;
        var $replace = $('<div>').insertBefore($header);
        function headerFixed() {
            var top = $(document).scrollTop();
            if (top > 0 && top >= pos && !$header.hasClass('is-fixed')) {
                $replace.css('height', $header.outerHeight())
                $header.addClass('is-fixed');
            } else if (top <= pos && $header.hasClass('is-fixed')) {
                $replace.css('height', 0);
                $header.removeClass('is-fixed');
            }
        }

        $(window).scroll(headerFixed);
        headerFixed();

        // Mnav
        (function () {
            var $mnav = $('.js-m-nav');
            var $main = $('.l-main');
            var $navToggle = $('.js-nav-toggle');
            var $header = $(".header");

            var slideout = new Slideout({
                panel: $main[0],
                menu: $mnav[0],
                padding: $mnav.width(),
                tolerance: 70,
                duration: 600,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                touch: false
            });
            var open = function() {
                $navToggle.addClass('is-active');
                if ($header.hasClass('is-fixed'))
                    $header.css('position','absolute').css('top', ($(window).scrollTop()) + 'px');
            }
            slideout.on('translatestart', open);
            slideout.on('beforeopen', open);
            slideout.on('close', function() { $header.attr('style', '').prop('style', ''); });
            slideout.on('beforeclose', function () { $navToggle.removeClass('is-active'); });

            $navToggle.click(function () {
                if (isMobile())
                    slideout.open()
                return false;
            });

            $main.click(function () {
                if (slideout.isOpen()) {
                    slideout.close();
                    return false;
                }
            });
        })();
    })();


    function ItemGallery($el) {
        $el.find('.item').each(function () {
            var $item = $(this);
            function imageZoom($img) {
                var $itemMeta = $item.find('.item__meta');
                var $zoomContainer = $('<div>', { id: 'zoomContainer' }).css({ display: 'none', position: 'absolute', zIndex: 9, left: 0, top: 0, width: $itemMeta.outerWidth(), height: $itemMeta.outerHeight(),}).prependTo($itemMeta);

                $img.elevateZoom({
                    lensBorder: 3,
                    borderSize: 3,
                    zoomWindowPosition: 'zoomContainer',
                    zoomWindowWidth: $itemMeta.outerWidth(),
                    zoomWindowHeight: $itemMeta.outerHeight()
                }).on('show', function () {
                    $zoomContainer.show();
                }).on('hide', function () {
                    $zoomContainer.hide();
                }).on('destroy', function () {
                    $zoomContainer.remove();
                });
            }


            $el.find('.js-item-gallery').each(function () {
                var $this = $(this);
                SwiperProxy($this, {
                    dots: true,
                    nav: false,
                    direction: 'vertical',
                    slidesPerView: 1,
                    pagination: { clickable: true },
                    spaceBetween: 30,
                    mousewheel: true,
                    speed: 600,
                    breakpoints: {
                        767: { direction: 'horizontal' }
                    },
                    on: {
                        init: function () {
                            if ($this.data('video')) {
                                setTimeout(function () {
                                    var video = $this.data('video');
                                    var $btn = $('<div class="play d-none d-sm-flex"></div>');
                                    var $btnMobile = $('<div class="play-btn d-sm-none"><div class="play"></div> Видео</div>');
                                    $btn.add($btnMobile).click(function () {
                                        if (/youtube/.test(video)) {
                                            var video_id = $this.data('video').split('v=')[1];
                                            var ampersandPosition = video_id.indexOf('&');
                                            if(ampersandPosition != -1) {
                                                video_id = video_id.substring(0, ampersandPosition);
                                            }
                                            BigPicture({ el: this, ytSrc: video_id});
                                        } else
                                            BigPicture({ el: this, vidSrc: video});
                                    })
                                    $this.parent().find('.swiper-dots').append($btn);
                                    $this.parent().append($btnMobile);
                                });
                            }

                            if (!isTouchDevice())
                                imageZoom($this.find('.swiper-slide-active img'));
                        },
                        slideChangeTransitionEnd: function () {
                            $this.find('img').each(function () {
                                if ($(this).data('elevateZoom'))
                                    $(this).data('elevateZoom').destroy();
                            });
                            if (!isTouchDevice())
                                imageZoom($this.find('.swiper-slide-active img'));
                        }
                    }
                });
            });
        });
    }

    (function () {
        ItemGallery($('.l-inner'))
    })();

    (function () {
        autosize($('.js-autoheight'));
    })();

    (function () {
        $('.js-accordion').each(function () {
            var $this = $(this);
            var $trigger = $this.find('> [data-accordion="trigger"]');
            var $content = $this.find('> [data-accordion="content"]');
            $trigger.click(function () {
                $this.toggleClass('is-expanded');
                if ($this.hasClass('is-expanded')) {
                    $this.addClass('is-animate-in').removeClass('is-animate-out');
                } else
                    $this.addClass('is-animate-out').removeClass('is-animate-in');
            })
        })
    })();

    $("[data-fancybox]").each(function () {
        var $this = $(this);
        if ($this.data('fancybox-init'))
            return;

        $this.fancybox({
            touch: false,
            closeExisting: true,
            toolbar: false,
            btnTpl   : {
                smallBtn : '<button data-fancybox-close class="modal__close" title="Close"><svg class="icon icon-close-button"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close-button"></use></svg></button>'
            },
            beforeShow: function() {
            },
            afterShow: function () {
                ItemGallery($('.modal'))
                this.$content.find('.js-tabs').tabs('update');
            }
        });
        $this.data('fancybox-init', true);
    });

    $('.js-rate').each(function () {
        var $this = $(this);
        $this.click(function () {
            $this.parent().find('label.is-checked').removeClass('is-checked');
            $this.addClass('is-checked');
        })
    });



    $('.js-scroll').each(function () {
        var ps = new PerfectScrollbar(this, {
            wheelSpeed: 2,
            wheelPropagation: false,
            minScrollbarLength: 20,
            suppressScrollX: true
        });
        $(this).data('ps', ps);
    });


    // Filters
    (function () {
        var $filters = $('.js-filters');
        var close = function () {
            $('.filter').removeClass('is-active');
            $('.filter').parent().find('.js-filter-label').removeClass('is-active');
        };

        function declOfNum(number, titles) {
            var cases = [2, 0, 1, 1, 1, 2];
            number = Math.abs(number);
            return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
        }

        $('.js-filter').each(function () {
            var $filter = $(this);
            var $inn = $filter.find('.filter__inn');
            var $dropdown = $filter.find('.filter__dropdown');
            var $label = $filter.find('.filter__label');
            var manyText = $label.data('many');
            var $remove = $('<div class="filter__remove">');
            $inn.prepend($remove);
            $filter.data('label', $label.html());

            $label.click(function () {
                var $this = $(this);
                if (!$filter.hasClass('is-active'))
                    close();
                $filter.toggleClass('is-active');
                if ($filter.find('.js-scroll').length)
                    $filter.find('.js-scroll').data('ps').update();
                return false;
            });

            $filter.find('button.btn').click(function () {
                if ($dropdown.find('input[type=checkbox]').length) {
                    var l = $dropdown.find('input:checked').length;
                    if (!l) {
                        $filter.removeClass('is-active');
                        return false;
                    }

                    $label.html(l + ' ' + declOfNum(l, manyText));
                }
                if ($dropdown.find('[data-type=from], [data-type=to]').length) {
                    var from = $dropdown.find('[data-type=from]').val();
                    var to = $dropdown.find('[data-type=to]').val();
                    var text = '';
                    if (from == '' && to == '') {
                        $filter.removeClass('is-active');
                        return;
                    }
                    if (from != '' && to != '')
                        text = from + '-' + to;
                    if (from != '' && to == '')
                        text = 'от ' + from;
                    if (from == '' && to != '')
                        text = 'до ' + to;

                    $label.html($filter.data('label') + ': ' + text);
                }
                $filter.parent().find('.js-filter-label').removeClass('is-active');
                $filter.addClass('is-selected').removeClass('is-active');
                return false;
            });

            $remove.click(function () {
                $filter.removeClass('is-selected').removeClass('is-active');
                $label.html($filter.data('label'));
                return false;
            })
        });

        $('.js-filters-clear').click(function () {
            $(this).closest('form').trigger('reset').find('.filter__remove').click();
            return false;
        });

        $('html').click(function (e) {
            var $target = $(e.target);

            if (!$target.parents('.filter').length)
                close();
        });

        $('.js-mobile-filter-trigger').click(function () {
            $filters.show();
        });

        $('.js-filter-close').click(function (e) {
            e.preventDefault()
            $filters.hide();
        });

        $(window).resize(function () {
            if (!isMobile())
                $filters.attr('style', '').prop('style', '');
        });

        (function () {
            var isTranslating = false;
            var $area = $('.page__filter-area');
            var $list = $('.page__filter-list');
            var $back = null;
            var translate = function ($current, $new, direction) {
                isTranslating = true;
                $area.height($current.height());

                $area.width($current.width());
                $new.width($current.width());

                $new.css({ position: 'absolute', top: 0, left: direction * $current.width(), zIndex: 1 });
                $current.css('left', -direction * $list.width());
                $new.css('left', 0);
                $area.height($new.height());

                setTimeout(function () {
                    $area.css('height', $new.height());
                    $current.hide();
                    $new.css('position', 'relative');
                    isTranslating = false;
                }, 500);
            };

            $('.js-filter-apply').click(function () {
                var $openFilter = $('.page__filter-open-filter');
                if (!$openFilter.length)
                    return;
                $openFilter.find('button.btn').click();
                $back.click();
                return false;
            });

            $('.js-mobile-filter-label-trigger').click(function () {
                if (isTranslating)
                    return false;
                var $trigger = $(this);
                var $new = $('<div class="page__filter-open-filter">');
                var $filterDrop = $trigger.parent().find('.filter__dropdown').css('display', 'block');

                $back = $('<div class="page__filter-back">' + $trigger.text() + '</div>');

                $new.append($filterDrop);
                $new.prepend($back);

                $new.insertAfter($list);
                translate($list, $new, 1);

                $back.click(function () {
                    translate($new, $list, -1);
                    $list.show();
                    $filterDrop.appendTo($trigger.parent()).attr('style', '').prop('style', '');
                    setTimeout(function () {
                        $new.remove();
                    }, 500);
                });

                setTimeout(function () {
                    if ($filterDrop.find('.js-scroll').length)
                        $filterDrop.find('.js-scroll').data('ps').update();
                }, 500);
            });
        })();
    })();

    // Input slider
    (function () {
        $('.js-range-slider').each(function () {
            var $slider = $(this);
            var $inputFrom = $slider.parent().find('[data-type=from]');
            var $inputTo = $slider.parent().find('[data-type=to]');

            $slider.ionRangeSlider({
                hide_min_max: true,
                grid: false,
                type: 'double',
                force_edges: true,
                hide_from_to: true
            });
            var slider = $slider.data("ionRangeSlider");
            var onchange = function () {
                slider.update({
                    from: $inputFrom.val(),
                    to: $inputTo.val()
                });
            }
            $slider.on('change', function (e) {
                var $input = $(e.target);
                var from = $input.data("from"),
                    to = $input.data("to");
                if ($slider.data('min') != from)
                    $inputFrom.val(from);
                if ($slider.data('max') != to)
                    $inputTo.val(to);
            });

            $inputFrom.on('input', onchange);
            $inputTo.on('input', onchange);
        });
    })();

    // Replace
    (function () {
        var init = function () {
            $('.js-replace').each(function () {
                var $target = $(this);
                var placeSelector = $target.data('place');
                var parent = $target.data('parent');
                var placeWidth = parseInt($target.data('width'));
                var $place = parent ? $target.closest(parent).find(placeSelector).first() : $(placeSelector);

                if (window.innerWidth <= placeWidth) {
                    $place.show()
                    if (!$target.data('old-place'))
                        $target.data('old-place', $target.wrap('<div>').parent());
                    $target.appendTo($place);
                } else {
                    $place.hide();
                    if ($target.data('old-place'))
                        $target.appendTo($target.data('old-place'));

                }
            });
        }

        init();
        $(window).resize(init);
    })();

    // Orders step
    (function () {
        var show = function ($hidingStep, $showingStep) {
            $hidingStep.removeClass('is-active');
            if ($hidingStep.is($showingStep) || !$showingStep.is(':visible'))
                return;
            if ($showingStep.is($hidingStep.nextAll(':visible').first()))
                $hidingStep.addClass('is-completed');
            $hidingStep.find('.order-step__inn').hide();
            $showingStep.removeClass('is-completed').find('.order-step__inn').show();
                $('html, body').stop().animate({
                    scrollTop: $showingStep.offset().top - 90
                }, 700);
            $showingStep.addClass('is-active');
        }
        $('.js-order-next-step').click(function () {
            var $currentStep = $(this).closest('.order-step');
            var $nextStep = $currentStep.nextAll('.order-step:visible:not([data-escape])').first();
            if (!$nextStep.length) {
                $currentStep.removeClass('is-active').addClass('is-completed').find('.order-step__inn').hide();
                scrollToVCenter($('.js-order-info'));
            } else
                show($currentStep, $nextStep);
            return false;
        });

        $('.js-order-prev-step').click(function () {
            var $currentStep = $(this).closest('.order-step');
            var $prevStep = $currentStep.prevAll(':visible').first().removeClass('is-completed');
            show($currentStep, $prevStep);
            return false;
        });

        $('.js-order-step-edit').click(function () {
            var $step = $(this).closest('.order-step').removeClass('is-completed');
            var $activeStep = $('.order-step.is-active');
            show($activeStep, $step);
            return false;
        });

        if (!isMobile())
            $('.js-order-total').stick_in_parent({
                parent: '[data-sticky_parent]',
                recalc_every: 1,
                offset_top: 80
            });
    })();


    // Order page handlers
    (function () {
        var $submitButtons = $('.js-order-submit');
        var $agreeCheckboxes = $('input[name=order_agree]');
        var $info = $('.js-delivery-info');
        $('input[name=delivery]').change(function () {
            var $checkbox = $(this).closest('label');
            $info.show();
            $info.find('[data-delivery-icon]').html($checkbox.find('[data-delivery-icon]').html());
            $info.find('[data-delivery-name]').html($checkbox.find('[data-delivery-name]').html());
            $info.find('[data-delivery-desc]').html($(this).data('desc'));
            $info.find('[data-delivery-price]').html($checkbox.find('[data-delivery-price]').html());

            if (this.value == 'pickup')
                $('#pickup-step').removeClass('d-none');
            else
                $('#pickup-step').addClass('d-none')
        });

        $agreeCheckboxes.change(function () {
            if ($agreeCheckboxes.length == $agreeCheckboxes.filter(':checked').length)
                $submitButtons.removeClass('d-none');
            else
                $submitButtons.addClass('d-none');
        });
    })();

    (function () {
        if (!isMobile())
            $('.js-aside').stick_in_parent({
                parent: '[data-sticky_parent]',
                recalc_every: 1,
                offset_top: 90
            });
    })();

    // Connect bonus
    (function () {
        $('.js-bonus-join').click(function () {
            $('#bonus1').hide();
            $('#bonus2').removeClass('d-none');
            return false;
        });

        $('.js-bonus-sms').click(function () {
            $(this).attr('disabled', true);
            $('.js-bonus-sms-block').removeClass('d-none');
            $('.js-bonus-control').attr('disabled', true);
        });

        $('.js-bonus-accept-code').click(function () {
            $('#bonus2').hide();
            $('#bonus3').removeClass('d-none');
        });
    })();

    $('.js-spinner').spinner();
    $('.table').responsiveTable();

    // Scrollspy init
    if ($('[data-gumshoe]').length)
        gumshoe.init({
            activeClass: 'is-active',
            selectorHeader: '.js-header'
        });
    new SmoothScroll('.js-scroll-to', {
        header: '.js-header'
    });

    // Grid product caroulse
    (function () {
        var carousel = null;
        $('body').on('mouseenter', '.product', function () {
            var $swiper = $(this).find('.swiper-container');

            if (!$swiper.length || !$swiper.data('gallery'))
                return;

            if (!$swiper.data('first-init')) {
                var list = $swiper.data('gallery').split(',');
                for (var i in list)
                    $swiper.find('.swiper-wrapper').append('<div class="swiper-slide"><img src="' + list[i] + '"></div>');
                $swiper.data('first-init', true);
            }

            carousel = new Swiper($swiper[0], {
                effect: 'fade',
                slidesPerView: 1,
                watchOverflow: true,
                speed: 0,
                autoplay: {
                    delay: window.GRID_PRODUCT_CAROUSEL_DELAY || 1120
                },
            });
        }).on('mouseleave', '.product', function () {
            if (carousel) carousel.destroy()
        });
    })();
});