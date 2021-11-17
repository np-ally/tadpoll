function saveForm(email, useCase, data1, data2, id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "post",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify([{"email":email,"Use Case":useCase, "Form1_Data1":data1, "Form1_Data2":data2, "customer_id":id}])
    };

    fetch("https://v1.nocodeapi.com/davegtad/airtable/rQaerrGsnnHzwllE?tableName=Table 1&api_key=GJwptPIUjuDsMsOsz", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

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

    //var run_mode = "local"
    var release_version = "0.1.2";
    var search_path_release = "np-ally/tadpoll@" + release_version + "/dist/";
    if (window.location.protocol === "file:") {var search_path = '';}
    else { search_path = search_path_release; }

    var video_params = getParams(search_path + "youtube_demo.js");
    //Add container elements to format video
    let position = document.querySelector('#tadpoll1234');
    var playercont_tag = document.createElement('div');
    playercont_tag.setAttribute("class","playerPopup");
    position.appendChild(playercont_tag);

    var player_tag = document.createElement('div');
    player_tag.setAttribute("id","player");
    player_tag.setAttribute("class","playerwin");   
    playercont_tag.appendChild(player_tag);
        
 // This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script')
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  // This function creates an <iframe> (and YouTube player)
  // after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
        videoId: video_params.video,
        playerVars: {
            'playsinline' : 1, 
            'controls' : 1,
            'rel' : 0,
            'modestbranding' : 1,
            'disablekb' : 1,
            'fs' : 0,
            'autoplay' : 0
         },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onPlaybackRateChange': onPlayerRateChange
        }
        });
    }

  // The API will call this function when the video player is ready.
    function onPlayerReady(event) {
    event.target.playVideo();
    }

  //The API will call this function when the video player rate changes.
    var playbackrate = 1;
    function onPlayerRateChange(event) {
        playbackrate = event.data;
        //console.log("playbackrate", playbackrate)
    }
  // The API calls this function when the player's state changes.
    var done = false;
    var playtime = video_params.insert_duration;
    var playtime_to_form1 = video_params.insert_duration_1;
    var done_pause = false;
    var done_pause1 = false;
    var timep = 0;
    var pause_source_func = false;
    var done_form = false;
    if (playtime_to_form1 == 0){ var done_form1 = true; console.log("no second form");}
    else {done_form1 = false;}
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            timep = Math.round(player.getCurrentTime());
            //console.log(playtime, timep, (playtime-timep)*1000);
            //console.log(playtime_to_form1, timep, (playtime_to_form1-timep)*1000);
            
            if (timep >= playtime && !done_form){ 
                pauseVideo();
                //console.log("pause in playing"); 
            }
            else if (!done_form) { 
                //console.log("set time out in playing to ", ((playtime-timep)*1000)/playbackrate)
                setTimeout(pauseVideo, ((playtime-timep)*1000)/playbackrate); 
            }
            if (timep >= playtime_to_form1 && !done_form1 && done_form){
                pauseVideo();
                //console.log("pause in playing1");
            }
            else if (!done_form1 && done_form) { 
                //console.log("1 set time out in playing to ", ((playtime_to_form1-timep)*1000)/playbackrate)
                setTimeout(pauseVideo, ((playtime_to_form1-timep)*1000)/playbackrate); 
            }
            done = true;
        }
        if (event.data == YT.PlayerState.PAUSED && done) {
            timep = Math.round(player.getCurrentTime());
            //console.log("paused & done", timep, "done_form", done_form, "done_form1", done_form1);
            if (!done_form){
                if (timep < playtime && !pause_source_func) {
                    //console.log("set done to false")
                    done = false;
                }
                else if (timep < playtime && pause_source_func) {
                    pause_source_func = false;
                    player.playVideo();
                    done = false;
                    //console.log("pause source")
                }
                else if (timep >= playtime && !done_pause) {
                    openForm();
                    //console.log("open form", timep);
                    done_pause = true;
                    done = false;
                }
            }
            else if(!done_form1 && done_form) {
                if (timep < playtime_to_form1 && !pause_source_func) {
                    //console.log("set done to false1")
                    done = false;
                }
                else if (timep < playtime_to_form1 && pause_source_func) {
                    pause_source_func = false;
                    player.playVideo();
                    done = false;
                    //console.log("pause source1")
                }
                else if (timep >= playtime_to_form1 && !done_pause1) {
                    openForm1();
                    //console.log("open form1", timep);
                    done_pause1 = true;
                    done = false;
                }
            }
        }
    }
    function pauseVideo() {
        player.pauseVideo();
        pause_source_func = true;
    }
    function openForm() {
        document.getElementById("popupForm").style.display = "block";
    }
    function openForm1() {
        document.getElementById("popupForm1").style.display = "block";
    }
    var email;
    var useCase; 
    var data1;
    var data2;
    function closeForm() {
        document.getElementById("popupForm").style.display = "none";
        email = document.getElementById("email").value;
        useCase = document.getElementById("ans").value;
        //console.log(datain);
        if (done_form1) {saveForm(email, useCase, data1, data2, video_params.id);}
        done_form = true;
        pause_source_func = false;
        if (!done_form1) {done=false;}
        player.playVideo();
    }
    function closeForm1() {
        document.getElementById("popupForm1").style.display = "none";
        data1 = document.getElementById("data1").value;
        data2 = document.getElementById("data2").value;
        //console.log(datain);
        //console.log(email, useCase, data1, data2, video_params.id);
        saveForm(email, useCase, data1, data2, video_params.id);
        done_form1 = true;
        pause_source_func = false;
        player.playVideo();
    }
  
    