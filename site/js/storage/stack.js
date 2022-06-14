let stack = data.stack;

stack.add = function () {

    stack.data.push({

        color: colors.default,

        index: stack.data.length

    })

    stack.emit('update');

}

stack.change_color = function (id,color) {

    stack.picking_color = null;

    if (id == null || color == null) return;

    stack.data[id].color = color;

    stack.remove_picker(id);

    stack.emit('update');

    let win_e = window.event;
    win_e.cancelBubble = true;
    if (win_e.stopPropagation) win_e.stopPropagation();

}

stack.picking_color = null;

stack.remove_picker = function (id) {

    let elm = document.getElementById(`stack-element-index-${id}`);

    if (elm && elm.lastChild.classList && elm.lastChild.classList.value.includes('stack-list-element-color-picker')) {

        elm.removeChild(elm.lastChild);

    }

    let win_e = window.event;
    win_e.cancelBubble = true;
    if (win_e.stopPropagation) win_e.stopPropagation();

}

stack.set_color = function (id) {

    if (id == null) return;

    if (stack.picking_color != null) {

        stack.remove_picker(stack.picking_color);

        if (id == stack.picking_color) {

            stack.picking_color = null;

            return;

        }

    }

    stack.picking_color = id;

    let elm = document.createElement('div');
    elm.classList.add('stack-list-element-color-picker-wrap');

    colors.list.forEach((e,i) => {
        elm.insertAdjacentHTML(
            'beforeend',
            `<div class="stack-list-element-color-picker-choice" style="background-color:${e.hex || colors.default.hex};" onclick="stack.change_color(${id},${i})"></div>`
        )
    })

    let elm_contain = document.createElement('div');
    
    elm_contain.classList.add('stack-list-element-color-picker');

    elm_contain.appendChild(elm);

    document.getElementById(`stack-element-index-${id}`).appendChild(elm_contain);

}

stack.remove = function (index) {

    if (index != null) stack.data.splice(index,1);

    if (stack.picking_color == index) stack.picking_color = null;

    stack.emit('update');

    let win_e = window.event;
    win_e.cancelBubble = true;
    if (win_e.stopPropagation) win_e.stopPropagation();

}