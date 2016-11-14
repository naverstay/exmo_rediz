var ripple_effect = false, wnd, doc, html, header, dropDownTimer;

$(function ($) {

    wnd = $(window);
    doc = $(document);
    html = $('html');
    header = $('.header');

    checkStickers();

    $('body').delegate('.chartExpandBtn', 'click', function () {
        var btn = $(this);

        // btn.toggleClass('_expanded');

        $('.chartSection').toggleClass('_expanded');
        
        return false;

    }).delegate('.dropDowBtn', 'click', function () {
        var dd = $(this).closest('.dropDownHolder');

        clearTimeout(dropDownTimer);

        hideDropDowns(dd);

        dd.addClass('opened');

        return false;

    }).delegate('.dropDowBtn', 'mouseenter', function () {
        var dd = $(this).closest('.dropDownHolder');

        clearTimeout(dropDownTimer);

        hideDropDowns(dd);

        dd.addClass('opened');

    }).delegate('.dropDownHolder', 'mouseleave', function () {

        dropDownTimer = setTimeout(function () {
            hideDropDowns();
        }, 500);

    }).delegate('.dropDownWrapper', 'mouseenter', function () {

        $(this).closest('.dropDownHolder').addClass('hovered');

    }).delegate('.dropDownWrapper', 'mouseleave', function () {

        $(this).closest('.dropDownHolder').removeClass('hovered').trigger('mouseleave');

        // dropDownTimer = setTimeout(function () {
        //     hideDropDowns();
        // }, 500);

    }).delegate('.selectBtn', 'click', function (e) {
        var select_item = $(this), select_val = select_item.closest('.dropDownHolder').find('.dropDownVal');

        select_item.toggleClass('checked');

        if (select_item.attr('data-check') != void 0) {
            var chk = $(select_item.attr('data-check'));

            if (chk.length) {
                chk.prop('checked', !chk.prop('checked'));
                checkStickers();
            }
        }

        if (select_item.closest('.select_menu._single').length) {
            select_item.closest('.select_menu._single').find('.checked').not(select_item).removeClass('checked');
        }

        if (select_val.length) {
            select_val.html(select_item.html());
        }

        // if (select_item.attr('href') != void 0)
        // 

        return false;

    }).delegate('.tabBtn', 'click', function (e) {
        var el = $(this), panel = el.closest('.tabSwitcher'), tab = $(el.attr('href')), line = panel.find('.tabLine');

        panel.find('.active').removeClass('active');

        el.addClass('active');

        line.css({'width': el.outerWidth(), 'left': el.offset().left - panel.offset().left});

        tab.show().siblings().hide();

        if (ripple_effect && el.hasClass('doRipple')) ripple(el, e);

        return false;

    }).delegate('.soundBtn', 'click', function () {

        $(this).toggleClass('_no-sound');

        return false;

    }).delegate('.goTopBtn', 'click', function () {

        docScrollTo(0, 800);

        return false;
    });

    $('.tabSwitcher').each(function () {
        $(this).find('.tabBtn').first().click();
    });

    $('.customScroll').mCustomScrollbar({
        mouseWheel: {
            preventDefault: true
        },
        // autoHideScrollbar: true,
        callbacks: {
            // onUpdate: function () {
            //     console.log("Scrollbars updated");
            // },
            onScrollStart: function () {
                $(this.mcs.content).closest('.customScroll').addClass('_is-scrolling');
            },
            onScroll: function () {
                $(this.mcs.content).closest('.customScroll').removeClass('_is-scrolling');
            },
            // onTotalScroll: function () {
            //     console.log(this, "#onTotalScroll")
            // },
            // onTotalScrollBack: function () {
            //     console.log(this, "#onTotalScrollBack")
            // },
            // whileScrolling: function () {
            //
            //
            //
            // }
        }
    });

    $(document).click(function (e) {
        if ($(e.target).parents().filter('.dropDownWrapper').length != 1) {
            hideDropDowns();
        }
    });

    ripple_effect = true;

});

function ripple(el, e) {
    var ripple = $(el);
    // визуальный элемент эффекта
    if (ripple.find(".effect").length == 0) {
        ripple.append("<span class='effect'></span>");
    }
    var effect = ripple.find(".effect");
    effect.removeClass("replay");

    if (!effect.height() && !effect.width()) {
        var d = Math.max(ripple.outerWidth(), ripple.outerHeight());
        effect.css({height: d * 2, width: d * 2});// Определяем размеры элемента эффекта 
    }

    var x = e.pageX - ripple.offset().left - effect.width() / 2;
    var y = e.pageY - ripple.offset().top - effect.height() / 2;

    effect.css({
        top: y + 'px',
        left: x + 'px'
    }).addClass("replay");
}

$(window).on('load', function () {

    checkStickers();

}).on('scroll', function () {

    checkStickers();

}).on('resize', function () {

    checkStickers();

});

function checkStickers() {

    var scrollTop = doc.scrollTop();
    var scrollLeft = doc.scrollLeft();
    var headerHeight = header.outerHeight();

    html.toggleClass('header-small', scrollTop >= 50);

    $('.stickSpacer').each(function (ind) {
        var spacer = $(this), el = spacer.find('.stickMe');

        spacer.css('height', el.outerHeight());

        // console.log(spacer.offset().top <= (scrollTop + headerHeight));

        if (scrollTop > 75) {
            el.addClass('sticked').css('width', spacer.outerWidth());
        } else {
            el.removeClass('sticked').css({
                'marginLeft': 0,
                'marginRight': 0,
                'width': null
            });
        }
    });

    $('.sticked').css({
        'marginLeft': (scrollLeft > 0 ? -scrollLeft : 0),
        'marginRight': (scrollLeft > 0 ? scrollLeft : 0)
    });

}

function hideDropDowns(exclude) {

    $('.dropDownHolder').not(exclude).not('.hovered').removeClass('opened');

}

function docScrollTo(pos, speed, callback) {

    $('html,body').animate({'scrollTop': pos}, speed, function () {
        if (typeof(callback) == 'function') {
            callback();
        }
    });
}