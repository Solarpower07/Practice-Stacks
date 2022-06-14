let session_num = 0;

while (localStorage.getItem(`backup-${session_num}`) != null) session_num++;

function data_values_check (v) {
    return ( v != 'save' && v != 'clear' && v != 'backups');
}

let data = {
    save: function () {

        data_keys = Object.keys(data).filter(v => data_values_check(v));

        data_keys.forEach(s => {
            data[s].save();
        })

        while (localStorage.getItem(`backup-${session_num}`) != null) session_num++;
        
        let data_values = data_keys.map(v => {
        
            return data[v].compress_data();
        
        })
        
        let storage_data = {
            gen_time: Date.now()
        }
        
        data_keys.forEach((v,i) => {
            storage_data[v] = data_values[i];
        })
    
        localStorage.setItem(`backup-${session_num}`,JSON.stringify(storage_data));

        while (localStorage.getItem(`backup-${session_num}`) != null) session_num++;

    },
    clear: function () {

        if (!window.confirm(`Are you sure you want to clear ALL of your data?\nThe data will be backed up, but your current storage will be removed.`)) return;

        this.save();

        Object.keys(data).forEach(s => {
            data[s].clear(true);
            location.reload();
        })
    },
    backups: {
        find: function (amnt, only) {
            if (typeof amnt === "number") {

                let out = [];

                let current = Number(session_num);

                for (let i = 0; i < amnt; i++) {

                    if (current > 0) current--;

                    while (localStorage.getItem(`backup-${current}`) == null && current > 0) current--;

                    out.push(current);

                }

                if (!only) return out;
                else return out[out.length-1];

            } else if (amnt === true) {

                let out = [];

                let current = Number(session_num);

                while (localStorage.getItem(`backup-${current}`) == null && current > 0) current--;

                while (localStorage.getItem(`backup-${current}`) != null && current > 0) {

                    while (localStorage.getItem(`backup-${current}`) == null && current > 0) current--;

                    out.push(current);

                    if (current > 0) current--;

                }

                return out;

            } else {

                let current = Number(session_num || 0);

                while (localStorage.getItem(`backup-${current}`) != null && current > 0) current--;

                return current;

            }
        },
        fetch: function (id) {
            return localStorage.getItem(`backup-${id}`);
        },
        load: function (id,ago) {

            if (id == null) return;

            if (ago) {
                this.load_data(this.fetch(this.find(id,true)));
            } else {
                this.load_data(this.fetch(id));
            }

        },
        load_data: function (storage_data) {

            storage_data = JSON.parse(storage_data);

            for (key in storage_data) {

                if (key == 'gen_time') continue;

                data[key].data = storage_data[key];

            }

            location.reload();

        },
        clear_old: function (clear_last) {

            if (!clear_last) {

                let current = Number(session_num);

                while (localStorage.getItem(`backup-${current}`) == null && current > 0) current--;

                localStorage.setItem('backup-0',localStorage.getItem(`backup-${current}`))

            }

            this.find(true).forEach(v => {
                if (v > 0 || clear_last) localStorage.removeItem(`backup-${v}`);
            })

            while (localStorage.getItem(`backup-${session_num}`) == null && session_num > 0) session_num--;

        }
    }
}

let data_keys = ['arr spots','arr stack'];

data_keys.forEach(s => {

    var [,t,s] = s.match(/^(?:(\w+)\s+)?(\w+)$/);
    
    data[s] = {

        data: JSON.parse(localStorage.getItem(s) || ((t == "arr") ? "[]" : "{}")),

        save: function () {
            localStorage.setItem(s,JSON.stringify(data[s].data || ((t == "arr") ? [] : {})));
        },

        clear: function (confirm) {
            confirm = (confirm == true) ? true : window.confirm(`Are you sure you want to clear your ${s} data?\nThe data will be backed up, but your current storage will be removed.`);
            if (confirm) {
                data[s].data = ((t == "arr") ? [] : {});
                location.reload();
            }
        },

        compress_data: function () {
            return this.data;
        },

        //Event listeners
        listeners: {},

        on: function (event,callback) {
            if (!event || !callback) return;
            if (data[s].listeners[event]) data[s].listeners[event].push(callback);
            else data[s].listeners[event] = [callback];
        },

        emit: function (event,...args) {
            if (Array.isArray(data[s].listeners[event])) data[s].listeners[event].forEach(func => {func(...args)});
        }
    }
})

window.onbeforeunload = function () {

    data.save();

}