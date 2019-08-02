(function($) {
    $.fn.tabs = function(opt) {
        this.each(function () {
            var $core = $(this),
                animationDuration = 300,
                $bar = $core.find('[data-tabs=bar]'),
                $select = $core.find('[data-tabs=select]'),
                $activeTab = { link: $core.find('[data-tabs=link].is-active'), pane: $core.find('[data-tabs=pane].is-active') },
                barChangeProps = $bar.data('tabs-bar-props');

            var positionBar = function () {
                if (!$bar.length) return;
                $bar.css({ left: $activeTab.link.position().left, width: $activeTab.link.outerWidth()});
                if (barChangeProps) {
                    var barChangePropsArray = barChangeProps.split(',');
                    for (var i in barChangePropsArray)
                        $bar.css(barChangePropsArray[i], $activeTab.link.data('tabs-bar-color'));
                }
            }

            if (typeof opt == 'string') {
                switch (opt) {
                    case 'update':
                        positionBar();
                        break;
                }
                return;
            }

            //if ($core.find('> ul:first').length)
            //new IScroll($core.find('> ul:first').wrap('<div>').parent()[0], { scrollX: true, scrollY: false, mouseWheel: true });

            $core.find('[data-tabs=link]').click(function (e) {
                var $this = $(this),
                    $newTab = $core.find($this.attr('href')),
                    direction = !$newTab.nextAll('[data-tabs=pane].is-active').length ? 1 : -1,
                    translateOffset = 30;

                if ($this.hasClass('is-active') || $this.hasClass('is-disabled'))
                    return false;

                e.preventDefault();
                $activeTab.pane.css({ 'transition-duration': animationDuration + 'ms', 'transform': 'translateX(' + (translateOffset * -direction) + 'px)', opacity: 0 });
                $newTab.css({ 'transition-duration': animationDuration + 'ms', 'transform': 'translateX(' + (translateOffset * direction) + 'px)', opacity: 0 });
                setTimeout(function () {
                    $activeTab.pane.removeClass('is-active');
                    $newTab.addClass('is-active');
                    setTimeout(function () {
                        $newTab.addClass('is-active').css({ opacity: 1, transform: 'translateX(0)' });
                    }, 30);
                    setTimeout(function () { $newTab.css('transform', ''); }, animationDuration);
                    $activeTab.pane = $newTab;
                    $this.trigger('tabs:show', [$newTab]);
                }, animationDuration);

                $activeTab.link.removeClass('is-active');
                $activeTab.link = $this.addClass('is-active');
                positionBar();
                return false;
            });

            $core.find('a[href^="#"]:not([data-tabs=link]):not([data-fancybox])').click(function (e) {
                e.preventDefault();
                $core.find('[data-tabs=link][href="' + $(this).attr('href') + '"]').click();
            });

            $select.change(function () {
                console.log(123);
                $core.find('[data-tabs=link][href="#' + this.value + '"]').click();
                return false;
            });

            positionBar();
        })
    }
})(jQuery);