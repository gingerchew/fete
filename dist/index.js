let d = (o = "", v = new EventTarget()) => new Proxy({
  emit(e, n) {
    v.dispatchEvent(new CustomEvent(o + e, n));
  },
  on(e, n, t) {
    v.addEventListener(o + e, n, t);
  },
  one(e, n, t = {}) {
    t.once = !0, v.addEventListener(o + e, n, t);
  },
  off(e, n, t) {
    v.removeEventListener(o + e, n, t);
  }
}, {
  get: (e, n) => e[n] ?? ((t, E) => e.on(n, t, E))
});
export {
  d as juhla
};
