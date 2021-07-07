export function listStringHasValue(list, value) {
    return list && String(list).split(',').indexOf(value) >= 0;
}

export function listRemoveItem(list, item) {
    if (list) {
        const index = list.indexOf(item);
        if (index > -1) {
            list.splice(index, 1);
        }
    }
}