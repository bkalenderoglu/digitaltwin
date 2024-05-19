class InteractionEvent {
    constructor() {
        this.stopped = !1, this.target = null, this.currentTarget = null, this.type = null, this.data = null, this.intersects = []
    }
    stopPropagation() {
        this.stopped = !0
    }
    _reset() {
        this.stopped = !1, this.currentTarget = null, this.target = null, this.intersects = []
    }
}
export default InteractionEvent;