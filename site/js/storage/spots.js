let spots = data.spots;

spots.add = function (id,title,duration,start) {

    if (id == null || title == null || duration == null) return;

    spots.data.push({

        id,

        cache: {
            title,
            duration
        },

        color: colors.default,

        start: start || 0

    })

    spots.emit('update');

}

spots.change_color = function (id,color) {

    spots.picking_color = null;

    if (id == null || color == null) return;

    spots.data[id].color = color;

    spots.emit('update');

}

spots.picking_color = null;

spots.remove_picker = function (id) {

    let elm = document.getElementById(`spots-element-index-${id}`);

    if (elm && elm.lastChild.classList && elm.lastChild.classList.value.includes('spots-list-element-color-picker')) {

        elm.removeChild(elm.lastChild);

    }

}

spots.set_color = function (id) {

    if (id == null) return;

    if (spots.picking_color != null) {

        spots.remove_picker(spots.picking_color);

        if (id == spots.picking_color) {

            spots.picking_color = null;

            return;

        }

    }

    spots.picking_color = id;

    let elm = document.createElement('div');
    elm.classList.add('spots-list-element-color-picker-wrap');

    colors.list.forEach((e,i) => {
        elm.insertAdjacentHTML(
            'beforeend',
            `<div class="spots-list-element-color-picker-choice" style="background-color:${e.hex || colors.default.hex};" onclick="spots.change_color(${id},${i})"></div>`
        )
    })

    let elm_contain = document.createElement('div');
    
    elm_contain.classList.add('spots-list-element-color-picker');

    elm_contain.appendChild(elm);

    document.getElementById(`spots-element-index-${id}`).appendChild(elm_contain);

}

spots.remove = function (index) {

    if (index != null) spots.data.splice(index,1);

    spots.emit('update');

    if (spots.picking_color == index) spots.picking_color = null;

}