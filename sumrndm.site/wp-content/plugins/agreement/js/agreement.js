// jQuery for disable link and redirect to new window if click on agree.
jQuery(document).ready(function() {
    // collecting all agreements links into an array 
    var agree_elements = jQuery('a[id="agreement"]').clone().toArray();
    var href;

    jQuery('a[id="agreement"]').map(function(i,v){
        return jQuery(this).prop("href", "#").click(function(e){
                href = agree_elements[i];
                e.preventDefault();
                //calculation for get windows hight and width for popup.
                jQuery('.licence-agreement').show().css("position","absolute");
                jQuery('.licence-agreement').css("top", Math.max(0, ((jQuery(window).height() - jQuery('.licence-agreement').outerHeight()) / 2) + jQuery(window).scrollTop()) + "px");
                jQuery('.licence-agreement').css("left", Math.max(0, ((jQuery(window).width() - jQuery('.licence-agreement').outerWidth()) / 2) +  jQuery(window).scrollLeft()) + "px");
            })
    });

    //Agree button redirect to new window with url.
    jQuery('#agree').click(function(){
        jQuery('.licence-agreementbase').fadeOut('slow');
        jQuery('.licence-agreement').hide();
        //Original Code:
        //window.open(href,'_blank');
        var url = String(href);
        if(url.substring(url.length-4, url.length) === "dl=1") {
          window.open(url, '_self');
        } else {
          window.open(url,'_blank');
        }
    });    
    //disagree button clear everything.
    jQuery('#dis-agree').click(function(){
        jQuery('.licence-agreementbase').fadeOut('slow');
        jQuery('.licence-agreement').hide();
    });
    //EDIT: What?
    jQuery('#what').click(function(){
        jQuery('.licence-agreementbase').fadeOut('slow');
        jQuery('.licence-agreement').hide();
        window.open('http://google.com/#q=what','_blank');
    });
});