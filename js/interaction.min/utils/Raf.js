! function() {
    let n = 0,
        i = ["ms", "moz", "webkit", "o"];
    for (let n = 0; n < i.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[i[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i[n] + "CancelAnimationFrame"] || window[i[n] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(i) {
        let e = (new Date).getTime(),
            o = Math.max(0, 16 - (e - n)),
            t = window.setTimeout(function() {
                i(e + o)
            }, o);
        return n = e + o, t
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(n) {
        clearTimeout(n)
    }), window.RAF = window.requestAnimationFrame, window.CAF = window.cancelAnimationFrame
}();