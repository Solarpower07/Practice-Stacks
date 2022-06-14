let player = {

    get_shuffled_list: function () {

        let stack_low_spot_amount_warn = false;
        
        const stack_color_amounts = colors.ids.map(v => {
            return stack.data.filter((e,i) => (e.color == v)).length;
        })
        
        const color_shuffles = colors.ids.map((v,i) => {
        
            let spots_color = spots.data.filter((e,i) => (e.color == v && !e.unavailable));
        
            if (spots_color.length == 0) {
                if (stack_color_amounts[i] > 0) {
                    location.href = './spots.html?stack_incomplete=true';
                }
                return;
            }
        
            let color_list = spots_color.shuffle();
        
            while (color_list.length < stack_color_amounts[i]) {
        
                let spots_list_add = spots_color.shuffle();
        
                if (color_list[color_list.length-1] == spots_list_add[0]) spots_list_add.push(spots_list_add.shift());
        
                color_list.push(...spots_list_add);
        
                stack_low_spot_amount_warn = true;
        
            }
        
            return color_list;
        })
        
        let counts = colors.ids.map(()=>{return 0});
        
        let playlist = stack.data.map(v => {return colors.ids.indexOf(v.color)}).map((v,i) => {
            
            counts[v]++;
        
            return color_shuffles[v][counts[v]-1];
        
        })
        
        if (stack_low_spot_amount_warn) console.warn('Not enough spots to fill up stack completely, some are duplicated');

        //Event listeners
        playlist.listeners = {};

        playlist.on = function (event,callback) {
            if (!event || !callback) return;
            if (this.listeners[event]) this.listeners[event].push(callback);
            else this.listeners[event] = [callback];
        }

        playlist.emit = function (event,...args) {
            if (Array.isArray(this.listeners[event])) this.listeners[event].forEach(func => {func(...args)});
        }

        playlist.remove = function (id) {
            if (typeof id === 'number') {
                playlist.splice(id,1);
                playlist.emit('refresh');
            }
        }

        playlist.play_next = function (spot) {

            if (!spot) {

                delete player.now_playing;
            
                playlist.emit('refresh');

                let yt_player_container = document.getElementById('yt-player-container');
    
                let player_spot = document.getElementById('player-spot');

                while (player_spot.firstChild) player_spot.removeChild(player_spot.firstChild);

                if (player.yt_player_iframe) yt_player_container.removeChild(player.yt_player_iframe);

                delete player.yt_player_iframe;
        
                delete player.yt_player;

                player.player_display(false);

                return;
            }

            player.player_display(true);

            player.now_playing = spot;

            let yt_player_container = document.getElementById('yt-player-container');

            let player_spot = document.getElementById('player-spot');

            if (player.yt_player_iframe) yt_player_container.removeChild(player.yt_player_iframe);

            delete player.yt_player_iframe;
    
            delete player.yt_player;

            while (player_spot.firstChild) player_spot.removeChild(player_spot.firstChild);
    
            player_spot.insertAdjacentHTML("beforeend",`
                <div class="spots-list-element-data">
                    <div class="spots-list-element-data-container">
                            <h3 class="spots-list-element-data spots-list-element-data-duration">${time.get_dhms((!spot.cache) ? 0 : (spot.cache.duration || 0))}</h3>
                            <h2 class="spots-list-element-data-title">${(!spot.cache) ? 'Refreshing... (cache was cleared)' : (spot.cache.title.length > 60) ? spot.cache.title.substr(0,60).trim() + "..." : spot.cache.title}</h2>
                            <h3 class="spots-list-element-data-remove" onclick="shuffle_list.play_next()">✖</h3>
                    </div>
                    <div class="spots-list-element-data-container">
                        <a href="https://youtube.com/watch?v=${spot.id}"><h3 class="spots-list-element-data spots-list-element-data-link">https://youtube.com/watch?v=${spot.id}</h3></a>
                    </div>
                </div>
            `);

            player.yt_player_iframe = document.createElement("iframe");
        
            player.yt_player_iframe.setAttribute('class','video-iframe');
            
            player.yt_player_iframe.setAttribute('id','player');
            
            player.yt_player_iframe.setAttribute('allow','autoplay');
            
            player.yt_player_iframe.setAttribute('enablejsapi',true);
        
            player.yt_player_iframe.setAttribute('src','https://www.youtube.com/embed/' + player.now_playing.id + '?enablejsapi=1&autoplay=1&t=' + (player.now_playing.start || 0));
        
            yt_player_container.appendChild(player.yt_player_iframe);
        
            player.yt_player = new YT.Player("player", {
                events: {
                    onReady: (event) => {
                        player.playVideo();
                    },
                    onStateChange: (event) => {
                        if (event.data == YT.PlayerState.ENDED) {
                            playlist.play_next(playlist.shift());
                        }
                    }
                }
            })
            
            playlist.emit('refresh');
    
        }

        return playlist;

    },

    player_display: function (visible) {

        let player_box = document.getElementById('player-container');

        if (player_box == null) return;

        if (visible) {
            player_box.style.display = 'block';
        } else {
            player_box.style.display = 'none';
        }
    }

}