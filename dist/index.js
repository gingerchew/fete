const d = (o = "", m = new EventTarget()) => new Proxy({
  emit(e, t) {
    e.map((n) => m.dispatchEvent(new CustomEvent(n, t)));
  },
  on(e, t, n) {
    e.map((r) => m.addEventListener(r, t, n));
  },
  off(e, t, n) {
    e.map((r) => m.removeEventListener(r, t, n));
  },
  one(e, t, n = {}) {
    n.once = !0, e.map((r) => m.addEventListener(r, t, n));
  }
}, {
  get: (e, t) => (n, r, p) => t in e ? e[t](n.split(" ").map((v) => o + v), r, p) : e.on([t], n, r)
});
export {
  d as juhla
};
