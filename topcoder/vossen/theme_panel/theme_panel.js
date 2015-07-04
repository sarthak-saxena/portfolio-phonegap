
/* ==============================================
Theme Panel Style Switcher
=============================================== */

	$( "#theme-panel .panel-btn" ).click(function(){
		$( "#theme-panel" ).toggleClass( "panel-close", "panel-open", 1000 );
		$( "#theme-panel" ).toggleClass( "panel-open", "panel-close", 1000 );
		return false;
	});

	$('.color-switch').click(function(){
		var title = jQuery(this).attr('title');		
		jQuery('#color-skins').attr('href', 'css/colors/' + title + '.css');				
	  	return false;
    });	
