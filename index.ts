const _ = new EventTarget(),
    fete = (prefix = '') => {
    return {
        on(name:string, handler:EventListener, options:EventListenerOptions) { _.addEventListener(prefix+name, handler, options) },
        off(name:string, handler:EventListener, options:EventListenerOptions) { _.removeEventListener(prefix+name, handler, options) },
        emit(name:string, options:Event) { _.dispatchEvent(new CustomEvent(prefix+name, options)) }
    }
}
export { fete }