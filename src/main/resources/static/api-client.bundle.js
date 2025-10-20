var _t = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function qr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Br(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(t, n);
    Object.defineProperty(r, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return t[n];
      }
    });
  }), r;
}
var yt = { exports: {} }, ar = { exports: {} };
(function(t) {
  t.exports = e;
  function e(n) {
    if (n) return r(n);
  }
  function r(n) {
    for (var o in e.prototype)
      n[o] = e.prototype[o];
    return n;
  }
  e.prototype.on = e.prototype.addEventListener = function(n, o) {
    return this._callbacks = this._callbacks || {}, (this._callbacks["$" + n] = this._callbacks["$" + n] || []).push(o), this;
  }, e.prototype.once = function(n, o) {
    function i() {
      this.off(n, i), o.apply(this, arguments);
    }
    return i.fn = o, this.on(n, i), this;
  }, e.prototype.off = e.prototype.removeListener = e.prototype.removeAllListeners = e.prototype.removeEventListener = function(n, o) {
    if (this._callbacks = this._callbacks || {}, arguments.length == 0)
      return this._callbacks = {}, this;
    var i = this._callbacks["$" + n];
    if (!i) return this;
    if (arguments.length == 1)
      return delete this._callbacks["$" + n], this;
    for (var a, s = 0; s < i.length; s++)
      if (a = i[s], a === o || a.fn === o) {
        i.splice(s, 1);
        break;
      }
    return i.length === 0 && delete this._callbacks["$" + n], this;
  }, e.prototype.emit = function(n) {
    this._callbacks = this._callbacks || {};
    for (var o = new Array(arguments.length - 1), i = this._callbacks["$" + n], a = 1; a < arguments.length; a++)
      o[a - 1] = arguments[a];
    if (i) {
      i = i.slice(0);
      for (var a = 0, s = i.length; a < s; ++a)
        i[a].apply(this, o);
    }
    return this;
  }, e.prototype.listeners = function(n) {
    return this._callbacks = this._callbacks || {}, this._callbacks["$" + n] || [];
  }, e.prototype.hasListeners = function(n) {
    return !!this.listeners(n).length;
  };
})(ar);
var zr = ar.exports, kr = Oe;
Oe.default = Oe;
Oe.stable = fr;
Oe.stableStringify = fr;
var $e = "[...]", sr = "[Circular]", ie = [], re = [];
function ur() {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  };
}
function Oe(t, e, r, n) {
  typeof n > "u" && (n = ur()), ht(t, "", 0, [], void 0, 0, n);
  var o;
  try {
    re.length === 0 ? o = JSON.stringify(t, e, r) : o = JSON.stringify(t, lr(e), r);
  } catch {
    return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
  } finally {
    for (; ie.length !== 0; ) {
      var i = ie.pop();
      i.length === 4 ? Object.defineProperty(i[0], i[1], i[3]) : i[0][i[1]] = i[2];
    }
  }
  return o;
}
function ce(t, e, r, n) {
  var o = Object.getOwnPropertyDescriptor(n, r);
  o.get !== void 0 ? o.configurable ? (Object.defineProperty(n, r, { value: t }), ie.push([n, r, e, o])) : re.push([e, r, t]) : (n[r] = t, ie.push([n, r, e]));
}
function ht(t, e, r, n, o, i, a) {
  i += 1;
  var s;
  if (typeof t == "object" && t !== null) {
    for (s = 0; s < n.length; s++)
      if (n[s] === t) {
        ce(sr, t, e, o);
        return;
      }
    if (typeof a.depthLimit < "u" && i > a.depthLimit) {
      ce($e, t, e, o);
      return;
    }
    if (typeof a.edgesLimit < "u" && r + 1 > a.edgesLimit) {
      ce($e, t, e, o);
      return;
    }
    if (n.push(t), Array.isArray(t))
      for (s = 0; s < t.length; s++)
        ht(t[s], s, s, n, t, i, a);
    else {
      var y = Object.keys(t);
      for (s = 0; s < y.length; s++) {
        var c = y[s];
        ht(t[c], c, s, n, t, i, a);
      }
    }
    n.pop();
  }
}
function Ur(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
function fr(t, e, r, n) {
  typeof n > "u" && (n = ur());
  var o = dt(t, "", 0, [], void 0, 0, n) || t, i;
  try {
    re.length === 0 ? i = JSON.stringify(o, e, r) : i = JSON.stringify(o, lr(e), r);
  } catch {
    return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
  } finally {
    for (; ie.length !== 0; ) {
      var a = ie.pop();
      a.length === 4 ? Object.defineProperty(a[0], a[1], a[3]) : a[0][a[1]] = a[2];
    }
  }
  return i;
}
function dt(t, e, r, n, o, i, a) {
  i += 1;
  var s;
  if (typeof t == "object" && t !== null) {
    for (s = 0; s < n.length; s++)
      if (n[s] === t) {
        ce(sr, t, e, o);
        return;
      }
    try {
      if (typeof t.toJSON == "function")
        return;
    } catch {
      return;
    }
    if (typeof a.depthLimit < "u" && i > a.depthLimit) {
      ce($e, t, e, o);
      return;
    }
    if (typeof a.edgesLimit < "u" && r + 1 > a.edgesLimit) {
      ce($e, t, e, o);
      return;
    }
    if (n.push(t), Array.isArray(t))
      for (s = 0; s < t.length; s++)
        dt(t[s], s, s, n, t, i, a);
    else {
      var y = {}, c = Object.keys(t).sort(Ur);
      for (s = 0; s < c.length; s++) {
        var h = c[s];
        dt(t[h], h, s, n, t, i, a), y[h] = t[h];
      }
      if (typeof o < "u")
        ie.push([o, e, t]), o[e] = y;
      else
        return y;
    }
    n.pop();
  }
}
function lr(t) {
  return t = typeof t < "u" ? t : function(e, r) {
    return r;
  }, function(e, r) {
    if (re.length > 0)
      for (var n = 0; n < re.length; n++) {
        var o = re[n];
        if (o[1] === e && o[0] === r) {
          r = o[2], re.splice(n, 1);
          break;
        }
      }
    return t.call(this, e, r);
  };
}
var me = TypeError;
const Lr = {}, Jr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lr
}, Symbol.toStringTag, { value: "Module" })), cr = /* @__PURE__ */ Br(Jr);
var St = typeof Map == "function" && Map.prototype, Ge = Object.getOwnPropertyDescriptor && St ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, Fe = St && Ge && typeof Ge.get == "function" ? Ge.get : null, Nt = St && Map.prototype.forEach, Ot = typeof Set == "function" && Set.prototype, We = Object.getOwnPropertyDescriptor && Ot ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, De = Ot && We && typeof We.get == "function" ? We.get : null, Rt = Ot && Set.prototype.forEach, Hr = typeof WeakMap == "function" && WeakMap.prototype, ve = Hr ? WeakMap.prototype.has : null, Gr = typeof WeakSet == "function" && WeakSet.prototype, we = Gr ? WeakSet.prototype.has : null, Wr = typeof WeakRef == "function" && WeakRef.prototype, xt = Wr ? WeakRef.prototype.deref : null, Kr = Boolean.prototype.valueOf, Vr = Object.prototype.toString, Qr = Function.prototype.toString, Xr = String.prototype.match, Et = String.prototype.slice, j = String.prototype.replace, jr = String.prototype.toUpperCase, Ct = String.prototype.toLowerCase, pr = RegExp.prototype.test, It = Array.prototype.concat, W = Array.prototype.join, Yr = Array.prototype.slice, $t = Math.floor, mt = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, Ke = Object.getOwnPropertySymbols, gt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, ye = typeof Symbol == "function" && typeof Symbol.iterator == "object", be = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === ye || !0) ? Symbol.toStringTag : null, yr = Object.prototype.propertyIsEnumerable, Ft = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
  return t.__proto__;
} : null);
function Dt(t, e) {
  if (t === 1 / 0 || t === -1 / 0 || t !== t || t && t > -1e3 && t < 1e3 || pr.call(/e/, e))
    return e;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof t == "number") {
    var n = t < 0 ? -$t(-t) : $t(t);
    if (n !== t) {
      var o = String(n), i = Et.call(e, o.length + 1);
      return j.call(o, r, "$&_") + "." + j.call(j.call(i, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return j.call(e, r, "$&_");
}
var vt = cr, Mt = vt.custom, qt = mr(Mt) ? Mt : null, hr = {
  __proto__: null,
  double: '"',
  single: "'"
}, Zr = {
  __proto__: null,
  double: /(["\\])/g,
  single: /(['\\])/g
}, ze = function t(e, r, n, o) {
  var i = r || {};
  if (Q(i, "quoteStyle") && !Q(hr, i.quoteStyle))
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (Q(i, "maxStringLength") && (typeof i.maxStringLength == "number" ? i.maxStringLength < 0 && i.maxStringLength !== 1 / 0 : i.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var a = Q(i, "customInspect") ? i.customInspect : !0;
  if (typeof a != "boolean" && a !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (Q(i, "indent") && i.indent !== null && i.indent !== "	" && !(parseInt(i.indent, 10) === i.indent && i.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (Q(i, "numericSeparator") && typeof i.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var s = i.numericSeparator;
  if (typeof e > "u")
    return "undefined";
  if (e === null)
    return "null";
  if (typeof e == "boolean")
    return e ? "true" : "false";
  if (typeof e == "string")
    return vr(e, i);
  if (typeof e == "number") {
    if (e === 0)
      return 1 / 0 / e > 0 ? "0" : "-0";
    var y = String(e);
    return s ? Dt(e, y) : y;
  }
  if (typeof e == "bigint") {
    var c = String(e) + "n";
    return s ? Dt(e, c) : c;
  }
  var h = typeof i.depth > "u" ? 5 : i.depth;
  if (typeof n > "u" && (n = 0), n >= h && h > 0 && typeof e == "object")
    return wt(e) ? "[Array]" : "[Object]";
  var m = vn(i, n);
  if (typeof o > "u")
    o = [];
  else if (gr(o, e) >= 0)
    return "[Circular]";
  function p(u, f, l) {
    if (f && (o = Yr.call(o), o.push(f)), l) {
      var d = {
        depth: i.depth
      };
      return Q(i, "quoteStyle") && (d.quoteStyle = i.quoteStyle), t(u, d, n + 1, o);
    }
    return t(u, i, n + 1, o);
  }
  if (typeof e == "function" && !Bt(e)) {
    var T = fn(e), N = Ne(e, p);
    return "[Function" + (T ? ": " + T : " (anonymous)") + "]" + (N.length > 0 ? " { " + W.call(N, ", ") + " }" : "");
  }
  if (mr(e)) {
    var b = ye ? j.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : gt.call(e);
    return typeof e == "object" && !ye ? ge(b) : b;
  }
  if (dn(e)) {
    for (var R = "<" + Ct.call(String(e.nodeName)), w = e.attributes || [], D = 0; D < w.length; D++)
      R += " " + w[D].name + "=" + dr(en(w[D].value), "double", i);
    return R += ">", e.childNodes && e.childNodes.length && (R += "..."), R += "</" + Ct.call(String(e.nodeName)) + ">", R;
  }
  if (wt(e)) {
    if (e.length === 0)
      return "[]";
    var O = Ne(e, p);
    return m && !gn(O) ? "[" + bt(O, m) + "]" : "[ " + W.call(O, ", ") + " ]";
  }
  if (rn(e)) {
    var I = Ne(e, p);
    return !("cause" in Error.prototype) && "cause" in e && !yr.call(e, "cause") ? "{ [" + String(e) + "] " + W.call(It.call("[cause]: " + p(e.cause), I), ", ") + " }" : I.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + W.call(I, ", ") + " }";
  }
  if (typeof e == "object" && a) {
    if (qt && typeof e[qt] == "function" && vt)
      return vt(e, { depth: h - n });
    if (a !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if (ln(e)) {
    var _ = [];
    return Nt && Nt.call(e, function(u, f) {
      _.push(p(f, e, !0) + " => " + p(u, e));
    }), zt("Map", Fe.call(e), _, m);
  }
  if (yn(e)) {
    var M = [];
    return Rt && Rt.call(e, function(u) {
      M.push(p(u, e));
    }), zt("Set", De.call(e), M, m);
  }
  if (cn(e))
    return Ve("WeakMap");
  if (hn(e))
    return Ve("WeakSet");
  if (pn(e))
    return Ve("WeakRef");
  if (on(e))
    return ge(p(Number(e)));
  if (sn(e))
    return ge(p(mt.call(e)));
  if (an(e))
    return ge(Kr.call(e));
  if (nn(e))
    return ge(p(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && e === globalThis || typeof _t < "u" && e === _t)
    return "{ [object globalThis] }";
  if (!tn(e) && !Bt(e)) {
    var q = Ne(e, p), z = Ft ? Ft(e) === Object.prototype : e instanceof Object || e.constructor === Object, A = e instanceof Object ? "" : "null prototype", k = !z && be && Object(e) === e && be in e ? Et.call(Z(e), 8, -1) : A ? "Object" : "", ee = z || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", V = ee + (k || A ? "[" + W.call(It.call([], k || [], A || []), ": ") + "] " : "");
    return q.length === 0 ? V + "{}" : m ? V + "{" + bt(q, m) + "}" : V + "{ " + W.call(q, ", ") + " }";
  }
  return String(e);
};
function dr(t, e, r) {
  var n = r.quoteStyle || e, o = hr[n];
  return o + t + o;
}
function en(t) {
  return j.call(String(t), /"/g, "&quot;");
}
function ae(t) {
  return !be || !(typeof t == "object" && (be in t || typeof t[be] < "u"));
}
function wt(t) {
  return Z(t) === "[object Array]" && ae(t);
}
function tn(t) {
  return Z(t) === "[object Date]" && ae(t);
}
function Bt(t) {
  return Z(t) === "[object RegExp]" && ae(t);
}
function rn(t) {
  return Z(t) === "[object Error]" && ae(t);
}
function nn(t) {
  return Z(t) === "[object String]" && ae(t);
}
function on(t) {
  return Z(t) === "[object Number]" && ae(t);
}
function an(t) {
  return Z(t) === "[object Boolean]" && ae(t);
}
function mr(t) {
  if (ye)
    return t && typeof t == "object" && t instanceof Symbol;
  if (typeof t == "symbol")
    return !0;
  if (!t || typeof t != "object" || !gt)
    return !1;
  try {
    return gt.call(t), !0;
  } catch {
  }
  return !1;
}
function sn(t) {
  if (!t || typeof t != "object" || !mt)
    return !1;
  try {
    return mt.call(t), !0;
  } catch {
  }
  return !1;
}
var un = Object.prototype.hasOwnProperty || function(t) {
  return t in this;
};
function Q(t, e) {
  return un.call(t, e);
}
function Z(t) {
  return Vr.call(t);
}
function fn(t) {
  if (t.name)
    return t.name;
  var e = Xr.call(Qr.call(t), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function gr(t, e) {
  if (t.indexOf)
    return t.indexOf(e);
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] === e)
      return r;
  return -1;
}
function ln(t) {
  if (!Fe || !t || typeof t != "object")
    return !1;
  try {
    Fe.call(t);
    try {
      De.call(t);
    } catch {
      return !0;
    }
    return t instanceof Map;
  } catch {
  }
  return !1;
}
function cn(t) {
  if (!ve || !t || typeof t != "object")
    return !1;
  try {
    ve.call(t, ve);
    try {
      we.call(t, we);
    } catch {
      return !0;
    }
    return t instanceof WeakMap;
  } catch {
  }
  return !1;
}
function pn(t) {
  if (!xt || !t || typeof t != "object")
    return !1;
  try {
    return xt.call(t), !0;
  } catch {
  }
  return !1;
}
function yn(t) {
  if (!De || !t || typeof t != "object")
    return !1;
  try {
    De.call(t);
    try {
      Fe.call(t);
    } catch {
      return !0;
    }
    return t instanceof Set;
  } catch {
  }
  return !1;
}
function hn(t) {
  if (!we || !t || typeof t != "object")
    return !1;
  try {
    we.call(t, we);
    try {
      ve.call(t, ve);
    } catch {
      return !0;
    }
    return t instanceof WeakSet;
  } catch {
  }
  return !1;
}
function dn(t) {
  return !t || typeof t != "object" ? !1 : typeof HTMLElement < "u" && t instanceof HTMLElement ? !0 : typeof t.nodeName == "string" && typeof t.getAttribute == "function";
}
function vr(t, e) {
  if (t.length > e.maxStringLength) {
    var r = t.length - e.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return vr(Et.call(t, 0, e.maxStringLength), e) + n;
  }
  var o = Zr[e.quoteStyle || "single"];
  o.lastIndex = 0;
  var i = j.call(j.call(t, o, "\\$1"), /[\x00-\x1f]/g, mn);
  return dr(i, "single", e);
}
function mn(t) {
  var e = t.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + jr.call(e.toString(16));
}
function ge(t) {
  return "Object(" + t + ")";
}
function Ve(t) {
  return t + " { ? }";
}
function zt(t, e, r, n) {
  var o = n ? bt(r, n) : W.call(r, ", ");
  return t + " (" + e + ") {" + o + "}";
}
function gn(t) {
  for (var e = 0; e < t.length; e++)
    if (gr(t[e], `
`) >= 0)
      return !1;
  return !0;
}
function vn(t, e) {
  var r;
  if (t.indent === "	")
    r = "	";
  else if (typeof t.indent == "number" && t.indent > 0)
    r = W.call(Array(t.indent + 1), " ");
  else
    return null;
  return {
    base: r,
    prev: W.call(Array(e + 1), r)
  };
}
function bt(t, e) {
  if (t.length === 0)
    return "";
  var r = `
` + e.prev + e.base;
  return r + W.call(t, "," + r) + `
` + e.prev;
}
function Ne(t, e) {
  var r = wt(t), n = [];
  if (r) {
    n.length = t.length;
    for (var o = 0; o < t.length; o++)
      n[o] = Q(t, o) ? e(t[o], t) : "";
  }
  var i = typeof Ke == "function" ? Ke(t) : [], a;
  if (ye) {
    a = {};
    for (var s = 0; s < i.length; s++)
      a["$" + i[s]] = i[s];
  }
  for (var y in t)
    Q(t, y) && (r && String(Number(y)) === y && y < t.length || ye && a["$" + y] instanceof Symbol || (pr.call(/[^\w$]/, y) ? n.push(e(y, t) + ": " + e(t[y], t)) : n.push(y + ": " + e(t[y], t))));
  if (typeof Ke == "function")
    for (var c = 0; c < i.length; c++)
      yr.call(t, i[c]) && n.push("[" + e(i[c]) + "]: " + e(t[i[c]], t));
  return n;
}
var wn = ze, bn = me, ke = function(t, e, r) {
  for (var n = t, o; (o = n.next) != null; n = o)
    if (o.key === e)
      return n.next = o.next, r || (o.next = /** @type {NonNullable<typeof list.next>} */
      t.next, t.next = o), o;
}, Sn = function(t, e) {
  if (t) {
    var r = ke(t, e);
    return r && r.value;
  }
}, On = function(t, e, r) {
  var n = ke(t, e);
  n ? n.value = r : t.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: e,
    next: t.next,
    value: r
  };
}, En = function(t, e) {
  return t ? !!ke(t, e) : !1;
}, Tn = function(t, e) {
  if (t)
    return ke(t, e, !0);
}, Pn = function() {
  var e, r = {
    assert: function(n) {
      if (!r.has(n))
        throw new bn("Side channel does not contain " + wn(n));
    },
    delete: function(n) {
      var o = e && e.next, i = Tn(e, n);
      return i && o && o === i && (e = void 0), !!i;
    },
    get: function(n) {
      return Sn(e, n);
    },
    has: function(n) {
      return En(e, n);
    },
    set: function(n, o) {
      e || (e = {
        next: void 0
      }), On(
        /** @type {NonNullable<typeof $o>} */
        e,
        n,
        o
      );
    }
  };
  return r;
}, wr = Object, An = Error, _n = EvalError, Nn = RangeError, Rn = ReferenceError, xn = SyntaxError, Cn = URIError, In = Math.abs, $n = Math.floor, Fn = Math.max, Dn = Math.min, Mn = Math.pow, qn = Math.round, Bn = Number.isNaN || function(e) {
  return e !== e;
}, zn = Bn, kn = function(e) {
  return zn(e) || e === 0 ? e : e < 0 ? -1 : 1;
}, Un = Object.getOwnPropertyDescriptor, xe = Un;
if (xe)
  try {
    xe([], "length");
  } catch {
    xe = null;
  }
var br = xe, Ce = Object.defineProperty || !1;
if (Ce)
  try {
    Ce({}, "a", { value: 1 });
  } catch {
    Ce = !1;
  }
var Ln = Ce, Qe, kt;
function Jn() {
  return kt || (kt = 1, Qe = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, r = Symbol("test"), n = Object(r);
    if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
      return !1;
    var o = 42;
    e[r] = o;
    for (var i in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var a = Object.getOwnPropertySymbols(e);
    if (a.length !== 1 || a[0] !== r || !Object.prototype.propertyIsEnumerable.call(e, r))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var s = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(e, r)
      );
      if (s.value !== o || s.enumerable !== !0)
        return !1;
    }
    return !0;
  }), Qe;
}
var Xe, Ut;
function Hn() {
  if (Ut) return Xe;
  Ut = 1;
  var t = typeof Symbol < "u" && Symbol, e = Jn();
  return Xe = function() {
    return typeof t != "function" || typeof Symbol != "function" || typeof t("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, Xe;
}
var je, Lt;
function Sr() {
  return Lt || (Lt = 1, je = typeof Reflect < "u" && Reflect.getPrototypeOf || null), je;
}
var Ye, Jt;
function Or() {
  if (Jt) return Ye;
  Jt = 1;
  var t = wr;
  return Ye = t.getPrototypeOf || null, Ye;
}
var Ze, Ht;
function Gn() {
  if (Ht) return Ze;
  Ht = 1;
  var t = "Function.prototype.bind called on incompatible ", e = Object.prototype.toString, r = Math.max, n = "[object Function]", o = function(y, c) {
    for (var h = [], m = 0; m < y.length; m += 1)
      h[m] = y[m];
    for (var p = 0; p < c.length; p += 1)
      h[p + y.length] = c[p];
    return h;
  }, i = function(y, c) {
    for (var h = [], m = c, p = 0; m < y.length; m += 1, p += 1)
      h[p] = y[m];
    return h;
  }, a = function(s, y) {
    for (var c = "", h = 0; h < s.length; h += 1)
      c += s[h], h + 1 < s.length && (c += y);
    return c;
  };
  return Ze = function(y) {
    var c = this;
    if (typeof c != "function" || e.apply(c) !== n)
      throw new TypeError(t + c);
    for (var h = i(arguments, 1), m, p = function() {
      if (this instanceof m) {
        var w = c.apply(
          this,
          o(h, arguments)
        );
        return Object(w) === w ? w : this;
      }
      return c.apply(
        y,
        o(h, arguments)
      );
    }, T = r(0, c.length - h.length), N = [], b = 0; b < T; b++)
      N[b] = "$" + b;
    if (m = Function("binder", "return function (" + a(N, ",") + "){ return binder.apply(this,arguments); }")(p), c.prototype) {
      var R = function() {
      };
      R.prototype = c.prototype, m.prototype = new R(), R.prototype = null;
    }
    return m;
  }, Ze;
}
var et, Gt;
function Ue() {
  if (Gt) return et;
  Gt = 1;
  var t = Gn();
  return et = Function.prototype.bind || t, et;
}
var tt, Wt;
function Tt() {
  return Wt || (Wt = 1, tt = Function.prototype.call), tt;
}
var rt, Kt;
function Er() {
  return Kt || (Kt = 1, rt = Function.prototype.apply), rt;
}
var Wn = typeof Reflect < "u" && Reflect && Reflect.apply, Kn = Ue(), Vn = Er(), Qn = Tt(), Xn = Wn, jn = Xn || Kn.call(Qn, Vn), Yn = Ue(), Zn = me, eo = Tt(), to = jn, Tr = function(e) {
  if (e.length < 1 || typeof e[0] != "function")
    throw new Zn("a function is required");
  return to(Yn, eo, e);
}, nt, Vt;
function ro() {
  if (Vt) return nt;
  Vt = 1;
  var t = Tr, e = br, r;
  try {
    r = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (a) {
    if (!a || typeof a != "object" || !("code" in a) || a.code !== "ERR_PROTO_ACCESS")
      throw a;
  }
  var n = !!r && e && e(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), o = Object, i = o.getPrototypeOf;
  return nt = n && typeof n.get == "function" ? t([n.get]) : typeof i == "function" ? (
    /** @type {import('./get')} */
    function(s) {
      return i(s == null ? s : o(s));
    }
  ) : !1, nt;
}
var ot, Qt;
function no() {
  if (Qt) return ot;
  Qt = 1;
  var t = Sr(), e = Or(), r = ro();
  return ot = t ? function(o) {
    return t(o);
  } : e ? function(o) {
    if (!o || typeof o != "object" && typeof o != "function")
      throw new TypeError("getProto: not an object");
    return e(o);
  } : r ? function(o) {
    return r(o);
  } : null, ot;
}
var it, Xt;
function oo() {
  if (Xt) return it;
  Xt = 1;
  var t = Function.prototype.call, e = Object.prototype.hasOwnProperty, r = Ue();
  return it = r.call(t, e), it;
}
var E, io = wr, ao = An, so = _n, uo = Nn, fo = Rn, he = xn, pe = me, lo = Cn, co = In, po = $n, yo = Fn, ho = Dn, mo = Mn, go = qn, vo = kn, Pr = Function, at = function(t) {
  try {
    return Pr('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, Ee = br, wo = Ln, st = function() {
  throw new pe();
}, bo = Ee ? function() {
  try {
    return arguments.callee, st;
  } catch {
    try {
      return Ee(arguments, "callee").get;
    } catch {
      return st;
    }
  }
}() : st, ue = Hn()(), C = no(), So = Or(), Oo = Sr(), Ar = Er(), Pe = Tt(), le = {}, Eo = typeof Uint8Array > "u" || !C ? E : C(Uint8Array), ne = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? E : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? E : ArrayBuffer,
  "%ArrayIteratorPrototype%": ue && C ? C([][Symbol.iterator]()) : E,
  "%AsyncFromSyncIteratorPrototype%": E,
  "%AsyncFunction%": le,
  "%AsyncGenerator%": le,
  "%AsyncGeneratorFunction%": le,
  "%AsyncIteratorPrototype%": le,
  "%Atomics%": typeof Atomics > "u" ? E : Atomics,
  "%BigInt%": typeof BigInt > "u" ? E : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? E : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? E : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? E : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": ao,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": so,
  "%Float16Array%": typeof Float16Array > "u" ? E : Float16Array,
  "%Float32Array%": typeof Float32Array > "u" ? E : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? E : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? E : FinalizationRegistry,
  "%Function%": Pr,
  "%GeneratorFunction%": le,
  "%Int8Array%": typeof Int8Array > "u" ? E : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? E : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? E : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": ue && C ? C(C([][Symbol.iterator]())) : E,
  "%JSON%": typeof JSON == "object" ? JSON : E,
  "%Map%": typeof Map > "u" ? E : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !ue || !C ? E : C((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": io,
  "%Object.getOwnPropertyDescriptor%": Ee,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? E : Promise,
  "%Proxy%": typeof Proxy > "u" ? E : Proxy,
  "%RangeError%": uo,
  "%ReferenceError%": fo,
  "%Reflect%": typeof Reflect > "u" ? E : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? E : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !ue || !C ? E : C((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? E : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": ue && C ? C(""[Symbol.iterator]()) : E,
  "%Symbol%": ue ? Symbol : E,
  "%SyntaxError%": he,
  "%ThrowTypeError%": bo,
  "%TypedArray%": Eo,
  "%TypeError%": pe,
  "%Uint8Array%": typeof Uint8Array > "u" ? E : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? E : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? E : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? E : Uint32Array,
  "%URIError%": lo,
  "%WeakMap%": typeof WeakMap > "u" ? E : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? E : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? E : WeakSet,
  "%Function.prototype.call%": Pe,
  "%Function.prototype.apply%": Ar,
  "%Object.defineProperty%": wo,
  "%Object.getPrototypeOf%": So,
  "%Math.abs%": co,
  "%Math.floor%": po,
  "%Math.max%": yo,
  "%Math.min%": ho,
  "%Math.pow%": mo,
  "%Math.round%": go,
  "%Math.sign%": vo,
  "%Reflect.getPrototypeOf%": Oo
};
if (C)
  try {
    null.error;
  } catch (t) {
    var To = C(C(t));
    ne["%Error.prototype%"] = To;
  }
var Po = function t(e) {
  var r;
  if (e === "%AsyncFunction%")
    r = at("async function () {}");
  else if (e === "%GeneratorFunction%")
    r = at("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    r = at("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var n = t("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var o = t("%AsyncGenerator%");
    o && C && (r = C(o.prototype));
  }
  return ne[e] = r, r;
}, jt = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, Ae = Ue(), Me = oo(), Ao = Ae.call(Pe, Array.prototype.concat), _o = Ae.call(Ar, Array.prototype.splice), Yt = Ae.call(Pe, String.prototype.replace), qe = Ae.call(Pe, String.prototype.slice), No = Ae.call(Pe, RegExp.prototype.exec), Ro = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, xo = /\\(\\)?/g, Co = function(e) {
  var r = qe(e, 0, 1), n = qe(e, -1);
  if (r === "%" && n !== "%")
    throw new he("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new he("invalid intrinsic syntax, expected opening `%`");
  var o = [];
  return Yt(e, Ro, function(i, a, s, y) {
    o[o.length] = s ? Yt(y, xo, "$1") : a || i;
  }), o;
}, Io = function(e, r) {
  var n = e, o;
  if (Me(jt, n) && (o = jt[n], n = "%" + o[0] + "%"), Me(ne, n)) {
    var i = ne[n];
    if (i === le && (i = Po(n)), typeof i > "u" && !r)
      throw new pe("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: o,
      name: n,
      value: i
    };
  }
  throw new he("intrinsic " + e + " does not exist!");
}, Pt = function(e, r) {
  if (typeof e != "string" || e.length === 0)
    throw new pe("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new pe('"allowMissing" argument must be a boolean');
  if (No(/^%?[^%]*%?$/, e) === null)
    throw new he("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = Co(e), o = n.length > 0 ? n[0] : "", i = Io("%" + o + "%", r), a = i.name, s = i.value, y = !1, c = i.alias;
  c && (o = c[0], _o(n, Ao([0, 1], c)));
  for (var h = 1, m = !0; h < n.length; h += 1) {
    var p = n[h], T = qe(p, 0, 1), N = qe(p, -1);
    if ((T === '"' || T === "'" || T === "`" || N === '"' || N === "'" || N === "`") && T !== N)
      throw new he("property names with quotes must have matching quotes");
    if ((p === "constructor" || !m) && (y = !0), o += "." + p, a = "%" + o + "%", Me(ne, a))
      s = ne[a];
    else if (s != null) {
      if (!(p in s)) {
        if (!r)
          throw new pe("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (Ee && h + 1 >= n.length) {
        var b = Ee(s, p);
        m = !!b, m && "get" in b && !("originalValue" in b.get) ? s = b.get : s = s[p];
      } else
        m = Me(s, p), s = s[p];
      m && !y && (ne[a] = s);
    }
  }
  return s;
}, _r = Pt, Nr = Tr, $o = Nr([_r("%String.prototype.indexOf%")]), Rr = function(e, r) {
  var n = (
    /** @type {(this: unknown, ...args: unknown[]) => unknown} */
    _r(e, !!r)
  );
  return typeof n == "function" && $o(e, ".prototype.") > -1 ? Nr(
    /** @type {const} */
    [n]
  ) : n;
}, Fo = Pt, _e = Rr, Do = ze, Mo = me, Zt = Fo("%Map%", !0), qo = _e("Map.prototype.get", !0), Bo = _e("Map.prototype.set", !0), zo = _e("Map.prototype.has", !0), ko = _e("Map.prototype.delete", !0), Uo = _e("Map.prototype.size", !0), xr = !!Zt && /** @type {Exclude<import('.'), false>} */
function() {
  var e, r = {
    assert: function(n) {
      if (!r.has(n))
        throw new Mo("Side channel does not contain " + Do(n));
    },
    delete: function(n) {
      if (e) {
        var o = ko(e, n);
        return Uo(e) === 0 && (e = void 0), o;
      }
      return !1;
    },
    get: function(n) {
      if (e)
        return qo(e, n);
    },
    has: function(n) {
      return e ? zo(e, n) : !1;
    },
    set: function(n, o) {
      e || (e = new Zt()), Bo(e, n, o);
    }
  };
  return r;
}, Lo = Pt, Le = Rr, Jo = ze, Re = xr, Ho = me, fe = Lo("%WeakMap%", !0), Go = Le("WeakMap.prototype.get", !0), Wo = Le("WeakMap.prototype.set", !0), Ko = Le("WeakMap.prototype.has", !0), Vo = Le("WeakMap.prototype.delete", !0), Qo = fe ? (
  /** @type {Exclude<import('.'), false>} */
  function() {
    var e, r, n = {
      assert: function(o) {
        if (!n.has(o))
          throw new Ho("Side channel does not contain " + Jo(o));
      },
      delete: function(o) {
        if (fe && o && (typeof o == "object" || typeof o == "function")) {
          if (e)
            return Vo(e, o);
        } else if (Re && r)
          return r.delete(o);
        return !1;
      },
      get: function(o) {
        return fe && o && (typeof o == "object" || typeof o == "function") && e ? Go(e, o) : r && r.get(o);
      },
      has: function(o) {
        return fe && o && (typeof o == "object" || typeof o == "function") && e ? Ko(e, o) : !!r && r.has(o);
      },
      set: function(o, i) {
        fe && o && (typeof o == "object" || typeof o == "function") ? (e || (e = new fe()), Wo(e, o, i)) : Re && (r || (r = Re()), r.set(o, i));
      }
    };
    return n;
  }
) : Re, Xo = me, jo = ze, Yo = Pn, Zo = xr, ei = Qo, ti = ei || Zo || Yo, ri = function() {
  var e, r = {
    assert: function(n) {
      if (!r.has(n))
        throw new Xo("Side channel does not contain " + jo(n));
    },
    delete: function(n) {
      return !!e && e.delete(n);
    },
    get: function(n) {
      return e && e.get(n);
    },
    has: function(n) {
      return !!e && e.has(n);
    },
    set: function(n, o) {
      e || (e = ti()), e.set(n, o);
    }
  };
  return r;
}, ni = String.prototype.replace, oi = /%20/g, er = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, Cr = {
  default: er.RFC3986,
  formatters: {
    RFC1738: function(t) {
      return ni.call(t, oi, "+");
    },
    RFC3986: function(t) {
      return String(t);
    }
  },
  RFC1738: er.RFC1738
}, ii = Cr, ut = Object.prototype.hasOwnProperty, te = Array.isArray, H = function() {
  for (var t = [], e = 0; e < 256; ++e)
    t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return t;
}(), ai = function(e) {
  for (; e.length > 1; ) {
    var r = e.pop(), n = r.obj[r.prop];
    if (te(n)) {
      for (var o = [], i = 0; i < n.length; ++i)
        typeof n[i] < "u" && o.push(n[i]);
      r.obj[r.prop] = o;
    }
  }
}, Ir = function(e, r) {
  for (var n = r && r.plainObjects ? { __proto__: null } : {}, o = 0; o < e.length; ++o)
    typeof e[o] < "u" && (n[o] = e[o]);
  return n;
}, si = function t(e, r, n) {
  if (!r)
    return e;
  if (typeof r != "object" && typeof r != "function") {
    if (te(e))
      e.push(r);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !ut.call(Object.prototype, r)) && (e[r] = !0);
    else
      return [e, r];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(r);
  var o = e;
  return te(e) && !te(r) && (o = Ir(e, n)), te(e) && te(r) ? (r.forEach(function(i, a) {
    if (ut.call(e, a)) {
      var s = e[a];
      s && typeof s == "object" && i && typeof i == "object" ? e[a] = t(s, i, n) : e.push(i);
    } else
      e[a] = i;
  }), e) : Object.keys(r).reduce(function(i, a) {
    var s = r[a];
    return ut.call(i, a) ? i[a] = t(i[a], s, n) : i[a] = s, i;
  }, o);
}, ui = function(e, r) {
  return Object.keys(r).reduce(function(n, o) {
    return n[o] = r[o], n;
  }, e);
}, fi = function(t, e, r) {
  var n = t.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, ft = 1024, li = function(e, r, n, o, i) {
  if (e.length === 0)
    return e;
  var a = e;
  if (typeof e == "symbol" ? a = Symbol.prototype.toString.call(e) : typeof e != "string" && (a = String(e)), n === "iso-8859-1")
    return escape(a).replace(/%u[0-9a-f]{4}/gi, function(T) {
      return "%26%23" + parseInt(T.slice(2), 16) + "%3B";
    });
  for (var s = "", y = 0; y < a.length; y += ft) {
    for (var c = a.length >= ft ? a.slice(y, y + ft) : a, h = [], m = 0; m < c.length; ++m) {
      var p = c.charCodeAt(m);
      if (p === 45 || p === 46 || p === 95 || p === 126 || p >= 48 && p <= 57 || p >= 65 && p <= 90 || p >= 97 && p <= 122 || i === ii.RFC1738 && (p === 40 || p === 41)) {
        h[h.length] = c.charAt(m);
        continue;
      }
      if (p < 128) {
        h[h.length] = H[p];
        continue;
      }
      if (p < 2048) {
        h[h.length] = H[192 | p >> 6] + H[128 | p & 63];
        continue;
      }
      if (p < 55296 || p >= 57344) {
        h[h.length] = H[224 | p >> 12] + H[128 | p >> 6 & 63] + H[128 | p & 63];
        continue;
      }
      m += 1, p = 65536 + ((p & 1023) << 10 | c.charCodeAt(m) & 1023), h[h.length] = H[240 | p >> 18] + H[128 | p >> 12 & 63] + H[128 | p >> 6 & 63] + H[128 | p & 63];
    }
    s += h.join("");
  }
  return s;
}, ci = function(e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], n = [], o = 0; o < r.length; ++o)
    for (var i = r[o], a = i.obj[i.prop], s = Object.keys(a), y = 0; y < s.length; ++y) {
      var c = s[y], h = a[c];
      typeof h == "object" && h !== null && n.indexOf(h) === -1 && (r.push({ obj: a, prop: c }), n.push(h));
    }
  return ai(r), e;
}, pi = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, yi = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, hi = function(e, r) {
  return [].concat(e, r);
}, di = function(e, r) {
  if (te(e)) {
    for (var n = [], o = 0; o < e.length; o += 1)
      n.push(r(e[o]));
    return n;
  }
  return r(e);
}, mi = {
  arrayToObject: Ir,
  assign: ui,
  combine: hi,
  compact: ci,
  decode: fi,
  encode: li,
  isBuffer: yi,
  isRegExp: pi,
  maybeMap: di,
  merge: si
}, $r = ri, Ie = mi, Se = Cr, gi = Object.prototype.hasOwnProperty, Fr = {
  brackets: function(e) {
    return e + "[]";
  },
  comma: "comma",
  indices: function(e, r) {
    return e + "[" + r + "]";
  },
  repeat: function(e) {
    return e;
  }
}, G = Array.isArray, vi = Array.prototype.push, Dr = function(t, e) {
  vi.apply(t, G(e) ? e : [e]);
}, wi = Date.prototype.toISOString, tr = Se.default, x = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  commaRoundTrip: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: Ie.encode,
  encodeValuesOnly: !1,
  filter: void 0,
  format: tr,
  formatter: Se.formatters[tr],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return wi.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, bi = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, lt = {}, Si = function t(e, r, n, o, i, a, s, y, c, h, m, p, T, N, b, R, w, D) {
  for (var O = e, I = D, _ = 0, M = !1; (I = I.get(lt)) !== void 0 && !M; ) {
    var q = I.get(e);
    if (_ += 1, typeof q < "u") {
      if (q === _)
        throw new RangeError("Cyclic object value");
      M = !0;
    }
    typeof I.get(lt) > "u" && (_ = 0);
  }
  if (typeof h == "function" ? O = h(r, O) : O instanceof Date ? O = T(O) : n === "comma" && G(O) && (O = Ie.maybeMap(O, function(J) {
    return J instanceof Date ? T(J) : J;
  })), O === null) {
    if (a)
      return c && !R ? c(r, x.encoder, w, "key", N) : r;
    O = "";
  }
  if (bi(O) || Ie.isBuffer(O)) {
    if (c) {
      var z = R ? r : c(r, x.encoder, w, "key", N);
      return [b(z) + "=" + b(c(O, x.encoder, w, "value", N))];
    }
    return [b(r) + "=" + b(String(O))];
  }
  var A = [];
  if (typeof O > "u")
    return A;
  var k;
  if (n === "comma" && G(O))
    R && c && (O = Ie.maybeMap(O, c)), k = [{ value: O.length > 0 ? O.join(",") || null : void 0 }];
  else if (G(h))
    k = h;
  else {
    var ee = Object.keys(O);
    k = m ? ee.sort(m) : ee;
  }
  var V = y ? String(r).replace(/\./g, "%2E") : String(r), u = o && G(O) && O.length === 1 ? V + "[]" : V;
  if (i && G(O) && O.length === 0)
    return u + "[]";
  for (var f = 0; f < k.length; ++f) {
    var l = k[f], d = typeof l == "object" && l && typeof l.value < "u" ? l.value : O[l];
    if (!(s && d === null)) {
      var g = p && y ? String(l).replace(/\./g, "%2E") : String(l), S = G(O) ? typeof n == "function" ? n(u, g) : u : u + (p ? "." + g : "[" + g + "]");
      D.set(e, _);
      var $ = $r();
      $.set(lt, D), Dr(A, t(
        d,
        S,
        n,
        o,
        i,
        a,
        s,
        y,
        n === "comma" && R && G(O) ? null : c,
        h,
        m,
        p,
        T,
        N,
        b,
        R,
        w,
        $
      ));
    }
  }
  return A;
}, Oi = function(e) {
  if (!e)
    return x;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.encodeDotInKeys < "u" && typeof e.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var r = e.charset || x.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = Se.default;
  if (typeof e.format < "u") {
    if (!gi.call(Se.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var o = Se.formatters[n], i = x.filter;
  (typeof e.filter == "function" || G(e.filter)) && (i = e.filter);
  var a;
  if (e.arrayFormat in Fr ? a = e.arrayFormat : "indices" in e ? a = e.indices ? "indices" : "repeat" : a = x.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var s = typeof e.allowDots > "u" ? e.encodeDotInKeys === !0 ? !0 : x.allowDots : !!e.allowDots;
  return {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : x.addQueryPrefix,
    allowDots: s,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : x.allowEmptyArrays,
    arrayFormat: a,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : x.charsetSentinel,
    commaRoundTrip: !!e.commaRoundTrip,
    delimiter: typeof e.delimiter > "u" ? x.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : x.encode,
    encodeDotInKeys: typeof e.encodeDotInKeys == "boolean" ? e.encodeDotInKeys : x.encodeDotInKeys,
    encoder: typeof e.encoder == "function" ? e.encoder : x.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : x.encodeValuesOnly,
    filter: i,
    format: n,
    formatter: o,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : x.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : x.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : x.strictNullHandling
  };
}, Ei = function(t, e) {
  var r = t, n = Oi(e), o, i;
  typeof n.filter == "function" ? (i = n.filter, r = i("", r)) : G(n.filter) && (i = n.filter, o = i);
  var a = [];
  if (typeof r != "object" || r === null)
    return "";
  var s = Fr[n.arrayFormat], y = s === "comma" && n.commaRoundTrip;
  o || (o = Object.keys(r)), n.sort && o.sort(n.sort);
  for (var c = $r(), h = 0; h < o.length; ++h) {
    var m = o[h], p = r[m];
    n.skipNulls && p === null || Dr(a, Si(
      p,
      m,
      s,
      y,
      n.allowEmptyArrays,
      n.strictNullHandling,
      n.skipNulls,
      n.encodeDotInKeys,
      n.encode ? n.encoder : null,
      n.filter,
      n.sort,
      n.allowDots,
      n.serializeDate,
      n.format,
      n.formatter,
      n.encodeValuesOnly,
      n.charset,
      c
    ));
  }
  var T = a.join(n.delimiter), N = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? N += "utf8=%26%2310003%3B&" : N += "utf8=%E2%9C%93&"), T.length > 0 ? N + T : "";
}, Ti = Ei, Pi = {
  stringify: Ti
}, Je = {};
(function(t) {
  function e(o, i) {
    var a = typeof Symbol < "u" && o[Symbol.iterator] || o["@@iterator"];
    if (!a) {
      if (Array.isArray(o) || (a = r(o)) || i) {
        a && (o = a);
        var s = 0, y = function() {
        };
        return { s: y, n: function() {
          return s >= o.length ? { done: !0 } : { done: !1, value: o[s++] };
        }, e: function(T) {
          throw T;
        }, f: y };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var c = !0, h = !1, m;
    return { s: function() {
      a = a.call(o);
    }, n: function() {
      var T = a.next();
      return c = T.done, T;
    }, e: function(T) {
      h = !0, m = T;
    }, f: function() {
      try {
        !c && a.return != null && a.return();
      } finally {
        if (h) throw m;
      }
    } };
  }
  function r(o, i) {
    if (o) {
      if (typeof o == "string") return n(o, i);
      var a = Object.prototype.toString.call(o).slice(8, -1);
      if (a === "Object" && o.constructor && (a = o.constructor.name), a === "Map" || a === "Set") return Array.from(o);
      if (a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)) return n(o, i);
    }
  }
  function n(o, i) {
    (i == null || i > o.length) && (i = o.length);
    for (var a = 0, s = new Array(i); a < i; a++) s[a] = o[a];
    return s;
  }
  t.type = (o) => o.split(/ *; */).shift(), t.params = (o) => {
    const i = {};
    var a = e(o.split(/ *; */)), s;
    try {
      for (a.s(); !(s = a.n()).done; ) {
        const c = s.value.split(/ *= */), h = c.shift(), m = c.shift();
        h && m && (i[h] = m);
      }
    } catch (y) {
      a.e(y);
    } finally {
      a.f();
    }
    return i;
  }, t.parseLinks = (o) => {
    const i = {};
    var a = e(o.split(/ *, */)), s;
    try {
      for (a.s(); !(s = a.n()).done; ) {
        const c = s.value.split(/ *; */), h = c[0].slice(1, -1), m = c[1].split(/ *= */)[1].slice(1, -1);
        i[m] = h;
      }
    } catch (y) {
      a.e(y);
    } finally {
      a.f();
    }
    return i;
  }, t.cleanHeader = (o, i) => (delete o["content-type"], delete o["content-length"], delete o["transfer-encoding"], delete o.host, i && (delete o.authorization, delete o.cookie), o), t.isObject = (o) => o !== null && typeof o == "object", t.hasOwn = Object.hasOwn || function(o, i) {
    if (o == null)
      throw new TypeError("Cannot convert undefined or null to object");
    return Object.prototype.hasOwnProperty.call(new Object(o), i);
  }, t.mixin = (o, i) => {
    for (const a in i)
      t.hasOwn(i, a) && (o[a] = i[a]);
  };
})(Je);
const rr = cr, Mr = Je, Be = Mr.isObject, Te = Mr.hasOwn;
var Ai = P;
function P() {
}
P.prototype.clearTimeout = function() {
  return clearTimeout(this._timer), clearTimeout(this._responseTimeoutTimer), clearTimeout(this._uploadTimeoutTimer), delete this._timer, delete this._responseTimeoutTimer, delete this._uploadTimeoutTimer, this;
};
P.prototype.parse = function(t) {
  return this._parser = t, this;
};
P.prototype.responseType = function(t) {
  return this._responseType = t, this;
};
P.prototype.serialize = function(t) {
  return this._serializer = t, this;
};
P.prototype.timeout = function(t) {
  if (!t || typeof t != "object")
    return this._timeout = t, this._responseTimeout = 0, this._uploadTimeout = 0, this;
  for (const e in t)
    if (Te(t, e))
      switch (e) {
        case "deadline":
          this._timeout = t.deadline;
          break;
        case "response":
          this._responseTimeout = t.response;
          break;
        case "upload":
          this._uploadTimeout = t.upload;
          break;
        default:
          console.warn("Unknown timeout option", e);
      }
  return this;
};
P.prototype.retry = function(t, e) {
  return (arguments.length === 0 || t === !0) && (t = 1), t <= 0 && (t = 0), this._maxRetries = t, this._retries = 0, this._retryCallback = e, this;
};
const _i = /* @__PURE__ */ new Set(["ETIMEDOUT", "ECONNRESET", "EADDRINUSE", "ECONNREFUSED", "EPIPE", "ENOTFOUND", "ENETUNREACH", "EAI_AGAIN"]), Ni = /* @__PURE__ */ new Set([408, 413, 429, 500, 502, 503, 504, 521, 522, 524]);
P.prototype._shouldRetry = function(t, e) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries)
    return !1;
  if (this._retryCallback)
    try {
      const r = this._retryCallback(t, e);
      if (r === !0) return !0;
      if (r === !1) return !1;
    } catch (r) {
      console.error(r);
    }
  return !!(e && e.status && Ni.has(e.status) || t && (t.code && _i.has(t.code) || t.timeout && t.code === "ECONNABORTED" || t.crossDomain));
};
P.prototype._retry = function() {
  return this.clearTimeout(), this.req && (this.req = null, this.req = this.request()), this._aborted = !1, this.timedout = !1, this.timedoutError = null, this._end();
};
P.prototype.then = function(t, e) {
  if (!this._fullfilledPromise) {
    const r = this;
    this._endCalled && console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"), this._fullfilledPromise = new Promise((n, o) => {
      r.on("abort", () => {
        if (this._maxRetries && this._maxRetries > this._retries)
          return;
        if (this.timedout && this.timedoutError) {
          o(this.timedoutError);
          return;
        }
        const i = new Error("Aborted");
        i.code = "ABORTED", i.status = this.status, i.method = this.method, i.url = this.url, o(i);
      }), r.end((i, a) => {
        i ? o(i) : n(a);
      });
    });
  }
  return this._fullfilledPromise.then(t, e);
};
P.prototype.catch = function(t) {
  return this.then(void 0, t);
};
P.prototype.use = function(t) {
  return t(this), this;
};
P.prototype.ok = function(t) {
  if (typeof t != "function") throw new Error("Callback required");
  return this._okCallback = t, this;
};
P.prototype._isResponseOK = function(t) {
  return t ? this._okCallback ? this._okCallback(t) : t.status >= 200 && t.status < 300 : !1;
};
P.prototype.get = function(t) {
  return this._header[t.toLowerCase()];
};
P.prototype.getHeader = P.prototype.get;
P.prototype.set = function(t, e) {
  if (Be(t)) {
    for (const r in t)
      Te(t, r) && this.set(r, t[r]);
    return this;
  }
  return this._header[t.toLowerCase()] = e, this.header[t] = e, this;
};
P.prototype.unset = function(t) {
  return delete this._header[t.toLowerCase()], delete this.header[t], this;
};
P.prototype.field = function(t, e, r) {
  if (t == null)
    throw new Error(".field(name, val) name can not be empty");
  if (this._data)
    throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  if (Be(t)) {
    for (const n in t)
      Te(t, n) && this.field(n, t[n]);
    return this;
  }
  if (Array.isArray(e)) {
    for (const n in e)
      Te(e, n) && this.field(t, e[n]);
    return this;
  }
  if (e == null)
    throw new Error(".field(name, val) val can not be empty");
  return typeof e == "boolean" && (e = String(e)), r ? this._getFormData().append(t, e, r) : this._getFormData().append(t, e), this;
};
P.prototype.abort = function() {
  if (this._aborted)
    return this;
  if (this._aborted = !0, this.xhr && this.xhr.abort(), this.req) {
    if (rr.gte(process.version, "v13.0.0") && rr.lt(process.version, "v14.0.0"))
      throw new Error("Superagent does not work in v13 properly with abort() due to Node.js core changes");
    this.req.abort();
  }
  return this.clearTimeout(), this.emit("abort"), this;
};
P.prototype._auth = function(t, e, r, n) {
  switch (r.type) {
    case "basic":
      this.set("Authorization", `Basic ${n(`${t}:${e}`)}`);
      break;
    case "auto":
      this.username = t, this.password = e;
      break;
    case "bearer":
      this.set("Authorization", `Bearer ${t}`);
      break;
  }
  return this;
};
P.prototype.withCredentials = function(t) {
  return t === void 0 && (t = !0), this._withCredentials = t, this;
};
P.prototype.redirects = function(t) {
  return this._maxRedirects = t, this;
};
P.prototype.maxResponseSize = function(t) {
  if (typeof t != "number")
    throw new TypeError("Invalid argument");
  return this._maxResponseSize = t, this;
};
P.prototype.toJSON = function() {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};
P.prototype.send = function(t) {
  const e = Be(t);
  let r = this._header["content-type"];
  if (this._formData)
    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  if (e && !this._data)
    Array.isArray(t) ? this._data = [] : this._isHost(t) || (this._data = {});
  else if (t && this._data && this._isHost(this._data))
    throw new Error("Can't merge these send calls");
  if (e && Be(this._data))
    for (const n in t) {
      if (typeof t[n] == "bigint" && !t[n].toJSON) throw new Error("Cannot serialize BigInt value to json");
      Te(t, n) && (this._data[n] = t[n]);
    }
  else {
    if (typeof t == "bigint") throw new Error("Cannot send value of type BigInt");
    typeof t == "string" ? (r || this.type("form"), r = this._header["content-type"], r && (r = r.toLowerCase().trim()), r === "application/x-www-form-urlencoded" ? this._data = this._data ? `${this._data}&${t}` : t : this._data = (this._data || "") + t) : this._data = t;
  }
  return !e || this._isHost(t) ? this : (r || this.type("json"), this);
};
P.prototype.sortQuery = function(t) {
  return this._sort = typeof t > "u" ? !0 : t, this;
};
P.prototype._finalizeQueryString = function() {
  const t = this._query.join("&");
  if (t && (this.url += (this.url.includes("?") ? "&" : "?") + t), this._query.length = 0, this._sort) {
    const e = this.url.indexOf("?");
    if (e >= 0) {
      const r = this.url.slice(e + 1).split("&");
      typeof this._sort == "function" ? r.sort(this._sort) : r.sort(), this.url = this.url.slice(0, e) + "?" + r.join("&");
    }
  }
};
P.prototype._appendQueryString = () => {
  console.warn("Unsupported");
};
P.prototype._timeoutError = function(t, e, r) {
  if (this._aborted)
    return;
  const n = new Error(`${t + e}ms exceeded`);
  n.timeout = e, n.code = "ECONNABORTED", n.errno = r, this.timedout = !0, this.timedoutError = n, this.abort(), this.callback(n);
};
P.prototype._setTimeouts = function() {
  const t = this;
  this._timeout && !this._timer && (this._timer = setTimeout(() => {
    t._timeoutError("Timeout of ", t._timeout, "ETIME");
  }, this._timeout)), this._responseTimeout && !this._responseTimeoutTimer && (this._responseTimeoutTimer = setTimeout(() => {
    t._timeoutError("Response timeout of ", t._responseTimeout, "ETIMEDOUT");
  }, this._responseTimeout));
};
const ct = Je;
var Ri = He;
function He() {
}
He.prototype.get = function(t) {
  return this.header[t.toLowerCase()];
};
He.prototype._setHeaderProperties = function(t) {
  const e = t["content-type"] || "";
  this.type = ct.type(e);
  const r = ct.params(e);
  for (const n in r)
    Object.prototype.hasOwnProperty.call(r, n) && (this[n] = r[n]);
  this.links = {};
  try {
    t.link && (this.links = ct.parseLinks(t.link));
  } catch {
  }
};
He.prototype._setStatusProperties = function(t) {
  const e = Math.trunc(t / 100);
  this.statusCode = t, this.status = this.statusCode, this.statusType = e, this.info = e === 1, this.ok = e === 2, this.redirect = e === 3, this.clientError = e === 4, this.serverError = e === 5, this.error = e === 4 || e === 5 ? this.toError() : !1, this.created = t === 201, this.accepted = t === 202, this.noContent = t === 204, this.badRequest = t === 400, this.unauthorized = t === 401, this.notAcceptable = t === 406, this.forbidden = t === 403, this.notFound = t === 404, this.unprocessableEntity = t === 422;
};
function xi(t, e) {
  var r = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (!r) {
    if (Array.isArray(t) || (r = Ci(t)) || e) {
      r && (t = r);
      var n = 0, o = function() {
      };
      return { s: o, n: function() {
        return n >= t.length ? { done: !0 } : { done: !1, value: t[n++] };
      }, e: function(c) {
        throw c;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var i = !0, a = !1, s;
  return { s: function() {
    r = r.call(t);
  }, n: function() {
    var c = r.next();
    return i = c.done, c;
  }, e: function(c) {
    a = !0, s = c;
  }, f: function() {
    try {
      !i && r.return != null && r.return();
    } finally {
      if (a) throw s;
    }
  } };
}
function Ci(t, e) {
  if (t) {
    if (typeof t == "string") return nr(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return nr(t, e);
  }
}
function nr(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n;
}
function At() {
  this._defaults = [];
}
for (var pt = 0, or = ["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects", "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert", "disableTLSCerts"]; pt < or.length; pt++) {
  const t = or[pt];
  At.prototype[t] = function() {
    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
      r[n] = arguments[n];
    return this._defaults.push({
      fn: t,
      args: r
    }), this;
  };
}
At.prototype._setDefaults = function(t) {
  var e = xi(this._defaults), r;
  try {
    for (e.s(); !(r = e.n()).done; ) {
      const n = r.value;
      t[n.fn](...n.args);
    }
  } catch (n) {
    e.e(n);
  } finally {
    e.f();
  }
};
var Ii = At;
(function(t, e) {
  function r(u, f) {
    var l = typeof Symbol < "u" && u[Symbol.iterator] || u["@@iterator"];
    if (!l) {
      if (Array.isArray(u) || (l = n(u)) || f) {
        l && (u = l);
        var d = 0, g = function() {
        };
        return { s: g, n: function() {
          return d >= u.length ? { done: !0 } : { done: !1, value: u[d++] };
        }, e: function(se) {
          throw se;
        }, f: g };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var S = !0, $ = !1, J;
    return { s: function() {
      l = l.call(u);
    }, n: function() {
      var se = l.next();
      return S = se.done, se;
    }, e: function(se) {
      $ = !0, J = se;
    }, f: function() {
      try {
        !S && l.return != null && l.return();
      } finally {
        if ($) throw J;
      }
    } };
  }
  function n(u, f) {
    if (u) {
      if (typeof u == "string") return o(u, f);
      var l = Object.prototype.toString.call(u).slice(8, -1);
      if (l === "Object" && u.constructor && (l = u.constructor.name), l === "Map" || l === "Set") return Array.from(u);
      if (l === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l)) return o(u, f);
    }
  }
  function o(u, f) {
    (f == null || f > u.length) && (f = u.length);
    for (var l = 0, d = new Array(f); l < f; l++) d[l] = u[l];
    return d;
  }
  let i;
  typeof window < "u" ? i = window : typeof self > "u" ? (console.warn("Using browser-only version of superagent in non-browser environment"), i = void 0) : i = self;
  const a = zr, s = kr, y = Pi, c = Ai, h = Je, m = h.isObject, p = h.mixin, T = h.hasOwn, N = Ri, b = Ii;
  function R() {
  }
  t.exports = function(u, f) {
    return typeof f == "function" ? new e.Request("GET", u).end(f) : arguments.length === 1 ? new e.Request("GET", u) : new e.Request(u, f);
  }, e = t.exports;
  const w = e;
  e.Request = A, w.getXHR = () => {
    if (i.XMLHttpRequest)
      return new i.XMLHttpRequest();
    throw new Error("Browser-only version of superagent could not find XHR");
  };
  const D = "".trim ? (u) => u.trim() : (u) => u.replace(/(^\s*|\s*$)/g, "");
  function O(u) {
    if (!m(u)) return u;
    const f = [];
    for (const l in u)
      T(u, l) && I(f, l, u[l]);
    return f.join("&");
  }
  function I(u, f, l) {
    if (l !== void 0) {
      if (l === null) {
        u.push(encodeURI(f));
        return;
      }
      if (Array.isArray(l)) {
        var d = r(l), g;
        try {
          for (d.s(); !(g = d.n()).done; ) {
            const S = g.value;
            I(u, f, S);
          }
        } catch (S) {
          d.e(S);
        } finally {
          d.f();
        }
      } else if (m(l))
        for (const S in l)
          T(l, S) && I(u, `${f}[${S}]`, l[S]);
      else
        u.push(encodeURI(f) + "=" + encodeURIComponent(l));
    }
  }
  w.serializeObject = O;
  function _(u) {
    const f = {}, l = u.split("&");
    let d, g;
    for (let S = 0, $ = l.length; S < $; ++S)
      d = l[S], g = d.indexOf("="), g === -1 ? f[decodeURIComponent(d)] = "" : f[decodeURIComponent(d.slice(0, g))] = decodeURIComponent(d.slice(g + 1));
    return f;
  }
  w.parseString = _, w.types = {
    html: "text/html",
    json: "application/json",
    xml: "text/xml",
    urlencoded: "application/x-www-form-urlencoded",
    form: "application/x-www-form-urlencoded",
    "form-data": "application/x-www-form-urlencoded"
  }, w.serialize = {
    "application/x-www-form-urlencoded": y.stringify,
    "application/json": s
  }, w.parse = {
    "application/x-www-form-urlencoded": _,
    "application/json": JSON.parse
  };
  function M(u) {
    const f = u.split(/\r?\n/), l = {};
    let d, g, S, $;
    for (let J = 0, X = f.length; J < X; ++J)
      g = f[J], d = g.indexOf(":"), d !== -1 && (S = g.slice(0, d).toLowerCase(), $ = D(g.slice(d + 1)), l[S] = $);
    return l;
  }
  function q(u) {
    return /[/+]json($|[^-\w])/i.test(u);
  }
  function z(u) {
    this.req = u, this.xhr = this.req.xhr, this.text = this.req.method !== "HEAD" && (this.xhr.responseType === "" || this.xhr.responseType === "text") || typeof this.xhr.responseType > "u" ? this.xhr.responseText : null, this.statusText = this.req.xhr.statusText;
    let f = this.xhr.status;
    f === 1223 && (f = 204), this._setStatusProperties(f), this.headers = M(this.xhr.getAllResponseHeaders()), this.header = this.headers, this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this._setHeaderProperties(this.header), this.text === null && u._responseType ? this.body = this.xhr.response : this.body = this.req.method === "HEAD" ? null : this._parseBody(this.text ? this.text : this.xhr.response);
  }
  p(z.prototype, N.prototype), z.prototype._parseBody = function(u) {
    let f = w.parse[this.type];
    return this.req._parser ? this.req._parser(this, u) : (!f && q(this.type) && (f = w.parse["application/json"]), f && u && (u.length > 0 || u instanceof Object) ? f(u) : null);
  }, z.prototype.toError = function() {
    const u = this.req, f = u.method, l = u.url, d = `cannot ${f} ${l} (${this.status})`, g = new Error(d);
    return g.status = this.status, g.method = f, g.url = l, g;
  }, w.Response = z;
  function A(u, f) {
    const l = this;
    this._query = this._query || [], this.method = u, this.url = f, this.header = {}, this._header = {}, this.on("end", () => {
      let d = null, g = null;
      try {
        g = new z(l);
      } catch ($) {
        return d = new Error("Parser is unable to parse the response"), d.parse = !0, d.original = $, l.xhr ? (d.rawResponse = typeof l.xhr.responseType > "u" ? l.xhr.responseText : l.xhr.response, d.status = l.xhr.status ? l.xhr.status : null, d.statusCode = d.status) : (d.rawResponse = null, d.status = null), l.callback(d);
      }
      l.emit("response", g);
      let S;
      try {
        l._isResponseOK(g) || (S = new Error(g.statusText || g.text || "Unsuccessful HTTP response"));
      } catch ($) {
        S = $;
      }
      S ? (S.original = d, S.response = g, S.status = S.status || g.status, l.callback(S, g)) : l.callback(null, g);
    });
  }
  a(A.prototype), p(A.prototype, c.prototype), A.prototype.type = function(u) {
    return this.set("Content-Type", w.types[u] || u), this;
  }, A.prototype.accept = function(u) {
    return this.set("Accept", w.types[u] || u), this;
  }, A.prototype.auth = function(u, f, l) {
    arguments.length === 1 && (f = ""), typeof f == "object" && f !== null && (l = f, f = ""), l || (l = {
      type: typeof btoa == "function" ? "basic" : "auto"
    });
    const d = l.encoder ? l.encoder : (g) => {
      if (typeof btoa == "function")
        return btoa(g);
      throw new Error("Cannot use basic auth, btoa is not a function");
    };
    return this._auth(u, f, l, d);
  }, A.prototype.query = function(u) {
    return typeof u != "string" && (u = O(u)), u && this._query.push(u), this;
  }, A.prototype.attach = function(u, f, l) {
    if (f) {
      if (this._data)
        throw new Error("superagent can't mix .send() and .attach()");
      this._getFormData().append(u, f, l || f.name);
    }
    return this;
  }, A.prototype._getFormData = function() {
    return this._formData || (this._formData = new i.FormData()), this._formData;
  }, A.prototype.callback = function(u, f) {
    if (this._shouldRetry(u, f))
      return this._retry();
    const l = this._callback;
    this.clearTimeout(), u && (this._maxRetries && (u.retries = this._retries - 1), this.emit("error", u)), l(u, f);
  }, A.prototype.crossDomainError = function() {
    const u = new Error(`Request has been terminated
Possible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.`);
    u.crossDomain = !0, u.status = this.status, u.method = this.method, u.url = this.url, this.callback(u);
  }, A.prototype.agent = function() {
    return console.warn("This is not supported in browser version of superagent"), this;
  }, A.prototype.ca = A.prototype.agent, A.prototype.buffer = A.prototype.ca, A.prototype.write = () => {
    throw new Error("Streaming is not supported in browser version of superagent");
  }, A.prototype.pipe = A.prototype.write, A.prototype._isHost = function(u) {
    return u && typeof u == "object" && !Array.isArray(u) && Object.prototype.toString.call(u) !== "[object Object]";
  }, A.prototype.end = function(u) {
    this._endCalled && console.warn("Warning: .end() was called twice. This is not supported in superagent"), this._endCalled = !0, this._callback = u || R, this._finalizeQueryString(), this._end();
  }, A.prototype._setUploadTimeout = function() {
    const u = this;
    this._uploadTimeout && !this._uploadTimeoutTimer && (this._uploadTimeoutTimer = setTimeout(() => {
      u._timeoutError("Upload timeout of ", u._uploadTimeout, "ETIMEDOUT");
    }, this._uploadTimeout));
  }, A.prototype._end = function() {
    if (this._aborted) return this.callback(new Error("The request has been aborted even before .end() was called"));
    const u = this;
    this.xhr = w.getXHR();
    const f = this.xhr;
    let l = this._formData || this._data;
    this._setTimeouts(), f.addEventListener("readystatechange", () => {
      const g = f.readyState;
      if (g >= 2 && u._responseTimeoutTimer && clearTimeout(u._responseTimeoutTimer), g !== 4)
        return;
      let S;
      try {
        S = f.status;
      } catch {
        S = 0;
      }
      if (!S)
        return u.timedout || u._aborted ? void 0 : u.crossDomainError();
      u.emit("end");
    });
    const d = (g, S) => {
      S.total > 0 && (S.percent = S.loaded / S.total * 100, S.percent === 100 && clearTimeout(u._uploadTimeoutTimer)), S.direction = g, u.emit("progress", S);
    };
    if (this.hasListeners("progress"))
      try {
        f.addEventListener("progress", d.bind(null, "download")), f.upload && f.upload.addEventListener("progress", d.bind(null, "upload"));
      } catch {
      }
    f.upload && this._setUploadTimeout();
    try {
      this.username && this.password ? f.open(this.method, this.url, !0, this.username, this.password) : f.open(this.method, this.url, !0);
    } catch (g) {
      return this.callback(g);
    }
    if (this._withCredentials && (f.withCredentials = !0), !this._formData && this.method !== "GET" && this.method !== "HEAD" && typeof l != "string" && !this._isHost(l)) {
      const g = this._header["content-type"];
      let S = this._serializer || w.serialize[g ? g.split(";")[0] : ""];
      !S && q(g) && (S = w.serialize["application/json"]), S && (l = S(l));
    }
    for (const g in this.header)
      this.header[g] !== null && T(this.header, g) && f.setRequestHeader(g, this.header[g]);
    this._responseType && (f.responseType = this._responseType), this.emit("request", this), f.send(typeof l > "u" ? null : l);
  }, w.agent = () => new b();
  for (var k = 0, ee = ["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"]; k < ee.length; k++) {
    const u = ee[k];
    b.prototype[u.toLowerCase()] = function(f, l) {
      const d = new w.Request(u, f);
      return this._setDefaults(d), l && d.end(l), d;
    };
  }
  b.prototype.del = b.prototype.delete, w.get = (u, f, l) => {
    const d = w("GET", u);
    return typeof f == "function" && (l = f, f = null), f && d.query(f), l && d.end(l), d;
  }, w.head = (u, f, l) => {
    const d = w("HEAD", u);
    return typeof f == "function" && (l = f, f = null), f && d.query(f), l && d.end(l), d;
  }, w.options = (u, f, l) => {
    const d = w("OPTIONS", u);
    return typeof f == "function" && (l = f, f = null), f && d.send(f), l && d.end(l), d;
  };
  function V(u, f, l) {
    const d = w("DELETE", u);
    return typeof f == "function" && (l = f, f = null), f && d.send(f), l && d.end(l), d;
  }
  w.del = V, w.delete = V, w.patch = (u, f, l) => {
    const d = w("PATCH", u);
    return typeof f == "function" && (l = f, f = null), f && d.send(f), l && d.end(l), d;
  }, w.post = (u, f, l) => {
    const d = w("POST", u);
    return typeof f == "function" && (l = f, f = null), f && d.send(f), l && d.end(l), d;
  }, w.put = (u, f, l) => {
    const d = w("PUT", u);
    return typeof f == "function" && (l = f, f = null), f && d.send(f), l && d.end(l), d;
  };
})(yt, yt.exports);
var $i = yt.exports;
const ir = /* @__PURE__ */ qr($i);
class v {
  /**
   * The base URL against which to resolve every API call's (relative) path.
   * Overrides the default value set in spec file if present
   * @param {String} basePath
   */
  constructor(e = "http://localhost:8080") {
    this.basePath = e.replace(/\/+$/, ""), this.authentications = {}, this.defaultHeaders = {
      "User-Agent": "OpenAPI-Generator/v0/Javascript"
    }, this.timeout = 6e4, this.cache = !0, this.enableCookies = !1, typeof window > "u" && (this.agent = new ir.agent()), this.requestAgent = null, this.plugins = null;
  }
  /**
  * Returns a string representation for an actual parameter.
  * @param param The actual parameter.
  * @returns {String} The string representation of <code>param</code>.
  */
  paramToString(e) {
    return e == null || e == null ? "" : e instanceof Date ? e.toJSON() : v.canBeJsonified(e) ? JSON.stringify(e) : e.toString();
  }
  /**
  * Returns a boolean indicating if the parameter could be JSON.stringified
  * @param param The actual parameter
  * @returns {Boolean} Flag indicating if <code>param</code> can be JSON.stringified
  */
  static canBeJsonified(e) {
    if (typeof e != "string" && typeof e != "object") return !1;
    try {
      const r = e.toString();
      return r === "[object Object]" || r === "[object Array]";
    } catch {
      return !1;
    }
  }
  /**
   * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
   * NOTE: query parameters are not handled here.
   * @param {String} path The path to append to the base URL.
   * @param {Object} pathParams The parameter values to append.
   * @param {String} apiBasePath Base path defined in the path, operation level to override the default one
   * @returns {String} The encoded path with parameter values substituted.
   */
  buildUrl(e, r, n) {
    e.match(/^\//) || (e = "/" + e);
    var o = this.basePath + e;
    return n != null && (o = n + e), o = o.replace(/\{([\w-\.#]+)\}/g, (i, a) => {
      var s;
      return r.hasOwnProperty(a) ? s = this.paramToString(r[a]) : s = i, encodeURIComponent(s);
    }), o;
  }
  /**
  * Checks whether the given content type represents JSON.<br>
  * JSON content type examples:<br>
  * <ul>
  * <li>application/json</li>
  * <li>application/json; charset=UTF8</li>
  * <li>APPLICATION/JSON</li>
  * </ul>
  * @param {String} contentType The MIME content type to check.
  * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
  */
  isJsonMime(e) {
    return !!(e != null && e.match(/^application\/json(;.*)?$/i));
  }
  /**
  * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
  * @param {Array.<String>} contentTypes
  * @returns {String} The chosen content type, preferring JSON.
  */
  jsonPreferredMime(e) {
    for (var r = 0; r < e.length; r++)
      if (this.isJsonMime(e[r]))
        return e[r];
    return e[0];
  }
  /**
  * Checks whether the given parameter value represents file-like content.
  * @param param The parameter to check.
  * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
  */
  isFileParam(e) {
    if (typeof require == "function") {
      let r;
      try {
        r = require("fs");
      } catch {
      }
      if (r && r.ReadStream && e instanceof r.ReadStream)
        return !0;
    }
    return typeof Buffer == "function" && e instanceof Buffer || typeof Blob == "function" && e instanceof Blob || typeof File == "function" && e instanceof File;
  }
  /**
  * Normalizes parameter values:
  * <ul>
  * <li>remove nils</li>
  * <li>keep files and arrays</li>
  * <li>format to string with `paramToString` for other cases</li>
  * </ul>
  * @param {Object.<String, Object>} params The parameters as object properties.
  * @returns {Object.<String, Object>} normalized parameters.
  */
  normalizeParams(e) {
    var r = {};
    for (var n in e)
      if (e.hasOwnProperty(n) && e[n] != null && e[n] != null) {
        var o = e[n];
        this.isFileParam(o) || Array.isArray(o) ? r[n] = o : r[n] = this.paramToString(o);
      }
    return r;
  }
  /**
  * Builds a string representation of an array-type actual parameter, according to the given collection format.
  * @param {Array} param An array parameter.
  * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
  * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
  * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
  */
  buildCollectionParam(e, r) {
    if (e == null)
      return null;
    switch (r) {
      case "csv":
        return e.map(this.paramToString, this).join(",");
      case "ssv":
        return e.map(this.paramToString, this).join(" ");
      case "tsv":
        return e.map(this.paramToString, this).join("	");
      case "pipes":
        return e.map(this.paramToString, this).join("|");
      case "multi":
        return e.map(this.paramToString, this);
      case "passthrough":
        return e;
      default:
        throw new Error("Unknown collection format: " + r);
    }
  }
  /**
  * Applies authentication headers to the request.
  * @param {Object} request The request object created by a <code>superagent()</code> call.
  * @param {Array.<String>} authNames An array of authentication method names.
  */
  applyAuthToRequest(e, r) {
    r.forEach((n) => {
      var o = this.authentications[n];
      switch (o.type) {
        case "basic":
          (o.username || o.password) && e.auth(o.username || "", o.password || "");
          break;
        case "bearer":
          if (o.accessToken) {
            var i = typeof o.accessToken == "function" ? o.accessToken() : o.accessToken;
            e.set({ Authorization: "Bearer " + i });
          }
          break;
        case "apiKey":
          if (o.apiKey) {
            var a = {};
            o.apiKeyPrefix ? a[o.name] = o.apiKeyPrefix + " " + o.apiKey : a[o.name] = o.apiKey, o.in === "header" ? e.set(a) : e.query(a);
          }
          break;
        case "oauth2":
          o.accessToken && e.set({ Authorization: "Bearer " + o.accessToken });
          break;
        default:
          throw new Error("Unknown authentication type: " + o.type);
      }
    });
  }
  /**
   * Deserializes an HTTP response body into a value of the specified type.
   * @param {Object} response A SuperAgent response object.
   * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
   * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
   * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
   * all properties on <code>data<code> will be converted to this type.
   * @returns A value of the specified type.
   */
  deserialize(e, r) {
    if (e == null || r == null || e.status == 204)
      return null;
    var n = e.body;
    return (n == null || typeof n == "object" && typeof n.length > "u" && !Object.keys(n).length) && (n = e.text), v.convertToType(n, r);
  }
  /**
   * Callback function to receive the result of the operation.
   * @callback module:ApiClient~callApiCallback
   * @param {String} error Error message, if any.
   * @param data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * Invokes the REST service using the supplied settings and parameters.
   * @param {String} path The base URL to invoke.
   * @param {String} httpMethod The HTTP method to use.
   * @param {Object.<String, String>} pathParams A map of path parameters and their values.
   * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
   * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
   * @param {Object.<String, Object>} formParams A map of form parameters and their values.
   * @param {Object} bodyParam The value to pass as the request body.
   * @param {Array.<String>} authNames An array of authentication type names.
   * @param {Array.<String>} contentTypes An array of request MIME types.
   * @param {Array.<String>} accepts An array of acceptable response MIME types.
   * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
   * constructor for a complex type.
   * @param {String} apiBasePath base path defined in the operation/path level to override the default one
   * @param {module:ApiClient~callApiCallback} callback The callback function.
   * @returns {Object} The SuperAgent request object.
   */
  callApi(e, r, n, o, i, a, s, y, c, h, m, p, T) {
    var N = this.buildUrl(e, n, p), b = ir(r, N);
    if (this.plugins !== null)
      for (var R in this.plugins)
        this.plugins.hasOwnProperty(R) && b.use(this.plugins[R]);
    this.applyAuthToRequest(b, y), r.toUpperCase() === "GET" && this.cache === !1 && (o._ = (/* @__PURE__ */ new Date()).getTime()), b.query(this.normalizeParams(o)), b.set(this.defaultHeaders).set(this.normalizeParams(i)), this.requestAgent && b.agent(this.requestAgent), b.timeout(this.timeout);
    var w = this.jsonPreferredMime(c);
    if (w && w != "multipart/form-data" && b.type(w), w === "application/x-www-form-urlencoded") {
      let _ = this.normalizeParams(a), q = new URLSearchParams(_).toString();
      b.send(q);
    } else if (w == "multipart/form-data") {
      var D = this.normalizeParams(a);
      for (var O in D)
        if (D.hasOwnProperty(O)) {
          let _ = D[O];
          this.isFileParam(_) ? b.attach(O, _) : Array.isArray(_) && _.length && this.isFileParam(_[0]) ? _.forEach((M) => b.attach(O, M)) : b.field(O, _);
        }
    } else s != null && (b.header["Content-Type"] || b.type("application/json"), b.send(s));
    var I = this.jsonPreferredMime(h);
    return I && b.accept(I), m === "Blob" ? b.responseType("blob") : m === "String" && b.responseType("text"), this.enableCookies && (typeof window > "u" ? this.agent._attachCookies(b) : b.withCredentials()), b.end((_, M) => {
      if (T) {
        var q = null;
        if (!_)
          try {
            q = this.deserialize(M, m), this.enableCookies && typeof window > "u" && this.agent._saveCookies(M);
          } catch (z) {
            _ = z;
          }
        T(_, q, M);
      }
    }), b;
  }
  /**
  * Parses an ISO-8601 string representation or epoch representation of a date value.
  * @param {String} str The date value as a string.
  * @returns {Date} The parsed date object.
  */
  static parseDate(e) {
    return isNaN(e) ? new Date(e.replace(/(\d)(T)(\d)/i, "$1 $3")) : /* @__PURE__ */ new Date(+e);
  }
  /**
  * Converts a value to the specified type.
  * @param {(String|Object)} data The data to convert, as a string or object.
  * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
  * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
  * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
  * all properties on <code>data<code> will be converted to this type.
  * @returns An instance of the specified type or null or undefined if data is null or undefined.
  */
  static convertToType(e, r) {
    if (e == null)
      return e;
    switch (r) {
      case "Boolean":
        return !!e;
      case "Integer":
        return parseInt(e, 10);
      case "Number":
        return parseFloat(e);
      case "String":
        return String(e);
      case "Date":
        return v.parseDate(String(e));
      case "Blob":
        return e;
      default:
        if (r === Object)
          return e;
        if (typeof r.constructFromObject == "function")
          return r.constructFromObject(e);
        if (Array.isArray(r)) {
          var n = r[0];
          return e.map((h) => v.convertToType(h, n));
        } else if (typeof r == "object") {
          var o, i;
          for (var a in r)
            if (r.hasOwnProperty(a)) {
              o = a, i = r[a];
              break;
            }
          var s = {};
          for (var a in e)
            if (e.hasOwnProperty(a)) {
              var y = v.convertToType(a, o), c = v.convertToType(e[a], i);
              s[y] = c;
            }
          return s;
        } else
          return e;
    }
  }
  /**
    * Gets an array of host settings
    * @returns An array of host settings
    */
  hostSettings() {
    return [
      {
        url: "http://localhost:8080",
        description: "Generated server url"
      }
    ];
  }
  getBasePathFromSettings(e, r = {}) {
    var n = this.hostSettings();
    if (e < 0 || e >= n.length)
      throw new Error("Invalid index " + e + " when selecting the host settings. Must be less than " + n.length);
    var o = n[e], i = o.url;
    for (var a in o.variables)
      if (a in r) {
        let s = o.variables[a];
        if (!("enum_values" in s) || s.enum_values.includes(r[a]))
          i = i.replace("{" + a + "}", r[a]);
        else
          throw new Error("The variable `" + a + "` in the host URL has invalid value " + r[a] + ". Must be " + o.variables[a].enum_values + ".");
      } else
        i = i.replace("{" + a + "}", o.variables[a].default_value);
    return i;
  }
  /**
  * Constructs a new map or array model from REST data.
  * @param data {Object|Array} The REST data.
  * @param obj {Object|Array} The target object or array.
  */
  static constructFromObject(e, r, n) {
    if (Array.isArray(e))
      for (var o = 0; o < e.length; o++)
        e.hasOwnProperty(o) && (r[o] = v.convertToType(e[o], n));
    else
      for (var i in e)
        e.hasOwnProperty(i) && (r[i] = v.convertToType(e[i], n));
  }
}
v.CollectionFormatEnum = {
  /**
   * Comma-separated values. Value: <code>csv</code>
   * @const
   */
  CSV: ",",
  /**
   * Space-separated values. Value: <code>ssv</code>
   * @const
   */
  SSV: " ",
  /**
   * Tab-separated values. Value: <code>tsv</code>
   * @const
   */
  TSV: "	",
  /**
   * Pipe(|)-separated values. Value: <code>pipes</code>
   * @const
   */
  PIPES: "|",
  /**
   * Native array. Value: <code>multi</code>
   * @const
   */
  MULTI: "multi"
};
v.instance = new v();
class K {
  /**
   * Constructs a new <code>CardCreateRequest</code>.
   * @alias module:model/CardCreateRequest
   * @param cardNumberPlain {String} 
   * @param ownerName {String} 
   * @param expiry {Date} 
   * @param status {module:model/CardCreateRequest.StatusEnum} 
   */
  constructor(e, r, n, o) {
    K.initialize(this, e, r, n, o);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(e, r, n, o, i) {
    e.cardNumberPlain = r, e.ownerName = n, e.expiry = o, e.status = i;
  }
  /**
   * Constructs a <code>CardCreateRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CardCreateRequest} obj Optional instance to populate.
   * @return {module:model/CardCreateRequest} The populated <code>CardCreateRequest</code> instance.
   */
  static constructFromObject(e, r) {
    return e && (r = r || new K(), e.hasOwnProperty("cardNumberPlain") && (r.cardNumberPlain = v.convertToType(e.cardNumberPlain, "String")), e.hasOwnProperty("ownerName") && (r.ownerName = v.convertToType(e.ownerName, "String")), e.hasOwnProperty("expiry") && (r.expiry = v.convertToType(e.expiry, "Date")), e.hasOwnProperty("status") && (r.status = v.convertToType(e.status, "String"))), r;
  }
  /**
   * Validates the JSON data with respect to <code>CardCreateRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CardCreateRequest</code>.
   */
  static validateJSON(e) {
    for (const r of K.RequiredProperties)
      if (!e.hasOwnProperty(r))
        throw new Error("The required field `" + r + "` is not found in the JSON data: " + JSON.stringify(e));
    if (e.cardNumberPlain && !(typeof e.cardNumberPlain == "string" || e.cardNumberPlain instanceof String))
      throw new Error("Expected the field `cardNumberPlain` to be a primitive type in the JSON string but got " + e.cardNumberPlain);
    if (e.ownerName && !(typeof e.ownerName == "string" || e.ownerName instanceof String))
      throw new Error("Expected the field `ownerName` to be a primitive type in the JSON string but got " + e.ownerName);
    if (e.status && !(typeof e.status == "string" || e.status instanceof String))
      throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + e.status);
    return !0;
  }
}
K.RequiredProperties = ["cardNumberPlain", "ownerName", "expiry", "status"];
K.prototype.cardNumberPlain = void 0;
K.prototype.ownerName = void 0;
K.prototype.expiry = void 0;
K.prototype.status = void 0;
K.StatusEnum = {
  /**
   * value: "ACTIVE"
   * @const
   */
  ACTIVE: "ACTIVE",
  /**
   * value: "BLOCKED"
   * @const
   */
  BLOCKED: "BLOCKED",
  /**
   * value: "EXPIRED"
   * @const
   */
  EXPIRED: "EXPIRED"
};
class B {
  /**
   * Constructs a new <code>CardResponse</code>.
   * @alias module:model/CardResponse
   */
  constructor() {
    B.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(e) {
  }
  /**
   * Constructs a <code>CardResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CardResponse} obj Optional instance to populate.
   * @return {module:model/CardResponse} The populated <code>CardResponse</code> instance.
   */
  static constructFromObject(e, r) {
    return e && (r = r || new B(), e.hasOwnProperty("id") && (r.id = v.convertToType(e.id, "Number")), e.hasOwnProperty("maskedCardNumber") && (r.maskedCardNumber = v.convertToType(e.maskedCardNumber, "String")), e.hasOwnProperty("ownerName") && (r.ownerName = v.convertToType(e.ownerName, "String")), e.hasOwnProperty("expiry") && (r.expiry = v.convertToType(e.expiry, "Date")), e.hasOwnProperty("status") && (r.status = v.convertToType(e.status, "String")), e.hasOwnProperty("balanceMinor") && (r.balanceMinor = v.convertToType(e.balanceMinor, "Number"))), r;
  }
  /**
   * Validates the JSON data with respect to <code>CardResponse</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CardResponse</code>.
   */
  static validateJSON(e) {
    if (e.maskedCardNumber && !(typeof e.maskedCardNumber == "string" || e.maskedCardNumber instanceof String))
      throw new Error("Expected the field `maskedCardNumber` to be a primitive type in the JSON string but got " + e.maskedCardNumber);
    if (e.ownerName && !(typeof e.ownerName == "string" || e.ownerName instanceof String))
      throw new Error("Expected the field `ownerName` to be a primitive type in the JSON string but got " + e.ownerName);
    if (e.status && !(typeof e.status == "string" || e.status instanceof String))
      throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + e.status);
    return !0;
  }
}
B.prototype.id = void 0;
B.prototype.maskedCardNumber = void 0;
B.prototype.ownerName = void 0;
B.prototype.expiry = void 0;
B.prototype.status = void 0;
B.prototype.balanceMinor = void 0;
B.StatusEnum = {
  /**
   * value: "ACTIVE"
   * @const
   */
  ACTIVE: "ACTIVE",
  /**
   * value: "BLOCKED"
   * @const
   */
  BLOCKED: "BLOCKED",
  /**
   * value: "EXPIRED"
   * @const
   */
  EXPIRED: "EXPIRED"
};
class oe {
  /**
   * Constructs a new <code>CardUpdateStatusRequest</code>.
   * @alias module:model/CardUpdateStatusRequest
   * @param status {module:model/CardUpdateStatusRequest.StatusEnum} 
   */
  constructor(e) {
    oe.initialize(this, e);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(e, r) {
    e.status = r;
  }
  /**
   * Constructs a <code>CardUpdateStatusRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CardUpdateStatusRequest} obj Optional instance to populate.
   * @return {module:model/CardUpdateStatusRequest} The populated <code>CardUpdateStatusRequest</code> instance.
   */
  static constructFromObject(e, r) {
    return e && (r = r || new oe(), e.hasOwnProperty("status") && (r.status = v.convertToType(e.status, "String"))), r;
  }
  /**
   * Validates the JSON data with respect to <code>CardUpdateStatusRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CardUpdateStatusRequest</code>.
   */
  static validateJSON(e) {
    for (const r of oe.RequiredProperties)
      if (!e.hasOwnProperty(r))
        throw new Error("The required field `" + r + "` is not found in the JSON data: " + JSON.stringify(e));
    if (e.status && !(typeof e.status == "string" || e.status instanceof String))
      throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + e.status);
    return !0;
  }
}
oe.RequiredProperties = ["status"];
oe.prototype.status = void 0;
oe.StatusEnum = {
  /**
   * value: "ACTIVE"
   * @const
   */
  ACTIVE: "ACTIVE",
  /**
   * value: "BLOCKED"
   * @const
   */
  BLOCKED: "BLOCKED",
  /**
   * value: "EXPIRED"
   * @const
   */
  EXPIRED: "EXPIRED"
};
class U {
  /**
   * Constructs a new <code>SortObject</code>.
   * @alias module:model/SortObject
   */
  constructor() {
    U.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(e) {
  }
  /**
   * Constructs a <code>SortObject</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SortObject} obj Optional instance to populate.
   * @return {module:model/SortObject} The populated <code>SortObject</code> instance.
   */
  static constructFromObject(e, r) {
    return e && (r = r || new U(), e.hasOwnProperty("direction") && (r.direction = v.convertToType(e.direction, "String")), e.hasOwnProperty("nullHandling") && (r.nullHandling = v.convertToType(e.nullHandling, "String")), e.hasOwnProperty("ascending") && (r.ascending = v.convertToType(e.ascending, "Boolean")), e.hasOwnProperty("property") && (r.property = v.convertToType(e.property, "String")), e.hasOwnProperty("ignoreCase") && (r.ignoreCase = v.convertToType(e.ignoreCase, "Boolean"))), r;
  }
  /**
   * Validates the JSON data with respect to <code>SortObject</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SortObject</code>.
   */
  static validateJSON(e) {
    if (e.direction && !(typeof e.direction == "string" || e.direction instanceof String))
      throw new Error("Expected the field `direction` to be a primitive type in the JSON string but got " + e.direction);
    if (e.nullHandling && !(typeof e.nullHandling == "string" || e.nullHandling instanceof String))
      throw new Error("Expected the field `nullHandling` to be a primitive type in the JSON string but got " + e.nullHandling);
    if (e.property && !(typeof e.property == "string" || e.property instanceof String))
      throw new Error("Expected the field `property` to be a primitive type in the JSON string but got " + e.property);
    return !0;
  }
}
U.prototype.direction = void 0;
U.prototype.nullHandling = void 0;
U.prototype.ascending = void 0;
U.prototype.property = void 0;
U.prototype.ignoreCase = void 0;
class L {
  /**
   * Constructs a new <code>PageableObject</code>.
   * @alias module:model/PageableObject
   */
  constructor() {
    L.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(e) {
  }
  /**
   * Constructs a <code>PageableObject</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PageableObject} obj Optional instance to populate.
   * @return {module:model/PageableObject} The populated <code>PageableObject</code> instance.
   */
  static constructFromObject(e, r) {
    return e && (r = r || new L(), e.hasOwnProperty("paged") && (r.paged = v.convertToType(e.paged, "Boolean")), e.hasOwnProperty("pageNumber") && (r.pageNumber = v.convertToType(e.pageNumber, "Number")), e.hasOwnProperty("pageSize") && (r.pageSize = v.convertToType(e.pageSize, "Number")), e.hasOwnProperty("unpaged") && (r.unpaged = v.convertToType(e.unpaged, "Boolean")), e.hasOwnProperty("offset") && (r.offset = v.convertToType(e.offset, "Number")), e.hasOwnProperty("sort") && (r.sort = v.convertToType(e.sort, [U]))), r;
  }
  /**
   * Validates the JSON data with respect to <code>PageableObject</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>PageableObject</code>.
   */
  static validateJSON(e) {
    if (e.sort) {
      if (!Array.isArray(e.sort))
        throw new Error("Expected the field `sort` to be an array in the JSON data but got " + e.sort);
      for (const r of e.sort)
        U.validateJSON(r);
    }
    return !0;
  }
}
L.prototype.paged = void 0;
L.prototype.pageNumber = void 0;
L.prototype.pageSize = void 0;
L.prototype.unpaged = void 0;
L.prototype.offset = void 0;
L.prototype.sort = void 0;
class F {
  /**
   * Constructs a new <code>PageCardResponse</code>.
   * @alias module:model/PageCardResponse
   */
  constructor() {
    F.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(e) {
  }
  /**
   * Constructs a <code>PageCardResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PageCardResponse} obj Optional instance to populate.
   * @return {module:model/PageCardResponse} The populated <code>PageCardResponse</code> instance.
   */
  static constructFromObject(e, r) {
    return e && (r = r || new F(), e.hasOwnProperty("totalElements") && (r.totalElements = v.convertToType(e.totalElements, "Number")), e.hasOwnProperty("totalPages") && (r.totalPages = v.convertToType(e.totalPages, "Number")), e.hasOwnProperty("numberOfElements") && (r.numberOfElements = v.convertToType(e.numberOfElements, "Number")), e.hasOwnProperty("pageable") && (r.pageable = L.constructFromObject(e.pageable)), e.hasOwnProperty("first") && (r.first = v.convertToType(e.first, "Boolean")), e.hasOwnProperty("last") && (r.last = v.convertToType(e.last, "Boolean")), e.hasOwnProperty("size") && (r.size = v.convertToType(e.size, "Number")), e.hasOwnProperty("content") && (r.content = v.convertToType(e.content, [B])), e.hasOwnProperty("number") && (r.number = v.convertToType(e.number, "Number")), e.hasOwnProperty("sort") && (r.sort = v.convertToType(e.sort, [U])), e.hasOwnProperty("empty") && (r.empty = v.convertToType(e.empty, "Boolean"))), r;
  }
  /**
   * Validates the JSON data with respect to <code>PageCardResponse</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>PageCardResponse</code>.
   */
  static validateJSON(e) {
    if (e.pageable && L.validateJSON(e.pageable), e.content) {
      if (!Array.isArray(e.content))
        throw new Error("Expected the field `content` to be an array in the JSON data but got " + e.content);
      for (const r of e.content)
        B.validateJSON(r);
    }
    if (e.sort) {
      if (!Array.isArray(e.sort))
        throw new Error("Expected the field `sort` to be an array in the JSON data but got " + e.sort);
      for (const r of e.sort)
        U.validateJSON(r);
    }
    return !0;
  }
}
F.prototype.totalElements = void 0;
F.prototype.totalPages = void 0;
F.prototype.numberOfElements = void 0;
F.prototype.pageable = void 0;
F.prototype.first = void 0;
F.prototype.last = void 0;
F.prototype.size = void 0;
F.prototype.content = void 0;
F.prototype.number = void 0;
F.prototype.sort = void 0;
F.prototype.empty = void 0;
class de {
  /**
   * Constructs a new <code>Pageable</code>.
   * @alias module:model/Pageable
   */
  constructor() {
    de.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(e) {
  }
  /**
   * Constructs a <code>Pageable</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Pageable} obj Optional instance to populate.
   * @return {module:model/Pageable} The populated <code>Pageable</code> instance.
   */
  static constructFromObject(e, r) {
    return e && (r = r || new de(), e.hasOwnProperty("page") && (r.page = v.convertToType(e.page, "Number")), e.hasOwnProperty("size") && (r.size = v.convertToType(e.size, "Number")), e.hasOwnProperty("sort") && (r.sort = v.convertToType(e.sort, ["String"]))), r;
  }
  /**
   * Validates the JSON data with respect to <code>Pageable</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Pageable</code>.
   */
  static validateJSON(e) {
    if (!Array.isArray(e.sort))
      throw new Error("Expected the field `sort` to be an array in the JSON data but got " + e.sort);
    return !0;
  }
}
de.prototype.page = void 0;
de.prototype.size = void 0;
de.prototype.sort = void 0;
class Y {
  /**
   * Constructs a new <code>TransferRequest</code>.
   * @alias module:model/TransferRequest
   * @param fromCardId {Number} 
   * @param toCardId {Number} 
   */
  constructor(e, r) {
    Y.initialize(this, e, r);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(e, r, n) {
    e.fromCardId = r, e.toCardId = n;
  }
  /**
   * Constructs a <code>TransferRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TransferRequest} obj Optional instance to populate.
   * @return {module:model/TransferRequest} The populated <code>TransferRequest</code> instance.
   */
  static constructFromObject(e, r) {
    return e && (r = r || new Y(), e.hasOwnProperty("fromCardId") && (r.fromCardId = v.convertToType(e.fromCardId, "Number")), e.hasOwnProperty("toCardId") && (r.toCardId = v.convertToType(e.toCardId, "Number")), e.hasOwnProperty("amountMinor") && (r.amountMinor = v.convertToType(e.amountMinor, "Number"))), r;
  }
  /**
   * Validates the JSON data with respect to <code>TransferRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TransferRequest</code>.
   */
  static validateJSON(e) {
    for (const r of Y.RequiredProperties)
      if (!e.hasOwnProperty(r))
        throw new Error("The required field `" + r + "` is not found in the JSON data: " + JSON.stringify(e));
    return !0;
  }
}
Y.RequiredProperties = ["fromCardId", "toCardId"];
Y.prototype.fromCardId = void 0;
Y.prototype.toCardId = void 0;
Y.prototype.amountMinor = void 0;
class Fi {
  /**
  * Constructs a new CardControllerApi. 
  * @alias module:api/CardControllerApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(e) {
    this.apiClient = e || v.instance;
  }
  /**
   * Callback function to receive the result of the callDelete operation.
   * @callback module:api/CardControllerApi~callDeleteCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */
  /**
   * @param {Number} cardId 
   * @param {module:api/CardControllerApi~callDeleteCallback} callback The callback function, accepting three arguments: error, data, response
   */
  callDelete(e, r) {
    let n = null;
    if (e == null)
      throw new Error("Missing the required parameter 'cardId' when calling callDelete");
    let o = {
      cardId: e
    }, i = {}, a = {}, s = {}, y = [], c = [], h = [];
    return this.apiClient.callApi(
      "/api/cards/{cardId}",
      "DELETE",
      o,
      i,
      a,
      s,
      n,
      y,
      c,
      h,
      null,
      null,
      r
    );
  }
  /**
   * Callback function to receive the result of the create operation.
   * @callback module:api/CardControllerApi~createCallback
   * @param {String} error Error message, if any.
   * @param {module:model/CardResponse} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * @param {Number} userId 
   * @param {module:model/CardCreateRequest} cardCreateRequest 
   * @param {module:api/CardControllerApi~createCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/CardResponse}
   */
  create(e, r, n) {
    let o = r;
    if (e == null)
      throw new Error("Missing the required parameter 'userId' when calling create");
    if (r == null)
      throw new Error("Missing the required parameter 'cardCreateRequest' when calling create");
    let i = {}, a = {
      userId: e
    }, s = {}, y = {}, c = [], h = ["application/json"], m = ["*/*"], p = B;
    return this.apiClient.callApi(
      "/api/cards",
      "POST",
      i,
      a,
      s,
      y,
      o,
      c,
      h,
      m,
      p,
      null,
      n
    );
  }
  /**
   * Callback function to receive the result of the list operation.
   * @callback module:api/CardControllerApi~listCallback
   * @param {String} error Error message, if any.
   * @param {module:model/PageCardResponse} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * @param {Number} userId 
   * @param {module:model/Pageable} pageable 
   * @param {module:api/CardControllerApi~listCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/PageCardResponse}
   */
  list(e, r, n) {
    let o = null;
    if (e == null)
      throw new Error("Missing the required parameter 'userId' when calling list");
    if (r == null)
      throw new Error("Missing the required parameter 'pageable' when calling list");
    let i = {}, a = {
      userId: e,
      pageable: r
    }, s = {}, y = {}, c = [], h = [], m = ["*/*"], p = F;
    return this.apiClient.callApi(
      "/api/cards",
      "GET",
      i,
      a,
      s,
      y,
      o,
      c,
      h,
      m,
      p,
      null,
      n
    );
  }
  /**
   * Callback function to receive the result of the updateStatus operation.
   * @callback module:api/CardControllerApi~updateStatusCallback
   * @param {String} error Error message, if any.
   * @param {module:model/CardResponse} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * @param {Number} cardId 
   * @param {module:model/CardUpdateStatusRequest} cardUpdateStatusRequest 
   * @param {module:api/CardControllerApi~updateStatusCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/CardResponse}
   */
  updateStatus(e, r, n) {
    let o = r;
    if (e == null)
      throw new Error("Missing the required parameter 'cardId' when calling updateStatus");
    if (r == null)
      throw new Error("Missing the required parameter 'cardUpdateStatusRequest' when calling updateStatus");
    let i = {
      cardId: e
    }, a = {}, s = {}, y = {}, c = [], h = ["application/json"], m = ["*/*"], p = B;
    return this.apiClient.callApi(
      "/api/cards/{cardId}/status",
      "PATCH",
      i,
      a,
      s,
      y,
      o,
      c,
      h,
      m,
      p,
      null,
      n
    );
  }
}
class Di {
  /**
  * Constructs a new TransferControllerApi. 
  * @alias module:api/TransferControllerApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(e) {
    this.apiClient = e || v.instance;
  }
  /**
   * Callback function to receive the result of the transfer operation.
   * @callback module:api/TransferControllerApi~transferCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */
  /**
   * @param {Number} userId 
   * @param {module:model/TransferRequest} transferRequest 
   * @param {module:api/TransferControllerApi~transferCallback} callback The callback function, accepting three arguments: error, data, response
   */
  transfer(e, r, n) {
    let o = r;
    if (e == null)
      throw new Error("Missing the required parameter 'userId' when calling transfer");
    if (r == null)
      throw new Error("Missing the required parameter 'transferRequest' when calling transfer");
    let i = {}, a = {
      userId: e
    }, s = {}, y = {}, c = [], h = ["application/json"], m = [];
    return this.apiClient.callApi(
      "/api/transfers",
      "POST",
      i,
      a,
      s,
      y,
      o,
      c,
      h,
      m,
      null,
      null,
      n
    );
  }
}
export {
  v as ApiClient,
  Fi as CardControllerApi,
  K as CardCreateRequest,
  B as CardResponse,
  oe as CardUpdateStatusRequest,
  F as PageCardResponse,
  de as Pageable,
  L as PageableObject,
  U as SortObject,
  Di as TransferControllerApi,
  Y as TransferRequest
};
