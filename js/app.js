(function( $ ) {
    $.fn.bSliderIndex = function() {
        var $this = this;

        $this.each(function(){

            var $container = $(this),
                currSlide = 0,
                $btnNext = $container.find('[data-btn-next]'),
                $btnPrev = $container.find('[data-btn-prev]'),
                $itemsHolder = $container.find('[data-items-holder]'),
                $items = $itemsHolder.find('[data-item]'),
                $itemsBg = $container.find('[data-bg]'),
                $navHolder = $container.find('[data-nav]'),
                $navItems = $navHolder.find('li'),
                $navLinks = $navHolder.find('[data-item]'),
                click = true,
                animateSpeed = 600;


            $items.eq(currSlide).show().siblings('[data-item]').hide();

            $navItems.eq(currSlide).addClass('active');


            $itemsBg.each(function(){
                var $this = $(this),
                    imgUrl = $this.data('bg');
                $this.css({'backgroundImage':'url(' + imgUrl + ')'});
            });

            function showSlide(index)
            {
                if(click)
                {
                    click = false;
                    $items.eq(currSlide).fadeOut(animateSpeed);
                    $navItems.eq(currSlide).removeClass('active');
                    currSlide = index;
                    $items.eq(currSlide).fadeIn(animateSpeed, function(){
                        click = true;
                    });
                    $navItems.eq(currSlide).addClass('active');

                }
            }

            $btnNext.click(function(){
                if(click)
                {
                    if(currSlide == 4)
                    {
                        showSlide(0);
                    } else {
                        showSlide(currSlide + 1)
                    }
                }
            });

            $btnPrev.click(function(){
                if(click)
                {
                    if(currSlide == 0)
                    {
                        showSlide(4);
                    } else {
                        showSlide(currSlide - 1)
                    }
                }
            });

            $navLinks.click(function(){

                if(!$(this).parents('li').hasClass('active'))
                {
                    var nextSlide = $(this).data('item');
                    showSlide(nextSlide);
                }

            });

            // Old Slides animation
            /*

            $items.eq(currSlide).show().siblings('[data-item]').css({'left': '100%'}).show();
            $navItems.eq(currSlide).addClass('active');


            $itemsBg.each(function(){
               var $this = $(this),
                   imgUrl = $this.data('bg');
                $this.css({'backgroundImage':'url(' + imgUrl + ')'});
            });

            $btnNext.click(function(){
                if(click)
                {
                    click = false;
                    $items.eq(currSlide).animate({'left': '-100%'},animateSpeed);
                    $navItems.eq(currSlide).removeClass('active');
                    if(currSlide == 4)
                    {
                        currSlide = 0;
                    } else {
                        currSlide++;
                    }
                    $items.eq(currSlide).css({'left': '100%'}).animate({'left': 0},animateSpeed, function(){
                        click = true;
                    });
                    $navItems.eq(currSlide).addClass('active');
                }
            });

            $btnPrev.click(function(){
                if(click)
                {
                    click = false;
                    $items.eq(currSlide).animate({'left': '100%'},animateSpeed);
                    $navItems.eq(currSlide).removeClass('active');
                    if(currSlide == 0)
                    {
                        currSlide = 4;
                    } else {
                        currSlide--;
                    }
                    $items.eq(currSlide).css({'left': '-100%'}).animate({'left': 0},animateSpeed, function(){
                        click = true;
                    });
                    $navItems.eq(currSlide).addClass('active');
                }
            });

            $navLinks.click(function(){

                if(!$(this).parents('li').hasClass('active'))
                {
                    click = false;

                    var nextSlide = $(this).data('item');
                    if(nextSlide >= currSlide)
                    {
                        $items.eq(currSlide).animate({'left': '-100%'},animateSpeed);
                        $navItems.eq(currSlide).removeClass('active');
                        currSlide = nextSlide;
                        $items.eq(currSlide).css({'left': '100%'}).animate({'left': 0},animateSpeed, function(){
                            click = true;
                        });
                        $navItems.eq(currSlide).addClass('active');
                    } else
                    {
                        $items.eq(currSlide).animate({'left': '100%'},animateSpeed);
                        $navItems.eq(currSlide).removeClass('active');
                        currSlide = nextSlide;
                        $items.eq(currSlide).css({'left': '-100%'}).animate({'left': 0},animateSpeed, function(){
                            click = true;
                        });
                        $navItems.eq(currSlide).addClass('active');
                    }

                }

            });

            */

        });

        return $this;
    };
})(jQuery);

