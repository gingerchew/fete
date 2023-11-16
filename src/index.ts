type Context = EventTarget | HTMLElement;
type PossibleName = keyof HTMLElementEventMap | keyof JuhlaMethods | string

type Juhla = (prefix?: string, ctx?:Context) => JuhlaInstance;

type JuhlaMethods = {
    emit: JuhlaEmitFunc;
    on: JuhlaMethodsFunc;
    off:  JuhlaMethodsFunc;
    one:  JuhlaMethodsFunc;
}

type JuhlaAliasFunc = (handler: EventListener, options?: JuhlaEventListenerOptions) => unknown;
type JuhlaMethodsFunc = (name: PossibleName | PossibleName[], handler: EventListener, options?: JuhlaEventListenerOptions) => unknown;
type JuhlaEmitFunc = (name: PossibleName | PossibleName[], options?: Event) => unknown;

type JuhlaInstance = {
    [index in keyof HTMLElementEventMap]: JuhlaAliasFunc;
} & JuhlaMethods;

type JuhlaEventListenerOptions = {
    once: boolean;
    passive: boolean;
} & EventListenerOptions;

/** All events will pass through this EventTarget */
let j:Juhla = (prefix = '', ctx = new EventTarget):JuhlaInstance => {
    return new Proxy<JuhlaInstance>({
        // @ts-ignore
        emit: (names, options) => names.map(n => ctx.dispatchEvent(new CustomEvent(n, options))),
        // @ts-ignore
        on: (names, handler, options) => names.map(n => ctx.addEventListener(n, handler, options)),
        // @ts-ignore
        one: (names, handler, options = {}) => (options.once = true, names.map(n => ctx.addEventListener(n, handler, options))),
        // @ts-ignore
        off: (names, handler, options) => names.map(n => ctx.removeEventListener(n, handler, options)),
    } as JuhlaInstance, {
        get: (juhlaInstance: JuhlaInstance, eventNameOrMethod: PossibleName) => 
                (name:PossibleName, handler:EventListener, options:JuhlaEventListenerOptions) => {
                    juhlaInstance[eventNameOrMethod]?.(name.split(` `).map((n:string) => prefix+n), handler, options) ??
                        juhlaInstance.on([{ 
                                ready: "DOMContentLoaded",
                            }[eventNameOrMethod] ?? eventNameOrMethod],
                            name as unknown as EventListener,
                            (handler || {}) as unknown as JuhlaEventListenerOptions /* as options */
                        );
            }
    });
}
export { j as juhla }