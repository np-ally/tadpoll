
    var playercont_tag = document.createElement('div');
    playercont_tag.setAttribute("class","playerPopup");
    document.body.appendChild(playercont_tag);

    var player_tag = document.createElement('div');
    player_tag.setAttribute("id","player");
    player_tag.setAttribute("class","playerwin");   
    playercont_tag.appendChild(player_tag);
        
 // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script')
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
        videoId: '6DBwCBTddAk',
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
    var playtime = 43;
    var done_pause = false;
    var timep = 0;
    var pause_source_func = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            timep = Math.round(player.getCurrentTime());
            //console.log(playtime, timep, (playtime-timep)*1000);
            if (timep >= playtime){ 
                pauseVideo();
                //console.log("pause in playing") 
            }
            else { 
                //console.log("set time out in playing to ", ((playtime-timep)*1000)/playbackrate)
                setTimeout(pauseVideo, ((playtime-timep)*1000)/playbackrate); 
            }
            done = true;
        }
        if (event.data == YT.PlayerState.PAUSED && done) {
            timep = Math.round(player.getCurrentTime());
            //console.log("paused & done", timep);
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
    }
    function pauseVideo() {
        player.pauseVideo();
        pause_source_func = true;
    }
    function openForm() {
        document.getElementById("popupForm").style.display = "block";
    }
    function closeForm() {
        document.getElementById("popupForm").style.display = "none";
        var email = document.getElementById("email").value;
        var useCase = document.getElementById("ans").value;
        //console.log(datain);
        saveForm(email, useCase);
        player.playVideo();
    }
  
    function saveForm(email, useCase) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "post",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify([{"email":email,"Use Case":useCase}])
        };

        fetch("https://v1.nocodeapi.com/davegtad/airtable/rQaerrGsnnHzwllE?tableName=Table 1&api_key=GJwptPIUjuDsMsOsz", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }