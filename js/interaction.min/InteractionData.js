import {
    Vector2
} from "../three.module.js";
class InteractionData {
    constructor() {
        this.global = new Vector2, this.target = null, this.originalEvent = null, this.identifier = null, this.isPrimary = !1, this.button = 0, this.buttons = 0, this.width = 0, this.height = 0, this.tiltX = 0, this.tiltY = 0, this.pointerType = null, this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0
    }
    get pointerId() {
        return this.identifier
    }
    _copyEvent(t) {
        t.isPrimary && (this.isPrimary = !0), this.button = t.button, this.buttons = t.buttons, this.width = t.width, this.height = t.height, this.tiltX = t.tiltX, this.tiltY = t.tiltY, this.pointerType = t.pointerType, this.pressure = t.pressure, this.rotationAngle = t.rotationAngle, this.twist = t.twist || 0, this.tangentialPressure = t.tangentialPressure || 0
    }
    _reset() {
        this.isPrimary = !1
    }
}
export default InteractionData;