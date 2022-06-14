const colors = {
    ids: [0,1,2,3]
}

const spots = [
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 0,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 0,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 0,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 1,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 1,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 2,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 1,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 2,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 1,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 2,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 1,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 2,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 2,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 2,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 1,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 1,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 3,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 3,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 3,
        "start": 0
    },
    {
        "id": "quYoQrQKZdo",
        "cache": {
            "title": "Mötley Crüe - Wild Side / bass cover / playalong with TAB",
            "duration": 284
        },
        "color": 1,
        "start": 0
    }
].map((v,i) => {v.index = i; return v;})

Array.prototype.shuffle = function () {

    let arr = [...this];

    let ran_i;

    for (let cur_i = arr.length -1; cur_i > 0; cur_i--) {

        ran_i = Math.floor(Math.random() * (cur_i + 1));

        [arr[cur_i], arr[ran_i]] = [arr[ran_i], arr[cur_i]];

    }

    return arr;
}

const stack = [ 0, 0, 1, 1, 1, 2, 2, 1, 2, 1, 1, 0, 0 ];

let stack_low_spot_amount_warn = false;

const stack_color_amounts = colors.ids.map(v => {
    return stack.filter((e,i) => (e == v)).length;
})

const color_shuffles = colors.ids.map((v,i) => {

    let spots_color = spots.filter((e,i) => (e.color == v));

    if (spots_color.length == 0) {
        if (stack_color_amounts[i] > 0) throw Error(`No elements of color ID ${i} to add to stack`);
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

let playlist = stack.map(v => {return colors.ids.indexOf(v)}).map((v,i) => {
    
    counts[v]++;

    return color_shuffles[v][counts[v]-1];

})

if (stack_low_spot_amount_warn) console.warn('Not enough spots to fill up stack completely, some are duplicated');

console.log(playlist.map((v)=>{return v.index}))