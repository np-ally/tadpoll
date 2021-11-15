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

    function loadScript(src, type) {
        return new Promise(function(resolve, reject) {
            let script = document.createElement('script');
            script.type = type;
            script.src = src;
        
            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
        
            document.head.append(script);
          });
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
            
            var id = getParams("main.js");
            
            getUserParams(id)
            .then(custParams => {
            console.log(window.location.hostname);
                if (custParams === undefined) {
                    $( "body" ).append( "<h1>Error: Unidentified User</h1>" );
                }
                else if (custParams.fields.domain != window.location.hostname) {
                    $( "body" ).append( "<h1>Error: Incorrect Domain</h1>" );
                }
                else {

                    var video_query = '?video=' + custParams.fields.video 
                    + '&insert_duration=' + custParams.fields.insert_duration + '&id=' +
                    custParams.fields.customer_id;
                    //console.log(video_query);

                    /*****Load video and form scripts****/
                    loadScript("youtube_demo.js" + video_query, "text/javascript")
                    .then(script => {
                        if (custParams.fields.form === "default"){
                            loadScript("form.js", "text/javascript");
                        }
                        //can add other form options here depending on the customer config
                        //else if (custParams.fields.form === TBD){}
                    }); 
                }
            });
        });
    }
    // Extract "GET" parameters from a JS include querystring

function getParams(script_name) {
    // Find all script tags
    var scripts = document.getElementsByTagName("script");
    // Look through them trying to find ourselves
    for(var i=0; i<scripts.length; i++) {
        if(scripts[i].src.indexOf("/" + script_name) > -1) {
        // Get an array of key=value strings of params
            var pa = scripts[i].src.split("?").pop().split("&");
            // Split each key=value into array, the construct js object
            var p = {};
            for(var j=0; j<pa.length; j++) {
                var kv = pa[j].split("=");
                p[kv[0]] = kv[1];
            }
            return p;
        }
    }
    // No scripts match
    return {};
}

function getUserParams(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",
        
    };
    
    var cid = Object.values(id);
    return fetch("https://v1.nocodeapi.com/davegtad/airtable/rQaerrGsnnHzwllE?tableName=Table 2&api_key=GJwptPIUjuDsMsOsz&filterByFormula=customer_id=" + cid, requestOptions)
    .then(response => response.json())
    .then(result => result.records[0])
    .catch(error => console.log('error', error));
}

})();