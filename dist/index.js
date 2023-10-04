const s = (n = "", o = new EventTarget()) => ({
  emit(e, t) {
    o.dispatchEvent(new CustomEvent(n + e, t));
  },
  on(e, t, v) {
    o.addEventListener(n + e, t, v);
  },
  off(e, t, v) {
    o.removeEventListener(n + e, t, v);
  }
});
export {
  s as fete
};
