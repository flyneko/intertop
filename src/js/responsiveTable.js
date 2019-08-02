(function($) {
    $.fn.responsiveTable = function(opt) {
        this.each(function () {
            var $parent = $(this),
                el = this,
                $table = $parent.find('table'),
                $th = $parent.find('th'),
                $td = $parent.find('td');

            $th.each(function () {
                var $this = $(this);
                $parent.find('td:nth-child(' + ($this.index() + 1) + ')').attr('data-title', $this.text());
            });

            var checkMobile = function () {
                if (el.offsetWidth < el.scrollWidth && !$parent.hasClass('is-mobile'))
                    $parent.data('breakpoint', el.scrollWidth).addClass('is-mobile');
                else if ($parent.hasClass('is-mobile') && $parent.data('breakpoint') < el.scrollWidth )
                    $parent.removeClass('is-mobile');
            }
            checkMobile();
            $(window).resize(checkMobile);
        });
    }
})(jQuery);