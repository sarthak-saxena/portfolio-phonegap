(function($) {

    $(document).ready(function($) {
        // create countdown timer from wp date
        var countdownDate = new Date( localData.countdownEnds );

        setupCountdownTimer( countdownDate );

        spaceParallax();

        hideIphoneBar();

        $("[placeholder]").togglePlaceholder();

        setupMailchimpForm();

        setupComments();

    });


    $(window).load(function() {
        //flexslider for recent posts widget
        setupPostSlider();

        // flexslider for iphone
        setupiPhoneSlider();

        // flexslider for tweets
        setupTweetSlider();

        slabTextHeadlines();
    });


    // Function to slabtext the hero panel
    function slabTextHeadlines() {
        $('html:not(.ie8)').find('.slab').slabText({
            // Don't slabtext the headers if the viewport is under 380px
            "viewportBreakpoint":380
        });
    };

    // countdown timer function
    function setupCountdownTimer( date ) {
        // modified to work for multiple timers. Left original for reference.
        var countdownUnit = $('.countdown-unit');
        $(countdownUnit).each(function(index,value){
            var countdownBoxes = $(this).find('span');
            $(this).countdown({
                timestamp: date,
                callback: function(days, hours, minutes, seconds, ms){
                    $(countdownBoxes[0]).html( days );
                    $(countdownBoxes[1]).html( hours );
                    $(countdownBoxes[2]).html( minutes );
                    $(countdownBoxes[3]).html( seconds );
                }
            });
        });
    }

    // Function to create subtle parallax space effect
    function spaceParallax() {
        $('body').parallax({
            'elements': [
                {
                  'selector': '.bg-1',
                  'properties': {
                    'x': {
                      'background-position-x': {
                        'initial': 0,
                        'multiplier': 0.02,
                        'invert': true
                      }
                    }
                  }
                },
                {
                  'selector': '.bg-2',
                  'properties': {
                    'x': {
                      'background-position-x': {
                        'initial': 0,
                        'multiplier': 0.06,
                        'invert': true
                      }
                    }
                  }
                },
                {
                  'selector': '.bg-3',
                  'properties': {
                    'x': {
                      'background-position-x': {
                        'initial': 0,
                        'multiplier': 0.2,
                        'invert': true
                      }
                    }
                  }
                }
            ]
        });
    }

    // Function to hide the address bar ion Iphone devices
    function hideIphoneBar() {
        if( !window.location.hash && window.addEventListener ){
            window.addEventListener( "load",function() {
                setTimeout(function(){
                    window.scrollTo(0, 0);
                }, 0);
            });
        }
    }

    $.fn.togglePlaceholder = function() {
        return this.each(function() {
            $(this)
            .data("holder", $(this).attr("placeholder"))
            .focusin(function(){
                $(this).attr('placeholder','');
                // hack for internet explorer 8/9 placeholders
                $('.ie8, .ie9').find('#email-signup').val('');
            })
            .focusout(function(){
                $(this).attr('placeholder',$(this).data('holder'));
            });
        });
    };

    function setupMailchimpForm(){
        $('#sign-me-up').submit( function() {
            var $form = $(this);
            var email = $form.find('.email-signup');
            var button = $form.find('.signup-button');

            if( email.val() != '' ) {
                button.text( button.attr( 'data-text-sending' ) );
                button.attr( 'disabled', true );
                $.post( localData.ajaxurl,
                    {
                        action: 'sign_up',
                        nonce: localData.nonce,
                        email: email.val()
                    },
                    function( data ) {
                        var mainDiv = $('.signup');
                        switch( data.status ) {
                            case 'ok':
                                mainDiv.find( '.response .email' ).text( data.email );
                                mainDiv.find( '.response .status' ).text( data.message );
                                mainDiv.addClass( 'signup-active signup-success' );
                            break;
                            case 'error':
                                mainDiv.find( '.response .email' ).text( data.email );
                                mainDiv.find( '.response .status' ).text( data.message );
                                mainDiv.addClass( 'signup-active signup-error' );
                                setTimeout( function() {
                                    button.text( button.attr( 'data-text-default' ) );
                                    button.removeAttr( 'disabled');
                                    mainDiv.removeClass( 'signup-active signup-error' )
                                }, 3000 );
                            break;
                        }
                    },
                    'json'
                );
            }
            else {
                $(email).focus();
            }
            return false;
        });

        // fix placeholders for ie8, ie9
        $('.ie8, .ie9').find('input').placeholder();
    };

    function setupPostSlider() {
        $( '.post-slider' ).each( function() {
            var slider = $(this);
            slider.flexslider({
                animation: slider.attr( 'data-animation' ),
                slideshowSpeed: slider.attr( 'data-slideshow-speed' ),
                smoothHeight: true,
                controlNav: false,
                pauseOnHover: true,
                nextText: localData.nextText,
                prevText: localData.prevText,
            });
        });
    }

    function setupiPhoneSlider() {
        $(".iphone-slider").each(function(){
            var slider = $(this);
            slider.flexslider( {
                animation: slider.attr('data-anim'),
                slideshowSpeed: slider.attr('data-speed'),
                animationSpeed: slider.attr('data-duration'),
                randomize: slider.attr('data-random') == 'on' ? true : false,
                directionNav: slider.attr('data-directionnav')  == 'on' ? true : false,
                controlNav:false,
            } );
        });
    }

    function setupTweetSlider() {
        $(".tweets-slider").each( function() {
            var slider = $(this);
            slider.flexslider( {
                animation: "slide",
                controlNav: false,
                smoothHeight: true,
                prevText: "Prev"
            });
        });
    }

    function setupComments() {
        $("a[data-target=#comments]").click(function(ev) {
            ev.preventDefault();
            var target = $(this).attr("href");

            // pause the post slider if exists
            if( $(".post-slider li").length > 1 ) {
                $(".post-slider").flexslider('pause');
            }
            // load the url and show modal on success
            $("#comments").load(target, function() {
                $("#comments").modal("show");
            });
        });
        // hide overflow so body won't scroll along with the modal
        $("#comments").modal('hide').on('shown', function() {
            $('.modal-body').scrollTop(0);

            //search for placeholders after modal is shown
            $("[placeholder]").togglePlaceholder();

            $('body').css('overflow', 'hidden');

            // the offset of the target we want to scroll to
            $("a.comment-reply").click(function(ev) {
                ev.preventDefault();
                //get the height of the element with the hidden overflow and scroll past it
                $('.modal-body').animate({ scrollTop:$('.comments').height() +15 }, 1300 );
            });

        }).on('hidden', function() {
            $('body').css('overflow', 'auto');
            // start the post slider again
            if( $(".post-slider li").length > 1 ) {
                $(".post-slider").flexslider('play');
            }
        });
    }

})(jQuery);