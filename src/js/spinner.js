(function($) {
    $.fn.spinner = function(opt) {
        this.each(function () {
            var $input = $(this),
                $wrap = $input.wrap('<div class="spinner">').parent(),
                $minusBtn = $('<button type="button" class="spinner__btn spinner__btn--minus">').prependTo($wrap),
                $plusBtn = $('<button type="button" class="spinner__btn spinner__btn--plus">').appendTo($wrap),
                step = parseFloat($input.data('step') || 1),
                minimal = parseFloat($input.data('min') || 0);

           function checkState() {
               if (parseFloat($input.val()) <= minimal)
                   $minusBtn.attr('disabled', true).prop('disabled', true);
               else
                   $minusBtn.attr('disabled', false).prop('disabled', false);
               $input.focus();
           }

           $plusBtn.on('click', function () {
               $input.val(parseFloat($input.val()) + step);
               checkState();
           });

            $minusBtn.on('click', function () {
                $input.val(parseFloat($input.val()) - step);
                checkState();
            });

            $input.attr('readonly', true).prop('readonly', true);
        });
    }
})(jQuery);