(function () {
    var jQuery = window.jQuery;
    loadform();

    function loadform() {
        jQuery(document).ready(function($) {
            let position = document.querySelector('#tadpoll1234');
            var form_tag = document.createElement('div');
            form_tag.setAttribute("class","loginPopup");
            position.append(form_tag);
            $( ".loginPopup" ).append( "<div class='formPopup' id='popupForm'></div>" );
            $( ".formPopup" ).append( "<div class='formContainer'>" );
            $( ".formContainer" ).append( "<h2 style='font-family:Roboto; font-size:24px; color:000000; font-style:bold; margin: 4% auto;'>This will take just a sec</h2>" );
            $( ".formContainer" ).append( "<label class='labelemail' for='email'></label>" );
            $( ".labelemail" ).append( "<p style='font-family:Roboto; font-size:15px; color:000000; text-align:left; padding-left:22%;'>What is your work email?</p>" );
            $( ".formContainer" ).append( "<input type='text' id='email' placeholder='jane@work.com' name='email' required>" );
            $( ".formContainer" ).append( "<label class='labelans' for='ans'></label>" );
            $( ".labelans" ).append( "<p style='font-family:Roboto; font-size:15px; color:000000; text-align:left; padding-left:22%;'> What is your use case?</p>" );
            $( ".formContainer" ).append( "<input type='text' id='ans' placeholder='Digital Transformation' name='ans' required>" );
            $( ".formContainer" ).append( "<button type='submit' class='btn' onclick='closeForm()'>SUBMIT</button>" );
            $( ".formContainer" ).append( "<p class='footer'>Powered by Tadpoll</p>" );
        });
    }
})();