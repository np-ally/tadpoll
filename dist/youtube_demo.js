    var release_version = "0.2.4";
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
    var playtime_to_iframe = video_params.insert_duration_iframe;
    var done_pause = false;
    var done_pause1 = false;
    var done_pause2 = false;
    var timep = 0;
    var pause_source_func = false;
    //remove forms based on time setting
    if (playtime == 0){ var done_form = true; console.log("no first form");}
    else {done_form = false;}
    if (playtime_to_form1 == 0){ var done_form1 = true; console.log("no second form");}
    else {done_form1 = false;}
    if (playtime_to_iframe == 0){ var done_form2 = true; console.log("no iframe");}
    else {done_form2 = false;}
    
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
                console.log("1 set time out in playing to ", ((playtime_to_form1-timep)*1000)/playbackrate)
                setTimeout(pauseVideo, ((playtime_to_form1-timep)*1000)/playbackrate); 
            }
            if (timep >= playtime_to_iframe && !done_form2 && done_form1 && done_form){
                pauseVideo();
                //console.log("pause in playing2");
            }
            else if (!done_form2 && done_form1 && done_form) { 
                //console.log("2 set time out in playing to ", ((playtime_to_iframe-timep)*1000)/playbackrate)
                setTimeout(pauseVideo, ((playtime_to_iframe-timep)*1000)/playbackrate); 
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
            else if(!done_form2 && done_form1 && done_form) {
                if (timep < playtime_to_iframe && !pause_source_func) {
                    //console.log("set done to false2")
                    done = false;
                }
                else if (timep < playtime_to_iframe && pause_source_func) {
                    pause_source_func = false;
                    player.playVideo();
                    done = false;
                    //console.log("pause source2")
                }
                else if (timep >= playtime_to_iframe && !done_pause2) {
                    openiframe();
                    //console.log("open iframe", timep);
                    done_pause2 = true;
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
        document.getElementById("formbutton").style.display = "block";
    }
    function openForm1() {
        document.getElementById("popupForm1").style.display = "block";
        document.getElementById("formbutton1").style.display = "block";
    }
    function openiframe() {
        document.getElementById("Popupiframe").src = video_params.iframe_src;
        document.getElementById("Popupiframe").style.display = "block";
        document.getElementById("iframebutton").style.display = "block";
    }
    var email, useCase, data1, data2, record_id;
    function closeForm() {
        document.getElementById("popupForm").style.display = "none";
        document.getElementById("formbutton").style.display = "none";
        email = document.getElementById("email").value;
        useCase = document.getElementById("ans").value;
        //console.log(datain);
        saveForm(email, useCase, data1, data2, video_params.id)
        .then(record => {
            record_id = record[0].id; 
            //console.log(record, record[0].id, record_id);
        });
        done_form = true;
        pause_source_func = false;
        if (!done_form1 || !done_form2) {done=false;}
        player.playVideo();
    }
    function closeForm1() {
        document.getElementById("popupForm1").style.display = "none";
        document.getElementById("formbutton1").style.display = "block";
        var data1 = document.getElementById("data1").value;
        var data2 = document.getElementById("data2").value;
        //console.log(datain);
        //console.log(record_id, email, useCase, data1, data2, video_params.id);
        updateForm(record_id, email, useCase, data1, data2, video_params.id);
        done_form1 = true;
        pause_source_func = false;
        if (!done_form2) {done=false;}
        player.playVideo();
    }
    function closeiframe() {
        document.getElementById("Popupiframe").style.display = "none";
        document.getElementById("iframebutton").style.display = "none";
        done_form2 = true;
        pause_source_func = false;
        player.playVideo();
    }
  
    function saveForm(email, useCase, data1, data2, id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "post",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify([{"email":email,"Use Case":useCase, "Form1_Data1":data1, "Form1_Data2":data2, "customer_id":id}])
        };
    
        return fetch("https://v1.nocodeapi.com/davegtad/airtable/rQaerrGsnnHzwllE?tableName=Table 1&api_key=GJwptPIUjuDsMsOsz", requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));
    }
    function updateForm(record_id, email, useCase, data1, data2, id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "put",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify([{"id":record_id,"fields":{"email":email,"Use Case":useCase, "Form1_Data1":data1, "Form1_Data2":data2, "customer_id":id}}])
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
    