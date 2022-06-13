function create_feedback_portal (id) {
    
    let elmnt = document.getElementById(`feedback-${id}`);

    if (!elmnt) return;

    /* let style = elmnt.style.display;

    if (!style || style === "none") style = "inline-block";

    elmnt.post = function (msg) {
        elmnt.style.display = style;
        elmnt.innerHTML = msg;
    }

    elmnt.hide = function (id) {
        let elmnt = document.getElementById(`feedback-${id}`);
        if (elmnt) elmnt.style.display = 'none';
    } */

    elmnt.post = function (msg) {
        elmnt.innerHTML = msg;
    }

    elmnt.hide = function (id) {
        elmnt.innerHTML = "&nbsp;";
    }

    return elmnt;
}