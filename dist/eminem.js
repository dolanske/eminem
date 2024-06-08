function a() {
  let e = /* @__PURE__ */ new Map();
  function r(t, n) {
    e.has(t) || e.set(t, /* @__PURE__ */ new Set());
    const i = e.get(t);
    return i.add(n), e.set(t, i), () => {
      const o = e.get(t);
      o && o.has(n) && (o == null || o.delete(n));
    };
  }
  function s(t, ...n) {
    if (!t)
      throw new TypeError("Missing event name");
    const i = e.get(t);
    if (i)
      for (const o of i)
        o(...n);
  }
  function c(t, ...n) {
    s(t, ...n), f(t);
  }
  function u() {
    e = /* @__PURE__ */ new Map();
  }
  function f(t) {
    e.set(t, /* @__PURE__ */ new Set());
  }
  return {
    on: r,
    emit: s,
    flush: c,
    reset: u,
    clearKey: f
  };
}
export {
  a as createEminem
};
