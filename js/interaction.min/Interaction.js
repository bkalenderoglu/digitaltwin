import Ticker from "./utils/Ticker.js";
import InteractionManager from "./InteractionManager.js";
class Interaction extends InteractionManager {
    constructor(t, e, i, r) {
        super(t, e, i, r = Object.assign({
            autoAttach: !1
        }, r)), this.ticker = new Ticker, this.update = this.update.bind(this), this.on("addevents", () => {
            this.ticker.on("tick", this.update)
        }), this.on("removeevents", () => {
            this.ticker.off("tick", this.update)
        }), this.setTargetElement(this.renderer.domElement)
    }
}
export default Interaction;