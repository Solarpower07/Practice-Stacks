let data = {
    save: function () {
        Object.keys(data).forEach(s => {
            if (data[s].data) localStorage.setItem(s,JSON.stringify(data[s].data || []));
        })
    }
}

let data_keys = ['arr spots','arr stack'];

data_keys.forEach(s => {

    var [,t,s] = s.match(/^(?:(\w+)\s+)?(\w+)$/);
    
    data[s] = {

        data: JSON.parse(localStorage.getItem(s) || ((t == "arr") ? "[]" : "{}")),

        save: function () {
            localStorage.setItem(s,JSON.stringify(spots.list || ((t == "arr") ? [] : {})));
        },

        clear: function () {
            if (window.confirm(`Are you sure you want to clear your ${s} data?\nThe data will be backed up, but your current storage will be removed.`)) {
                data[s].data = ((t == "arr") ? [] : {});
                location.reload();
            }
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