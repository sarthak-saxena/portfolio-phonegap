(function($) {

    $(document).ready(function($) {
        $('#switcher').popover({ html: true, content: getSwitcherContent });
        setupSwitcher();
    });


    function setupSwitcher() {
        $( 'body' ).delegate( '.switch-option','change',function() {
            $( $(this).data( 'option') ).toggle( this.checked );
        });

        $( 'body' ).delegate( '.theme-option','click',function( event ) {
            event.stopPropagation();
            switch( $(this).data( 'option' ) ) {
                case 'sepia':
                    $('body').addClass( 'theme-sepia' ).find( '.brand' ).find( 'img' ).attr( "src", themeURL + "/images/sepia-logo.png" );
                break;
                case 'color':
                    $('body').removeClass( 'theme-sepia' ).find( '.brand' ).find( 'img' ).attr( "src", themeURL + "/images/logo.png" );
                break;
                case 'bazar':
                    reloadPage( 'fonts-set1' );
                break;
                case 'sonsie':
                    reloadPage( 'fonts-set2' );
                break;
                case 'seasideresort':
                    reloadPage( 'fonts-set3' );
                break;
                case 'hillhouse':
                    reloadPage( 'fonts-set4' );
                break;
            }
            return false;
        });
    }

    function reloadPage( fontset ) {
        var params = '?fontset=' + fontset;
        window.location.href = window.location.origin + window.location.pathname + params;
    }

    // Function to slabtext the hero panel
    function slabTextSwitcher() {
        $('html:not(.ie8)').find('.slab').slabText({
            // Don't slabtext the headers if the viewport is under 380px
            "viewportBreakpoint":380
        });
    };


    function getSwitcherContent() {
        var switcher = $( '.switcher-container' );
        switcher.find( ':checkbox' ).each( function() {
            var checkbox = $( this );
            var elementVisible = $( checkbox.data( 'option' ) ).is(":visible");
            if( !elementVisible ) {
                checkbox.removeAttr('checked');
            }
            else {
                checkbox.attr('checked','checked');
            }
        });
        return switcher.html();
    }

})(jQuery);