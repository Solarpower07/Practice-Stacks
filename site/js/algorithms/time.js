let time = {
    get_dhms : function (sec) {

        let out = [0,0,0,0];

        if (sec / 86400 >= 1) {
            out[0] = Math.floor(sec / 86400);
            sec %= 86400;
        }

        if (sec / 3600 >= 1) {
            out[1] = String(Math.floor(sec / 3600)).padStart(2,'0');
            sec %= 3600;
        }

        if (sec / 60 >= 1) {
            out[2] = String(Math.floor(sec / 60)).padStart(2,'0');
            sec %= 60;
        }
        
        out[3] = String(sec).padStart(2,'0');

        ([...out]).forEach((e,i) => {
            if ((!e || e == '00' || e == '0') && i < 2) out[i] = null;
        })

        return out.filter(n=>n).join(':')
    }
}