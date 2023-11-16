let d = (o = "", a = new EventTarget()) => new Proxy({
  // @ts-ignore
  emit: (t, e) => t.map((n) => a.dispatchEvent(new CustomEvent(n, e))),
  // @ts-ignore
  on: (t, e, n) => t.map((r) => a.addEventListener(r, e, n)),
  // @ts-ignore
  one: (t, e, n = {}) => (n.once = !0, t.map((r) => a.addEventListener(r, e, n))),
  // @ts-ignore
  off: (t, e, n) => t.map((r) => a.removeEventListener(r, e, n))
}, {
  get: (t, e) => (n, r, p) => {
    t[e]?.(n.split(" ").map((E) => o + E), r, p) ?? t.on(
      [{
        ready: "DOMContentLoaded"
      }[e] ?? e],
      n,
      r || {}
      /* as options */
    );
  }
});
export {
  d as juhla
};
