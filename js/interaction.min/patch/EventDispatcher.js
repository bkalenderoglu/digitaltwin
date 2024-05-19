import {
    EventDispatcher,
    Object3D
} from "../../three.module.js";
import {
    Utils
} from "../utils/Utils.js";
EventDispatcher.prototype.on = function(t, i) {
    if (Utils.isFunction(i)) return this instanceof Object3D && (this.interactive = !0), this.addEventListener(t, i), this
}, EventDispatcher.prototype.off = function(t, i) {
    return this.removeEventListener(t, i), this
}, EventDispatcher.prototype.once = function(t, i) {
    if (!Utils.isFunction(i)) return;
    const e = s => {
        i(s), this.off(t, e)
    };
    return this.on(t, e), this
}, EventDispatcher.prototype.emit = function(t, ...i) {
    if (void 0 === this._listeners || Utils.isUndefined(this._listeners[t])) return;
    const e = (this._listeners[t] || []).slice(0);
    for (let t = 0; t < e.length; t++) e[t].apply(this, i);
    return this
};