let d = (E = "", o = new EventTarget()) => new Proxy({
  emit(e, n) {
    o.dispatchEvent(new CustomEvent(E + e, n));
  },
  on(e, n, t) {
    o.addEventListener(E + e, n, t);
  },
  off(e, n, t) {
    o.removeEventListener(E + e, n, t);
  },
  one(e, n, t = {}) {
    t.once = !0, o.addEventListener(E + e, n, t);
  }
}, {
  get: (e, n) => e[n] ? e[n] : (t, v) => e.on(n, t, v)
});
export {
  d as juhla
};
