let s = (E = "", o = new EventTarget()) => new Proxy({
  emit(e, p) {
    e.map((t) => o.dispatchEvent(new CustomEvent(t, p)));
  },
  on(e, p, t) {
    e.map((i) => o.addEventListener(i, p, t));
  },
  off(e, p, t) {
    e.map((i) => o.removeEventListener(i, p, t));
  }
}, {
  get: (e, p) => (t, i, m) => e[p] ? e[p](
    t.split(" ").map((n) => E + n),
    i,
    m
  ) : e.on(
    [p],
    t,
    i
  )
});
export {
  s as juhla
};
