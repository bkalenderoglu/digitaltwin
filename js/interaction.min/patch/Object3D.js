import {
    Object3D
} from "../../three.module.js";
Object3D.prototype.interactive = !1, Object3D.prototype.interactiveChildren = !0, Object3D.prototype.started = !1, Object.defineProperty(Object3D.prototype, "trackedPointers", {
    get() {
        return this._trackedPointers || (this._trackedPointers = {}), this._trackedPointers
    }
}), Object3D.prototype.raycastTest = function(t) {
    const e = [];
    return this.raycast(t, e), e.length > 0 && e[0]
};