(function () {
    var jQuery = window.jQuery;
    loadform();

    function loadform() {
        jQuery(document).ready(function($) {
            let position = document.querySelector('#tadpoll1234');
            var form_tag = document.createElement('div');
            form_tag.setAttribute("class","loginPopup1");
            position.append(form_tag);
            $( ".loginPopup1" ).append( "<div class='formPopup1' id='popupForm1'></div>" );
            $( ".formPopup1" ).append( "<div class='formContainer1'>" );
            $( ".formPopup1" ).append( "<button type='submit' id='formbutton1' class='btn1' onclick='closeForm1()'>Skip</button>" );
            $( ".formContainer1" ).append( "<h2 style='font-family:Roboto; font-size:24px; color:000000; font-style:bold; margin: 4% auto;'>A couple of quick questions...</h2>" );
            $( ".formContainer1" ).append( "<label class='labeldata1' for='data1'></label>" );
            $( ".labeldata1" ).append( "<p style='font-family:Roboto; font-size:15px; color:000000; text-align:center; padding-left:0%;'>Has ROI from video been a challenge?</p>" );
            $( ".formContainer1" ).append( "<input type='text' id='data1' placeholder='Very, Somewhat, No' name='data1' required>" );
            $( ".formContainer1" ).append( "<label class='labeldata2' for='data2'></label>" );
            $( ".labeldata2" ).append( "<p style='font-family:Roboto; font-size:15px; color:000000; text-align:center; padding-left:0%;'> How do you measure success?</p>" );
            $( ".formContainer1" ).append( "<input type='text' id='data2' placeholder='# of contacts...' name='data2' required>" );
            $( ".formContainer1" ).append( "<button type='submit' class='btn' onclick='closeForm1()'>SUBMIT</button>" );
            $( ".formContainer1" ).append( "<p class='footer'>Powered by <a href='https://tadpoll.io'>Tadpoll</a></p>" );
        });
    }
})();