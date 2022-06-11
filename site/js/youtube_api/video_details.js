yt.get_info = async function (id) {
    var out;
    await $.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${yt.api_key}`, (data) => {
        if (data.items.length > 0) out = {
            title: data.items[0].snippet.title
        }
    }).fail(() => {console.error('YouTube is currently unavailable')})
    if (out) await $.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${id}&key=${yt.api_key}`, (data) => {
        out.duration = data.items[0].contentDetails.duration
        .match(/(?:PT)(?:(\d+?)D)?(?:(\d+?)H)?(?:(\d+?)M)?(?:(\d+?)S)?/i).map((val,pos) => {
            val = Number(val);
            if (pos && !Number.isNaN(val)) return [0, 86400, 3600, 60, 1][pos] * val;
        })
        .reduce((a,b) => {
          return (a||0) + (b||0)
        })
    })
    return out;
}