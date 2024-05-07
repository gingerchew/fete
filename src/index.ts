type Context = EventTarget | Document | Window | HTMLElement;

// https://github.com/microsoft/TypeScript/issues/33047#issuecomment-704005614
type EventMap<T extends Context> = T extends Document
	? DocumentEventMap
	: T extends Window
	? WindowEventMap
	: HTMLElementEventMap;
type EventTypes<T extends EventTarget> = keyof EventMap<T> & string;
type EventValue<T extends EventTarget, K extends EventTypes<T>> = Extract<EventMap<T>[K], Event>;


interface JuhlaMethods {
    emit: JuhlaEmitFunc;
    on: JuhlaMethodsFunc;
    off: JuhlaMethodsFunc;
    one: JuhlaMethodsFunc;
}

type JuhlaMethodsFunc<T = EventMap<Context>> = (names: (keyof T)[], handler: EventListener, options?: AddEventListenerOptions) => unknown;
type JuhlaEmitFunc<T = EventMap<Context>> = (names: (keyof T)[], options?: CustomEventInit) => unknown;

type JuhlaInstance ={
    [index in EventTypes<Context>]: (handler: EventListener, options?: AddEventListenerOptions) => unknown;
} & JuhlaMethods;



const J = <T extends EventTypes<Context>>(ctx:Context = new EventTarget) => {
    return new Proxy({
        emit(names, options?: CustomEventInit) { 
            names.map(n => ctx.dispatchEvent(new CustomEvent(n, options)));
        },
        on(names, handler, options?: AddEventListenerOptions) {
            names.map(n => ctx.addEventListener(n, handler, options));
        },
        off(names, handler, options?: AddEventListenerOptions) {
            names.map(n => ctx.removeEventListener(n, handler, options));
        },
        one(names, handler, options:AddEventListenerOptions = {}) {
            options.once = true;
            names.map(n => ctx.addEventListener(n, handler, options));
        }
    }, {
        get: (juhlaInstance: JuhlaMethods, possibleEventAlias: keyof JuhlaInstance) => 
            <E>(
                name: E extends keyof EventTypes<typeof ctx> ? EventTypes<typeof ctx> : string,
                handler: typeof possibleEventAlias extends keyof HTMLElementEventMap ? 
                    AddEventListenerOptions : 
                    EventListener, 
                options?: AddEventListenerOptions
            ) =>
                possibleEventAlias in juhlaInstance ?
                    juhlaInstance[possibleEventAlias](name.split(' '), handler, options) :
                    juhlaInstance.on([possibleEventAlias as T], name as unknown as EventListener, handler as unknown as AddEventListenerOptions)
    });
}
export { J as juhla }