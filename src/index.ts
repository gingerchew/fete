type Context = Document | EventTarget;
type EventName = string | HTMLElementEventMap;

type Fete = (prefix?: string, ctx?:Context) => FeteInstance;
interface FeteInstance {
    emit: (name: EventName, options?:Event) => void;
    on: (name: EventName, handler: EventListener, options?: EventListenerOptions) => void;
    off: (name: EventName, handler: EventListener, options?: EventListenerOptions) => void;
}

/** All events will pass through this EventTarget */
const fete:Fete = (prefix = '', ctx = new EventTarget):FeteInstance => ({
    emit(name, options) {
        ctx.dispatchEvent(new CustomEvent(prefix+name, options));
    },
    on(name, handler, options) {
        ctx.addEventListener(prefix+name, handler, options);
    },
    off(name, handler, options) {
        ctx.removeEventListener(prefix+name, handler, options);
    }
});
export { fete }