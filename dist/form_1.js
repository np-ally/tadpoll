(function () {
    var jQuery = window.jQuery;
    loadform();

    function loadform() {
        jQuery(document).ready(function($) {
            let position = document.querySelector('#tadpoll1234');
            var form_tag = document.createElement('div');
            form_tag.setAttribute("class","loginPopup");
            position.append(form_tag);
            $( ".loginPopup" ).append( "<div class='formPopup' id='popupForm1'></div>" );
            $( ".formPopup" ).append( "<div class='formContainer'>" );
            $( ".formContainer" ).append( "<h2 style='font-family:Roboto; font-size:24px; color:000000; font-style:bold; margin: 4% auto;'>A couple of quick questions...</h2>" );
            $( ".formContainer" ).append( "<label class='labeldata1' for='email'></label>" );
            $( ".labeldata1" ).append( "<p style='font-family:Roboto; font-size:15px; color:000000; text-align:left; padding-left:22%;'>Has driving ROI from video content been a challenge for you?</p>" );
            $( ".formContainer" ).append( "<input type='text' id='data1' placeholder='Very, Somewhat, No' name='data1' required>" );
            $( ".formContainer" ).append( "<label class='labeldata2' for='data2'></label>" );
            $( ".labeldata2" ).append( "<p style='font-family:Roboto; font-size:15px; color:000000; text-align:left; padding-left:22%;'> For a solution like ours, how will you measure success?</p>" );
            $( ".formContainer" ).append( "<input type='text' id='data2' placeholder='# of contacts, engaged users, leads etc.' name='data2' required>" );
            $( ".formContainer" ).append( "<button type='submit' class='btn' onclick='closeForm1()'>SUBMIT</button>" );
            $( ".formContainer" ).append( "<p class='footer'>Powered by Tadpoll</p>" );
        });
    }
})();