(function( $ ){
    $.fn.maskPhone = function() {
        var $this = this;

        $this.each(function(){

            var $item = $(this);

            $item.mask('+7 - (999) - 999 - 99 - 99');

        });

        return $this;
    };
})(jQuery);

(function( $ ){
    $.fn.headerClocks = function() {
        var $this = this;

        $this.each(function(){

            var $item = $(this),
                monthNames = [ "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
                newDate = new Date();

            newDate.setDate(newDate.getDate());

            $item.html('<span class="day"></span> ' + monthNames[newDate.getMonth()] + ' <span class="hours"></span><span class="dots">:</span><span class="min"></span>' );

            var $hours = $item.find('.hours'),
                $minutes = $item.find('.min'),
                $day = $item.find('.day');

            setInterval( function() {
                var day = new Date().getDate();
                $day.html(day);
            },1000);

            setInterval( function() {
                var minutes = new Date().getMinutes();
                $minutes.html(( minutes < 10 ? "0" : "" ) + minutes);
            },1000);

            setInterval( function() {
                var hours = new Date().getHours();
                $hours.html(( hours < 10 ? "0" : "" ) + hours);
            }, 1000);

        });

        return $this;
    };
})(jQuery);

(function($){

    $.fn.rangeSlider = function(){

        this.each(function(){

            var $this = $(this),
                options = {
                  min: $this.data('opt-min'),
                  max: $this.data('opt-max'),
                  step: $this.data('opt-step')
                },
                $min,
                $max,
                $minStatic = $("<span class='val-min'></span>"),
                $maxStatic = $("<span class='val-max'></span>");
            $this.addClass('slider-theme-default');

            $this.slider({
                range: true,
                min: options.min,
                max: options.max,
                step: options.step,
                values: [options.min, options.max],
                create: function(){
                    $min = $("<span></span>").appendTo($(this).find('.ui-slider-handle').eq(0));
                    $max = $("<span></span>").appendTo($(this).find('.ui-slider-handle').eq(1));
                    $min.text(options.min);
                    $max.text(options.max);
                    //$minStatic.text(options.min).prependTo($(this));
                    //$maxStatic.text(options.max).prependTo($(this));
                },
                slide: function( event, ui ) {
                    $min.text(ui.values[ 0 ]);
                    $max.text(ui.values[ 1 ]);
                }
            });

        });

        return this;

    }

})(jQuery);


(function( $ ){
    $.fn.maskCustom = function() {
        var $this = this;

        $this.each(function(){

            var $item = $(this),
                mask = $item.data('mask');

            $item.mask(mask);

        });

        return $this;
    };
})(jQuery);

(function( $ ){
    $.fn.selectRate = function() {
        var $this = this;

        $this.each(function(){

            var $item = $(this),
                state = 'stars-' + $item.data('select-rate'),
                action = $item.data('state');

            $item.addClass(state);

            for(var i=1; i <= 5;i++ )
            {
                var $star = $('<span></span>'),
                    thisState = 'stars-' + i;
                $item.append($star);
                $star.attr('data-state', thisState);
            }

            if(action == 'fixed'){
                $item.addClass('state-fixed');
            } else {
                $item.find('span').each(function(){
                    var thisState = $(this).data('state');
                    $(this).on('mouseenter', function(){
                        $item.removeClass(state).addClass(thisState);
                    }).on('mouseleave', function(){
                        $item.removeClass(thisState).addClass(state);
                    });
                    $(this).on('click', function(){
                        $item.removeClass(state);
                        state = thisState;
                        $item.addClass(state);
                    })
                });
            }

        });

        return $this;
    };
})(jQuery);

(function( $ ){
    $.fn.setMapHeight = function() {
        var $this = this;

        $this.each(function(){

            var $map = $(this);

            function setHeight()
            {
                headerH = $('header').height(),
                    searchH = $('.b-search').height(),
                    windowH = $(window).height(),
                    newMapH = windowH - headerH - searchH + 44;

                if(newMapH < 360)
                {
                    newMapH = 360;
                }

                $map.height(newMapH);
            }

            setHeight();

            $(window).on('resize', setHeight);

            var $content1 = document.getElementById('test1').innerHTML;
            var $content2 = document.getElementById('test2').innerHTML;

            ymaps.ready(function () {
                var myMap = new ymaps.Map('map', {
                    center: [55.751574, 37.573856],
                    zoom: 8,
                    controls: []
                });

                function setCenter ($cords) {
                    myMap.setCenter($cords);
                }

                function createPlacemark($cords, $content)
                {
                    var  myPlacemark = new ymaps.Placemark($cords, {
                        balloonContent: $content
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: 'img/single/map-icon-normal.png',
                        iconImageSize: [24, 40],
                        iconImageOffset: [-12, -40],
                        hideIconOnBalloonOpen: false,
                        balloonOffset: [0, -50],
                        balloonCloseButton: false
                    });

                    myPlacemark.events
                        .add('balloonopen', function (e) {
                            e.get('target').options.set('iconImageHref', 'img/single/map-icon-active.png');
                            // setCenter($cords);
                        })
                        .add('balloonclose', function (e) {
                            e.get('target').options.set('iconImageHref', 'img/single/map-icon-normal.png');
                        });


                    myMap.geoObjects.add(myPlacemark);



                    return myPlacemark;
                }

                createPlacemark([55.764,36.644], $content1);

                createPlacemark([55.364,38.644], $content2);

                myMap.controls.add('zoomControl', {
                    size: "small",
                    position: {right: 30, top: 120}
                });

                myMap.behaviors.disable(['rightMouseButtonMagnifier', 'scrollZoom']);
            });

        });

        return $this;
    };
})(jQuery);

(function( $ ){
    $.fn.articleGallery = function() {
        var $this = this;

        $this.each(function(){

            var $gallery = $(this);

            $gallery.imagesLoaded( function() {
                $gallery.masonry({
                    itemSelector: '.item',
                    "gutter": 25,
                    columnWidth: 175
                });
            });

            $gallery.find('.item').fancybox({
                helpers: {
                    overlay: {
                        locked: false
                    }
                }
            });


        });

        return $this;
    };
})(jQuery);

(function( $ ){
    $.fn.articleResto = function() {
        var $this = this;

        $this.each(function(){

            var $item = $(this),
                posY = 0,
                breakPointS = $item.offset().top - 25,
                itemH = $item.height(),
                $article = $('[data-article-main]'),
                articleH = $article.height(),
                breakPointE = $article.offset().top + articleH - itemH;

            $(window).on('scroll', function(){
                posY = $(window).scrollTop();
                if(posY > breakPointS && posY < breakPointE){
                    $item.addClass('sticky');
                } else {
                    $item.removeClass('sticky');
                }
            });


        });

        return $this;
    };
})(jQuery);

(function( $ ){
    $.fn.sectionMenu = function() {
        var $this = this;

        $this.each(function(){

            var $item = $(this),
                itemH,
                itemY,
                $content = $item.siblings('[data-section]');

            function getSizes(){
                itemH = $item.height();
                itemY = $item.offset().top;
            }

            getSizes();

            $(window).on('scroll', function(){
                posY = $(window).scrollTop();
                if(posY > itemY){
                    $item.addClass('fixed');
                    $content.css({'marginTop': itemH});
                } else {
                    $item.removeClass('fixed');
                    $content.css({'marginTop': 0});
                }
            }).on('resize', function(){
                getSizes();
                $(window).trigger('scroll');
            });

        });

        return $this;
    };
})(jQuery);

(function( $ ){
    $.fn.orderPanel = function() {
        var $this = this;

        $this.each(function(){

            var $item = $(this),
                itemH,
                itemY,
                $content = $item.siblings('[data-section]');

            function getSizes(){
                itemH = $item.height();
                itemY = $item.offset().top;
            }

            getSizes();

            $(window).on('scroll', function(){
                posY = $(window).scrollTop();
                if(posY > itemY){
                    $item.addClass('fixed');
                    $content.css({'marginTop': itemH});
                } else {
                    $item.removeClass('fixed');
                    $content.css({'marginTop': 0});
                }
            }).on('resize', function(){
                getSizes();
                $(window).trigger('scroll');
            });

        });

        return $this;
    };
})(jQuery);

$(window).load(function(){
    $('[data-b-article-rest]').articleResto();
    $('[data-b-order-menu]').masonry({
        itemSelector: '.item',
        "gutter": 20
    });
});


$('document').ready(function(){

    $('[data-clocks]').headerClocks();

    $('[data-select]').each(function(){

        var $this = $(this),
            theme = $this.data('theme');

        if(theme)
        {
            $this.selectmenu().selectmenu( "menuWidget").addClass(theme);
            $this.selectmenu("widget").addClass(theme);
        }

        $(window).on('resize', function(){
            $this.selectmenu( "refresh" );
        });

    });

    $('[data-section-menu]').sectionMenu();

    $('[data-order-panel]').orderPanel();

    $('[data-upload]').each(function(){
        var $this = $(this),
            $file = $this.find('[data-file]'),
            $input = $this.find('[data-input]');

        $input.change(function() {
            var filename = $input.val();
            $file.html(filename);
        });
    });

    $('[data-b-slider-index]').bSliderIndex();

    $('[data-mask-phone]').maskPhone();

    $('[data-scroll-y]').mCustomScrollbar({
        axis:"y"
    });

    $('[data-range-slider]').rangeSlider();

    $('[data-masonry]').masonry({
        itemSelector: '.item',
        "gutter": 25
    });

    $('[data-articles-layout]').imagesLoaded( function() {
        $('[data-articles-layout]').masonry({
            itemSelector: '.item',
            "gutter": 25
        });
    });

    $('[ data-b-article-gallery]').articleGallery();

    $('[data-mask]').maskCustom();

    $('[data-menu-mobile-btn]').on('click', function(){
        $('body').addClass('menu-mobile-on');
    });

    $('[data-menu-mobile-overlay]').on('click', function(){
        $('body').removeClass('menu-mobile-on');
    });

    $('[data-btn-user]').on('click', function(e){
        e.preventDefault();
        $('body').toggleClass('menu-user-mobile-on');
    });

    $('[data-select-rate]').selectRate();

    $('[data-set-map-height]').setMapHeight();

    $('.b-order-menu').on('click', '[data-btn-status]', function(){
        $(this).toggleClass('active');
    });

    $('[data-b-archive]').on('click', '[data-btn-alert]', function(e){
        e.stopPropagation();
        $(this).toggleClass('active');
    }).on('click', '.item__header', function(){
        $(this).parent('.b-archive__item')
            .addClass('active')
            .siblings('.b-archive__item')
            .removeClass('active');
    }).on('click', '[data-btn-print]', function(e){
        e.stopPropagation();
        $(this).parents('.item__header').trigger('click');
        window.print();
    });

    $('[data-b-archive]').find('.item__header').eq(0).trigger('click');



});