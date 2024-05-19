function _rt(t) {
    return Object.prototype.toString.call(t)
}
export const Utils = {
    isFunction: function() {
        const t = _rt(function() {});
        return function(n) {
            return _rt(n) === t
        }
    }(),
    isUndefined: t => void 0 === t
};