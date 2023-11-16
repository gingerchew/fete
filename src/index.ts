type Context = EventTarget | HTMLElement;
type PossibleName = keyof HTMLElementEventMap | keyof JuhlaMethods | string;

type Juhla = (prefix?: string, ctx?:Context) => JuhlaInstance;

type JuhlaMethods = {
    emit: JuhlaEmitFunc;
    on: JuhlaMethodsFunc;
    off:  JuhlaMethodsFunc;
    one:  JuhlaMethodsFunc;
}

type JuhlaAliasFunc = (handler: EventListener, options?: JuhlaEventListenerOptions) => void;
type JuhlaMethodsFunc = (name: PossibleName, handler: EventListener, options?: JuhlaEventListenerOptions) => void;
type JuhlaEmitFunc = (name: PossibleName, options?: Event) => void;

type JuhlaInstance = {
    [index in keyof HTMLElementEventMap]: JuhlaAliasFunc;
} & JuhlaMethods;

type JuhlaEventListenerOptions = {
    once: boolean;
    passive: boolean;
} & EventListenerOptions;

/** All events will pass through this EventTarget */
let j:Juhla = (prefix = '', ctx = new EventTarget, n?:never):JuhlaInstance => {
    return new Proxy<JuhlaInstance>({
        emit(name, options) {
            // @ts-ignore
            ctx.dispatchEvent(new CustomEvent(prefix+name, options));
        },
        on(name, handler, options) {
            // @ts-ignore
            for (n of name.split` `) {
                ctx.addEventListener(prefix + n, handler, options)
            }
        },
        one(name, handler, options = {} as JuhlaEventListenerOptions) {
            options.once = true;
            // @ts-ignore
            for (n of name.split` `) {
                ctx.addEventListener(prefix+n, handler, options);
            }
        },
        off(name, handler, options) {
            // @ts-ignore
            for (n of name.split` `) {
                ctx.removeEventListener(prefix+n, handler, options);
            }
        },
    } as JuhlaInstance, {
        get: (juhlaInstance: JuhlaInstance, eventNameOrMethod: PossibleName) => (
            juhlaInstance[eventNameOrMethod] ?? (
                (handler: EventListener, options?: JuhlaEventListenerOptions) => juhlaInstance.on({
                    ready: "DOMContentLoaded"
                }[eventNameOrMethod as string] ?? eventNameOrMethod, handler, options)
            )
        )
    });
}
export { j as juhla }