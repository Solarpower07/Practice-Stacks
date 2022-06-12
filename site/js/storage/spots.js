let spots = {
    list: JSON.parse(localStorage.getItem('spots') || "[]"),
    save: function () {
        localStorage.setItem('spots',JSON.stringify(spots.list || []));
    },
    clear: function () {
        if (window.confirm('Are you sure you want to clear your spot data?\nThe data will be backed up, but your current storage will be wiped.')) {
            spots.list = [];
            location.reload();
        }
    }
}

console.log(spots)

window.onbeforeunload = spots.save;