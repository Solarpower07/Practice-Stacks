let time = {
    get_dhms : function (sec) {

        if (!sec) sec = 0;

        let out = [0,0,0,0];

        if (sec / 86400 >= 1) {
            out[0] = Math.floor(sec / 86400);
            sec %= 86400;
        }

        if (sec / 3600 >= 1) {
            out[1] = Math.floor(sec / 3600);
            sec %= 3600;
        }

        if (sec / 60 >= 1) {
            out[2] = Math.floor(sec / 60);
            sec %= 60;
        }
        
        out[3] = sec;

        for (var i = 0; out[i] < 1 && i < 2; out[i] = null, i++);

        return out.map((v,i) => {if (v != null) return String(v).padStart((i === 0 ? 1 : 2),'0')}).filter(n => n !== undefined).join(':')
    }
}