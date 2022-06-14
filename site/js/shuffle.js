Array.prototype.shuffle = function () {

    let arr = [...this];

    let ran_i;

    for (let cur_i = arr.length -1; cur_i > 0; cur_i--) {

        ran_i = Math.floor(Math.random() * (cur_i + 1));

        [arr[cur_i], arr[ran_i]] = [arr[ran_i], arr[cur_i]];

    }

    return arr;
}