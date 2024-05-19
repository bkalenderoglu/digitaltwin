export default class InteractionTrackingData {
    constructor(t) {
        this._pointerId = t, this._flags = InteractionTrackingData.FLAGS.NONE
    }
    _doSet(t, s) {
        this._flags = s ? this._flags | t : this._flags & ~t
    }
    get pointerId() {
        return this._pointerId
    }
    get flags() {
        return this._flags
    }
    set flags(t) {
        this._flags = t
    }
    get none() {
        return this._flags === this.constructor.FLAGS.NONE
    }
    get over() {
        return 0 != (this._flags & this.constructor.FLAGS.OVER)
    }
    set over(t) {
        this._doSet(this.constructor.FLAGS.OVER, t)
    }
    get rightDown() {
        return 0 != (this._flags & this.constructor.FLAGS.RIGHT_DOWN)
    }
    set rightDown(t) {
        this._doSet(this.constructor.FLAGS.RIGHT_DOWN, t)
    }
    get leftDown() {
        return 0 != (this._flags & this.constructor.FLAGS.LEFT_DOWN)
    }
    set leftDown(t) {
        this._doSet(this.constructor.FLAGS.LEFT_DOWN, t)
    }
}
InteractionTrackingData.FLAGS = Object.freeze({
    NONE: 0,
    OVER: 1,
    LEFT_DOWN: 2,
    RIGHT_DOWN: 4
});