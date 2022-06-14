let player = {

    get_shuffled_list: function () {

        let stack_low_spot_amount_warn = false;
        
        const stack_color_amounts = colors.ids.map(v => {
            return data.stack.data.filter((e,i) => (e.color == v)).length;
        })
        
        const color_shuffles = colors.ids.map((v,i) => {
        
            let spots_color = data.spots.data.filter((e,i) => (e.color == v && !e.unavailable));
        
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
        
        let playlist = data.stack.data.map(v => {return colors.ids.indexOf(v.color)}).map((v,i) => {
            
            counts[v]++;
        
            return color_shuffles[v][counts[v]-1];
        
        })
        
        if (stack_low_spot_amount_warn) console.warn('Not enough spots to fill up stack completely, some are duplicated');

        return playlist;

    }

}