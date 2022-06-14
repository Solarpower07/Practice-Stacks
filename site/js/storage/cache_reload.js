spots.cache_reload = function (force) {

    let changed = false;

    Promise.all(spots.data.filter(v => (!v.cache && !v.unavailable) || force).map(async v => {

        const yt_info_return = await yt.get_info(v.id).catch(console.warn);

        if (yt_info_return) {
            v.cache = {
                title: yt_info_return.title,
                duration: yt_info_return.duration
            }
            changed = true;
        }

        else if (yt_info_return === false) {
            v.unavailable = true;
            changed = true;
        }
    
    })).then(() => {
        if (changed) spots.emit('update');
    })

}