(function($) {
    $.fn.dropdown = function() {
        var $all = $(this);
        this.each(function () {
            var $this = $(this);
            var options = $.extend({}, $this.data('dropdown-options'));
            var mode = options.mode || 'self';
            var $toggle = $this.find('> [data-dropdown=trigger]');
            var $dropdown = $this.find('> [data-dropdown=drop]');
            var trigger = options.trigger || 'click';
            var autoclose = options.autoclose == undefined || options.autoclose === true;
            var closeTimer = null;
            var closeTimeout = 0;
            var close = function () {
                clearTimeout(closeTimer);
                closeTimer = setTimeout(function () {
                    $this.removeClass('dropdown-open');
                    $dropdown.hide();
                }, closeTimeout);
            };
            var appearArrow = function () {
                if (!options.arrow)
                    return;
                var $i = $dropdown.find('> .dropdown-arrow');
                if (!$i.length)
                    $i = $('<i class="dropdown-arrow">').prependTo($dropdown);
                var $positioned = $toggle.find('[data-dropdown=relative]').length ? $toggle.find('[data-dropdown=relative]') : $toggle;
                if ($this.offset().left + $this.outerWidth() > $('.l-wrapper').first().outerWidth()) {
                    $i.css({ left: 'auto', 'right': ($toggle.parent().outerWidth() - ($positioned.outerWidth() + $positioned.position().left)) + ($positioned.outerWidth() / 2) - ($i.width() / 2)})
                    $this.css({ left: 'auto', right: 0 })
                } else {
                    $i.css({ left: $positioned.position().left + $positioned.width() / 2 - ($i.width() / 2), right: 'auto' })
                    $this.css({ left: 0, right: 'auto' })
                }
            }
            var event = 'click';
            switch (trigger) {
                case 'hover':
                    event = 'mouseenter';
                    closeTimeout = 200;
                    break;
            }

            if (!$dropdown.length)
                return;

            $toggle.on(event, function (e) {
                clearTimeout(closeTimer);
                if ($this.hasClass('dropdown-open')) {
                    close();
                    if (autoclose)
                        return
                    else
                        e.preventDefault();
                } else {
                    if (options.close_prev === true) {
                        $this.parent().find('.dropdown-open').removeClass('dropdown-open');
                        $this.parent().find('[data-dropdown=drop]').hide();
                    }
                    $this.addClass('dropdown-open');
                    $dropdown.show();
                    setTimeout(function () {
                        appearArrow();
                        $this.trigger('dropdown.open');
                    }, 100);
                    if (mode == 'body') {
                        $dropdown.appendTo('body').css({ top: $toggle.offset().top + $toggle.outerHeight() });
                        if ($toggle.offset().left + $dropdown.outerWidth() > window.innerWidth)
                            $dropdown.css('left', $toggle.offset().left - ($toggle.offset().left + $dropdown.outerWidth() - window.innerWidth) - 15);
                        else
                            $dropdown.css('left', Math.max(0, $toggle.offset().left - ($dropdown.outerWidth() / 2) + ($toggle.outerWidth() / 2)));
                    }
                }
                e.preventDefault();
            });

            if (trigger == 'hover') {
                $dropdown.on('mouseleave', close);
                $this.on('mouseleave', close);
            } else
                $('html').click(function (e) {
                    if (!$(e.target).parents().is($this) && autoclose)
                        close();
                });

            $this.on('mouseover', function () { clearTimeout(closeTimer); });
            $dropdown.on('mouseover', function () { clearTimeout(closeTimer); });
        });
    }
})(jQuery);