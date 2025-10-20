var Pt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ir(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Dr(t) {
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
var ct = { exports: {} }, rr = { exports: {} };
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
})(rr);
var Fr = rr.exports, Mr = Ee;
Ee.default = Ee;
Ee.stable = ir;
Ee.stableStringify = ir;
var De = "[...]", nr = "[Circular]", ae = [], re = [];
function or() {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  };
}
function Ee(t, e, r, n) {
  typeof n > "u" && (n = or()), pt(t, "", 0, [], void 0, 0, n);
  var o;
  try {
    re.length === 0 ? o = JSON.stringify(t, e, r) : o = JSON.stringify(t, ar(e), r);
  } catch {
    return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
  } finally {
    for (; ae.length !== 0; ) {
      var i = ae.pop();
      i.length === 4 ? Object.defineProperty(i[0], i[1], i[3]) : i[0][i[1]] = i[2];
    }
  }
  return o;
}
function pe(t, e, r, n) {
  var o = Object.getOwnPropertyDescriptor(n, r);
  o.get !== void 0 ? o.configurable ? (Object.defineProperty(n, r, { value: t }), ae.push([n, r, e, o])) : re.push([e, r, t]) : (n[r] = t, ae.push([n, r, e]));
}
function pt(t, e, r, n, o, i, a) {
  i += 1;
  var s;
  if (typeof t == "object" && t !== null) {
    for (s = 0; s < n.length; s++)
      if (n[s] === t) {
        pe(nr, t, e, o);
        return;
      }
    if (typeof a.depthLimit < "u" && i > a.depthLimit) {
      pe(De, t, e, o);
      return;
    }
    if (typeof a.edgesLimit < "u" && r + 1 > a.edgesLimit) {
      pe(De, t, e, o);
      return;
    }
    if (n.push(t), Array.isArray(t))
      for (s = 0; s < t.length; s++)
        pt(t[s], s, s, n, t, i, a);
    else {
      var c = Object.keys(t);
      for (s = 0; s < c.length; s++) {
        var y = c[s];
        pt(t[y], y, s, n, t, i, a);
      }
    }
    n.pop();
  }
}
function qr(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
function ir(t, e, r, n) {
  typeof n > "u" && (n = or());
  var o = yt(t, "", 0, [], void 0, 0, n) || t, i;
  try {
    re.length === 0 ? i = JSON.stringify(o, e, r) : i = JSON.stringify(o, ar(e), r);
  } catch {
    return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
  } finally {
    for (; ae.length !== 0; ) {
      var a = ae.pop();
      a.length === 4 ? Object.defineProperty(a[0], a[1], a[3]) : a[0][a[1]] = a[2];
    }
  }
  return i;
}
function yt(t, e, r, n, o, i, a) {
  i += 1;
  var s;
  if (typeof t == "object" && t !== null) {
    for (s = 0; s < n.length; s++)
      if (n[s] === t) {
        pe(nr, t, e, o);
        return;
      }
    try {
      if (typeof t.toJSON == "function")
        return;
    } catch {
      return;
    }
    if (typeof a.depthLimit < "u" && i > a.depthLimit) {
      pe(De, t, e, o);
      return;
    }
    if (typeof a.edgesLimit < "u" && r + 1 > a.edgesLimit) {
      pe(De, t, e, o);
      return;
    }
    if (n.push(t), Array.isArray(t))
      for (s = 0; s < t.length; s++)
        yt(t[s], s, s, n, t, i, a);
    else {
      var c = {}, y = Object.keys(t).sort(qr);
      for (s = 0; s < y.length; s++) {
        var h = y[s];
        yt(t[h], h, s, n, t, i, a), c[h] = t[h];
      }
      if (typeof o < "u")
        ae.push([o, e, t]), o[e] = c;
      else
        return c;
    }
    n.pop();
  }
}
function ar(t) {
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
var ge = TypeError;
const Br = {}, zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Br
}, Symbol.toStringTag, { value: "Module" })), sr = /* @__PURE__ */ Dr(zr);
var wt = typeof Map == "function" && Map.prototype, We = Object.getOwnPropertyDescriptor && wt ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, Fe = wt && We && typeof We.get == "function" ? We.get : null, At = wt && Map.prototype.forEach, St = typeof Set == "function" && Set.prototype, Ke = Object.getOwnPropertyDescriptor && St ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, Me = St && Ke && typeof Ke.get == "function" ? Ke.get : null, _t = St && Set.prototype.forEach, kr = typeof WeakMap == "function" && WeakMap.prototype, we = kr ? WeakMap.prototype.has : null, Ur = typeof WeakSet == "function" && WeakSet.prototype, Se = Ur ? WeakSet.prototype.has : null, Jr = typeof WeakRef == "function" && WeakRef.prototype, Nt = Jr ? WeakRef.prototype.deref : null, Lr = Boolean.prototype.valueOf, Hr = Object.prototype.toString, Gr = Function.prototype.toString, Wr = String.prototype.match, bt = String.prototype.slice, j = String.prototype.replace, Kr = String.prototype.toUpperCase, xt = String.prototype.toLowerCase, ur = RegExp.prototype.test, Rt = Array.prototype.concat, W = Array.prototype.join, Vr = Array.prototype.slice, Ct = Math.floor, ht = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, Ve = Object.getOwnPropertySymbols, dt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, he = typeof Symbol == "function" && typeof Symbol.iterator == "object", be = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === he || !0) ? Symbol.toStringTag : null, fr = Object.prototype.propertyIsEnumerable, $t = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
  return t.__proto__;
} : null);
function It(t, e) {
  if (t === 1 / 0 || t === -1 / 0 || t !== t || t && t > -1e3 && t < 1e3 || ur.call(/e/, e))
    return e;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof t == "number") {
    var n = t < 0 ? -Ct(-t) : Ct(t);
    if (n !== t) {
      var o = String(n), i = bt.call(e, o.length + 1);
      return j.call(o, r, "$&_") + "." + j.call(j.call(i, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return j.call(e, r, "$&_");
}
var mt = sr, Dt = mt.custom, Ft = pr(Dt) ? Dt : null, lr = {
  __proto__: null,
  double: '"',
  single: "'"
}, Qr = {
  __proto__: null,
  double: /(["\\])/g,
  single: /(['\\])/g
}, ke = function t(e, r, n, o) {
  var i = r || {};
  if (Q(i, "quoteStyle") && !Q(lr, i.quoteStyle))
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
    return hr(e, i);
  if (typeof e == "number") {
    if (e === 0)
      return 1 / 0 / e > 0 ? "0" : "-0";
    var c = String(e);
    return s ? It(e, c) : c;
  }
  if (typeof e == "bigint") {
    var y = String(e) + "n";
    return s ? It(e, y) : y;
  }
  var h = typeof i.depth > "u" ? 5 : i.depth;
  if (typeof n > "u" && (n = 0), n >= h && h > 0 && typeof e == "object")
    return gt(e) ? "[Array]" : "[Object]";
  var v = hn(i, n);
  if (typeof o > "u")
    o = [];
  else if (yr(o, e) >= 0)
    return "[Circular]";
  function d(u, f, l) {
    if (f && (o = Vr.call(o), o.push(f)), l) {
      var p = {
        depth: i.depth
      };
      return Q(i, "quoteStyle") && (p.quoteStyle = i.quoteStyle), t(u, p, n + 1, o);
    }
    return t(u, i, n + 1, o);
  }
  if (typeof e == "function" && !Mt(e)) {
    var A = on(e), N = xe(e, d);
    return "[Function" + (A ? ": " + A : " (anonymous)") + "]" + (N.length > 0 ? " { " + W.call(N, ", ") + " }" : "");
  }
  if (pr(e)) {
    var O = he ? j.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : dt.call(e);
    return typeof e == "object" && !he ? ve(O) : O;
  }
  if (cn(e)) {
    for (var C = "<" + xt.call(String(e.nodeName)), w = e.attributes || [], F = 0; F < w.length; F++)
      C += " " + w[F].name + "=" + cr(Xr(w[F].value), "double", i);
    return C += ">", e.childNodes && e.childNodes.length && (C += "..."), C += "</" + xt.call(String(e.nodeName)) + ">", C;
  }
  if (gt(e)) {
    if (e.length === 0)
      return "[]";
    var b = xe(e, d);
    return v && !yn(b) ? "[" + vt(b, v) + "]" : "[ " + W.call(b, ", ") + " ]";
  }
  if (Yr(e)) {
    var $ = xe(e, d);
    return !("cause" in Error.prototype) && "cause" in e && !fr.call(e, "cause") ? "{ [" + String(e) + "] " + W.call(Rt.call("[cause]: " + d(e.cause), $), ", ") + " }" : $.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + W.call($, ", ") + " }";
  }
  if (typeof e == "object" && a) {
    if (Ft && typeof e[Ft] == "function" && mt)
      return mt(e, { depth: h - n });
    if (a !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if (an(e)) {
    var _ = [];
    return At && At.call(e, function(u, f) {
      _.push(d(f, e, !0) + " => " + d(u, e));
    }), qt("Map", Fe.call(e), _, v);
  }
  if (fn(e)) {
    var M = [];
    return _t && _t.call(e, function(u) {
      M.push(d(u, e));
    }), qt("Set", Me.call(e), M, v);
  }
  if (sn(e))
    return Qe("WeakMap");
  if (ln(e))
    return Qe("WeakSet");
  if (un(e))
    return Qe("WeakRef");
  if (en(e))
    return ve(d(Number(e)));
  if (rn(e))
    return ve(d(ht.call(e)));
  if (tn(e))
    return ve(Lr.call(e));
  if (Zr(e))
    return ve(d(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && e === globalThis || typeof Pt < "u" && e === Pt)
    return "{ [object globalThis] }";
  if (!jr(e) && !Mt(e)) {
    var q = xe(e, d), z = $t ? $t(e) === Object.prototype : e instanceof Object || e.constructor === Object, P = e instanceof Object ? "" : "null prototype", k = !z && be && Object(e) === e && be in e ? bt.call(Z(e), 8, -1) : P ? "Object" : "", ee = z || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", V = ee + (k || P ? "[" + W.call(Rt.call([], k || [], P || []), ": ") + "] " : "");
    return q.length === 0 ? V + "{}" : v ? V + "{" + vt(q, v) + "}" : V + "{ " + W.call(q, ", ") + " }";
  }
  return String(e);
};
function cr(t, e, r) {
  var n = r.quoteStyle || e, o = lr[n];
  return o + t + o;
}
function Xr(t) {
  return j.call(String(t), /"/g, "&quot;");
}
function se(t) {
  return !be || !(typeof t == "object" && (be in t || typeof t[be] < "u"));
}
function gt(t) {
  return Z(t) === "[object Array]" && se(t);
}
function jr(t) {
  return Z(t) === "[object Date]" && se(t);
}
function Mt(t) {
  return Z(t) === "[object RegExp]" && se(t);
}
function Yr(t) {
  return Z(t) === "[object Error]" && se(t);
}
function Zr(t) {
  return Z(t) === "[object String]" && se(t);
}
function en(t) {
  return Z(t) === "[object Number]" && se(t);
}
function tn(t) {
  return Z(t) === "[object Boolean]" && se(t);
}
function pr(t) {
  if (he)
    return t && typeof t == "object" && t instanceof Symbol;
  if (typeof t == "symbol")
    return !0;
  if (!t || typeof t != "object" || !dt)
    return !1;
  try {
    return dt.call(t), !0;
  } catch {
  }
  return !1;
}
function rn(t) {
  if (!t || typeof t != "object" || !ht)
    return !1;
  try {
    return ht.call(t), !0;
  } catch {
  }
  return !1;
}
var nn = Object.prototype.hasOwnProperty || function(t) {
  return t in this;
};
function Q(t, e) {
  return nn.call(t, e);
}
function Z(t) {
  return Hr.call(t);
}
function on(t) {
  if (t.name)
    return t.name;
  var e = Wr.call(Gr.call(t), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function yr(t, e) {
  if (t.indexOf)
    return t.indexOf(e);
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] === e)
      return r;
  return -1;
}
function an(t) {
  if (!Fe || !t || typeof t != "object")
    return !1;
  try {
    Fe.call(t);
    try {
      Me.call(t);
    } catch {
      return !0;
    }
    return t instanceof Map;
  } catch {
  }
  return !1;
}
function sn(t) {
  if (!we || !t || typeof t != "object")
    return !1;
  try {
    we.call(t, we);
    try {
      Se.call(t, Se);
    } catch {
      return !0;
    }
    return t instanceof WeakMap;
  } catch {
  }
  return !1;
}
function un(t) {
  if (!Nt || !t || typeof t != "object")
    return !1;
  try {
    return Nt.call(t), !0;
  } catch {
  }
  return !1;
}
function fn(t) {
  if (!Me || !t || typeof t != "object")
    return !1;
  try {
    Me.call(t);
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
function ln(t) {
  if (!Se || !t || typeof t != "object")
    return !1;
  try {
    Se.call(t, Se);
    try {
      we.call(t, we);
    } catch {
      return !0;
    }
    return t instanceof WeakSet;
  } catch {
  }
  return !1;
}
function cn(t) {
  return !t || typeof t != "object" ? !1 : typeof HTMLElement < "u" && t instanceof HTMLElement ? !0 : typeof t.nodeName == "string" && typeof t.getAttribute == "function";
}
function hr(t, e) {
  if (t.length > e.maxStringLength) {
    var r = t.length - e.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return hr(bt.call(t, 0, e.maxStringLength), e) + n;
  }
  var o = Qr[e.quoteStyle || "single"];
  o.lastIndex = 0;
  var i = j.call(j.call(t, o, "\\$1"), /[\x00-\x1f]/g, pn);
  return cr(i, "single", e);
}
function pn(t) {
  var e = t.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + Kr.call(e.toString(16));
}
function ve(t) {
  return "Object(" + t + ")";
}
function Qe(t) {
  return t + " { ? }";
}
function qt(t, e, r, n) {
  var o = n ? vt(r, n) : W.call(r, ", ");
  return t + " (" + e + ") {" + o + "}";
}
function yn(t) {
  for (var e = 0; e < t.length; e++)
    if (yr(t[e], `
`) >= 0)
      return !1;
  return !0;
}
function hn(t, e) {
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
function vt(t, e) {
  if (t.length === 0)
    return "";
  var r = `
` + e.prev + e.base;
  return r + W.call(t, "," + r) + `
` + e.prev;
}
function xe(t, e) {
  var r = gt(t), n = [];
  if (r) {
    n.length = t.length;
    for (var o = 0; o < t.length; o++)
      n[o] = Q(t, o) ? e(t[o], t) : "";
  }
  var i = typeof Ve == "function" ? Ve(t) : [], a;
  if (he) {
    a = {};
    for (var s = 0; s < i.length; s++)
      a["$" + i[s]] = i[s];
  }
  for (var c in t)
    Q(t, c) && (r && String(Number(c)) === c && c < t.length || he && a["$" + c] instanceof Symbol || (ur.call(/[^\w$]/, c) ? n.push(e(c, t) + ": " + e(t[c], t)) : n.push(c + ": " + e(t[c], t))));
  if (typeof Ve == "function")
    for (var y = 0; y < i.length; y++)
      fr.call(t, i[y]) && n.push("[" + e(i[y]) + "]: " + e(t[i[y]], t));
  return n;
}
var dn = ke, mn = ge, Ue = function(t, e, r) {
  for (var n = t, o; (o = n.next) != null; n = o)
    if (o.key === e)
      return n.next = o.next, r || (o.next = /** @type {NonNullable<typeof list.next>} */
      t.next, t.next = o), o;
}, gn = function(t, e) {
  if (t) {
    var r = Ue(t, e);
    return r && r.value;
  }
}, vn = function(t, e, r) {
  var n = Ue(t, e);
  n ? n.value = r : t.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: e,
    next: t.next,
    value: r
  };
}, wn = function(t, e) {
  return t ? !!Ue(t, e) : !1;
}, Sn = function(t, e) {
  if (t)
    return Ue(t, e, !0);
}, bn = function() {
  var e, r = {
    assert: function(n) {
      if (!r.has(n))
        throw new mn("Side channel does not contain " + dn(n));
    },
    delete: function(n) {
      var o = e && e.next, i = Sn(e, n);
      return i && o && o === i && (e = void 0), !!i;
    },
    get: function(n) {
      return gn(e, n);
    },
    has: function(n) {
      return wn(e, n);
    },
    set: function(n, o) {
      e || (e = {
        next: void 0
      }), vn(
        /** @type {NonNullable<typeof $o>} */
        e,
        n,
        o
      );
    }
  };
  return r;
}, dr = Object, On = Error, En = EvalError, Tn = RangeError, Pn = ReferenceError, An = SyntaxError, _n = URIError, Nn = Math.abs, xn = Math.floor, Rn = Math.max, Cn = Math.min, $n = Math.pow, In = Math.round, Dn = Number.isNaN || function(e) {
  return e !== e;
}, Fn = Dn, Mn = function(e) {
  return Fn(e) || e === 0 ? e : e < 0 ? -1 : 1;
}, qn = Object.getOwnPropertyDescriptor, Ce = qn;
if (Ce)
  try {
    Ce([], "length");
  } catch {
    Ce = null;
  }
var mr = Ce, $e = Object.defineProperty || !1;
if ($e)
  try {
    $e({}, "a", { value: 1 });
  } catch {
    $e = !1;
  }
var Bn = $e, Xe, Bt;
function zn() {
  return Bt || (Bt = 1, Xe = function() {
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
  }), Xe;
}
var je, zt;
function kn() {
  if (zt) return je;
  zt = 1;
  var t = typeof Symbol < "u" && Symbol, e = zn();
  return je = function() {
    return typeof t != "function" || typeof Symbol != "function" || typeof t("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, je;
}
var Ye, kt;
function gr() {
  return kt || (kt = 1, Ye = typeof Reflect < "u" && Reflect.getPrototypeOf || null), Ye;
}
var Ze, Ut;
function vr() {
  if (Ut) return Ze;
  Ut = 1;
  var t = dr;
  return Ze = t.getPrototypeOf || null, Ze;
}
var Un = "Function.prototype.bind called on incompatible ", Jn = Object.prototype.toString, Ln = Math.max, Hn = "[object Function]", Jt = function(e, r) {
  for (var n = [], o = 0; o < e.length; o += 1)
    n[o] = e[o];
  for (var i = 0; i < r.length; i += 1)
    n[i + e.length] = r[i];
  return n;
}, Gn = function(e, r) {
  for (var n = [], o = r, i = 0; o < e.length; o += 1, i += 1)
    n[i] = e[o];
  return n;
}, Wn = function(t, e) {
  for (var r = "", n = 0; n < t.length; n += 1)
    r += t[n], n + 1 < t.length && (r += e);
  return r;
}, Kn = function(e) {
  var r = this;
  if (typeof r != "function" || Jn.apply(r) !== Hn)
    throw new TypeError(Un + r);
  for (var n = Gn(arguments, 1), o, i = function() {
    if (this instanceof o) {
      var h = r.apply(
        this,
        Jt(n, arguments)
      );
      return Object(h) === h ? h : this;
    }
    return r.apply(
      e,
      Jt(n, arguments)
    );
  }, a = Ln(0, r.length - n.length), s = [], c = 0; c < a; c++)
    s[c] = "$" + c;
  if (o = Function("binder", "return function (" + Wn(s, ",") + "){ return binder.apply(this,arguments); }")(i), r.prototype) {
    var y = function() {
    };
    y.prototype = r.prototype, o.prototype = new y(), y.prototype = null;
  }
  return o;
}, Vn = Kn, Je = Function.prototype.bind || Vn, Ot = Function.prototype.call, et, Lt;
function wr() {
  return Lt || (Lt = 1, et = Function.prototype.apply), et;
}
var Qn = typeof Reflect < "u" && Reflect && Reflect.apply, Xn = Je, jn = wr(), Yn = Ot, Zn = Qn, eo = Zn || Xn.call(Yn, jn), to = Je, ro = ge, no = Ot, oo = eo, Sr = function(e) {
  if (e.length < 1 || typeof e[0] != "function")
    throw new ro("a function is required");
  return oo(to, no, e);
}, tt, Ht;
function io() {
  if (Ht) return tt;
  Ht = 1;
  var t = Sr, e = mr, r;
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
  return tt = n && typeof n.get == "function" ? t([n.get]) : typeof i == "function" ? (
    /** @type {import('./get')} */
    function(s) {
      return i(s == null ? s : o(s));
    }
  ) : !1, tt;
}
var rt, Gt;
function ao() {
  if (Gt) return rt;
  Gt = 1;
  var t = gr(), e = vr(), r = io();
  return rt = t ? function(o) {
    return t(o);
  } : e ? function(o) {
    if (!o || typeof o != "object" && typeof o != "function")
      throw new TypeError("getProto: not an object");
    return e(o);
  } : r ? function(o) {
    return r(o);
  } : null, rt;
}
var nt, Wt;
function so() {
  if (Wt) return nt;
  Wt = 1;
  var t = Function.prototype.call, e = Object.prototype.hasOwnProperty, r = Je;
  return nt = r.call(t, e), nt;
}
var E, uo = dr, fo = On, lo = En, co = Tn, po = Pn, de = An, ye = ge, yo = _n, ho = Nn, mo = xn, go = Rn, vo = Cn, wo = $n, So = In, bo = Mn, br = Function, ot = function(t) {
  try {
    return br('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, Te = mr, Oo = Bn, it = function() {
  throw new ye();
}, Eo = Te ? function() {
  try {
    return arguments.callee, it;
  } catch {
    try {
      return Te(arguments, "callee").get;
    } catch {
      return it;
    }
  }
}() : it, fe = kn()(), R = ao(), To = vr(), Po = gr(), Or = wr(), Ae = Ot, ce = {}, Ao = typeof Uint8Array > "u" || !R ? E : R(Uint8Array), ne = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? E : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? E : ArrayBuffer,
  "%ArrayIteratorPrototype%": fe && R ? R([][Symbol.iterator]()) : E,
  "%AsyncFromSyncIteratorPrototype%": E,
  "%AsyncFunction%": ce,
  "%AsyncGenerator%": ce,
  "%AsyncGeneratorFunction%": ce,
  "%AsyncIteratorPrototype%": ce,
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
  "%Error%": fo,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": lo,
  "%Float16Array%": typeof Float16Array > "u" ? E : Float16Array,
  "%Float32Array%": typeof Float32Array > "u" ? E : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? E : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? E : FinalizationRegistry,
  "%Function%": br,
  "%GeneratorFunction%": ce,
  "%Int8Array%": typeof Int8Array > "u" ? E : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? E : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? E : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": fe && R ? R(R([][Symbol.iterator]())) : E,
  "%JSON%": typeof JSON == "object" ? JSON : E,
  "%Map%": typeof Map > "u" ? E : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !fe || !R ? E : R((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": uo,
  "%Object.getOwnPropertyDescriptor%": Te,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? E : Promise,
  "%Proxy%": typeof Proxy > "u" ? E : Proxy,
  "%RangeError%": co,
  "%ReferenceError%": po,
  "%Reflect%": typeof Reflect > "u" ? E : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? E : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !fe || !R ? E : R((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? E : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": fe && R ? R(""[Symbol.iterator]()) : E,
  "%Symbol%": fe ? Symbol : E,
  "%SyntaxError%": de,
  "%ThrowTypeError%": Eo,
  "%TypedArray%": Ao,
  "%TypeError%": ye,
  "%Uint8Array%": typeof Uint8Array > "u" ? E : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? E : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? E : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? E : Uint32Array,
  "%URIError%": yo,
  "%WeakMap%": typeof WeakMap > "u" ? E : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? E : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? E : WeakSet,
  "%Function.prototype.call%": Ae,
  "%Function.prototype.apply%": Or,
  "%Object.defineProperty%": Oo,
  "%Object.getPrototypeOf%": To,
  "%Math.abs%": ho,
  "%Math.floor%": mo,
  "%Math.max%": go,
  "%Math.min%": vo,
  "%Math.pow%": wo,
  "%Math.round%": So,
  "%Math.sign%": bo,
  "%Reflect.getPrototypeOf%": Po
};
if (R)
  try {
    null.error;
  } catch (t) {
    var _o = R(R(t));
    ne["%Error.prototype%"] = _o;
  }
var No = function t(e) {
  var r;
  if (e === "%AsyncFunction%")
    r = ot("async function () {}");
  else if (e === "%GeneratorFunction%")
    r = ot("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    r = ot("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var n = t("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var o = t("%AsyncGenerator%");
    o && R && (r = R(o.prototype));
  }
  return ne[e] = r, r;
}, Kt = {
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
}, _e = Je, qe = so(), xo = _e.call(Ae, Array.prototype.concat), Ro = _e.call(Or, Array.prototype.splice), Vt = _e.call(Ae, String.prototype.replace), Be = _e.call(Ae, String.prototype.slice), Co = _e.call(Ae, RegExp.prototype.exec), $o = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Io = /\\(\\)?/g, Do = function(e) {
  var r = Be(e, 0, 1), n = Be(e, -1);
  if (r === "%" && n !== "%")
    throw new de("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new de("invalid intrinsic syntax, expected opening `%`");
  var o = [];
  return Vt(e, $o, function(i, a, s, c) {
    o[o.length] = s ? Vt(c, Io, "$1") : a || i;
  }), o;
}, Fo = function(e, r) {
  var n = e, o;
  if (qe(Kt, n) && (o = Kt[n], n = "%" + o[0] + "%"), qe(ne, n)) {
    var i = ne[n];
    if (i === ce && (i = No(n)), typeof i > "u" && !r)
      throw new ye("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: o,
      name: n,
      value: i
    };
  }
  throw new de("intrinsic " + e + " does not exist!");
}, Et = function(e, r) {
  if (typeof e != "string" || e.length === 0)
    throw new ye("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new ye('"allowMissing" argument must be a boolean');
  if (Co(/^%?[^%]*%?$/, e) === null)
    throw new de("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = Do(e), o = n.length > 0 ? n[0] : "", i = Fo("%" + o + "%", r), a = i.name, s = i.value, c = !1, y = i.alias;
  y && (o = y[0], Ro(n, xo([0, 1], y)));
  for (var h = 1, v = !0; h < n.length; h += 1) {
    var d = n[h], A = Be(d, 0, 1), N = Be(d, -1);
    if ((A === '"' || A === "'" || A === "`" || N === '"' || N === "'" || N === "`") && A !== N)
      throw new de("property names with quotes must have matching quotes");
    if ((d === "constructor" || !v) && (c = !0), o += "." + d, a = "%" + o + "%", qe(ne, a))
      s = ne[a];
    else if (s != null) {
      if (!(d in s)) {
        if (!r)
          throw new ye("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (Te && h + 1 >= n.length) {
        var O = Te(s, d);
        v = !!O, v && "get" in O && !("originalValue" in O.get) ? s = O.get : s = s[d];
      } else
        v = qe(s, d), s = s[d];
      v && !c && (ne[a] = s);
    }
  }
  return s;
}, Er = Et, Tr = Sr, Mo = Tr([Er("%String.prototype.indexOf%")]), Pr = function(e, r) {
  var n = (
    /** @type {(this: unknown, ...args: unknown[]) => unknown} */
    Er(e, !!r)
  );
  return typeof n == "function" && Mo(e, ".prototype.") > -1 ? Tr(
    /** @type {const} */
    [n]
  ) : n;
}, qo = Et, Ne = Pr, Bo = ke, zo = ge, Qt = qo("%Map%", !0), ko = Ne("Map.prototype.get", !0), Uo = Ne("Map.prototype.set", !0), Jo = Ne("Map.prototype.has", !0), Lo = Ne("Map.prototype.delete", !0), Ho = Ne("Map.prototype.size", !0), Ar = !!Qt && /** @type {Exclude<import('.'), false>} */
function() {
  var e, r = {
    assert: function(n) {
      if (!r.has(n))
        throw new zo("Side channel does not contain " + Bo(n));
    },
    delete: function(n) {
      if (e) {
        var o = Lo(e, n);
        return Ho(e) === 0 && (e = void 0), o;
      }
      return !1;
    },
    get: function(n) {
      if (e)
        return ko(e, n);
    },
    has: function(n) {
      return e ? Jo(e, n) : !1;
    },
    set: function(n, o) {
      e || (e = new Qt()), Uo(e, n, o);
    }
  };
  return r;
}, Go = Et, Le = Pr, Wo = ke, Re = Ar, Ko = ge, le = Go("%WeakMap%", !0), Vo = Le("WeakMap.prototype.get", !0), Qo = Le("WeakMap.prototype.set", !0), Xo = Le("WeakMap.prototype.has", !0), jo = Le("WeakMap.prototype.delete", !0), Yo = le ? (
  /** @type {Exclude<import('.'), false>} */
  function() {
    var e, r, n = {
      assert: function(o) {
        if (!n.has(o))
          throw new Ko("Side channel does not contain " + Wo(o));
      },
      delete: function(o) {
        if (le && o && (typeof o == "object" || typeof o == "function")) {
          if (e)
            return jo(e, o);
        } else if (Re && r)
          return r.delete(o);
        return !1;
      },
      get: function(o) {
        return le && o && (typeof o == "object" || typeof o == "function") && e ? Vo(e, o) : r && r.get(o);
      },
      has: function(o) {
        return le && o && (typeof o == "object" || typeof o == "function") && e ? Xo(e, o) : !!r && r.has(o);
      },
      set: function(o, i) {
        le && o && (typeof o == "object" || typeof o == "function") ? (e || (e = new le()), Qo(e, o, i)) : Re && (r || (r = Re()), r.set(o, i));
      }
    };
    return n;
  }
) : Re, Zo = ge, ei = ke, ti = bn, ri = Ar, ni = Yo, oi = ni || ri || ti, ii = function() {
  var e, r = {
    assert: function(n) {
      if (!r.has(n))
        throw new Zo("Side channel does not contain " + ei(n));
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
      e || (e = oi()), e.set(n, o);
    }
  };
  return r;
}, ai = String.prototype.replace, si = /%20/g, Xt = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, _r = {
  default: Xt.RFC3986,
  formatters: {
    RFC1738: function(t) {
      return ai.call(t, si, "+");
    },
    RFC3986: function(t) {
      return String(t);
    }
  },
  RFC1738: Xt.RFC1738
}, ui = _r, at = Object.prototype.hasOwnProperty, te = Array.isArray, H = function() {
  for (var t = [], e = 0; e < 256; ++e)
    t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return t;
}(), fi = function(e) {
  for (; e.length > 1; ) {
    var r = e.pop(), n = r.obj[r.prop];
    if (te(n)) {
      for (var o = [], i = 0; i < n.length; ++i)
        typeof n[i] < "u" && o.push(n[i]);
      r.obj[r.prop] = o;
    }
  }
}, Nr = function(e, r) {
  for (var n = r && r.plainObjects ? { __proto__: null } : {}, o = 0; o < e.length; ++o)
    typeof e[o] < "u" && (n[o] = e[o]);
  return n;
}, li = function t(e, r, n) {
  if (!r)
    return e;
  if (typeof r != "object" && typeof r != "function") {
    if (te(e))
      e.push(r);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !at.call(Object.prototype, r)) && (e[r] = !0);
    else
      return [e, r];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(r);
  var o = e;
  return te(e) && !te(r) && (o = Nr(e, n)), te(e) && te(r) ? (r.forEach(function(i, a) {
    if (at.call(e, a)) {
      var s = e[a];
      s && typeof s == "object" && i && typeof i == "object" ? e[a] = t(s, i, n) : e.push(i);
    } else
      e[a] = i;
  }), e) : Object.keys(r).reduce(function(i, a) {
    var s = r[a];
    return at.call(i, a) ? i[a] = t(i[a], s, n) : i[a] = s, i;
  }, o);
}, ci = function(e, r) {
  return Object.keys(r).reduce(function(n, o) {
    return n[o] = r[o], n;
  }, e);
}, pi = function(t, e, r) {
  var n = t.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, st = 1024, yi = function(e, r, n, o, i) {
  if (e.length === 0)
    return e;
  var a = e;
  if (typeof e == "symbol" ? a = Symbol.prototype.toString.call(e) : typeof e != "string" && (a = String(e)), n === "iso-8859-1")
    return escape(a).replace(/%u[0-9a-f]{4}/gi, function(A) {
      return "%26%23" + parseInt(A.slice(2), 16) + "%3B";
    });
  for (var s = "", c = 0; c < a.length; c += st) {
    for (var y = a.length >= st ? a.slice(c, c + st) : a, h = [], v = 0; v < y.length; ++v) {
      var d = y.charCodeAt(v);
      if (d === 45 || d === 46 || d === 95 || d === 126 || d >= 48 && d <= 57 || d >= 65 && d <= 90 || d >= 97 && d <= 122 || i === ui.RFC1738 && (d === 40 || d === 41)) {
        h[h.length] = y.charAt(v);
        continue;
      }
      if (d < 128) {
        h[h.length] = H[d];
        continue;
      }
      if (d < 2048) {
        h[h.length] = H[192 | d >> 6] + H[128 | d & 63];
        continue;
      }
      if (d < 55296 || d >= 57344) {
        h[h.length] = H[224 | d >> 12] + H[128 | d >> 6 & 63] + H[128 | d & 63];
        continue;
      }
      v += 1, d = 65536 + ((d & 1023) << 10 | y.charCodeAt(v) & 1023), h[h.length] = H[240 | d >> 18] + H[128 | d >> 12 & 63] + H[128 | d >> 6 & 63] + H[128 | d & 63];
    }
    s += h.join("");
  }
  return s;
}, hi = function(e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], n = [], o = 0; o < r.length; ++o)
    for (var i = r[o], a = i.obj[i.prop], s = Object.keys(a), c = 0; c < s.length; ++c) {
      var y = s[c], h = a[y];
      typeof h == "object" && h !== null && n.indexOf(h) === -1 && (r.push({ obj: a, prop: y }), n.push(h));
    }
  return fi(r), e;
}, di = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, mi = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, gi = function(e, r) {
  return [].concat(e, r);
}, vi = function(e, r) {
  if (te(e)) {
    for (var n = [], o = 0; o < e.length; o += 1)
      n.push(r(e[o]));
    return n;
  }
  return r(e);
}, wi = {
  arrayToObject: Nr,
  assign: ci,
  combine: gi,
  compact: hi,
  decode: pi,
  encode: yi,
  isBuffer: mi,
  isRegExp: di,
  maybeMap: vi,
  merge: li
}, xr = ii, Ie = wi, Oe = _r, Si = Object.prototype.hasOwnProperty, Rr = {
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
}, G = Array.isArray, bi = Array.prototype.push, Cr = function(t, e) {
  bi.apply(t, G(e) ? e : [e]);
}, Oi = Date.prototype.toISOString, jt = Oe.default, x = {
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
  format: jt,
  formatter: Oe.formatters[jt],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return Oi.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, Ei = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, ut = {}, Ti = function t(e, r, n, o, i, a, s, c, y, h, v, d, A, N, O, C, w, F) {
  for (var b = e, $ = F, _ = 0, M = !1; ($ = $.get(ut)) !== void 0 && !M; ) {
    var q = $.get(e);
    if (_ += 1, typeof q < "u") {
      if (q === _)
        throw new RangeError("Cyclic object value");
      M = !0;
    }
    typeof $.get(ut) > "u" && (_ = 0);
  }
  if (typeof h == "function" ? b = h(r, b) : b instanceof Date ? b = A(b) : n === "comma" && G(b) && (b = Ie.maybeMap(b, function(L) {
    return L instanceof Date ? A(L) : L;
  })), b === null) {
    if (a)
      return y && !C ? y(r, x.encoder, w, "key", N) : r;
    b = "";
  }
  if (Ei(b) || Ie.isBuffer(b)) {
    if (y) {
      var z = C ? r : y(r, x.encoder, w, "key", N);
      return [O(z) + "=" + O(y(b, x.encoder, w, "value", N))];
    }
    return [O(r) + "=" + O(String(b))];
  }
  var P = [];
  if (typeof b > "u")
    return P;
  var k;
  if (n === "comma" && G(b))
    C && y && (b = Ie.maybeMap(b, y)), k = [{ value: b.length > 0 ? b.join(",") || null : void 0 }];
  else if (G(h))
    k = h;
  else {
    var ee = Object.keys(b);
    k = v ? ee.sort(v) : ee;
  }
  var V = c ? String(r).replace(/\./g, "%2E") : String(r), u = o && G(b) && b.length === 1 ? V + "[]" : V;
  if (i && G(b) && b.length === 0)
    return u + "[]";
  for (var f = 0; f < k.length; ++f) {
    var l = k[f], p = typeof l == "object" && l && typeof l.value < "u" ? l.value : b[l];
    if (!(s && p === null)) {
      var g = d && c ? String(l).replace(/\./g, "%2E") : String(l), S = G(b) ? typeof n == "function" ? n(u, g) : u : u + (d ? "." + g : "[" + g + "]");
      F.set(e, _);
      var I = xr();
      I.set(ut, F), Cr(P, t(
        p,
        S,
        n,
        o,
        i,
        a,
        s,
        c,
        n === "comma" && C && G(b) ? null : y,
        h,
        v,
        d,
        A,
        N,
        O,
        C,
        w,
        I
      ));
    }
  }
  return P;
}, Pi = function(e) {
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
  var n = Oe.default;
  if (typeof e.format < "u") {
    if (!Si.call(Oe.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var o = Oe.formatters[n], i = x.filter;
  (typeof e.filter == "function" || G(e.filter)) && (i = e.filter);
  var a;
  if (e.arrayFormat in Rr ? a = e.arrayFormat : "indices" in e ? a = e.indices ? "indices" : "repeat" : a = x.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
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
}, Ai = function(t, e) {
  var r = t, n = Pi(e), o, i;
  typeof n.filter == "function" ? (i = n.filter, r = i("", r)) : G(n.filter) && (i = n.filter, o = i);
  var a = [];
  if (typeof r != "object" || r === null)
    return "";
  var s = Rr[n.arrayFormat], c = s === "comma" && n.commaRoundTrip;
  o || (o = Object.keys(r)), n.sort && o.sort(n.sort);
  for (var y = xr(), h = 0; h < o.length; ++h) {
    var v = o[h], d = r[v];
    n.skipNulls && d === null || Cr(a, Ti(
      d,
      v,
      s,
      c,
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
      y
    ));
  }
  var A = a.join(n.delimiter), N = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? N += "utf8=%26%2310003%3B&" : N += "utf8=%E2%9C%93&"), A.length > 0 ? N + A : "";
}, _i = Ai, Ni = {
  stringify: _i
}, He = {};
(function(t) {
  function e(o, i) {
    var a = typeof Symbol < "u" && o[Symbol.iterator] || o["@@iterator"];
    if (!a) {
      if (Array.isArray(o) || (a = r(o)) || i) {
        a && (o = a);
        var s = 0, c = function() {
        };
        return { s: c, n: function() {
          return s >= o.length ? { done: !0 } : { done: !1, value: o[s++] };
        }, e: function(A) {
          throw A;
        }, f: c };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var y = !0, h = !1, v;
    return { s: function() {
      a = a.call(o);
    }, n: function() {
      var A = a.next();
      return y = A.done, A;
    }, e: function(A) {
      h = !0, v = A;
    }, f: function() {
      try {
        !y && a.return != null && a.return();
      } finally {
        if (h) throw v;
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
        const y = s.value.split(/ *= */), h = y.shift(), v = y.shift();
        h && v && (i[h] = v);
      }
    } catch (c) {
      a.e(c);
    } finally {
      a.f();
    }
    return i;
  }, t.parseLinks = (o) => {
    const i = {};
    var a = e(o.split(/ *, */)), s;
    try {
      for (a.s(); !(s = a.n()).done; ) {
        const y = s.value.split(/ *; */), h = y[0].slice(1, -1), v = y[1].split(/ *= */)[1].slice(1, -1);
        i[v] = h;
      }
    } catch (c) {
      a.e(c);
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
})(He);
const Yt = sr, $r = He, ze = $r.isObject, Pe = $r.hasOwn;
var xi = T;
function T() {
}
T.prototype.clearTimeout = function() {
  return clearTimeout(this._timer), clearTimeout(this._responseTimeoutTimer), clearTimeout(this._uploadTimeoutTimer), delete this._timer, delete this._responseTimeoutTimer, delete this._uploadTimeoutTimer, this;
};
T.prototype.parse = function(t) {
  return this._parser = t, this;
};
T.prototype.responseType = function(t) {
  return this._responseType = t, this;
};
T.prototype.serialize = function(t) {
  return this._serializer = t, this;
};
T.prototype.timeout = function(t) {
  if (!t || typeof t != "object")
    return this._timeout = t, this._responseTimeout = 0, this._uploadTimeout = 0, this;
  for (const e in t)
    if (Pe(t, e))
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
T.prototype.retry = function(t, e) {
  return (arguments.length === 0 || t === !0) && (t = 1), t <= 0 && (t = 0), this._maxRetries = t, this._retries = 0, this._retryCallback = e, this;
};
const Ri = /* @__PURE__ */ new Set(["ETIMEDOUT", "ECONNRESET", "EADDRINUSE", "ECONNREFUSED", "EPIPE", "ENOTFOUND", "ENETUNREACH", "EAI_AGAIN"]), Ci = /* @__PURE__ */ new Set([408, 413, 429, 500, 502, 503, 504, 521, 522, 524]);
T.prototype._shouldRetry = function(t, e) {
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
  return !!(e && e.status && Ci.has(e.status) || t && (t.code && Ri.has(t.code) || t.timeout && t.code === "ECONNABORTED" || t.crossDomain));
};
T.prototype._retry = function() {
  return this.clearTimeout(), this.req && (this.req = null, this.req = this.request()), this._aborted = !1, this.timedout = !1, this.timedoutError = null, this._end();
};
T.prototype.then = function(t, e) {
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
T.prototype.catch = function(t) {
  return this.then(void 0, t);
};
T.prototype.use = function(t) {
  return t(this), this;
};
T.prototype.ok = function(t) {
  if (typeof t != "function") throw new Error("Callback required");
  return this._okCallback = t, this;
};
T.prototype._isResponseOK = function(t) {
  return t ? this._okCallback ? this._okCallback(t) : t.status >= 200 && t.status < 300 : !1;
};
T.prototype.get = function(t) {
  return this._header[t.toLowerCase()];
};
T.prototype.getHeader = T.prototype.get;
T.prototype.set = function(t, e) {
  if (ze(t)) {
    for (const r in t)
      Pe(t, r) && this.set(r, t[r]);
    return this;
  }
  return this._header[t.toLowerCase()] = e, this.header[t] = e, this;
};
T.prototype.unset = function(t) {
  return delete this._header[t.toLowerCase()], delete this.header[t], this;
};
T.prototype.field = function(t, e, r) {
  if (t == null)
    throw new Error(".field(name, val) name can not be empty");
  if (this._data)
    throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  if (ze(t)) {
    for (const n in t)
      Pe(t, n) && this.field(n, t[n]);
    return this;
  }
  if (Array.isArray(e)) {
    for (const n in e)
      Pe(e, n) && this.field(t, e[n]);
    return this;
  }
  if (e == null)
    throw new Error(".field(name, val) val can not be empty");
  return typeof e == "boolean" && (e = String(e)), r ? this._getFormData().append(t, e, r) : this._getFormData().append(t, e), this;
};
T.prototype.abort = function() {
  if (this._aborted)
    return this;
  if (this._aborted = !0, this.xhr && this.xhr.abort(), this.req) {
    if (Yt.gte(process.version, "v13.0.0") && Yt.lt(process.version, "v14.0.0"))
      throw new Error("Superagent does not work in v13 properly with abort() due to Node.js core changes");
    this.req.abort();
  }
  return this.clearTimeout(), this.emit("abort"), this;
};
T.prototype._auth = function(t, e, r, n) {
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
T.prototype.withCredentials = function(t) {
  return t === void 0 && (t = !0), this._withCredentials = t, this;
};
T.prototype.redirects = function(t) {
  return this._maxRedirects = t, this;
};
T.prototype.maxResponseSize = function(t) {
  if (typeof t != "number")
    throw new TypeError("Invalid argument");
  return this._maxResponseSize = t, this;
};
T.prototype.toJSON = function() {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};
T.prototype.send = function(t) {
  const e = ze(t);
  let r = this._header["content-type"];
  if (this._formData)
    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  if (e && !this._data)
    Array.isArray(t) ? this._data = [] : this._isHost(t) || (this._data = {});
  else if (t && this._data && this._isHost(this._data))
    throw new Error("Can't merge these send calls");
  if (e && ze(this._data))
    for (const n in t) {
      if (typeof t[n] == "bigint" && !t[n].toJSON) throw new Error("Cannot serialize BigInt value to json");
      Pe(t, n) && (this._data[n] = t[n]);
    }
  else {
    if (typeof t == "bigint") throw new Error("Cannot send value of type BigInt");
    typeof t == "string" ? (r || this.type("form"), r = this._header["content-type"], r && (r = r.toLowerCase().trim()), r === "application/x-www-form-urlencoded" ? this._data = this._data ? `${this._data}&${t}` : t : this._data = (this._data || "") + t) : this._data = t;
  }
  return !e || this._isHost(t) ? this : (r || this.type("json"), this);
};
T.prototype.sortQuery = function(t) {
  return this._sort = typeof t > "u" ? !0 : t, this;
};
T.prototype._finalizeQueryString = function() {
  const t = this._query.join("&");
  if (t && (this.url += (this.url.includes("?") ? "&" : "?") + t), this._query.length = 0, this._sort) {
    const e = this.url.indexOf("?");
    if (e >= 0) {
      const r = this.url.slice(e + 1).split("&");
      typeof this._sort == "function" ? r.sort(this._sort) : r.sort(), this.url = this.url.slice(0, e) + "?" + r.join("&");
    }
  }
};
T.prototype._appendQueryString = () => {
  console.warn("Unsupported");
};
T.prototype._timeoutError = function(t, e, r) {
  if (this._aborted)
    return;
  const n = new Error(`${t + e}ms exceeded`);
  n.timeout = e, n.code = "ECONNABORTED", n.errno = r, this.timedout = !0, this.timedoutError = n, this.abort(), this.callback(n);
};
T.prototype._setTimeouts = function() {
  const t = this;
  this._timeout && !this._timer && (this._timer = setTimeout(() => {
    t._timeoutError("Timeout of ", t._timeout, "ETIME");
  }, this._timeout)), this._responseTimeout && !this._responseTimeoutTimer && (this._responseTimeoutTimer = setTimeout(() => {
    t._timeoutError("Response timeout of ", t._responseTimeout, "ETIMEDOUT");
  }, this._responseTimeout));
};
const ft = He;
var $i = Ge;
function Ge() {
}
Ge.prototype.get = function(t) {
  return this.header[t.toLowerCase()];
};
Ge.prototype._setHeaderProperties = function(t) {
  const e = t["content-type"] || "";
  this.type = ft.type(e);
  const r = ft.params(e);
  for (const n in r)
    Object.prototype.hasOwnProperty.call(r, n) && (this[n] = r[n]);
  this.links = {};
  try {
    t.link && (this.links = ft.parseLinks(t.link));
  } catch {
  }
};
Ge.prototype._setStatusProperties = function(t) {
  const e = Math.trunc(t / 100);
  this.statusCode = t, this.status = this.statusCode, this.statusType = e, this.info = e === 1, this.ok = e === 2, this.redirect = e === 3, this.clientError = e === 4, this.serverError = e === 5, this.error = e === 4 || e === 5 ? this.toError() : !1, this.created = t === 201, this.accepted = t === 202, this.noContent = t === 204, this.badRequest = t === 400, this.unauthorized = t === 401, this.notAcceptable = t === 406, this.forbidden = t === 403, this.notFound = t === 404, this.unprocessableEntity = t === 422;
};
function Ii(t, e) {
  var r = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (!r) {
    if (Array.isArray(t) || (r = Di(t)) || e) {
      r && (t = r);
      var n = 0, o = function() {
      };
      return { s: o, n: function() {
        return n >= t.length ? { done: !0 } : { done: !1, value: t[n++] };
      }, e: function(y) {
        throw y;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var i = !0, a = !1, s;
  return { s: function() {
    r = r.call(t);
  }, n: function() {
    var y = r.next();
    return i = y.done, y;
  }, e: function(y) {
    a = !0, s = y;
  }, f: function() {
    try {
      !i && r.return != null && r.return();
    } finally {
      if (a) throw s;
    }
  } };
}
function Di(t, e) {
  if (t) {
    if (typeof t == "string") return Zt(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Zt(t, e);
  }
}
function Zt(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n;
}
function Tt() {
  this._defaults = [];
}
for (var lt = 0, er = ["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects", "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert", "disableTLSCerts"]; lt < er.length; lt++) {
  const t = er[lt];
  Tt.prototype[t] = function() {
    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
      r[n] = arguments[n];
    return this._defaults.push({
      fn: t,
      args: r
    }), this;
  };
}
Tt.prototype._setDefaults = function(t) {
  var e = Ii(this._defaults), r;
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
var Fi = Tt;
(function(t, e) {
  function r(u, f) {
    var l = typeof Symbol < "u" && u[Symbol.iterator] || u["@@iterator"];
    if (!l) {
      if (Array.isArray(u) || (l = n(u)) || f) {
        l && (u = l);
        var p = 0, g = function() {
        };
        return { s: g, n: function() {
          return p >= u.length ? { done: !0 } : { done: !1, value: u[p++] };
        }, e: function(ue) {
          throw ue;
        }, f: g };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var S = !0, I = !1, L;
    return { s: function() {
      l = l.call(u);
    }, n: function() {
      var ue = l.next();
      return S = ue.done, ue;
    }, e: function(ue) {
      I = !0, L = ue;
    }, f: function() {
      try {
        !S && l.return != null && l.return();
      } finally {
        if (I) throw L;
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
    for (var l = 0, p = new Array(f); l < f; l++) p[l] = u[l];
    return p;
  }
  let i;
  typeof window < "u" ? i = window : typeof self > "u" ? (console.warn("Using browser-only version of superagent in non-browser environment"), i = void 0) : i = self;
  const a = Fr, s = Mr, c = Ni, y = xi, h = He, v = h.isObject, d = h.mixin, A = h.hasOwn, N = $i, O = Fi;
  function C() {
  }
  t.exports = function(u, f) {
    return typeof f == "function" ? new e.Request("GET", u).end(f) : arguments.length === 1 ? new e.Request("GET", u) : new e.Request(u, f);
  }, e = t.exports;
  const w = e;
  e.Request = P, w.getXHR = () => {
    if (i.XMLHttpRequest)
      return new i.XMLHttpRequest();
    throw new Error("Browser-only version of superagent could not find XHR");
  };
  const F = "".trim ? (u) => u.trim() : (u) => u.replace(/(^\s*|\s*$)/g, "");
  function b(u) {
    if (!v(u)) return u;
    const f = [];
    for (const l in u)
      A(u, l) && $(f, l, u[l]);
    return f.join("&");
  }
  function $(u, f, l) {
    if (l !== void 0) {
      if (l === null) {
        u.push(encodeURI(f));
        return;
      }
      if (Array.isArray(l)) {
        var p = r(l), g;
        try {
          for (p.s(); !(g = p.n()).done; ) {
            const S = g.value;
            $(u, f, S);
          }
        } catch (S) {
          p.e(S);
        } finally {
          p.f();
        }
      } else if (v(l))
        for (const S in l)
          A(l, S) && $(u, `${f}[${S}]`, l[S]);
      else
        u.push(encodeURI(f) + "=" + encodeURIComponent(l));
    }
  }
  w.serializeObject = b;
  function _(u) {
    const f = {}, l = u.split("&");
    let p, g;
    for (let S = 0, I = l.length; S < I; ++S)
      p = l[S], g = p.indexOf("="), g === -1 ? f[decodeURIComponent(p)] = "" : f[decodeURIComponent(p.slice(0, g))] = decodeURIComponent(p.slice(g + 1));
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
    "application/x-www-form-urlencoded": c.stringify,
    "application/json": s
  }, w.parse = {
    "application/x-www-form-urlencoded": _,
    "application/json": JSON.parse
  };
  function M(u) {
    const f = u.split(/\r?\n/), l = {};
    let p, g, S, I;
    for (let L = 0, X = f.length; L < X; ++L)
      g = f[L], p = g.indexOf(":"), p !== -1 && (S = g.slice(0, p).toLowerCase(), I = F(g.slice(p + 1)), l[S] = I);
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
  d(z.prototype, N.prototype), z.prototype._parseBody = function(u) {
    let f = w.parse[this.type];
    return this.req._parser ? this.req._parser(this, u) : (!f && q(this.type) && (f = w.parse["application/json"]), f && u && (u.length > 0 || u instanceof Object) ? f(u) : null);
  }, z.prototype.toError = function() {
    const u = this.req, f = u.method, l = u.url, p = `cannot ${f} ${l} (${this.status})`, g = new Error(p);
    return g.status = this.status, g.method = f, g.url = l, g;
  }, w.Response = z;
  function P(u, f) {
    const l = this;
    this._query = this._query || [], this.method = u, this.url = f, this.header = {}, this._header = {}, this.on("end", () => {
      let p = null, g = null;
      try {
        g = new z(l);
      } catch (I) {
        return p = new Error("Parser is unable to parse the response"), p.parse = !0, p.original = I, l.xhr ? (p.rawResponse = typeof l.xhr.responseType > "u" ? l.xhr.responseText : l.xhr.response, p.status = l.xhr.status ? l.xhr.status : null, p.statusCode = p.status) : (p.rawResponse = null, p.status = null), l.callback(p);
      }
      l.emit("response", g);
      let S;
      try {
        l._isResponseOK(g) || (S = new Error(g.statusText || g.text || "Unsuccessful HTTP response"));
      } catch (I) {
        S = I;
      }
      S ? (S.original = p, S.response = g, S.status = S.status || g.status, l.callback(S, g)) : l.callback(null, g);
    });
  }
  a(P.prototype), d(P.prototype, y.prototype), P.prototype.type = function(u) {
    return this.set("Content-Type", w.types[u] || u), this;
  }, P.prototype.accept = function(u) {
    return this.set("Accept", w.types[u] || u), this;
  }, P.prototype.auth = function(u, f, l) {
    arguments.length === 1 && (f = ""), typeof f == "object" && f !== null && (l = f, f = ""), l || (l = {
      type: typeof btoa == "function" ? "basic" : "auto"
    });
    const p = l.encoder ? l.encoder : (g) => {
      if (typeof btoa == "function")
        return btoa(g);
      throw new Error("Cannot use basic auth, btoa is not a function");
    };
    return this._auth(u, f, l, p);
  }, P.prototype.query = function(u) {
    return typeof u != "string" && (u = b(u)), u && this._query.push(u), this;
  }, P.prototype.attach = function(u, f, l) {
    if (f) {
      if (this._data)
        throw new Error("superagent can't mix .send() and .attach()");
      this._getFormData().append(u, f, l || f.name);
    }
    return this;
  }, P.prototype._getFormData = function() {
    return this._formData || (this._formData = new i.FormData()), this._formData;
  }, P.prototype.callback = function(u, f) {
    if (this._shouldRetry(u, f))
      return this._retry();
    const l = this._callback;
    this.clearTimeout(), u && (this._maxRetries && (u.retries = this._retries - 1), this.emit("error", u)), l(u, f);
  }, P.prototype.crossDomainError = function() {
    const u = new Error(`Request has been terminated
Possible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.`);
    u.crossDomain = !0, u.status = this.status, u.method = this.method, u.url = this.url, this.callback(u);
  }, P.prototype.agent = function() {
    return console.warn("This is not supported in browser version of superagent"), this;
  }, P.prototype.ca = P.prototype.agent, P.prototype.buffer = P.prototype.ca, P.prototype.write = () => {
    throw new Error("Streaming is not supported in browser version of superagent");
  }, P.prototype.pipe = P.prototype.write, P.prototype._isHost = function(u) {
    return u && typeof u == "object" && !Array.isArray(u) && Object.prototype.toString.call(u) !== "[object Object]";
  }, P.prototype.end = function(u) {
    this._endCalled && console.warn("Warning: .end() was called twice. This is not supported in superagent"), this._endCalled = !0, this._callback = u || C, this._finalizeQueryString(), this._end();
  }, P.prototype._setUploadTimeout = function() {
    const u = this;
    this._uploadTimeout && !this._uploadTimeoutTimer && (this._uploadTimeoutTimer = setTimeout(() => {
      u._timeoutError("Upload timeout of ", u._uploadTimeout, "ETIMEDOUT");
    }, this._uploadTimeout));
  }, P.prototype._end = function() {
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
    const p = (g, S) => {
      S.total > 0 && (S.percent = S.loaded / S.total * 100, S.percent === 100 && clearTimeout(u._uploadTimeoutTimer)), S.direction = g, u.emit("progress", S);
    };
    if (this.hasListeners("progress"))
      try {
        f.addEventListener("progress", p.bind(null, "download")), f.upload && f.upload.addEventListener("progress", p.bind(null, "upload"));
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
      this.header[g] !== null && A(this.header, g) && f.setRequestHeader(g, this.header[g]);
    this._responseType && (f.responseType = this._responseType), this.emit("request", this), f.send(typeof l > "u" ? null : l);
  }, w.agent = () => new O();
  for (var k = 0, ee = ["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"]; k < ee.length; k++) {
    const u = ee[k];
    O.prototype[u.toLowerCase()] = function(f, l) {
      const p = new w.Request(u, f);
      return this._setDefaults(p), l && p.end(l), p;
    };
  }
  O.prototype.del = O.prototype.delete, w.get = (u, f, l) => {
    const p = w("GET", u);
    return typeof f == "function" && (l = f, f = null), f && p.query(f), l && p.end(l), p;
  }, w.head = (u, f, l) => {
    const p = w("HEAD", u);
    return typeof f == "function" && (l = f, f = null), f && p.query(f), l && p.end(l), p;
  }, w.options = (u, f, l) => {
    const p = w("OPTIONS", u);
    return typeof f == "function" && (l = f, f = null), f && p.send(f), l && p.end(l), p;
  };
  function V(u, f, l) {
    const p = w("DELETE", u);
    return typeof f == "function" && (l = f, f = null), f && p.send(f), l && p.end(l), p;
  }
  w.del = V, w.delete = V, w.patch = (u, f, l) => {
    const p = w("PATCH", u);
    return typeof f == "function" && (l = f, f = null), f && p.send(f), l && p.end(l), p;
  }, w.post = (u, f, l) => {
    const p = w("POST", u);
    return typeof f == "function" && (l = f, f = null), f && p.send(f), l && p.end(l), p;
  }, w.put = (u, f, l) => {
    const p = w("PUT", u);
    return typeof f == "function" && (l = f, f = null), f && p.send(f), l && p.end(l), p;
  };
})(ct, ct.exports);
var Mi = ct.exports;
const tr = /* @__PURE__ */ Ir(Mi);
class m {
  /**
   * The base URL against which to resolve every API call's (relative) path.
   * Overrides the default value set in spec file if present
   * @param {String} basePath
   */
  constructor(e = "http://localhost:8080") {
    this.basePath = e.replace(/\/+$/, ""), this.authentications = {}, this.defaultHeaders = {
      "User-Agent": "OpenAPI-Generator/v0/Javascript"
    }, this.timeout = 6e4, this.cache = !0, this.enableCookies = !1, typeof window > "u" && (this.agent = new tr.agent()), this.requestAgent = null, this.plugins = null;
  }
  /**
  * Returns a string representation for an actual parameter.
  * @param param The actual parameter.
  * @returns {String} The string representation of <code>param</code>.
  */
  paramToString(e) {
    return e == null || e == null ? "" : e instanceof Date ? e.toJSON() : m.canBeJsonified(e) ? JSON.stringify(e) : e.toString();
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
    return (n == null || typeof n == "object" && typeof n.length > "u" && !Object.keys(n).length) && (n = e.text), m.convertToType(n, r);
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
  callApi(e, r, n, o, i, a, s, c, y, h, v, d, A) {
    var N = this.buildUrl(e, n, d), O = tr(r, N);
    if (this.plugins !== null)
      for (var C in this.plugins)
        this.plugins.hasOwnProperty(C) && O.use(this.plugins[C]);
    this.applyAuthToRequest(O, c), r.toUpperCase() === "GET" && this.cache === !1 && (o._ = (/* @__PURE__ */ new Date()).getTime()), O.query(this.normalizeParams(o)), O.set(this.defaultHeaders).set(this.normalizeParams(i)), this.requestAgent && O.agent(this.requestAgent), O.timeout(this.timeout);
    var w = this.jsonPreferredMime(y);
    if (w && w != "multipart/form-data" && O.type(w), w === "application/x-www-form-urlencoded") {
      let _ = this.normalizeParams(a), q = new URLSearchParams(_).toString();
      O.send(q);
    } else if (w == "multipart/form-data") {
      var F = this.normalizeParams(a);
      for (var b in F)
        if (F.hasOwnProperty(b)) {
          let _ = F[b];
          this.isFileParam(_) ? O.attach(b, _) : Array.isArray(_) && _.length && this.isFileParam(_[0]) ? _.forEach((M) => O.attach(b, M)) : O.field(b, _);
        }
    } else s != null && (O.header["Content-Type"] || O.type("application/json"), O.send(s));
    var $ = this.jsonPreferredMime(h);
    return $ && O.accept($), v === "Blob" ? O.responseType("blob") : v === "String" && O.responseType("text"), this.enableCookies && (typeof window > "u" ? this.agent._attachCookies(O) : O.withCredentials()), O.end((_, M) => {
      if (A) {
        var q = null;
        if (!_)
          try {
            q = this.deserialize(M, v), this.enableCookies && typeof window > "u" && this.agent._saveCookies(M);
          } catch (z) {
            _ = z;
          }
        A(_, q, M);
      }
    }), O;
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
        return m.parseDate(String(e));
      case "Blob":
        return e;
      default:
        if (r === Object)
          return e;
        if (typeof r.constructFromObject == "function")
          return r.constructFromObject(e);
        if (Array.isArray(r)) {
          var n = r[0];
          return e.map((h) => m.convertToType(h, n));
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
              var c = m.convertToType(a, o), y = m.convertToType(e[a], i);
              s[c] = y;
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
        e.hasOwnProperty(o) && (r[o] = m.convertToType(e[o], n));
    else
      for (var i in e)
        e.hasOwnProperty(i) && (r[i] = m.convertToType(e[i], n));
  }
}
m.CollectionFormatEnum = {
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
m.instance = new m();
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
    return e && (r = r || new K(), e.hasOwnProperty("cardNumberPlain") && (r.cardNumberPlain = m.convertToType(e.cardNumberPlain, "String")), e.hasOwnProperty("ownerName") && (r.ownerName = m.convertToType(e.ownerName, "String")), e.hasOwnProperty("expiry") && (r.expiry = m.convertToType(e.expiry, "Date")), e.hasOwnProperty("status") && (r.status = m.convertToType(e.status, "String"))), r;
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
    return e && (r = r || new B(), e.hasOwnProperty("id") && (r.id = m.convertToType(e.id, "Number")), e.hasOwnProperty("maskedCardNumber") && (r.maskedCardNumber = m.convertToType(e.maskedCardNumber, "String")), e.hasOwnProperty("ownerName") && (r.ownerName = m.convertToType(e.ownerName, "String")), e.hasOwnProperty("expiry") && (r.expiry = m.convertToType(e.expiry, "Date")), e.hasOwnProperty("status") && (r.status = m.convertToType(e.status, "String")), e.hasOwnProperty("balanceMinor") && (r.balanceMinor = m.convertToType(e.balanceMinor, "Number"))), r;
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
    return e && (r = r || new oe(), e.hasOwnProperty("status") && (r.status = m.convertToType(e.status, "String"))), r;
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
class ie {
  /**
   * Constructs a new <code>LoginRequest</code>.
   * @alias module:model/LoginRequest
   * @param username {String} 
   * @param password {String} 
   */
  constructor(e, r) {
    ie.initialize(this, e, r);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(e, r, n) {
    e.username = r, e.password = n;
  }
  /**
   * Constructs a <code>LoginRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/LoginRequest} obj Optional instance to populate.
   * @return {module:model/LoginRequest} The populated <code>LoginRequest</code> instance.
   */
  static constructFromObject(e, r) {
    return e && (r = r || new ie(), e.hasOwnProperty("username") && (r.username = m.convertToType(e.username, "String")), e.hasOwnProperty("password") && (r.password = m.convertToType(e.password, "String"))), r;
  }
  /**
   * Validates the JSON data with respect to <code>LoginRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>LoginRequest</code>.
   */
  static validateJSON(e) {
    for (const r of ie.RequiredProperties)
      if (!e.hasOwnProperty(r))
        throw new Error("The required field `" + r + "` is not found in the JSON data: " + JSON.stringify(e));
    if (e.username && !(typeof e.username == "string" || e.username instanceof String))
      throw new Error("Expected the field `username` to be a primitive type in the JSON string but got " + e.username);
    if (e.password && !(typeof e.password == "string" || e.password instanceof String))
      throw new Error("Expected the field `password` to be a primitive type in the JSON string but got " + e.password);
    return !0;
  }
}
ie.RequiredProperties = ["username", "password"];
ie.prototype.username = void 0;
ie.prototype.password = void 0;
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
    return e && (r = r || new U(), e.hasOwnProperty("direction") && (r.direction = m.convertToType(e.direction, "String")), e.hasOwnProperty("nullHandling") && (r.nullHandling = m.convertToType(e.nullHandling, "String")), e.hasOwnProperty("ascending") && (r.ascending = m.convertToType(e.ascending, "Boolean")), e.hasOwnProperty("property") && (r.property = m.convertToType(e.property, "String")), e.hasOwnProperty("ignoreCase") && (r.ignoreCase = m.convertToType(e.ignoreCase, "Boolean"))), r;
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
class J {
  /**
   * Constructs a new <code>PageableObject</code>.
   * @alias module:model/PageableObject
   */
  constructor() {
    J.initialize(this);
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
    return e && (r = r || new J(), e.hasOwnProperty("offset") && (r.offset = m.convertToType(e.offset, "Number")), e.hasOwnProperty("sort") && (r.sort = m.convertToType(e.sort, [U])), e.hasOwnProperty("pageNumber") && (r.pageNumber = m.convertToType(e.pageNumber, "Number")), e.hasOwnProperty("pageSize") && (r.pageSize = m.convertToType(e.pageSize, "Number")), e.hasOwnProperty("paged") && (r.paged = m.convertToType(e.paged, "Boolean")), e.hasOwnProperty("unpaged") && (r.unpaged = m.convertToType(e.unpaged, "Boolean"))), r;
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
J.prototype.offset = void 0;
J.prototype.sort = void 0;
J.prototype.pageNumber = void 0;
J.prototype.pageSize = void 0;
J.prototype.paged = void 0;
J.prototype.unpaged = void 0;
class D {
  /**
   * Constructs a new <code>PageCardResponse</code>.
   * @alias module:model/PageCardResponse
   */
  constructor() {
    D.initialize(this);
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
    return e && (r = r || new D(), e.hasOwnProperty("totalPages") && (r.totalPages = m.convertToType(e.totalPages, "Number")), e.hasOwnProperty("totalElements") && (r.totalElements = m.convertToType(e.totalElements, "Number")), e.hasOwnProperty("first") && (r.first = m.convertToType(e.first, "Boolean")), e.hasOwnProperty("last") && (r.last = m.convertToType(e.last, "Boolean")), e.hasOwnProperty("numberOfElements") && (r.numberOfElements = m.convertToType(e.numberOfElements, "Number")), e.hasOwnProperty("size") && (r.size = m.convertToType(e.size, "Number")), e.hasOwnProperty("content") && (r.content = m.convertToType(e.content, [B])), e.hasOwnProperty("number") && (r.number = m.convertToType(e.number, "Number")), e.hasOwnProperty("sort") && (r.sort = m.convertToType(e.sort, [U])), e.hasOwnProperty("pageable") && (r.pageable = J.constructFromObject(e.pageable)), e.hasOwnProperty("empty") && (r.empty = m.convertToType(e.empty, "Boolean"))), r;
  }
  /**
   * Validates the JSON data with respect to <code>PageCardResponse</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>PageCardResponse</code>.
   */
  static validateJSON(e) {
    if (e.content) {
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
    return e.pageable && J.validateJSON(e.pageable), !0;
  }
}
D.prototype.totalPages = void 0;
D.prototype.totalElements = void 0;
D.prototype.first = void 0;
D.prototype.last = void 0;
D.prototype.numberOfElements = void 0;
D.prototype.size = void 0;
D.prototype.content = void 0;
D.prototype.number = void 0;
D.prototype.sort = void 0;
D.prototype.pageable = void 0;
D.prototype.empty = void 0;
class me {
  /**
   * Constructs a new <code>Pageable</code>.
   * @alias module:model/Pageable
   */
  constructor() {
    me.initialize(this);
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
    return e && (r = r || new me(), e.hasOwnProperty("page") && (r.page = m.convertToType(e.page, "Number")), e.hasOwnProperty("size") && (r.size = m.convertToType(e.size, "Number")), e.hasOwnProperty("sort") && (r.sort = m.convertToType(e.sort, ["String"]))), r;
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
me.prototype.page = void 0;
me.prototype.size = void 0;
me.prototype.sort = void 0;
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
    return e && (r = r || new Y(), e.hasOwnProperty("fromCardId") && (r.fromCardId = m.convertToType(e.fromCardId, "Number")), e.hasOwnProperty("toCardId") && (r.toCardId = m.convertToType(e.toCardId, "Number")), e.hasOwnProperty("amountMinor") && (r.amountMinor = m.convertToType(e.amountMinor, "Number"))), r;
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
class qi {
  /**
  * Constructs a new AuthControllerApi. 
  * @alias module:api/AuthControllerApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(e) {
    this.apiClient = e || m.instance;
  }
  /**
   * Callback function to receive the result of the login operation.
   * @callback module:api/AuthControllerApi~loginCallback
   * @param {String} error Error message, if any.
   * @param {Object} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * @param {module:model/LoginRequest} loginRequest 
   * @param {module:api/AuthControllerApi~loginCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link Object}
   */
  login(e, r) {
    let n = e;
    if (e == null)
      throw new Error("Missing the required parameter 'loginRequest' when calling login");
    let o = {}, i = {}, a = {}, s = {}, c = [], y = ["application/json"], h = ["*/*"], v = Object;
    return this.apiClient.callApi(
      "/api/auth/login",
      "POST",
      o,
      i,
      a,
      s,
      n,
      c,
      y,
      h,
      v,
      null,
      r
    );
  }
}
class Bi {
  /**
  * Constructs a new CardControllerApi. 
  * @alias module:api/CardControllerApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(e) {
    this.apiClient = e || m.instance;
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
    }, i = {}, a = {}, s = {}, c = [], y = [], h = [];
    return this.apiClient.callApi(
      "/api/cards/{cardId}",
      "DELETE",
      o,
      i,
      a,
      s,
      n,
      c,
      y,
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
    }, s = {}, c = {}, y = [], h = ["application/json"], v = ["*/*"], d = B;
    return this.apiClient.callApi(
      "/api/cards",
      "POST",
      i,
      a,
      s,
      c,
      o,
      y,
      h,
      v,
      d,
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
   * @param {module:model/Pageable} pageable 
   * @param {module:api/CardControllerApi~listCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/PageCardResponse}
   */
  list(e, r) {
    let n = null;
    if (e == null)
      throw new Error("Missing the required parameter 'pageable' when calling list");
    let o = {}, i = {
      pageable: e
    }, a = {}, s = {}, c = [], y = [], h = ["*/*"], v = D;
    return this.apiClient.callApi(
      "/api/cards",
      "GET",
      o,
      i,
      a,
      s,
      n,
      c,
      y,
      h,
      v,
      null,
      r
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
    }, a = {}, s = {}, c = {}, y = [], h = ["application/json"], v = ["*/*"], d = B;
    return this.apiClient.callApi(
      "/api/cards/{cardId}/status",
      "PATCH",
      i,
      a,
      s,
      c,
      o,
      y,
      h,
      v,
      d,
      null,
      n
    );
  }
}
class zi {
  /**
  * Constructs a new TransferControllerApi. 
  * @alias module:api/TransferControllerApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(e) {
    this.apiClient = e || m.instance;
  }
  /**
   * Callback function to receive the result of the transfer operation.
   * @callback module:api/TransferControllerApi~transferCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */
  /**
   * @param {module:model/TransferRequest} transferRequest 
   * @param {module:api/TransferControllerApi~transferCallback} callback The callback function, accepting three arguments: error, data, response
   */
  transfer(e, r) {
    let n = e;
    if (e == null)
      throw new Error("Missing the required parameter 'transferRequest' when calling transfer");
    let o = {}, i = {}, a = {}, s = {}, c = [], y = ["application/json"], h = [];
    return this.apiClient.callApi(
      "/api/transfers",
      "POST",
      o,
      i,
      a,
      s,
      n,
      c,
      y,
      h,
      null,
      null,
      r
    );
  }
}
export {
  m as ApiClient,
  qi as AuthControllerApi,
  Bi as CardControllerApi,
  K as CardCreateRequest,
  B as CardResponse,
  oe as CardUpdateStatusRequest,
  ie as LoginRequest,
  D as PageCardResponse,
  me as Pageable,
  J as PageableObject,
  U as SortObject,
  zi as TransferControllerApi,
  Y as TransferRequest
};
