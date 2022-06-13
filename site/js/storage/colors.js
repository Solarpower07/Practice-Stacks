let colors = {

    list: [
        { hex : '#043188' },
        { hex : '#048829' },
        { hex : '#885b04' },
        { hex : '#d7ce00' }
    ],

}

colors.default = 0,

colors.random = function () {
    return Math.floor(Math.random()*colors.list.length);
}