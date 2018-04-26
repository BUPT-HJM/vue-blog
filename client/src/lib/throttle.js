export default function (fn, time) {
    var timer;
    var firstTime = true;
    return function () {
        var args = arguments;
        if (firstTime) {
            fn.apply(this, arguments);
            firstTime = false;
            return firstTime;
        }
        if (timer) {
            return false;
        }
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            fn.apply(this, args);
        }, time || 500);
    };
}