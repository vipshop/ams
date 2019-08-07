import fecha from 'element-ui/src/utils/date';

export function parseTime(time, cFormat) {
    if (!time) {
        return '';
    }
    let date;
    if (time instanceof Date) {
        date = time;
    } else {
        const intTime = parseInt(time, 10);
        const len = (String(time)).length;
        if (len === 10 && intTime == time) { // eslint-disable-line eqeqeq
            date = new Date(intTime * 1000);
        } else if (len === 13 && intTime == time) {  // eslint-disable-line eqeqeq
            date = new Date(intTime);
        } else {
            return time;
        }
    }

    return fecha.format(date, cFormat);
}

