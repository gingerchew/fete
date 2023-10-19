const s = (o = "", v = new EventTarget()) => ({
  emit(e, n) {
    v.dispatchEvent(new CustomEvent(o + e, n));
  },
  on(e, n, t) {
    v.addEventListener(o + e, n, t);
  },
  off(e, n, t) {
    v.removeEventListener(o + e, n, t);
  },
  one(e, n, t = {}) {
    v.addEventListener(o + e, n, { ...t, once: !0 });
  }
});
export {
  s as juhla
};
