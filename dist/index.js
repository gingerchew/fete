let s = (r = "", p = new EventTarget()) => new Proxy({
  // @ts-ignore
  emit: (t, e) => t.map((n) => p.dispatchEvent(new CustomEvent(n, e))),
  // @ts-ignore
  on: (t, e, n) => t.map((o) => p.addEventListener(o, e, n)),
  // @ts-ignore
  off: (t, e, n) => t.map((o) => p.removeEventListener(o, e, n))
}, {
  get: (t, e) => (n, o, a) => {
    t[e]?.(n.split(" ").map((i) => r + i), o, a) ?? t.on(
      [{
        ready: "DOMContentLoaded"
      }[e] ?? e],
      n,
      o || {}
      /* as options */
    );
  }
});
export {
  s as juhla
};
