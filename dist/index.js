let E = (r = "", s = new EventTarget(), n) => new Proxy({
  emit(t, e) {
    s.dispatchEvent(new CustomEvent(r + t, e));
  },
  on(t, e, o) {
    for (n of t.split` `)
      s.addEventListener(r + n, e, o);
  },
  one(t, e, o = {}) {
    o.once = !0;
    for (n of t.split` `)
      s.addEventListener(r + n, e, o);
  },
  off(t, e, o) {
    for (n of t.split` `)
      s.removeEventListener(r + n, e, o);
  }
}, {
  get: (t, e) => t[e] ?? ((o, d) => t.on({
    ready: "DOMContentLoaded"
  }[e] ?? e, o, d))
});
export {
  E as juhla
};
