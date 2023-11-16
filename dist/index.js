let v = (o = "", d = new EventTarget()) => new Proxy({
  emit(n, e) {
    d.dispatchEvent(new CustomEvent(o + n, e));
  },
  on(n, e, t) {
    d.addEventListener(o + n, e, t);
  },
  one(n, e, t = {}) {
    t.once = !0, d.addEventListener(o + n, e, t);
  },
  off(n, e, t) {
    d.removeEventListener(o + n, e, t);
  }
}, {
  get: (n, e) => n[e] ?? ((t, E) => n.on({
    ready: "DOMContentLoaded"
  }[e] || e, t, E))
});
export {
  v as juhla
};
