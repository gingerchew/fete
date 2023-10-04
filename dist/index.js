const s = (t = "", o = new EventTarget()) => ({
  emit(e, n) {
    o.dispatchEvent(new CustomEvent(t + e, n));
  },
  on(e, n, v) {
    o.addEventListener(t + e, n, v);
  },
  off(e, n, v) {
    o.removeEventListener(t + e, n, v);
  }
});
export {
  s as juhla
};
