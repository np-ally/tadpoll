(function() {

    // Localize jQuery variable
    var jQuery;
    var winjqundef = false;
    
    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined) { winjqundef=true; }
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.10.1') {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type","text/javascript");
        script_tag.setAttribute("src",
            "https://code.jquery.com/jquery-1.10.1.min.js");
        if (script_tag.readyState) {
          script_tag.onreadystatechange = function () { // For old versions of IE
              if (this.readyState == 'complete' || this.readyState == 'loaded') {
                  scriptLoadHandler();
              }
          };
        } else {
          script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }
    
    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        if (winjqundef) { jQuery = window.jQuery; }
        else { jQuery = window.jQuery.noConflict(true); }
        // Call our main function
        main(); 
    }
    
    /******** Our main function ********/
    function main() { 
        jQuery(document).ready(function($) { 
            /******* Load CSS *******/
            var css_link = $("<link>", { 
                rel: "stylesheet", 
                type: "text/css", 
                href: "main_style.css" 
            });
            css_link.appendTo('head');          
    
            /*****Load video script****/
            var video_script = document.createElement('script');
            video_script.setAttribute("type","text/javascript");
            video_script.setAttribute("src","youtube_demo.js");
            document.body.appendChild(video_script);
            
            /***Load Form */
            var form_script = document.createElement('script');
            form_script.setAttribute("type","text/javascript");
            form_script.setAttribute("src","form.js");
            document.body.appendChild(form_script);

            //var form_tag = document.createElement('div');
            //form_tag.setAttribute("id","form");
            //document.body.appendChild(form_tag);
            //$( "#form" ).load( "form.html" );
            
        });
    }
})();