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
        } else if (len > 10 && len <= 13 && intTime == time) {  // eslint-disable-line eqeqeq
            date = new Date(intTime);
        } else {
            return time;
        }
    }
    const hour = date.getHours();
    return cFormat
        .replace(/yyyy/g, date.getFullYear())
        .replace(/MM/g, (`0${date.getMonth() + 1}`).slice(-2))
        .replace(/dd/g, (`0${date.getDate()}`).slice(-2))
        .replace(/hh/g, (`0${hour}`).slice(-2))
        .replace(/HH/g, (`0${hour}`).slice(-2))
        .replace(/mm/g, (`0${date.getMinutes()}`).slice(-2))
        .replace(/ss/g, (`0${date.getSeconds()}`).slice(-2))
        .replace(/A/g, function() {
            return hour > 12 ? 'PM' : 'AM';
        })
        .replace(/a/g, function() {
            return hour > 12 ? 'pm' : 'am';
        });
}

