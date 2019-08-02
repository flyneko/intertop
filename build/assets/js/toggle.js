function Toggle(el) {
    this.btn = el;
    this.$btn = $(this.btn);
    this.$root = $('html');
    this.$doc = $(document);
    this._bindEvents();
}

Toggle.prototype._bindEvents = function () {
    this.$btn.on('click', this._clickAction.bind(this));
    this.$doc.on('click', this._hideElements.bind(this));
}

Toggle.prototype._clickAction = function (event) {
    var $active = $(event.currentTarget);
    var targetClass = $active.data('toggle');
    var rootClass = $active.data('class');
    var anim = $active.data('anim');
    var parent = $active.data('parent');
    var autoHide = +$active.data('autohide');
    var hide = $active.data('hide');
    var text = $active.data('text');
    event.preventDefault();
    if ($active.hasClass('is-active')) {
        if (parent) {
            if (autoHide) {
                this.hide(targetClass);
            }
            $active.parents(parent).find(targetClass).removeClass('is-active');
            $active.parents(parent).find('[data-toggle="' + targetClass + '"]').removeClass('is-active');
        }
        else {
            this.hide(targetClass);
        }
        if (text) {
            $active.data('text', $active.text()).text(text);
        }
    }
    else {
        if (parent) {
            if (autoHide) {
                this.hide(targetClass);
            }
            if (hide) {
                this.hide(hide);
            }
            $active.parents(parent).find(targetClass).addClass('is-active').addClass('is-toggled');
            $active.parents(parent).find('[data-toggle="' + targetClass + '"]').addClass('is-active').addClass('is-toggled');
        }
        else {
            if (hide) {
                this.hide(hide);
            }
            this.show(targetClass);
        }
        if (text) {
            $active.data('text', $active.text()).text(text);
        }
    }

    if (rootClass) {
        this.$root.toggleClass(rootClass);
    }
    if (anim == "slide") {
        $(targetClass).slideToggle(200);
    }
    if (anim == "fade") {
        $(targetClass).toggle(200);
    }
};

Toggle.prototype.hide = function (el) {
    $(el).removeClass('is-active').removeClass('is-toggled');
    $('[data-toggle="' + el + '"]').removeClass('is-active').removeClass('is-toggled');
};

Toggle.prototype.show = function (el) {
    $(el).addClass('is-active').addClass('is-toggled');
    $('[data-toggle="' + el + '"]').addClass('is-active').addClass('is-toggled');
};

Toggle.prototype._hideElements = function (event) {
    var $active = $(event.target);
    if (!$active.closest('.is-toggled').length) {
        var $toggle = $('[data-toggle].is-active');
        $toggle.removeClass('is-active').removeClass('is-toggled');
        $($toggle.data('toggle')).removeClass('is-active').removeClass('is-toggled');
    }
};
