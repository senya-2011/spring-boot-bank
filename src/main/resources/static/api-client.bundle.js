var xt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function zr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function kr(t) {
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
var dt = { exports: {} }, ur = { exports: {} };
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
})(ur);
var Ur = ur.exports, Jr = Te;
Te.default = Te;
Te.stable = pr;
Te.stableStringify = pr;
var De = "[...]", fr = "[Circular]", se = [], ne = [];
function lr() {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  };
}
function Te(t, e, r, n) {
  typeof n > "u" && (n = lr()), mt(t, "", 0, [], void 0, 0, n);
  var o;
  try {
    ne.length === 0 ? o = JSON.stringify(t, e, r) : o = JSON.stringify(t, cr(e), r);
  } catch {
    return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
  } finally {
    for (; se.length !== 0; ) {
      var i = se.pop();
      i.length === 4 ? Object.defineProperty(i[0], i[1], i[3]) : i[0][i[1]] = i[2];
    }
  }
  return o;
}
function ye(t, e, r, n) {
  var o = Object.getOwnPropertyDescriptor(n, r);
  o.get !== void 0 ? o.configurable ? (Object.defineProperty(n, r, { value: t }), se.push([n, r, e, o])) : ne.push([e, r, t]) : (n[r] = t, se.push([n, r, e]));
}
function mt(t, e, r, n, o, i, a) {
  i += 1;
  var s;
  if (typeof t == "object" && t !== null) {
    for (s = 0; s < n.length; s++)
      if (n[s] === t) {
        ye(fr, t, e, o);
        return;
      }
    if (typeof a.depthLimit < "u" && i > a.depthLimit) {
      ye(De, t, e, o);
      return;
    }
    if (typeof a.edgesLimit < "u" && r + 1 > a.edgesLimit) {
      ye(De, t, e, o);
      return;
    }
    if (n.push(t), Array.isArray(t))
      for (s = 0; s < t.length; s++)
        mt(t[s], s, s, n, t, i, a);
    else {
      var c = Object.keys(t);
      for (s = 0; s < c.length; s++) {
        var p = c[s];
        mt(t[p], p, s, n, t, i, a);
      }
    }
    n.pop();
  }
}
function Lr(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
function pr(t, e, r, n) {
  typeof n > "u" && (n = lr());
  var o = gt(t, "", 0, [], void 0, 0, n) || t, i;
  try {
    ne.length === 0 ? i = JSON.stringify(o, e, r) : i = JSON.stringify(o, cr(e), r);
  } catch {
    return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
  } finally {
    for (; se.length !== 0; ) {
      var a = se.pop();
      a.length === 4 ? Object.defineProperty(a[0], a[1], a[3]) : a[0][a[1]] = a[2];
    }
  }
  return i;
}
function gt(t, e, r, n, o, i, a) {
  i += 1;
  var s;
  if (typeof t == "object" && t !== null) {
    for (s = 0; s < n.length; s++)
      if (n[s] === t) {
        ye(fr, t, e, o);
        return;
      }
    try {
      if (typeof t.toJSON == "function")
        return;
    } catch {
      return;
    }
    if (typeof a.depthLimit < "u" && i > a.depthLimit) {
      ye(De, t, e, o);
      return;
    }
    if (typeof a.edgesLimit < "u" && r + 1 > a.edgesLimit) {
      ye(De, t, e, o);
      return;
    }
    if (n.push(t), Array.isArray(t))
      for (s = 0; s < t.length; s++)
        gt(t[s], s, s, n, t, i, a);
    else {
      var c = {}, p = Object.keys(t).sort(Lr);
      for (s = 0; s < p.length; s++) {
        var y = p[s];
        gt(t[y], y, s, n, t, i, a), c[y] = t[y];
      }
      if (typeof o < "u")
        se.push([o, e, t]), o[e] = c;
      else
        return c;
    }
    n.pop();
  }
}
function cr(t) {
  return t = typeof t < "u" ? t : function(e, r) {
    return r;
  }, function(e, r) {
    if (ne.length > 0)
      for (var n = 0; n < ne.length; n++) {
        var o = ne[n];
        if (o[1] === e && o[0] === r) {
          r = o[2], ne.splice(n, 1);
          break;
        }
      }
    return t.call(this, e, r);
  };
}
var ve = TypeError;
const Hr = {}, Gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hr
}, Symbol.toStringTag, { value: "Module" })), yr = /* @__PURE__ */ kr(Gr);
var Et = typeof Map == "function" && Map.prototype, Ke = Object.getOwnPropertyDescriptor && Et ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, qe = Et && Ke && typeof Ke.get == "function" ? Ke.get : null, Rt = Et && Map.prototype.forEach, Tt = typeof Set == "function" && Set.prototype, Ve = Object.getOwnPropertyDescriptor && Tt ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, Me = Tt && Ve && typeof Ve.get == "function" ? Ve.get : null, Ct = Tt && Set.prototype.forEach, Wr = typeof WeakMap == "function" && WeakMap.prototype, Se = Wr ? WeakMap.prototype.has : null, Kr = typeof WeakSet == "function" && WeakSet.prototype, be = Kr ? WeakSet.prototype.has : null, Vr = typeof WeakRef == "function" && WeakRef.prototype, It = Vr ? WeakRef.prototype.deref : null, Qr = Boolean.prototype.valueOf, Xr = Object.prototype.toString, jr = Function.prototype.toString, Yr = String.prototype.match, Pt = String.prototype.slice, Y = String.prototype.replace, Zr = String.prototype.toUpperCase, $t = String.prototype.toLowerCase, hr = RegExp.prototype.test, Ft = Array.prototype.concat, W = Array.prototype.join, en = Array.prototype.slice, Dt = Math.floor, vt = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, Qe = Object.getOwnPropertySymbols, wt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, de = typeof Symbol == "function" && typeof Symbol.iterator == "object", Oe = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === de || !0) ? Symbol.toStringTag : null, dr = Object.prototype.propertyIsEnumerable, qt = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
  return t.__proto__;
} : null);
function Mt(t, e) {
  if (t === 1 / 0 || t === -1 / 0 || t !== t || t && t > -1e3 && t < 1e3 || hr.call(/e/, e))
    return e;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof t == "number") {
    var n = t < 0 ? -Dt(-t) : Dt(t);
    if (n !== t) {
      var o = String(n), i = Pt.call(e, o.length + 1);
      return Y.call(o, r, "$&_") + "." + Y.call(Y.call(i, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return Y.call(e, r, "$&_");
}
var St = yr, Bt = St.custom, zt = vr(Bt) ? Bt : null, mr = {
  __proto__: null,
  double: '"',
  single: "'"
}, tn = {
  __proto__: null,
  double: /(["\\])/g,
  single: /(['\\])/g
}, Ue = function t(e, r, n, o) {
  var i = r || {};
  if (Q(i, "quoteStyle") && !Q(mr, i.quoteStyle))
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
    return Sr(e, i);
  if (typeof e == "number") {
    if (e === 0)
      return 1 / 0 / e > 0 ? "0" : "-0";
    var c = String(e);
    return s ? Mt(e, c) : c;
  }
  if (typeof e == "bigint") {
    var p = String(e) + "n";
    return s ? Mt(e, p) : p;
  }
  var y = typeof i.depth > "u" ? 5 : i.depth;
  if (typeof n > "u" && (n = 0), n >= y && y > 0 && typeof e == "object")
    return bt(e) ? "[Array]" : "[Object]";
  var m = Sn(i, n);
  if (typeof o > "u")
    o = [];
  else if (wr(o, e) >= 0)
    return "[Circular]";
  function h(u, f, l) {
    if (f && (o = en.call(o), o.push(f)), l) {
      var d = {
        depth: i.depth
      };
      return Q(i, "quoteStyle") && (d.quoteStyle = i.quoteStyle), t(u, d, n + 1, o);
    }
    return t(u, i, n + 1, o);
  }
  if (typeof e == "function" && !kt(e)) {
    var T = pn(e), N = Re(e, h);
    return "[Function" + (T ? ": " + T : " (anonymous)") + "]" + (N.length > 0 ? " { " + W.call(N, ", ") + " }" : "");
  }
  if (vr(e)) {
    var S = de ? Y.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : wt.call(e);
    return typeof e == "object" && !de ? we(S) : S;
  }
  if (gn(e)) {
    for (var x = "<" + $t.call(String(e.nodeName)), w = e.attributes || [], D = 0; D < w.length; D++)
      x += " " + w[D].name + "=" + gr(rn(w[D].value), "double", i);
    return x += ">", e.childNodes && e.childNodes.length && (x += "..."), x += "</" + $t.call(String(e.nodeName)) + ">", x;
  }
  if (bt(e)) {
    if (e.length === 0)
      return "[]";
    var O = Re(e, h);
    return m && !wn(O) ? "[" + Ot(O, m) + "]" : "[ " + W.call(O, ", ") + " ]";
  }
  if (on(e)) {
    var I = Re(e, h);
    return !("cause" in Error.prototype) && "cause" in e && !dr.call(e, "cause") ? "{ [" + String(e) + "] " + W.call(Ft.call("[cause]: " + h(e.cause), I), ", ") + " }" : I.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + W.call(I, ", ") + " }";
  }
  if (typeof e == "object" && a) {
    if (zt && typeof e[zt] == "function" && St)
      return St(e, { depth: y - n });
    if (a !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if (cn(e)) {
    var _ = [];
    return Rt && Rt.call(e, function(u, f) {
      _.push(h(f, e, !0) + " => " + h(u, e));
    }), Ut("Map", qe.call(e), _, m);
  }
  if (dn(e)) {
    var q = [];
    return Ct && Ct.call(e, function(u) {
      q.push(h(u, e));
    }), Ut("Set", Me.call(e), q, m);
  }
  if (yn(e))
    return Xe("WeakMap");
  if (mn(e))
    return Xe("WeakSet");
  if (hn(e))
    return Xe("WeakRef");
  if (sn(e))
    return we(h(Number(e)));
  if (fn(e))
    return we(h(vt.call(e)));
  if (un(e))
    return we(Qr.call(e));
  if (an(e))
    return we(h(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && e === globalThis || typeof xt < "u" && e === xt)
    return "{ [object globalThis] }";
  if (!nn(e) && !kt(e)) {
    var M = Re(e, h), z = qt ? qt(e) === Object.prototype : e instanceof Object || e.constructor === Object, A = e instanceof Object ? "" : "null prototype", k = !z && Oe && Object(e) === e && Oe in e ? Pt.call(ee(e), 8, -1) : A ? "Object" : "", te = z || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", V = te + (k || A ? "[" + W.call(Ft.call([], k || [], A || []), ": ") + "] " : "");
    return M.length === 0 ? V + "{}" : m ? V + "{" + Ot(M, m) + "}" : V + "{ " + W.call(M, ", ") + " }";
  }
  return String(e);
};
function gr(t, e, r) {
  var n = r.quoteStyle || e, o = mr[n];
  return o + t + o;
}
function rn(t) {
  return Y.call(String(t), /"/g, "&quot;");
}
function ue(t) {
  return !Oe || !(typeof t == "object" && (Oe in t || typeof t[Oe] < "u"));
}
function bt(t) {
  return ee(t) === "[object Array]" && ue(t);
}
function nn(t) {
  return ee(t) === "[object Date]" && ue(t);
}
function kt(t) {
  return ee(t) === "[object RegExp]" && ue(t);
}
function on(t) {
  return ee(t) === "[object Error]" && ue(t);
}
function an(t) {
  return ee(t) === "[object String]" && ue(t);
}
function sn(t) {
  return ee(t) === "[object Number]" && ue(t);
}
function un(t) {
  return ee(t) === "[object Boolean]" && ue(t);
}
function vr(t) {
  if (de)
    return t && typeof t == "object" && t instanceof Symbol;
  if (typeof t == "symbol")
    return !0;
  if (!t || typeof t != "object" || !wt)
    return !1;
  try {
    return wt.call(t), !0;
  } catch {
  }
  return !1;
}
function fn(t) {
  if (!t || typeof t != "object" || !vt)
    return !1;
  try {
    return vt.call(t), !0;
  } catch {
  }
  return !1;
}
var ln = Object.prototype.hasOwnProperty || function(t) {
  return t in this;
};
function Q(t, e) {
  return ln.call(t, e);
}
function ee(t) {
  return Xr.call(t);
}
function pn(t) {
  if (t.name)
    return t.name;
  var e = Yr.call(jr.call(t), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function wr(t, e) {
  if (t.indexOf)
    return t.indexOf(e);
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] === e)
      return r;
  return -1;
}
function cn(t) {
  if (!qe || !t || typeof t != "object")
    return !1;
  try {
    qe.call(t);
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
function yn(t) {
  if (!Se || !t || typeof t != "object")
    return !1;
  try {
    Se.call(t, Se);
    try {
      be.call(t, be);
    } catch {
      return !0;
    }
    return t instanceof WeakMap;
  } catch {
  }
  return !1;
}
function hn(t) {
  if (!It || !t || typeof t != "object")
    return !1;
  try {
    return It.call(t), !0;
  } catch {
  }
  return !1;
}
function dn(t) {
  if (!Me || !t || typeof t != "object")
    return !1;
  try {
    Me.call(t);
    try {
      qe.call(t);
    } catch {
      return !0;
    }
    return t instanceof Set;
  } catch {
  }
  return !1;
}
function mn(t) {
  if (!be || !t || typeof t != "object")
    return !1;
  try {
    be.call(t, be);
    try {
      Se.call(t, Se);
    } catch {
      return !0;
    }
    return t instanceof WeakSet;
  } catch {
  }
  return !1;
}
function gn(t) {
  return !t || typeof t != "object" ? !1 : typeof HTMLElement < "u" && t instanceof HTMLElement ? !0 : typeof t.nodeName == "string" && typeof t.getAttribute == "function";
}
function Sr(t, e) {
  if (t.length > e.maxStringLength) {
    var r = t.length - e.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return Sr(Pt.call(t, 0, e.maxStringLength), e) + n;
  }
  var o = tn[e.quoteStyle || "single"];
  o.lastIndex = 0;
  var i = Y.call(Y.call(t, o, "\\$1"), /[\x00-\x1f]/g, vn);
  return gr(i, "single", e);
}
function vn(t) {
  var e = t.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + Zr.call(e.toString(16));
}
function we(t) {
  return "Object(" + t + ")";
}
function Xe(t) {
  return t + " { ? }";
}
function Ut(t, e, r, n) {
  var o = n ? Ot(r, n) : W.call(r, ", ");
  return t + " (" + e + ") {" + o + "}";
}
function wn(t) {
  for (var e = 0; e < t.length; e++)
    if (wr(t[e], `
`) >= 0)
      return !1;
  return !0;
}
function Sn(t, e) {
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
function Ot(t, e) {
  if (t.length === 0)
    return "";
  var r = `
` + e.prev + e.base;
  return r + W.call(t, "," + r) + `
` + e.prev;
}
function Re(t, e) {
  var r = bt(t), n = [];
  if (r) {
    n.length = t.length;
    for (var o = 0; o < t.length; o++)
      n[o] = Q(t, o) ? e(t[o], t) : "";
  }
  var i = typeof Qe == "function" ? Qe(t) : [], a;
  if (de) {
    a = {};
    for (var s = 0; s < i.length; s++)
      a["$" + i[s]] = i[s];
  }
  for (var c in t)
    Q(t, c) && (r && String(Number(c)) === c && c < t.length || de && a["$" + c] instanceof Symbol || (hr.call(/[^\w$]/, c) ? n.push(e(c, t) + ": " + e(t[c], t)) : n.push(c + ": " + e(t[c], t))));
  if (typeof Qe == "function")
    for (var p = 0; p < i.length; p++)
      dr.call(t, i[p]) && n.push("[" + e(i[p]) + "]: " + e(t[i[p]], t));
  return n;
}
var bn = Ue, On = ve, Je = function(t, e, r) {
  for (var n = t, o; (o = n.next) != null; n = o)
    if (o.key === e)
      return n.next = o.next, r || (o.next = /** @type {NonNullable<typeof list.next>} */
      t.next, t.next = o), o;
}, En = function(t, e) {
  if (t) {
    var r = Je(t, e);
    return r && r.value;
  }
}, Tn = function(t, e, r) {
  var n = Je(t, e);
  n ? n.value = r : t.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: e,
    next: t.next,
    value: r
  };
}, Pn = function(t, e) {
  return t ? !!Je(t, e) : !1;
}, An = function(t, e) {
  if (t)
    return Je(t, e, !0);
}, _n = function() {
  var e, r = {
    assert: function(n) {
      if (!r.has(n))
        throw new On("Side channel does not contain " + bn(n));
    },
    delete: function(n) {
      var o = e && e.next, i = An(e, n);
      return i && o && o === i && (e = void 0), !!i;
    },
    get: function(n) {
      return En(e, n);
    },
    has: function(n) {
      return Pn(e, n);
    },
    set: function(n, o) {
      e || (e = {
        next: void 0
      }), Tn(
        /** @type {NonNullable<typeof $o>} */
        e,
        n,
        o
      );
    }
  };
  return r;
}, br = Object, Nn = Error, xn = EvalError, Rn = RangeError, Cn = ReferenceError, In = SyntaxError, $n = URIError, Fn = Math.abs, Dn = Math.floor, qn = Math.max, Mn = Math.min, Bn = Math.pow, zn = Math.round, kn = Number.isNaN || function(e) {
  return e !== e;
}, Un = kn, Jn = function(e) {
  return Un(e) || e === 0 ? e : e < 0 ? -1 : 1;
}, Ln = Object.getOwnPropertyDescriptor, Ie = Ln;
if (Ie)
  try {
    Ie([], "length");
  } catch {
    Ie = null;
  }
var Or = Ie, $e = Object.defineProperty || !1;
if ($e)
  try {
    $e({}, "a", { value: 1 });
  } catch {
    $e = !1;
  }
var Hn = $e, je, Jt;
function Gn() {
  return Jt || (Jt = 1, je = function() {
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
  }), je;
}
var Ye, Lt;
function Wn() {
  if (Lt) return Ye;
  Lt = 1;
  var t = typeof Symbol < "u" && Symbol, e = Gn();
  return Ye = function() {
    return typeof t != "function" || typeof Symbol != "function" || typeof t("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, Ye;
}
var Ze, Ht;
function Er() {
  return Ht || (Ht = 1, Ze = typeof Reflect < "u" && Reflect.getPrototypeOf || null), Ze;
}
var et, Gt;
function Tr() {
  if (Gt) return et;
  Gt = 1;
  var t = br;
  return et = t.getPrototypeOf || null, et;
}
var tt, Wt;
function Kn() {
  if (Wt) return tt;
  Wt = 1;
  var t = "Function.prototype.bind called on incompatible ", e = Object.prototype.toString, r = Math.max, n = "[object Function]", o = function(c, p) {
    for (var y = [], m = 0; m < c.length; m += 1)
      y[m] = c[m];
    for (var h = 0; h < p.length; h += 1)
      y[h + c.length] = p[h];
    return y;
  }, i = function(c, p) {
    for (var y = [], m = p, h = 0; m < c.length; m += 1, h += 1)
      y[h] = c[m];
    return y;
  }, a = function(s, c) {
    for (var p = "", y = 0; y < s.length; y += 1)
      p += s[y], y + 1 < s.length && (p += c);
    return p;
  };
  return tt = function(c) {
    var p = this;
    if (typeof p != "function" || e.apply(p) !== n)
      throw new TypeError(t + p);
    for (var y = i(arguments, 1), m, h = function() {
      if (this instanceof m) {
        var w = p.apply(
          this,
          o(y, arguments)
        );
        return Object(w) === w ? w : this;
      }
      return p.apply(
        c,
        o(y, arguments)
      );
    }, T = r(0, p.length - y.length), N = [], S = 0; S < T; S++)
      N[S] = "$" + S;
    if (m = Function("binder", "return function (" + a(N, ",") + "){ return binder.apply(this,arguments); }")(h), p.prototype) {
      var x = function() {
      };
      x.prototype = p.prototype, m.prototype = new x(), x.prototype = null;
    }
    return m;
  }, tt;
}
var rt, Kt;
function Le() {
  if (Kt) return rt;
  Kt = 1;
  var t = Kn();
  return rt = Function.prototype.bind || t, rt;
}
var nt, Vt;
function At() {
  return Vt || (Vt = 1, nt = Function.prototype.call), nt;
}
var ot, Qt;
function Pr() {
  return Qt || (Qt = 1, ot = Function.prototype.apply), ot;
}
var Vn = typeof Reflect < "u" && Reflect && Reflect.apply, Qn = Le(), Xn = Pr(), jn = At(), Yn = Vn, Zn = Yn || Qn.call(jn, Xn), eo = Le(), to = ve, ro = At(), no = Zn, Ar = function(e) {
  if (e.length < 1 || typeof e[0] != "function")
    throw new to("a function is required");
  return no(eo, ro, e);
}, it, Xt;
function oo() {
  if (Xt) return it;
  Xt = 1;
  var t = Ar, e = Or, r;
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
  return it = n && typeof n.get == "function" ? t([n.get]) : typeof i == "function" ? (
    /** @type {import('./get')} */
    function(s) {
      return i(s == null ? s : o(s));
    }
  ) : !1, it;
}
var at, jt;
function io() {
  if (jt) return at;
  jt = 1;
  var t = Er(), e = Tr(), r = oo();
  return at = t ? function(o) {
    return t(o);
  } : e ? function(o) {
    if (!o || typeof o != "object" && typeof o != "function")
      throw new TypeError("getProto: not an object");
    return e(o);
  } : r ? function(o) {
    return r(o);
  } : null, at;
}
var st, Yt;
function ao() {
  if (Yt) return st;
  Yt = 1;
  var t = Function.prototype.call, e = Object.prototype.hasOwnProperty, r = Le();
  return st = r.call(t, e), st;
}
var E, so = br, uo = Nn, fo = xn, lo = Rn, po = Cn, me = In, he = ve, co = $n, yo = Fn, ho = Dn, mo = qn, go = Mn, vo = Bn, wo = zn, So = Jn, _r = Function, ut = function(t) {
  try {
    return _r('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, Pe = Or, bo = Hn, ft = function() {
  throw new he();
}, Oo = Pe ? function() {
  try {
    return arguments.callee, ft;
  } catch {
    try {
      return Pe(arguments, "callee").get;
    } catch {
      return ft;
    }
  }
}() : ft, le = Wn()(), C = io(), Eo = Tr(), To = Er(), Nr = Pr(), _e = At(), ce = {}, Po = typeof Uint8Array > "u" || !C ? E : C(Uint8Array), oe = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? E : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? E : ArrayBuffer,
  "%ArrayIteratorPrototype%": le && C ? C([][Symbol.iterator]()) : E,
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
  "%Error%": uo,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": fo,
  "%Float16Array%": typeof Float16Array > "u" ? E : Float16Array,
  "%Float32Array%": typeof Float32Array > "u" ? E : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? E : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? E : FinalizationRegistry,
  "%Function%": _r,
  "%GeneratorFunction%": ce,
  "%Int8Array%": typeof Int8Array > "u" ? E : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? E : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? E : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": le && C ? C(C([][Symbol.iterator]())) : E,
  "%JSON%": typeof JSON == "object" ? JSON : E,
  "%Map%": typeof Map > "u" ? E : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !le || !C ? E : C((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": so,
  "%Object.getOwnPropertyDescriptor%": Pe,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? E : Promise,
  "%Proxy%": typeof Proxy > "u" ? E : Proxy,
  "%RangeError%": lo,
  "%ReferenceError%": po,
  "%Reflect%": typeof Reflect > "u" ? E : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? E : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !le || !C ? E : C((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? E : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": le && C ? C(""[Symbol.iterator]()) : E,
  "%Symbol%": le ? Symbol : E,
  "%SyntaxError%": me,
  "%ThrowTypeError%": Oo,
  "%TypedArray%": Po,
  "%TypeError%": he,
  "%Uint8Array%": typeof Uint8Array > "u" ? E : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? E : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? E : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? E : Uint32Array,
  "%URIError%": co,
  "%WeakMap%": typeof WeakMap > "u" ? E : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? E : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? E : WeakSet,
  "%Function.prototype.call%": _e,
  "%Function.prototype.apply%": Nr,
  "%Object.defineProperty%": bo,
  "%Object.getPrototypeOf%": Eo,
  "%Math.abs%": yo,
  "%Math.floor%": ho,
  "%Math.max%": mo,
  "%Math.min%": go,
  "%Math.pow%": vo,
  "%Math.round%": wo,
  "%Math.sign%": So,
  "%Reflect.getPrototypeOf%": To
};
if (C)
  try {
    null.error;
  } catch (t) {
    var Ao = C(C(t));
    oe["%Error.prototype%"] = Ao;
  }
var _o = function t(e) {
  var r;
  if (e === "%AsyncFunction%")
    r = ut("async function () {}");
  else if (e === "%GeneratorFunction%")
    r = ut("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    r = ut("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var n = t("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var o = t("%AsyncGenerator%");
    o && C && (r = C(o.prototype));
  }
  return oe[e] = r, r;
}, Zt = {
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
}, Ne = Le(), Be = ao(), No = Ne.call(_e, Array.prototype.concat), xo = Ne.call(Nr, Array.prototype.splice), er = Ne.call(_e, String.prototype.replace), ze = Ne.call(_e, String.prototype.slice), Ro = Ne.call(_e, RegExp.prototype.exec), Co = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Io = /\\(\\)?/g, $o = function(e) {
  var r = ze(e, 0, 1), n = ze(e, -1);
  if (r === "%" && n !== "%")
    throw new me("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new me("invalid intrinsic syntax, expected opening `%`");
  var o = [];
  return er(e, Co, function(i, a, s, c) {
    o[o.length] = s ? er(c, Io, "$1") : a || i;
  }), o;
}, Fo = function(e, r) {
  var n = e, o;
  if (Be(Zt, n) && (o = Zt[n], n = "%" + o[0] + "%"), Be(oe, n)) {
    var i = oe[n];
    if (i === ce && (i = _o(n)), typeof i > "u" && !r)
      throw new he("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: o,
      name: n,
      value: i
    };
  }
  throw new me("intrinsic " + e + " does not exist!");
}, _t = function(e, r) {
  if (typeof e != "string" || e.length === 0)
    throw new he("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new he('"allowMissing" argument must be a boolean');
  if (Ro(/^%?[^%]*%?$/, e) === null)
    throw new me("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = $o(e), o = n.length > 0 ? n[0] : "", i = Fo("%" + o + "%", r), a = i.name, s = i.value, c = !1, p = i.alias;
  p && (o = p[0], xo(n, No([0, 1], p)));
  for (var y = 1, m = !0; y < n.length; y += 1) {
    var h = n[y], T = ze(h, 0, 1), N = ze(h, -1);
    if ((T === '"' || T === "'" || T === "`" || N === '"' || N === "'" || N === "`") && T !== N)
      throw new me("property names with quotes must have matching quotes");
    if ((h === "constructor" || !m) && (c = !0), o += "." + h, a = "%" + o + "%", Be(oe, a))
      s = oe[a];
    else if (s != null) {
      if (!(h in s)) {
        if (!r)
          throw new he("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (Pe && y + 1 >= n.length) {
        var S = Pe(s, h);
        m = !!S, m && "get" in S && !("originalValue" in S.get) ? s = S.get : s = s[h];
      } else
        m = Be(s, h), s = s[h];
      m && !c && (oe[a] = s);
    }
  }
  return s;
}, xr = _t, Rr = Ar, Do = Rr([xr("%String.prototype.indexOf%")]), Cr = function(e, r) {
  var n = (
    /** @type {(this: unknown, ...args: unknown[]) => unknown} */
    xr(e, !!r)
  );
  return typeof n == "function" && Do(e, ".prototype.") > -1 ? Rr(
    /** @type {const} */
    [n]
  ) : n;
}, qo = _t, xe = Cr, Mo = Ue, Bo = ve, tr = qo("%Map%", !0), zo = xe("Map.prototype.get", !0), ko = xe("Map.prototype.set", !0), Uo = xe("Map.prototype.has", !0), Jo = xe("Map.prototype.delete", !0), Lo = xe("Map.prototype.size", !0), Ir = !!tr && /** @type {Exclude<import('.'), false>} */
function() {
  var e, r = {
    assert: function(n) {
      if (!r.has(n))
        throw new Bo("Side channel does not contain " + Mo(n));
    },
    delete: function(n) {
      if (e) {
        var o = Jo(e, n);
        return Lo(e) === 0 && (e = void 0), o;
      }
      return !1;
    },
    get: function(n) {
      if (e)
        return zo(e, n);
    },
    has: function(n) {
      return e ? Uo(e, n) : !1;
    },
    set: function(n, o) {
      e || (e = new tr()), ko(e, n, o);
    }
  };
  return r;
}, Ho = _t, He = Cr, Go = Ue, Ce = Ir, Wo = ve, pe = Ho("%WeakMap%", !0), Ko = He("WeakMap.prototype.get", !0), Vo = He("WeakMap.prototype.set", !0), Qo = He("WeakMap.prototype.has", !0), Xo = He("WeakMap.prototype.delete", !0), jo = pe ? (
  /** @type {Exclude<import('.'), false>} */
  function() {
    var e, r, n = {
      assert: function(o) {
        if (!n.has(o))
          throw new Wo("Side channel does not contain " + Go(o));
      },
      delete: function(o) {
        if (pe && o && (typeof o == "object" || typeof o == "function")) {
          if (e)
            return Xo(e, o);
        } else if (Ce && r)
          return r.delete(o);
        return !1;
      },
      get: function(o) {
        return pe && o && (typeof o == "object" || typeof o == "function") && e ? Ko(e, o) : r && r.get(o);
      },
      has: function(o) {
        return pe && o && (typeof o == "object" || typeof o == "function") && e ? Qo(e, o) : !!r && r.has(o);
      },
      set: function(o, i) {
        pe && o && (typeof o == "object" || typeof o == "function") ? (e || (e = new pe()), Vo(e, o, i)) : Ce && (r || (r = Ce()), r.set(o, i));
      }
    };
    return n;
  }
) : Ce, Yo = ve, Zo = Ue, ei = _n, ti = Ir, ri = jo, ni = ri || ti || ei, oi = function() {
  var e, r = {
    assert: function(n) {
      if (!r.has(n))
        throw new Yo("Side channel does not contain " + Zo(n));
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
      e || (e = ni()), e.set(n, o);
    }
  };
  return r;
}, ii = String.prototype.replace, ai = /%20/g, rr = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, $r = {
  default: rr.RFC3986,
  formatters: {
    RFC1738: function(t) {
      return ii.call(t, ai, "+");
    },
    RFC3986: function(t) {
      return String(t);
    }
  },
  RFC1738: rr.RFC1738
}, si = $r, lt = Object.prototype.hasOwnProperty, re = Array.isArray, H = function() {
  for (var t = [], e = 0; e < 256; ++e)
    t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return t;
}(), ui = function(e) {
  for (; e.length > 1; ) {
    var r = e.pop(), n = r.obj[r.prop];
    if (re(n)) {
      for (var o = [], i = 0; i < n.length; ++i)
        typeof n[i] < "u" && o.push(n[i]);
      r.obj[r.prop] = o;
    }
  }
}, Fr = function(e, r) {
  for (var n = r && r.plainObjects ? { __proto__: null } : {}, o = 0; o < e.length; ++o)
    typeof e[o] < "u" && (n[o] = e[o]);
  return n;
}, fi = function t(e, r, n) {
  if (!r)
    return e;
  if (typeof r != "object" && typeof r != "function") {
    if (re(e))
      e.push(r);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !lt.call(Object.prototype, r)) && (e[r] = !0);
    else
      return [e, r];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(r);
  var o = e;
  return re(e) && !re(r) && (o = Fr(e, n)), re(e) && re(r) ? (r.forEach(function(i, a) {
    if (lt.call(e, a)) {
      var s = e[a];
      s && typeof s == "object" && i && typeof i == "object" ? e[a] = t(s, i, n) : e.push(i);
    } else
      e[a] = i;
  }), e) : Object.keys(r).reduce(function(i, a) {
    var s = r[a];
    return lt.call(i, a) ? i[a] = t(i[a], s, n) : i[a] = s, i;
  }, o);
}, li = function(e, r) {
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
}, pt = 1024, ci = function(e, r, n, o, i) {
  if (e.length === 0)
    return e;
  var a = e;
  if (typeof e == "symbol" ? a = Symbol.prototype.toString.call(e) : typeof e != "string" && (a = String(e)), n === "iso-8859-1")
    return escape(a).replace(/%u[0-9a-f]{4}/gi, function(T) {
      return "%26%23" + parseInt(T.slice(2), 16) + "%3B";
    });
  for (var s = "", c = 0; c < a.length; c += pt) {
    for (var p = a.length >= pt ? a.slice(c, c + pt) : a, y = [], m = 0; m < p.length; ++m) {
      var h = p.charCodeAt(m);
      if (h === 45 || h === 46 || h === 95 || h === 126 || h >= 48 && h <= 57 || h >= 65 && h <= 90 || h >= 97 && h <= 122 || i === si.RFC1738 && (h === 40 || h === 41)) {
        y[y.length] = p.charAt(m);
        continue;
      }
      if (h < 128) {
        y[y.length] = H[h];
        continue;
      }
      if (h < 2048) {
        y[y.length] = H[192 | h >> 6] + H[128 | h & 63];
        continue;
      }
      if (h < 55296 || h >= 57344) {
        y[y.length] = H[224 | h >> 12] + H[128 | h >> 6 & 63] + H[128 | h & 63];
        continue;
      }
      m += 1, h = 65536 + ((h & 1023) << 10 | p.charCodeAt(m) & 1023), y[y.length] = H[240 | h >> 18] + H[128 | h >> 12 & 63] + H[128 | h >> 6 & 63] + H[128 | h & 63];
    }
    s += y.join("");
  }
  return s;
}, yi = function(e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], n = [], o = 0; o < r.length; ++o)
    for (var i = r[o], a = i.obj[i.prop], s = Object.keys(a), c = 0; c < s.length; ++c) {
      var p = s[c], y = a[p];
      typeof y == "object" && y !== null && n.indexOf(y) === -1 && (r.push({ obj: a, prop: p }), n.push(y));
    }
  return ui(r), e;
}, hi = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, di = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, mi = function(e, r) {
  return [].concat(e, r);
}, gi = function(e, r) {
  if (re(e)) {
    for (var n = [], o = 0; o < e.length; o += 1)
      n.push(r(e[o]));
    return n;
  }
  return r(e);
}, vi = {
  arrayToObject: Fr,
  assign: li,
  combine: mi,
  compact: yi,
  decode: pi,
  encode: ci,
  isBuffer: di,
  isRegExp: hi,
  maybeMap: gi,
  merge: fi
}, Dr = oi, Fe = vi, Ee = $r, wi = Object.prototype.hasOwnProperty, qr = {
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
}, G = Array.isArray, Si = Array.prototype.push, Mr = function(t, e) {
  Si.apply(t, G(e) ? e : [e]);
}, bi = Date.prototype.toISOString, nr = Ee.default, R = {
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
  encoder: Fe.encode,
  encodeValuesOnly: !1,
  filter: void 0,
  format: nr,
  formatter: Ee.formatters[nr],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return bi.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, Oi = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, ct = {}, Ei = function t(e, r, n, o, i, a, s, c, p, y, m, h, T, N, S, x, w, D) {
  for (var O = e, I = D, _ = 0, q = !1; (I = I.get(ct)) !== void 0 && !q; ) {
    var M = I.get(e);
    if (_ += 1, typeof M < "u") {
      if (M === _)
        throw new RangeError("Cyclic object value");
      q = !0;
    }
    typeof I.get(ct) > "u" && (_ = 0);
  }
  if (typeof y == "function" ? O = y(r, O) : O instanceof Date ? O = T(O) : n === "comma" && G(O) && (O = Fe.maybeMap(O, function(L) {
    return L instanceof Date ? T(L) : L;
  })), O === null) {
    if (a)
      return p && !x ? p(r, R.encoder, w, "key", N) : r;
    O = "";
  }
  if (Oi(O) || Fe.isBuffer(O)) {
    if (p) {
      var z = x ? r : p(r, R.encoder, w, "key", N);
      return [S(z) + "=" + S(p(O, R.encoder, w, "value", N))];
    }
    return [S(r) + "=" + S(String(O))];
  }
  var A = [];
  if (typeof O > "u")
    return A;
  var k;
  if (n === "comma" && G(O))
    x && p && (O = Fe.maybeMap(O, p)), k = [{ value: O.length > 0 ? O.join(",") || null : void 0 }];
  else if (G(y))
    k = y;
  else {
    var te = Object.keys(O);
    k = m ? te.sort(m) : te;
  }
  var V = c ? String(r).replace(/\./g, "%2E") : String(r), u = o && G(O) && O.length === 1 ? V + "[]" : V;
  if (i && G(O) && O.length === 0)
    return u + "[]";
  for (var f = 0; f < k.length; ++f) {
    var l = k[f], d = typeof l == "object" && l && typeof l.value < "u" ? l.value : O[l];
    if (!(s && d === null)) {
      var v = h && c ? String(l).replace(/\./g, "%2E") : String(l), b = G(O) ? typeof n == "function" ? n(u, v) : u : u + (h ? "." + v : "[" + v + "]");
      D.set(e, _);
      var $ = Dr();
      $.set(ct, D), Mr(A, t(
        d,
        b,
        n,
        o,
        i,
        a,
        s,
        c,
        n === "comma" && x && G(O) ? null : p,
        y,
        m,
        h,
        T,
        N,
        S,
        x,
        w,
        $
      ));
    }
  }
  return A;
}, Ti = function(e) {
  if (!e)
    return R;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.encodeDotInKeys < "u" && typeof e.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var r = e.charset || R.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = Ee.default;
  if (typeof e.format < "u") {
    if (!wi.call(Ee.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var o = Ee.formatters[n], i = R.filter;
  (typeof e.filter == "function" || G(e.filter)) && (i = e.filter);
  var a;
  if (e.arrayFormat in qr ? a = e.arrayFormat : "indices" in e ? a = e.indices ? "indices" : "repeat" : a = R.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var s = typeof e.allowDots > "u" ? e.encodeDotInKeys === !0 ? !0 : R.allowDots : !!e.allowDots;
  return {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : R.addQueryPrefix,
    allowDots: s,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : R.allowEmptyArrays,
    arrayFormat: a,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : R.charsetSentinel,
    commaRoundTrip: !!e.commaRoundTrip,
    delimiter: typeof e.delimiter > "u" ? R.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : R.encode,
    encodeDotInKeys: typeof e.encodeDotInKeys == "boolean" ? e.encodeDotInKeys : R.encodeDotInKeys,
    encoder: typeof e.encoder == "function" ? e.encoder : R.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : R.encodeValuesOnly,
    filter: i,
    format: n,
    formatter: o,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : R.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : R.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : R.strictNullHandling
  };
}, Pi = function(t, e) {
  var r = t, n = Ti(e), o, i;
  typeof n.filter == "function" ? (i = n.filter, r = i("", r)) : G(n.filter) && (i = n.filter, o = i);
  var a = [];
  if (typeof r != "object" || r === null)
    return "";
  var s = qr[n.arrayFormat], c = s === "comma" && n.commaRoundTrip;
  o || (o = Object.keys(r)), n.sort && o.sort(n.sort);
  for (var p = Dr(), y = 0; y < o.length; ++y) {
    var m = o[y], h = r[m];
    n.skipNulls && h === null || Mr(a, Ei(
      h,
      m,
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
      p
    ));
  }
  var T = a.join(n.delimiter), N = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? N += "utf8=%26%2310003%3B&" : N += "utf8=%E2%9C%93&"), T.length > 0 ? N + T : "";
}, Ai = Pi, _i = {
  stringify: Ai
}, Ge = {};
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
        }, e: function(T) {
          throw T;
        }, f: c };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var p = !0, y = !1, m;
    return { s: function() {
      a = a.call(o);
    }, n: function() {
      var T = a.next();
      return p = T.done, T;
    }, e: function(T) {
      y = !0, m = T;
    }, f: function() {
      try {
        !p && a.return != null && a.return();
      } finally {
        if (y) throw m;
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
        const p = s.value.split(/ *= */), y = p.shift(), m = p.shift();
        y && m && (i[y] = m);
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
        const p = s.value.split(/ *; */), y = p[0].slice(1, -1), m = p[1].split(/ *= */)[1].slice(1, -1);
        i[m] = y;
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
})(Ge);
const or = yr, Br = Ge, ke = Br.isObject, Ae = Br.hasOwn;
var Ni = P;
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
    if (Ae(t, e))
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
const xi = /* @__PURE__ */ new Set(["ETIMEDOUT", "ECONNRESET", "EADDRINUSE", "ECONNREFUSED", "EPIPE", "ENOTFOUND", "ENETUNREACH", "EAI_AGAIN"]), Ri = /* @__PURE__ */ new Set([408, 413, 429, 500, 502, 503, 504, 521, 522, 524]);
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
  return !!(e && e.status && Ri.has(e.status) || t && (t.code && xi.has(t.code) || t.timeout && t.code === "ECONNABORTED" || t.crossDomain));
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
  if (ke(t)) {
    for (const r in t)
      Ae(t, r) && this.set(r, t[r]);
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
  if (ke(t)) {
    for (const n in t)
      Ae(t, n) && this.field(n, t[n]);
    return this;
  }
  if (Array.isArray(e)) {
    for (const n in e)
      Ae(e, n) && this.field(t, e[n]);
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
    if (or.gte(process.version, "v13.0.0") && or.lt(process.version, "v14.0.0"))
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
  const e = ke(t);
  let r = this._header["content-type"];
  if (this._formData)
    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  if (e && !this._data)
    Array.isArray(t) ? this._data = [] : this._isHost(t) || (this._data = {});
  else if (t && this._data && this._isHost(this._data))
    throw new Error("Can't merge these send calls");
  if (e && ke(this._data))
    for (const n in t) {
      if (typeof t[n] == "bigint" && !t[n].toJSON) throw new Error("Cannot serialize BigInt value to json");
      Ae(t, n) && (this._data[n] = t[n]);
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
const yt = Ge;
var Ci = We;
function We() {
}
We.prototype.get = function(t) {
  return this.header[t.toLowerCase()];
};
We.prototype._setHeaderProperties = function(t) {
  const e = t["content-type"] || "";
  this.type = yt.type(e);
  const r = yt.params(e);
  for (const n in r)
    Object.prototype.hasOwnProperty.call(r, n) && (this[n] = r[n]);
  this.links = {};
  try {
    t.link && (this.links = yt.parseLinks(t.link));
  } catch {
  }
};
We.prototype._setStatusProperties = function(t) {
  const e = Math.trunc(t / 100);
  this.statusCode = t, this.status = this.statusCode, this.statusType = e, this.info = e === 1, this.ok = e === 2, this.redirect = e === 3, this.clientError = e === 4, this.serverError = e === 5, this.error = e === 4 || e === 5 ? this.toError() : !1, this.created = t === 201, this.accepted = t === 202, this.noContent = t === 204, this.badRequest = t === 400, this.unauthorized = t === 401, this.notAcceptable = t === 406, this.forbidden = t === 403, this.notFound = t === 404, this.unprocessableEntity = t === 422;
};
function Ii(t, e) {
  var r = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (!r) {
    if (Array.isArray(t) || (r = $i(t)) || e) {
      r && (t = r);
      var n = 0, o = function() {
      };
      return { s: o, n: function() {
        return n >= t.length ? { done: !0 } : { done: !1, value: t[n++] };
      }, e: function(p) {
        throw p;
      }, f: o };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var i = !0, a = !1, s;
  return { s: function() {
    r = r.call(t);
  }, n: function() {
    var p = r.next();
    return i = p.done, p;
  }, e: function(p) {
    a = !0, s = p;
  }, f: function() {
    try {
      !i && r.return != null && r.return();
    } finally {
      if (a) throw s;
    }
  } };
}
function $i(t, e) {
  if (t) {
    if (typeof t == "string") return ir(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ir(t, e);
  }
}
function ir(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
  return n;
}
function Nt() {
  this._defaults = [];
}
for (var ht = 0, ar = ["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects", "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert", "disableTLSCerts"]; ht < ar.length; ht++) {
  const t = ar[ht];
  Nt.prototype[t] = function() {
    for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
      r[n] = arguments[n];
    return this._defaults.push({
      fn: t,
      args: r
    }), this;
  };
}
Nt.prototype._setDefaults = function(t) {
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
var Fi = Nt;
(function(t, e) {
  function r(u, f) {
    var l = typeof Symbol < "u" && u[Symbol.iterator] || u["@@iterator"];
    if (!l) {
      if (Array.isArray(u) || (l = n(u)) || f) {
        l && (u = l);
        var d = 0, v = function() {
        };
        return { s: v, n: function() {
          return d >= u.length ? { done: !0 } : { done: !1, value: u[d++] };
        }, e: function(fe) {
          throw fe;
        }, f: v };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var b = !0, $ = !1, L;
    return { s: function() {
      l = l.call(u);
    }, n: function() {
      var fe = l.next();
      return b = fe.done, fe;
    }, e: function(fe) {
      $ = !0, L = fe;
    }, f: function() {
      try {
        !b && l.return != null && l.return();
      } finally {
        if ($) throw L;
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
  const a = Ur, s = Jr, c = _i, p = Ni, y = Ge, m = y.isObject, h = y.mixin, T = y.hasOwn, N = Ci, S = Fi;
  function x() {
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
        var d = r(l), v;
        try {
          for (d.s(); !(v = d.n()).done; ) {
            const b = v.value;
            I(u, f, b);
          }
        } catch (b) {
          d.e(b);
        } finally {
          d.f();
        }
      } else if (m(l))
        for (const b in l)
          T(l, b) && I(u, `${f}[${b}]`, l[b]);
      else
        u.push(encodeURI(f) + "=" + encodeURIComponent(l));
    }
  }
  w.serializeObject = O;
  function _(u) {
    const f = {}, l = u.split("&");
    let d, v;
    for (let b = 0, $ = l.length; b < $; ++b)
      d = l[b], v = d.indexOf("="), v === -1 ? f[decodeURIComponent(d)] = "" : f[decodeURIComponent(d.slice(0, v))] = decodeURIComponent(d.slice(v + 1));
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
  function q(u) {
    const f = u.split(/\r?\n/), l = {};
    let d, v, b, $;
    for (let L = 0, j = f.length; L < j; ++L)
      v = f[L], d = v.indexOf(":"), d !== -1 && (b = v.slice(0, d).toLowerCase(), $ = D(v.slice(d + 1)), l[b] = $);
    return l;
  }
  function M(u) {
    return /[/+]json($|[^-\w])/i.test(u);
  }
  function z(u) {
    this.req = u, this.xhr = this.req.xhr, this.text = this.req.method !== "HEAD" && (this.xhr.responseType === "" || this.xhr.responseType === "text") || typeof this.xhr.responseType > "u" ? this.xhr.responseText : null, this.statusText = this.req.xhr.statusText;
    let f = this.xhr.status;
    f === 1223 && (f = 204), this._setStatusProperties(f), this.headers = q(this.xhr.getAllResponseHeaders()), this.header = this.headers, this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this._setHeaderProperties(this.header), this.text === null && u._responseType ? this.body = this.xhr.response : this.body = this.req.method === "HEAD" ? null : this._parseBody(this.text ? this.text : this.xhr.response);
  }
  h(z.prototype, N.prototype), z.prototype._parseBody = function(u) {
    let f = w.parse[this.type];
    return this.req._parser ? this.req._parser(this, u) : (!f && M(this.type) && (f = w.parse["application/json"]), f && u && (u.length > 0 || u instanceof Object) ? f(u) : null);
  }, z.prototype.toError = function() {
    const u = this.req, f = u.method, l = u.url, d = `cannot ${f} ${l} (${this.status})`, v = new Error(d);
    return v.status = this.status, v.method = f, v.url = l, v;
  }, w.Response = z;
  function A(u, f) {
    const l = this;
    this._query = this._query || [], this.method = u, this.url = f, this.header = {}, this._header = {}, this.on("end", () => {
      let d = null, v = null;
      try {
        v = new z(l);
      } catch ($) {
        return d = new Error("Parser is unable to parse the response"), d.parse = !0, d.original = $, l.xhr ? (d.rawResponse = typeof l.xhr.responseType > "u" ? l.xhr.responseText : l.xhr.response, d.status = l.xhr.status ? l.xhr.status : null, d.statusCode = d.status) : (d.rawResponse = null, d.status = null), l.callback(d);
      }
      l.emit("response", v);
      let b;
      try {
        l._isResponseOK(v) || (b = new Error(v.statusText || v.text || "Unsuccessful HTTP response"));
      } catch ($) {
        b = $;
      }
      b ? (b.original = d, b.response = v, b.status = b.status || v.status, l.callback(b, v)) : l.callback(null, v);
    });
  }
  a(A.prototype), h(A.prototype, p.prototype), A.prototype.type = function(u) {
    return this.set("Content-Type", w.types[u] || u), this;
  }, A.prototype.accept = function(u) {
    return this.set("Accept", w.types[u] || u), this;
  }, A.prototype.auth = function(u, f, l) {
    arguments.length === 1 && (f = ""), typeof f == "object" && f !== null && (l = f, f = ""), l || (l = {
      type: typeof btoa == "function" ? "basic" : "auto"
    });
    const d = l.encoder ? l.encoder : (v) => {
      if (typeof btoa == "function")
        return btoa(v);
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
    this._endCalled && console.warn("Warning: .end() was called twice. This is not supported in superagent"), this._endCalled = !0, this._callback = u || x, this._finalizeQueryString(), this._end();
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
      const v = f.readyState;
      if (v >= 2 && u._responseTimeoutTimer && clearTimeout(u._responseTimeoutTimer), v !== 4)
        return;
      let b;
      try {
        b = f.status;
      } catch {
        b = 0;
      }
      if (!b)
        return u.timedout || u._aborted ? void 0 : u.crossDomainError();
      u.emit("end");
    });
    const d = (v, b) => {
      b.total > 0 && (b.percent = b.loaded / b.total * 100, b.percent === 100 && clearTimeout(u._uploadTimeoutTimer)), b.direction = v, u.emit("progress", b);
    };
    if (this.hasListeners("progress"))
      try {
        f.addEventListener("progress", d.bind(null, "download")), f.upload && f.upload.addEventListener("progress", d.bind(null, "upload"));
      } catch {
      }
    f.upload && this._setUploadTimeout();
    try {
      this.username && this.password ? f.open(this.method, this.url, !0, this.username, this.password) : f.open(this.method, this.url, !0);
    } catch (v) {
      return this.callback(v);
    }
    if (this._withCredentials && (f.withCredentials = !0), !this._formData && this.method !== "GET" && this.method !== "HEAD" && typeof l != "string" && !this._isHost(l)) {
      const v = this._header["content-type"];
      let b = this._serializer || w.serialize[v ? v.split(";")[0] : ""];
      !b && M(v) && (b = w.serialize["application/json"]), b && (l = b(l));
    }
    for (const v in this.header)
      this.header[v] !== null && T(this.header, v) && f.setRequestHeader(v, this.header[v]);
    this._responseType && (f.responseType = this._responseType), this.emit("request", this), f.send(typeof l > "u" ? null : l);
  }, w.agent = () => new S();
  for (var k = 0, te = ["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"]; k < te.length; k++) {
    const u = te[k];
    S.prototype[u.toLowerCase()] = function(f, l) {
      const d = new w.Request(u, f);
      return this._setDefaults(d), l && d.end(l), d;
    };
  }
  S.prototype.del = S.prototype.delete, w.get = (u, f, l) => {
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
})(dt, dt.exports);
var Di = dt.exports;
const sr = /* @__PURE__ */ zr(Di);
class g {
  /**
   * The base URL against which to resolve every API call's (relative) path.
   * Overrides the default value set in spec file if present
   * @param {String} basePath
   */
  constructor(e = "http://localhost:8080") {
    this.basePath = e.replace(/\/+$/, ""), this.authentications = {}, this.defaultHeaders = {
      "User-Agent": "OpenAPI-Generator/v0/Javascript"
    }, this.timeout = 6e4, this.cache = !0, this.enableCookies = !1, typeof window > "u" && (this.agent = new sr.agent()), this.requestAgent = null, this.plugins = null;
  }
  /**
  * Returns a string representation for an actual parameter.
  * @param param The actual parameter.
  * @returns {String} The string representation of <code>param</code>.
  */
  paramToString(e) {
    return e == null || e == null ? "" : e instanceof Date ? e.toJSON() : g.canBeJsonified(e) ? JSON.stringify(e) : e.toString();
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
    return (n == null || typeof n == "object" && typeof n.length > "u" && !Object.keys(n).length) && (n = e.text), g.convertToType(n, r);
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
  callApi(e, r, n, o, i, a, s, c, p, y, m, h, T) {
    var N = this.buildUrl(e, n, h), S = sr(r, N);
    if (this.plugins !== null)
      for (var x in this.plugins)
        this.plugins.hasOwnProperty(x) && S.use(this.plugins[x]);
    this.applyAuthToRequest(S, c), r.toUpperCase() === "GET" && this.cache === !1 && (o._ = (/* @__PURE__ */ new Date()).getTime()), S.query(this.normalizeParams(o)), S.set(this.defaultHeaders).set(this.normalizeParams(i)), this.requestAgent && S.agent(this.requestAgent), S.timeout(this.timeout);
    var w = this.jsonPreferredMime(p);
    if (w && w != "multipart/form-data" && S.type(w), w === "application/x-www-form-urlencoded") {
      let _ = this.normalizeParams(a), M = new URLSearchParams(_).toString();
      S.send(M);
    } else if (w == "multipart/form-data") {
      var D = this.normalizeParams(a);
      for (var O in D)
        if (D.hasOwnProperty(O)) {
          let _ = D[O];
          this.isFileParam(_) ? S.attach(O, _) : Array.isArray(_) && _.length && this.isFileParam(_[0]) ? _.forEach((q) => S.attach(O, q)) : S.field(O, _);
        }
    } else s != null && (S.header["Content-Type"] || S.type("application/json"), S.send(s));
    var I = this.jsonPreferredMime(y);
    return I && S.accept(I), m === "Blob" ? S.responseType("blob") : m === "String" && S.responseType("text"), this.enableCookies && (typeof window > "u" ? this.agent._attachCookies(S) : S.withCredentials()), S.end((_, q) => {
      if (T) {
        var M = null;
        if (!_)
          try {
            M = this.deserialize(q, m), this.enableCookies && typeof window > "u" && this.agent._saveCookies(q);
          } catch (z) {
            _ = z;
          }
        T(_, M, q);
      }
    }), S;
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
        return g.parseDate(String(e));
      case "Blob":
        return e;
      default:
        if (r === Object)
          return e;
        if (typeof r.constructFromObject == "function")
          return r.constructFromObject(e);
        if (Array.isArray(r)) {
          var n = r[0];
          return e.map((y) => g.convertToType(y, n));
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
              var c = g.convertToType(a, o), p = g.convertToType(e[a], i);
              s[c] = p;
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
        e.hasOwnProperty(o) && (r[o] = g.convertToType(e[o], n));
    else
      for (var i in e)
        e.hasOwnProperty(i) && (r[i] = g.convertToType(e[i], n));
  }
}
g.CollectionFormatEnum = {
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
g.instance = new g();
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
    return e && (r = r || new K(), e.hasOwnProperty("cardNumberPlain") && (r.cardNumberPlain = g.convertToType(e.cardNumberPlain, "String")), e.hasOwnProperty("ownerName") && (r.ownerName = g.convertToType(e.ownerName, "String")), e.hasOwnProperty("expiry") && (r.expiry = g.convertToType(e.expiry, "Date")), e.hasOwnProperty("status") && (r.status = g.convertToType(e.status, "String"))), r;
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
    return e && (r = r || new B(), e.hasOwnProperty("id") && (r.id = g.convertToType(e.id, "Number")), e.hasOwnProperty("maskedCardNumber") && (r.maskedCardNumber = g.convertToType(e.maskedCardNumber, "String")), e.hasOwnProperty("ownerName") && (r.ownerName = g.convertToType(e.ownerName, "String")), e.hasOwnProperty("expiry") && (r.expiry = g.convertToType(e.expiry, "Date")), e.hasOwnProperty("status") && (r.status = g.convertToType(e.status, "String")), e.hasOwnProperty("balanceMinor") && (r.balanceMinor = g.convertToType(e.balanceMinor, "Number"))), r;
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
class ie {
  /**
   * Constructs a new <code>CardUpdateStatusRequest</code>.
   * @alias module:model/CardUpdateStatusRequest
   * @param status {module:model/CardUpdateStatusRequest.StatusEnum} 
   */
  constructor(e) {
    ie.initialize(this, e);
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
    return e && (r = r || new ie(), e.hasOwnProperty("status") && (r.status = g.convertToType(e.status, "String"))), r;
  }
  /**
   * Validates the JSON data with respect to <code>CardUpdateStatusRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CardUpdateStatusRequest</code>.
   */
  static validateJSON(e) {
    for (const r of ie.RequiredProperties)
      if (!e.hasOwnProperty(r))
        throw new Error("The required field `" + r + "` is not found in the JSON data: " + JSON.stringify(e));
    if (e.status && !(typeof e.status == "string" || e.status instanceof String))
      throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + e.status);
    return !0;
  }
}
ie.RequiredProperties = ["status"];
ie.prototype.status = void 0;
ie.StatusEnum = {
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
class ae {
  /**
   * Constructs a new <code>LoginRequest</code>.
   * @alias module:model/LoginRequest
   * @param username {String} 
   * @param password {String} 
   */
  constructor(e, r) {
    ae.initialize(this, e, r);
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
    return e && (r = r || new ae(), e.hasOwnProperty("username") && (r.username = g.convertToType(e.username, "String")), e.hasOwnProperty("password") && (r.password = g.convertToType(e.password, "String"))), r;
  }
  /**
   * Validates the JSON data with respect to <code>LoginRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>LoginRequest</code>.
   */
  static validateJSON(e) {
    for (const r of ae.RequiredProperties)
      if (!e.hasOwnProperty(r))
        throw new Error("The required field `" + r + "` is not found in the JSON data: " + JSON.stringify(e));
    if (e.username && !(typeof e.username == "string" || e.username instanceof String))
      throw new Error("Expected the field `username` to be a primitive type in the JSON string but got " + e.username);
    if (e.password && !(typeof e.password == "string" || e.password instanceof String))
      throw new Error("Expected the field `password` to be a primitive type in the JSON string but got " + e.password);
    return !0;
  }
}
ae.RequiredProperties = ["username", "password"];
ae.prototype.username = void 0;
ae.prototype.password = void 0;
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
    return e && (r = r || new U(), e.hasOwnProperty("direction") && (r.direction = g.convertToType(e.direction, "String")), e.hasOwnProperty("nullHandling") && (r.nullHandling = g.convertToType(e.nullHandling, "String")), e.hasOwnProperty("ascending") && (r.ascending = g.convertToType(e.ascending, "Boolean")), e.hasOwnProperty("property") && (r.property = g.convertToType(e.property, "String")), e.hasOwnProperty("ignoreCase") && (r.ignoreCase = g.convertToType(e.ignoreCase, "Boolean"))), r;
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
    return e && (r = r || new J(), e.hasOwnProperty("offset") && (r.offset = g.convertToType(e.offset, "Number")), e.hasOwnProperty("sort") && (r.sort = g.convertToType(e.sort, [U])), e.hasOwnProperty("pageNumber") && (r.pageNumber = g.convertToType(e.pageNumber, "Number")), e.hasOwnProperty("pageSize") && (r.pageSize = g.convertToType(e.pageSize, "Number")), e.hasOwnProperty("paged") && (r.paged = g.convertToType(e.paged, "Boolean")), e.hasOwnProperty("unpaged") && (r.unpaged = g.convertToType(e.unpaged, "Boolean"))), r;
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
    return e && (r = r || new F(), e.hasOwnProperty("totalElements") && (r.totalElements = g.convertToType(e.totalElements, "Number")), e.hasOwnProperty("totalPages") && (r.totalPages = g.convertToType(e.totalPages, "Number")), e.hasOwnProperty("size") && (r.size = g.convertToType(e.size, "Number")), e.hasOwnProperty("content") && (r.content = g.convertToType(e.content, [B])), e.hasOwnProperty("number") && (r.number = g.convertToType(e.number, "Number")), e.hasOwnProperty("sort") && (r.sort = g.convertToType(e.sort, [U])), e.hasOwnProperty("numberOfElements") && (r.numberOfElements = g.convertToType(e.numberOfElements, "Number")), e.hasOwnProperty("pageable") && (r.pageable = J.constructFromObject(e.pageable)), e.hasOwnProperty("first") && (r.first = g.convertToType(e.first, "Boolean")), e.hasOwnProperty("last") && (r.last = g.convertToType(e.last, "Boolean")), e.hasOwnProperty("empty") && (r.empty = g.convertToType(e.empty, "Boolean"))), r;
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
F.prototype.totalElements = void 0;
F.prototype.totalPages = void 0;
F.prototype.size = void 0;
F.prototype.content = void 0;
F.prototype.number = void 0;
F.prototype.sort = void 0;
F.prototype.numberOfElements = void 0;
F.prototype.pageable = void 0;
F.prototype.first = void 0;
F.prototype.last = void 0;
F.prototype.empty = void 0;
class ge {
  /**
   * Constructs a new <code>Pageable</code>.
   * @alias module:model/Pageable
   */
  constructor() {
    ge.initialize(this);
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
    return e && (r = r || new ge(), e.hasOwnProperty("page") && (r.page = g.convertToType(e.page, "Number")), e.hasOwnProperty("size") && (r.size = g.convertToType(e.size, "Number")), e.hasOwnProperty("sort") && (r.sort = g.convertToType(e.sort, ["String"]))), r;
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
ge.prototype.page = void 0;
ge.prototype.size = void 0;
ge.prototype.sort = void 0;
class X {
  /**
   * Constructs a new <code>RegisterRequest</code>.
   * @alias module:model/RegisterRequest
   * @param username {String} 
   * @param password {String} 
   */
  constructor(e, r) {
    X.initialize(this, e, r);
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
   * Constructs a <code>RegisterRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RegisterRequest} obj Optional instance to populate.
   * @return {module:model/RegisterRequest} The populated <code>RegisterRequest</code> instance.
   */
  static constructFromObject(e, r) {
    return e && (r = r || new X(), e.hasOwnProperty("username") && (r.username = g.convertToType(e.username, "String")), e.hasOwnProperty("password") && (r.password = g.convertToType(e.password, "String")), e.hasOwnProperty("role") && (r.role = g.convertToType(e.role, "String"))), r;
  }
  /**
   * Validates the JSON data with respect to <code>RegisterRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>RegisterRequest</code>.
   */
  static validateJSON(e) {
    for (const r of X.RequiredProperties)
      if (!e.hasOwnProperty(r))
        throw new Error("The required field `" + r + "` is not found in the JSON data: " + JSON.stringify(e));
    if (e.username && !(typeof e.username == "string" || e.username instanceof String))
      throw new Error("Expected the field `username` to be a primitive type in the JSON string but got " + e.username);
    if (e.password && !(typeof e.password == "string" || e.password instanceof String))
      throw new Error("Expected the field `password` to be a primitive type in the JSON string but got " + e.password);
    if (e.role && !(typeof e.role == "string" || e.role instanceof String))
      throw new Error("Expected the field `role` to be a primitive type in the JSON string but got " + e.role);
    return !0;
  }
}
X.RequiredProperties = ["username", "password"];
X.prototype.username = void 0;
X.prototype.password = void 0;
X.prototype.role = void 0;
X.RoleEnum = {
  /**
   * value: "ADMIN"
   * @const
   */
  ADMIN: "ADMIN",
  /**
   * value: "USER"
   * @const
   */
  USER: "USER"
};
class Z {
  /**
   * Constructs a new <code>TransferRequest</code>.
   * @alias module:model/TransferRequest
   * @param fromCardId {Number} 
   * @param toCardId {Number} 
   */
  constructor(e, r) {
    Z.initialize(this, e, r);
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
    return e && (r = r || new Z(), e.hasOwnProperty("fromCardId") && (r.fromCardId = g.convertToType(e.fromCardId, "Number")), e.hasOwnProperty("toCardId") && (r.toCardId = g.convertToType(e.toCardId, "Number")), e.hasOwnProperty("amountMinor") && (r.amountMinor = g.convertToType(e.amountMinor, "Number"))), r;
  }
  /**
   * Validates the JSON data with respect to <code>TransferRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TransferRequest</code>.
   */
  static validateJSON(e) {
    for (const r of Z.RequiredProperties)
      if (!e.hasOwnProperty(r))
        throw new Error("The required field `" + r + "` is not found in the JSON data: " + JSON.stringify(e));
    return !0;
  }
}
Z.RequiredProperties = ["fromCardId", "toCardId"];
Z.prototype.fromCardId = void 0;
Z.prototype.toCardId = void 0;
Z.prototype.amountMinor = void 0;
class qi {
  /**
  * Constructs a new AuthControllerApi. 
  * @alias module:api/AuthControllerApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(e) {
    this.apiClient = e || g.instance;
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
    let o = {}, i = {}, a = {}, s = {}, c = [], p = ["application/json"], y = ["*/*"], m = Object;
    return this.apiClient.callApi(
      "/api/auth/login",
      "POST",
      o,
      i,
      a,
      s,
      n,
      c,
      p,
      y,
      m,
      null,
      r
    );
  }
  /**
   * Callback function to receive the result of the register operation.
   * @callback module:api/AuthControllerApi~registerCallback
   * @param {String} error Error message, if any.
   * @param {Object} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * @param {module:model/RegisterRequest} registerRequest 
   * @param {module:api/AuthControllerApi~registerCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link Object}
   */
  register(e, r) {
    let n = e;
    if (e == null)
      throw new Error("Missing the required parameter 'registerRequest' when calling register");
    let o = {}, i = {}, a = {}, s = {}, c = [], p = ["application/json"], y = ["*/*"], m = Object;
    return this.apiClient.callApi(
      "/api/auth/register",
      "POST",
      o,
      i,
      a,
      s,
      n,
      c,
      p,
      y,
      m,
      null,
      r
    );
  }
}
class Mi {
  /**
  * Constructs a new CardControllerApi. 
  * @alias module:api/CardControllerApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(e) {
    this.apiClient = e || g.instance;
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
    }, i = {}, a = {}, s = {}, c = [], p = [], y = [];
    return this.apiClient.callApi(
      "/api/cards/{cardId}",
      "DELETE",
      o,
      i,
      a,
      s,
      n,
      c,
      p,
      y,
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
    }, s = {}, c = {}, p = [], y = ["application/json"], m = ["*/*"], h = B;
    return this.apiClient.callApi(
      "/api/cards",
      "POST",
      i,
      a,
      s,
      c,
      o,
      p,
      y,
      m,
      h,
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
    }, a = {}, s = {}, c = [], p = [], y = ["*/*"], m = F;
    return this.apiClient.callApi(
      "/api/cards",
      "GET",
      o,
      i,
      a,
      s,
      n,
      c,
      p,
      y,
      m,
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
    }, a = {}, s = {}, c = {}, p = [], y = ["application/json"], m = ["*/*"], h = B;
    return this.apiClient.callApi(
      "/api/cards/{cardId}/status",
      "PATCH",
      i,
      a,
      s,
      c,
      o,
      p,
      y,
      m,
      h,
      null,
      n
    );
  }
}
class Bi {
  /**
  * Constructs a new CardRequestControllerApi. 
  * @alias module:api/CardRequestControllerApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(e) {
    this.apiClient = e || g.instance;
  }
  /**
   * Callback function to receive the result of the requestCardBlock operation.
   * @callback module:api/CardRequestControllerApi~requestCardBlockCallback
   * @param {String} error Error message, if any.
   * @param {Object} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */
  /**
   * @param {Number} cardId 
   * @param {module:api/CardRequestControllerApi~requestCardBlockCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link Object}
   */
  requestCardBlock(e, r) {
    let n = null;
    if (e == null)
      throw new Error("Missing the required parameter 'cardId' when calling requestCardBlock");
    let o = {
      cardId: e
    }, i = {}, a = {}, s = {}, c = [], p = [], y = ["*/*"], m = Object;
    return this.apiClient.callApi(
      "/api/card-requests/block/{cardId}",
      "POST",
      o,
      i,
      a,
      s,
      n,
      c,
      p,
      y,
      m,
      null,
      r
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
    this.apiClient = e || g.instance;
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
    let o = {}, i = {}, a = {}, s = {}, c = [], p = ["application/json"], y = [];
    return this.apiClient.callApi(
      "/api/transfers",
      "POST",
      o,
      i,
      a,
      s,
      n,
      c,
      p,
      y,
      null,
      null,
      r
    );
  }
}
export {
  g as ApiClient,
  qi as AuthControllerApi,
  Mi as CardControllerApi,
  K as CardCreateRequest,
  Bi as CardRequestControllerApi,
  B as CardResponse,
  ie as CardUpdateStatusRequest,
  ae as LoginRequest,
  F as PageCardResponse,
  ge as Pageable,
  J as PageableObject,
  X as RegisterRequest,
  U as SortObject,
  zi as TransferControllerApi,
  Z as TransferRequest
};
