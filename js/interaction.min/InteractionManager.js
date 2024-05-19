import "./patch/EventDispatcher.js";
import "./patch/Object3D.js";
import {
    EventDispatcher,
    Raycaster
} from "../three.module.js";
import InteractionData from "./InteractionData.js";
import InteractionEvent from "./InteractionEvent.js";
import InteractionTrackingData from "./InteractionTrackingData.js";
const MOUSE_POINTER_ID = "MOUSE",
    hitTestEvent = {
        target: null,
        data: {
            global: null
        }
    };
class InteractionManager extends EventDispatcher {
    constructor(t, e, i, n) {
        super(), n = n || {}, this.renderer = t, this.scene = e, this.camera = i, this.autoPreventDefault = n.autoPreventDefault || !1, this.interactionFrequency = n.interactionFrequency || 10, this.mouse = new InteractionData, this.mouse.identifier = MOUSE_POINTER_ID, this.mouse.global.set(-999999), this.activeInteractionData = {}, this.activeInteractionData[MOUSE_POINTER_ID] = this.mouse, this.interactionDataPool = [], this.eventData = new InteractionEvent, this.interactionDOMElement = null, this.moveWhenInside = !0, this.eventsAdded = !1, this.mouseOverRenderer = !1, this.supportsTouchEvents = "ontouchstart" in window, this.supportsPointerEvents = !!window.PointerEvent, this.onClick = this.onClick.bind(this), this.processClick = this.processClick.bind(this), this.onPointerUp = this.onPointerUp.bind(this), this.processPointerUp = this.processPointerUp.bind(this), this.onPointerCancel = this.onPointerCancel.bind(this), this.processPointerCancel = this.processPointerCancel.bind(this), this.onPointerDown = this.onPointerDown.bind(this), this.processPointerDown = this.processPointerDown.bind(this), this.onPointerMove = this.onPointerMove.bind(this), this.processPointerMove = this.processPointerMove.bind(this), this.onPointerOut = this.onPointerOut.bind(this), this.processPointerOverOut = this.processPointerOverOut.bind(this), this.onPointerOver = this.onPointerOver.bind(this), this.cursorStyles = {
            default: "inherit",
            pointer: "pointer"
        }, this.currentCursorMode = null, this.cursor = null, this.raycaster = new Raycaster, this._deltaTime = 0, this.setTargetElement(this.renderer.domElement)
    }
    hitTest(t, e) {
        return hitTestEvent.target = null, hitTestEvent.data.global = t, e || (e = this.scene), this.processInteractive(hitTestEvent, e, null, !0), hitTestEvent.target
    }
    setTargetElement(t) {
        this.removeEvents(), this.interactionDOMElement = t, this.addEvents()
    }
    addEvents() {
        this.interactionDOMElement && !this.eventsAdded && (this.emit("addevents"), this.interactionDOMElement.addEventListener("click", this.onClick, !0), window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "none", this.interactionDOMElement.style["-ms-touch-action"] = "none") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = "none"), this.supportsPointerEvents ? (window.document.addEventListener("pointermove", this.onPointerMove, !0), this.interactionDOMElement.addEventListener("pointerdown", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("pointerleave", this.onPointerOut, !0), this.interactionDOMElement.addEventListener("pointerover", this.onPointerOver, !0), window.addEventListener("pointercancel", this.onPointerCancel, !0), window.addEventListener("pointerup", this.onPointerUp, !0)) : (window.document.addEventListener("mousemove", this.onPointerMove, !0), this.interactionDOMElement.addEventListener("mousedown", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("mouseout", this.onPointerOut, !0), this.interactionDOMElement.addEventListener("mouseover", this.onPointerOver, !0), window.addEventListener("mouseup", this.onPointerUp, !0)), this.supportsTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("touchcancel", this.onPointerCancel, !0), this.interactionDOMElement.addEventListener("touchend", this.onPointerUp, !0), this.interactionDOMElement.addEventListener("touchmove", this.onPointerMove, !0)), this.eventsAdded = !0)
    }
    removeEvents() {
        this.interactionDOMElement && (this.emit("removeevents"), this.interactionDOMElement.removeEventListener("click", this.onClick, !0), window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = "") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = ""), this.supportsPointerEvents ? (window.document.removeEventListener("pointermove", this.onPointerMove, !0), this.interactionDOMElement.removeEventListener("pointerdown", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("pointerleave", this.onPointerOut, !0), this.interactionDOMElement.removeEventListener("pointerover", this.onPointerOver, !0), window.removeEventListener("pointercancel", this.onPointerCancel, !0), window.removeEventListener("pointerup", this.onPointerUp, !0)) : (window.document.removeEventListener("mousemove", this.onPointerMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onPointerOut, !0), this.interactionDOMElement.removeEventListener("mouseover", this.onPointerOver, !0), window.removeEventListener("mouseup", this.onPointerUp, !0)), this.supportsTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("touchcancel", this.onPointerCancel, !0), this.interactionDOMElement.removeEventListener("touchend", this.onPointerUp, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onPointerMove, !0)), this.interactionDOMElement = null, this.eventsAdded = !1)
    }
    update({
        snippet: t
    }) {
        if (this._deltaTime += t, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this.interactionDOMElement))
            if (this.didMove) this.didMove = !1;
            else {
                this.cursor = null;
                for (const t in this.activeInteractionData)
                    if (this.activeInteractionData.hasOwnProperty(t)) {
                        const e = this.activeInteractionData[t];
                        if (e.originalEvent && "touch" !== e.pointerType) {
                            const t = this.configureInteractionEventForDOMEvent(this.eventData, e.originalEvent, e);
                            this.processInteractive(t, this.scene, this.processPointerOverOut, !0)
                        }
                    }
                this.setCursorMode(this.cursor)
            }
    }
    setCursorMode(t) {
        if (t = t || "default", this.currentCursorMode === t) return;
        this.currentCursorMode = t;
        const e = this.cursorStyles[t];
        if (e) switch (typeof e) {
            case "string":
                this.interactionDOMElement.style.cursor = e;
                break;
            case "function":
                e(t);
                break;
            case "object":
                Object.assign(this.interactionDOMElement.style, e)
        } else "string" != typeof t || Object.prototype.hasOwnProperty.call(this.cursorStyles, t) || (this.interactionDOMElement.style.cursor = t)
    }
    triggerEvent(t, e, i) {
        i.stopped || (i.currentTarget = t, i.type = e, t.emit(e, i), t[e] && t[e](i))
    }
    processInteractive(t, e, i, n, o) {
        if (!e || !e.visible) return !1;
        let r = !1,
            s = o = e.interactive || o;
        if (e.interactiveChildren && e.children) {
            const o = e.children;
            for (let e = o.length - 1; e >= 0; e--) {
                const a = o[e],
                    h = this.processInteractive(t, a, i, n, s);
                if (h) {
                    if (!a.parent) continue;
                    s = !1, h && (t.target && (n = !1), r = !0)
                }
            }
        }
        return o && (n && !t.target && t.intersects[0] && t.intersects[0].object === e && (r = !0), e.interactive && (r && !t.target && (t.data.target = t.target = e), i && i(t, e, !!r))), r
    }
    onClick(t) {
        if ("click" !== t.type) return;
        const e = this.normalizeToPointerData(t);
        this.autoPreventDefault && e[0].isNormalized && t.preventDefault();
        const i = this.getInteractionDataForPointerId(e[0]),
            n = this.configureInteractionEventForDOMEvent(this.eventData, e[0], i);
        n.data.originalEvent = t, this.processInteractive(n, this.scene, this.processClick, !0), this.emit("click", n)
    }
    processClick(t, e, i) {
        i && this.triggerEvent(e, "click", t)
    }
    onPointerDown(t) {
        if (this.supportsTouchEvents && "touch" === t.pointerType) return;
        const e = this.normalizeToPointerData(t);
        this.autoPreventDefault && e[0].isNormalized && t.preventDefault();
        const i = e.length;
        for (let n = 0; n < i; n++) {
            const i = e[n],
                o = this.getInteractionDataForPointerId(i),
                r = this.configureInteractionEventForDOMEvent(this.eventData, i, o);
            if (r.data.originalEvent = t, this.processInteractive(r, this.scene, this.processPointerDown, !0), this.emit("pointerdown", r), "touch" === i.pointerType) this.emit("touchstart", r);
            else if ("mouse" === i.pointerType || "pen" === i.pointerType) {
                const t = 2 === i.button;
                this.emit(t ? "rightdown" : "mousedown", this.eventData)
            }
        }
    }
    processPointerDown(t, e, i) {
        const n = t.data,
            o = t.data.identifier;
        if (i)
            if (e.trackedPointers[o] || (e.trackedPointers[o] = new InteractionTrackingData(o)), this.triggerEvent(e, "pointerdown", t), "touch" === n.pointerType) e.started = !0, this.triggerEvent(e, "touchstart", t);
            else if ("mouse" === n.pointerType || "pen" === n.pointerType) {
            const i = 2 === n.button;
            i ? e.trackedPointers[o].rightDown = !0 : e.trackedPointers[o].leftDown = !0, this.triggerEvent(e, i ? "rightdown" : "mousedown", t)
        }
    }
    onPointerComplete(t, e, i) {
        const n = this.normalizeToPointerData(t),
            o = n.length,
            r = t.target !== this.interactionDOMElement ? "outside" : "";
        for (let s = 0; s < o; s++) {
            const o = n[s],
                a = this.getInteractionDataForPointerId(o),
                h = this.configureInteractionEventForDOMEvent(this.eventData, o, a);
            if (h.data.originalEvent = t, this.processInteractive(h, this.scene, i, e || !r), this.emit(e ? "pointercancel" : `pointerup${r}`, h), "mouse" === o.pointerType || "pen" === o.pointerType) {
                const t = 2 === o.button;
                this.emit(t ? `rightup${r}` : `mouseup${r}`, h)
            } else "touch" === o.pointerType && (this.emit(e ? "touchcancel" : `touchend${r}`, h), this.releaseInteractionDataForPointerId(o.pointerId, a))
        }
    }
    onPointerCancel(t) {
        this.supportsTouchEvents && "touch" === t.pointerType || this.onPointerComplete(t, !0, this.processPointerCancel)
    }
    processPointerCancel(t, e) {
        const i = t.data,
            n = t.data.identifier;
        void 0 !== e.trackedPointers[n] && (delete e.trackedPointers[n], this.triggerEvent(e, "pointercancel", t), "touch" === i.pointerType && this.triggerEvent(e, "touchcancel", t))
    }
    onPointerUp(t) {
        this.supportsTouchEvents && "touch" === t.pointerType || this.onPointerComplete(t, !1, this.processPointerUp)
    }
    processPointerUp(t, e, i) {
        const n = t.data,
            o = t.data.identifier,
            r = e.trackedPointers[o],
            s = "touch" === n.pointerType;
        if ("mouse" === n.pointerType || "pen" === n.pointerType) {
            const o = 2 === n.button,
                s = InteractionTrackingData.FLAGS,
                a = o ? s.RIGHT_DOWN : s.LEFT_DOWN,
                h = void 0 !== r && r.flags & a;
            i ? (this.triggerEvent(e, o ? "rightup" : "mouseup", t), h && this.triggerEvent(e, o ? "rightclick" : "leftclick", t)) : h && this.triggerEvent(e, o ? "rightupoutside" : "mouseupoutside", t), r && (o ? r.rightDown = !1 : r.leftDown = !1)
        }
        s && e.started && (e.started = !1, this.triggerEvent(e, "touchend", t)), i ? (this.triggerEvent(e, "pointerup", t), r && (this.triggerEvent(e, "pointertap", t), s && (this.triggerEvent(e, "tap", t), r.over = !1))) : r && (this.triggerEvent(e, "pointerupoutside", t), s && this.triggerEvent(e, "touchendoutside", t)), r && r.none && delete e.trackedPointers[o]
    }
    onPointerMove(t) {
        if (this.supportsTouchEvents && "touch" === t.pointerType) return;
        const e = this.normalizeToPointerData(t);
        "mouse" === e[0].pointerType && (this.didMove = !0, this.cursor = null);
        const i = e.length;
        for (let n = 0; n < i; n++) {
            const i = e[n],
                o = this.getInteractionDataForPointerId(i),
                r = this.configureInteractionEventForDOMEvent(this.eventData, i, o);
            r.data.originalEvent = t;
            const s = "touch" !== i.pointerType || this.moveWhenInside;
            this.processInteractive(r, this.scene, this.processPointerMove, s), this.emit("pointermove", r), "touch" === i.pointerType && this.emit("touchmove", r), "mouse" !== i.pointerType && "pen" !== i.pointerType || this.emit("mousemove", r)
        }
        "mouse" === e[0].pointerType && this.setCursorMode(this.cursor)
    }
    processPointerMove(t, e, i) {
        const n = t.data,
            o = "touch" === n.pointerType,
            r = "mouse" === n.pointerType || "pen" === n.pointerType;
        r && this.processPointerOverOut(t, e, i), o && e.started && this.triggerEvent(e, "touchmove", t), this.moveWhenInside && !i || (this.triggerEvent(e, "pointermove", t), r && this.triggerEvent(e, "mousemove", t))
    }
    onPointerOut(t) {
        if (this.supportsTouchEvents && "touch" === t.pointerType) return;
        const e = this.normalizeToPointerData(t)[0];
        "mouse" === e.pointerType && (this.mouseOverRenderer = !1, this.setCursorMode(null));
        const i = this.getInteractionDataForPointerId(e),
            n = this.configureInteractionEventForDOMEvent(this.eventData, e, i);
        n.data.originalEvent = e, this.processInteractive(n, this.scene, this.processPointerOverOut, !1), this.emit("pointerout", n), "mouse" === e.pointerType || "pen" === e.pointerType ? this.emit("mouseout", n) : this.releaseInteractionDataForPointerId(i.identifier)
    }
    processPointerOverOut(t, e, i) {
        const n = t.data,
            o = t.data.identifier,
            r = "mouse" === n.pointerType || "pen" === n.pointerType;
        let s = e.trackedPointers[o];
        i && !s && (s = e.trackedPointers[o] = new InteractionTrackingData(o)), void 0 !== s && (i && this.mouseOverRenderer ? (s.over || (s.over = !0, this.triggerEvent(e, "pointerover", t), r && this.triggerEvent(e, "mouseover", t)), r && null === this.cursor && (this.cursor = e.cursor)) : s.over && (s.over = !1, this.triggerEvent(e, "pointerout", this.eventData), r && this.triggerEvent(e, "mouseout", t), s.none && delete e.trackedPointers[o]))
    }
    onPointerOver(t) {
        const e = this.normalizeToPointerData(t)[0],
            i = this.getInteractionDataForPointerId(e),
            n = this.configureInteractionEventForDOMEvent(this.eventData, e, i);
        n.data.originalEvent = e, "mouse" === e.pointerType && (this.mouseOverRenderer = !0), this.emit("pointerover", n), "mouse" !== e.pointerType && "pen" !== e.pointerType || this.emit("mouseover", n)
    }
    getInteractionDataForPointerId(t) {
        const e = t.pointerId;
        let i;
        return e === MOUSE_POINTER_ID || "mouse" === t.pointerType ? i = this.mouse : this.activeInteractionData[e] ? i = this.activeInteractionData[e] : ((i = this.interactionDataPool.pop() || new InteractionData).identifier = e, this.activeInteractionData[e] = i), i._copyEvent(t), i
    }
    releaseInteractionDataForPointerId(t) {
        const e = this.activeInteractionData[t];
        e && (delete this.activeInteractionData[t], e._reset(), this.interactionDataPool.push(e))
    }
    mapPositionToPoint(t, e, i) {
        let n;
        n = this.interactionDOMElement.parentElement ? this.interactionDOMElement.getBoundingClientRect() : {
            x: 0,
            y: 0,
            left: 0,
            top: 0,
            width: 0,
            height: 0
        }, t.x = (e - n.left) / n.width * 2 - 1, t.y = -(i - n.top) / n.height * 2 + 1
    }
    configureInteractionEventForDOMEvent(t, e, i) {
        return t.data = i, this.mapPositionToPoint(i.global, e.clientX, e.clientY), this.raycaster.setFromCamera(i.global, this.camera), "touch" === e.pointerType && (e.globalX = i.global.x, e.globalY = i.global.y), i.originalEvent = e, t._reset(), t.intersects = this.raycaster.intersectObjects(this.scene.children, !0), t
    }
    normalizeToPointerData(t) {
        const e = [];
        if (this.supportsTouchEvents && t instanceof TouchEvent)
            for (let i = 0, n = t.changedTouches.length; i < n; i++) {
                const n = t.changedTouches[i];
                void 0 === n.button && (n.button = t.touches.length ? 1 : 0), void 0 === n.buttons && (n.buttons = t.touches.length ? 1 : 0), void 0 === n.isPrimary && (n.isPrimary = 1 === t.touches.length && "touchstart" === t.type), void 0 === n.width && (n.width = n.radiusX || 1), void 0 === n.height && (n.height = n.radiusY || 1), void 0 === n.tiltX && (n.tiltX = 0), void 0 === n.tiltY && (n.tiltY = 0), void 0 === n.pointerType && (n.pointerType = "touch"), void 0 === n.pointerId && (n.pointerId = n.identifier || 0), void 0 === n.pressure && (n.pressure = n.force || .5), n.twist = 0, n.tangentialPressure = 0, void 0 === n.layerX && (n.layerX = n.offsetX = n.clientX), void 0 === n.layerY && (n.layerY = n.offsetY = n.clientY), n.isNormalized = !0, e.push(n)
            } else !(t instanceof MouseEvent) || this.supportsPointerEvents && t instanceof window.PointerEvent ? e.push(t) : (void 0 === t.isPrimary && (t.isPrimary = !0), void 0 === t.width && (t.width = 1), void 0 === t.height && (t.height = 1), void 0 === t.tiltX && (t.tiltX = 0), void 0 === t.tiltY && (t.tiltY = 0), void 0 === t.pointerType && (t.pointerType = "mouse"), void 0 === t.pointerId && (t.pointerId = MOUSE_POINTER_ID), void 0 === t.pressure && (t.pressure = .5), t.twist = 0, t.tangentialPressure = 0, t.isNormalized = !0, e.push(t));
        return e
    }
    destroy() {
        this.removeEvents(), this.removeAllListeners(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactionDOMElement = null, this.onPointerDown = null, this.processPointerDown = null, this.onPointerUp = null, this.processPointerUp = null, this.onPointerCancel = null, this.processPointerCancel = null, this.onPointerMove = null, this.processPointerMove = null, this.onPointerOut = null, this.processPointerOverOut = null, this.onPointerOver = null, this._tempPoint = null
    }
}
export default InteractionManager;