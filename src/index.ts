type Context = EventTarget | HTMLElement;
type PossibleName = keyof HTMLElementEventMap | keyof JuhlaMethods | string

type Juhla = (prefix?: string, ctx?: Context) => JuhlaInstance;
/*
type JuhlaMethods = {
    emit: JuhlaEmitFunc;
    on: JuhlaMethodsFunc;
    off: JuhlaMethodsFunc;
}
*/

interface JuhlaMethods {
    emit: JuhlaEmitFunc;
    on: JuhlaMethodsFunc;
    off: JuhlaMethodsFunc;
}

type JuhlaAliasFunc = (handler: EventListener, options?: JuhlaEventListenerOptions) => unknown;
type JuhlaMethodsFunc = (name: PossibleName[], handler: EventListener, options?: JuhlaEventListenerOptions) => unknown;
type JuhlaEmitFunc = (name: PossibleName[], options?: Event) => unknown;

type JuhlaInstance = {
    [index in keyof HTMLElementEventMap]: JuhlaAliasFunc;
} & JuhlaMethods;

type JuhlaEventListenerOptions = {
    once?: boolean;
    passive?: boolean;
} & EventListenerOptions;

/** All events will pass through this EventTarget */
let j: Juhla = (prefix = '', ctx = new EventTarget): JuhlaInstance =>
    new Proxy<JuhlaInstance>({
        emit(names, options) { names.map(n => ctx.dispatchEvent(new CustomEvent(n, options))) },
        on(names, handler, options) { names.map(n => ctx.addEventListener(n, handler, options)) },
        off(names, handler, options) { names.map(n => ctx.removeEventListener(n, handler, options)) }
    } as JuhlaInstance, {
        get: (juhlaInstance: JuhlaInstance, eventNameOrMethod: PossibleName) =>
            (name: PossibleName, handler: EventListener, options?: JuhlaEventListenerOptions) =>
                !juhlaInstance[eventNameOrMethod] ? juhlaInstance.on(
                    [eventNameOrMethod],
                    name as unknown as EventListener,
                    handler as unknown as JuhlaEventListenerOptions
                ) : juhlaInstance[eventNameOrMethod](
                    name.split(' ').map(n => prefix + n),
                    handler,
                    options
                )

    });
export { j as juhla }