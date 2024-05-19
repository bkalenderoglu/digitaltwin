import "./Raf.js";
import {
    EventDispatcher
} from "../../three.module.js";
class Ticker extends EventDispatcher {
    constructor() {
        super(), this.timer = null, this.started = !1, this.pt = 0, this.snippet = 0, this.start()
    }
    start() {
        if (this.started) return;
        const t = () => {
            this.timeline(), this.emit("tick", {
                snippet: this.snippet
            }), this.timer = RAF(t)
        };
        t()
    }
    stop() {
        CAF(this.timer), this.started = !1
    }
    timeline() {
        this.snippet = Date.now() - this.pt, (0 === this.pt || this.snippet > 200) && (this.pt = Date.now(), this.snippet = Date.now() - this.pt), this.pt += this.snippet
    }
}
export default Ticker;