let uname = {
    setuname: function (name,src) {
        localStorage.setItem('uname',name);
        window.location.href = `./${src || 'index'}.html`;
    }
}