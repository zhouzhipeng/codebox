var juicebox_lib = juicebox_lib ? juicebox_lib : {};
(function(ao, an) {
    var al = ao.document,
        bH = ao.navigator,
        by = ao.location;
    var aj = (function() {
        var bN = function(bY, bX) {
                return new bN.fn.init(bY, bX, E)
            },
            bR = ao.jQuery,
            H = ao.$,
            E, bV = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
            bI = /\S/,
            J = /^\s+/,
            F = /\s+$/,
            I = /\d/,
            B = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
            bJ = /^[\],:{}\s]*$/,
            bT = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            bL = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            K = /(?:^|:|,)(?:\s*\[)+/g,
            z = /(webkit)[ \/]([\w.]+)/,
            bO = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            bM = /(msie) ([\w.]+)/,
            bP = /(mozilla)(?:.*? rv:([\w.]+))?/,
            C = /-([a-z]|[0-9])/ig,
            bW = /^-ms-/,
            bQ = function(bY, bX) {
                return (bX + "").toUpperCase()
            },
            bU = bH.userAgent,
            bS, D, e, M = Object.prototype.toString,
            G = Object.prototype.hasOwnProperty,
            A = Array.prototype.push,
            L = Array.prototype.slice,
            bK = String.prototype.trim,
            w = Array.prototype.indexOf,
            y = {};
        bN.fn = bN.prototype = {
            constructor: bN,
            init: function(bY, bX, b3) {
                var b2, b0, bZ, b1;
                if (!bY) {
                    return this
                }
                if (bY.nodeType) {
                    this.context = this[0] = bY;
                    this.length = 1;
                    return this
                }
                if (bY === "body" && !bX && al.body) {
                    this.context = al;
                    this[0] = al.body;
                    this.selector = bY;
                    this.length = 1;
                    return this
                }
                if (typeof bY === "string") {
                    if (bY.charAt(0) === "<" && bY.charAt(bY.length - 1) === ">" && bY.length >= 3) {
                        b2 = [null, bY, null]
                    } else {
                        b2 = bV.exec(bY)
                    }
                    if (b2 && (b2[1] || !bX)) {
                        if (b2[1]) {
                            bX = bX instanceof bN ? bX[0] : bX;
                            b1 = (bX ? bX.ownerDocument || bX : al);
                            bZ = B.exec(bY);
                            if (bZ) {
                                if (bN.isPlainObject(bX)) {
                                    bY = [al.createElement(bZ[1])];
                                    bN.fn.attr.call(bY, bX, true)
                                } else {
                                    bY = [b1.createElement(bZ[1])]
                                }
                            } else {
                                bZ = bN.buildFragment([b2[1]], [b1]);
                                bY = (bZ.cacheable ? bN.clone(bZ.fragment) : bZ.fragment).childNodes
                            }
                            return bN.merge(this, bY)
                        } else {
                            b0 = al.getElementById(b2[2]);
                            if (b0 && b0.parentNode) {
                                if (b0.id !== b2[2]) {
                                    return b3.find(bY)
                                }
                                this.length = 1;
                                this[0] = b0
                            }
                            this.context = al;
                            this.selector = bY;
                            return this
                        }
                    } else {
                        if (!bX || bX.jquery) {
                            return (bX || b3).find(bY)
                        } else {
                            return this.constructor(bX).find(bY)
                        }
                    }
                } else {
                    if (bN.isFunction(bY)) {
                        return b3.ready(bY)
                    }
                }
                if (bY.selector !== an) {
                    this.selector = bY.selector;
                    this.context = bY.context
                }
                return bN.makeArray(bY, this)
            },
            selector: "",
            jquery: "1.7",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return L.call(this, 0)
            },
            get: function(bX) {
                return bX == null ? this.toArray() : (bX < 0 ? this[this.length + bX] : this[bX])
            },
            pushStack: function(bY, bX, b0) {
                var bZ = this.constructor();
                if (bN.isArray(bY)) {
                    A.apply(bZ, bY)
                } else {
                    bN.merge(bZ, bY)
                }
                bZ.prevObject = this;
                bZ.context = this.context;
                if (bX === "find") {
                    bZ.selector = this.selector + (this.selector ? " " : "") + b0
                } else {
                    if (bX) {
                        bZ.selector = this.selector + "." + bX + "(" + b0 + ")"
                    }
                }
                return bZ
            },
            each: function(bY, bX) {
                return bN.each(this, bY, bX)
            },
            ready: function(bX) {
                bN.bindReady();
                D.add(bX);
                return this
            },
            eq: function(bX) {
                return bX === -1 ? this.slice(bX) : this.slice(bX, +bX + 1)
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            slice: function() {
                return this.pushStack(L.apply(this, arguments), "slice", L.call(arguments).join(","))
            },
            map: function(bX) {
                return this.pushStack(bN.map(this, function(bY, bZ) {
                    return bX.call(bY, bZ, bY)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: A,
            sort: [].sort,
            splice: [].splice
        };
        bN.fn.init.prototype = bN.fn;
        bN.extend = bN.fn.extend = function() {
            var b5, bZ, bX, bY, b3, b4, b2 = arguments[0] || {},
                b1 = 1,
                b0 = arguments.length,
                b6 = false;
            if (typeof b2 === "boolean") {
                b6 = b2;
                b2 = arguments[1] || {};
                b1 = 2
            }
            if (typeof b2 !== "object" && !bN.isFunction(b2)) {
                b2 = {}
            }
            if (b0 === b1) {
                b2 = this;
                --b1
            }
            for (; b1 < b0; b1++) {
                if ((b5 = arguments[b1]) != null) {
                    for (bZ in b5) {
                        bX = b2[bZ];
                        bY = b5[bZ];
                        if (b2 === bY) {
                            continue
                        }
                        if (b6 && bY && (bN.isPlainObject(bY) || (b3 = bN.isArray(bY)))) {
                            if (b3) {
                                b3 = false;
                                b4 = bX && bN.isArray(bX) ? bX : []
                            } else {
                                b4 = bX && bN.isPlainObject(bX) ? bX : {}
                            }
                            b2[bZ] = bN.extend(b6, b4, bY)
                        } else {
                            if (bY !== an) {
                                b2[bZ] = bY
                            }
                        }
                    }
                }
            }
            return b2
        };
        bN.extend({
            noConflict: function(bX) {
                if (ao.$ === bN) {
                    ao.$ = H
                }
                if (bX && ao.jQuery === bN) {
                    ao.jQuery = bR
                }
                return bN
            },
            isReady: false,
            readyWait: 1,
            holdReady: function(bX) {
                if (bX) {
                    bN.readyWait++
                } else {
                    bN.ready(true)
                }
            },
            ready: function(bX) {
                if ((bX === true && !--bN.readyWait) || (bX !== true && !bN.isReady)) {
                    if (!al.body) {
                        return setTimeout(bN.ready, 1)
                    }
                    bN.isReady = true;
                    if (bX !== true && --bN.readyWait > 0) {
                        return
                    }
                    D.fireWith(al, [bN]);
                    if (bN.fn.trigger) {
                        bN(al).trigger("ready").unbind("ready")
                    }
                }
            },
            bindReady: function() {
                if (D) {
                    return
                }
                D = bN.Callbacks("once memory");
                if (al.readyState === "complete") {
                    return setTimeout(bN.ready, 1)
                }
                if (al.addEventListener) {
                    al.addEventListener("DOMContentLoaded", e, false);
                    ao.addEventListener("load", bN.ready, false)
                } else {
                    if (al.attachEvent) {
                        al.attachEvent("onreadystatechange", e);
                        ao.attachEvent("onload", bN.ready);
                        var bX = false;
                        try {
                            bX = ao.frameElement == null
                        } catch (bY) {}
                        if (al.documentElement.doScroll && bX) {
                            x()
                        }
                    }
                }
            },
            isFunction: function(bX) {
                return bN.type(bX) === "function"
            },
            isArray: Array.isArray || function(bX) {
                return bN.type(bX) === "array"
            },
            isWindow: function(bX) {
                return bX && typeof bX === "object" && "setInterval" in bX
            },
            isNumeric: function(bX) {
                return bX != null && I.test(bX) && !isNaN(bX)
            },
            type: function(bX) {
                return bX == null ? String(bX) : y[M.call(bX)] || "object"
            },
            isPlainObject: function(bY) {
                if (!bY || bN.type(bY) !== "object" || bY.nodeType || bN.isWindow(bY)) {
                    return false
                }
                try {
                    if (bY.constructor && !G.call(bY, "constructor") && !G.call(bY.constructor.prototype, "isPrototypeOf")) {
                        return false
                    }
                } catch (bZ) {
                    return false
                }
                var bX;
                for (bX in bY) {}
                return bX === an || G.call(bY, bX)
            },
            isEmptyObject: function(bY) {
                for (var bX in bY) {
                    return false
                }
                return true
            },
            error: function(bX) {
                throw bX
            },
            parseJSON: function(bX) {
                if (typeof bX !== "string" || !bX) {
                    return null
                }
                bX = bN.trim(bX);
                if (ao.JSON && ao.JSON.parse) {
                    return ao.JSON.parse(bX)
                }
                if (bJ.test(bX.replace(bT, "@").replace(bL, "]").replace(K, ""))) {
                    return (new Function("return " + bX))()
                }
                bN.error("Invalid JSON: " + bX)
            },
            noop: function() {},
            globalEval: function(bX) {
                if (bX && bI.test(bX)) {
                    (ao.execScript || function(bY) {
                        ao["eval"].call(ao, bY)
                    })(bX)
                }
            },
            camelCase: function(bX) {
                return bX.replace(bW, "ms-").replace(C, bQ)
            },
            nodeName: function(bY, bX) {
                return bY.nodeName && bY.nodeName.toUpperCase() === bX.toUpperCase()
            },
            each: function(bY, bX, b3) {
                var b2, b0 = 0,
                    b1 = bY.length,
                    bZ = b1 === an || bN.isFunction(bY);
                if (b3) {
                    if (bZ) {
                        for (b2 in bY) {
                            if (bX.apply(bY[b2], b3) === false) {
                                break
                            }
                        }
                    } else {
                        for (; b0 < b1;) {
                            if (bX.apply(bY[b0++], b3) === false) {
                                break
                            }
                        }
                    }
                } else {
                    if (bZ) {
                        for (b2 in bY) {
                            if (bX.call(bY[b2], b2, bY[b2]) === false) {
                                break
                            }
                        }
                    } else {
                        for (; b0 < b1;) {
                            if (bX.call(bY[b0], b0, bY[b0++]) === false) {
                                break
                            }
                        }
                    }
                }
                return bY
            },
            trim: bK ? function(bX) {
                return bX == null ? "" : bK.call(bX)
            } : function(bX) {
                return bX == null ? "" : bX.toString().replace(J, "").replace(F, "")
            },
            makeArray: function(bY, bX) {
                var b0 = bX || [];
                if (bY != null) {
                    var bZ = bN.type(bY);
                    if (bY.length == null || bZ === "string" || bZ === "function" || bZ === "regexp" || bN.isWindow(bY)) {
                        A.call(b0, bY)
                    } else {
                        bN.merge(b0, bY)
                    }
                }
                return b0
            },
            inArray: function(bY, bX, bZ) {
                var b0;
                if (bX) {
                    if (w) {
                        return w.call(bX, bY, bZ)
                    }
                    b0 = bX.length;
                    bZ = bZ ? bZ < 0 ? Math.max(0, b0 + bZ) : bZ : 0;
                    for (; bZ < b0; bZ++) {
                        if (bZ in bX && bX[bZ] === bY) {
                            return bZ
                        }
                    }
                }
                return -1
            },
            merge: function(bZ, bX) {
                var b1 = bZ.length,
                    b0 = 0;
                if (typeof bX.length === "number") {
                    for (var bY = bX.length; b0 < bY; b0++) {
                        bZ[b1++] = bX[b0]
                    }
                } else {
                    while (bX[b0] !== an) {
                        bZ[b1++] = bX[b0++]
                    }
                }
                bZ.length = b1;
                return bZ
            },
            grep: function(bY, bX, b3) {
                var b2 = [],
                    b1;
                b3 = !!b3;
                for (var bZ = 0, b0 = bY.length; bZ < b0; bZ++) {
                    b1 = !!bX(bY[bZ], bZ);
                    if (b3 !== b1) {
                        b2.push(bY[bZ])
                    }
                }
                return b2
            },
            map: function(b4, b3, b2) {
                var b1, b5, b0 = [],
                    bY = 0,
                    bX = b4.length,
                    bZ = b4 instanceof bN || bX !== an && typeof bX === "number" && ((bX > 0 && b4[0] && b4[bX - 1]) || bX === 0 || bN.isArray(b4));
                if (bZ) {
                    for (; bY < bX; bY++) {
                        b1 = b3(b4[bY], bY, b2);
                        if (b1 != null) {
                            b0[b0.length] = b1
                        }
                    }
                } else {
                    for (b5 in b4) {
                        b1 = b3(b4[b5], b5, b2);
                        if (b1 != null) {
                            b0[b0.length] = b1
                        }
                    }
                }
                return b0.concat.apply([], b0)
            },
            guid: 1,
            access: function(b5, b4, b3, b2, b1, b0) {
                var bZ = b5.length;
                if (typeof b4 === "object") {
                    for (var bX in b4) {
                        bN.access(b5, bX, b4[bX], b2, b1, b3)
                    }
                    return b5
                }
                if (b3 !== an) {
                    b2 = !b0 && b2 && bN.isFunction(b3);
                    for (var bY = 0; bY < bZ; bY++) {
                        b1(b5[bY], b4, b2 ? b3.call(b5[bY], bY, b1(b5[bY], b4)) : b3, b0)
                    }
                    return b5
                }
                return bZ ? b1(b5[0], b4) : an
            },
            now: function() {
                return (new Date()).getTime()
            },
            uaMatch: function(bY) {
                bY = bY.toLowerCase();
                var bX = z.exec(bY) || bO.exec(bY) || bM.exec(bY) || bY.indexOf("compatible") < 0 && bP.exec(bY) || [];
                return {
                    browser: bX[1] || "",
                    version: bX[2] || "0"
                }
            },
            sub: function() {
                function bX(b1, b0) {
                    return new bX.fn.init(b1, b0)
                }
                bN.extend(true, bX, this);
                bX.superclass = this;
                bX.fn = bX.prototype = this();
                bX.fn.constructor = bX;
                bX.sub = this.sub;
                bX.fn.init = function bY(b1, b0) {
                    if (b0 && b0 instanceof bN && !(b0 instanceof bX)) {
                        b0 = bX(b0)
                    }
                    return bN.fn.init.call(this, b1, b0, bZ)
                };
                bX.fn.init.prototype = bX.fn;
                var bZ = bX(al);
                return bX
            },
            browser: {}
        });
        bN.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(bY, bX) {
            y["[object " + bX + "]"] = bX.toLowerCase()
        });
        bS = bN.uaMatch(bU);
        if (bS.browser) {
            bN.browser[bS.browser] = true;
            bN.browser.version = bS.version
        }
        if (bN.browser.webkit) {
            bN.browser.safari = true
        }
        if (bI.test("\xA0")) {
            J = /^[\s\xA0]+/;
            F = /[\s\xA0]+$/
        }
        E = bN(al);
        if (al.addEventListener) {
            e = function() {
                al.removeEventListener("DOMContentLoaded", e, false);
                bN.ready()
            }
        } else {
            if (al.attachEvent) {
                e = function() {
                    if (al.readyState === "complete") {
                        al.detachEvent("onreadystatechange", e);
                        bN.ready()
                    }
                }
            }
        }

        function x() {
            if (bN.isReady) {
                return
            }
            try {
                al.documentElement.doScroll("left")
            } catch (bX) {
                setTimeout(x, 1);
                return
            }
            bN.ready()
        }
        if (typeof define === "function" && define.amd && define.amd.jQuery) {
            define("jquery", [], function() {
                return bN
            })
        }
        return bN
    })();
    var a8 = {};

    function ag(w) {
        var e = a8[w] = {},
            x, y;
        w = w.split(/\s+/);
        for (x = 0, y = w.length; x < y; x++) {
            e[w[x]] = true
        }
        return e
    }
    aj.Callbacks = function(C) {
        C = C ? (a8[C] || ag(C)) : {};
        var B = [],
            D = [],
            x, y, w, z, A, F = function(G) {
                var H, K, J, I, L;
                for (H = 0, K = G.length; H < K; H++) {
                    J = G[H];
                    I = aj.type(J);
                    if (I === "array") {
                        F(J)
                    } else {
                        if (I === "function") {
                            if (!C.unique || !E.has(J)) {
                                B.push(J)
                            }
                        }
                    }
                }
            },
            e = function(H, G) {
                G = G || [];
                x = !C.memory || [H, G];
                y = true;
                A = w || 0;
                w = 0;
                z = B.length;
                for (; B && A < z; A++) {
                    if (B[A].apply(H, G) === false && C.stopOnFalse) {
                        x = true;
                        break
                    }
                }
                y = false;
                if (B) {
                    if (!C.once) {
                        if (D && D.length) {
                            x = D.shift();
                            E.fireWith(x[0], x[1])
                        }
                    } else {
                        if (x === true) {
                            E.disable()
                        } else {
                            B = []
                        }
                    }
                }
            },
            E = {
                add: function() {
                    if (B) {
                        var G = B.length;
                        F(arguments);
                        if (y) {
                            z = B.length
                        } else {
                            if (x && x !== true) {
                                w = G;
                                e(x[0], x[1])
                            }
                        }
                    }
                    return this
                },
                remove: function() {
                    if (B) {
                        var G = arguments,
                            I = 0,
                            J = G.length;
                        for (; I < J; I++) {
                            for (var H = 0; H < B.length; H++) {
                                if (G[I] === B[H]) {
                                    if (y) {
                                        if (H <= z) {
                                            z--;
                                            if (H <= A) {
                                                A--
                                            }
                                        }
                                    }
                                    B.splice(H--, 1);
                                    if (C.unique) {
                                        break
                                    }
                                }
                            }
                        }
                    }
                    return this
                },
                has: function(G) {
                    if (B) {
                        var H = 0,
                            I = B.length;
                        for (; H < I; H++) {
                            if (G === B[H]) {
                                return true
                            }
                        }
                    }
                    return false
                },
                empty: function() {
                    B = [];
                    return this
                },
                disable: function() {
                    B = D = x = an;
                    return this
                },
                disabled: function() {
                    return !B
                },
                lock: function() {
                    D = an;
                    if (!x || x === true) {
                        E.disable()
                    }
                    return this
                },
                locked: function() {
                    return !D
                },
                fireWith: function(H, G) {
                    if (D) {
                        if (y) {
                            if (!C.once) {
                                D.push([H, G])
                            }
                        } else {
                            if (!(C.once && x)) {
                                e(H, G)
                            }
                        }
                    }
                    return this
                },
                fire: function() {
                    E.fireWith(this, arguments);
                    return this
                },
                fired: function() {
                    return !!x
                }
            };
        return E
    };
    var a7 = [].slice;
    aj.extend({
        Deferred: function(z) {
            var y = aj.Callbacks("once memory"),
                x = aj.Callbacks("once memory"),
                w = aj.Callbacks("memory"),
                e = "pending",
                B = {
                    resolve: y,
                    reject: x,
                    notify: w
                },
                D = {
                    done: y.add,
                    fail: x.add,
                    progress: w.add,
                    state: function() {
                        return e
                    },
                    isResolved: y.fired,
                    isRejected: x.fired,
                    then: function(F, E, G) {
                        C.done(F).fail(E).progress(G);
                        return this
                    },
                    always: function() {
                        return C.done.apply(C, arguments).fail.apply(C, arguments)
                    },
                    pipe: function(G, F, E) {
                        return aj.Deferred(function(H) {
                            aj.each({
                                done: [G, "resolve"],
                                fail: [F, "reject"],
                                progress: [E, "notify"]
                            }, function(J, I) {
                                var M = I[0],
                                    L = I[1],
                                    K;
                                if (aj.isFunction(M)) {
                                    C[J](function() {
                                        K = M.apply(this, arguments);
                                        if (K && aj.isFunction(K.promise)) {
                                            K.promise().then(H.resolve, H.reject, H.notify)
                                        } else {
                                            H[L + "With"](this === C ? H : this, [K])
                                        }
                                    })
                                } else {
                                    C[J](H[L])
                                }
                            })
                        }).promise()
                    },
                    promise: function(F) {
                        if (F == null) {
                            F = D
                        } else {
                            for (var E in D) {
                                F[E] = D[E]
                            }
                        }
                        return F
                    }
                },
                C = D.promise({}),
                A;
            for (A in B) {
                C[A] = B[A].fire;
                C[A + "With"] = B[A].fireWith
            }
            C.done(function() {
                e = "resolved"
            }, x.disable, w.lock).fail(function() {
                e = "rejected"
            }, y.disable, w.lock);
            if (z) {
                z.call(C, C)
            }
            return C
        }
    });
    aj.support = (function() {
        var M = al.createElement("div"),
            bI = al.documentElement,
            z, bJ, G, x, F, A, D, w, E, H, C, L, J, y, B, I, bK;
        M.setAttribute("className", "t");
        M.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/><nav></nav>";
        z = M.getElementsByTagName("*");
        bJ = M.getElementsByTagName("a")[0];
        if (!z || !z.length || !bJ) {
            return {}
        }
        G = al.createElement("select");
        x = G.appendChild(al.createElement("option"));
        F = M.getElementsByTagName("input")[0];
        D = {
            leadingWhitespace: (M.firstChild.nodeType === 3),
            tbody: !M.getElementsByTagName("tbody").length,
            htmlSerialize: !!M.getElementsByTagName("link").length,
            style: /top/.test(bJ.getAttribute("style")),
            hrefNormalized: (bJ.getAttribute("href") === "/a"),
            opacity: /^0.55/.test(bJ.style.opacity),
            cssFloat: !!bJ.style.cssFloat,
            unknownElems: !!M.getElementsByTagName("nav").length,
            checkOn: (F.value === "on"),
            optSelected: x.selected,
            getSetAttribute: M.className !== "t",
            enctype: !!al.createElement("form").enctype,
            submitBubbles: true,
            changeBubbles: true,
            focusinBubbles: false,
            deleteExpando: true,
            noCloneEvent: true,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableMarginRight: true
        };
        F.checked = true;
        D.noCloneChecked = F.cloneNode(true).checked;
        G.disabled = true;
        D.optDisabled = !x.disabled;
        try {
            delete M.test
        } catch (K) {
            D.deleteExpando = false
        }
        if (!M.addEventListener && M.attachEvent && M.fireEvent) {
            M.attachEvent("onclick", function() {
                D.noCloneEvent = false
            });
            M.cloneNode(true).fireEvent("onclick")
        }
        F = al.createElement("input");
        F.value = "t";
        F.setAttribute("type", "radio");
        D.radioValue = F.value === "t";
        F.setAttribute("checked", "checked");
        M.appendChild(F);
        w = al.createDocumentFragment();
        w.appendChild(M.lastChild);
        D.checkClone = w.cloneNode(true).cloneNode(true).lastChild.checked;
        M.innerHTML = "";
        M.style.width = M.style.paddingLeft = "1px";
        E = al.getElementsByTagName("body")[0];
        C = al.createElement(E ? "div" : "body");
        L = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        };
        if (E) {
            aj.extend(L, {
                position: "absolute",
                left: "-999px",
                top: "-999px"
            })
        }
        for (I in L) {
            C.style[I] = L[I]
        }
        C.appendChild(M);
        H = E || bI;
        H.insertBefore(C, H.firstChild);
        D.appendChecked = F.checked;
        D.boxModel = M.offsetWidth === 2;
        if ("zoom" in M.style) {
            M.style.display = "inline";
            M.style.zoom = 1;
            D.inlineBlockNeedsLayout = (M.offsetWidth === 2);
            M.style.display = "";
            M.innerHTML = "<div style='width:4px;'></div>";
            D.shrinkWrapBlocks = (M.offsetWidth !== 2)
        }
        M.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
        J = M.getElementsByTagName("td");
        bK = (J[0].offsetHeight === 0);
        J[0].style.display = "";
        J[1].style.display = "none";
        D.reliableHiddenOffsets = bK && (J[0].offsetHeight === 0);
        M.innerHTML = "";
        if (al.defaultView && al.defaultView.getComputedStyle) {
            A = al.createElement("div");
            A.style.width = "0";
            A.style.marginRight = "0";
            M.appendChild(A);
            D.reliableMarginRight = (parseInt((al.defaultView.getComputedStyle(A, null) || {
                marginRight: 0
            }).marginRight, 10) || 0) === 0
        }
        if (M.attachEvent) {
            for (I in {
                submit: 1,
                change: 1,
                focusin: 1
            }) {
                B = "on" + I;
                bK = (B in M);
                if (!bK) {
                    M.setAttribute(B, "return;");
                    bK = (typeof M[B] === "function")
                }
                D[I + "Bubbles"] = bK
            }
        }
        aj(function() {
            var bR, bT, bU, bS, bM, bN, bL = 1,
                bQ = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",
                bP = "visibility:hidden;border:0;",
                e = "style='" + bQ + "border:5px solid #000;padding:0;'",
                bO = "<div " + e + "><div></div></div><table " + e + " cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            E = al.getElementsByTagName("body")[0];
            if (!E) {
                return
            }
            bR = al.createElement("div");
            bR.style.cssText = bP + "width:0;height:0;position:static;top:0;margin-top:" + bL + "px";
            E.insertBefore(bR, E.firstChild);
            C = al.createElement("div");
            C.style.cssText = bQ + bP;
            C.innerHTML = bO;
            bR.appendChild(C);
            bT = C.firstChild;
            bU = bT.firstChild;
            bM = bT.nextSibling.firstChild.firstChild;
            bN = {
                doesNotAddBorder: (bU.offsetTop !== 5),
                doesAddBorderForTableAndCells: (bM.offsetTop === 5)
            };
            bU.style.position = "fixed";
            bU.style.top = "20px";
            bN.fixedPosition = (bU.offsetTop === 20 || bU.offsetTop === 15);
            bU.style.position = bU.style.top = "";
            bT.style.overflow = "hidden";
            bT.style.position = "relative";
            bN.subtractsBorderForOverflowNotVisible = (bU.offsetTop === -5);
            bN.doesNotIncludeMarginInBodyOffset = (E.offsetTop !== bL);
            E.removeChild(bR);
            C = bR = null;
            aj.extend(D, bN)
        });
        C.innerHTML = "";
        H.removeChild(C);
        C = w = G = x = E = A = M = F = null;
        return D
    })();
    aj.boxModel = aj.support.boxModel;
    var a5 = /^(?:\{.*\}|\[.*\])$/,
        aI = /([A-Z])/g;
    aj.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (aj.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: true,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: true
        },
        hasData: function(e) {
            e = e.nodeType ? aj.cache[e[aj.expando]] : e[aj.expando];
            return !!e && !ad(e)
        },
        data: function(H, F, E, D) {
            if (!aj.acceptData(H)) {
                return
            }
            var B, y, C, G = aj.expando,
                A = typeof F === "string",
                I = H.nodeType,
                w = I ? aj.cache : H,
                x = I ? H[aj.expando] : H[aj.expando] && aj.expando,
                z = F === "events";
            if ((!x || !w[x] || (!z && !D && !w[x].data)) && A && E === an) {
                return
            }
            if (!x) {
                if (I) {
                    H[aj.expando] = x = ++aj.uuid
                } else {
                    x = aj.expando
                }
            }
            if (!w[x]) {
                w[x] = {};
                if (!I) {
                    w[x].toJSON = aj.noop
                }
            }
            if (typeof F === "object" || typeof F === "function") {
                if (D) {
                    w[x] = aj.extend(w[x], F)
                } else {
                    w[x].data = aj.extend(w[x].data, F)
                }
            }
            B = y = w[x];
            if (!D) {
                if (!y.data) {
                    y.data = {}
                }
                y = y.data
            }
            if (E !== an) {
                y[aj.camelCase(F)] = E
            }
            if (z && !y[F]) {
                return B.events
            }
            if (A) {
                C = y[F];
                if (C == null) {
                    C = y[aj.camelCase(F)]
                }
            } else {
                C = y
            }
            return C
        },
        removeData: function(D, B, A) {
            if (!aj.acceptData(D)) {
                return
            }
            var z, y, x, C = aj.expando,
                E = D.nodeType,
                e = E ? aj.cache : D,
                w = E ? D[aj.expando] : aj.expando;
            if (!e[w]) {
                return
            }
            if (B) {
                z = A ? e[w] : e[w].data;
                if (z) {
                    if (aj.isArray(B)) {
                        B = B
                    } else {
                        if (B in z) {
                            B = [B]
                        } else {
                            B = aj.camelCase(B);
                            if (B in z) {
                                B = [B]
                            } else {
                                B = B.split(" ")
                            }
                        }
                    }
                    for (y = 0, x = B.length; y < x; y++) {
                        delete z[B[y]]
                    }
                    if (!(A ? ad : aj.isEmptyObject)(z)) {
                        return
                    }
                }
            }
            if (!A) {
                delete e[w].data;
                if (!ad(e[w])) {
                    return
                }
            }
            if (aj.support.deleteExpando || !e.setInterval) {
                delete e[w]
            } else {
                e[w] = null
            }
            if (E) {
                if (aj.support.deleteExpando) {
                    delete D[aj.expando]
                } else {
                    if (D.removeAttribute) {
                        D.removeAttribute(aj.expando)
                    } else {
                        D[aj.expando] = null
                    }
                }
            }
        },
        _data: function(w, e, x) {
            return aj.data(w, e, x, true)
        },
        acceptData: function(w) {
            if (w.nodeName) {
                var e = aj.noData[w.nodeName.toLowerCase()];
                if (e) {
                    return !(e === true || w.getAttribute("classid") !== e)
                }
            }
            return true
        }
    });
    aj.fn.extend({
        data: function(w, C) {
            var B, e, y, A = null;
            if (typeof w === "undefined") {
                if (this.length) {
                    A = aj.data(this[0]);
                    if (this[0].nodeType === 1 && !aj._data(this[0], "parsedAttrs")) {
                        e = this[0].attributes;
                        for (var z = 0, x = e.length; z < x; z++) {
                            y = e[z].name;
                            if (y.indexOf("data-") === 0) {
                                y = aj.camelCase(y.substring(5));
                                bk(this[0], y, A[y])
                            }
                        }
                        aj._data(this[0], "parsedAttrs", true)
                    }
                }
                return A
            } else {
                if (typeof w === "object") {
                    return this.each(function() {
                        aj.data(this, w)
                    })
                }
            }
            B = w.split(".");
            B[1] = B[1] ? "." + B[1] : "";
            if (C === an) {
                A = this.triggerHandler("getData" + B[1] + "!", [B[0]]);
                if (A === an && this.length) {
                    A = aj.data(this[0], w);
                    A = bk(this[0], w, A)
                }
                return A === an && B[1] ? this.data(B[0]) : A
            } else {
                return this.each(function() {
                    var D = aj(this),
                        E = [B[0], C];
                    D.triggerHandler("setData" + B[1] + "!", E);
                    aj.data(this, w, C);
                    D.triggerHandler("changeData" + B[1] + "!", E)
                })
            }
        },
        removeData: function(e) {
            return this.each(function() {
                aj.removeData(this, e)
            })
        }
    });

    function bk(x, w, A) {
        if (A === an && x.nodeType === 1) {
            var z = "data-" + w.replace(aI, "-$1").toLowerCase();
            A = x.getAttribute(z);
            if (typeof A === "string") {
                try {
                    A = A === "true" ? true : A === "false" ? false : A === "null" ? null : aj.isNumeric(A) ? parseFloat(A) : a5.test(A) ? aj.parseJSON(A) : A
                } catch (y) {}
                aj.data(x, w, A)
            } else {
                A = an
            }
        }
        return A
    }

    function ad(w) {
        for (var e in w) {
            if (e === "data" && aj.isEmptyObject(w[e])) {
                continue
            }
            if (e !== "toJSON") {
                return false
            }
        }
        return true
    }

    function bv(y, e, B) {
        var A = e + "defer",
            x = e + "queue",
            w = e + "mark",
            z = aj._data(y, A);
        if (z && (B === "queue" || !aj._data(y, x)) && (B === "mark" || !aj._data(y, w))) {
            setTimeout(function() {
                if (!aj._data(y, x) && !aj._data(y, w)) {
                    aj.removeData(y, A, true);
                    z.fire()
                }
            }, 0)
        }
    }
    aj.extend({
        _mark: function(w, e) {
            if (w) {
                e = (e || "fx") + "mark";
                aj._data(w, e, (aj._data(w, e) || 0) + 1)
            }
        },
        _unmark: function(w, e, z) {
            if (w !== true) {
                z = e;
                e = w;
                w = false
            }
            if (e) {
                z = z || "fx";
                var y = z + "mark",
                    x = w ? 0 : ((aj._data(e, y) || 1) - 1);
                if (x) {
                    aj._data(e, y, x)
                } else {
                    aj.removeData(e, y, true);
                    bv(e, z, "mark")
                }
            }
        },
        queue: function(w, e, y) {
            var x;
            if (w) {
                e = (e || "fx") + "queue";
                x = aj._data(w, e);
                if (y) {
                    if (!x || aj.isArray(y)) {
                        x = aj._data(w, e, aj.makeArray(y))
                    } else {
                        x.push(y)
                    }
                }
                return x || []
            }
        },
        dequeue: function(x, w) {
            w = w || "fx";
            var z = aj.queue(x, w),
                y = z.shift(),
                e = {};
            if (y === "inprogress") {
                y = z.shift()
            }
            if (y) {
                if (w === "fx") {
                    z.unshift("inprogress")
                }
                aj._data(x, w + ".run", e);
                y.call(x, function() {
                    aj.dequeue(x, w)
                }, e)
            }
            if (!z.length) {
                aj.removeData(x, w + "queue " + w + ".run", true);
                bv(x, w, "queue")
            }
        }
    });
    aj.fn.extend({
        queue: function(e, w) {
            if (typeof e !== "string") {
                w = e;
                e = "fx"
            }
            if (w === an) {
                return aj.queue(this[0], e)
            }
            return this.each(function() {
                var x = aj.queue(this, e, w);
                if (e === "fx" && x[0] !== "inprogress") {
                    aj.dequeue(this, e)
                }
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                aj.dequeue(this, e)
            })
        },
        delay: function(x, w) {
            x = aj.fx ? aj.fx.speeds[x] || x : x;
            w = w || "fx";
            return this.queue(w, function(y, e) {
                var z = setTimeout(y, x);
                e.stop = function() {
                    clearTimeout(z)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        }
    });
    var a4 = /[\n\t\r]/g,
        ar = /\s+/,
        ba = /\r/g,
        f = /^(?:button|input)$/i,
        Q = /^(?:button|input|object|select|textarea)$/i,
        j = /^a(?:rea)?$/i,
        ay = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        S = aj.support.getSetAttribute,
        br, be, aM;
    aj.fn.extend({
        attr: function(w, e) {
            return aj.access(this, w, e, true, aj.attr)
        },
        removeAttr: function(e) {
            return this.each(function() {
                aj.removeAttr(this, e)
            })
        },
        addClass: function(y) {
            var e, z, x, A, B, C, w;
            if (aj.isFunction(y)) {
                return this.each(function(D) {
                    aj(this).addClass(y.call(this, D, this.className))
                })
            }
            if (y && typeof y === "string") {
                e = y.split(ar);
                for (z = 0, x = this.length; z < x; z++) {
                    A = this[z];
                    if (A.nodeType === 1) {
                        if (!A.className && e.length === 1) {
                            A.className = y
                        } else {
                            B = " " + A.className + " ";
                            for (C = 0, w = e.length; C < w; C++) {
                                if (!~B.indexOf(" " + e[C] + " ")) {
                                    B += e[C] + " "
                                }
                            }
                            A.className = aj.trim(B)
                        }
                    }
                }
            }
            return this
        },
        removeClass: function(y) {
            var e, z, x, B, A, C, w;
            if (aj.isFunction(y)) {
                return this.each(function(D) {
                    aj(this).removeClass(y.call(this, D, this.className))
                })
            }
            if ((y && typeof y === "string") || y === an) {
                e = (y || "").split(ar);
                for (z = 0, x = this.length; z < x; z++) {
                    B = this[z];
                    if (B.nodeType === 1 && B.className) {
                        if (y) {
                            A = (" " + B.className + " ").replace(a4, " ");
                            for (C = 0, w = e.length; C < w; C++) {
                                A = A.replace(" " + e[C] + " ", " ")
                            }
                            B.className = aj.trim(A)
                        } else {
                            B.className = ""
                        }
                    }
                }
            }
            return this
        },
        toggleClass: function(e, y) {
            var x = typeof e,
                w = typeof y === "boolean";
            if (aj.isFunction(e)) {
                return this.each(function(z) {
                    aj(this).toggleClass(e.call(this, z, this.className, y), y)
                })
            }
            return this.each(function() {
                if (x === "string") {
                    var z, B = 0,
                        A = aj(this),
                        C = y,
                        D = e.split(ar);
                    while ((z = D[B++])) {
                        C = w ? C : !A.hasClass(z);
                        A[C ? "addClass" : "removeClass"](z)
                    }
                } else {
                    if (x === "undefined" || x === "boolean") {
                        if (this.className) {
                            aj._data(this, "__className__", this.className)
                        }
                        this.className = this.className || e === false ? "" : aj._data(this, "__className__") || ""
                    }
                }
            })
        },
        hasClass: function(x) {
            var e = " " + x + " ",
                y = 0,
                w = this.length;
            for (; y < w; y++) {
                if (this[y].nodeType === 1 && (" " + this[y].className + " ").replace(a4, " ").indexOf(e) > -1) {
                    return true
                }
            }
            return false
        },
        val: function(z) {
            var y, e, x, w = this[0];
            if (!arguments.length) {
                if (w) {
                    y = aj.valHooks[w.nodeName.toLowerCase()] || aj.valHooks[w.type];
                    if (y && "get" in y && (e = y.get(w, "value")) !== an) {
                        return e
                    }
                    e = w.value;
                    return typeof e === "string" ? e.replace(ba, "") : e == null ? "" : e
                }
                return an
            }
            x = aj.isFunction(z);
            return this.each(function(B) {
                var A = aj(this),
                    C;
                if (this.nodeType !== 1) {
                    return
                }
                if (x) {
                    C = z.call(this, B, A.val())
                } else {
                    C = z
                }
                if (C == null) {
                    C = ""
                } else {
                    if (typeof C === "number") {
                        C += ""
                    } else {
                        if (aj.isArray(C)) {
                            C = aj.map(C, function(D) {
                                return D == null ? "" : D + ""
                            })
                        }
                    }
                }
                y = aj.valHooks[this.nodeName.toLowerCase()] || aj.valHooks[this.type];
                if (!y || !("set" in y) || y.set(this, C, "value") === an) {
                    this.value = C
                }
            })
        }
    });
    aj.extend({
        valHooks: {
            option: {
                get: function(w) {
                    var e = w.attributes.value;
                    return !e || e.specified ? w.value : w.text
                }
            },
            select: {
                get: function(B) {
                    var z, e, A, x, y = B.selectedIndex,
                        C = [],
                        D = B.options,
                        w = B.type === "select-one";
                    if (y < 0) {
                        return null
                    }
                    e = w ? y : 0;
                    A = w ? y + 1 : D.length;
                    for (; e < A; e++) {
                        x = D[e];
                        if (x.selected && (aj.support.optDisabled ? !x.disabled : x.getAttribute("disabled") === null) && (!x.parentNode.disabled || !aj.nodeName(x.parentNode, "optgroup"))) {
                            z = aj(x).val();
                            if (w) {
                                return z
                            }
                            C.push(z)
                        }
                    }
                    if (w && !C.length && D.length) {
                        return aj(D[y]).val()
                    }
                    return C
                },
                set: function(w, e) {
                    var x = aj.makeArray(e);
                    aj(w).find("option").each(function() {
                        this.selected = aj.inArray(aj(this).val(), x) >= 0
                    });
                    if (!x.length) {
                        w.selectedIndex = -1
                    }
                    return x
                }
            }
        },
        attrFn: {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true
        },
        attr: function(y, x, D, C) {
            var B, w, A, z = y.nodeType;
            if (!y || z === 3 || z === 8 || z === 2) {
                return an
            }
            if (C && x in aj.attrFn) {
                return aj(y)[x](D)
            }
            if (!("getAttribute" in y)) {
                return aj.prop(y, x, D)
            }
            A = z !== 1 || !aj.isXMLDoc(y);
            if (A) {
                x = x.toLowerCase();
                w = aj.attrHooks[x] || (ay.test(x) ? be : br)
            }
            if (D !== an) {
                if (D === null) {
                    aj.removeAttr(y, x);
                    return an
                } else {
                    if (w && "set" in w && A && (B = w.set(y, D, x)) !== an) {
                        return B
                    } else {
                        y.setAttribute(x, "" + D);
                        return D
                    }
                }
            } else {
                if (w && "get" in w && A && (B = w.get(y, x)) !== null) {
                    return B
                } else {
                    B = y.getAttribute(x);
                    return B === null ? an : B
                }
            }
        },
        removeAttr: function(x, e) {
            var B, A, y, w, z = 0;
            if (x.nodeType === 1) {
                A = (e || "").split(ar);
                w = A.length;
                for (; z < w; z++) {
                    y = A[z].toLowerCase();
                    B = aj.propFix[y] || y;
                    aj.attr(x, y, "");
                    x.removeAttribute(S ? y : B);
                    if (ay.test(y) && B in x) {
                        x[B] = false
                    }
                }
            }
        },
        attrHooks: {
            type: {
                set: function(w, e) {
                    if (f.test(w.nodeName) && w.parentNode) {
                        aj.error("type property can't be changed")
                    } else {
                        if (!aj.support.radioValue && e === "radio" && aj.nodeName(w, "input")) {
                            var x = w.value;
                            w.setAttribute("type", e);
                            if (x) {
                                w.value = x
                            }
                            return e
                        }
                    }
                }
            },
            value: {
                get: function(w, e) {
                    if (br && aj.nodeName(w, "button")) {
                        return br.get(w, e)
                    }
                    return e in w ? w.value : null
                },
                set: function(w, e, x) {
                    if (br && aj.nodeName(w, "button")) {
                        return br.set(w, e, x)
                    }
                    w.value = e
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(x, w, B) {
            var A, e, z, y = x.nodeType;
            if (!x || y === 3 || y === 8 || y === 2) {
                return an
            }
            z = y !== 1 || !aj.isXMLDoc(x);
            if (z) {
                w = aj.propFix[w] || w;
                e = aj.propHooks[w]
            }
            if (B !== an) {
                if (e && "set" in e && (A = e.set(x, B, w)) !== an) {
                    return A
                } else {
                    return (x[w] = B)
                }
            } else {
                if (e && "get" in e && (A = e.get(x, w)) !== null) {
                    return A
                } else {
                    return x[w]
                }
            }
        },
        propHooks: {
            tabIndex: {
                get: function(w) {
                    var e = w.getAttributeNode("tabindex");
                    return e && e.specified ? parseInt(e.value, 10) : Q.test(w.nodeName) || j.test(w.nodeName) && w.href ? 0 : an
                }
            }
        }
    });
    aj.attrHooks.tabindex = aj.propHooks.tabIndex;
    be = {
        get: function(w, e) {
            var y, x = aj.prop(w, e);
            return x === true || typeof x !== "boolean" && (y = w.getAttributeNode(e)) && y.nodeValue !== false ? e.toLowerCase() : an
        },
        set: function(w, e, y) {
            var x;
            if (e === false) {
                aj.removeAttr(w, y)
            } else {
                x = aj.propFix[y] || y;
                if (x in w) {
                    w[x] = true
                }
                w.setAttribute(y, y.toLowerCase())
            }
            return y
        }
    };
    if (!S) {
        aM = {
            name: true,
            id: true
        };
        br = aj.valHooks.button = {
            get: function(w, e) {
                var x;
                x = w.getAttributeNode(e);
                return x && (aM[e] ? x.nodeValue !== "" : x.specified) ? x.nodeValue : an
            },
            set: function(w, e, y) {
                var x = w.getAttributeNode(y);
                if (!x) {
                    x = al.createAttribute(y);
                    w.setAttributeNode(x)
                }
                return (x.nodeValue = e + "")
            }
        };
        aj.attrHooks.tabindex.set = br.set;
        aj.each(["width", "height"], function(e, w) {
            aj.attrHooks[w] = aj.extend(aj.attrHooks[w], {
                set: function(y, x) {
                    if (x === "") {
                        y.setAttribute(w, "auto");
                        return x
                    }
                }
            })
        });
        aj.attrHooks.contenteditable = {
            get: br.get,
            set: function(w, e, x) {
                if (e === "") {
                    e = "false"
                }
                br.set(w, e, x)
            }
        }
    }
    if (!aj.support.hrefNormalized) {
        aj.each(["href", "src", "width", "height"], function(e, w) {
            aj.attrHooks[w] = aj.extend(aj.attrHooks[w], {
                get: function(y) {
                    var x = y.getAttribute(w, 2);
                    return x === null ? an : x
                }
            })
        })
    }
    if (!aj.support.style) {
        aj.attrHooks.style = {
            get: function(e) {
                return e.style.cssText.toLowerCase() || an
            },
            set: function(w, e) {
                return (w.style.cssText = "" + e)
            }
        }
    }
    if (!aj.support.optSelected) {
        aj.propHooks.selected = aj.extend(aj.propHooks.selected, {
            get: function(w) {
                var e = w.parentNode;
                if (e) {
                    e.selectedIndex;
                    if (e.parentNode) {
                        e.parentNode.selectedIndex
                    }
                }
                return null
            }
        })
    }
    if (!aj.support.enctype) {
        aj.propFix.enctype = "encoding"
    }
    if (!aj.support.checkOn) {
        aj.each(["radio", "checkbox"], function() {
            aj.valHooks[this] = {
                get: function(e) {
                    return e.getAttribute("value") === null ? "on" : e.value
                }
            }
        })
    }
    aj.each(["radio", "checkbox"], function() {
        aj.valHooks[this] = aj.extend(aj.valHooks[this], {
            set: function(w, e) {
                if (aj.isArray(e)) {
                    return (w.checked = aj.inArray(aj(w).val(), e) >= 0)
                }
            }
        })
    });
    var a3 = /^([^\.]*)?(?:\.(.+))?$/,
        W = /\bhover(\.\S+)?/,
        a2 = /^key/,
        bs = /^(?:mouse|contextmenu)|click/,
        ae = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        ah = function(w) {
            var e = ae.exec(w);
            if (e) {
                e[1] = (e[1] || "").toLowerCase();
                e[3] = e[3] && new RegExp("(?:^|\\s)" + e[3] + "(?:\\s|$)")
            }
            return e
        },
        i = function(w, e) {
            return ((!e[1] || w.nodeName.toLowerCase() === e[1]) && (!e[2] || w.id === e[2]) && (!e[3] || e[3].test(w.className)))
        },
        bG = function(e) {
            return aj.event.special.hover ? e : e.replace(W, "mouseenter$1 mouseleave$1")
        };
    aj.event = {
        add: function(I, G, F, D, B) {
            var z, A, L, K, J, E, e, H, w, y, x, C;
            if (I.nodeType === 3 || I.nodeType === 8 || !G || !F || !(z = aj._data(I))) {
                return
            }
            if (F.handler) {
                w = F;
                F = w.handler
            }
            if (!F.guid) {
                F.guid = aj.guid++
            }
            L = z.events;
            if (!L) {
                z.events = L = {}
            }
            A = z.handle;
            if (!A) {
                z.handle = A = function(M) {
                    return typeof aj !== "undefined" && (!M || aj.event.triggered !== M.type) ? aj.event.dispatch.apply(A.elem, arguments) : an
                };
                A.elem = I
            }
            G = bG(G).split(" ");
            for (K = 0; K < G.length; K++) {
                J = a3.exec(G[K]) || [];
                E = J[1];
                e = (J[2] || "").split(".").sort();
                C = aj.event.special[E] || {};
                E = (B ? C.delegateType : C.bindType) || E;
                C = aj.event.special[E] || {};
                H = aj.extend({
                    type: E,
                    origType: J[1],
                    data: D,
                    handler: F,
                    guid: F.guid,
                    selector: B,
                    namespace: e.join(".")
                }, w);
                if (B) {
                    H.quick = ah(B);
                    if (!H.quick && aj.expr.match.POS.test(B)) {
                        H.isPositional = true
                    }
                }
                x = L[E];
                if (!x) {
                    x = L[E] = [];
                    x.delegateCount = 0;
                    if (!C.setup || C.setup.call(I, D, e, A) === false) {
                        if (I.addEventListener) {
                            I.addEventListener(E, A, false)
                        } else {
                            if (I.attachEvent) {
                                I.attachEvent("on" + E, A)
                            }
                        }
                    }
                }
                if (C.add) {
                    C.add.call(I, H);
                    if (!H.handler.guid) {
                        H.handler.guid = F.guid
                    }
                }
                if (B) {
                    x.splice(x.delegateCount++, 0, H)
                } else {
                    x.push(H)
                }
                aj.event.global[E] = true
            }
            I = null
        },
        global: {},
        remove: function(I, G, E, D) {
            var B = aj.hasData(I) && aj._data(I),
                K, L, F, x, y, z, J, C, A, w, H;
            if (!B || !(J = B.events)) {
                return
            }
            G = bG(G || "").split(" ");
            for (K = 0; K < G.length; K++) {
                L = a3.exec(G[K]) || [];
                F = L[1];
                x = L[2];
                if (!F) {
                    x = x ? "." + x : "";
                    for (z in J) {
                        aj.event.remove(I, z + x, E, D)
                    }
                    return
                }
                C = aj.event.special[F] || {};
                F = (D ? C.delegateType : C.bindType) || F;
                w = J[F] || [];
                y = w.length;
                x = x ? new RegExp("(^|\\.)" + x.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                if (E || x || D || C.remove) {
                    for (z = 0; z < w.length; z++) {
                        H = w[z];
                        if (!E || E.guid === H.guid) {
                            if (!x || x.test(H.namespace)) {
                                if (!D || D === H.selector || D === "**" && H.selector) {
                                    w.splice(z--, 1);
                                    if (H.selector) {
                                        w.delegateCount--
                                    }
                                    if (C.remove) {
                                        C.remove.call(I, H)
                                    }
                                }
                            }
                        }
                    }
                } else {
                    w.length = 0
                }
                if (w.length === 0 && y !== w.length) {
                    if (!C.teardown || C.teardown.call(I, x) === false) {
                        aj.removeEvent(I, F, B.handle)
                    }
                    delete J[F]
                }
            }
            if (aj.isEmptyObject(J)) {
                A = B.handle;
                if (A) {
                    A.elem = null
                }
                aj.removeData(I, ["events", "handle"], true)
            }
        },
        customEvent: {
            getData: true,
            setData: true,
            changeData: true
        },
        trigger: function(J, I, H, G) {
            if (H && (H.nodeType === 3 || H.nodeType === 8)) {
                return
            }
            var E = J.type || J,
                y = [],
                w, x, C, K, A, z, F, D, B, L;
            if (E.indexOf("!") >= 0) {
                E = E.slice(0, -1);
                x = true
            }
            if (E.indexOf(".") >= 0) {
                y = E.split(".");
                E = y.shift();
                y.sort()
            }
            if ((!H || aj.event.customEvent[E]) && !aj.event.global[E]) {
                return
            }
            J = typeof J === "object" ? J[aj.expando] ? J : new aj.Event(E, J) : new aj.Event(E);
            J.type = E;
            J.isTrigger = true;
            J.exclusive = x;
            J.namespace = y.join(".");
            J.namespace_re = J.namespace ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
            z = E.indexOf(":") < 0 ? "on" + E : "";
            if (G || !H) {
                J.preventDefault()
            }
            if (!H) {
                w = aj.cache;
                for (C in w) {
                    if (w[C].events && w[C].events[E]) {
                        aj.event.trigger(J, I, w[C].handle.elem, true)
                    }
                }
                return
            }
            J.result = an;
            if (!J.target) {
                J.target = H
            }
            I = I != null ? aj.makeArray(I) : [];
            I.unshift(J);
            F = aj.event.special[E] || {};
            if (F.trigger && F.trigger.apply(H, I) === false) {
                return
            }
            B = [
                [H, F.bindType || E]
            ];
            if (!G && !F.noBubble && !aj.isWindow(H)) {
                L = F.delegateType || E;
                A = null;
                for (K = H.parentNode; K; K = K.parentNode) {
                    B.push([K, L]);
                    A = K
                }
                if (A && A === H.ownerDocument) {
                    B.push([A.defaultView || A.parentWindow || ao, L])
                }
            }
            for (C = 0; C < B.length; C++) {
                K = B[C][0];
                J.type = B[C][1];
                D = (aj._data(K, "events") || {})[J.type] && aj._data(K, "handle");
                if (D) {
                    D.apply(K, I)
                }
                D = z && K[z];
                if (D && aj.acceptData(K)) {
                    D.apply(K, I)
                }
                if (J.isPropagationStopped()) {
                    break
                }
            }
            J.type = E;
            if (!J.isDefaultPrevented()) {
                if ((!F._default || F._default.apply(H.ownerDocument, I) === false) && !(E === "click" && aj.nodeName(H, "a")) && aj.acceptData(H)) {
                    if (z && H[E] && ((E !== "focus" && E !== "blur") || J.target.offsetWidth !== 0) && !aj.isWindow(H)) {
                        A = H[z];
                        if (A) {
                            H[z] = null
                        }
                        aj.event.triggered = E;
                        H[E]();
                        aj.event.triggered = an;
                        if (A) {
                            H[z] = A
                        }
                    }
                }
            }
            return J.result
        },
        dispatch: function(K) {
            K = aj.event.fix(K || ao.event);
            var J = ((aj._data(this, "events") || {})[K.type] || []),
                C = J.delegateCount,
                y = [].slice.call(arguments, 0),
                D = !K.exclusive && !K.namespace,
                A = (aj.event.special[K.type] || {}).handle,
                w = [],
                H, F, z, L, G, B, x, e, E, I, M;
            y[0] = K;
            K.delegateTarget = this;
            if (C && !K.target.disabled && !(K.button && K.type === "click")) {
                for (z = K.target; z != this; z = z.parentNode || this) {
                    G = {};
                    x = [];
                    for (H = 0; H < C; H++) {
                        e = J[H];
                        E = e.selector;
                        I = G[E];
                        if (e.isPositional) {
                            I = (I || (G[E] = aj(E))).index(z) >= 0
                        } else {
                            if (I === an) {
                                I = G[E] = (e.quick ? i(z, e.quick) : aj(z).is(E))
                            }
                        }
                        if (I) {
                            x.push(e)
                        }
                    }
                    if (x.length) {
                        w.push({
                            elem: z,
                            matches: x
                        })
                    }
                }
            }
            if (J.length > C) {
                w.push({
                    elem: this,
                    matches: J.slice(C)
                })
            }
            for (H = 0; H < w.length && !K.isPropagationStopped(); H++) {
                B = w[H];
                K.currentTarget = B.elem;
                for (F = 0; F < B.matches.length && !K.isImmediatePropagationStopped(); F++) {
                    e = B.matches[F];
                    if (D || (!K.namespace && !e.namespace) || K.namespace_re && K.namespace_re.test(e.namespace)) {
                        K.data = e.data;
                        K.handleObj = e;
                        L = (A || e.handler).apply(B.elem, y);
                        if (L !== an) {
                            K.result = L;
                            if (L === false) {
                                K.preventDefault();
                                K.stopPropagation()
                            }
                        }
                    }
                }
            }
            return K.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(w, e) {
                if (w.which == null) {
                    w.which = e.charCode != null ? e.charCode : e.keyCode
                }
                return w
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement wheelDelta".split(" "),
            filter: function(x, w) {
                var B, z, e, y = w.button,
                    A = w.fromElement;
                if (x.pageX == null && w.clientX != null) {
                    B = x.target.ownerDocument || al;
                    z = B.documentElement;
                    e = B.body;
                    x.pageX = w.clientX + (z && z.scrollLeft || e && e.scrollLeft || 0) - (z && z.clientLeft || e && e.clientLeft || 0);
                    x.pageY = w.clientY + (z && z.scrollTop || e && e.scrollTop || 0) - (z && z.clientTop || e && e.clientTop || 0)
                }
                if (!x.relatedTarget && A) {
                    x.relatedTarget = A === x.target ? w.toElement : A
                }
                if (!x.which && y !== an) {
                    x.which = (y & 1 ? 1 : (y & 2 ? 3 : (y & 4 ? 2 : 0)))
                }
                return x
            }
        },
        fix: function(w) {
            if (w[aj.expando]) {
                return w
            }
            var x, A, e = w,
                y = aj.event.fixHooks[w.type] || {},
                z = y.props ? this.props.concat(y.props) : this.props;
            w = aj.Event(e);
            for (x = z.length; x;) {
                A = z[--x];
                w[A] = e[A]
            }
            if (!w.target) {
                w.target = e.srcElement || al
            }
            if (w.target.nodeType === 3) {
                w.target = w.target.parentNode
            }
            if (w.metaKey === an) {
                w.metaKey = w.ctrlKey
            }
            return y.filter ? y.filter(w, e) : w
        },
        special: {
            ready: {
                setup: aj.bindReady
            },
            focus: {
                delegateType: "focusin",
                noBubble: true
            },
            blur: {
                delegateType: "focusout",
                noBubble: true
            },
            beforeunload: {
                setup: function(w, e, x) {
                    if (aj.isWindow(this)) {
                        this.onbeforeunload = x
                    }
                },
                teardown: function(w, e) {
                    if (this.onbeforeunload === e) {
                        this.onbeforeunload = null
                    }
                }
            }
        }
    };
    aj.event.handle = aj.event.dispatch;
    aj.removeEvent = al.removeEventListener ? function(w, e, x) {
        if (w.removeEventListener) {
            w.removeEventListener(e, x, false)
        }
    } : function(w, e, x) {
        if (w.detachEvent) {
            w.detachEvent("on" + e, x)
        }
    };
    aj.Event = function(w, e) {
        if (!(this instanceof aj.Event)) {
            return new aj.Event(w, e)
        }
        if (w && w.type) {
            this.originalEvent = w;
            this.type = w.type;
            this.isDefaultPrevented = (w.defaultPrevented || w.returnValue === false || w.defaultPrevented && w.defaultPrevented()) ? h : bx
        } else {
            this.type = w
        }
        if (e) {
            aj.extend(this, e)
        }
        this.timeStamp = w && w.timeStamp || aj.now();
        this[aj.expando] = true
    };

    function bx() {
        return false
    }

    function h() {
        return true
    }
    aj.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = h;
            var w = this.originalEvent;
            if (!w) {
                return
            }
            if (w.preventDefault) {
                w.preventDefault()
            } else {
                w.returnValue = false
            }
        },
        stopPropagation: function() {
            this.isPropagationStopped = h;
            var w = this.originalEvent;
            if (!w) {
                return
            }
            if (w.stopPropagation) {
                w.stopPropagation()
            }
            w.cancelBubble = true
        },
        isDefaultPrevented: bx,
        isPropagationStopped: bx,
        isImmediatePropagationStopped: bx
    };
    aj.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(w, e) {
        aj.event.special[w] = aj.event.special[e] = {
            delegateType: e,
            bindType: e,
            handle: function(z) {
                var y = this,
                    D = z.relatedTarget,
                    B = z.handleObj,
                    x = B.selector,
                    C, A;
                if (!D || B.origType === z.type || (D !== y && !aj.contains(y, D))) {
                    C = z.type;
                    z.type = B.origType;
                    A = B.handler.apply(this, arguments);
                    z.type = C
                }
                return A
            }
        }
    });
    aj.fn.extend({
        on: function(w, C, B, A, z) {
            var y, x;
            if (typeof w === "object") {
                if (typeof C !== "string") {
                    B = C;
                    C = an
                }
                for (x in w) {
                    this.on(x, C, B, w[x], z)
                }
                return this
            }
            if (B == null && A == null) {
                A = C;
                B = C = an
            } else {
                if (A == null) {
                    if (typeof C === "string") {
                        A = B;
                        B = an
                    } else {
                        A = B;
                        B = C;
                        C = an
                    }
                }
            }
            if (A === false) {
                A = bx
            } else {
                if (!A) {
                    return this
                }
            }
            if (z === 1) {
                y = A;
                A = function(e) {
                    aj().off(e);
                    return y.apply(this, arguments)
                };
                A.guid = y.guid || (y.guid = aj.guid++)
            }
            return this.each(function() {
                aj.event.add(this, w, A, B, C)
            })
        },
        one: function(w, e, y, x) {
            return this.on.call(this, w, e, y, x, 1)
        },
        off: function(x, w, A) {
            if (x && x.preventDefault && x.handleObj) {
                var z = x.handleObj;
                aj(x.delegateTarget).off(z.namespace ? z.type + "." + z.namespace : z.type, z.selector, z.handler);
                return this
            }
            if (typeof x === "object") {
                for (var y in x) {
                    this.off(y, w, x[y])
                }
                return this
            }
            if (w === false || typeof w === "function") {
                A = w;
                w = an
            }
            if (A === false) {
                A = bx
            }
            return this.each(function() {
                aj.event.remove(this, x, A, w)
            })
        },
        bind: function(w, e, x) {
            return this.on(w, null, e, x)
        },
        unbind: function(w, e) {
            return this.off(w, null, e)
        },
        live: function(w, e, x) {
            aj(this.context).on(w, this.selector, e, x);
            return this
        },
        die: function(w, e) {
            aj(this.context).off(w, this.selector || "**", e);
            return this
        },
        delegate: function(w, e, y, x) {
            return this.on(e, w, y, x)
        },
        undelegate: function(w, e, x) {
            return arguments.length == 1 ? this.off(w, "**") : this.off(e, w, x)
        },
        trigger: function(w, e) {
            return this.each(function() {
                aj.event.trigger(w, e, this)
            })
        },
        triggerHandler: function(w, e) {
            if (this[0]) {
                return aj.event.trigger(w, e, this[0], true)
            }
        },
        toggle: function(z) {
            var y = arguments,
                e = z.guid || aj.guid++,
                w = 0,
                x = function(B) {
                    var A = (aj._data(this, "lastToggle" + z.guid) || 0) % w;
                    aj._data(this, "lastToggle" + z.guid, A + 1);
                    B.preventDefault();
                    return y[A].apply(this, arguments) || false
                };
            x.guid = e;
            while (w < y.length) {
                y[w++].guid = e
            }
            return this.click(x)
        },
        hover: function(w, e) {
            return this.mouseenter(w).mouseleave(e || w)
        }
    });
    aj.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "), function(e, w) {
        aj.fn[w] = function(y, x) {
            if (x == null) {
                x = y;
                y = null
            }
            return arguments.length > 0 ? this.bind(w, y, x) : this.trigger(w)
        };
        if (aj.attrFn) {
            aj.attrFn[w] = true
        }
        if (a2.test(w)) {
            aj.event.fixHooks[w] = aj.event.keyHooks
        }
        if (bs.test(w)) {
            aj.event.fixHooks[w] = aj.event.mouseHooks
        }
    });
    (function() {
        var bI = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            A = "sizcache" + (Math.random() + "").replace(".", ""),
            G = 0,
            M = Object.prototype.toString,
            z = false,
            y = true,
            K = /\\/g,
            bK = /\r\n/g,
            bM = /\W/;
        [0, 0].sort(function() {
            y = false;
            return 0
        });
        var L = function(bZ, bY, bX, bW) {
            bX = bX || [];
            bY = bY || al;
            var bV = bY;
            if (bY.nodeType !== 1 && bY.nodeType !== 9) {
                return []
            }
            if (!bZ || typeof bZ !== "string") {
                return bX
            }
            var bO, b0, b3, bN, bU, b2, b1, bS, bQ = true,
                bP = L.isXML(bY),
                bR = [],
                bT = bZ;
            do {
                bI.exec("");
                bO = bI.exec(bT);
                if (bO) {
                    bT = bO[3];
                    bR.push(bO[1]);
                    if (bO[2]) {
                        bN = bO[3];
                        break
                    }
                }
            } while (bO);
            if (bR.length > 1 && H.exec(bZ)) {
                if (bR.length === 2 && I.relative[bR[0]]) {
                    b0 = C(bR[0] + bR[1], bY, bW)
                } else {
                    b0 = I.relative[bR[0]] ? [bY] : L(bR.shift(), bY);
                    while (bR.length) {
                        bZ = bR.shift();
                        if (I.relative[bZ]) {
                            bZ += bR.shift()
                        }
                        b0 = C(bZ, b0, bW)
                    }
                }
            } else {
                if (!bW && bR.length > 1 && bY.nodeType === 9 && !bP && I.match.ID.test(bR[0]) && !I.match.ID.test(bR[bR.length - 1])) {
                    bU = L.find(bR.shift(), bY, bP);
                    bY = bU.expr ? L.filter(bU.expr, bU.set)[0] : bU.set[0]
                }
                if (bY) {
                    bU = bW ? {
                        expr: bR.pop(),
                        set: E(bW)
                    } : L.find(bR.pop(), bR.length === 1 && (bR[0] === "~" || bR[0] === "+") && bY.parentNode ? bY.parentNode : bY, bP);
                    b0 = bU.expr ? L.filter(bU.expr, bU.set) : bU.set;
                    if (bR.length > 0) {
                        b3 = E(b0)
                    } else {
                        bQ = false
                    }
                    while (bR.length) {
                        b2 = bR.pop();
                        b1 = b2;
                        if (!I.relative[b2]) {
                            b2 = ""
                        } else {
                            b1 = bR.pop()
                        }
                        if (b1 == null) {
                            b1 = bY
                        }
                        I.relative[b2](b3, b1, bP)
                    }
                } else {
                    b3 = bR = []
                }
            }
            if (!b3) {
                b3 = b0
            }
            if (!b3) {
                L.error(b2 || bZ)
            }
            if (M.call(b3) === "[object Array]") {
                if (!bQ) {
                    bX.push.apply(bX, b3)
                } else {
                    if (bY && bY.nodeType === 1) {
                        for (bS = 0; b3[bS] != null; bS++) {
                            if (b3[bS] && (b3[bS] === true || b3[bS].nodeType === 1 && L.contains(bY, b3[bS]))) {
                                bX.push(b0[bS])
                            }
                        }
                    } else {
                        for (bS = 0; b3[bS] != null; bS++) {
                            if (b3[bS] && b3[bS].nodeType === 1) {
                                bX.push(b0[bS])
                            }
                        }
                    }
                }
            } else {
                E(b3, bX)
            }
            if (bN) {
                L(bN, bV, bX, bW);
                L.uniqueSort(bX)
            }
            return bX
        };
        L.uniqueSort = function(e) {
            if (D) {
                z = y;
                e.sort(D);
                if (z) {
                    for (var bN = 1; bN < e.length; bN++) {
                        if (e[bN] === e[bN - 1]) {
                            e.splice(bN--, 1)
                        }
                    }
                }
            }
            return e
        };
        L.matches = function(bN, e) {
            return L(bN, null, null, e)
        };
        L.matchesSelector = function(bN, e) {
            return L(e, null, null, [bN]).length > 0
        };
        L.find = function(bU, bT, bS) {
            var bR, bO, bQ, bP, e, bN;
            if (!bU) {
                return []
            }
            for (bO = 0, bQ = I.order.length; bO < bQ; bO++) {
                e = I.order[bO];
                if ((bP = I.leftMatch[e].exec(bU))) {
                    bN = bP[1];
                    bP.splice(1, 1);
                    if (bN.substr(bN.length - 1) !== "\\") {
                        bP[1] = (bP[1] || "").replace(K, "");
                        bR = I.find[e](bP, bT, bS);
                        if (bR != null) {
                            bU = bU.replace(I.match[e], "");
                            break
                        }
                    }
                }
            }
            if (!bR) {
                bR = typeof bT.getElementsByTagName !== "undefined" ? bT.getElementsByTagName("*") : []
            }
            return {
                set: bR,
                expr: bU
            }
        };
        L.filter = function(bZ, bY, bX, bW) {
            var bV, bO, bN, b3, b1, bP, bR, bS, b0, bQ = bZ,
                b2 = [],
                bU = bY,
                bT = bY && bY[0] && L.isXML(bY[0]);
            while (bZ && bY.length) {
                for (bN in I.filter) {
                    if ((bV = I.leftMatch[bN].exec(bZ)) != null && bV[2]) {
                        bP = I.filter[bN];
                        bR = bV[1];
                        bO = false;
                        bV.splice(1, 1);
                        if (bR.substr(bR.length - 1) === "\\") {
                            continue
                        }
                        if (bU === b2) {
                            b2 = []
                        }
                        if (I.preFilter[bN]) {
                            bV = I.preFilter[bN](bV, bU, bX, b2, bW, bT);
                            if (!bV) {
                                bO = b3 = true
                            } else {
                                if (bV === true) {
                                    continue
                                }
                            }
                        }
                        if (bV) {
                            for (bS = 0;
                                 (b1 = bU[bS]) != null; bS++) {
                                if (b1) {
                                    b3 = bP(b1, bV, bS, bU);
                                    b0 = bW ^ b3;
                                    if (bX && b3 != null) {
                                        if (b0) {
                                            bO = true
                                        } else {
                                            bU[bS] = false
                                        }
                                    } else {
                                        if (b0) {
                                            b2.push(b1);
                                            bO = true
                                        }
                                    }
                                }
                            }
                        }
                        if (b3 !== an) {
                            if (!bX) {
                                bU = b2
                            }
                            bZ = bZ.replace(I.match[bN], "");
                            if (!bO) {
                                return []
                            }
                            break
                        }
                    }
                }
                if (bZ === bQ) {
                    if (bO == null) {
                        L.error(bZ)
                    } else {
                        break
                    }
                }
                bQ = bZ
            }
            return bU
        };
        L.error = function(e) {
            throw "Syntax error, unrecognized expression: " + e
        };
        var J = L.getText = function(bN) {
            var bP, bQ, e = bN.nodeType,
                bO = "";
            if (e) {
                if (e === 1) {
                    if (typeof bN.textContent === "string") {
                        return bN.textContent
                    } else {
                        if (typeof bN.innerText === "string") {
                            return bN.innerText.replace(bK, "")
                        } else {
                            for (bN = bN.firstChild; bN; bN = bN.nextSibling) {
                                bO += J(bN)
                            }
                        }
                    }
                } else {
                    if (e === 3 || e === 4) {
                        return bN.nodeValue
                    }
                }
            } else {
                for (bP = 0;
                     (bQ = bN[bP]); bP++) {
                    if (bQ.nodeType !== 8) {
                        bO += J(bQ)
                    }
                }
            }
            return bO
        };
        var I = L.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(e) {
                    return e.getAttribute("href")
                },
                type: function(e) {
                    return e.getAttribute("type")
                }
            },
            relative: {
                "+": function(bO, e) {
                    var bT = typeof e === "string",
                        bR = bT && !bM.test(e),
                        bS = bT && !bR;
                    if (bR) {
                        e = e.toLowerCase()
                    }
                    for (var bP = 0, bN = bO.length, bQ; bP < bN; bP++) {
                        if ((bQ = bO[bP])) {
                            while ((bQ = bQ.previousSibling) && bQ.nodeType !== 1) {}
                            bO[bP] = bS || bQ && bQ.nodeName.toLowerCase() === e ? bQ || false : bQ === e
                        }
                    }
                    if (bS) {
                        L.filter(e, bO, true)
                    }
                },
                ">": function(bO, e) {
                    var bS, bQ = typeof e === "string",
                        bP = 0,
                        bN = bO.length;
                    if (bQ && !bM.test(e)) {
                        e = e.toLowerCase();
                        for (; bP < bN; bP++) {
                            bS = bO[bP];
                            if (bS) {
                                var bR = bS.parentNode;
                                bO[bP] = bR.nodeName.toLowerCase() === e ? bR : false
                            }
                        }
                    } else {
                        for (; bP < bN; bP++) {
                            bS = bO[bP];
                            if (bS) {
                                bO[bP] = bQ ? bS.parentNode : bS.parentNode === e
                            }
                        }
                        if (bQ) {
                            L.filter(e, bO, true)
                        }
                    }
                },
                "": function(bO, bN, bR) {
                    var bQ, bP = G++,
                        e = bJ;
                    if (typeof bN === "string" && !bM.test(bN)) {
                        bN = bN.toLowerCase();
                        bQ = bN;
                        e = w
                    }
                    e("parentNode", bN, bP, bO, bQ, bR)
                },
                "~": function(bO, bN, bR) {
                    var bQ, bP = G++,
                        e = bJ;
                    if (typeof bN === "string" && !bM.test(bN)) {
                        bN = bN.toLowerCase();
                        bQ = bN;
                        e = w
                    }
                    e("previousSibling", bN, bP, bO, bQ, bR)
                }
            },
            find: {
                ID: function(bO, bN, bP) {
                    if (typeof bN.getElementById !== "undefined" && !bP) {
                        var e = bN.getElementById(bO[1]);
                        return e && e.parentNode ? [e] : []
                    }
                },
                NAME: function(bO, e) {
                    if (typeof e.getElementsByName !== "undefined") {
                        var bR = [],
                            bQ = e.getElementsByName(bO[1]);
                        for (var bP = 0, bN = bQ.length; bP < bN; bP++) {
                            if (bQ[bP].getAttribute("name") === bO[1]) {
                                bR.push(bQ[bP])
                            }
                        }
                        return bR.length === 0 ? null : bR
                    }
                },
                TAG: function(bN, e) {
                    if (typeof e.getElementsByTagName !== "undefined") {
                        return e.getElementsByTagName(bN[1])
                    }
                }
            },
            preFilter: {
                CLASS: function(bO, bN, bU, bT, bS, bR) {
                    bO = " " + bO[1].replace(K, "") + " ";
                    if (bR) {
                        return bO
                    }
                    for (var bP = 0, bQ;
                         (bQ = bN[bP]) != null; bP++) {
                        if (bQ) {
                            if (bS ^ (bQ.className && (" " + bQ.className + " ").replace(/[\t\n\r]/g, " ").indexOf(bO) >= 0)) {
                                if (!bU) {
                                    bT.push(bQ)
                                }
                            } else {
                                if (bU) {
                                    bN[bP] = false
                                }
                            }
                        }
                    }
                    return false
                },
                ID: function(e) {
                    return e[1].replace(K, "")
                },
                TAG: function(bN, e) {
                    return bN[1].replace(K, "").toLowerCase()
                },
                CHILD: function(bN) {
                    if (bN[1] === "nth") {
                        if (!bN[2]) {
                            L.error(bN[0])
                        }
                        bN[2] = bN[2].replace(/^\+|\s*/g, "");
                        var e = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(bN[2] === "even" && "2n" || bN[2] === "odd" && "2n+1" || !/\D/.test(bN[2]) && "0n+" + bN[2] || bN[2]);
                        bN[2] = (e[1] + (e[2] || 1)) - 0;
                        bN[3] = e[3] - 0
                    } else {
                        if (bN[2]) {
                            L.error(bN[0])
                        }
                    }
                    bN[0] = G++;
                    return bN
                },
                ATTR: function(bO, bN, bT, bS, bR, bQ) {
                    var bP = bO[1] = bO[1].replace(K, "");
                    if (!bQ && I.attrMap[bP]) {
                        bO[1] = I.attrMap[bP]
                    }
                    bO[4] = (bO[4] || bO[5] || "").replace(K, "");
                    if (bO[2] === "~=") {
                        bO[4] = " " + bO[4] + " "
                    }
                    return bO
                },
                PSEUDO: function(bO, bN, bS, bR, bQ) {
                    if (bO[1] === "not") {
                        if ((bI.exec(bO[3]) || "").length > 1 || /^\w/.test(bO[3])) {
                            bO[3] = L(bO[3], null, null, bN)
                        } else {
                            var bP = L.filter(bO[3], bN, bS, true ^ bQ);
                            if (!bS) {
                                bR.push.apply(bR, bP)
                            }
                            return false
                        }
                    } else {
                        if (I.match.POS.test(bO[0]) || I.match.CHILD.test(bO[0])) {
                            return true
                        }
                    }
                    return bO
                },
                POS: function(e) {
                    e.unshift(true);
                    return e
                }
            },
            filters: {
                enabled: function(e) {
                    return e.disabled === false && e.type !== "hidden"
                },
                disabled: function(e) {
                    return e.disabled === true
                },
                checked: function(e) {
                    return e.checked === true
                },
                selected: function(e) {
                    if (e.parentNode) {
                        e.parentNode.selectedIndex
                    }
                    return e.selected === true
                },
                parent: function(e) {
                    return !!e.firstChild
                },
                empty: function(e) {
                    return !e.firstChild
                },
                has: function(bN, bO, e) {
                    return !!L(e[3], bN).length
                },
                header: function(e) {
                    return (/h\d/i).test(e.nodeName)
                },
                text: function(bN) {
                    var e = bN.getAttribute("type"),
                        bO = bN.type;
                    return bN.nodeName.toLowerCase() === "input" && "text" === bO && (e === bO || e === null)
                },
                radio: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "radio" === e.type
                },
                checkbox: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "checkbox" === e.type
                },
                file: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "file" === e.type
                },
                password: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "password" === e.type
                },
                submit: function(bN) {
                    var e = bN.nodeName.toLowerCase();
                    return (e === "input" || e === "button") && "submit" === bN.type
                },
                image: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "image" === e.type
                },
                reset: function(bN) {
                    var e = bN.nodeName.toLowerCase();
                    return (e === "input" || e === "button") && "reset" === bN.type
                },
                button: function(bN) {
                    var e = bN.nodeName.toLowerCase();
                    return e === "input" && "button" === bN.type || e === "button"
                },
                input: function(e) {
                    return (/input|select|textarea|button/i).test(e.nodeName)
                },
                focus: function(e) {
                    return e === e.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function(e, bN) {
                    return bN === 0
                },
                last: function(bN, bO, e, bP) {
                    return bO === bP.length - 1
                },
                even: function(e, bN) {
                    return bN % 2 === 0
                },
                odd: function(e, bN) {
                    return bN % 2 === 1
                },
                lt: function(bN, bO, e) {
                    return bO < e[3] - 0
                },
                gt: function(bN, bO, e) {
                    return bO > e[3] - 0
                },
                nth: function(bN, bO, e) {
                    return e[3] - 0 === bO
                },
                eq: function(bN, bO, e) {
                    return e[3] - 0 === bO
                }
            },
            filter: {
                PSEUDO: function(bV, bU, bQ, bT) {
                    var bS = bU[1],
                        bN = I.filters[bS];
                    if (bN) {
                        return bN(bV, bQ, bU, bT)
                    } else {
                        if (bS === "contains") {
                            return (bV.textContent || bV.innerText || J([bV]) || "").indexOf(bU[3]) >= 0
                        } else {
                            if (bS === "not") {
                                var bR = bU[3];
                                for (var bP = 0, bO = bR.length; bP < bO; bP++) {
                                    if (bR[bP] === bV) {
                                        return false
                                    }
                                }
                                return true
                            } else {
                                L.error(bS)
                            }
                        }
                    }
                },
                CHILD: function(bT, bS) {
                    var bR, bW, bQ, bV, bN, bP, bU, e = bS[1],
                        bO = bT;
                    switch (e) {
                        case "only":
                        case "first":
                            while ((bO = bO.previousSibling)) {
                                if (bO.nodeType === 1) {
                                    return false
                                }
                            }
                            if (e === "first") {
                                return true
                            }
                            bO = bT;
                        case "last":
                            while ((bO = bO.nextSibling)) {
                                if (bO.nodeType === 1) {
                                    return false
                                }
                            }
                            return true;
                        case "nth":
                            bR = bS[2];
                            bW = bS[3];
                            if (bR === 1 && bW === 0) {
                                return true
                            }
                            bQ = bS[0];
                            bV = bT.parentNode;
                            if (bV && (bV[A] !== bQ || !bT.nodeIndex)) {
                                bP = 0;
                                for (bO = bV.firstChild; bO; bO = bO.nextSibling) {
                                    if (bO.nodeType === 1) {
                                        bO.nodeIndex = ++bP
                                    }
                                }
                                bV[A] = bQ
                            }
                            bU = bT.nodeIndex - bW;
                            if (bR === 0) {
                                return bU === 0
                            } else {
                                return (bU % bR === 0 && bU / bR >= 0)
                            }
                    }
                },
                ID: function(bN, e) {
                    return bN.nodeType === 1 && bN.getAttribute("id") === e
                },
                TAG: function(bN, e) {
                    return (e === "*" && bN.nodeType === 1) || !!bN.nodeName && bN.nodeName.toLowerCase() === e
                },
                CLASS: function(bN, e) {
                    return (" " + (bN.className || bN.getAttribute("class")) + " ").indexOf(e) > -1
                },
                ATTR: function(bP, bN) {
                    var bS = bN[1],
                        e = L.attr ? L.attr(bP, bS) : I.attrHandle[bS] ? I.attrHandle[bS](bP) : bP[bS] != null ? bP[bS] : bP.getAttribute(bS),
                        bR = e + "",
                        bQ = bN[2],
                        bO = bN[4];
                    return e == null ? bQ === "!=" : !bQ && L.attr ? e != null : bQ === "=" ? bR === bO : bQ === "*=" ? bR.indexOf(bO) >= 0 : bQ === "~=" ? (" " + bR + " ").indexOf(bO) >= 0 : !bO ? bR && e !== false : bQ === "!=" ? bR !== bO : bQ === "^=" ? bR.indexOf(bO) === 0 : bQ === "$=" ? bR.substr(bR.length - bO.length) === bO : bQ === "|=" ? bR === bO || bR.substr(0, bO.length + 1) === bO + "-" : false
                },
                POS: function(bN, e, bO, bR) {
                    var bQ = e[2],
                        bP = I.setFilters[bQ];
                    if (bP) {
                        return bP(bN, bO, e, bR)
                    }
                }
            }
        };
        var H = I.match.POS,
            x = function(bN, e) {
                return "\\" + (e - 0 + 1)
            };
        for (var F in I.match) {
            I.match[F] = new RegExp(I.match[F].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
            I.leftMatch[F] = new RegExp(/(^(?:.|\r|\n)*?)/.source + I.match[F].source.replace(/\\(\d+)/g, x))
        }
        var E = function(bN, e) {
            bN = Array.prototype.slice.call(bN, 0);
            if (e) {
                e.push.apply(e, bN);
                return e
            }
            return bN
        };
        try {
            Array.prototype.slice.call(al.documentElement.childNodes, 0)[0].nodeType
        } catch (bL) {
            E = function(bO, e) {
                var bQ = 0,
                    bP = e || [];
                if (M.call(bO) === "[object Array]") {
                    Array.prototype.push.apply(bP, bO)
                } else {
                    if (typeof bO.length === "number") {
                        for (var bN = bO.length; bQ < bN; bQ++) {
                            bP.push(bO[bQ])
                        }
                    } else {
                        for (; bO[bQ]; bQ++) {
                            bP.push(bO[bQ])
                        }
                    }
                }
                return bP
            }
        }
        var D, B;
        if (al.documentElement.compareDocumentPosition) {
            D = function(bN, e) {
                if (bN === e) {
                    z = true;
                    return 0
                }
                if (!bN.compareDocumentPosition || !e.compareDocumentPosition) {
                    return bN.compareDocumentPosition ? -1 : 1
                }
                return bN.compareDocumentPosition(e) & 4 ? -1 : 1
            }
        } else {
            D = function(bU, bT) {
                if (bU === bT) {
                    z = true;
                    return 0
                } else {
                    if (bU.sourceIndex && bT.sourceIndex) {
                        return bU.sourceIndex - bT.sourceIndex
                    }
                }
                var bR, bN, bO = [],
                    e = [],
                    bQ = bU.parentNode,
                    bS = bT.parentNode,
                    bV = bQ;
                if (bQ === bS) {
                    return B(bU, bT)
                } else {
                    if (!bQ) {
                        return -1
                    } else {
                        if (!bS) {
                            return 1
                        }
                    }
                }
                while (bV) {
                    bO.unshift(bV);
                    bV = bV.parentNode
                }
                bV = bS;
                while (bV) {
                    e.unshift(bV);
                    bV = bV.parentNode
                }
                bR = bO.length;
                bN = e.length;
                for (var bP = 0; bP < bR && bP < bN; bP++) {
                    if (bO[bP] !== e[bP]) {
                        return B(bO[bP], e[bP])
                    }
                }
                return bP === bR ? B(bU, e[bP], -1) : B(bO[bP], bT, 1)
            };
            B = function(bN, e, bP) {
                if (bN === e) {
                    return bP
                }
                var bO = bN.nextSibling;
                while (bO) {
                    if (bO === e) {
                        return -1
                    }
                    bO = bO.nextSibling
                }
                return 1
            }
        }(function() {
            var bN = al.createElement("div"),
                bO = "script" + (new Date()).getTime(),
                e = al.documentElement;
            bN.innerHTML = "<a name='" + bO + "'/>";
            e.insertBefore(bN, e.firstChild);
            if (al.getElementById(bO)) {
                I.find.ID = function(bR, bQ, bS) {
                    if (typeof bQ.getElementById !== "undefined" && !bS) {
                        var bP = bQ.getElementById(bR[1]);
                        return bP ? bP.id === bR[1] || typeof bP.getAttributeNode !== "undefined" && bP.getAttributeNode("id").nodeValue === bR[1] ? [bP] : an : []
                    }
                };
                I.filter.ID = function(bQ, bP) {
                    var bR = typeof bQ.getAttributeNode !== "undefined" && bQ.getAttributeNode("id");
                    return bQ.nodeType === 1 && bR && bR.nodeValue === bP
                }
            }
            e.removeChild(bN);
            e = bN = null
        })();
        (function() {
            var bN = al.createElement("div");
            bN.appendChild(al.createComment(""));
            if (bN.getElementsByTagName("*").length > 0) {
                I.find.TAG = function(bO, e) {
                    var bR = e.getElementsByTagName(bO[1]);
                    if (bO[1] === "*") {
                        var bQ = [];
                        for (var bP = 0; bR[bP]; bP++) {
                            if (bR[bP].nodeType === 1) {
                                bQ.push(bR[bP])
                            }
                        }
                        bR = bQ
                    }
                    return bR
                }
            }
            bN.innerHTML = "<a href='#'></a>";
            if (bN.firstChild && typeof bN.firstChild.getAttribute !== "undefined" && bN.firstChild.getAttribute("href") !== "#") {
                I.attrHandle.href = function(e) {
                    return e.getAttribute("href", 2)
                }
            }
            bN = null
        })();
        if (al.querySelectorAll) {
            (function() {
                var bN = L,
                    bP = al.createElement("div"),
                    bO = "__sizzle__";
                bP.innerHTML = "<p class='TEST'></p>";
                if (bP.querySelectorAll && bP.querySelectorAll(".TEST").length === 0) {
                    return
                }
                L = function(b1, bZ, bY, bX) {
                    bZ = bZ || al;
                    if (!bX && !L.isXML(bZ)) {
                        var bW = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b1);
                        if (bW && (bZ.nodeType === 1 || bZ.nodeType === 9)) {
                            if (bW[1]) {
                                return E(bZ.getElementsByTagName(b1), bY)
                            } else {
                                if (bW[2] && I.find.CLASS && bZ.getElementsByClassName) {
                                    return E(bZ.getElementsByClassName(bW[2]), bY)
                                }
                            }
                        }
                        if (bZ.nodeType === 9) {
                            if (b1 === "body" && bZ.body) {
                                return E([bZ.body], bY)
                            } else {
                                if (bW && bW[3]) {
                                    var bV = bZ.getElementById(bW[3]);
                                    if (bV && bV.parentNode) {
                                        if (bV.id === bW[3]) {
                                            return E([bV], bY)
                                        }
                                    } else {
                                        return E([], bY)
                                    }
                                }
                            }
                            try {
                                return E(bZ.querySelectorAll(b1), bY)
                            } catch (bS) {}
                        } else {
                            if (bZ.nodeType === 1 && bZ.nodeName.toLowerCase() !== "object") {
                                var bU = bZ,
                                    bR = bZ.getAttribute("id"),
                                    bQ = bR || bO,
                                    b2 = bZ.parentNode,
                                    b0 = /^\s*[+~]/.test(b1);
                                if (!bR) {
                                    bZ.setAttribute("id", bQ)
                                } else {
                                    bQ = bQ.replace(/'/g, "\\$&")
                                }
                                if (b0 && b2) {
                                    bZ = bZ.parentNode
                                }
                                try {
                                    if (!b0 || b2) {
                                        return E(bZ.querySelectorAll("[id='" + bQ + "'] " + b1), bY)
                                    }
                                } catch (bT) {} finally {
                                    if (!bR) {
                                        bU.removeAttribute("id")
                                    }
                                }
                            }
                        }
                    }
                    return bN(b1, bZ, bY, bX)
                };
                for (var e in bN) {
                    L[e] = bN[e]
                }
                bP = null
            })()
        }(function() {
            var bQ = al.documentElement,
                bO = bQ.matchesSelector || bQ.mozMatchesSelector || bQ.webkitMatchesSelector || bQ.msMatchesSelector;
            if (bO) {
                var bN = !bO.call(al.createElement("div"), "div"),
                    e = false;
                try {
                    bO.call(al.documentElement, "[test!='']:sizzle")
                } catch (bP) {
                    e = true
                }
                L.matchesSelector = function(bS, bR) {
                    bR = bR.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!L.isXML(bS)) {
                        try {
                            if (e || !I.match.PSEUDO.test(bR) && !/!=/.test(bR)) {
                                var bU = bO.call(bS, bR);
                                if (bU || !bN || bS.document && bS.document.nodeType !== 11) {
                                    return bU
                                }
                            }
                        } catch (bT) {}
                    }
                    return L(bR, null, null, [bS]).length > 0
                }
            }
        })();
        (function() {
            var e = al.createElement("div");
            e.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!e.getElementsByClassName || e.getElementsByClassName("e").length === 0) {
                return
            }
            e.lastChild.className = "e";
            if (e.getElementsByClassName("e").length === 1) {
                return
            }
            I.order.splice(1, 0, "CLASS");
            I.find.CLASS = function(bO, bN, bP) {
                if (typeof bN.getElementsByClassName !== "undefined" && !bP) {
                    return bN.getElementsByClassName(bO[1])
                }
            };
            e = null
        })();

        function w(bW, bV, bU, bT, bS, bR) {
            for (var bO = 0, bN = bT.length; bO < bN; bO++) {
                var bQ = bT[bO];
                if (bQ) {
                    var bP = false;
                    bQ = bQ[bW];
                    while (bQ) {
                        if (bQ[A] === bU) {
                            bP = bT[bQ.sizset];
                            break
                        }
                        if (bQ.nodeType === 1 && !bR) {
                            bQ[A] = bU;
                            bQ.sizset = bO
                        }
                        if (bQ.nodeName.toLowerCase() === bV) {
                            bP = bQ;
                            break
                        }
                        bQ = bQ[bW]
                    }
                    bT[bO] = bP
                }
            }
        }

        function bJ(bW, bV, bU, bT, bS, bR) {
            for (var bO = 0, bN = bT.length; bO < bN; bO++) {
                var bQ = bT[bO];
                if (bQ) {
                    var bP = false;
                    bQ = bQ[bW];
                    while (bQ) {
                        if (bQ[A] === bU) {
                            bP = bT[bQ.sizset];
                            break
                        }
                        if (bQ.nodeType === 1) {
                            if (!bR) {
                                bQ[A] = bU;
                                bQ.sizset = bO
                            }
                            if (typeof bV !== "string") {
                                if (bQ === bV) {
                                    bP = true;
                                    break
                                }
                            } else {
                                if (L.filter(bV, [bQ]).length > 0) {
                                    bP = bQ;
                                    break
                                }
                            }
                        }
                        bQ = bQ[bW]
                    }
                    bT[bO] = bP
                }
            }
        }
        if (al.documentElement.contains) {
            L.contains = function(bN, e) {
                return bN !== e && (bN.contains ? bN.contains(e) : true)
            }
        } else {
            if (al.documentElement.compareDocumentPosition) {
                L.contains = function(bN, e) {
                    return !!(bN.compareDocumentPosition(e) & 16)
                }
            } else {
                L.contains = function() {
                    return false
                }
            }
        }
        L.isXML = function(bN) {
            var e = (bN ? bN.ownerDocument || bN : 0).documentElement;
            return e ? e.nodeName !== "HTML" : false
        };
        var C = function(bU, bT, bQ) {
            var bP, bR = [],
                bO = "",
                bS = bT.nodeType ? [bT] : bT;
            while ((bP = I.match.PSEUDO.exec(bU))) {
                bO += bP[0];
                bU = bU.replace(I.match.PSEUDO, "")
            }
            bU = I.relative[bU] ? bU + "*" : bU;
            for (var bN = 0, e = bS.length; bN < e; bN++) {
                L(bU, bS[bN], bR, bQ)
            }
            return L.filter(bO, bR)
        };
        L.attr = aj.attr;
        L.selectors.attrMap = {};
        aj.find = L;
        aj.expr = L.selectors;
        aj.expr[":"] = aj.expr.filters;
        aj.unique = L.uniqueSort;
        aj.text = L.getText;
        aj.isXMLDoc = L.isXML;
        aj.contains = L.contains
    })();
    var aZ = /Until$/,
        aA = /^(?:parents|prevUntil|prevAll)/,
        bo = /,/,
        bC = /^.[^:#\[\.,]*$/,
        ab = Array.prototype.slice,
        U = aj.expr.match.POS,
        aG = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    aj.fn.extend({
        find: function(x) {
            var e = this,
                y, w;
            if (typeof x !== "string") {
                return aj(x).filter(function() {
                    for (y = 0, w = e.length; y < w; y++) {
                        if (aj.contains(e[y], this)) {
                            return true
                        }
                    }
                })
            }
            var C = this.pushStack("", "find", x),
                A, B, z;
            for (y = 0, w = this.length; y < w; y++) {
                A = C.length;
                aj.find(x, this[y], C);
                if (y > 0) {
                    for (B = A; B < C.length; B++) {
                        for (z = 0; z < A; z++) {
                            if (C[z] === C[B]) {
                                C.splice(B--, 1);
                                break
                            }
                        }
                    }
                }
            }
            return C
        },
        has: function(w) {
            var e = aj(w);
            return this.filter(function() {
                for (var y = 0, x = e.length; y < x; y++) {
                    if (aj.contains(this, e[y])) {
                        return true
                    }
                }
            })
        },
        not: function(e) {
            return this.pushStack(aN(this, e, false), "not", e)
        },
        filter: function(e) {
            return this.pushStack(aN(this, e, true), "filter", e)
        },
        is: function(e) {
            return !!e && (typeof e === "string" ? U.test(e) ? aj(e, this.context).index(this[0]) >= 0 : aj.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function(y, w) {
            var D = [],
                z, x, C = this[0];
            if (aj.isArray(y)) {
                var B = 1;
                while (C && C.ownerDocument && C !== w) {
                    for (z = 0; z < y.length; z++) {
                        if (aj(C).is(y[z])) {
                            D.push({
                                selector: y[z],
                                elem: C,
                                level: B
                            })
                        }
                    }
                    C = C.parentNode;
                    B++
                }
                return D
            }
            var A = U.test(y) || typeof y !== "string" ? aj(y, w || this.context) : 0;
            for (z = 0, x = this.length; z < x; z++) {
                C = this[z];
                while (C) {
                    if (A ? A.index(C) > -1 : aj.find.matchesSelector(C, y)) {
                        D.push(C);
                        break
                    } else {
                        C = C.parentNode;
                        if (!C || !C.ownerDocument || C === w || C.nodeType === 11) {
                            break
                        }
                    }
                }
            }
            D = D.length > 1 ? aj.unique(D) : D;
            return this.pushStack(D, "closest", y)
        },
        index: function(e) {
            if (!e) {
                return (this[0] && this[0].parentNode) ? this.prevAll().length : -1
            }
            if (typeof e === "string") {
                return aj.inArray(this[0], aj(e))
            }
            return aj.inArray(e.jquery ? e[0] : e, this)
        },
        add: function(w, e) {
            var y = typeof w === "string" ? aj(w, e) : aj.makeArray(w && w.nodeType ? [w] : w),
                x = aj.merge(this.get(), y);
            return this.pushStack(P(y[0]) || P(x[0]) ? x : aj.unique(x))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    });

    function P(e) {
        return !e || !e.parentNode || e.parentNode.nodeType === 11
    }
    aj.each({
        parent: function(w) {
            var e = w.parentNode;
            return e && e.nodeType !== 11 ? e : null
        },
        parents: function(e) {
            return aj.dir(e, "parentNode")
        },
        parentsUntil: function(w, x, e) {
            return aj.dir(w, "parentNode", e)
        },
        next: function(e) {
            return aj.nth(e, 2, "nextSibling")
        },
        prev: function(e) {
            return aj.nth(e, 2, "previousSibling")
        },
        nextAll: function(e) {
            return aj.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return aj.dir(e, "previousSibling")
        },
        nextUntil: function(w, x, e) {
            return aj.dir(w, "nextSibling", e)
        },
        prevUntil: function(w, x, e) {
            return aj.dir(w, "previousSibling", e)
        },
        siblings: function(e) {
            return aj.sibling(e.parentNode.firstChild, e)
        },
        children: function(e) {
            return aj.sibling(e.firstChild)
        },
        contents: function(e) {
            return aj.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : aj.makeArray(e.childNodes)
        }
    }, function(x, w) {
        aj.fn[x] = function(y, e) {
            var A = aj.map(this, w, y),
                z = ab.call(arguments);
            if (!aZ.test(x)) {
                e = y
            }
            if (e && typeof e === "string") {
                A = aj.filter(e, A)
            }
            A = this.length > 1 && !aG[x] ? aj.unique(A) : A;
            if ((this.length > 1 || bo.test(e)) && aA.test(x)) {
                A = A.reverse()
            }
            return this.pushStack(A, x, z.join(","))
        }
    });
    aj.extend({
        filter: function(w, e, x) {
            if (x) {
                w = ":not(" + w + ")"
            }
            return e.length === 1 ? aj.find.matchesSelector(e[0], w) ? [e[0]] : [] : aj.find.matches(w, e)
        },
        dir: function(w, e, z) {
            var y = [],
                x = w[e];
            while (x && x.nodeType !== 9 && (z === an || x.nodeType !== 1 || !aj(x).is(z))) {
                if (x.nodeType === 1) {
                    y.push(x)
                }
                x = x[e]
            }
            return y
        },
        nth: function(x, w, A, z) {
            w = w || 1;
            var y = 0;
            for (; x; x = x[A]) {
                if (x.nodeType === 1 && ++y === w) {
                    break
                }
            }
            return x
        },
        sibling: function(x, e) {
            var w = [];
            for (; x; x = x.nextSibling) {
                if (x.nodeType === 1 && x !== e) {
                    w.push(x)
                }
            }
            return w
        }
    });

    function aN(z, y, x) {
        y = y || 0;
        if (aj.isFunction(y)) {
            return aj.grep(z, function(A, B) {
                var e = !!y.call(A, B, A);
                return e === x
            })
        } else {
            if (y.nodeType) {
                return aj.grep(z, function(e, A) {
                    return (e === y) === x
                })
            } else {
                if (typeof y === "string") {
                    var w = aj.grep(z, function(e) {
                        return e.nodeType === 1
                    });
                    if (bC.test(y)) {
                        return aj.filter(y, w, !x)
                    } else {
                        y = aj.filter(y, w)
                    }
                }
            }
        }
        return aj.grep(z, function(e, A) {
            return (aj.inArray(e, y) >= 0) === x
        })
    }

    function a(w) {
        var e = aY.split(" "),
            x = w.createDocumentFragment();
        if (x.createElement) {
            while (e.length) {
                x.createElement(e.pop())
            }
        }
        return x
    }
    var aY = "abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
        at = / jQuery\d+="(?:\d+|null)"/g,
        aB = /^\s+/,
        ac = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        c = /<([\w:]+)/,
        t = /<tbody/i,
        af = /<|&#?\w+;/,
        aq = /<(?:script|style)/i,
        aa = /<(?:script|object|embed|option|style)/i,
        au = new RegExp("<(?:" + aY.replace(" ", "|") + ")", "i"),
        l = /checked\s*(?:[^=]|=\s*.checked.)/i,
        bz = /\/(java|ecma)script/i,
        a1 = /^\s*<!(?:\[CDATA\[|\-\-)/,
        aF = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        am = a(al);
    aF.optgroup = aF.option;
    aF.tbody = aF.tfoot = aF.colgroup = aF.caption = aF.thead;
    aF.th = aF.td;
    if (!aj.support.htmlSerialize) {
        aF._default = [1, "div<div>", "</div>"]
    }
    aj.fn.extend({
        text: function(e) {
            if (aj.isFunction(e)) {
                return this.each(function(x) {
                    var w = aj(this);
                    w.text(e.call(this, x, w.text()))
                })
            }
            if (typeof e !== "object" && e !== an) {
                return this.empty().append((this[0] && this[0].ownerDocument || al).createTextNode(e))
            }
            return aj.text(this)
        },
        wrapAll: function(e) {
            if (aj.isFunction(e)) {
                return this.each(function(x) {
                    aj(this).wrapAll(e.call(this, x))
                })
            }
            if (this[0]) {
                var w = aj(e, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    w.insertBefore(this[0])
                }
                w.map(function() {
                    var x = this;
                    while (x.firstChild && x.firstChild.nodeType === 1) {
                        x = x.firstChild
                    }
                    return x
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            if (aj.isFunction(e)) {
                return this.each(function(w) {
                    aj(this).wrapInner(e.call(this, w))
                })
            }
            return this.each(function() {
                var w = aj(this),
                    x = w.contents();
                if (x.length) {
                    x.wrapAll(e)
                } else {
                    w.append(e)
                }
            })
        },
        wrap: function(e) {
            return this.each(function() {
                aj(this).wrapAll(e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!aj.nodeName(this, "body")) {
                    aj(this).replaceWith(this.childNodes)
                }
            }).end()
        },
        append: function() {
            return this.domManip(arguments, true, function(e) {
                if (this.nodeType === 1) {
                    this.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, function(e) {
                if (this.nodeType === 1) {
                    this.insertBefore(e, this.firstChild)
                }
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function(w) {
                    this.parentNode.insertBefore(w, this)
                })
            } else {
                if (arguments.length) {
                    var e = aj(arguments[0]);
                    e.push.apply(e, this.toArray());
                    return this.pushStack(e, "before", arguments)
                }
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function(w) {
                    this.parentNode.insertBefore(w, this.nextSibling)
                })
            } else {
                if (arguments.length) {
                    var e = this.pushStack(this, "after", arguments);
                    e.push.apply(e, aj(arguments[0]).toArray());
                    return e
                }
            }
        },
        remove: function(w, e) {
            for (var x = 0, y;
                 (y = this[x]) != null; x++) {
                if (!w || aj.filter(w, [y]).length) {
                    if (!e && y.nodeType === 1) {
                        aj.cleanData(y.getElementsByTagName("*"));
                        aj.cleanData([y])
                    }
                    if (y.parentNode) {
                        y.parentNode.removeChild(y)
                    }
                }
            }
            return this
        },
        empty: function() {
            for (var e = 0, w;
                 (w = this[e]) != null; e++) {
                if (w.nodeType === 1) {
                    aj.cleanData(w.getElementsByTagName("*"))
                }
                while (w.firstChild) {
                    w.removeChild(w.firstChild)
                }
            }
            return this
        },
        clone: function(w, e) {
            w = w == null ? false : w;
            e = e == null ? w : e;
            return this.map(function() {
                return aj.clone(this, w, e)
            })
        },
        html: function(w) {
            if (w === an) {
                return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(at, "") : null
            } else {
                if (typeof w === "string" && !aq.test(w) && (aj.support.leadingWhitespace || !aB.test(w)) && !aF[(c.exec(w) || ["", ""])[1].toLowerCase()]) {
                    w = w.replace(ac, "<$1></$2>");
                    try {
                        for (var y = 0, x = this.length; y < x; y++) {
                            if (this[y].nodeType === 1) {
                                aj.cleanData(this[y].getElementsByTagName("*"));
                                this[y].innerHTML = w
                            }
                        }
                    } catch (z) {
                        this.empty().append(w)
                    }
                } else {
                    if (aj.isFunction(w)) {
                        this.each(function(A) {
                            var e = aj(this);
                            e.html(w.call(this, A, e.html()))
                        })
                    } else {
                        this.empty().append(w)
                    }
                }
            }
            return this
        },
        detach: function(e) {
            return this.remove(e, true)
        },
        domManip: function(F, E, D) {
            var B, z, C, H, G = F[0],
                x = [];
            if (!aj.support.checkClone && arguments.length === 3 && typeof G === "string" && l.test(G)) {
                return this.each(function() {
                    aj(this).domManip(F, E, D, true)
                })
            }
            if (aj.isFunction(G)) {
                return this.each(function(I) {
                    var e = aj(this);
                    F[0] = G.call(this, I, E ? e.html() : an);
                    e.domManip(F, E, D)
                })
            }
            if (this[0]) {
                H = G && G.parentNode;
                if (aj.support.parentNode && H && H.nodeType === 11 && H.childNodes.length === this.length) {
                    B = {
                        fragment: H
                    }
                } else {
                    B = aj.buildFragment(F, this, x)
                }
                C = B.fragment;
                if (C.childNodes.length === 1) {
                    z = C = C.firstChild
                } else {
                    z = C.firstChild
                }
                if (z) {
                    E = E && aj.nodeName(z, "tr");
                    for (var y = 0, w = this.length, A = w - 1; y < w; y++) {
                        D.call(E ? bp(this[y], z) : this[y], B.cacheable || (w > 1 && y < A) ? aj.clone(C, true, true) : C)
                    }
                }
                if (x.length) {
                    aj.each(x, bB)
                }
            }
            return this
        }
    });

    function bp(w, e) {
        return aj.nodeName(w, "table") ? (w.getElementsByTagName("tbody")[0] || w.appendChild(w.ownerDocument.createElement("tbody"))) : w
    }

    function q(x, e) {
        if (e.nodeType !== 1 || !aj.hasData(x)) {
            return
        }
        var C, z, w, B = aj._data(x),
            A = aj._data(e, B),
            y = B.events;
        if (y) {
            delete A.handle;
            A.events = {};
            for (C in y) {
                for (z = 0, w = y[C].length; z < w; z++) {
                    aj.event.add(e, C + (y[C][z].namespace ? "." : "") + y[C][z].namespace, y[C][z], y[C][z].data)
                }
            }
        }
        if (A.data) {
            A.data = aj.extend({}, A.data)
        }
    }
    aj.buildFragment = function(x, w, C) {
        var B, e, y, z, A = x[0];
        if (w && w[0]) {
            z = w[0].ownerDocument || w[0]
        }
        if (!z.createDocumentFragment) {
            z = al
        }
        if (x.length === 1 && typeof A === "string" && A.length < 512 && z === al && A.charAt(0) === "<" && !aa.test(A) && (aj.support.checkClone || !l.test(A)) && (!aj.support.unknownElems && au.test(A))) {
            e = true;
            y = aj.fragments[A];
            if (y && y !== 1) {
                B = y
            }
        }
        if (!B) {
            B = z.createDocumentFragment();
            aj.clean(x, z, B, C)
        }
        if (e) {
            aj.fragments[A] = y ? B : 1
        }
        return {
            fragment: B,
            cacheable: e
        }
    };
    aj.fragments = {};
    aj.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(x, w) {
        aj.fn[x] = function(z) {
            var e = [],
                C = aj(z),
                B = this.length === 1 && this[0].parentNode;
            if (B && B.nodeType === 11 && B.childNodes.length === 1 && C.length === 1) {
                C[w](this[0]);
                return this
            } else {
                for (var A = 0, y = C.length; A < y; A++) {
                    var D = (A > 0 ? this.clone(true) : this).get();
                    aj(C[A])[w](D);
                    e = e.concat(D)
                }
                return this.pushStack(e, x, C.selector)
            }
        }
    });

    function bt(e) {
        if (typeof e.getElementsByTagName !== "undefined") {
            return e.getElementsByTagName("*")
        } else {
            if (typeof e.querySelectorAll !== "undefined") {
                return e.querySelectorAll("*")
            } else {
                return []
            }
        }
    }

    function aH(e) {
        if (e.type === "checkbox" || e.type === "radio") {
            e.defaultChecked = e.checked
        }
    }

    function R(w) {
        var e = (w.nodeName || "").toLowerCase();
        if (e === "input") {
            aH(w)
        } else {
            if (e !== "script" && typeof w.getElementsByTagName !== "undefined") {
                aj.grep(w.getElementsByTagName("input"), aH)
            }
        }
    }
    aj.extend({
        clean: function(M, L, K, J) {
            var I;
            L = L || al;
            if (typeof L.createElement === "undefined") {
                L = L.ownerDocument || L[0] && L[0].ownerDocument || al
            }
            var H = [],
                C;
            for (var F = 0, z;
                 (z = M[F]) != null; F++) {
                if (typeof z === "number") {
                    z += ""
                }
                if (!z) {
                    continue
                }
                if (typeof z === "string") {
                    if (!af.test(z)) {
                        z = L.createTextNode(z)
                    } else {
                        z = z.replace(ac, "<$1></$2>");
                        var G = (c.exec(z) || ["", ""])[1].toLowerCase(),
                            x = aF[G] || aF._default,
                            E = x[0],
                            w = L.createElement("div");
                        if (L === al) {
                            am.appendChild(w)
                        } else {
                            a(L).appendChild(w)
                        }
                        w.innerHTML = x[1] + z + x[2];
                        while (E--) {
                            w = w.lastChild
                        }
                        if (!aj.support.tbody) {
                            var B = t.test(z),
                                D = G === "table" && !B ? w.firstChild && w.firstChild.childNodes : x[1] === "<table>" && !B ? w.childNodes : [];
                            for (C = D.length - 1; C >= 0; --C) {
                                if (aj.nodeName(D[C], "tbody") && !D[C].childNodes.length) {
                                    D[C].parentNode.removeChild(D[C])
                                }
                            }
                        }
                        if (!aj.support.leadingWhitespace && aB.test(z)) {
                            w.insertBefore(L.createTextNode(aB.exec(z)[0]), w.firstChild)
                        }
                        z = w.childNodes
                    }
                }
                var A;
                if (!aj.support.appendChecked) {
                    if (z[0] && typeof(A = z.length) === "number") {
                        for (C = 0; C < A; C++) {
                            R(z[C])
                        }
                    } else {
                        R(z)
                    }
                }
                if (z.nodeType) {
                    H.push(z)
                } else {
                    H = aj.merge(H, z)
                }
            }
            if (K) {
                I = function(e) {
                    return !e.type || bz.test(e.type)
                };
                for (F = 0; H[F]; F++) {
                    if (J && aj.nodeName(H[F], "script") && (!H[F].type || H[F].type.toLowerCase() === "text/javascript")) {
                        J.push(H[F].parentNode ? H[F].parentNode.removeChild(H[F]) : H[F])
                    } else {
                        if (H[F].nodeType === 1) {
                            var y = aj.grep(H[F].getElementsByTagName("script"), I);
                            H.splice.apply(H, [F + 1, 0].concat(y))
                        }
                        K.appendChild(H[F])
                    }
                }
            }
            return H
        },
        cleanData: function(D) {
            var C, w, e = aj.cache,
                A = aj.event.special,
                z = aj.support.deleteExpando;
            for (var y = 0, x;
                 (x = D[y]) != null; y++) {
                if (x.nodeName && aj.noData[x.nodeName.toLowerCase()]) {
                    continue
                }
                w = x[aj.expando];
                if (w) {
                    C = e[w];
                    if (C && C.events) {
                        for (var B in C.events) {
                            if (A[B]) {
                                aj.event.remove(x, B)
                            } else {
                                aj.removeEvent(x, B, C.handle)
                            }
                        }
                        if (C.handle) {
                            C.handle.elem = null
                        }
                    }
                    if (z) {
                        delete x[aj.expando]
                    } else {
                        if (x.removeAttribute) {
                            x.removeAttribute(aj.expando)
                        }
                    }
                    delete e[w]
                }
            }
        }
    });

    function bB(w, e) {
        if (e.src) {
            aj.ajax({
                url: e.src,
                async: false,
                dataType: "script"
            })
        } else {
            aj.globalEval((e.text || e.textContent || e.innerHTML || "").replace(a1, "/*$0*/"))
        }
        if (e.parentNode) {
            e.parentNode.removeChild(e)
        }
    }
    var aX = /alpha\([^)]*\)/i,
        aD = /opacity=([^)]*)/,
        N = /([A-Z]|^ms)/g,
        bq = /^-?\d+(?:px)?$/i,
        bA = /^-?\d/,
        V = /^([\-+])=([\-+.\de]+)/,
        bm = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        ax = ["Left", "Right"],
        bh = ["Top", "Bottom"],
        ai, aP, bd;
    aj.fn.css = function(x, w) {
        if (arguments.length === 2 && w === an) {
            return this
        }
        return aj.access(this, x, w, true, function(y, e, z) {
            return z !== an ? aj.style(y, e, z) : aj.css(y, e)
        })
    };
    aj.extend({
        cssHooks: {
            opacity: {
                get: function(w, e) {
                    if (e) {
                        var x = ai(w, "opacity", "opacity");
                        return x === "" ? "1" : x
                    } else {
                        return w.style.opacity
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {
            "float": aj.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(E, D, B, A) {
            if (!E || E.nodeType === 3 || E.nodeType === 8 || !E.style) {
                return
            }
            var x, C, y = aj.camelCase(D),
                w = E.style,
                F = aj.cssHooks[y];
            D = aj.cssProps[y] || y;
            if (B !== an) {
                C = typeof B;
                if (C === "string" && (x = V.exec(B))) {
                    B = (+(x[1] + 1) * +x[2]) + parseFloat(aj.css(E, D));
                    C = "number"
                }
                if (B == null || C === "number" && isNaN(B)) {
                    return
                }
                if (C === "number" && !aj.cssNumber[y]) {
                    B += "px"
                }
                if (!F || !("set" in F) || (B = F.set(E, B)) !== an) {
                    try {
                        w[D] = B
                    } catch (z) {}
                }
            } else {
                if (F && "get" in F && (x = F.get(E, false, A)) !== an) {
                    return x
                }
                return w[D]
            }
        },
        css: function(x, w, z) {
            var y, e;
            w = aj.camelCase(w);
            e = aj.cssHooks[w];
            w = aj.cssProps[w] || w;
            if (w === "cssFloat") {
                w = "float"
            }
            if (e && "get" in e && (y = e.get(x, true, z)) !== an) {
                return y
            } else {
                if (ai) {
                    return ai(x, w)
                }
            }
        },
        swap: function(x, w, A) {
            var z = {};
            for (var y in w) {
                z[y] = x.style[y];
                x.style[y] = w[y]
            }
            A.call(x);
            for (y in w) {
                x.style[y] = z[y]
            }
        }
    });
    aj.curCSS = aj.css;
    aj.each(["height", "width"], function(w, x) {
        aj.cssHooks[x] = {
            get: function(y, e, A) {
                var z;
                if (e) {
                    if (y.offsetWidth !== 0) {
                        return m(y, x, A)
                    } else {
                        aj.swap(y, bm, function() {
                            z = m(y, x, A)
                        })
                    }
                    return z
                }
            },
            set: function(y, e) {
                if (bq.test(e)) {
                    e = parseFloat(e);
                    if (e >= 0) {
                        return e + "px"
                    }
                } else {
                    return e
                }
            }
        }
    });
    if (!aj.support.opacity) {
        aj.cssHooks.opacity = {
            get: function(w, e) {
                return aD.test((e && w.currentStyle ? w.currentStyle.filter : w.style.filter) || "") ? (parseFloat(RegExp.$1) / 100) + "" : e ? "1" : ""
            },
            set: function(w, e) {
                var A = w.style,
                    y = w.currentStyle,
                    x = aj.isNumeric(e) ? "alpha(opacity=" + e * 100 + ")" : "",
                    z = y && y.filter || A.filter || "";
                A.zoom = 1;
                if (e >= 1 && aj.trim(z.replace(aX, "")) === "") {
                    A.removeAttribute("filter");
                    if (y && !y.filter) {
                        return
                    }
                }
                A.filter = aX.test(z) ? z.replace(aX, x) : z + " " + x
            }
        }
    }
    aj(function() {
        if (!aj.support.reliableMarginRight) {
            aj.cssHooks.marginRight = {
                get: function(w, e) {
                    var x;
                    aj.swap(w, {
                        display: "inline-block"
                    }, function() {
                        if (e) {
                            x = ai(w, "margin-right", "marginRight")
                        } else {
                            x = w.style.marginRight
                        }
                    });
                    return x
                }
            }
        }
    });
    if (al.defaultView && al.defaultView.getComputedStyle) {
        aP = function(w, e) {
            var z, y, x;
            e = e.replace(N, "-$1").toLowerCase();
            if (!(y = w.ownerDocument.defaultView)) {
                return an
            }
            if ((x = y.getComputedStyle(w, null))) {
                z = x.getPropertyValue(e);
                if (z === "" && !aj.contains(w.ownerDocument.documentElement, w)) {
                    z = aj.style(w, e)
                }
            }
            return z
        }
    }
    if (al.documentElement.currentStyle) {
        bd = function(x, w) {
            var B, e, A, y = x.currentStyle && x.currentStyle[w],
                z = x.style;
            if (y === null && z && (A = z[w])) {
                y = A
            }
            if (!bq.test(y) && bA.test(y)) {
                B = z.left;
                e = x.runtimeStyle && x.runtimeStyle.left;
                if (e) {
                    x.runtimeStyle.left = x.currentStyle.left
                }
                z.left = w === "fontSize" ? "1em" : (y || 0);
                y = z.pixelLeft + "px";
                z.left = B;
                if (e) {
                    x.runtimeStyle.left = e
                }
            }
            return y === "" ? "auto" : y
        }
    }
    ai = aP || bd;

    function m(w, e, z) {
        var y = e === "width" ? w.offsetWidth : w.offsetHeight,
            x = e === "width" ? ax : bh;
        if (y > 0) {
            if (z !== "border") {
                aj.each(x, function() {
                    if (!z) {
                        y -= parseFloat(aj.css(w, "padding" + this)) || 0
                    }
                    if (z === "margin") {
                        y += parseFloat(aj.css(w, z + this)) || 0
                    } else {
                        y -= parseFloat(aj.css(w, "border" + this + "Width")) || 0
                    }
                })
            }
            return y + "px"
        }
        y = ai(w, e, e);
        if (y < 0 || y == null) {
            y = w.style[e] || 0
        }
        y = parseFloat(y) || 0;
        if (z) {
            aj.each(x, function() {
                y += parseFloat(aj.css(w, "padding" + this)) || 0;
                if (z !== "padding") {
                    y += parseFloat(aj.css(w, "border" + this + "Width")) || 0
                }
                if (z === "margin") {
                    y += parseFloat(aj.css(w, z + this)) || 0
                }
            })
        }
        return y + "px"
    }
    if (aj.expr && aj.expr.filters) {
        aj.expr.filters.hidden = function(x) {
            var w = x.offsetWidth,
                e = x.offsetHeight;
            return (w === 0 && e === 0) || (!aj.support.reliableHiddenOffsets && ((x.style && x.style.display) || aj.css(x, "display")) === "none")
        };
        aj.expr.filters.visible = function(e) {
            return !aj.expr.filters.hidden(e)
        }
    }
    var aW = /%20/g,
        az = /\[\]$/,
        bF = /\r?\n/g,
        bD = /#.*$/,
        aK = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        bf = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        a0 = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        a6 = /^(?:GET|HEAD)$/,
        b = /^\/\//,
        Y = /\?/,
        bl = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        n = /^(?:select|textarea)/i,
        g = /\s+/,
        bE = /([?&])_=[^&]*/,
        X = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        O = aj.fn.load,
        ak = {},
        o = {},
        aL, p, bb = ["*/"] + ["*"];
    try {
        aL = by.href
    } catch (aE) {
        aL = al.createElement("a");
        aL.href = "";
        aL = aL.href
    }
    p = X.exec(aL.toLowerCase()) || [];

    function d(e) {
        return function(x, w) {
            if (typeof x !== "string") {
                w = x;
                x = "*"
            }
            if (aj.isFunction(w)) {
                var D = x.toLowerCase().split(g),
                    z = 0,
                    A = D.length,
                    y, B, C;
                for (; z < A; z++) {
                    y = D[z];
                    C = /^\+/.test(y);
                    if (C) {
                        y = y.substr(1) || "*"
                    }
                    B = e[y] = e[y] || [];
                    B[C ? "unshift" : "push"](w)
                }
            }
        }
    }

    function bc(F, E, D, C, B, A) {
        B = B || E.dataTypes[0];
        A = A || {};
        A[B] = true;
        var z = F[B],
            x = 0,
            w = z ? z.length : 0,
            y = (F === ak),
            G;
        for (; x < w && (y || !G); x++) {
            G = z[x](E, D, C);
            if (typeof G === "string") {
                if (!y || A[G]) {
                    G = an
                } else {
                    E.dataTypes.unshift(G);
                    G = bc(F, E, D, C, G, A)
                }
            }
        }
        if ((y || !G) && !A["*"]) {
            G = bc(F, E, D, C, "*", A)
        }
        return G
    }

    function aw(x, e) {
        var z, w, y = aj.ajaxSettings.flatOptions || {};
        for (z in e) {
            if (e[z] !== an) {
                (y[z] ? x : (w || (w = {})))[z] = e[z]
            }
        }
        if (w) {
            aj.extend(true, x, w)
        }
    }
    aj.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, w) {
        aj.fn[w] = function(x) {
            return this.bind(w, x)
        }
    });
    aj.each(["get", "post"], function(w, x) {
        aj[x] = function(y, e, A, z) {
            if (aj.isFunction(e)) {
                z = z || A;
                A = e;
                e = an
            }
            return aj.ajax({
                type: x,
                url: y,
                data: e,
                success: A,
                dataType: z
            })
        }
    });
    aj.extend({
        getScript: function(w, e) {
            return aj.get(w, an, e, "script")
        },
        getJSON: function(w, e, x) {
            return aj.get(w, e, x, "json")
        },
        ajaxSetup: function(w, e) {
            if (e) {
                aw(w, aj.ajaxSettings)
            } else {
                e = w;
                w = aj.ajaxSettings
            }
            aw(w, e);
            return w
        },
        ajaxSettings: {
            url: aL,
            isLocal: a0.test(p[1]),
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bb
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": ao.String,
                "text html": true,
                "text json": aj.parseJSON,
                "text xml": aj.parseXML
            },
            flatOptions: {
                context: true,
                url: true
            }
        },
        ajaxPrefilter: d(ak),
        ajaxTransport: d(o),
        ajax: function(L, K) {
            if (typeof L === "object") {
                K = L;
                L = an
            }
            K = K || {};
            var B = aj.ajaxSetup({}, K),
                bO = B.context || B,
                E = bO !== B && (bO.nodeType || bO instanceof aj) ? aj(bO) : aj.event,
                bN = aj.Deferred(),
                bJ = aj.Callbacks("once memory"),
                z = B.statusCode || {},
                A, F = {},
                bK = {},
                bM, x, M, C, G, y = 0,
                w, J, H = {
                    readyState: 0,
                    setRequestHeader: function(bP, e) {
                        if (!y) {
                            var bQ = bP.toLowerCase();
                            bP = bK[bQ] = bK[bQ] || bP;
                            F[bP] = e
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return y === 2 ? bM : null
                    },
                    getResponseHeader: function(bP) {
                        var e;
                        if (y === 2) {
                            if (!x) {
                                x = {};
                                while ((e = aK.exec(bM))) {
                                    x[e[1].toLowerCase()] = e[2]
                                }
                            }
                            e = x[bP.toLowerCase()]
                        }
                        return e === an ? null : e
                    },
                    overrideMimeType: function(e) {
                        if (!y) {
                            B.mimeType = e
                        }
                        return this
                    },
                    abort: function(e) {
                        e = e || "abort";
                        if (M) {
                            M.abort(e)
                        }
                        D(0, e);
                        return this
                    }
                };

            function D(bZ, bY, bW, bV) {
                if (y === 2) {
                    return
                }
                y = 2;
                if (C) {
                    clearTimeout(C)
                }
                M = an;
                bM = bV || "";
                H.readyState = bZ > 0 ? 4 : 0;
                var bS, b0, bX, bQ = bY,
                    bR = bW ? bw(B, H, bW) : an,
                    bP, bU;
                if (bZ >= 200 && bZ < 300 || bZ === 304) {
                    if (B.ifModified) {
                        if ((bP = H.getResponseHeader("Last-Modified"))) {
                            aj.lastModified[A] = bP
                        }
                        if ((bU = H.getResponseHeader("Etag"))) {
                            aj.etag[A] = bU
                        }
                    }
                    if (bZ === 304) {
                        bQ = "notmodified";
                        bS = true
                    } else {
                        try {
                            b0 = T(B, bR);
                            bQ = "success";
                            bS = true
                        } catch (bT) {
                            bQ = "parsererror";
                            bX = bT
                        }
                    }
                } else {
                    bX = bQ;
                    if (!bQ || bZ) {
                        bQ = "error";
                        if (bZ < 0) {
                            bZ = 0
                        }
                    }
                }
                H.status = bZ;
                H.statusText = "" + (bY || bQ);
                if (bS) {
                    bN.resolveWith(bO, [b0, bQ, H])
                } else {
                    bN.rejectWith(bO, [H, bQ, bX])
                }
                H.statusCode(z);
                z = an;
                if (w) {
                    E.trigger("ajax" + (bS ? "Success" : "Error"), [H, B, bS ? b0 : bX])
                }
                bJ.fireWith(bO, [H, bQ]);
                if (w) {
                    E.trigger("ajaxComplete", [H, B]);
                    if (!(--aj.active)) {
                        aj.event.trigger("ajaxStop")
                    }
                }
            }
            bN.promise(H);
            H.success = H.done;
            H.error = H.fail;
            H.complete = bJ.add;
            H.statusCode = function(bP) {
                if (bP) {
                    var e;
                    if (y < 2) {
                        for (e in bP) {
                            z[e] = [z[e], bP[e]]
                        }
                    } else {
                        e = bP[H.status];
                        H.then(e, e)
                    }
                }
                return this
            };
            B.url = ((L || B.url) + "").replace(bD, "").replace(b, p[1] + "//");
            B.dataTypes = aj.trim(B.dataType || "*").toLowerCase().split(g);
            if (B.crossDomain == null) {
                G = X.exec(B.url.toLowerCase());
                B.crossDomain = !!(G && (G[1] != p[1] || G[2] != p[2] || (G[3] || (G[1] === "http:" ? 80 : 443)) != (p[3] || (p[1] === "http:" ? 80 : 443))))
            }
            if (B.data && B.processData && typeof B.data !== "string") {
                B.data = aj.param(B.data, B.traditional)
            }
            bc(ak, B, K, H);
            if (y === 2) {
                return false
            }
            w = B.global;
            B.type = B.type.toUpperCase();
            B.hasContent = !a6.test(B.type);
            if (w && aj.active++ === 0) {
                aj.event.trigger("ajaxStart")
            }
            if (!B.hasContent) {
                if (B.data) {
                    B.url += (Y.test(B.url) ? "&" : "?") + B.data;
                    delete B.data
                }
                A = B.url;
                if (B.cache === false) {
                    var I = aj.now(),
                        bL = B.url.replace(bE, "$1_=" + I);
                    B.url = bL + ((bL === B.url) ? (Y.test(B.url) ? "&" : "?") + "_=" + I : "")
                }
            }
            if (B.data && B.hasContent && B.contentType !== false || K.contentType) {
                H.setRequestHeader("Content-Type", B.contentType)
            }
            if (B.ifModified) {
                A = A || B.url;
                if (aj.lastModified[A]) {
                    H.setRequestHeader("If-Modified-Since", aj.lastModified[A])
                }
                if (aj.etag[A]) {
                    H.setRequestHeader("If-None-Match", aj.etag[A])
                }
            }
            H.setRequestHeader("Accept", B.dataTypes[0] && B.accepts[B.dataTypes[0]] ? B.accepts[B.dataTypes[0]] + (B.dataTypes[0] !== "*" ? ", " + bb + "; q=0.01" : "") : B.accepts["*"]);
            for (J in B.headers) {
                H.setRequestHeader(J, B.headers[J])
            }
            if (B.beforeSend && (B.beforeSend.call(bO, H, B) === false || y === 2)) {
                H.abort();
                return false
            }
            for (J in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                H[J](B[J])
            }
            M = bc(o, B, K, H);
            if (!M) {
                D(-1, "No Transport")
            } else {
                H.readyState = 1;
                if (w) {
                    E.trigger("ajaxSend", [H, B])
                }
                if (B.async && B.timeout > 0) {
                    C = setTimeout(function() {
                        H.abort("timeout")
                    }, B.timeout)
                }
                try {
                    y = 1;
                    M.send(F, D)
                } catch (bI) {
                    if (y < 2) {
                        D(-1, bI)
                    } else {
                        aj.error(bI)
                    }
                }
            }
            return H
        },
        param: function(e, z) {
            var w = [],
                x = function(B, A) {
                    A = aj.isFunction(A) ? A() : A;
                    w[w.length] = encodeURIComponent(B) + "=" + encodeURIComponent(A)
                };
            if (z === an) {
                z = aj.ajaxSettings.traditional
            }
            if (aj.isArray(e) || (e.jquery && !aj.isPlainObject(e))) {
                aj.each(e, function() {
                    x(this.name, this.value)
                })
            } else {
                for (var y in e) {
                    s(y, e[y], z, x)
                }
            }
            return w.join("&").replace(aW, "+")
        }
    });

    function s(x, w, A, z) {
        if (aj.isArray(w)) {
            aj.each(w, function(B, e) {
                if (A || az.test(x)) {
                    z(x, e)
                } else {
                    s(x + "[" + (typeof e === "object" || aj.isArray(e) ? B : "") + "]", e, A, z)
                }
            })
        } else {
            if (!A && w != null && typeof w === "object") {
                for (var y in w) {
                    s(x + "[" + y + "]", w[y], A, z)
                }
            } else {
                z(x, w)
            }
        }
    }
    aj.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });

    function bw(E, D, B) {
        var z = E.contents,
            C = E.dataTypes,
            w = E.responseFields,
            y, A, x, e;
        for (A in w) {
            if (A in B) {
                D[w[A]] = B[A]
            }
        }
        while (C[0] === "*") {
            C.shift();
            if (y === an) {
                y = E.mimeType || D.getResponseHeader("content-type")
            }
        }
        if (y) {
            for (A in z) {
                if (z[A] && z[A].test(y)) {
                    C.unshift(A);
                    break
                }
            }
        }
        if (C[0] in B) {
            x = C[0]
        } else {
            for (A in B) {
                if (!C[0] || E.converters[A + " " + C[0]]) {
                    x = A;
                    break
                }
                if (!e) {
                    e = A
                }
            }
            x = x || e
        }
        if (x) {
            if (x !== C[0]) {
                C.unshift(x)
            }
            return B[x]
        }
    }

    function T(I, E) {
        if (I.dataFilter) {
            E = I.dataFilter(E, I.dataType)
        }
        var D = I.dataTypes,
            H = {},
            A, F, x = D.length,
            B, C = D[0],
            y, z, G, w, e;
        for (A = 1; A < x; A++) {
            if (A === 1) {
                for (F in I.converters) {
                    if (typeof F === "string") {
                        H[F.toLowerCase()] = I.converters[F]
                    }
                }
            }
            y = C;
            C = D[A];
            if (C === "*") {
                C = y
            } else {
                if (y !== "*" && y !== C) {
                    z = y + " " + C;
                    G = H[z] || H["* " + C];
                    if (!G) {
                        e = an;
                        for (w in H) {
                            B = w.split(" ");
                            if (B[0] === y || B[0] === "*") {
                                e = H[B[1] + " " + C];
                                if (e) {
                                    w = H[w];
                                    if (w === true) {
                                        G = e
                                    } else {
                                        if (e === true) {
                                            G = w
                                        }
                                    }
                                    break
                                }
                            }
                        }
                    }
                    if (!(G || e)) {
                        aj.error("No conversion from " + z.replace(" ", " to "))
                    }
                    if (G !== true) {
                        E = G ? G(E) : e(w(E))
                    }
                }
            }
        }
        return E
    }
    var aV = aj.now(),
        r = /(\=)\?(&|$)|\?\?/i;
    aj.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return aj.expando + "_" + (aV++)
        }
    });
    aj.ajaxPrefilter("json jsonp", function(F, E, D) {
        var C = F.contentType === "application/x-www-form-urlencoded" && (typeof F.data === "string");
        if (F.dataTypes[0] === "jsonp" || F.jsonp !== false && (r.test(F.url) || C && r.test(F.data))) {
            var B, y = F.jsonpCallback = aj.isFunction(F.jsonpCallback) ? F.jsonpCallback() : F.jsonpCallback,
                A = ao[y],
                w = F.url,
                z = F.data,
                x = "$1" + y + "$2";
            if (F.jsonp !== false) {
                w = w.replace(r, x);
                if (F.url === w) {
                    if (C) {
                        z = z.replace(r, x)
                    }
                    if (F.data === z) {
                        w += (/\?/.test(w) ? "&" : "?") + F.jsonp + "=" + y
                    }
                }
            }
            F.url = w;
            F.data = z;
            ao[y] = function(e) {
                B = [e]
            };
            D.always(function() {
                ao[y] = A;
                if (B && aj.isFunction(A)) {
                    ao[y](B[0])
                }
            });
            F.converters["script json"] = function() {
                if (!B) {
                    aj.error(y + " was not called")
                }
                return B[0]
            };
            F.dataTypes[0] = "json";
            return "script"
        }
    });
    aj.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(e) {
                aj.globalEval(e);
                return e
            }
        }
    });
    aj.ajaxPrefilter("script", function(e) {
        if (e.cache === an) {
            e.cache = false
        }
        if (e.crossDomain) {
            e.type = "GET";
            e.global = false
        }
    });
    aj.ajaxTransport("script", function(w) {
        if (w.crossDomain) {
            var x, e = al.head || al.getElementsByTagName("head")[0] || al.documentElement;
            return {
                send: function(z, y) {
                    x = al.createElement("script");
                    x.async = "async";
                    if (w.scriptCharset) {
                        x.charset = w.scriptCharset
                    }
                    x.src = w.url;
                    x.onload = x.onreadystatechange = function(B, A) {
                        if (A || !x.readyState || /loaded|complete/.test(x.readyState)) {
                            x.onload = x.onreadystatechange = null;
                            if (e && x.parentNode) {
                                e.removeChild(x)
                            }
                            x = an;
                            if (!A) {
                                y(200, "success")
                            }
                        }
                    };
                    e.insertBefore(x, e.firstChild)
                },
                abort: function() {
                    if (x) {
                        x.onload(0, 1)
                    }
                }
            }
        }
    });
    var aU = ao.ActiveXObject ? function() {
            for (var e in Z) {
                Z[e](0, 1)
            }
        } : false,
        v = 0,
        Z;

    function aT() {
        try {
            return new ao.XMLHttpRequest()
        } catch (w) {}
    }

    function av() {
        try {
            return new ao.ActiveXObject("Microsoft.XMLHTTP")
        } catch (w) {}
    }
    aj.ajaxSettings.xhr = ao.ActiveXObject ? function() {
        return !this.isLocal && aT() || av()
    } : aT;
    (function(e) {
        aj.extend(aj.support, {
            ajax: !!e,
            cors: !!e && ("withCredentials" in e)
        })
    })(aj.ajaxSettings.xhr());
    if (aj.support.ajax) {
        aj.ajaxTransport(function(e) {
            if (!e.crossDomain || aj.support.cors) {
                var w;
                return {
                    send: function(C, B) {
                        var A = e.xhr(),
                            z, y;
                        if (e.username) {
                            A.open(e.type, e.url, e.async, e.username, e.password)
                        } else {
                            A.open(e.type, e.url, e.async)
                        }
                        if (e.xhrFields) {
                            for (y in e.xhrFields) {
                                A[y] = e.xhrFields[y]
                            }
                        }
                        if (e.mimeType && A.overrideMimeType) {
                            A.overrideMimeType(e.mimeType)
                        }
                        if (!e.crossDomain && !C["X-Requested-With"]) {
                            C["X-Requested-With"] = "XMLHttpRequest"
                        }
                        try {
                            for (y in C) {
                                A.setRequestHeader(y, C[y])
                            }
                        } catch (x) {}
                        A.send((e.hasContent && e.data) || null);
                        w = function(L, K) {
                            var J, E, D, H, G;
                            try {
                                if (w && (K || A.readyState === 4)) {
                                    w = an;
                                    if (z) {
                                        A.onreadystatechange = aj.noop;
                                        if (aU) {
                                            delete Z[z]
                                        }
                                    }
                                    if (K) {
                                        if (A.readyState !== 4) {
                                            A.abort()
                                        }
                                    } else {
                                        J = A.status;
                                        D = A.getAllResponseHeaders();
                                        H = {};
                                        G = A.responseXML;
                                        if (G && G.documentElement) {
                                            H.xml = G
                                        }
                                        H.text = A.responseText;
                                        try {
                                            E = A.statusText
                                        } catch (I) {
                                            E = ""
                                        }
                                        if (!J && e.isLocal && !e.crossDomain) {
                                            J = H.text ? 200 : 404
                                        } else {
                                            if (J === 1223) {
                                                J = 204
                                            }
                                        }
                                    }
                                }
                            } catch (F) {
                                if (!K) {
                                    B(-1, F)
                                }
                            }
                            if (H) {
                                B(J, E, H, D)
                            }
                        };
                        if (!e.async || A.readyState === 4) {
                            w()
                        } else {
                            z = ++v;
                            if (aU) {
                                if (!Z) {
                                    Z = {};
                                    aj(ao).unload(aU)
                                }
                                Z[z] = w
                            }
                            A.onreadystatechange = w
                        }
                    },
                    abort: function() {
                        if (w) {
                            w(0, 1)
                        }
                    }
                }
            }
        })
    }
    var aS = {},
        bn, k, aJ = /^(?:toggle|show|hide)$/,
        a9 = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        bi, aO = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ],
        bj;
    aj.fn.extend({
        show: function(w, e, B) {
            var A, z;
            if (w || w === 0) {
                return this.animate(bg("show", 3), w, e, B)
            } else {
                for (var y = 0, x = this.length; y < x; y++) {
                    A = this[y];
                    if (A.style) {
                        z = A.style.display;
                        if (!aj._data(A, "olddisplay") && z === "none") {
                            z = A.style.display = ""
                        }
                        if (z === "" && aj.css(A, "display") === "none") {
                            aj._data(A, "olddisplay", u(A.nodeName))
                        }
                    }
                }
                for (y = 0; y < x; y++) {
                    A = this[y];
                    if (A.style) {
                        z = A.style.display;
                        if (z === "" || z === "none") {
                            A.style.display = aj._data(A, "olddisplay") || ""
                        }
                    }
                }
                return this
            }
        },
        hide: function(w, e, B) {
            if (w || w === 0) {
                return this.animate(bg("hide", 3), w, e, B)
            } else {
                var A, z, y = 0,
                    x = this.length;
                for (; y < x; y++) {
                    A = this[y];
                    if (A.style) {
                        z = aj.css(A, "display");
                        if (z !== "none" && !aj._data(A, "olddisplay")) {
                            aj._data(A, "olddisplay", z)
                        }
                    }
                }
                for (y = 0; y < x; y++) {
                    if (this[y].style) {
                        this[y].style.display = "none"
                    }
                }
                return this
            }
        },
        _toggle: aj.fn.toggle,
        fadeTo: function(w, e, y, x) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: e
            }, w, y, x)
        },
        animate: function(e, A, z, y) {
            var x = aj.speed(A, z, y);
            if (aj.isEmptyObject(e)) {
                return this.each(x.complete, [false])
            }
            e = aj.extend({}, e);

            function w() {
                if (x.queue === false) {
                    aj._mark(this)
                }
                var L = aj.extend({}, x),
                    K = this.nodeType === 1,
                    I = K && aj(this).is(":hidden"),
                    C, F, E, J, H, D, G, M, B;
                L.animatedProperties = {};
                for (E in e) {
                    C = aj.camelCase(E);
                    if (E !== C) {
                        e[C] = e[E];
                        delete e[E]
                    }
                    F = e[C];
                    if (aj.isArray(F)) {
                        L.animatedProperties[C] = F[1];
                        F = e[C] = F[0]
                    } else {
                        L.animatedProperties[C] = L.specialEasing && L.specialEasing[C] || L.easing || "swing"
                    }
                    if (F === "hide" && I || F === "show" && !I) {
                        return L.complete.call(this)
                    }
                    if (K && (C === "height" || C === "width")) {
                        L.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                        if (aj.css(this, "display") === "inline" && aj.css(this, "float") === "none") {
                            if (!aj.support.inlineBlockNeedsLayout || u(this.nodeName) === "inline") {
                                this.style.display = "inline-block"
                            } else {
                                this.style.zoom = 1
                            }
                        }
                    }
                }
                if (L.overflow != null) {
                    this.style.overflow = "hidden"
                }
                for (E in e) {
                    J = new aj.fx(this, L, E);
                    F = e[E];
                    if (aJ.test(F)) {
                        B = aj._data(this, "toggle" + E) || (F === "toggle" ? I ? "show" : "hide" : 0);
                        if (B) {
                            aj._data(this, "toggle" + E, B === "show" ? "hide" : "show");
                            J[B]()
                        } else {
                            J[F]()
                        }
                    } else {
                        H = a9.exec(F);
                        D = J.cur();
                        if (H) {
                            G = parseFloat(H[2]);
                            M = H[3] || (aj.cssNumber[E] ? "" : "px");
                            if (M !== "px") {
                                aj.style(this, E, (G || 1) + M);
                                D = ((G || 1) / J.cur()) * D;
                                aj.style(this, E, D + M)
                            }
                            if (H[1]) {
                                G = ((H[1] === "-=" ? -1 : 1) * G) + D
                            }
                            J.custom(D, G, M)
                        } else {
                            J.custom(D, F, "")
                        }
                    }
                }
                return true
            }
            return x.queue === false ? this.each(w) : this.queue(x.queue, w)
        },
        stop: function(y, x, w) {
            if (typeof y !== "string") {
                w = x;
                x = y;
                y = an
            }
            if (x && y !== false) {
                this.queue(y || "fx", [])
            }
            return this.each(function() {
                var z, e = false,
                    B = aj.timers,
                    A = aj._data(this);
                if (!w) {
                    aj._unmark(true, this)
                }

                function C(E, D, F) {
                    var G = D[F];
                    aj.removeData(E, F, true);
                    G.stop(w)
                }
                if (y == null) {
                    for (z in A) {
                        if (A[z].stop && z.indexOf(".run") === z.length - 4) {
                            C(this, A, z)
                        }
                    }
                } else {
                    if (A[z = y + ".run"] && A[z].stop) {
                        C(this, A, z)
                    }
                }
                for (z = B.length; z--;) {
                    if (B[z].elem === this && (y == null || B[z].queue === y)) {
                        if (w) {
                            B[z](true)
                        } else {
                            B[z].saveState()
                        }
                        e = true;
                        B.splice(z, 1)
                    }
                }
                if (!(w && e)) {
                    aj.dequeue(this, y)
                }
            })
        }
    });

    function bu() {
        setTimeout(aC, 0);
        return (bj = aj.now())
    }

    function aC() {
        bj = an
    }

    function bg(w, e) {
        var x = {};
        aj.each(aO.concat.apply([], aO.slice(0, e)), function() {
            x[this] = w
        });
        return x
    }
    aj.each({
        slideDown: bg("show", 1),
        slideUp: bg("hide", 1),
        slideToggle: bg("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(x, w) {
        aj.fn[x] = function(y, e, z) {
            return this.animate(w, y, e, z)
        }
    });
    aj.extend({
        speed: function(w, z, y) {
            var x = w && typeof w === "object" ? aj.extend({}, w) : {
                complete: y || !y && z || aj.isFunction(w) && w,
                duration: w,
                easing: y && z || z && !aj.isFunction(z) && z
            };
            x.duration = aj.fx.off ? 0 : typeof x.duration === "number" ? x.duration : x.duration in aj.fx.speeds ? aj.fx.speeds[x.duration] : aj.fx.speeds._default;
            if (x.queue == null || x.queue === true) {
                x.queue = "fx"
            }
            x.old = x.complete;
            x.complete = function(e) {
                if (aj.isFunction(x.old)) {
                    x.old.call(this)
                }
                if (x.queue) {
                    aj.dequeue(this, x.queue)
                } else {
                    if (e !== false) {
                        aj._unmark(this)
                    }
                }
            };
            return x
        },
        easing: {
            linear: function(x, y, w, e) {
                return w + e * x
            },
            swing: function(x, y, w, e) {
                return ((-Math.cos(x * Math.PI) / 2) + 0.5) * e + w
            }
        },
        timers: [],
        fx: function(w, e, x) {
            this.options = e;
            this.elem = w;
            this.prop = x;
            e.orig = e.orig || {}
        }
    });
    aj.fx.prototype = {
        update: function() {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }(aj.fx.step[this.prop] || aj.fx.step._default)(this)
        },
        cur: function() {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop]
            }
            var e, w = aj.css(this.elem, this.prop);
            return isNaN(e = parseFloat(w)) ? !w || w === "auto" ? 0 : w : e
        },
        custom: function(w, B, A) {
            var z = this,
                y = aj.fx;
            this.startTime = bj || bu();
            this.end = B;
            this.now = this.start = w;
            this.pos = this.state = 0;
            this.unit = A || this.unit || (aj.cssNumber[this.prop] ? "" : "px");

            function x(e) {
                return z.step(e)
            }
            x.queue = this.options.queue;
            x.elem = this.elem;
            x.saveState = function() {
                if (z.options.hide && aj._data(z.elem, "fxshow" + z.prop) === an) {
                    aj._data(z.elem, "fxshow" + z.prop, z.start)
                }
            };
            if (x() && aj.timers.push(x) && !bi) {
                bi = setInterval(y.tick, y.interval)
            }
        },
        show: function() {
            var e = aj._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = e || aj.style(this.elem, this.prop);
            this.options.show = true;
            if (e !== an) {
                this.custom(this.cur(), e)
            } else {
                this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur())
            }
            aj(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = aj._data(this.elem, "fxshow" + this.prop) || aj.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function(C) {
            var A, B, w, y = bj || bu(),
                e = true,
                z = this.elem,
                x = this.options;
            if (C || y >= x.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                x.animatedProperties[this.prop] = true;
                for (A in x.animatedProperties) {
                    if (x.animatedProperties[A] !== true) {
                        e = false
                    }
                }
                if (e) {
                    if (x.overflow != null && !aj.support.shrinkWrapBlocks) {
                        aj.each(["", "X", "Y"], function(E, D) {
                            z.style["overflow" + D] = x.overflow[E]
                        })
                    }
                    if (x.hide) {
                        aj(z).hide()
                    }
                    if (x.hide || x.show) {
                        for (A in x.animatedProperties) {
                            aj.style(z, A, x.orig[A]);
                            aj.removeData(z, "fxshow" + A, true);
                            aj.removeData(z, "toggle" + A, true)
                        }
                    }
                    w = x.complete;
                    if (w) {
                        x.complete = false;
                        w.call(z)
                    }
                }
                return false
            } else {
                if (x.duration == Infinity) {
                    this.now = y
                } else {
                    B = y - this.startTime;
                    this.state = B / x.duration;
                    this.pos = juicebox_lib.jQuery.easing[x.animatedProperties[this.prop]](this.state, B, 0, 1, x.duration);
                    this.now = this.start + ((this.end - this.start) * this.pos)
                }
                this.update()
            }
            return true
        }
    };
    aj.extend(aj.fx, {
        tick: function() {
            var e, x = aj.timers,
                w = 0;
            for (; w < x.length; w++) {
                e = x[w];
                if (!e() && x[w] === e) {
                    x.splice(w--, 1)
                }
            }
            if (!x.length) {
                aj.fx.stop()
            }
        },
        interval: 13,
        stop: function() {
            clearInterval(bi);
            bi = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(e) {
                aj.style(e.elem, "opacity", e.now)
            },
            _default: function(e) {
                if (e.elem.style && e.elem.style[e.prop] != null) {
                    e.elem.style[e.prop] = e.now + e.unit
                } else {
                    e.elem[e.prop] = e.now
                }
            }
        }
    });
    aj.each(["width", "height"], function(w, e) {
        aj.fx.step[e] = function(x) {
            aj.style(x.elem, e, Math.max(0, x.now))
        }
    });
    if (aj.expr && aj.expr.filters) {
        aj.expr.filters.animated = function(e) {
            return aj.grep(aj.timers, function(w) {
                return e === w.elem
            }).length
        }
    }

    function u(w) {
        if (!aS[w]) {
            var e = al.body,
                x = aj("<" + w + ">").appendTo(e),
                y = x.css("display");
            x.remove();
            if (y === "none" || y === "") {
                if (!bn) {
                    bn = al.createElement("iframe");
                    bn.frameBorder = bn.width = bn.height = 0
                }
                e.appendChild(bn);
                if (!k || !bn.createElement) {
                    k = (bn.contentWindow || bn.contentDocument).document;
                    k.write((al.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>");
                    k.close()
                }
                x = k.createElement(w);
                k.body.appendChild(x);
                y = aj.css(x, "display");
                e.removeChild(bn)
            }
            aS[w] = y
        }
        return aS[w]
    }
    var aR = /^t(?:able|d|h)$/i,
        ap = /^(?:body|html)$/i;
    if ("getBoundingClientRect" in al.documentElement) {
        aj.fn.offset = function(J) {
            var I = this[0],
                B;
            if (J) {
                return this.each(function(e) {
                    aj.offset.setOffset(this, J, e)
                })
            }
            if (!I || !I.ownerDocument) {
                return null
            }
            if (I === I.ownerDocument.body) {
                return aj.offset.bodyOffset(I)
            }
            try {
                B = I.getBoundingClientRect()
            } catch (E) {}
            var G = I.ownerDocument,
                x = G.documentElement;
            if (!B || !aj.contains(x, I)) {
                return B ? {
                    top: B.top,
                    left: B.left
                } : {
                    top: 0,
                    left: 0
                }
            }
            var F = G.body,
                C = aQ(G),
                A = x.clientTop || F.clientTop || 0,
                D = x.clientLeft || F.clientLeft || 0,
                w = C.pageYOffset || aj.support.boxModel && x.scrollTop || F.scrollTop,
                z = C.pageXOffset || aj.support.boxModel && x.scrollLeft || F.scrollLeft,
                H = B.top + w - A,
                y = B.left + z - D;
            return {
                top: H,
                left: y
            }
        }
    } else {
        aj.fn.offset = function(F) {
            var E = this[0];
            if (F) {
                return this.each(function(H) {
                    aj.offset.setOffset(this, F, H)
                })
            }
            if (!E || !E.ownerDocument) {
                return null
            }
            if (E === E.ownerDocument.body) {
                return aj.offset.bodyOffset(E)
            }
            var C, x = E.offsetParent,
                w = E,
                G = E.ownerDocument,
                y = G.documentElement,
                A = G.body,
                B = G.defaultView,
                e = B ? B.getComputedStyle(E, null) : E.currentStyle,
                D = E.offsetTop,
                z = E.offsetLeft;
            while ((E = E.parentNode) && E !== A && E !== y) {
                if (aj.support.fixedPosition && e.position === "fixed") {
                    break
                }
                C = B ? B.getComputedStyle(E, null) : E.currentStyle;
                D -= E.scrollTop;
                z -= E.scrollLeft;
                if (E === x) {
                    D += E.offsetTop;
                    z += E.offsetLeft;
                    if (aj.support.doesNotAddBorder && !(aj.support.doesAddBorderForTableAndCells && aR.test(E.nodeName))) {
                        D += parseFloat(C.borderTopWidth) || 0;
                        z += parseFloat(C.borderLeftWidth) || 0
                    }
                    w = x;
                    x = E.offsetParent
                }
                if (aj.support.subtractsBorderForOverflowNotVisible && C.overflow !== "visible") {
                    D += parseFloat(C.borderTopWidth) || 0;
                    z += parseFloat(C.borderLeftWidth) || 0
                }
                e = C
            }
            if (e.position === "relative" || e.position === "static") {
                D += A.offsetTop;
                z += A.offsetLeft
            }
            if (aj.support.fixedPosition && e.position === "fixed") {
                D += Math.max(y.scrollTop, A.scrollTop);
                z += Math.max(y.scrollLeft, A.scrollLeft)
            }
            return {
                top: D,
                left: z
            }
        }
    }
    aj.offset = {
        bodyOffset: function(w) {
            var e = w.offsetTop,
                x = w.offsetLeft;
            if (aj.support.doesNotIncludeMarginInBodyOffset) {
                e += parseFloat(aj.css(w, "marginTop")) || 0;
                x += parseFloat(aj.css(w, "marginLeft")) || 0
            }
            return {
                top: e,
                left: x
            }
        },
        setOffset: function(F, E, z) {
            var D = aj.css(F, "position");
            if (D === "static") {
                F.style.position = "relative"
            }
            var B = aj(F),
                w = B.offset(),
                e = aj.css(F, "top"),
                G = aj.css(F, "left"),
                H = (D === "absolute" || D === "fixed") && aj.inArray("auto", [e, G]) > -1,
                C = {},
                A = {},
                x, y;
            if (H) {
                A = B.position();
                x = A.top;
                y = A.left
            } else {
                x = parseFloat(e) || 0;
                y = parseFloat(G) || 0
            }
            if (aj.isFunction(E)) {
                E = E.call(F, z, w)
            }
            if (E.top != null) {
                C.top = (E.top - w.top) + x
            }
            if (E.left != null) {
                C.left = (E.left - w.left) + y
            }
            if ("using" in E) {
                E.using.call(F, C)
            } else {
                B.css(C)
            }
        }
    };
    aj.fn.extend({
        position: function() {
            if (!this[0]) {
                return null
            }
            var e = this[0],
                x = this.offsetParent(),
                y = this.offset(),
                w = ap.test(x[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : x.offset();
            y.top -= parseFloat(aj.css(e, "marginTop")) || 0;
            y.left -= parseFloat(aj.css(e, "marginLeft")) || 0;
            w.top += parseFloat(aj.css(x[0], "borderTopWidth")) || 0;
            w.left += parseFloat(aj.css(x[0], "borderLeftWidth")) || 0;
            return {
                top: y.top - w.top,
                left: y.left - w.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || al.body;
                while (e && (!ap.test(e.nodeName) && aj.css(e, "position") === "static")) {
                    e = e.offsetParent
                }
                return e
            })
        }
    });
    aj.each(["Left", "Top"], function(e, x) {
        var w = "scroll" + x;
        aj.fn[w] = function(z) {
            var y, A;
            if (z === an) {
                y = this[0];
                if (!y) {
                    return null
                }
                A = aQ(y);
                return A ? ("pageXOffset" in A) ? A[e ? "pageYOffset" : "pageXOffset"] : aj.support.boxModel && A.document.documentElement[w] || A.document.body[w] : y[w]
            }
            return this.each(function() {
                A = aQ(this);
                if (A) {
                    A.scrollTo(!e ? z : aj(A).scrollLeft(), e ? z : aj(A).scrollTop())
                } else {
                    this[w] = z
                }
            })
        }
    });

    function aQ(e) {
        return aj.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : false
    }
    aj.each(["Height", "Width"], function(e, x) {
        var w = x.toLowerCase();
        aj.fn["inner" + x] = function() {
            var y = this[0];
            return y ? y.style ? parseFloat(aj.css(y, w, "padding")) : this[w]() : null
        };
        aj.fn["outer" + x] = function(z) {
            var y = this[0];
            return y ? y.style ? parseFloat(aj.css(y, w, z ? "margin" : "border")) : this[w]() : null
        };
        aj.fn[w] = function(z) {
            var D = this[0];
            if (!D) {
                return z == null ? null : this
            }
            if (aj.isFunction(z)) {
                return this.each(function(F) {
                    var E = aj(this);
                    E[w](z.call(this, F, E[w]()))
                })
            }
            if (aj.isWindow(D)) {
                var C = D.document.documentElement["client" + x],
                    y = D.document.body;
                return D.document.compatMode === "CSS1Compat" && C || y && y["client" + x] || C
            } else {
                if (D.nodeType === 9) {
                    return Math.max(D.documentElement["client" + x], D.body["scroll" + x], D.documentElement["scroll" + x], D.body["offset" + x], D.documentElement["offset" + x])
                } else {
                    if (z === an) {
                        var B = aj.css(D, w),
                            A = parseFloat(B);
                        return aj.isNumeric(A) ? A : B
                    } else {
                        return this.css(w, typeof z === "string" ? z : z + "px")
                    }
                }
            }
        }
    });
    juicebox_lib.jQuery = juicebox_lib.$ = aj
})(window);
if (typeof jQuery === "undefined") {
    window.jQuery = juicebox_lib.jQuery
}
if (typeof $ === "undefined") {
    window.$ = juicebox_lib.jQuery
}(function(r, t, q) {
    var j = ["top", "right", "bottom", "left", "opacity", "height", "width"],
        s = ["top", "right", "bottom", "left"],
        n = ["", "-webkit-", "-moz-", "-o-"],
        v = ["avoidTransforms", "useTranslate3d", "leaveTransforms"],
        h = /^([+-]=)?([\d+-.]+)(.*)$/,
        z = /([A-Z])/g,
        w = {
            secondary: {},
            meta: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        },
        m = "jQe",
        c = "cubic-bezier(",
        y = ")",
        g = false,
        b = null;
    var k = document.body || document.documentElement,
        e = k.style,
        a = (e.WebkitTransition !== undefined) ? "webkitTransitionEnd" : (e.OTransition !== undefined) ? "oTransitionEnd" : "transitionend",
        x = e.WebkitTransition !== undefined || e.MozTransition !== undefined || e.OTransition !== undefined || e.transition !== undefined,
        f = g = ("WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix());
    if (r.expr && r.expr.filters) {
        b = r.expr.filters.animated;
        r.expr.filters.animated = function(C) {
            return r(C).data("events") && r(C).data("events")[a] ? true : b.call(this, C)
        }
    }

    function i(M, G, D, H) {
        var J = h.exec(G),
            E = M.css(D) === "auto" ? 0 : M.css(D),
            N = typeof E == "string" ? A(E) : E,
            F = typeof G == "string" ? A(G) : G,
            L = H === true ? 0 : N,
            K = M.is(":hidden"),
            C = M.translation();
        if (D == "left") {
            L = parseInt(N, 10) + C.x
        }
        if (D == "right") {
            L = parseInt(N, 10) + C.x
        }
        if (D == "top") {
            L = parseInt(N, 10) + C.y
        }
        if (D == "bottom") {
            L = parseInt(N, 10) + C.y
        }
        if (!J && G == "show") {
            L = 1;
            if (K) {
                M.css({
                    display: "block",
                    opacity: 0
                })
            }
        } else {
            if (!J && G == "hide") {
                L = 0
            }
        }
        if (J) {
            var I = parseFloat(J[2]);
            if (J[1]) {
                I = ((J[1] === "-=" ? -1 : 1) * I) + parseInt(L, 10)
            }
            return I
        } else {
            return L
        }
    }

    function u(C, E, D) {
        return ((D === true || (g == true && D != false)) && f) ? "translate3d(" + C + "px," + E + "px,0)" : "translate(" + C + "px," + E + "px)"
    }

    function l(J, O, H, K, N, D, G, C) {
        var I = J.data(m) ? !d(J.data(m)) ? J.data(m) : r.extend(true, {}, w) : r.extend(true, {}, w),
            F = N,
            M = r.inArray(O, s) > -1;
        if (M) {
            var P = I.meta,
                E = A(J.css(O)) || 0,
                L = O + "_o";
            F = N - E;
            P[O] = F;
            P[L] = J.css(O) == "auto" ? 0 + F : E + F || 0;
            I.meta = P;
            if (G && F === 0) {
                F = 0 - P[L];
                P[O] = F;
                P[L] = 0
            }
        }
        return J.data(m, B(I, O, H, K, F, D, G, C))
    }

    function B(K, J, F, H, I, D, E, C) {
        K = typeof K === "undefined" ? {} : K;
        K.secondary = typeof K.secondary === "undefined" ? {} : K.secondary;
        for (var G = n.length - 1; G >= 0; G--) {
            if (typeof K[n[G] + "transition-property"] === "undefined") {
                K[n[G] + "transition-property"] = ""
            }
            K[n[G] + "transition-property"] += ", " + ((D === true && E === true) ? n[G] + "transform" : J);
            K[n[G] + "transition-duration"] = F + "ms";
            K[n[G] + "transition-timing-function"] = H;
            K.secondary[((D === true && E === true) ? n[G] + "transform" : J)] = (D === true && E === true) ? u(K.meta.left, K.meta.top, C) : I
        }
        return K
    }

    function o(D) {
        for (var C in D) {
            if ((C == "width" || C == "height") && (D[C] == "show" || D[C] == "hide" || D[C] == "toggle")) {
                return true
            }
        }
        return false
    }

    function d(D) {
        for (var C in D) {
            return false
        }
        return true
    }

    function A(C) {
        return parseFloat(C.replace(/px/i, ""))
    }

    function p(F, E, C) {
        var D = r.inArray(F, j) > -1;
        if ((F == "width" || F == "height") && (E === parseFloat(C.css(F)))) {
            D = false
        }
        return D
    }
    r.extend({
        toggle3DByDefault: function() {
            g = !g
        }
    });
    r.fn.translation = function() {
        if (!this[0]) {
            return null
        }
        var G = this[0],
            D = window.getComputedStyle(G, null),
            H = {
                x: 0,
                y: 0
            };
        for (var F = n.length - 1; F >= 0; F--) {
            var E = D.getPropertyValue(n[F] + "transform");
            if (E && (/matrix/i).test(E)) {
                var C = E.replace(/^matrix\(/i, "").split(/, |\)$/g);
                H = {
                    x: parseInt(C[4], 10),
                    y: parseInt(C[5], 10)
                };
                break
            }
        }
        return H
    };
    r.fn.animate = function(D, E, I, K) {
        D = D || {};
        var F = !(typeof D.bottom !== "undefined" || typeof D.right !== "undefined"),
            J = r.speed(E, I, K),
            C = this,
            H = 0,
            G = function() {
                H--;
                if (H === 0) {
                    if (typeof J.complete === "function") {
                        J.complete.apply(C[0], arguments)
                    }
                }
            };
        if (!x || d(D) || o(D) || J.duration <= 0 || (r.fn.animate.defaults.avoidTransforms === true && D.avoidTransforms !== false)) {
            return t.apply(this, arguments)
        }
        return this[J.queue === true ? "queue" : "each"](function() {
            var V = r(this),
                M = r.extend({}, J),
                R = function() {
                    var ac = {};
                    for (var Z = n.length - 1; Z >= 0; Z--) {
                        ac[n[Z] + "transition-property"] = "none";
                        ac[n[Z] + "transition-duration"] = "";
                        ac[n[Z] + "transition-timing-function"] = ""
                    }
                    V.unbind(a);
                    if (!D.leaveTransforms === true) {
                        var ab = V.data(m) || {},
                            aa = {};
                        for (Z = n.length - 1; Z >= 0; Z--) {
                            aa[n[Z] + "transform"] = ""
                        }
                        if (F && typeof ab.meta !== "undefined") {
                            for (var Y = 0, X; X = s[Y]; ++Y) {
                                aa[X] = ab.meta[X + "_o"] + "px"
                            }
                        }
                        V.css(ac).css(aa)
                    }
                    if (D.opacity === "hide") {
                        V.css("display", "none")
                    }
                    V.data(m, null);
                    G.call(V)
                },
                N = {
                    bounce: c + "0.0, 0.35, .5, 1.3" + y,
                    linear: "linear",
                    swing: "ease-in-out",
                    easeOutQuad: c + "0.250, 0.460, 0.450, 0.940" + y,
                    easeInOutQuad: c + "0.455, 0.030, 0.515, 0.955" + y,
                    easeInOutCirc: c + "0.785, 0.135, 0.150, 0.860" + y
                },
                Q = {},
                O = N[M.easing || "swing"] ? N[M.easing || "swing"] : M.easing || "swing";
            for (var L in D) {
                if (r.inArray(L, v) === -1) {
                    var S = r.inArray(L, s) > -1,
                        U = i(V, D[L], L, (S && D.avoidTransforms !== true));
                    if (D.avoidTransforms !== true && p(L, U, V)) {
                        l(V, L, M.duration, O, S && D.avoidTransforms === true ? U + "px" : U, S && D.avoidTransforms !== true, F, D.useTranslate3d === true)
                    } else {
                        Q[L] = D[L]
                    }
                }
            }
            var W = V.data(m) || {};
            for (var P = n.length - 1; P >= 0; P--) {
                if (typeof W[n[P] + "transition-property"] !== "undefined") {
                    W[n[P] + "transition-property"] = W[n[P] + "transition-property"].substr(2)
                }
            }
            V.data(m, W).unbind(a);
            if (!d(V.data(m)) && !d(V.data(m).secondary)) {
                H++;
                V.css(V.data(m));
                var T = V.data(m).secondary;
                setTimeout(function() {
                    V.bind(a, R).css(T)
                })
            } else {
                M.queue = false
            }
            if (!d(Q)) {
                H++;
                t.apply(V, [Q, {
                    duration: M.duration,
                    easing: r.easing[M.easing] ? M.easing : (r.easing.swing ? "swing" : "linear"),
                    complete: G,
                    queue: M.queue
                }])
            }
            return true
        })
    };
    r.fn.animate.defaults = {};
    r.fn.stop = function(F, D, E) {
        if (!x) {
            return q.apply(this, [F, D])
        }
        if (F) {
            this.queue([])
        }
        var G = {};
        for (var C = n.length - 1; C >= 0; C--) {
            G[n[C] + "transition-property"] = "none";
            G[n[C] + "transition-duration"] = "";
            G[n[C] + "transition-timing-function"] = ""
        }
        this.each(function() {
            var J = r(this),
                I = window.getComputedStyle(this, null),
                L = {},
                K;
            if (!d(J.data(m)) && !d(J.data(m).secondary)) {
                var M = J.data(m);
                if (D) {
                    L = M.secondary;
                    if (!E && typeof M.meta.left_o !== undefined || typeof M.meta.top_o !== undefined) {
                        L.left = typeof M.meta.left_o !== undefined ? M.meta.left_o : "auto";
                        L.top = typeof M.meta.top_o !== undefined ? M.meta.top_o : "auto";
                        for (K = n.length - 1; K >= 0; K--) {
                            L[n[K] + "transform"] = ""
                        }
                    }
                } else {
                    for (var N in J.data(m).secondary) {
                        N = N.replace(z, "-$1").toLowerCase();
                        L[N] = I.getPropertyValue(N);
                        if (!E && (/matrix/i).test(L[N])) {
                            var H = L[N].replace(/^matrix\(/i, "").split(/, |\)$/g);
                            L.left = (parseFloat(H[4]) + parseFloat(J.css("left")) + "px") || "auto";
                            L.top = (parseFloat(H[5]) + parseFloat(J.css("top")) + "px") || "auto";
                            for (K = n.length - 1; K >= 0; K--) {
                                L[n[K] + "transform"] = ""
                            }
                        }
                    }
                }
                J.unbind(a).css(G).css(L).data(m, null)
            } else {
                q.apply(J, [F, D])
            }
        });
        return this
    }
})(juicebox_lib.jQuery, juicebox_lib.jQuery.fn.animate, juicebox_lib.jQuery.fn.stop);
(function(i) {
    if (!juicebox_lib.jQuery.browser.msie || juicebox_lib.jQuery.browser.version < 10) {
        return
    }
    var k = i.document,
        o = function(r, t, u) {
            var q, s = k.createEvent("Event");
            s.initEvent(r, true, true);
            for (q in u) {
                s[q] = u[q]
            }
            t.dispatchEvent(s)
        },
        l = (function() {
            var t = Math.pow(2, 32) - 1,
                r = Object.prototype.hasOwnProperty;

            function s(u) {
                return u >>> 0
            }

            function q(u) {
                var v = -1,
                    w, x;
                for (x in u) {
                    w = (String(s(x)) === x && s(x) !== t && r.call(u, x));
                    if (w && x > v) {
                        v = x
                    }
                }
                return v
            }
            return function(u) {
                var v = 0;
                u = u || {};
                u.length = {
                    get: function() {
                        var w = +q(this);
                        return Math.max(v, w + 1)
                    },
                    set: function(z) {
                        var x = s(z);
                        if (x !== +z) {
                            throw new RangeError()
                        }
                        for (var y = x, w = this.length; y < w; y++) {
                            delete this[y]
                        }
                        v = x
                    }
                };
                u.toString = {
                    value: Array.prototype.join
                };
                return Object.create(Array.prototype, u)
            }
        })(),
        m = {
            identifiedTouch: {
                value: function(r) {
                    var q = this.length;
                    while (q--) {
                        if (this[q].identifier === r) {
                            return this[q]
                        }
                    }
                    return undefined
                }
            },
            item: {
                value: function(q) {
                    return this[q]
                }
            },
            _touchIndex: {
                value: function(r) {
                    var q = this.length;
                    while (q--) {
                        if (this[q].pointerId == r.pointerId) {
                            return q
                        }
                    }
                    return -1
                }
            },
            _addAll: {
                value: function(r) {
                    var q = 0,
                        s = r.length;
                    for (; q < s; q++) {
                        this._add(r[q])
                    }
                }
            },
            _add: {
                value: function(r) {
                    var q = this._touchIndex(r);
                    q = q < 0 ? this.length : q;
                    r.type = "MSPointerMove";
                    r.identifier = r.pointerId;
                    r.force = r.pressure;
                    r.radiusX = r.radiusY = 1;
                    r.rotationAngle = 0;
                    this[q] = r
                }
            },
            _remove: {
                value: function(r) {
                    var q = this._touchIndex(r);
                    if (q >= 0) {
                        this.splice(q, 1)
                    }
                }
            }
        },
        f = (function(q) {
            return function() {
                var r = l(q);
                if (arguments.length === 1) {
                    r.length = arguments[0]
                } else {
                    r.push.apply(r, arguments)
                }
                return r
            }
        })(m),
        d, c = {},
        n = i.MSGesture ? new MSGesture() : null,
        a = [],
        j = function(q, r) {
            if (r) {
                if (q === r) {
                    return true
                } else {
                    return j(q, r.parentNode)
                }
            } else {
                return false
            }
        },
        h = function(q) {
            var u, w = q.target,
                s, t, v;
            if (q.type === "MSPointerDown") {
                d._add(q);
                c[q.pointerId] = q.target;
                u = "touchstart";
                if (d.length > 1) {
                    n.target = q.target;
                    for (var r = 0; r < d.length; r++) {
                        n.addPointer(d[r].pointerId)
                    }
                }
            }
            if (q.type === "MSPointerMove" && d.identifiedTouch(q.pointerId)) {
                d._add(q);
                u = "touchmove"
            }
            t = k.createTouchList(q);
            v = k.createTouchList();
            for (var r = 0; r < d.length; r++) {
                if (j(w, c[d[r].identifier])) {
                    v._add(d[r])
                }
            }
            s = c[q.pointerId];
            if (q.type === "MSPointerUp") {
                d._remove(q);
                c[q.pointerId] = null;
                delete c[q.pointerId];
                u = "touchend";
                if (d.length <= 1 && n) {
                    n.stop()
                }
            }
            if (u && s) {
                o(u, s, {
                    touches: d,
                    changedTouches: t,
                    targetTouches: v
                })
            }
        },
        b = function(q) {
            var r;
            if (q.type === "MSGestureStart") {
                r = "gesturestart"
            } else {
                if (q.type === "MSGestureChange") {
                    r = "gesturechange"
                } else {
                    if (q.type === "MSGestureEnd") {
                        r = "gestureend"
                    }
                }
            }
            o(r, q.target, {
                scale: q.scale,
                rotation: q.rotation,
                screenX: q.screenX,
                screenY: q.screenY
            })
        },
        g = function(u) {
            var s = p,
                r = e,
                t = u.prototype.addEventListener,
                q = u.prototype.removeEventListener;
            u.prototype.addEventListener = function(w, x, v) {
                i.navigator.msPointerEnabled && s.call(this, w, x, v);
                t.call(this, w, x, v)
            };
            u.prototype.removeEventListener = function(w, x, v) {
                i.navigator.msPointerEnabled && r.call(this, w, x, v);
                q.call(this, w, x, v)
            }
        },
        p = function(r, u, q) {
            var t = this,
                s;
            if (r.indexOf("touchstart") === 0) {
                s = function() {
                    if (j(t, arguments[0].target)) {
                        h.apply(this, arguments)
                    }
                };
                a.push({
                    node: this,
                    func: s
                });
                this.ownerDocument.addEventListener("MSPointerDown", s, q)
            }
            if (r.indexOf("touchmove") === 0) {
                this.ownerDocument.addEventListener("MSPointerMove", h, q)
            }
            if (r.indexOf("touchend") === 0) {
                this.ownerDocument.addEventListener("MSPointerUp", h, q)
            }
            if (r.indexOf("gesturestart") === 0) {
                this.ownerDocument.addEventListener("MSGestureStart", b, q)
            }
            if (r.indexOf("gesturechange") === 0) {
                this.ownerDocument.addEventListener("MSGestureChange", b, q)
            }
            if (r.indexOf("gestureend") === 0) {
                this.ownerDocument.addEventListener("MSGestureEnd", b, q)
            }
            if (this.style && typeof this.style.msTouchAction != "undefined") {
                this.style.msTouchAction = "none"
            }
        },
        e = function(s, u, q) {
            var t, r;
            if (s.indexOf("touchstart") === 0) {
                r = a.length;
                while (r--) {
                    if (a[r].node === this) {
                        this.ownerDocument.removeEventListener("MSPointerDown", t, q);
                        a.splice(r, 1);
                        break
                    }
                }
            }
            if (s.indexOf("touchmove") === 0) {
                this.ownerDocument.removeEventListener("MSPointerMove", h, q)
            }
            if (s.indexOf("touchend") === 0) {
                this.ownerDocument.removeEventListener("MSPointerUp", h, q)
            }
            if (s.indexOf("gesturestart") === 0) {
                this.ownerDocument.removeEventListener("MSGestureStart", b, q)
            }
            if (s.indexOf("gesturechange") === 0) {
                this.ownerDocument.removeEventListener("MSGestureChange", b, q)
            }
            if (s.indexOf("gestureend") === 0) {
                this.ownerDocument.removeEventListener("MSGestureEnd", b, q)
            }
        };
    k.createTouchList = function(r) {
        var q = new f();
        if (r) {
            if (r.length) {
                q._addAll(r)
            } else {
                q._add(r)
            }
        }
        return q
    };
    k.createTouch = function(q, w, r, v, t, u, s) {
        return {
            identifier: r,
            screenX: u,
            screenY: s,
            pageX: v,
            pageY: t,
            target: w
        }
    };
    if (!i.ontouchstart) {
        i.ontouchstart = 1
    }
    d = k.createTouchList();
    g(HTMLElement);
    g(Document)
}(window));
var jb4ddeemmooids = [
    ["j", "u", "i", "c", "e", "b", "o", "x", ".", "n", "e", "t"],
    ["s", "h", "o", "w", "k", "a", "s", "e", ".", "n", "e", "t"]
];
juicebox_lib.jQuery.fn.extend({
    disableSelection: function() {
        return this.each(function() {
            this.onselectstart = function() {
                return false
            };
            this.unselectable = "on";
            jQuery(this).css("user-select", "none");
            jQuery(this).css("-o-user-select", "none");
            jQuery(this).css("-moz-user-select", "none");
            jQuery(this).css("-khtml-user-select", "none");
            jQuery(this).css("-webkit-user-select", "none")
        })
    }
});
if (!juicebox_lib.jQuery.easing.easeInOutQuart) {
    juicebox_lib.jQuery.extend(juicebox_lib.jQuery.easing, {
        easeInOutQuart: function(e, f, a, h, g) {
            if ((f /= g / 2) < 1) {
                return h / 2 * f * f * f * f + a
            }
            return -h / 2 * ((f -= 2) * f * f * f - 2) + a
        },
        easeOutQuart: function(e, f, a, h, g) {
            return -h * ((f = f / g - 1) * f * f * f - 1) + a
        }
    })
}
var jb4ddeemmoo = {
    is4dm: function() {
        for (var b = 0; b < jb4ddeemmooids.length; b++) {
            var a = window.location.href.toLowerCase().indexOf(jb4ddeemmooids[b].join(""));
            if (a >= 0 && a < 15) {
                return true
            }
        }
        return false
    },
    invmsg: function() {
        return ["T", "h", "i", "s", " ", "v", "e", "r", "s", "i", "o", "n", " ", "o", "f", " ", "J", "u", "i", "c", "e", "b", "o", "x", " ", "i", "s", " ", "f", "o", "r", " ", "d", "e", "m", "o", " ", "p", "u", "r", "p", "o", "s", "e", "s", " ", "o", "n", "l", "y", ". ", "P", "l", "e", "a", "s", "e", " ", "d", "o", "w", "n", "l", "o", "a", "d", " ", "j", "u", "i", "c", "e", "b", "o", "x", " ", "<", "a", " ", "h", "r", "e", "f", "=", "'", "h", "t", "t", "p", "s:", "//", jb4ddeemmooids[0].join(""), "/", "d", "o", "w", "n", "l", "o", "a", "d", "/", "'", ">", "h", "e", "r", "e", "<", "/", "a", ">", "."].join("")
    }
};
var juice_box_utils = function(p$) {
    var $ = p$;
    var is_pro_version = "cd64f8c2ad416da082f8c514ba054429";
    var is_absolute_path = function(path) {
        if (!path) {
            return false
        }
        if (path.indexOf("/") === 0) {
            return true
        }
        if (path.toLowerCase().indexOf("http://") === 0) {
            return true
        }
        if (path.toLowerCase().indexOf("https://") === 0) {
            return true
        }
        if (path.indexOf("://") > 0 && path.indexOf("://") < 10) {
            return true
        }
        return false
    };
    var is_end_with = function(str, ch) {
        if (!str || !ch) {
            return false
        }
        if (str.substring(str.length - ch.length) === ch) {
            return true
        }
        return false
    };
    var get_base_url = function(url, uri) {
        if (url.indexOf("/") === 0) {
            var iposs = uri.indexOf("://");
            if (iposs < 0) {
                iposs = 0
            } else {
                iposs += 3
            }
            var ipose = uri.indexOf("/", iposs);
            if (ipose < 0) {
                return uri
            }
            return uri.substring(0, ipose)
        }
        var ipos = uri.lastIndexOf("/");
        if (ipos <= 0) {
            return ""
        }
        return uri.substring(0, ipos)
    };
    var format_base_url = function(url, uri) {
        if (url.indexOf("://") > 0) {
            return url
        }
        return get_base_url(url, uri) + (url.indexOf("/") === 0 ? "" : "/") + url
    };
    var convert_to_absolute_path = function(url) {
        if (url.toLowerCase().indexOf("http://") === 0 || url.toLowerCase().indexOf("https://") === 0) {
            return url
        }
        var uri = window.location.href.split("#")[0].split("?")[0];
        if ($("base").attr("href")) {
            uri = format_base_url($("base").attr("href"), uri)
        }
        var ipos = uri.lastIndexOf("/");
        var iposs = uri.indexOf("://");
        if (ipos <= 0) {
            return "/" + url
        }
        if (iposs > 0 && ipos - iposs < 3) {
            return "/" + url
        }
        return get_base_url(url, uri) + (url.indexOf("/") === 0 ? "" : "/") + url
    };
    var concatenate_path = function(base, url) {
        if (!base) {
            base = ""
        }
        if (!url) {
            url = ""
        }
        if (is_absolute_path(url)) {
            return url
        }
        if (!is_end_with(base, "/") && base) {
            base += "/"
        }
        return base + url
    };
    var is_it_scrolling = function() {
        var doc = $(document);
        var win = $(window);
        return {
            v_scrolling: Math.abs(parseInt(doc.height()) - parseInt(win.height())) > (is_android() ? 3 : 0),
            h_scrolling: doc.width() > win.width()
        }
    };
    var in_iframe = function() {
        if (window.location.href.indexOf("noiframelimit") > -1) {
            return false
        }
        if (top && top.location !== location) {
            return true
        }
        return false
    };
    var is_windows = function() {
        if (navigator.userAgent.match(/Windows/i)) {
            return true
        }
        return false
    };
    var is_iphone_chrome = function() {
        if (is_iphone() && navigator.userAgent.match(/CriOS/i)) {
            return true
        }
        return false
    };
    var need_ios_special_viewport = function() {
        if (is_ios_9()) {
            return true
        }
        return false
    };
    var is_ios = function() {
        return is_iphone() || is_ipad()
    };
    var is_ios_9 = function() {
        if (!is_iphone() && !is_ipad()) {
            return false
        }
        if (navigator.userAgent.match(/OS 9_/i)) {
            return true
        }
    };
    var is_iphone = function() {
        if (navigator.userAgent.match(/iPhone/i)) {
            return true
        } else {
            if (navigator.userAgent.match(/iPod/i)) {
                return true
            }
        }
        return false
    };
    var is_ipad = function() {
        if (navigator.userAgent.match(/iPad/i)) {
            return true
        }
        return false
    };
    var is_android = function() {
        if (navigator.userAgent.match(/Android/i)) {
            return true
        }
        return false
    };
    var is_mobile_ie = function() {
        if (navigator.userAgent.match(/IEMobile/i)) {
            return true
        }
        return false
    };
    var is_mobile_ie_10 = function() {
        if ($.browser && $.browser.msie && $.browser.version == 10 && is_mobile_ie()) {
            return true
        }
        return false
    };
    var is_ie_metro_mode = function() {
        if (is_mobile_ie()) {
            return false
        }
        if (!is_ie_after_11() && !$.browser.msie) {
            return false
        }
        var ww = window.innerWidth;
        if (document.documentElement.clientWidth == ww && document.documentElement.offsetWidth == ww && window.outerWidth == ww && screen.width == ww && screen.availWidth == ww && document.documentElement.getBoundingClientRect().width == ww) {
            return true
        }
        return false
    };
    var is_small_android = function() {
        if (navigator.userAgent.match(/Galaxy Nexus/i)) {
            return true
        }
        if (navigator.userAgent.match(/Nexus S/i)) {
            return true
        }
        if (navigator.userAgent.match(/HTC Panache/i)) {
            return true
        }
        if (navigator.userAgent.match(/HTC myTouch/i)) {
            return true
        }
        if (navigator.userAgent.match(/Sensation/i)) {
            return true
        }
        if (is_android() && is_small_screen()) {
            return true
        }
        return false
    };
    var is_windows_phone = function() {
        if (navigator.userAgent.match(/Windows Phone/i)) {
            return true
        }
        return false
    };
    var is_ie_after_11 = function() {
        if (navigator.userAgent.match(/Trident.*rv/) && $.browser.version >= 11) {
            return true
        }
        return false
    };
    var is_ie_touch = function() {
        if ((is_ie_after_11() || $.browser.msie) && (navigator.userAgent.indexOf("Tablet PC") > 0 || navigator.userAgent.indexOf("Touch") > 0)) {
            return true
        }
        return false
    };
    var is_mobile_ie_after_11 = function() {
        return is_ie_touch() && is_ie_after_11()
    };
    var is_ios_mobile_chrome = function() {
        if (!is_mac_os()) {
            return false
        }
        if (navigator.userAgent.match(/CriOS.*Mobile/)) {
            return true
        }
        return false
    };
    var is_chrome = function() {
        if (navigator.userAgent.match(/Chrome/i)) {
            return true
        }
        return false
    };
    var is_opera = function() {
        if (navigator.userAgent.match(/Opera/i) || navigator.userAgent.match(/OPR/i)) {
            return true
        }
        return false
    };
    var is_firefox = function() {
        if (navigator.userAgent.match(/Firefox/i)) {
            return true
        }
        return false
    };
    var get_android_ver = function() {
        var pos = navigator.userAgent.indexOf("Android");
        if (pos < 0) {
            return 0
        }
        var pose = navigator.userAgent.indexOf(";", pos);
        if (pose <= pos) {
            return 0
        }
        var vi = navigator.userAgent.substring(pos, pose);
        var va = vi.split(" ");
        if (va.length !== 2) {
            return 0
        }
        var num = parseInt(va[1].replace(/\./g, "").substring(0, 3));
        var ver = parseFloat(parseFloat(num) / 100);
        if (ver < 1) {
            ver *= 10
        }
        if (ver < 1) {
            ver *= 10
        }
        return ver
    };
    var get_vp_meta_cnt_with_ratio = function(ratio, scalable) {
        if (is_windows_phone()) {
            return "width=device-width, user-scalable=" + (scalable ? "yes" : "no")
        }
        if (!ratio) {
            ratio = 1
        }
        var scb = (scalable ? "yes" : "no");
        var wd = "device-width";
        var ioswdattr = "";
        if (ratio < 1) {
            wd = 800;
            ioswdattr = "width=" + wd + ", "
        }
        if (need_ios_special_viewport()) {
            return ioswdattr + "initial-scale=" + (ratio + 0.0001) + ", minimum-scale=" + (scalable ? 0.25 : 1.0001) + ", maximum-scale=" + (scalable ? 4 : 1.0001) + ", user-scalable=" + scb
        }
        return "width=" + wd + ", initial-scale=" + ratio + ", minimum-scale=" + (scalable ? 0.25 : 1.0001) + ", maximum-scale=" + (scalable ? 4 : 1) + ", user-scalable=" + scb
    };
    var meta_tag_id = "jb-viewport";
    var populate_viewport_meta_content = function(isFullscreen) {
        if (isFullscreen) {
            return get_vp_meta_cnt_with_ratio("")
        } else {
            return ""
        }
    };
    var set_viewport_value = function(val, scalable) {
        $("#" + meta_tag_id).attr("content", get_vp_meta_cnt_with_ratio(val, scalable))
    };
    var only_has_minimal_ui = function() {
        var vp = document.getElementsByName("viewport");
        if (!vp || vp.length <= 0 || !vp[0].content) {
            return false
        }
        var cnt = vp[0].content.toLowerCase().replace(/ /g, "");
        if (cnt.toLowerCase().indexOf("minimal-ui") >= 0 && (!vp[0].id || vp[0].id != "meta_tag_id")) {
            return true
        }
        return false
    };
    var host_has_viewport_meta = function() {
        if ((is_iphone() && is_ios_mobile_chrome()) && $("#" + meta_tag_id).length <= 0) {
            return false
        }
        return document.getElementsByName("viewport").length > 0 && $("#" + meta_tag_id).length <= 0
    };
    var has_viewport_locked = function() {
        var vp = document.getElementsByName("viewport");
        if (!vp || vp.length <= 0 || !vp[0].content) {
            return false
        }
        var cnt = vp[0].content.toLowerCase().replace(/ /g, "");
        var hasInitialScale = cnt.match(/initial-scale=1\b/g) != null && cnt.match(/initial-scale=1\.[1-9]/g) == null;
        var userScalable = cnt.indexOf("user-scalable=0") >= 0 || cnt.indexOf("user-scalable=off") >= 0 || cnt.indexOf("user-scalable=false") >= 0;
        return hasInitialScale && userScalable
    };
    var need_viewport_meta = function(config) {
        if ($("#" + meta_tag_id).length > 0) {
            return true
        }
        if (has_other_content($("#" + config.containerid))) {
            return false
        }
        if (is_ipad() || is_iphone() || is_android() || is_windows_phone()) {
            return true
        }
        return false
    };
    var add_js_tag = function(url, id) {
        if (id && $("#" + id).length > 0) {
            return
        }
        var tag = document.createElement("script");
        if (id) {
            tag.id = id
        }
        tag.type = "text/javascript";
        tag.src = url;
        var header = document.getElementsByTagName("head");
        if (!header) {
            return
        }
        header[0].appendChild(tag)
    };
    var has_other_content = function(jqele) {
        if (jqele == null || jqele[0] == null) {
            return false
        }
        var tagName = jqele[0].tagName.toLowerCase();
        if (tagName == "body" || tagName == "html") {
            return false
        }
        if (jqele.siblings(":visible").not("iframe#fotomoto_io_post,iframe#fm_analytic_frame").length > 0) {
            return true
        }
        if (jqele.parent().length <= 0) {
            return false
        }
        var vtext = jqele.parent().contents().get(0).nodeValue;
        if (vtext && vtext.replace(/\s+/g, "")) {
            return true
        }
        return has_other_content(jqele.parent())
    };
    var add_viewport_meta = function(config, isFullscreen) {
        if (!need_viewport_meta(config)) {
            return
        }
        if ($("#" + meta_tag_id).length > 0 && !only_has_minimal_ui()) {
            return
        }
        if (host_has_viewport_meta()) {
            return
        }
        var svmeta4Idvc = document.createElement("meta");
        svmeta4Idvc.name = "viewport";
        svmeta4Idvc.id = meta_tag_id;
        svmeta4Idvc.content = populate_viewport_meta_content(isFullscreen);
        var header = document.getElementsByTagName("head");
        if (!header) {
            return
        }
        header[0].appendChild(svmeta4Idvc)
    };
    var set_viewport_meta = function(config, isFullscreen) {
        if (!need_viewport_meta(config)) {
            return
        }
        var mtag = $("#" + meta_tag_id);
        if (mtag.length <= 0) {
            var vpobj = document.getElementsByName("viewport");
            for (var i = 0; i < vpobj.length; i++) {
                if (!vpobj[i] || !vpobj[i].remove) {
                    continue
                }
                vpobj[i].remove()
            }
            add_viewport_meta(config, isFullscreen);
            return
        }
        mtag.attr("content", populate_viewport_meta_content(isFullscreen))
    };
    var get_viewport_meta_content = function() {
        var tags = document.getElementsByName("viewport");
        if (tags.length <= 0) {
            return null
        }
        if (!tags[0].content) {
            return null
        }
        return tags[0].content
    };
    var set_viewport_meta_content = function(content) {
        var tags = document.getElementsByName("viewport");
        if (tags.length <= 0) {
            return
        }
        tags[0].content = content
    };
    var get_current_path = function() {
        var uri = window.location.href.split("#")[0].split("?")[0];
        var posLasts = uri.lastIndexOf("/");
        var posS = uri.indexOf("//");
        if (posLasts < 0 || posS < 0) {
            return ""
        }
        var pos1 = uri.indexOf("/", posS + 2);
        if (pos1 < 0 || posLasts - pos1 <= 0) {
            return "/"
        }
        var tail = uri.substring(posLasts + 1);
        if (tail.indexOf(".") > 0) {
            return uri.substring(pos1, posLasts)
        }
        return uri.substring(pos1)
    };
    var get_qs_value = function(key, dft_) {
        if (dft_ == null) {
            dft_ = ""
        }
        key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        var qs = regex.exec(window.location.href);
        if (qs == null) {
            return dft_
        } else {
            return qs[1]
        }
    };
    var get_js_folder_url = function() {
        var i, pos, scripts = document.getElementsByTagName("script");
        for (i = 0; i < scripts.length; i++) {
            pos = scripts[i].src.toLowerCase().indexOf("juicebox.js");
            if (pos === 0) {
                return ""
            }
            if (pos > 0) {
                return scripts[i].src.substring(0, pos)
            }
        }
        return ""
    };
    var u_skey = "cd64f8c2ad416da082f8c514ba054429";
    var set_cookie = function(c_name, value, expires) {
        if (expires < 0) {
            expires = "Thu, 01 Jan 1970 00:00:00 GMT"
        } else {
            expires = ""
        }
        document.cookie = c_name + "=" + escape(value) + ((expires === "") ? "" : ";expires=" + expires) + ";path=/"
    };
    var get_cookie = function(c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start !== -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end === -1) {
                    c_end = document.cookie.length
                }
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    };
    var wrap_value = function(val) {
        switch (typeof val) {
            case "boolean":
            case "number":
                return val + "";
            default:
                return '"' + val + '"'
        }
    };
    var save_object_2_cookie = function(c_name, object) {
        if (!object) {
            set_cookie(c_name, "");
            return
        }
        var jsons = "";
        for (var k in object) {
            if (jsons.length > 0) {
                jsons += ","
            }
            jsons += k + ":" + wrap_value(object[k])
        }
        jsons = "{" + jsons + "}";
        set_cookie(c_name, jsons)
    };
    var get_object_from_cookie = function(c_name) {
        var json = get_cookie(c_name);
        var ret;
        eval("ret = " + (json ? json : null) + ";");
        return ret
    };
    var get_device_dpi = function(cb) {
        if (!is_iphone() && !is_ipad() && !is_android()) {
            if (cb) {
                cb(1)
            }
            return 1
        }
        var s = document.createElement("style");
        var d = document.createElement("div");
        d.id = "dpi-detector-01";
        var map = [{
            ratio: 1,
            pixel: "10px"
        }, {
            ratio: 1.5,
            pixel: "15px"
        }, {
            ratio: 2,
            pixel: "20px"
        }];
        s.innerText = "";
        for (var i = 0; i < map.length; i++) {
            s.innerText += "@media (-webkit-min-device-pixel-ratio:" + map[i].ratio + ") {#" + d.id + "{font-size:" + map[i].pixel + " !important;}}"
        }
        document.documentElement.appendChild(s).appendChild(d);
        window.setTimeout(function() {
            var dfs = getComputedStyle(d, null).getPropertyValue("font-size");
            for (var j = 0; j < map.length; j++) {
                if (dfs == map[i].pixel) {
                    if (cb) {
                        cb(map[i].ratio)
                    }
                    return map[i].ratio
                }
            }
            s.parentNode.removeChild(s);
            d.parentNode.removeChild(d);
            if (cb) {
                cb(1)
            }
            return 1
        }, 100);
        return 0
    };
    var get_query_path = function(document_id, path) {
        var paths = path.split(",");
        var xpath = "";
        for (var i = 0; i < paths.length; i++) {
            xpath += "#" + document_id + " " + paths[i] + (i === paths.length - 1 ? "" : ", ")
        }
        return xpath
    };
    var is_small_screen = function() {
        if (is_android()) {
            if (navigator.userAgent.match(/Mobile/i)) {
                return true
            }
            return false
        }
        if (Math.max(screen.height, screen.width) > 1000) {
            return false
        }
        return true
    };
    var is_swipable_device = function() {
        if (!is_iphone() && !is_ipad() && !is_android()) {
            return false
        }
        return true
    };
    var is_complete_touch = function() {
        return is_swipable_device() || is_mobile_ie()
    };
    var is_large_screen_mode = function(config) {
        if (config.screenmode.toUpperCase() === "LARGE") {
            return true
        }
        if (config.screenmode.toUpperCase() === "SMALL") {
            return false
        }
        if (!is_small_screen() && !is_small_android() && !is_iphone()) {
            return true
        }
        return false
    };
    var is_earlier_ie = function() {
        if ($.browser.msie && $.browser.version < 9) {
            return true
        }
        return false
    };
    var is_ie8 = function() {
        return ($.browser.msie && $.browser.version < 9 && $.browser.version > 7)
    };
    var is_firefox3 = function() {
        var bz = $.browser;
        if (bz.mozilla && bz.version.slice(0, 3) == "1.9") {
            return true
        }
        return false
    };
    var format_color = function(color) {
        color = color.replace(/#/g, "");
        if (color.match(/^[0-9a-f]{3,6}$/i)) {
            return "#" + color
        }
        return color
    };
    var need_new_window = function(config) {
        if (typeof(config.expandinnewpage) === "boolean") {
            return config.expandinnewpage
        }
        var optval = config.expandinnewpage.toUpperCase();
        if (optval === "TRUE") {
            return true
        }
        if (optval === "FALSE") {
            return false
        }
        if (is_iphone() || is_ipad()) {
            if (has_viewport_locked()) {
                return false
            }
            return true
        }
        return false
    };
    var is_new_expanded_window = function() {
        return typeof(expanded_jb_gallery) != "undefined" && expanded_jb_gallery
    };
    var is_adobe_air = function() {
        return navigator.userAgent.match(/AdobeAIR/i)
    };
    var show_real_fullscreen = function(domid) {
        var eledlg = document.getElementById(domid);
        if (eledlg.requestFullScreen) {
            eledlg.requestFullScreen()
        } else {
            if (eledlg.mozRequestFullScreen) {
                eledlg.mozRequestFullScreen()
            } else {
                if (eledlg.webkitRequestFullScreen) {
                    eledlg.webkitRequestFullScreen()
                } else {
                    if (eledlg.msRequestFullscreen) {
                        eledlg.msRequestFullscreen()
                    }
                }
            }
        }
    };
    var exit_fullscreen = function() {
        if (document.cancelFullScreen) {
            document.cancelFullScreen()
        } else {
            if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else {
                if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                } else {
                    if (document.msExitFullscreen) {
                        document.msExitFullscreen()
                    }
                }
            }
        }
    };
    var support_real_fullscreen = function() {
        if (document.cancelFullScreen) {
            return true
        } else {
            if (document.mozCancelFullScreen) {
                return true
            } else {
                if (document.webkitCancelFullScreen) {
                    return true
                } else {
                    if (document.msFullscreenEnabled) {
                        return true
                    }
                }
            }
        }
        return false
    };
    var is_in_real_fullscreen = function() {
        if (!screen || !window || !screen.height || !window.innerHeight) {
            return false
        }
        var sh = screen.height;
        var wh = window.innerHeight;
        var ms = Math.max(screen.height, screen.width);
        var mw = Math.max(window.innerHeight, window.innerWidth);
        if (ms - mw > 10 || sh - wh > 10) {
            return false
        }
        return true
    };
    var exit_support_real_fullscreen = function() {
        if (document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen) {
            return true
        }
        return false
    };
    var listenerAdded = false;
    var add_fullscreen_listener = function(callback) {
        if (listenerAdded) {
            return
        }
        listenerAdded = true;
        if (typeof(callback) != "function") {
            return
        }
        if (!support_real_fullscreen()) {
            return
        }
        document.addEventListener("fullscreenchange", function() {
            callback(document.fullscreen)
        }, false);
        document.addEventListener("mozfullscreenchange", function() {
            callback(document.mozFullScreen)
        }, false);
        document.addEventListener("webkitfullscreenchange", function() {
            callback(document.webkitIsFullScreen)
        }, false);
        document.addEventListener("MSFullscreenChange", function() {
            callback(document.msFullscreenElement != null)
        }, false)
    };
    var is_side_layout = function(config) {
        var tmbpos = config.thumbsposition.toUpperCase();
        return tmbpos === "LEFT" || tmbpos === "RIGHT"
    };
    var add_font_icon_4_ie8 = function(config, content) {
        if (!$.browser.msie || $.browser.version >= 9) {
            return ""
        }
        var bbstyle = config.buttonbariconrealsize ? config.buttonbariconrealsize + "px;" : "";
        return "<span style=\"font-family: 'juicebox';" + bbstyle + '">' + content + "</span>"
    };
    var get_text_shadow_style = function(rgba, colora, styleValueOnly) {
        if (is_earlier_ie()) {
            return ""
        }
        var shadowstr = (colora.toLowerCase() === "transparent" ? "0px 0px 0px " : "1px 1px 2px ");
        var suffix = (styleValueOnly ? "" : ";");
        if (is_small_android() || is_iphone()) {
            return (styleValueOnly ? "" : "-webkit-text-shadow: ") + shadowstr + format_color(colora) + suffix
        }
        return (styleValueOnly ? "" : "text-shadow: ") + shadowstr + format_color(rgba) + suffix
    };
    var get_font_shadow_style = function(rgba, colora, blur) {
        if (is_earlier_ie()) {
            return ""
        }
        if (is_small_android() || is_iphone()) {
            return "-webkit-text-shadow: 0px 0px " + blur + "px " + format_color(colora) + ";"
        }
        return "text-shadow: 0px 0px " + blur + "px " + format_color(rgba) + ";"
    };
    var get_shadow_style_string = function(rgba, colora, blur, styleValueOnly) {
        if (is_earlier_ie()) {
            return ""
        }
        if (is_small_android() || is_iphone()) {
            return (styleValueOnly ? "" : "-webkit-box-shadow: ") + "0px 0px " + blur + "px " + format_color(colora) + ";"
        }
        return (styleValueOnly ? "" : "box-shadow: ") + "0px 0px " + blur + "px " + format_color(rgba) + (styleValueOnly ? "" : ";")
    };
    var get_button_bar_style = function(config, is4BackBtn) {
        var ret = "";
        if (config.buttonbarbackcolor) {
            ret += "background-color:" + format_color(config.buttonbarbackcolor) + ";"
        }
        if (is_earlier_ie()) {
            var sz = parseInt(config.buttonbariconrealsize);
            var ht = "auto;";
            if (sz) {
                ht = (2 * sz) + "px;"
            }
            ret += "height:" + ht
        } else {
            if (is4BackBtn) {
                ret += "padding:0;height:auto;border-radius:3px;"
            }
        }
        return ret
    };
    var get_button_bar_icon_style = function(config, forBackBtn) {
        var ret = "";
        if (config.buttonbariconrealsize) {
            var sz = parseInt(config.buttonbariconrealsize);
            ret += "font-size:" + config.buttonbariconrealsize + (sz ? "px;" : ";");
            if (!forBackBtn) {
                var bdtop = parseInt(sz / 2);
                if (is_ie8()) {
                    bdtop = parseInt(sz / 4)
                }
                if (sz) {
                    ret += "border-top:" + bdtop + "px solid transparent;height:" + parseInt(1.5 * sz) + "px;width:" + (2 * sz) + "px;"
                }
            } else {
                var mgsz = (sz - 20) / 2;
                if (sz) {
                    ret += "height:" + (2 * sz - parseInt(sz / 2)) + "px;width:" + (2 * sz) + "px;" + (mgsz ? "margin-top:" + mgsz + "px" : "")
                }
            }
        }
        if (config.buttonbariconcolor) {
            ret += "color:" + format_color(config.buttonbariconcolor) + ";"
        }
        if (config.buttonbarshadowcolor) {
            ret += get_font_shadow_style(config.buttonbarshadowcolor, config.buttonbarshadowcolora, config.buttonbarshadowblur)
        }
        return ret
    };
    var get_thumb_size = function(config) {
        var thumb_width, thumb_height;
        if (config.usethumbdots) {
            thumb_width = 20;
            thumb_height = 20
        } else {
            thumb_width = config.thumbwidth;
            thumb_height = config.thumbheight
        }
        return {
            width: thumb_width,
            height: thumb_height
        }
    };
    var btnOriginalSize = 28;
    var get_nav_btn_size = function(config) {
        var btnsz = btnOriginalSize;
        var icnsz = parseInt(config.navbuttoniconrealsize);
        if (icnsz) {
            btnsz = parseInt(1.4 * icnsz)
        }
        return btnsz
    };
    var navSizeThresHold4Ie = 25;
    var get_nav_btn_size_style = function(config, adjsize) {
        var btnsz = get_nav_btn_size(config);
        if (!btnsz) {
            return ""
        }
        var icnsz = parseInt(config.navbuttoniconrealsize);
        if (adjsize) {
            if (!icnsz) {
                icnsz = 18
            }
            var bdw = parseInt((btnsz - icnsz) / 2);
            btnsz -= bdw
        }
        if ($.browser.msie && $.browser.version < 10 && $.browser.version >= 9 && icnsz > navSizeThresHold4Ie) {
            var btnszh = btnsz - 1;
            return "height:" + btnszh + "px;width:" + btnsz + "px;"
        }
        return "height:" + btnsz + "px;width:" + btnsz + "px;"
    };
    var get_nav_icon_style = function(config) {
        var ret = "";
        if (config.navbuttoniconrealsize) {
            var icnsz = parseInt(config.navbuttoniconrealsize);
            var btnsz = get_nav_btn_size(config);
            var hw = "";
            if (btnsz) {
                var bdw = parseInt((btnsz - icnsz) / 2);
                var ie8Adj = 0;
                if (is_ie8()) {
                    ie8Adj = bdw
                }
                var ie9Adj = ($.browser.msie && $.browser.version < 10 && $.browser.version >= 9 && icnsz > navSizeThresHold4Ie) ? 1 : 0;
                hw += get_nav_btn_size_style(config, true) + "padding-left:" + parseInt(bdw / 2) + "px;padding-right:" + parseInt(bdw / 2) + "px;padding-top:" + (bdw + ie9Adj - ie8Adj) + "px;"
            }
            ret += "font-size:" + config.navbuttoniconrealsize + (icnsz ? "px;" : ";") + hw;
            ret += "border-radius:" + config.navbuttoniconrealsize + "px;"
        }
        if (config.navbuttoniconcolor) {
            ret += "color:" + format_color(config.navbuttoniconcolor) + ";"
        }
        if (config.navbuttonshadowcolor) {
            ret += get_font_shadow_style(config.navbuttonshadowcolor, config.navbuttonshadowcolora, config.navbuttonshadowblur)
        }
        if (config.navbuttonbackcolor) {
            ret += "background-color:" + format_color(config.navbuttonbackcolor) + ";"
        }
        return ret
    };
    var get_button_bar_button_size = function(config) {
        if (!config.buttonbariconrealsize) {
            return {
                buttonWidth: 38,
                padding: 8
            }
        }
        return {
            buttonWidth: 2 * config.buttonbariconrealsize,
            padding: 8
        }
    };
    var get_popup_position_string = function(width, height) {
        var result = "height=" + height + ",width=" + width;
        return result
    };
    var getMsPointerXy = function(e) {
        var len = e.touches ? e.touches.length : 0;
        var x = -1,
            y = -1;
        if (len > 0) {
            x = e.touches[0].screenX;
            y = e.touches[0].screenY
        }
        if (len > 1) {
            x = e.touches[1].screenX;
            y = e.touches[1].screenY
        }
        if (len <= 0 && e.pointerType == "touch") {
            x = e.clientX;
            y = e.clientY
        }
        return {
            x: x,
            y: y
        }
    };
    var is_buttonbarposition_default = function(cfg) {
        var bbpos = cfg.buttonbarposition.toUpperCase();
        if (bbpos != "TOP" && bbpos != "NONE" && bbpos != "OVERLAY_IMAGE") {
            return true
        }
        return false
    };
    var is_captionposition_default = function(cfg) {
        var cappos = cfg.captionposition.toUpperCase();
        if (cappos != "BOTTOM" && cappos != "NONE" && cappos != "OVERLAY" && cappos != "BELOW_IMAGE" && cappos != "BELOW_THUMBS") {
            return true
        }
        return false
    };
    var is_touchable_desktop = function() {
        if ((window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && is_ie_touch()) {
            return true
        }
        return false
    };
    var is_touchable_device = function(config) {
        if (is_swipable_device() || is_touchable_desktop() || (config && config.forcetouchmode)) {
            return true
        }
        return false
    };
    var init_components = function(featureInstances, cplist) {
        cplist = cplist.replace(/ /g, "");
        var cps = cplist.split(",");
        for (var i = 0; i < cps.length; i++) {
            if (featureInstances[cps[i]] && featureInstances[cps[i]].init) {
                featureInstances[cps[i]].init()
            }
        }
        return false
    };
    var setup_components_event = function(featureInstances, cplist) {
        cplist = cplist.replace(/ /g, "");
        var cps = cplist.split(",");
        for (var i = 0; i < cps.length; i++) {
            if (featureInstances[cps[i]] && featureInstances[cps[i]].setEvent) {
                featureInstances[cps[i]].setEvent()
            }
        }
        return false
    };
    var set_components_position = function(featureInstances, cplist, sizing) {
        cplist = cplist.replace(/ /g, "");
        var cps = cplist.split(",");
        for (var i = 0; i < cps.length; i++) {
            if (featureInstances[cps[i]] && featureInstances[cps[i]].setPosition) {
                featureInstances[cps[i]].setPosition(sizing)
            }
        }
        return false
    };
    var reppaint_components = function(featureInstances, cplist, delay, cb) {
        cplist = cplist.replace(/ /g, "");
        var cps = cplist.split(",");
        for (var i = 0; i < cps.length; i++) {
            if (featureInstances[cps[i]] && featureInstances[cps[i]].repaint) {
                featureInstances[cps[i]].repaint(delay)
            }
        }
        if (delay && cb) {
            window.setTimeout(function() {
                cb()
            }, delay)
        }
        return false
    };
    var show_hide_controls = function(control, show, delay) {
        if (delay) {
            control.stop(false, true);
            if (show) {
                if (!control.is(":visible") || control.css("opacity") == 0 || is_swipable_device()) {
                    if (is_android()) {
                        control.css({
                            opacity: 1
                        }).show()
                    } else {
                        control.fadeIn(delay)
                    }
                }
            } else {
                control.fadeOut(delay)
            }
            return
        }
        if (show) {
            control.css("opacity", 1).show()
        } else {
            control.hide()
        }
    };
    var ios_version = function() {
        var m = navigator.userAgent.match(/OS \d+_/g);
        if (!m) {
            return 0
        }
        return parseFloat(m[0].replace(/OS /g, ""))
    };
    var is_mac_os = function() {
        if (navigator.userAgent.match(/Mac OS X/i)) {
            return true
        }
        return false
    };
    var is_retina_display = function() {
        var dpr = 1;
        if (window.devicePixelRatio !== undefined) {
            dpr = window.devicePixelRatio
        }
        return dpr > 1.5
    };
    var is_safari = function() {
        return !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
    };
    var get_css3_prefix = function() {
        var spt = false;
        var pfx = "";
        if (is_firefox3()) {} else {
            if (is_firefox()) {
                spt = true;
                if ($.browser.version < 26) {
                    pfx = "-moz-"
                }
            } else {
                if (is_chrome()) {
                    spt = true;
                    if ($.browser.version < 33) {
                        pfx = "-webkit-"
                    }
                } else {
                    if (is_opera()) {
                        spt = true;
                        if ($.browser.version < 12) {
                            pfx = "-o-"
                        }
                    } else {
                        if (($.browser.msie && $.browser.version >= 10) || document.msFullscreenEnabled) {
                            spt = true
                        }
                    }
                }
            }
        }
        return {
            support: spt,
            prefix: pfx
        }
    };
    var clean_up_transition = function(jqobj, css3Info) {
        if (!jqobj) {
            return
        }
        if (!css3Info) {
            css3Info = get_css3_prefix()
        }
        var css3 = {};
        if (css3Info.support) {
            css3[css3Info.prefix + "transition"] = "";
            jqobj.css(css3)
        }
    };
    var slidingTimer = {};
    var currentAnimationObjs;
    var slide = function(cnfg, jqobj, dist, speed, timerIdx, cb) {
        var css3Info = get_css3_prefix();
        var css3 = {};
        clean_up_transition(jqobj, css3Info);
        if (!css3Info.support) {
            imgs.animate({
                left: (dist < 0 ? "-=" : "+=") + (Math.abs(dist)),
                avoidTransforms: !cnfg.use_webkit_transform,
                useTranslate3d: cnfg.use_3d_transform
            }, speed, "easeInOutQuart")
        } else {
            css3[css3Info.prefix + "transition"] = "left " + parseInt(speed) + "ms ease-in";
            jqobj.css(css3);
            window.setTimeout(function() {
                jqobj.each(function() {
                    var crntobj = $(this);
                    crntobj.css({
                        left: parseInt(crntobj.css("left")) + dist
                    })
                })
            }, 100)
        }
        if (!timerIdx) {
            timerIdx = "default"
        }
        if (slidingTimer[timerIdx]) {
            window.clearTimeout(slidingTimer[timerIdx]);
            clean_up_transition(currentAnimationObjs, css3Info);
            currentAnimationObjs.stop(false, true)
        }
        currentAnimationObjs = jqobj;
        if (cb && speed) {
            slidingTimer[timerIdx] = window.setTimeout(function() {
                slidingTimer[timerIdx] = 0;
                cb()
            }, speed + 10)
        }
    };
    var fadeInContext = {};
    var fadeOutContext = {};
    var stop_fading_in = function(jqobj, idx, finishFunction) {
        var css3Info = get_css3_prefix();
        if (!jqobj) {
            jqobj = fadeInContext[idx].object
        }
        if (!jqobj) {
            return
        }
        clean_up_transition(jqobj, css3Info);
        if (fadeInContext[idx].timer || fadeInContext[idx].starttimer) {
            window.clearTimeout(fadeInContext[idx].starttimer);
            fadeInContext[idx].starttimer = 0;
            window.clearTimeout(fadeInContext[idx].timer);
            fadeInContext[idx].timer = 0;
            fadeInContext[idx].object.css({
                opacity: 1
            }).show();
            if (finishFunction && fadeInContext[idx].callback) {
                fadeInContext[idx].callback()
            }
        }
    };
    var stop_fading_out = function(jqobj, idx, finishFunction) {
        var css3Info = get_css3_prefix();
        if (!jqobj) {
            jqobj = fadeOutContext[idx].object
        }
        if (!jqobj) {
            return
        }
        clean_up_transition(jqobj, css3Info);
        if (fadeOutContext[idx].timer) {
            window.clearTimeout(fadeOutContext[idx].timer);
            fadeOutContext[idx].timer = 0;
            fadeOutContext[idx].object.hide();
            if (finishFunction && fadeOutContext[idx].callback) {
                fadeOutContext[idx].callback()
            }
        }
    };
    var stop_fading = function(idx, finishFunction) {
        if (!idx) {
            idx = "default"
        }
        if (fadeInContext[idx]) {
            stop_fading_in(null, idx, finishFunction)
        }
        if (fadeOutContext[idx]) {
            stop_fading_out(null, idx, finishFunction)
        }
    };
    var fade_in = function(cnfg, jqobj, speed, alreadyVisible, cb, idx, finishFunctionIfCanceled) {
        if (!idx) {
            idx = "default"
        }
        if (!fadeInContext[idx]) {
            fadeInContext[idx] = {}
        }
        stop_fading_in(jqobj, idx, finishFunctionIfCanceled);
        var css3Info = get_css3_prefix();
        var css3 = {};
        clean_up_transition(jqobj, css3Info);
        if (!speed) {
            jqobj.css({
                opacity: 1
            });
            jqobj.show()
        } else {
            if (!alreadyVisible && is_android()) {
                jqobj.fadeIn(speed)
            } else {
                if (alreadyVisible) {
                    jqobj.css({
                        opacity: 0
                    })
                } else {
                    jqobj.css({
                        opacity: 0,
                        display: "block"
                    })
                }
                fadeInContext[idx].object = jqobj;
                if (!css3Info.support) {
                    if (is_safari()) {
                        jqobj.fadeIn(speed)
                    } else {
                        jqobj.animate({
                            opacity: "+=1",
                            avoidTransforms: !cnfg.use_webkit_transform,
                            useTranslate3d: cnfg.use_3d_transform
                        }, speed, "easeInOutQuart", null)
                    }
                } else {
                    css3[css3Info.prefix + "transition"] = "opacity " + parseInt(speed) + "ms ease-in";
                    jqobj.css(css3);
                    fadeInContext[idx].starttimer = window.setTimeout(function() {
                        fadeInContext[idx].starttimer = 0;
                        jqobj.css({
                            opacity: 1
                        })
                    }, 50)
                }
            }
            if (cb) {
                fadeInContext[idx].callback = cb;
                fadeInContext[idx].timer = window.setTimeout(function() {
                    fadeInContext[idx].timer = 0;
                    cb()
                }, speed + 10)
            }
        }
    };
    var fade_out = function(cnfg, jqobj, speed, cb, idx, finishFunctionIfCanceled) {
        if (!jqobj.is(":visible")) {
            return
        }
        if (!idx) {
            idx = "default"
        }
        if (!fadeOutContext[idx]) {
            fadeOutContext[idx] = {}
        }
        stop_fading_out(jqobj, idx, finishFunctionIfCanceled);
        if (cb) {
            fadeOutContext[idx].callback = cb
        }
        fadeOutContext[idx].object = jqobj;
        var css3Info = get_css3_prefix();
        if (!speed) {
            jqobj.hide()
        } else {
            if (!css3Info.support) {
                if (is_safari() || ($.browser.msie && $.browser.version <= 9)) {
                    jqobj.fadeOut(speed)
                } else {
                    jqobj.animate({
                        opacity: "-=0",
                        avoidTransforms: !cnfg.use_webkit_transform,
                        useTranslate3d: cnfg.use_3d_transform
                    }, speed, "easeInOutQuart", null)
                }
                fadeOutContext[idx].timer = fadeOutContext[idx].timer = window.setTimeout(function() {
                    jqobj.hide();
                    fadeOutContext[idx].timer = 0;
                    if (cb) {
                        cb()
                    }
                }, speed)
            } else {
                var css3 = {};
                css3[css3Info.prefix + "transition"] = "opacity " + parseInt(speed) + "ms ease-in";
                jqobj.css(css3);
                window.setTimeout(function() {
                    jqobj.css({
                        opacity: 0
                    });
                    fadeOutContext[idx].timer = window.setTimeout(function() {
                        fadeOutContext[idx].timer = 0;
                        jqobj.hide();
                        if (cb) {
                            cb()
                        }
                    }, speed + 10)
                }, 20)
            }
        }
    };
    var get_transition_style = function(speed) {
        if (speed <= 0 || !speed) {
            return ""
        }
        var css3Info = get_css3_prefix();
        if (!css3Info.support) {
            return ""
        }
        return css3Info.prefix + "transition:opacity " + +parseInt(speed) + "ms ease-in;"
    };
    var is_iphone_6_plus_need_repaint = function(isFullScreen) {
        if (!isFullScreen) {
            return false
        }
        if (!is_iphone()) {
            return false
        }
        if (window.innerHeight > 370 && window.innerWidth > 730) {
            return true
        }
        return false
    };
    var is_ie_edge = function() {
        if (navigator.userAgent.match(/Windows/i) && navigator.userAgent.match(/Edge/i)) {
            return true
        }
        return false
    };
    return {
        ship: window.location.href.toLowerCase().indexOf("j1u1i1c1e1b1o1x1.1n1e1t".replace(/1/g, "")) >= 0 || window.location.href.toLowerCase().indexOf("s2h2o2w2k2a2s2e2.2n2e2t".replace(/2/g, "")) >= 0,
        concate_path: concatenate_path,
        is_page_scrolling: is_it_scrolling,
        is_in_iframe: in_iframe,
        add_viewport_meta_tag_4_device: add_viewport_meta,
        set_viewport_meta: set_viewport_meta,
        is_iphone: is_iphone,
        is_iphone_chrome: is_iphone_chrome,
        is_ipad: is_ipad,
        is_android: is_android,
        is_small_android: is_small_android,
        get_android_ver: get_android_ver,
        is_chrome: is_chrome,
        is_opera: is_opera,
        get_current_path: get_current_path,
        get_query_string_value: get_qs_value,
        save_object_2_cookie: save_object_2_cookie,
        get_object_from_cookie: get_object_from_cookie,
        get_device_dpi: get_device_dpi,
        get_query_path: get_query_path,
        is_swipable_device: is_swipable_device,
        is_large_screen_mode: is_large_screen_mode,
        is_earlier_ie: is_earlier_ie,
        set_viewport_value: set_viewport_value,
        format_color: format_color,
        need_viewport_meta: need_viewport_meta,
        host_has_viewport_meta: host_has_viewport_meta,
        get_viewport_meta_content: get_viewport_meta_content,
        set_viewport_meta_content: set_viewport_meta_content,
        is_firefox: is_firefox,
        is_firefox3: is_firefox3,
        get_js_folder_url: get_js_folder_url,
        need_new_window: need_new_window,
        convert_to_absolute_path: convert_to_absolute_path,
        is_adobe_air: is_adobe_air,
        is_new_expanded_window: is_new_expanded_window,
        show_real_fullscreen: show_real_fullscreen,
        is_in_real_fullscreen: is_in_real_fullscreen,
        exit_fullscreen: exit_fullscreen,
        exit_support_real_fullscreen: exit_support_real_fullscreen,
        add_fullscreen_listener: add_fullscreen_listener,
        is_ie8: is_ie8,
        is_mobile_ie: is_mobile_ie,
        support_real_fullscreen: support_real_fullscreen,
        is_side_layout: is_side_layout,
        add_font_icon_4_ie8: add_font_icon_4_ie8,
        get_button_bar_icon_style: get_button_bar_icon_style,
        get_button_bar_style: get_button_bar_style,
        get_nav_icon_style: get_nav_icon_style,
        get_nav_btn_size: get_nav_btn_size,
        get_nav_btn_size_style: get_nav_btn_size_style,
        get_shadow_style_string: get_shadow_style_string,
        add_js_tag: add_js_tag,
        get_button_bar_button_size: get_button_bar_button_size,
        get_thumb_size: get_thumb_size,
        get_popup_position_string: get_popup_position_string,
        get_text_shadow_style: get_text_shadow_style,
        getMsPointerXy: getMsPointerXy,
        is_touchable_desktop: is_touchable_desktop,
        is_buttonbarposition_default: is_buttonbarposition_default,
        is_captionposition_default: is_captionposition_default,
        is_touchable_device: is_touchable_device,
        setup_components_event: setup_components_event,
        reppaint_components: reppaint_components,
        init_components: init_components,
        show_hide_controls: show_hide_controls,
        set_components_position: set_components_position,
        is_retina_display: is_retina_display,
        ios_version: ios_version,
        is_ie_after_11: is_ie_after_11,
        is_ios_mobile_chrome: is_ios_mobile_chrome,
        is_windows: is_windows,
        fade_in: fade_in,
        fade_out: fade_out,
        is_mac_os: is_mac_os,
        get_transition_style: get_transition_style,
        clean_up_transition: clean_up_transition,
        slide: slide,
        stop_fading: stop_fading,
        is_iphone_6_plus_need_repaint: is_iphone_6_plus_need_repaint,
        is_ie_touch: is_ie_touch,
        is_complete_touch: is_complete_touch,
        is_mobile_ie_10: is_mobile_ie_10,
        is_mobile_ie_after_11: is_mobile_ie_after_11,
        is_ie_metro_mode: is_ie_metro_mode,
        is_safari: is_safari,
        isEmbeddedMode: has_other_content,
        is_ios: is_ios,
        is_ie_edge: is_ie_edge
    }
};
var juicebox_config_manager = function(c, x) {
    var z = c;
    var a = x;
    var f = false;
    var w = "048d7e421a02974b54391bc3463ebd52";
    var F = false;
    var t = "";
    var b = "";
    var D = {
        containerid: "juicebox-container",
        debugmode: false,
        usepassword: false,
        rememberpassword: true,
        forcetouchmode: false,
        usefullscreenexpand: false,
        autofullscreenexpand: false,
        expandinnewpage: "AUTO",
        gallerywidth: "100%",
        galleryheight: "100%",
        backgroundcolor: "",
        backgroundurl: "",
        backgroundscale: "STRETCH",
        expandedbackgroundcolor: "",
        expandedbackgroundcoloropacity: "1",
        galleryfontface: "",
        backgroundopacity: "1",
        textcolor: "",
        textshadowcolor: "",
        textshadowcolora: "",
        topbackcolor: "",
        topbackopacity: "0",
        captionbackcolor: "",
        captionbackopacity: "1",
        captionbacktopcolor: "rgba(0,0,0,0)",
        captionbacktopcoloropacity: 0,
        imageframecolor: "",
        imageframeopacity: "1",
        thumbframecolor: "rgba(255, 255, 255, .5)",
        thumbframeopacity: "",
        thumbframewidth: 0,
        thumbhoverframewidth: 2,
        thumbselectedframewidth: 10,
        thumbcornerradius: 0,
        thumbshadowcolor: "rgba(0, 0, 0, .4)",
        thumbshadowcolora: "",
        thumbshadowblur: 5,
        imageshadowcolor: "rgba(0, 0, 0, .4)",
        imageshadowcolora: "",
        imageshadowblur: 10,
        stagepadding: 0,
        imagepadding: 0,
        framewidth: 0,
        enablekeyboardcontrols: true,
        firstimageindex: -1,
        randomizeimages: false,
        showpreloader: true,
        screenmode: "AUTO",
        languagelistall: 'Previous|Next|Start AutoPlay|Stop AutoPlay|Play Audio|Pause Audio|Show Thumbnails|Expand Gallery|Close Gallery|Open Image in New Window|Download Image|About|AutoPlay ON|AutoPlay OFF|Show Thumbnails|Hide Thumbnails|Show Information|Next Image|Previous Image|Hide Information|Juicebox can not display locally in this browser. <a href="http://www.juicebox.net/support/faq/#local">More Info.</a>|Juicebox Error: Config file not found.|Juicebox Error: Cannot find div with id: "|"|Juicebox Error: Theme CSS file not found|Buy this Image|Share on Facebook|Share on Twitter|Share on Google+|Share on Pinterest|To use Fotomoto please set the Fotomoto Store Id|Share on Tumblr|Go Back|of|Images|Send Email|Download|Password|Incorrect Password.|Regarding image|in gallery',
        languagelist: "",
        splashbuttontext: "View Gallery",
        imagelocking: false,
        enablelooping: false,
        changeimageonhover: false,
        imageclickmode: "NAVIGATE",
        imagescalemode: "SCALE_DOWN",
        imagepreloading: "PAGE",
        imagetransitiontime: 0.3,
        fadetime: 0.4,
        dialogfadetime: 0.3,
        imagetransitiontype: "FADE",
        imagevalign: "CENTER",
        imagehalign: "CENTER",
        showimageoverlay: "AUTO",
        showimagenav: "HOVER",
        imagenavposition: "IMAGE",
        showbigplaybutton: false,
        inactivitytimeout: 4,
        thumbsposition: "BOTTOM",
        thumbnavposition: "CENTER",
        thumbwidth: 85,
        thumbheight: 85,
        thumbpadding: 10,
        thumbhseparation: 10,
        thumbvseparation: 10,
        thumbsvalign: "CENTER",
        thumbshalign: "CENTER",
        thumbpreloading: "PAGE",
        changecaptiononhover: false,
        usethumbdots: false,
        thumbdotcolor: "rgba(0, 0, 0, .4)",
        thumbdothovercolor: "rgba(255,255,255,1)",
        showpagingtext: false,
        showsmallpagingtext: true,
        showsmallthumbnav: false,
        showsmallthumbsbutton: true,
        smallthumbsshowtitles: false,
        smallthumbslidetime: 0.5,
        topareaheight: 50,
        buttonbarposition: "OVERLAY",
        buttonbarhalign: "RIGHT",
        showopenbutton: true,
        showdownloadbutton: false,
        showexpandbutton: true,
        originalshowexpandbutton: true,
        showinfobutton: false,
        showsharebutton: true,
        shownavbuttons: false,
        showautoplaybutton: false,
        showaudiobutton: false,
        showthumbsbutton: true,
        showthumbsonload: true,
        showsmallthumbsonload: true,
        buttonbariconsize: 0,
        buttonbariconrealsize: 0,
        buttonbariconcolor: "",
        buttonbariconopacity: "",
        buttonbariconhovercolor: "",
        buttonbariconhoveropacity: "",
        buttonbarshadowcolor: "",
        buttonbarshadowcolora: "",
        buttonbarshadowblur: 5,
        buttonbarbackcolor: "",
        buttonbarbackopacity: "1",
        navbuttoniconsize: 0,
        navbuttoniconrealsize: 0,
        navbuttoniconcolor: "rgba(255, 255, 255, 1)",
        navbuttoniconopacity: "",
        navbuttoniconhovercolor: "",
        navbuttoniconhoveropacity: "",
        navbuttonshadowcolor: "",
        navbuttonshadowcolora: "",
        navbuttonshadowblur: 5,
        navbuttonbackcolor: "rgba(0, 0, 0, .4)",
        navbuttonbackcoloropacity: "",
        imagenavpadding: 20,
        imagecornerradius: 0,
        showoverlayonload: true,
        gallerytitle: "",
        gallerytitleposition: "OVERLAY",
        gallerytitlehalign: "LEFT",
        captionposition: "OVERLAY_IMAGE",
        captionhalign: "LEFT",
        maxcaptionheight: 120,
        showimagenumber: true,
        enableautoplay: false,
        autoplayonload: false,
        displaytime: 5,
        showautoplaystatus: true,
        gonextonautoplay: false,
        autoplaythumbs: true,
        autohidethumbs: false,
        audiourlmp3: "",
        loopaudio: true,
        playaudioonload: false,
        audiovolume: 0.8,
        showsmallbackbutton: false,
        backbuttonuseicon: false,
        backbuttontext: "< Back",
        backbuttonurl: "",
        backbuttonposition: "NONE",
        backbuttonhalign: "LEFT",
        usefixedlayout: false,
        showsplashpage: "AUTO",
        splashtitle: "",
        splashimageurl: "",
        splashshowimagecount: true,
        gallerydescription: "",
        enableseo: false,
        seoadditionaltext: "",
        enabledirectlinks: false,
        fotomotostoreid: "",
        sharefacebook: false,
        sharetwitter: false,
        sharegplus: false,
        sharepinterest: false,
        sharetumblr: false,
        showemailbutton: false,
        emailaddress: "",
        emailsubject: "Juicebox Gallery Inquiry",
        configurl: "config.xml",
        themeurl: "/static/photo-gallery/jbcore/classic/theme.css",
        baseurl: "",
        useflickr: false,
        flickrusername: "",
        flickrtags: "",
        flickruserid: "",
        flickrsetid: "",
        flickrgroupid: "",
        flickrtagmode: "ALL",
        flickrsort: "DATE-POSTED-DESC",
        flickrimagesize: "LARGE",
        flickrimagecount: 50,
        flickrextraparams: "",
        flickrshowtitle: true,
        flickrshowdescription: false,
        flickrshowpagelink: false,
        flickrpagelinktext: "View on Flickr",
        theme: "classic",
        showcaption: true,
        slidecaption: false,
        maxthumbcolumns: 10,
        maxthumbrows: 1,
        thumb_load_placeholder: "<div class='jb-status-thumb-loading'><div>",
        main_load_placeholder: "<div class='jb-status-loading'></div>",
        pages_header: "",
        sync_caption_dimensions: true,
        minimagegap: 60,
        use_webkit_transform: true,
        use_3d_transform: !(a.is_in_iframe() && a.is_chrome()),
        onload: function() {}
    };
    var R = z.extend({}, D);
    var L = ",onload,";
    var v = ",containerid,gallerytitle,gallerywidth,galleryheight,backgroundcolor,overlaycolor,framecolor,showopenbutton,showexpandbutton,useflickr,flickrusername,flickrtags,configurl,themeurl,baseurl,debugmode,showthumbsbutton,languagelist,usefullscreenexpand,textcolor,thumbframecolor,usethumbdots,";
    var r = {
        showthumbsonload: {
            appliedValues: [false],
            "default": true
        },
        showthumbsbutton: {
            appliedValues: [false],
            "default": true
        },
        usethumbdots: {
            appliedValues: [true],
            "default": false
        },
        captionposition: {
            exceptionalValues: ["NONE"],
            appliedValues: null,
            "default": "OVERLAY"
        },
        captionhalign: {
            appliedValues: ["CENTER", "RIGHT"],
            "default": "LEFT"
        },
        buttonbarposition: {
            appliedValues: ["TOP"],
            "default": "OVERLAY"
        },
        backbuttonposition: {
            appliedValues: ["TOP", "OVERLAY"],
            "default": "NONE"
        },
        backbuttonhalign: {
            appliedValues: ["RIGHT", "CENTER"],
            "default": "LEFT"
        },
        stagepadding: {
            appliedValues: null,
            "default": 0
        },
        imagepadding: {
            appliedValues: null,
            "default": 0
        },
        framewidth: {
            appliedValues: null,
            "default": 0
        },
        topbackcolor: {
            appliedValues: null,
            "default": ""
        },
        thumbsposition: {
            appliedValues: ["TOP", "LEFT", "RIGHT"],
            "default": "BOTTOM"
        },
        thumbnavposition: {
            appliedValues: ["BOTTOM"],
            "default": "CENTER"
        },
        imageframecolor: {
            appliedValues: null,
            "default": ""
        },
        imagetransitiontype: {
            appliedValues: null,
            "default": "FADE"
        },
        changeimageonhover: {
            appliedValues: [true],
            "default": false
        },
        gallerytitleposition: {
            appliedValues: ["TOP", "ABOVE_THUMBS"],
            "default": "OVERLAY"
        },
        gallerytitlehalign: {
            appliedValues: ["RIGHT", "CENTER"],
            "default": "LEFT"
        },
        buttonbarhalign: {
            appliedValues: ["CENTER", "LEFT"],
            "default": "RIGHT"
        },
        thumbshalign: {
            appliedValues: ["RIGHT", "LEFT"],
            "default": "CENTER"
        },
        thumbsvalign: {
            appliedValues: ["TOP", "BOTTOM"],
            "default": "CENTER"
        },
        imagehalign: {
            appliedValues: ["RIGHT", "LEFT"],
            "default": "CENTER"
        },
        imagevalign: {
            appliedValues: ["TOP", "BOTTOM"],
            "default": "CENTER"
        }
    };
    var o = {
        showimagenav: {
            appliedValues: [true, false],
            mappedValues: ["HOVER", "NEVER"]
        }
    };
    var Q = function(S) {
        if (!S) {
            return "100%"
        }
        if (typeof(S) === "number" || S.indexOf("%") <= 0) {
            return parseInt(S) + "px"
        }
        return S
    };
    var J = function(U, T) {
        if (!U) {
            return T
        }
        var S = U.split("#")[0].split("?")[0].split("/");
        if (S.length <= 0) {
            return T
        }
        if (S.length <= 1) {
            return ""
        }
        if (S[S.length - 1].toLowerCase().indexOf("theme.css") < 0) {
            return T
        }
        return S[S.length - 2]
    };
    var m = function(T, S, V, U) {
        if (U) {
            return U
        }
        if (!T || T.length <= S) {
            return V
        }
        return T[S]
    };
    var y = function(U, T, S, W, V) {
        if (!W && D.languagelistall[U]) {
            W = D.languagelistall[U]
        }
        D.languagelistall[U] = m(T, S, W, V)
    };
    var p = function(U, S) {
        if (!S || !U) {
            return false
        }
        for (var T = 0; T < S.length; T++) {
            if (typeof(U) === "string") {
                if (S[T].toUpperCase() === U.toUpperCase()) {
                    return true
                }
            } else {
                if (S[T] === U) {
                    return true
                }
            }
        }
        return false
    };
    var e = function(U, S, T) {
        if (T && p(U, T)) {
            return false
        }
        if (!S) {
            return true
        }
        return p(U, S)
    };
    var g = function(S) {
        switch (S.toLowerCase()) {
            case "true":
            case "yes":
            case "1":
                return true;
            case "false":
            case "no":
            case "0":
            case null:
                return false;
            default:
                return S
        }
    };
    var M = function(T) {
        if (!T) {
            return null
        }
        for (var V in T) {
            if (!o[V]) {
                continue
            }
            if (!o[V].appliedValues) {
                T[V] = o[V].mappedValues[0];
                continue
            }
            for (var S = 0; S < o[V].appliedValues.length; S++) {
                var U = typeof(o[V].appliedValues[S]);
                if (U === "string") {
                    if (o[V].appliedValues[S].toUpperCase() === (T[V] + "").toUpperCase()) {
                        T[V] = o[V].mappedValues[S];
                        break
                    }
                } else {
                    if (U == "boolean") {
                        if (o[V].appliedValues[S] === g(T[V] + "")) {
                            T[V] = o[V].mappedValues[S];
                            break
                        }
                    } else {
                        if (o[V].appliedValues[S] == T[V]) {
                            T[V] = o[V].mappedValues[S];
                            break
                        }
                    }
                }
            }
        }
        return T
    };
    var H = function() {
        if (D.showexpandbutton == false) {
            D.originalUsefullscreenexpand = D.usefullscreenexpand;
            D.usefullscreenexpand = false
        } else {
            if (a.is_android() && a.support_real_fullscreen()) {
                D.usefullscreenexpand = true;
                D.originalUsefullscreenexpand = true
            } else {
                if (a.is_iphone()) {
                    if (D.usefullscreenexpand) {
                        D.usefullscreenexpand = false
                    }
                }
            }
        }
        if (D.imagetransitiontime <= 0) {
            D.imagetransitiontime = 0.001
        }
        if (D.audiovolume < 0) {
            D.audiovolume = 0
        }
        if (D.audiovolume > 1) {
            D.audiovolume = 1
        }
        if (!D.showpreloader) {
            D.main_load_placeholder = D.main_load_placeholder.replace("jb-status-loading", "jb-status-no-loading")
        }
        if (D.backbuttonuseicon) {
            D.backbuttontext = " "
        }
        D.galleryfontface = decodeURI(D.galleryfontface).replace(/\+/g, " ").replace(/\"/g, "'");
        if (a.is_ios() || D.useflickr) {
            D.showdownloadbutton = false
        }
        if (a.is_touchable_device()) {
            D.autohidethumbs = false
        }
        var U = D.thumbsposition.toUpperCase();
        if (U === "LEFT" || U === "RIGHT") {
            D.usethumbdots = false
        }
        var T = a.is_large_screen_mode(D);
        if (T) {
            D.showsmallbackbutton = false;
            if (D.autohidethumbs) {
                D.showthumbsbutton = false
            }
            return
        }
        for (var S in D) {
            if (!r[S]) {
                continue
            }
            if (!e(D[S], r[S].appliedValues, r[S].exceptionalValues)) {
                continue
            }
            D[S] = r[S]["default"]
        }
        if (a.is_swipable_device()) {
            if (D.forcetouchmode) {
                D.forcetouchmodereversed = true
            }
            D.forcetouchmode = false
        }
        D.thumbselectedframewidth = D.thumbframewidth;
        if (D.showsmallbackbutton) {
            D.backbuttonposition = "OVERLAY"
        }
    };
    var h = function() {
        if (typeof(D.languagelistall) != "string" && !D.languagelist) {
            return
        }
        var W = D.languagelist.split("|");
        D.languagelistbak = D.languagelist;
        D.languagelist = "";
        var S = W.length;
        var T = 7;
        var V = 30;
        if (q()) {
            if (S - V > 0) {
                W.splice(V, S - V)
            }
        } else {
            if (S - T > 0) {
                W.splice(V, S - T)
            }
        }
        var U = null;
        if (typeof(D.languagelistall) === "string") {
            U = D.languagelistall.split("|");
            D.languagelistall = {}
        }
        y("p", U, 0, "");
        y("n", U, 1, "");
        y("strta", U, 2, "", W[12]);
        y("stpa", U, 3, "", W[13]);
        y("plya", U, 4, "", W[8]);
        y("psa", U, 5, "", W[9]);
        y("st", U, 6, "", W[0]);
        y("gf", U, 7, "", W[2]);
        y("ef", U, 8, "", W[3]);
        y("oiinw", U, 9, "", W[4]);
        y("di", U, 10, "");
        y("abt", U, 11, "");
        y("aon", U, 12, "", W[14]);
        y("aoff", U, 13, "", W[15]);
        y("stlsm", U, 14, "", W[0]);
        y("htlsm", U, 15, "", W[1]);
        y("sinfo", U, 16, "", W[10]);
        y("gonxt", U, 17, "", W[6]);
        y("goprv", U, 18, "", W[7]);
        y("hdinfo", U, 19, "", W[11]);
        y("lcchm", U, 20, "");
        y("ae", U, 21, "");
        y("noid01", U, 22, "");
        y("noid02", U, 23, "");
        y("nothm", U, 24, "");
        y("fotomoto", U, 25, "", W[17]);
        y("facebook", U, 26, "", W[18]);
        y("twitter", U, 27, "", W[19]);
        y("gplus", U, 28, "", W[20]);
        y("printerest", U, 29, "", W[21]);
        y("fotomotomissingid", U, 30, "");
        y("tumblr", U, 31, "", W[22]);
        y("gobk", U, 32, "", W[16]);
        y("pgnum", U, 33, "", W[23]);
        y("splimgs", U, 34, "", W[5]);
        y("email", U, 35, "", W[24]);
        y("download", U, 36, "", W[25]);
        y("pwd", U, 37, "", W[26]);
        y("wrongpwd", U, 38, "", W[27]);
        y("rgdimg", U, 39, "", W[28]);
        y("ingrly", U, 40, "", W[29])
    };
    var N = function() {
        D.galleryheight = Q(D.galleryheight);
        D.gallerywidth = Q(D.gallerywidth);
        D.theme = J(D.themeurl, D.theme);
        if (D.thumbwidth < 20 || D.thumbwidth > 600) {
            D.thumbwidth = 96
        }
        if (D.thumbheight < 20 || D.thumbheight > 600) {
            D.thumbheight = 96
        }
        h();
        var T;
        if (D) {
            if (D.backgroundcolor) {
                T = K(D.backgroundcolor);
                D.backgroundcolor = T.color;
                if (T.fullFormate) {
                    D.backgroundopacity = T.opacity
                }
            }
            if (D.expandedbackgroundcolor) {
                T = K(D.expandedbackgroundcolor);
                D.expandedbackgroundcolor = T.color;
                if (T.fullFormate) {
                    D.expandedbackgroundcoloropacity = T.opacity
                }
            }
            if (D.textcolor) {
                T = K(D.textcolor);
                D.textcolor = T.color
            }
            if (D.textshadowcolor) {
                if (D.textshadowcolor.replace(/ /g, "").toLowerCase() === "rgba(0,0,0,0)") {
                    D.textshadowcolora = "transparent";
                    b += "textshadowcolora,"
                } else {
                    T = K(D.textshadowcolor);
                    D.textshadowcolora = T.color
                }
            }
            if (D.topbackcolor) {
                T = K(D.topbackcolor);
                D.topbackcolor = T.color;
                if (T.fullFormate) {
                    D.topbackopacity = T.opacity
                }
            }
            if (D.captionbackcolor) {
                T = K(D.captionbackcolor);
                D.captionbackcolor = T.color;
                if (T.fullFormate) {
                    D.captionbackopacity = T.opacity
                }
            }
            if (D.captionbacktopcolor) {
                T = K(D.captionbacktopcolor);
                D.captionbacktopcolor = T.color;
                if (T.fullFormate) {
                    D.captionbacktopcoloropacity = T.opacity
                }
            }
            if (D.buttonbarbackcolor) {
                T = K(D.buttonbarbackcolor);
                D.buttonbarbackcolor = T.color;
                if (T.fullFormate) {
                    D.buttonbarbackopacity = T.opacity
                }
            }
            if (D.imageframecolor) {
                T = K(D.imageframecolor);
                D.imageframecolor = T.color;
                if (T.fullFormate) {
                    D.imageframeopacity = T.opacity
                }
            }
            if (D.thumbframecolor) {
                T = K(D.thumbframecolor);
                D.thumbframecolor = T.color;
                if (T.fullFormate) {
                    D.thumbframeopacity = T.opacity
                }
            }
            if (D.thumbshadowcolor) {
                T = K(D.thumbshadowcolor);
                D.thumbshadowcolora = T.color
            }
            if (D.imageshadowcolor) {
                T = K(D.imageshadowcolor);
                D.imageshadowcolora = T.color
            }
            if (D.buttonbariconcolor) {
                T = K(D.buttonbariconcolor);
                D.buttonbariconcolor = T.color;
                if (T.fullFormate) {
                    D.buttonbariconopacity = T.opacity
                }
            }
            if (D.buttonbariconhovercolor) {
                T = K(D.buttonbariconhovercolor);
                D.buttonbariconhovercolor = T.color;
                if (T.fullFormate) {
                    D.buttonbariconhoveropacity = T.opacity
                }
            }
            if (D.buttonbarshadowcolor) {
                T = K(D.buttonbarshadowcolor);
                D.buttonbarshadowcolora = T.color
            }
            if (D.navbuttoniconcolor) {
                T = K(D.navbuttoniconcolor);
                D.navbuttoniconcolor = T.color;
                if (T.fullFormate) {
                    D.navbuttoniconopacity = T.opacity
                }
            }
            if (D.navbuttoniconhovercolor) {
                T = K(D.navbuttoniconhovercolor);
                D.navbuttoniconhovercolor = T.color;
                if (T.fullFormate) {
                    D.navbuttoniconhoveropacity = T.opacity
                }
            }
            if (D.navbuttonbackcolor) {
                T = K(D.navbuttonbackcolor);
                D.navbuttonbackcolor = T.color;
                if (T.fullFormate) {
                    D.navbuttonbackcoloropacity = T.opacity
                }
            }
            if (D.navbuttonshadowcolor) {
                T = K(D.navbuttonshadowcolor);
                D.navbuttonshadowcolora = T.color
            }
            if (D.thumbdotcolor) {
                T = K(D.thumbdotcolor);
                D.thumbdotcolor = T.color
            }
            if (D.thumbdothovercolor) {
                T = K(D.thumbdothovercolor);
                D.thumbdothovercolor = T.color
            }
            if (D.buttonbariconsize === 0) {
                D.buttonbariconsize = 20
            }
            D.buttonbariconrealsize = D.buttonbariconsize;
            if (D.navbuttoniconsize === 0) {
                D.navbuttoniconsize = 20
            }
            D.navbuttoniconrealsize = D.navbuttoniconsize;
            if (window.location.href.toLowerCase().indexOf("http") !== 0) {
                D.usepassword = false
            }
            var S = a.is_large_screen_mode(D);
            if (b.indexOf("maxthumbrows,") < 0) {
                if (S) {
                    if (b.indexOf("screenmode,") > -1) {
                        D.maxthumbrows = 1
                    }
                }
            }
            if (S) {
                D.showsmallthumbsbutton = true;
                if (D.usethumbdots && D.maxthumbcolumns <= 1 && D.thumbnavposition.toUpperCase() === "BOTTOM") {
                    D.maxthumbcolumns = 2
                }
                D.thumbhseparation = D.thumbpadding / 2;
                D.thumbvseparation = D.thumbpadding / 2
            } else {
                D.showthumbsbutton = true;
                D.maxthumbcolumns = 1000;
                D.maxthumbrows = 1000;
                D.showpagingtext = D.showsmallpagingtext;
                if (b.indexOf("captionbacktopcolor,") < 0) {
                    T = K("rgba(0,0,0,0.3)");
                    D.captionbacktopcolor = T.color;
                    D.captionbacktopcoloropacity = T.opacity
                }
            }
            if (a.is_side_layout(D)) {
                if (D.thumbshalign.toUpperCase() != "CENTER") {
                    D.thumbshalign = "CENTER"
                }
            } else {
                if (D.thumbsvalign.toUpperCase() != "CENTER") {
                    D.thumbsvalign = "CENTER"
                }
            }
            if (a.is_in_iframe()) {
                D.fotomotostoreid = ""
            }
            if (a.is_swipable_device() || D.forcetouchmode) {
                D.buttonbariconhovercolor = "";
                D.navbuttoniconhovercolor = "";
                if (D.showimagenav.toUpperCase() != "ALWAYS") {
                    D.showimagenav = "NEVER"
                }
            }
            if (D.expandinnewpage === true || (D.expandinnewpage + "").toUpperCase() === "TRUE" || !a.support_real_fullscreen()) {
                D.usefullscreenexpand = false
            }
        }
    };
    var I = function(T) {
        var S = T.toString(16);
        if (S.length >= 2) {
            return S
        }
        if (S.length === 1) {
            return "0" + S
        }
        if (S.length === 0) {
            return "00"
        }
        return S
    };
    var i = function(S) {
        return S && parseInt(S, 16) > 0
    };
    var K = function(Z) {
        if (!Z) {
            return {
                color: "",
                opacity: E(1)
            }
        }
        var X = Z.toLowerCase().replace(/ /g, "");
        if (X.indexOf("rgb") !== 0) {
            if (i(Z)) {
                Z = "#" + Z
            }
            return {
                color: Z,
                opacity: E(1),
                fullFormate: false
            }
        }
        X = X.replace("rgba(", "").replace("rgb(", "").replace(")", "");
        var W = X.split(",");
        if (W.length < 3 || W.length > 4) {
            return {
                color: Z,
                opacity: E(1),
                fullFormate: false
            }
        }
        var T = Z;
        if (z.browser.msie && z.browser.version < 9) {
            var V = parseInt(W[0]);
            var U = parseInt(W[1]);
            var S = parseInt(W[2]);
            T = "#" + I(V) + I(U) + I(S)
        }
        if (W.length === 3) {
            return {
                color: T,
                opacity: E(1),
                fullFormate: true
            }
        }
        var Y = parseFloat(W[3]);
        if (Y < 0 || Y > 1) {
            return {
                color: T,
                opacity: E(1),
                fullFormate: true
            }
        }
        return {
            color: T,
            opacity: E(Y),
            fullFormate: true
        }
    };
    var E = function(S) {
        if (!(z.browser.msie && z.browser.version < 9)) {
            return S
        }
        if (("" + S).indexOf("filter") === 0) {
            return S
        }
        var T = z.browser.version < 8 ? 100 : parseInt(100 * S);
        return "filter:alpha(opacity=" + T + ")"
    };
    var q = function() {
        return f || u === "048d7e421a02974b54391bc3463ebd52"
    };
    var k = function(ab, W) {
        if (!ab) {
            return
        }
        ab = M(ab);
        var X, Y;
        var V = q();
        for (var Z in ab) {
            X = Z.toLowerCase();
            if (typeof D[X] == "undefined") {
                if (",persistor_param,fullscreen_displaying_mode,parent_gallery,initial_html_css_inline_style,initial_body_css_inline_style,scroll_position,".indexOf("," + X + ",") >= 0) {
                    D[X] = ab[X]
                }
                continue
            }
            Y = "," + X + ",";
            if (u === "048d7e421a20974d54321bc3563ebd52") {
                continue
            }
            if (!V && v.indexOf(Y) < 0) {
                continue
            }
            if (L.indexOf(Y) >= 0) {
                continue
            }
            var S = ab[Z];
            var aa = (typeof D[X]);
            if (aa === "string" && (typeof S) != "string") {
                S += ""
            }
            D[X] = n(X, B(S, aa));
            var U = R[X] + "";
            var T = D[X] + "";
            if (U.toLowerCase() == T.toLowerCase() && X != "captionbacktopcolor") {
                continue
            }
            if (!W) {
                b += X + ","
            }
        }
        N()
    };
    var u = "048d7e421a02974b54391bc3463ebd52";
    var B = function(T, S) {
        switch (S) {
            case "boolean":
                if (typeof T == "boolean") {
                    return T
                }
                return (T.toLowerCase() == "true" || T.toLowerCase() == "on" || T == "1") ? true : false;
            case "number":
                return parseFloat(T);
            default:
                return T
        }
    };
    var G = function() {
        var S = "";
        var W = ",gallerywidth,galleryheight,containerid,maxthumbrows,maxthumbcolumns,";
        var V, U;
        for (var T in D) {
            V = "," + T + ",";
            if (L.indexOf(V) >= 0) {
                continue
            }
            if (W.indexOf(V) >= 0) {
                continue
            }
            if (u === "048d7e421a20975d64321bc3563ebd52") {
                continue
            }
            U = (typeof D[T] == "string") ? D[T].replace("#", "_p-s_") : D[T];
            S += T + "=" + encodeURI(U) + "&"
        }
        return S
    };
    var n = function(S, T) {
        if (!S || S.toLowerCase() != "emailsubject") {
            return T
        }
        return decodeURIComponent(T)
    };
    var j = function() {
        var W = window.location.href.split("?");
        if (W.length <= 1) {
            return null
        }
        var S = W[1].split("#");
        if (S.length <= 0) {
            return null
        }
        var aa = S[0].split("&");
        var X = {};
        var Z, T, ab, V;
        var Y;
        for (var U = 0; U < aa.length; U++) {
            Z = aa[U].split("=");
            if (Z.length < 2) {
                continue
            }
            T = Z[0].toLowerCase();
            V = Z[1] ? Z[1].replace("_p-s_", "#") : "";
            ab = decodeURI(V);
            Y = typeof D[T];
            if (Y == "undefined") {
                continue
            }
            X[T] = n(T, B(ab, Y))
        }
        return X
    };
    var d = function(V) {
        if (!V) {
            V = t
        }
        var Y = function(ac, ad, ab) {
            if (ab < 0) {
                ab = "Thu, 01 Jan 1970 00:00:00 GMT"
            } else {
                ab = ""
            }
            document.cookie = ac + "=" + window.escape(ad) + ((ab === "") ? "" : ";expires=" + ab) + ";path=/"
        };
        var W = function(ac) {
            if (document.cookie.length > 0) {
                var ad = document.cookie.indexOf(ac + "=");
                if (ad !== -1) {
                    ad = ad + ac.length + 1;
                    var ab = document.cookie.indexOf(";", ad);
                    if (ab === -1) {
                        ab = document.cookie.length
                    }
                    return window.unescape(document.cookie.substring(ad, ab))
                }
            }
            return ""
        };
        var U = function() {
            return V + "svcrntimgi_lf"
        };
        var S = function() {
            return V + "-sv-config-"
        };
        var Z = function() {
            return V + "-changed-options-"
        };
        var T = function(ag) {
            Y(U(), "1", null);
            var af = b.split(",");
            var ae = ag.skip ? "," + ag.skip + "," : "";
            var ad;
            for (ad = 0; ad < af.length; ad++) {
                if (!af[ad]) {
                    continue
                }
                if (ae.indexOf("," + af[ad] + ",") >= 0) {
                    continue
                }
                Y(S() + af[ad], encodeURI(D[af[ad]]))
            }
            var ah = "," + b;
            var ab = ag.skip.split(",");
            for (ad = 0; ad < ab.length; ad++) {
                ah = ah.replace("," + ab[ad] + ",", ",")
            }
            for (var ac in ag.config) {
                if (!ac) {
                    continue
                }
                if (ah.indexOf("," + ac + ",") < 0) {
                    ah += ac + ","
                }
                D[ac] = ag.config[ac];
                Y(S() + ac, encodeURI(D[ac]))
            }
            Y(Z(), ah)
        };
        var X = function() {
            if (!W(U())) {
                return null
            }
            var af = W(Z());
            if (!af) {
                return null
            }
            var ad = {};
            var ab = af.split(",");
            for (var ac = 0; ac < ab.length; ac++) {
                if (!ab[ac]) {
                    continue
                }
                var ae = W(S() + ab[ac]);
                if (!ae) {
                    continue
                }
                D[ab[ac]] = B(decodeURI(ae), typeof(D[ab[ac]]));
                ad[ab[ac]] = D[ab[ac]]
            }
            h();
            return ad
        };
        var aa = function() {
            Y(U(), "", -10)
        };
        return {
            saveConfig: T,
            loadSavedConfig: X,
            clearCookie: aa
        }
    };
    var P = function(S, T, V) {
        if (window.location.href.indexOf("jbdbgmd=true") > 0 && F) {
            f = true
        }
        k(T, true);
        k(S);
        if (D.debugmode || f) {
            k(j())
        }
        t = V;
        var U = d(t);
        if (!a.is_new_expanded_window()) {
            U.clearCookie();
            return null
        } else {
            return U.loadSavedConfig()
        }
    };
    var C = function(ac) {
        if (!ac) {
            return null
        }
        var T = typeof(ac) == "string" ? JSON.parse(ac) : ac;
        var ad = {};
        var ab = "";
        for (var V in T) {
            var Z = V.toLowerCase();
            if (Z == "images") {
                ab = V;
                continue
            }
            ad[Z] = T[V]
        }
        if (!ab || !T[ab]) {
            return ad
        }
        var aa = [];
        for (var X = 0; X < T[ab].length; X++) {
            var U = {};
            for (var W in T[ab][X]) {
                var S = W.toLowerCase();
                var Y = "";
                switch (S) {
                    case "thumburl":
                        Y = "thumburl";
                        break;
                    case "imageurl":
                        Y = "imageurl";
                        break;
                    case "largeimageurl":
                        Y = "largeimageurl";
                        break;
                    case "smallimageurl":
                        Y = "smallimageurl";
                        break;
                    case "purchaseurl":
                        Y = "purchaseurl";
                        break;
                    case "linkurl":
                        Y = "linkurl";
                        break;
                    case "linktarget":
                        Y = "linktarget";
                        break;
                    case "title":
                        Y = "title";
                        break;
                    case "caption":
                        Y = "caption";
                        break;
                    default:
                        break
                }
                if (!Y) {
                    continue
                }
                U[Y] = T[ab][X][W]
            }
            aa.push(U)
        }
        ad.images = aa;
        return ad
    };
    var O = function(V) {
        if (!V) {
            return null
        }
        var U = {};
        var Y, W;
        var T = (z.browser.msie && V.childNodes.length > 1) ? V.childNodes[1] : V.childNodes[0];
        if (!T || !T.attributes) {
            return null
        }
        var X = z(T.attributes);
        X.each(function(Z, aa) {
            Y = aa.nodeName.toLowerCase();
            W = typeof D[Y];
            if (W == "undefined") {
                return
            }
            U[Y] = n(Y, B(aa.value, W))
        });
        var S = [];
        z(V).find("image").each(function() {
            var Z = z(this);
            var aa = {
                thumburl: Z.attr("thumbURL"),
                imageurl: Z.attr("imageURL"),
                largeimageurl: Z.attr("largeImageURL"),
                smallimageurl: Z.attr("smallImageURL"),
                purchaseurl: Z.attr("purchaseURL"),
                linkurl: Z.attr("linkURL"),
                linktarget: Z.attr("linkTarget"),
                title: Z.children("title").text(),
                caption: Z.children("caption").text()
            };
            S.push(aa)
        });
        U.images = S;
        return U
    };
    var s = function(T, S) {
        k(S);
        k(T);
        if (D.debugmode || f) {
            k(j())
        }
        H()
    };
    var l = function() {
        return D
    };
    var A = function(S) {
        k(S);
        if (D.showexpandbutton == false) {
            D.usefullscreenexpand = false
        } else {
            if (D.originalUsefullscreenexpand) {
                D.usefullscreenexpand = true
            }
        }
    };
    return {
        isp: jb4ddeemmooids[0].join("") === "j|u|i|c|e|b|o|x|.|n|e|t".replace(/\|/g, ""),
        init: P,
        sync_option_with_dependency: A,
        sync_options: s,
        convert_xml_2_json: O,
        convert_2_json_lowercase_keys: C,
        get_config: l,
        get_query_string: G,
        get_cookie_manager: d
    }
};
var jb_glry_dlg_id = "jb-glry-dlg";
var juicebox_gallery_dialog = function(g) {
    var i, a;
    var j = function(n) {
        i = n.jquery;
        a = i("#" + jb_glry_dlg_id);
        if (a.length <= 0) {
            i("body").append(l());
            a = i("#" + jb_glry_dlg_id)
        }
    };
    var l = function() {
        return "<div id='" + jb_glry_dlg_id + "' style='display:none;position:absolute;width:100%;height:100%;left:0;top:0;' oncontextmenu='return false;'></div>"
    };
    var b = function() {
        a.hide()
    };
    var m = function() {
        b();
        a.html("");
        h(true);
        d(true)
    };
    var e = function(o, n) {
        a.fadeOut(o, function() {
            if (n) {
                n()
            }
            window.setTimeout(function() {
                a.html("")
            }, 100)
        });
        h(true);
        d(true)
    };
    var h = function(n) {
        if (n) {
            a.siblings(".jb-status-hiding-4-dlg").show().removeClass("jb-status-hiding-4-dlg")
        } else {
            a.siblings(":visible").addClass("jb-status-hiding-4-dlg").hide()
        }
    };
    var d = function(n) {
        if (n) {
            i(".jb-status-hiding-4-dlg").show().removeClass("jb-status-hiding-4-dlg")
        } else {
            i(".juicebox-gallery:visible").addClass("jb-status-hiding-4-dlg").hide()
        }
    };
    var k = function(o, n) {
        if (o) {
            h(false)
        } else {
            d(false)
        }
        if (n) {
            a.html(n)
        }
        a.show()
    };
    var c = function(p, n, o) {
        if (p) {
            h(false)
        } else {
            d(false)
        }
        a.css("opacity", 0).show();
        if (o) {
            o()
        }
        if (i.browser && i.browser.msie && i.browser.version < 10) {
            a.css("opacity", 1).hide().fadeIn(n)
        } else {
            a.fadeIn(n)
        }
    };
    var f = function() {
        return jb_glry_dlg_id
    };
    j(g);
    return {
        initialize: j,
        hide_dialog: b,
        cleanup_dialog: m,
        show_dialog: k,
        get_id: f,
        fadein_dialog: c,
        fadeout_dialog: e
    }
};
var juicebox_sizing_manager = function(g, O, p) {
    var N = g;
    var ap = p;
    var R = O;
    var y = N("body");
    var P = 0;
    var A = 0;
    var l = function() {
        P = N(window).width();
        A = N(window).height()
    };
    var E = function() {
        return null
    };
    var V = function(aq) {
        var ar = E();
        if (!ar) {
            return {
                height: aq,
                registered: false
            }
        }
        return {
            height: ar.height,
            registered: true
        }
    };
    var ac = function(aq) {
        var ar = E();
        if (!ar) {
            return {
                width: aq,
                registered: false
            }
        }
        return {
            width: ar.width,
            registered: true
        }
    };

    function W(ar) {
        var aq = x(ar, "height");
        if (parseInt(aq) === 0) {
            return 0
        }
        return aq
    }

    function k(ar) {
        var aq = x(ar, "width");
        if (parseInt(aq) === 0) {
            return 0
        }
        return aq
    }
    var am = function(au, at) {
        var aq = Math.max(A, P);
        var ar = Math.min(A, P);
        return (au > at) ? aq : ar
    };
    var J = function(ar, at, aq) {
        if (ar < 3.1) {
            return 1
        }
        if (ar > 3.1 && ar < 4) {
            return 0
        }
        if (ar < 4.1 && ar >= 4) {
            if (aq > at) {
                return 0
            }
            return ap.is_small_android() ? 58 : 0
        }
        return 0
    };

    function D(ax, aC, aw, aq, av) {
        var aB = aC;
        var ar = true;
        if (ap.is_in_iframe()) {
            return {
                height: N(window).height(),
                registered: ar
            }
        }
        if (ap.is_iphone() || ap.is_ipad()) {
            aB = window.innerHeight;
            if (ap.ios_version() >= 7) {
                aB++;
                if (window.innerHeight < window.innerWidth) {
                    aB++
                }
            }
        } else {
            if (ap.is_android()) {
                var ay = N(window);
                var aA = ay.height();
                var au = ay.width();
                if (ap.get_android_ver() < 4 && !(at > 3.1 && at < 4)) {
                    aA = screen.height;
                    au = screen.width
                } else {
                    aA = am(ay.height(), ay.width())
                }
                var az;
                if (aC > aw) {
                    az = V(aC);
                    aB = az.height + 1
                } else {
                    az = ac(aC);
                    aB = az.width
                }
                ar = az.registered;
                if (!ar) {
                    var at = ap.get_android_ver();
                    if (at >= 4) {
                        if (av) {
                            return {
                                height: parseInt(aB) + 2,
                                registered: ar
                            }
                        }
                        aB = window.innerHeight
                    } else {
                        if (at > 3.1 && at < 4) {
                            if (ay.height() > aA + 10) {
                                aB = ay.height() + (ay.height() > ay.width() ? (aq ? 2 : 50) : 2)
                            } else {
                                if (aA > ay.height()) {
                                    aB = ay.height() + (ay.height() > ay.width() ? (aq ? 2 : 0) : 2)
                                } else {
                                    aB = aC + (aq ? 54 : 50)
                                }
                            }
                        } else {
                            if (at >= 2.3) {
                                if (aC > aw) {
                                    aB = az.height + 5
                                } else {
                                    aB = az.width + 5
                                }
                            } else {
                                aB = aC + 5
                            }
                        }
                    }
                } else {
                    if (ap.get_android_ver() >= 4 && aq) {
                        aB += 5
                    }
                }
            } else {
                if (ap.is_mobile_ie()) {
                    aB = parseInt(aC) + 1;
                    if (aC < aw) {
                        aB++
                    }
                }
            }
        }
        return {
            height: aB,
            registered: ar
        }
    }
    var s = true;
    var H = W(y.attr("style"));
    var q = (H && parseInt(H) > 0);
    var i = function(aq) {
        if (q) {
            return false
        }
        if (aq.galleryheight.indexOf("%") < 0) {
            return false
        }
        if (((s && !L(aq, aq.gallerywidth, aq.galleryheight)) || c(aq)) && !(ap.is_iphone() && j(aq))) {
            return false
        }
        return true
    };
    var a = function() {
        return false
    };
    var c = function(aq) {
        return r().heightFound && aq.galleryheight.indexOf("%") > 0
    };
    var ad = function(aq) {
        return r().widthFound && aq.galleryheight.indexOf("%") > 0
    };
    var b = function(ar, aq) {
        var au = N(window);
        if (aq || i(ar)) {
            y.height(D(aq, au.height(), au.width()).height)
        }
        if (aq || a(ar)) {
            var at = au.width();
            y.width(at)
        }
    };
    var I = function() {
        var ar = parseInt(R.height());
        var aq = parseInt(N("body").height());
        if (ap.is_android() || ap.is_ipad() || ap.is_iphone()) {
            return ar >= aq && ar <= aq + 3 || ar <= aq && aq <= ar + 3
        }
        return ar == aq
    };
    var t = function() {
        var aq = 1;
        R.parents().each(function(at, av) {
            var au = av.nodeName.toUpperCase();
            if (au === "BODY" || !aq) {
                return
            }
            style = N(av).attr("style");
            var ar = W(style);
            if (ar.toLowerCase().indexOf("%") < 0 && parseInt(ar) > 0) {
                aq = 0;
                return
            }
            if (!ar) {
                return
            }
            if (ar.indexOf("%") > 0) {
                aq *= (parseInt(ar) / 100)
            }
        });
        return aq == 1
    };
    var L = function(ar, at, aq) {
        if (ap.isEmbeddedMode(N("#" + ar.containerid))) {
            return false
        }
        if (!t()) {
            return false
        }
        if (at === "100%" && aq === "100%") {
            return true
        }
        return false
    };
    var j = function(aq) {
        if (L(aq, aq.gallerywidth, aq.galleryheight)) {
            return true
        }
        return false
    };

    function x(av, ar) {
        if (!av || !ar) {
            return ""
        }
        var aq = av.split(";");
        var at, ay, ax, aw, au;
        for (au = 0; au < aq.length; au++) {
            ay = N.trim(aq[au]);
            if (!ay) {
                continue
            }
            at = ay.split(":");
            if (at.length !== 2) {
                continue
            }
            ax = N.trim(at[0]);
            aw = N.trim(at[1]);
            if (!ax) {
                continue
            }
            if (ax.toLowerCase() === ar.toLowerCase()) {
                return aw
            }
        }
        return ""
    }
    var m = false;
    var ag = 0;
    var F = 0;
    var r = function() {
        if (m) {
            return {
                heightFound: ag > 0,
                widthFound: F > 0,
                percentHeight: ag,
                percentWidth: F
            }
        }
        m = true;
        R.parents().each(function(ar, aw) {
            if (ag > 0 && F > 0) {
                return
            }
            var av = aw.nodeName.toUpperCase();
            if (av === "BODY") {
                return
            }
            var au = N(aw).attr("style");
            var at = W(au);
            var aq = k(au);
            if (!aq && !at) {
                return
            }
            if (at.indexOf("%") > 0 || parseInt(at) > 0) {
                ag = parseInt(at)
            }
            if (aq.indexOf("%") > 0 || parseInt(aq) > 0) {
                F = parseInt(aq)
            }
        });
        return {
            heightFound: ag > 0,
            widthFound: F > 0,
            percentHeight: ag,
            percentWidth: F
        }
    };
    var n = false;
    var aj = 0;
    var u = 0;
    var Q = function() {
        if (n) {
            return {
                height: aj,
                parentHeight: u
            }
        }
        aj = R.height();
        u = R.parent().height();
        n = true;
        return {
            height: aj,
            parentHeight: u
        }
    };
    var ak = 0;
    var al = function() {
        var ar = R.height();
        var aq = ak;
        ak = ar;
        return {
            newHeight: ar,
            oldHeight: aq
        }
    };
    var M = false;
    var w = function() {
        var aq = al();
        if (N.browser.msie) {
            if (N.browser.version < 8) {
                if (Q().height === 0) {
                    if (aq.newHeight > 0) {
                        return true
                    }
                } else {
                    if (Q().height === aq.newHeight && aq.newHeight > 110) {
                        return true
                    }
                }
                return false
            } else {
                if (ap.is_ie8()) {
                    if (R.height() <= 0 && R.parent().height() > 0 && R.parent().height() === Q().parentHeight) {
                        M = true;
                        return true
                    }
                    if (M) {
                        return true
                    }
                    return false
                }
            }
        }
        return Q().parentHeight > 110 && aq.newHeight > 110
    };
    var h = function(ar, at, ay, au) {
        if (at) {
            if (ap.is_android()) {
                return window.innerHeight + (ay ? 3 : 2)
            }
            var ax = N(window);
            var aq = ax.height();
            var aw = ax.width();
            if (!ap.is_ios_mobile_chrome() && (ap.is_ipad() || ap.is_iphone()) && ap.ios_version() >= 7) {
                aq = window.innerHeight;
                aw = window.innerWidth
            }
            var av = D(at, aq, aw, ay, au);
            return av.height
        }
        return ae(ar, at)
    };
    var ae = function(ar, au) {
        var aq = parseInt(ar.galleryheight);
        if (ar.galleryheight.indexOf("%") < 0) {
            return aq
        }
        if (!r().heightFound && w()) {
            if (ap.is_ie8() && R.height() < 10 && R.parent().height() > 10) {
                return R.parent().height()
            }
            return R.height()
        }
        var aw = 1;
        var at = 0;
        var av;
        R.parents().each(function(az, aB) {
            var aA = aB.nodeName.toUpperCase();
            if (aA === "BODY") {
                return
            }
            av = N(aB).attr("style");
            var ay = W(av);
            if (ay.toLowerCase().indexOf("%") < 0 && parseInt(ay) > 0) {
                at = parseInt(ay)
            }
            if (!ay || at > 0) {
                return
            }
            if (ay.indexOf("%") > 0) {
                aw *= (parseInt(ay) / 100)
            }
        });
        var ax = N(window);
        if (at === 0) {
            at = D(au, ax.height(), ax.width()).height
        }
        if (!aq) {
            aq = 100
        }
        aq /= 100;
        return aw * aq * at
    };
    var ab = function(aq, ar, au) {
        if (ar) {
            var at = N(window).width();
            if (ap.is_android()) {
                at = window.innerWidth + (au ? 1 : 0)
            }
            return at
        }
        return B(aq)
    };
    var B = function(aq) {
        var aw = parseInt(aq.gallerywidth);
        if (aq.gallerywidth.indexOf("%") < 0) {
            return aw
        }
        if (!r().widthFound) {
            return R.width()
        }
        var au = 1;
        var ar = 0;
        var at;
        R.parents().each(function(ay, aA) {
            var az = aA.nodeName.toUpperCase();
            if (az === "BODY") {
                return
            }
            at = N(aA).attr("style");
            var ax = k(at);
            if (ax.toLowerCase().indexOf("%") < 0 && parseInt(ax) > 0) {
                ar = parseInt(ax)
            }
            if (!ax || ar > 0) {
                return
            }
            if (ax.indexOf("%") > 0) {
                au *= (parseInt(ax) / 100)
            }
        });
        var av = N(window);
        if (ar === 0) {
            ar = av.width()
        }
        if (!aw) {
            aw = 100
        }
        aw /= 100;
        return au * aw * ar
    };
    var an = function(at, aw, au, ar) {
        var ax = z(at, aw, au, false, ar);
        var av = ap.get_thumb_size(au);
        var aq = av.height + au.thumbpadding;
        return ax.rows * aq + au.thumbpadding
    };
    var Z = function(at) {
        if (!ap.is_large_screen_mode(at)) {
            return 0
        }
        var ar = at.thumbsposition.toUpperCase();
        if (ar != "LEFT" && ar != "RIGHT") {
            return 0
        }
        var av = ap.get_thumb_size(at);
        var aq = av.width + at.thumbpadding;
        var aw = at.thumbnavposition.toUpperCase() != "BOTTOM" ? 128 : 0;
        var au = at.maxthumbcolumns > 0 ? at.maxthumbcolumns : 1;
        return aq * au + aw
    };
    var G = function(aq, ar) {
        if (aq.captionposition.toUpperCase() === "NONE") {
            return 0
        }
        if (!ar || ar <= 0) {
            return aq.maxcaptionheight
        }
        return aq.maxcaptionheight > ar ? ar : aq.maxcaptionheight
    };
    var v = 30;
    var f = 13;
    var Y = 75;
    var ao = function(aU, aZ, ar, ax, ay, aS, aw, aV, a7) {
        var a5 = T(aU, aZ, aV);
        var au = Z(aV);
        var aq = 2 * a5;
        if (aq > aU - 60 || aq > aZ - 60) {
            aq = 0;
            a5 = 0
        }
        var aE = a5;
        var aL = a5;
        var aP = aq;
        var aI = aq;
        aP = 2 * aE;
        aI = 2 * aL;
        var aD, az, aA, aO, aN, aG, at, aB, aT, aM, a2, a6, aC;
        var aY = aE,
            a0 = 0,
            aR = 0,
            aF = aL;
        var a1 = aV.captionposition.toUpperCase();
        var aW = aV.thumbnavposition.toUpperCase();
        var aQ = aW === "BOTTOM" ? Y : 0;
        if (aS) {
            a0 = aV.topareaheight;
            aR = aU - aI
        }
        var a4 = aV.thumbsposition.toUpperCase();
        var aH = aV.thumbpadding / 2;
        var aK = aw + (2 * aH);
        aD = ((aV.showpagingtext && aQ <= 0) ? aK + (ay ? f + aV.thumbpadding + aH : 15) : aK) + (ay ? 0 : 24) + aQ;
        if (a4 != "TOP") {
            aD -= aV.thumbhseparation
        }
        var aX = aV.gallerytitleposition.toUpperCase();
        if (aX === "ABOVE_THUMBS") {
            if (a4 != "LEFT" && a4 != "RIGHT") {
                aD += v
            }
        }
        aN = aZ - aD - aY - a0 - aE;
        var av = aV.captionposition.toUpperCase();
        aC = 0;
        var a9 = G(aV, aZ - aY - a0 - aE);
        aT = a9;
        var a8 = false;
        if (a4 === "TOP") {
            at = aZ - aE - aN - aH;
            aA = aY + a0 + aH
        } else {
            if (a4 === "LEFT") {
                a8 = true
            } else {
                if (a4 === "RIGHT") {
                    a8 = true
                } else {
                    at = aY + a0;
                    aA = aZ - aE - aD
                }
            }
        }
        if (a8) {
            aA = aY + a0;
            at = aY + a0;
            aN = aZ - aY - a0 - aE;
            aD = aN - (a1 === "BOTTOM" ? aT : 0)
        }
        var aJ;
        if (a1 === "BELOW_IMAGE" || a1 === "BOTTOM") {
            a2 = aZ - aE - aT
        } else {
            if (a1 === "BELOW_THUMBS") {
                if (a8) {
                    if (aV.thumbsvalign.toUpperCase() === "TOP") {
                        a2 = an((a8 ? au : aU - aI), ah(aV, aD), aV, a7) + (aV.showpagingtext && aQ <= 0 ? f : 0) + aQ
                    } else {
                        a2 = (aD) / 2 + an((a8 ? au : aU - aI), ah(aV, aD), aV, a7) / 2 + (aV.showpagingtext && aQ <= 0 ? f : 0) + aQ
                    }
                } else {
                    a2 = an((a8 ? au : aU - aI), aD - ah(aV, aD), aV, a7) + (aV.showpagingtext && aQ <= 0 ? f : 0) - parseInt(aV.thumbpadding / 2) + aQ
                }
            } else {
                a2 = aN - aT - a0
            }
        }
        if (ar && ax) {
            az = aU - aI;
            aO = aL;
            aG = az;
            aB = aL;
            if (a8) {
                az = au;
                aG = aU - aI - az - aV.thumbhseparation
            }
            if (a4 === "LEFT") {
                aO = aL + aH;
                aG -= aH;
                aB = aO + az + aV.thumbhseparation
            } else {
                if (a4 === "RIGHT") {
                    az += aV.thumbhseparation;
                    aB = aL;
                    aO = aB + aG
                } else {
                    if (!a8) {
                        if (a4 === "TOP") {
                            at += aV.thumbvseparation
                        } else {
                            aN -= aV.thumbvseparation
                        }
                    }
                }
            }
            aM = aU - aI;
            a6 = aL;
            if (av === "BOTTOM" || (!a8 && a1 === "BELOW_THUMBS" && a4 != "TOP")) {
                if (a1 === "BELOW_THUMBS") {
                    a6 = 0;
                    aD += aT;
                    if (!a8) {
                        a2 = aD - aT
                    }
                } else {
                    a2 = aZ - aT - aE
                }
                aN -= aT;
                if (a4 != "TOP") {
                    aA -= aT
                }
                if (aA < 0) {
                    aA = 0
                }
            } else {
                if (av === "BELOW_IMAGE") {
                    aT = aN;
                    aN -= a9;
                    a2 = at;
                    aM = aG;
                    a6 = aB
                } else {
                    if (a1 === "BELOW_THUMBS") {
                        aT = a9;
                        a6 = 0;
                        if (a8) {
                            aM = az
                        }
                        a6 = 0;
                        if (a4 === "TOP") {
                            aN -= aT;
                            at += aT
                        }
                        if (!a8) {
                            aD += aT
                        }
                    } else {
                        aC = (a4 === "TOP" ? 0 : aD) + aE;
                        aJ = aN - aT;
                        if (aJ > 0) {
                            a2 = at + aJ
                        } else {
                            a2 = at
                        }
                        if (ap.is_captionposition_default(aV)) {
                            aM = aG;
                            a6 = aB
                        }
                    }
                }
            }
        } else {
            var a3 = aY + a0;
            aD = aZ - a3;
            az = aU - aI;
            aA = aE + a3;
            aO = aL;
            aN = aZ - a3 - aE;
            aT = aV.maxcaptionheight > aN ? aN : aV.maxcaptionheight;
            aG = aU - aI;
            at = a3;
            aB = aL;
            aM = aU - aI;
            a6 = aL;
            if (av === "BOTTOM") {
                aN -= aT
            } else {
                if (av === "BELOW_IMAGE") {
                    aN -= aT;
                    a2 = at
                } else {
                    aJ = aN - aT;
                    if (aJ > 0) {
                        a2 = at + aJ
                    } else {
                        a2 = at
                    }
                    aC = aE
                }
            }
        }
        return {
            top_panel_height: a0,
            top_panel_width: aR,
            top_panel_left: aF,
            top_panel_top: aY,
            index_panel_height: aD,
            index_panel_width: az,
            index_panel_top: aA,
            index_panel_left: aO,
            detail_panel_height: aN,
            detail_panel_width: aG,
            detail_panel_top: at,
            detail_panel_left: aB,
            caption_panel_height: aT,
            caption_panel_width: aM,
            caption_panel_left: a6,
            caption_panel_top: a2,
            caption_panel_bottom: aC,
            is_sideway_layout: a8,
            thumbs_height: aw
        }
    };
    var T = function(aq, av, au) {
        var at = Math.min(aq, av);
        if (au.stagepadding * 2 + 160 > at) {
            var ar = parseInt((at - 160) / 2);
            return ar >= 0 ? ar : 0
        }
        return au.stagepadding
    };
    var ai = function(au, aq, at) {
        var ar = Math.min(au, aq);
        if (at.imagepadding * 2 + 60 > ar) {
            if (at.framewidth > 0 && at.framewidth * 2 >= 60) {
                return parseInt((ar - 60) / 4)
            }
            return parseInt((ar - 60) / 2)
        }
        return at.imagepadding
    };
    var S = function(au, aq, at) {
        var av = 10;
        var ar = Math.min(au, aq);
        if (at.framewidth * 2 + av > ar) {
            if (at.imagepadding > 0 && at.imagepadding * 2 >= av) {
                return parseInt((ar - av) / 4)
            }
            return parseInt((ar - av) / 2)
        }
        if (2 * at.imagepadding + 2 * at.framewidth + av > ar) {
            return 0
        }
        return at.framewidth
    };
    var aa = function(ax, aD, aC, aB, at, aE) {
        var aA, ar, az, aw, av, ay;
        var aq = aD / aB;
        var au = ax / aC;
        if (aD <= 0 || ax <= 0 || aB <= 0 || aC <= 0) {
            return {}
        }
        if (aq >= 1 && au >= 1) {
            if (!aE) {
                az = "auto";
                aw = "auto";
                av = aD;
                ay = ax;
                aA = parseInt((ax - aC) / 2);
                ar = parseInt((aD - aB) / 2)
            } else {
                if (aq > au) {
                    az = "auto";
                    aw = aC;
                    av = aD / au;
                    ay = aC;
                    aA = 0;
                    ar = parseInt((av - aB) / 2)
                } else {
                    az = aB;
                    aw = "auto";
                    av = aB;
                    ay = ax / aq;
                    aA = parseInt((ay - aC) / 2);
                    ar = 0
                }
            }
        } else {
            if (aq < au) {
                az = aB;
                aw = "auto";
                av = aB;
                ay = parseInt(av * ax / aD);
                ar = 0;
                aA = parseInt((ay - aC) / 2)
            } else {
                aw = aC;
                az = "auto";
                ay = aC;
                av = parseInt(ay * aD / ax);
                aA = 0;
                ar = parseInt((av - aB) / 2)
            }
        }
        var aF = {
            imageTop: -1 * aA,
            imageLeft: -1 * ar,
            imageWidth: az,
            imageHeight: aw,
            imageExpectedWidth: av,
            imageExpectedHeight: ay
        };
        if (at) {
            at(aF)
        } else {
            return aF
        }
        return null
    };
    var af = function(au, at, ar, aw, av) {
        au = parseInt(au);
        at = parseInt(at);
        var aq = new Image();
        aq.onload = function() {
            aa(aq.height, aq.width, at, au, aw, av)
        };
        aq.src = ar
    };
    var X = function(at, aq, ay, aw, av) {
        var au = ay / at;
        var ar = aw / aq;
        var ax;
        if (av === "SCALE") {
            ax = 0
        } else {
            if (av === "FILL") {
                ax = 3
            } else {
                if (av === "STRETCH") {
                    ax = 4
                } else {
                    if (av === "NONE") {
                        ax = 2
                    } else {
                        if (au < 1 || ar < 1) {
                            ax = 0
                        } else {
                            ax = 1
                        }
                    }
                }
            }
        }
        switch (ax) {
            case 0:
                if (au > ar) {
                    return {
                        width: "auto",
                        height: aw + "px"
                    }
                } else {
                    return {
                        width: ay + "px",
                        height: "auto"
                    }
                }
            case 1:
                return {
                    width: at + "px", height: aq + "px"
                };
            case 2:
                return {
                    width: "auto", height: "auto"
                };
            case 3:
                if (au > ar) {
                    return {
                        width: ay + "px",
                        height: "auto",
                        expectedWidth: ay,
                        expectedHeight: (ay * aq / at)
                    }
                } else {
                    return {
                        width: "auto",
                        height: aw + "px",
                        expectedWidth: (aw * at / aq),
                        expectedHeight: aw
                    }
                }
            case 4:
                return {
                    width: ay + "px", height: aw + "px"
                }
        }
        return null
    };
    var K = function(ax, aw, av, aq, au, at) {
        var ar = at ? 0 : 2 * (ai(aw, av, aq) + S(aw, av, aq));
        aw -= ar;
        av -= ar;
        if (!ax || !ax.width || !ax.height) {
            return {
                width: "auto",
                height: "auto"
            }
        }
        return X(ax.width, ax.height, aw, av, au)
    };
    var o = function(aE, aJ, aq, av, aG, aH) {
        var aw = K(aE, aJ, aq, av, (aG ? aG : av.imagescalemode.toUpperCase()), aH);
        var aA = aw.width;
        var aK = aw.height;
        var az = aH ? 0 : ai(aJ, aq, av);
        var aC = aH ? 0 : S(aJ, aq, av);
        var aL = az + aC;
        var aB = 2 * aL;
        if (aA === "auto" && aK === "auto") {
            aK = aE.height;
            aA = aE.width
        } else {
            if (aA === "auto") {
                aA = parseInt(aK) * (aE.width / aE.height)
            } else {
                if (aK === "auto") {
                    aK = parseInt(aA) * (aE.height / aE.width)
                }
            }
        }
        aA = parseInt(aA);
        aK = parseInt(aK);
        var at = 0;
        var aD = 0;
        var au = av.imagehalign.toUpperCase();
        var ax = av.imagevalign.toUpperCase();
        if (au === "LEFT") {
            at = 0
        } else {
            if (au === "RIGHT") {
                at = parseInt(aJ - aA - 2 * aC) - az
            } else {
                at = parseInt((aJ - aA) / 2) - aC
            }
        }
        if (ax === "TOP") {
            aD = 0
        } else {
            if (ax === "BOTTOM") {
                aD = parseInt(aq - aK - 2 * aC) - az
            } else {
                aD = parseInt((aq - aK) / 2) - aC
            }
        }
        var aF = at;
        var ar = aD;
        if (at < az) {
            at = az
        }
        if (aD < az) {
            aD = az
        }
        var aI = aJ - aB < parseInt(aA) ? aJ - aB : parseInt(aA);
        var ay = aq - aB < parseInt(aK) ? aq - aB : parseInt(aK);
        return {
            width: parseInt(aA),
            height: parseInt(aK),
            left: at,
            top: aD,
            frameWidth: aI,
            frameHeight: ay,
            unadjtop: ar,
            unadjleft: aF,
            parentWidth: aJ,
            parentHeight: aq
        }
    };
    var z = function(aq, aD, ar, aw) {
        if (aD < 0) {
            aD = 0
        }
        var aA = 0,
            av = 0;
        var az;
        var aC = ap.get_thumb_size(ar);
        var ay = aC.width + ar.thumbpadding;
        var aB = aC.height + ar.thumbpadding;
        var au = ((ap.is_large_screen_mode(ar) || ar.showsmallthumbnav) ? ap.get_nav_btn_size(ar) : 0) + ar.thumbpadding;
        az = aq - (2 * au);
        var at = ar.thumbsposition.toUpperCase();
        if (at === "LEFT" || at === "RIGHT") {
            aA = ar.maxthumbcolumns
        } else {
            if (aq > 0) {
                aA = parseInt(az / ay)
            }
        }
        if (aA <= 0) {
            aA = 1
        }
        if (aA > ar.maxthumbcolumns) {
            aA = ar.maxthumbcolumns
        }
        if (aD > 0) {
            av = parseInt(aD / aB);
            if (!ap.is_large_screen_mode(ar) && (aw || ar.forcetouchmode || ar.forcetouchmodereversed)) {}
        }
        if (av <= 0 || ar.usethumbdots) {
            av = 1
        }
        if (av > ar.maxthumbrows) {
            av = ar.maxthumbrows
        }
        var ax = av;
        return {
            columns: aA,
            rows: ax,
            regularRows: av
        }
    };
    var ah = function(ar, aq) {
        var av = ar.thumbnavposition.toUpperCase();
        var at = ar.captionposition.toUpperCase();
        var au = ap.is_side_layout(ar);
        if (ar.gallerytitleposition.toUpperCase() === "ABOVE_THUMBS" && at != "BELOW_THUMBS" || !ap.is_large_screen_mode(ar)) {
            aq -= v
        }
        if (at === "BELOW_THUMBS") {
            aq -= G(ar);
            if (au && av != "BOTTOM") {
                aq -= G(ar)
            }
        }
        if (ar.showpagingtext && av != "BOTTOM") {
            aq -= (au ? 2 : 1) * f
        }
        if (!ap.is_large_screen_mode(ar)) {
            aq -= 30
        }
        if (av === "BOTTOM") {
            aq -= (Y + (au ? 25 : 0))
        }
        aq -= ar.thumbpadding / 2;
        return aq
    };
    var d = function(av, ar, at, au, aq) {
        ar = ah(at, ar);
        return z(av, ar, at, au, aq)
    };
    var C = function(aq) {
        return parseInt(aq.thumbheight / 3)
    };
    var U = function(aE, aD, aK, ar, aB) {
        var aq = aK.thumbshalign.toUpperCase();
        var av = aK.thumbsvalign.toUpperCase();
        var at = ap.get_thumb_size(aK);
        var aH = aK.thumbnavposition.toUpperCase();
        var aA = at.width + aK.thumbpadding;
        var az = at.height + aK.thumbpadding;
        var aJ = aB * az + aK.thumbpadding;
        if (aJ < ap.get_nav_btn_size(aK)) {
            aJ = ap.get_nav_btn_size(aK)
        }
        var ay = ar * aA + aK.thumbpadding;
        var aI = aK.captionposition.toUpperCase();
        var aw = T(R.width(), R.height(), aK);
        var au = (aI === "BOTTOM" ? aw : 0) + parseInt((aD - aJ) / 2 - (ap.is_side_layout(aK) ? aK.thumbpadding : 0) / 2 + aK.thumbpadding / 2);
        var aL = 0;
        var aF = p.get_nav_btn_size(aK);
        if (aq === "LEFT") {
            aL = aF
        } else {
            if (aq === "RIGHT") {
                aL = parseInt((aE - ay)) - aF
            } else {
                aL = parseInt((aE - ay) / 2)
            }
        }
        if (av === "TOP") {
            au = 0
        } else {
            if (av === "BOTTOM") {
                au = (aI === "BOTTOM" ? aw : 0) + parseInt((aD - aJ) - (ap.is_side_layout(aK) ? aK.thumbpadding : 0) / 2 + aK.thumbpadding / 2) - (aH === "BOTTOM" ? aF + C(aK) : 0)
            } else {
                au = (aI === "BOTTOM" ? aw : 0) + parseInt((aD - aJ) / 2 - (ap.is_side_layout(aK) ? aK.thumbpadding : 0) / 2 + aK.thumbpadding / 2)
            }
        }
        if (!ap.is_side_layout(aK)) {
            au = 0
        } else {
            if (au < 0) {
                au = 0
            }
        }
        var ax = aK.gallerytitleposition.toUpperCase();
        var aG = ap.is_large_screen_mode(aK);
        var aC = false;
        if (ap.is_side_layout(aK)) {
            if (!aC) {
                if (au < 0) {
                    au = 0
                }
            }
        } else {
            if (ax === "ABOVE_THUMBS") {
                au += v
            }
        }
        return {
            top: au,
            left: aL,
            width: ay,
            height: (aC || !aG) ? "100%" : aJ
        }
    };
    var e = function(au, av, ar, aq) {
        if (au.features.fullscreen.switched_2_fullscreen()) {
            return
        }
        var at = aq ? aq : N("#" + au.config.containerid);
        if (ar) {
            at.height(ar)
        }
        if (av) {
            at.width(av)
        }
    };
    return {
        get_gallery_height: h,
        get_gallery_width: ab,
        is_fullscreen_mode: j,
        is_gallery_fully_filled: L,
        try_set_body_size: b,
        get_containers_size_and_position: ao,
        get_stage_padding: T,
        get_image_padding: ai,
        get_image_framewidth: S,
        position_2_fill_image: af,
        force_height_calculation: c,
        force_width_calculation: ad,
        get_initial_size: l,
        get_initial_win_size: am,
        get_side_panel_width: Z,
        suggested_image_size: K,
        get_image_display_size: o,
        get_thumb_size_info: d,
        get_thumbs_show_area_size_info: U,
        constTitleHeight4AboveThumbs: v,
        constIndexNavHeight: Y,
        get_android_additional_height: J,
        padding_bottom_index_nav: C,
        trySetContainerSize: e
    }
};
var juicebox_flickr_image_loader = function(e, o, g) {
    var D = o.get_config();
    var h = 50;
    var p = g;
    var A = 0;
    var m = 1;
    var i = "s";
    var d = "https://api.flickr.com/services/rest/?method=";
    var c = "&api_key=b40dc56c795c0103c6170731e6271e04";
    var v = {
        FLICKR_SEARCH: "flickr.photos.search",
        FLICKR_INTERESTINGNESS: "flickr.interestingness.getList",
        FLICKR_SET: "flickr.photosets.getPhotos",
        FLICKR_GROUP: "flickr.groups.pools.getPhotos",
        FLICKR_FIND_USER: "flickr.people.findByUsername",
        FLICKR_PHOTO_INFO: "flickr.photos.getInfo",
        FLICKR_PEOPLE_FIND: "flickr.people.findByUsername"
    };

    function x(E) {
        return d + v[E] + c
    }

    function t(E) {
        return x("FLICKR_SEARCH") + (D.flickrtags ? "&tags=" + D.flickrtags : "") + (D.flickruserid ? "&user_id=" + D.flickruserid : "") + "&page=" + m + "&per_page=" + E + "&sort=" + D.flickrsort.toLowerCase() + "&tag_mode=" + D.flickrtagmode.toLowerCase() + (D.flickrextraparams ? "&" + D.flickrextraparams.replace(/,/g, "&") : "") + "&media=photos&extras=url_sq,url_m,url_l,url_o,original_format&format=json&jsoncallback=?"
    }

    function r(E) {
        return x("FLICKR_SET") + "&photoset_id=" + D.flickrsetid + (D.flickrtags ? "&tags=" + D.flickrtags : "") + "&page=" + m + "&per_page=" + E + "&tag_mode=" + D.flickrtagmode.toLowerCase() + "&media=photos&extras=url_sq,url_m,url_l,url_o,original_format&format=json&jsoncallback=?"
    }

    function f(E) {
        return x("FLICKR_GROUP") + "&group_id=" + D.flickrgroupid + (D.flickrtags ? "&tags=" + D.flickrtags : "") + "&page=" + m + "&per_page=" + E + "&tag_mode=" + D.flickrtagmode.toLowerCase() + "&extras=url_sq,url_m,url_l,url_o,original_format&format=json&jsoncallback=?"
    }

    function n(E) {
        return x("FLICKR_INTERESTINGNESS") + "&page=" + m + "&per_page=" + E + "&extras=url_sq, url_m, url_l,url_o,original_format&format=json&jsoncallback=?"
    }

    function C() {
        return x("FLICKR_PEOPLE_FIND") + "&username=" + D.flickrusername + "&format=json&jsoncallback=?"
    }

    function q(E) {
        if (!o.isp) {
            if (D.flickrtags || D.flickrusername) {
                return t(E)
            } else {
                return n(E)
            }
        }
        if (D.flickrsetid) {
            return r(E)
        } else {
            if (D.flickrgroupid) {
                return f(E)
            } else {
                if (D.flickruserid) {
                    return t(E)
                } else {
                    if (D.flickrusername) {
                        return t(E)
                    } else {
                        if (D.flickrtags) {
                            return t(E)
                        } else {
                            return n(E)
                        }
                    }
                }
            }
        }
    }

    function b(F, E) {
        return "http" + i + "://www.flickr.com/photos/" + F + "/" + E
    }

    function l(G, H, F, E) {
        return "http" + i + "://farm" + G + ".static.flickr.com/" + H + "/" + E + "_" + F + "_s.jpg"
    }
    var j = function(G, I) {
        var K, H, J;
        var E = "";
        var F = [];
        if (o.isp) {
            if (G.photos) {
                K = G.photos.photo
            } else {
                if (G.photoset) {
                    K = G.photoset.photo;
                    E = G.photoset.owner
                }
            }
        } else {
            K = G.photos.photo
        }
        if (!K || K.length == 0) {
            p("Flickr Images Not Found");
            return F
        }
        for (H = 0; H < K.length && H < A; H += 1) {
            J = {
                flickrPhotoId: K[H].id,
                thumbURL: l(K[H].farm, K[H].server, K[H].secret, K[H].id),
                imageFullURL: b(K[H].owner || E, K[H].id),
                imageURL: b(K[H].owner || E, K[H].id),
                linkTarget: "_blank",
                caption: K[H].title || "",
                description: "",
                preloadedImage: null,
                preloaded: false
            };
            if (D.flickrimagesize.toLowerCase() === "original" && K[H].url_o) {
                J.imageURL = K[H].url_o
            } else {
                if ((D.flickrimagesize.toLowerCase() === "large" || D.flickrimagesize.toLowerCase() === "original") && K[H].url_l) {
                    J.imageURL = K[H].url_l
                } else {
                    J.imageURL = K[H].url_m
                }
            }
            F.push(J);
            if (typeof(I) === "function") {
                u(H, K[H].id, I)
            }
        }
        return F
    };
    var y = function(E) {
        if (!E || !E.photo) {
            return null
        }
        var F = E.photo;
        return {
            id: F.id,
            title: F.title._content,
            description: F.description._content.replace(/\n/g, "<br/>")
        }
    };
    var k = function(F) {
        var E = C();
        e.ajax({
            url: E,
            dataType: "json",
            success: function(G) {
                if (G.stat === "ok") {
                    D.flickruserid = G.user.id;
                    if (F) {
                        F()
                    }
                } else {
                    p("Cannot find Flickr User: " + D.flickrusername)
                }
            },
            error: function() {
                p("Cannot find Flickr User: " + D.flickrusername)
            }
        })
    };
    var B = function(G, F) {
        A = (o.isp ? parseInt(D.flickrimagecount) : h);
        var E = q(A);
        e.ajax({
            url: E,
            dataType: "json",
            success: function(H) {
                if (H.photos) {
                    A = Math.min(H.photos.total, A)
                } else {
                    if (H.photoset) {
                        A = Math.min(H.photoset.total, A)
                    }
                }
                if (H.stat === "ok") {
                    if (G) {
                        G(j(H, F))
                    }
                } else {
                    p("Flickr Images Not Found")
                }
            },
            error: function() {
                p("Flickr Images Not Found")
            }
        })
    };
    var z = function(E) {
        return x("FLICKR_PHOTO_INFO") + "&format=json&photo_id=" + E + "&jsoncallback=?"
    };
    var u = function(G, F, H) {
        if (!D.flickrshowdescription) {
            return
        }
        var E = z(F);
        e.ajax({
            url: E,
            dataType: "json",
            success: function(I) {
                if (I.stat === "ok") {
                    if (H) {
                        H(G, y(I))
                    }
                }
            },
            error: function() {}
        })
    };
    var s = function(F, E) {
        if (D.flickrusername) {
            k(function() {
                B(F, E)
            })
        } else {
            B(F, E)
        }
    };
    var w = function(G, E, F) {
        if (!D.flickrshowdescription) {
            return
        }
        if (typeof(F) === "function") {
            u(G, E, F)
        }
    };
    var a = function(E, F, H) {
        if (!D.flickrshowdescription) {
            return
        }
        if (typeof(H) !== "function") {
            return
        }
        if (F.to >= E.length) {
            F.to = E.length - 1
        }
        if (F.from < 0) {
            F.from = 0
        }
        for (var G = F.from; G <= F.to; G++) {
            if (E[G].detail_loaded) {
                continue
            }
            w(G, E[G].flickrPhotoId, H)
        }
    };
    return {
        get_images: s,
        load_flickr_images_detail: a
    }
};
var juicebox_gallery_manager = function() {
    var i = [];
    var h;
    var f = -1;
    var q;
    var p = function(t, u) {
        h = t;
        var s = "";
        if (t.image_orders) {
            s = t.image_orders
        }
        if (u) {
            s = u
        }
        if (s && s.length > 0) {
            q = s.split(",")
        }
    };
    var g = function(s) {
        s.position = i.length;
        s.original_position = i.length;
        s.loaded = 0;
        s.thumb_loaded = 0;
        s.width = null;
        s.height = null;
        s.thumb_width = null;
        s.thumb_height = null;
        s.order = (q && q[i.length]) ? q[i.length] : parseInt(1000 * Math.random());
        i[i.length] = s
    };
    var j = function() {
        if (!h.randomizeimages) {
            return ""
        }
        var s = "";
        for (var u = 0; u < i.length; u++) {
            for (var t = 0; t < i.length; t++) {
                if (u == i[t].original_position) {
                    s += (u === 0 ? "" : ",") + i[t].order
                }
            }
        }
        return s
    };
    var e = function(s) {
        if (!h.randomizeimages) {
            return s
        }
        for (var t = 0; t < i.length; t++) {
            if (i[t].original_position == s) {
                return i[t].position
            }
        }
        return -1
    };
    var c = function(s) {
        return i[s]
    };
    var r = function() {
        return i
    };
    var a = function(s) {
        s = parseInt(s);
        if (!h.enablelooping && s >= i.length - 1) {
            return null
        }
        return i[s < i.length - 1 ? s + 1 : 0]
    };
    var n = function(s) {
        s = parseInt(s);
        if (!h.enablelooping && s <= 0) {
            return null
        }
        return i[s > 0 ? s - 1 : i.length - 1]
    };
    var o = function(s) {
        i[s.position] = s
    };
    var b = function(t, s) {
        return i.slice(t, s)
    };
    var k = function() {
        i = i.sort(function(u, t) {
            return u.order - t.order
        });
        for (var s = 0; s < i.length; s++) {
            i[s].position = s
        }
    };
    var d = function() {
        return i.length
    };
    var m = function() {
        return f
    };
    var l = function(s) {
        f = s
    };
    return {
        add_image: g,
        length: d,
        get_range: b,
        get_image: c,
        get_images: r,
        update_image: o,
        get_previous_image: n,
        get_next_image: a,
        sort_images: k,
        init: p,
        get_current_position: e,
        getFirstImageIndex: m,
        setFirstImageIndex: l,
        get_image_orders: j
    }
};
var juicebox_gallery_index_panel = function(T, g) {
    var ax, d, aG, X, aj, an, aO, ay;
    X = g;
    var G = T;
    var aL = 0;
    var aS = 1;
    var L = 0,
        W = 0;
    var ad = 0;
    var B = 0;
    var aa = 86;
    var av = 86;
    var R = 96;
    var az = 96;
    var x = 5;
    var s = true;
    var l = false;
    var aC = true;
    var e = "jb-tbn-current";
    var af = "jb-tbn-prev";
    var al = "jb-tbn-next";
    var q = 0;
    var O = 0;
    var aF = 0;
    var N = 0;
    var o = 0;
    var a = false;
    var aD = false;
    var D = "display:none;";
    var I = 11;
    var f, M;
    var aQ;
    var am = 100;
    var h = am;
    var ap = function(aT) {
        f = aT;
        M = f._;
        aj = f.config
    };
    var j = function() {
        var aT = W * L <= X.length() ? W * L : X.length();
        if (aT == 0) {
            aT = h
        }
        return aT > X.length() ? X.length() : aT
    };
    var ab = function() {
        if (B == 0) {
            B = M("").height()
        }
        L = 0;
        W = 0;
        var aT = an.get_thumb_size_info(ad, B, aj, l, j());
        L = aT.columns;
        W = aT.rows;
        if (L * W > X.length() && W > 1) {
            W = Math.ceil(X.length() / L)
        }
        aS = Math.ceil(X.length() / (W * L))
    };
    var H = function() {
        return an.get_thumbs_show_area_size_info(ad, B, aj, L, W, M("").height())
    };
    var aK = function(aU) {
        if (!aU) {
            aU = 1
        }
        var aT = (aL + aU) * L * W - 1;
        if (aT >= X.length()) {
            aT = X.length() - 1
        }
        if (aT < 0) {
            aT = 0
        }
        return {
            from: aL * L * W,
            to: aT
        }
    };
    var p = function(aT) {
        var aU = G.get_thumb_size(aT);
        aa = aU.width;
        av = aU.height;
        x = aT.thumbpadding / 2;
        R = aa + (2 * x);
        az = av + (2 * x)
    };
    var ae = function(aV, aT) {
        ax = aV.jquery;
        l = aT;
        d = aV.document_id;
        aG = aV.container;
        aj = aV.config;
        G = aV.utils;
        an = aV.sizing;
        aO = aV.finish_draw_event_callback;
        ay = aV.touch_event_callback;
        aQ = aV.debug;
        ad = aV.current_width;
        B = aV.current_height;
        p(aj);
        ab();
        u();
        aq();
        J();
        if (G.ship || !aj.usethumbdots || W > 1) {
            I = 0
        }
        var aU = M(".jb-idx-thumbnail-show-more a");
        if (aU.length > 0) {
            if (f.config.textcolor) {
                aU.css({
                    color: f.utils.format_color(f.config.textcolor)
                })
            }
            if (f.config.textshadowcolor) {
                aU.css({
                    "text-shadow": f.utils.get_text_shadow_style(f.config.textshadowcolor, f.config.textshadowcolora, true)
                })
            }
            if (f.config.galleryfontface) {
                aU.css("font-family", f.config.galleryfontface)
            }
        }
    };
    var u = function() {
        var aU = f.features.grytitle.getHtml(true);
        var aT = "";
        if (aj.captionposition.toUpperCase() === "BELOW_THUMBS") {
            aT = f.features.caption.getHtml()
        }
        aG.html("<div class='jb-idx-show-area' style='overflow:hidden;margin:0;padding:0;position:absolute;'></div>" + aU + (aj.showpagingtext ? "<div class='jb-idx-thb-list-page-number' style='position: absolute;'></div>" : "") + aT)
    };
    var aq = function() {
        if ((ax.browser.msie || G.is_ie_after_11()) && !G.is_ie_touch()) {
            return
        }
        var aU = function(a3) {
            if (a3.pointerType && a3.pointerType != "touch") {
                return
            }
            if (a) {
                return
            }
            a3.preventDefault();
            N = 0;
            o = 0;
            if (!aD) {
                aD = true;
                if (G.is_touchable_desktop()) {
                    var a4 = G.getMsPointerXy(a3);
                    O = a4.x;
                    aF = a4.x
                } else {
                    O = a3.originalEvent.touches[0].pageX;
                    aF = a3.originalEvent.touches[0].pageX
                }
            }
        };
        var aZ = function(a4) {
            if (a4.pointerType && a4.pointerType != "touch") {
                return
            }
            if (a || !aD) {
                return
            }
            a4.preventDefault();
            var a3;
            if (G.is_touchable_desktop()) {
                var a5 = G.getMsPointerXy(a4);
                a3 = a5.x
            } else {
                a3 = a4.originalEvent.touches[0].pageX
            }
            N = a3 - O;
            M("table.jb-idx-thb-container").animate({
                left: "+=" + (a3 - aF),
                avoidTransforms: !aj.use_webkit_transform,
                useTranslate3d: aj.use_3d_transform
            }, 0);
            aF = a3;
            o = a3 - O
        };
        var a1 = function(a3) {
            if (aj.autofullscreenexpand) {
                G.show_real_fullscreen(aj.containerid);
                if (!G.is_in_real_fullscreen() && !G.is_mobile_ie_after_11()) {
                    if (N > 5 || N < -5) {
                        return
                    }
                    var a4 = 0;
                    if (ax(a3.target).attr("data-position")) {
                        a4 = parseInt(ax(a3.target).attr("data-position"))
                    } else {
                        if (ax(a3.target).parent().attr("data-position")) {
                            a4 = parseInt(ax(a3.target).parent().attr("data-position"))
                        }
                    }
                    f.detail_panel.set_photo_position(a4);
                    f.detail_panel.set_visible_flag(true);
                    f.index_panel.set_visible_flag(false);
                    return
                }
            }
            if (a3.pointerType && a3.pointerType != "touch") {
                return
            }
            if (a || !aD) {
                aD = false;
                return
            }
            if (f.utils.is_touchable_desktop()) {
                window.setTimeout(function() {
                    aD = false
                }, 150)
            } else {
                aD = false
            }
            if (N > 5) {
                if (r() && !aj.enablelooping) {
                    V(N, function() {
                        P()
                    })
                } else {
                    ar(Math.abs(N), null, ad, B)
                }
                a3.preventDefault()
            } else {
                if (N < -5) {
                    if (aJ() && !aj.enablelooping) {
                        V(N, function() {
                            P()
                        })
                    } else {
                        k(Math.abs(N), null, ad, B)
                    }
                    a3.preventDefault()
                } else {
                    if (Math.abs(o) < 5) {
                        if (aj.forcetouchmode) {
                            if (ax(a3.target).attr("data-position") != null) {
                                aO(ax(a3.target).attr("data-position"))
                            } else {
                                if (ax(a3.target).parent().attr("data-position") != null) {
                                    aO(ax(a3.target).parent().attr("data-position"))
                                }
                            }
                        } else {
                            if (ax(a3.target).parent().attr("data-position") != null) {
                                if (N <= 5 && N >= -5) {
                                    V(N)
                                }
                                aO(ax(a3.target).parent().attr("data-position"))
                            }
                        }
                    } else {
                        if (N <= 5 && N >= -5) {
                            V(N)
                        }
                    }
                }
            }
        };
        if (f.utils.is_ie_after_11()) {
            var aX = "ms";
            if (window.navigator.pointerEnabled) {
                aX = ""
            }
            var a0 = document.getElementsByClassName("jb-idx-thumbnail-container");
            for (var aV = 0; aV < a0.length; aV++) {
                var a2 = a0[aV];
                a2.addEventListener(aX + "pointerdown", aU, false);
                a2.addEventListener(aX + "pointermove", aZ, false);
                a2.addEventListener(aX + "pointerout", a1, false)
            }
        } else {
            if (G.is_touchable_desktop() || G.is_mobile_ie_10()) {
                var aT = document.getElementsByClassName("jb-idx-thumbnail-container");
                for (var aW = 0; aW < aT.length; aW++) {
                    var aY = aT[aW];
                    aY.addEventListener("touchstart", aU, false);
                    aY.addEventListener("touchmove", aZ, false);
                    aY.addEventListener("touchend", a1, false);
                    aY.addEventListener("gesturestart", aU, false);
                    aY.addEventListener("gesturechange", aZ, false);
                    aY.addEventListener("gestureend", a1, false)
                }
            } else {
                if (!ax.browser.msie) {
                    M(".jb-idx-show-area").bind("touchstart", aU).bind("touchmove", aZ).bind("touchend", a1)
                }
            }
        }
        if (aj.forcetouchmode && !G.is_touchable_desktop()) {
            M(" .jb-idx-thumb, .jb-idx-thb-frame").mousedown(function(a4) {
                if (a4.which !== 1) {
                    return
                }
                var a3 = {
                    originalEvent: {
                        touches: [{}]
                    }
                };
                a4.preventDefault();
                a3.preventDefault = function() {};
                a3.originalEvent.touches[0].pageX = a4.screenX;
                a3.originalEvent.touches[0].pageY = a4.screenY;
                ax(this).children(".jb-idx-thb-frame").css(aP());
                aU(a3)
            }).mousemove(function(a4) {
                if (a4.which !== 1) {
                    aD = false;
                    return
                }
                if (!aD) {
                    return
                }
                var a3 = {
                    originalEvent: {
                        touches: [{}]
                    }
                };
                a3.preventDefault = function() {};
                a3.originalEvent.touches[0].pageX = a4.screenX;
                a3.originalEvent.touches[0].pageY = a4.screenY;
                aZ(a3)
            }).mouseup(function() {
                if (!aD) {
                    return
                }
                var a3 = {};
                a3.preventDefault = function() {};
                a3.target = this;
                a1(a3)
            }).mouseout(function() {
                if (!aD) {
                    return
                }
                var a3 = {};
                a3.preventDefault = function() {};
                a3.target = this;
                a1(a3)
            })
        }
    };
    var v = function() {
        var aU = L * R;
        var aT = W * az;
        return {
            height: aT,
            width: aU
        }
    };
    var aw = function(aZ, aY, aU, a5, aT) {
        var a1 = W * L * aZ;
        var a2 = W * L * (aZ + 1);
        var a3;
        if (X.length() < L) {
            a3 = X.length() * R
        } else {
            a3 = L * R
        }
        var aX = G.is_side_layout(aj) || (aj.usethumbdots && W * az < G.get_nav_btn_size(aj));
        aY.append("<table class='jb-idx-thb-container jb-classifier-thumb-area table_page_" + aZ + " " + (aT ? aT : "") + "' style='left:" + aU + "px;" + (aX ? "height:100%;" : "") + "' ><tr><td style='text-align:center !important;width:auto !important;'><div class='jb-idx-thb-list' style='text-align:center !important;width:" + a3 + "px;margin-left: auto;margin-right: auto; margin-top:0; margin-bottom:0; padding:0;' ></div></td></tr></table>");
        var aW = M(".table_page_" + aZ + (aT ? "." + aT : "") + " .jb-idx-thb-list");
        var a4 = "";
        var a0 = X.get_range(a1, a2);
        for (var aV = 0; aV < a0.length; aV++) {
            a4 = ai(a0[aV], aW, a4)
        }
        aW.append(a4)
    };
    var y = function(aT) {
        if (G.is_earlier_ie()) {
            return ""
        }
        return aT.thumbcornerradius > 0 && aT.thumbcornerradius <= Math.min(aT.thumbwidth, aT.thumbheight) ? "border-radius:" + aT.thumbcornerradius + "px;" : ""
    };
    var aH = function() {
        if (aj.usethumbdots) {
            return "width:" + (R) + "px;height:" + (az) + "px;padding:0;margin:" + I + "px 0 0 0;color:" + G.format_color(aj.thumbdotcolor) + ";"
        }
        return "overflow:hidden;width:" + (aa) + "px;height:" + (av) + "px;padding:0;margin:" + (I + x) + "px " + parseInt(x) + "px " + x + "px " + parseInt(x) + "px;" + y(aj)
    };
    var i = function(aU, aT) {
        if (aj.usethumbdots) {
            return "padding:0;margin:" + x + "px;width:" + (aa) + "px;height:" + (av) + "px;"
        }
        return (aT ? "display:none;" : "") + "position:relative;padding:0;left:" + aU.left + "px;top:" + aU.top + "px;width:" + aU.thumb_width + "px;height:" + aU.thumb_height + "px;"
    };
    var J = function() {
        var aV = aj.thumbpreloading.toUpperCase();
        if (aV != "ALL") {
            return
        }
        var aT = X.get_images();
        for (var aU = 0; aU < aT.length; aU++) {
            ah(aT[aU])
        }
    };
    var F = function() {
        return aj.thumbframecolor ? G.format_color(aj.thumbframecolor) : ""
    };
    var C = function(aT) {
        if (aT) {
            return (aj.thumbframecolor && aj.thumbselectedframewidth ? "border-color:" + G.format_color(aj.thumbframecolor) + ";" : "") + (G.is_ie8() ? aj.thumbframeopacity + ";" : "")
        }
        return (aj.thumbframecolor && aj.thumbframewidth ? "border-color:" + G.format_color(aj.thumbframecolor) + ";" : "") + (G.is_ie8() ? aj.thumbframeopacity + ";" : "")
    };
    var aA = function() {
        return false
    };
    var c = function(aX) {
        if (aj.usethumbdots) {
            return ""
        }
        var aT = ax("#" + d + "_thumb_" + aX.position + ".jb-thm-thumb-selected").length > 0 && G.is_large_screen_mode(aj);
        var aV = aT ? C() : "";
        var aW = aT ? aj.thumbselectedframewidth : aj.thumbframewidth;
        var aY = aT ? aj.thumbselectedframewidth : aj.thumbframewidth;
        var aU = 0;
        if (aA() && aY > 0) {
            aU = 1
        }
        return '<div class="jb-idx-thb-frame" style="position:absolute;border-style:solid;' + aV + ";border-width:" + (aY + aU) + "px;width:" + (aa - 2 * aW - aU) + "px;height:" + (av - 2 * aW - aU) + "px;left:0px;top:0;" + C(aT) + y(aj) + '"></div>'
    };
    var aM = function() {
        if (s) {
            return D
        }
        return ""
    };
    var ah = function(aT) {
        if (aT.isPreloadingThumbnail) {
            return
        }
        aT.isPreloadingThumbnail = true;
        an.position_2_fill_image(aa, av, aT.thumbURL, function(aV) {
            aT.thumb_loaded = 1;
            if (aa === av && aV.imageExpectedWidth === aV.imageExpectedHeight) {
                aT.thumb_width = aa;
                aT.thumb_height = av;
                aT.imageExpectedWidth = av;
                aT.imageExpectedHeight = av;
                aT.top = 0;
                aT.left = 0
            } else {
                aT.thumb_width = aV.imageWidth;
                aT.thumb_height = aV.imageHeight;
                aT.imageExpectedWidth = aV.imageExpectedWidth;
                aT.imageExpectedHeight = aV.imageExpectedHeight;
                aT.top = aV.imageTop;
                aT.left = aV.imageLeft
            }
            ax("#" + d + "_thumb_" + aT.position).html("<img class='jb-thm-thumb-image jb-thm-thumb-preloaded' src='" + aT.thumbURL + "' style='" + aM() + i(aT, true) + y(aj) + "' alt='" + (aT.title ? aT.title : aT.thumbURL) + "'>" + c(aT));
            var aU = ax("#" + d + "_thumb_" + aT.position + " img");
            if (!aU.is(":visible")) {
                f.utils.fade_in(f.config, aU, 1000 * f.config.fadetime, false, null, "indexpanel")
            }
            X.update_image(aT);
            ax("#" + d + "_thumb_" + aT.position + " img").disableSelection()
        }, true)
    };
    var aN = function(aT) {
        return G.get_shadow_style_string(aT.thumbshadowcolor, aT.thumbshadowcolora, aT.thumbshadowblur)
    };
    var ai = function(aV, aU, aT) {
        if (aj.usethumbdots) {
            return aT + "<div data-position='" + aV.position + "' id='" + d + "_thumb_" + aV.position + "' class='jb-idx-thumb jb-thm-thumb-dot' style='" + aH() + "'><div class='jb-thm-thumb-image' style='" + i(aV) + "'>" + ((ax.browser.msie && ax.browser.version < 9) ? "&#xe015;" : "") + "</div></div>"
        }
        if (aV.thumb_loaded) {
            return aT + "<div data-position='" + aV.position + "' id='" + d + "_thumb_" + aV.position + "' class='jb-idx-thumb' style='" + aH() + aN(aj) + "'><img class='jb-thm-thumb-image' src='" + aV.thumbURL + "' style='" + aM() + i(aV) + y(aj) + "' alt='" + (aV.title ? aV.title : aV.thumbURL) + "'>" + c(aV) + "</div>"
        } else {
            aU.append(aT);
            aU.append("<div data-position='" + aV.position + "' id='" + d + "_thumb_" + aV.position + "' class='jb-idx-thumb' style='" + aH() + aN(aj) + "'>" + aj.thumb_load_placeholder + "</div>");
            ah(aV);
            return ""
        }
    };
    var aI = function() {
        return (aL <= 0) ? aS - 1 : aL - 1
    };
    var U = function() {
        return (aL >= aS - 1) ? 0 : aL + 1
    };
    var P = function() {
        aB(aL)
    };
    var au = function(aT) {
        if (aT < 0 || aT >= aS) {
            return
        }
        S(aT)
    };
    var at = function(aT, aU, aX, aV) {
        if (aU) {
            ad = aU
        }
        if (aX) {
            B = aX
        }
        ab();
        var aW = parseInt(aT / (L * W));
        S(aW, aV);
        w(aT);
        if (!G.is_large_screen_mode(aj)) {
            M(".jb-idx-title").show()
        }
    };
    var A = function() {
        aB(aI())
    };
    var Q = function() {
        aB(U())
    };
    var w = function(aW) {
        q = aW;
        var aV = aa - (2 * aj.thumbselectedframewidth);
        var a1 = av - (2 * aj.thumbselectedframewidth);
        var aT = aa - (2 * aj.thumbframewidth);
        var a0 = av - (2 * aj.thumbframewidth);
        var aZ = G.format_color(aj.navbuttonbackcolor);
        if (aj.usethumbdots) {
            aZ = G.format_color(aj.thumbdotcolor)
        }
        M(".jb-idx-thumb").removeClass("jb-thm-thumb-selected").children("div").css({
            color: aZ
        });
        var aU = (aA() && aj.thumbframewidth > 0 ? 1 : 0);
        var aY = (aA() && aj.thumbselectedframewidth > 0 ? 1 : 0);
        M(".jb-idx-thumb .jb-idx-thb-frame").css({
            width: (aT - aU) + "px",
            height: (a0 - aU) + "px",
            "border-width": aj.thumbframewidth + aU
        });
        var aX = ax("#" + d + "_thumb_" + aW).addClass("jb-thm-thumb-selected").addClass("jb-thumb-visited").children("div").css({
            color: G.format_color(aj.thumbdothovercolor)
        });
        ax("#" + d + "_thumb_" + aW + " .jb-idx-thb-frame").css({
            width: aV + "px",
            height: (a1 - aY) + "px",
            "border-width": (aj.thumbselectedframewidth + aY) + "px",
            "border-color": F()
        });
        if (aj.thumbframecolor) {
            aX.children(".jb-idx-thb-frame").css({
                "border-color": G.format_color(aj.thumbframecolor)
            })
        }
    };
    var aP = function() {
        var aT = (aA() && aj.thumbselectedframewidth > 0 ? 1 : 0);
        return {
            height: aj.thumbheight - 2 * aj.thumbselectedframewidth - aT,
            width: aj.thumbwidth - 2 * aj.thumbselectedframewidth,
            "border-width": aj.thumbselectedframewidth + aT,
            "border-color": G.format_color(aj.thumbframecolor)
        }
    };
    var ak = function() {
        return H().width + 2 * an.get_stage_padding(M("").width(), M("").height(), aj) + aj.thumbpadding
    };
    var E = -1;
    var S = function(aW, aU) {
        M(" .jb-idx-thb-container").remove();
        var a3 = M(".jb-idx-show-area");
        var aT = H();
        a3.css({
            top: aT.top,
            left: aT.left + parseInt(aj.thumbpadding / 2),
            width: aT.width - parseInt(aj.thumbpadding),
            height: aT.height
        });
        if (M(".table_page_" + aW).length == 0) {
            aw(aW, a3, 0, B, e)
        }
        var aY = ak();
        if (aj.enablelooping || aW < aS - 1) {
            var a6 = (aW >= aS - 1) ? 0 : aW + 1;
            aw(a6, a3, +aY, B, al)
        }
        if (aj.enablelooping || aW > 0) {
            var aZ = (aW <= 0) ? aS - 1 : aW - 1;
            aw(aZ, a3, -aY, B, af)
        }
        z(aW);
        w(q);
        var a1 = M(" .jb-idx-thumb");
        if (!aj.forcetouchmode) {
            var a9 = function(bb) {
                var bc = M(".jb-idx-thb-list div.jb-idx-thumb .jb-thm-thumb-image");
                bc.stop(true, true).show();
                if (!G.is_earlier_ie()) {
                    bc.css({
                        opacity: 1
                    })
                }
                aO(bb)
            };
            a1.click(function(bb) {
                if (aD || a) {
                    return false
                }
                s = false;
                bb.preventDefault();
                var bc = parseInt(ax(this).attr("data-position"));
                if (aj.autofullscreenexpand) {
                    G.show_real_fullscreen(aj.containerid);
                    f.detail_panel.set_photo_position(bc);
                    f.detail_panel.set_visible_flag(true);
                    f.index_panel.set_visible_flag(false);
                    window.setTimeout(function() {
                        if (f.config.showimageoverlay.toUpperCase() != "NEVER") {
                            f.setOverlayFlag(true)
                        }
                        f.features.buttonbar.setPosition();
                        f.showImage(bc, 0)
                    }, 300);
                    return false
                }
                a9(bc);
                M("").focus();
                return false
            });
            if (aj.usethumbdots) {
                var aX = G.format_color(aj.thumbdothovercolor);
                var a7 = G.format_color(aj.thumbdotcolor);
                M(" .jb-idx-thumb .jb-thm-thumb-image").hover(function() {
                    ax(this).css({
                        color: aX
                    })
                }, function() {
                    var bb = a7;
                    if (ax(this).parent(".jb-thm-thumb-selected").length > 0) {
                        bb = aX
                    }
                    ax(this).css({
                        color: bb
                    })
                })
            }
            if (!I) {
                a1.mousedown(function(bb) {
                    if (bb.preventDefault) {
                        bb.preventDefault()
                    }
                    ax(this).children(".jb-idx-thb-frame").css(aP())
                }).bind("touchstart", function() {
                    ax(this).children(".jb-idx-thb-frame").css(aP())
                });
                ax(".jb-idx-thb-frame").mousedown(function(bb) {
                    if (bb.preventDefault) {
                        bb.preventDefault()
                    }
                    ax(this).css(aP())
                })
            }
            if (aj.changeimageonhover) {
                a1.mouseenter(function() {
                    var bb = ax(this).attr("data-position");
                    if (E == bb) {
                        return
                    }
                    a9(bb);
                    E = bb
                }, null)
            }
        } else {
            aq()
        }
        if (aj.thumbframecolor) {
            var a8 = aa - 2 * aj.thumbhoverframewidth;
            var aV = av - 2 * aj.thumbhoverframewidth;
            var a0 = aa - 2 * aj.thumbframewidth;
            var a4 = av - 2 * aj.thumbframewidth;
            var a2 = G.is_large_screen_mode(aj);
            var ba = (aA() && aj.thumbhoverframewidth > 0 ? 1 : 0);
            var a5 = (aA() && aj.thumbframewidth > 0 ? 1 : 0);
            a1.hover(function() {
                var bb = ax(this);
                if (bb.is(".jb-thm-thumb-selected") && a2) {
                    return
                }
                bb.children(".jb-idx-thb-frame").css({
                    width: a8 - ba,
                    height: aV - ba,
                    "border-color": G.format_color(aj.thumbframecolor),
                    "border-width": aj.thumbhoverframewidth + ba
                })
            }, function() {
                var bb = ax(this);
                if (bb.is(".jb-thm-thumb-selected") && a2) {
                    return
                }
                bb.children(".jb-idx-thb-frame").css({
                    width: a0 - a5,
                    height: a4 - a5,
                    "border-color": aj.thumbframewidth ? G.format_color(aj.thumbframecolor) : "transparent",
                    "border-width": aj.thumbframewidth + a5
                })
            })
        }
        M(".jb-classifier-thumb-area").disableSelection();
        aL = aW;
        if (typeof ay == "function") {
            ay(aU)
        }
    };
    var aR = function() {
        var aU = X.length();
        if (W * L <= aU) {
            return {
                row: W,
                col: L
            }
        }
        if (L >= aU) {
            return {
                row: 1,
                col: aU
            }
        }
        var aT = (aU % L == 0 ? 0 : 1);
        return {
            row: parseInt(aU / L) + aT,
            col: L
        }
    };
    var z = function(aZ) {
        var a0 = H();
        var a1 = aR();
        var aY = a1.row * (az);
        var aT = parseInt((B - aY) / 4);
        if (aT < 30 && aT > 15 && a1.row >= a1.col) {
            aT -= 10
        }
        if (B < ad && aT > 20 && aT < 26) {
            aT -= 10
        }
        if (B <= aT || aT < 0) {
            aT = 0
        }
        var aU = parseInt((ad - (a1.col * R)) / 2 + parseInt(x / 2));
        if (aU < 0) {
            aU = 0
        }
        M(".jb-idx-title").css({
            left: aU + "px",
            top: aT + "px"
        });
        M(".jb-idx-ssm-title-wrapper").css({
            width: (a0.width - 2 * aj.thumbpadding)
        });
        var aW = ad / 2 - 18;
        if (aW < aU) {
            aW = aU
        }
        var aX;
        if (G.is_large_screen_mode(aj)) {
            var aV = G.is_side_layout(aj) && aj.thumbnavposition.toUpperCase() === "BOTTOM" && aj.maxthumbcolumns <= 1 ? 0 : aj.thumbpadding;
            aX = parseInt(a0.top + (G.is_side_layout(aj) ? a0.height : aY) + aV - aj.thumbpadding / 2);
            if (aj.usethumbdots && aj.showpagingtext) {
                aX += (G.is_side_layout(aj) ? 25 : -5)
            }
        } else {
            aX = parseInt(a0.top + aY + aj.thumbpadding / 2 + (B - aY > 0 && aj.thumbnavposition.toUpperCase() != "BOTTOM" ? (B - aY) / 2 : 0))
        }
        if (aX <= 0) {
            aX = 0
        }
        M(".jb-idx-thb-list-page-number").css({
            left: aW + "px",
            top: aX + "px"
        }).html((aZ + 1) + " " + aj.languagelistall.pgnum + " " + aS);
        if (aj.textcolor) {
            M(".jb-idx-title, .jb-idx-thb-list-page-number, .jb-idx-ssm-title-wrapper").css({
                color: G.format_color(aj.textcolor)
            })
        } else {
            if (ax.browser.msie && ax.browser.version < 8) {
                M(".jb-idx-ssm-title-wrapper").css({
                    color: "#ffffff"
                })
            }
        }
        if (aj.textshadowcolor) {
            M(".jb-idx-title, .jb-idx-title textarea, .jb-idx-thb-list-page-number").css({
                "text-shadow": G.get_text_shadow_style(aj.textshadowcolor, aj.textshadowcolora, true)
            })
        }
        if (f.config.galleryfontface) {
            M(".jb-idx-title, .jb-idx-thb-list-page-number, .jb-idx-ssm-title-wrapper").css({
                "font-family": f.config.galleryfontface
            })
        }
    };
    var aB = function(aT) {
        ab();
        S(aT)
    };
    var V = function(aU, aT) {
        if (!aU) {
            return
        }
        var aV = 1000 * aj.smallthumbslidetime;
        aV = aV * ((400 - aU / 2) / 400);
        w(q);
        M("table.jb-idx-thb-container").animate({
            left: "+=" + (-aU),
            avoidTransforms: !aj.use_webkit_transform,
            useTranslate3d: aj.use_3d_transform
        }, aV, "", aT)
    };
    var ao = function(aY, aX, a0, aZ, aT) {
        var aU = -1;
        if (aZ) {
            ad = aZ
        }
        if (aT) {
            B = aT
        }
        var a1 = function() {
            a = false;
            if (aY) {
                if (aU === U()) {
                    Q()
                }
            } else {
                if (aU === aI()) {
                    A()
                }
            }
            aU = -1;
            if (typeof a0 == "function") {
                a0()
            }
        };
        aU = aY ? U() : aI();
        if (typeof(aX) == "undefined") {
            aX = 0
        }
        if (!a) {
            a = true;
            var aV = 1000 * aj.smallthumbslidetime;
            if (aX > 0) {
                aV = aV * ((400 - aX / 2) / 400)
            }
            var aW = ak();
            M("table.jb-idx-thb-container").animate({
                left: (aY ? "-=" : "+=") + (aW - aX),
                avoidTransforms: !aj.use_webkit_transform,
                useTranslate3d: aj.use_3d_transform
            }, aV, "easeOutQuart");
            window.setTimeout(function() {
                a1()
            }, aV)
        } else {
            M("table.jb-idx-thb-container").stop();
            a1()
        }
    };
    var k = function(aU, aW, aT, aV) {
        s = false;
        ao(true, aU, aW, aT, aV)
    };
    var ar = function(aU, aW, aT, aV) {
        s = false;
        ao(false, aU, aW, aT, aV)
    };
    var Z = function() {
        s = false
    };
    var ac = function(aU, aT, aW, aV) {
        if (aU) {
            ad = aU
        }
        if (aT) {
            B = aT
        }
        M(".jb-panel-index").css({
            width: aU,
            height: aT,
            top: aW,
            left: aV
        })
    };
    var n = function() {
        s = false;
        a = false
    };
    var aJ = function() {
        if (aL + 1 >= aS) {
            return true
        }
        return false
    };
    var r = function() {
        if (aL <= 0) {
            return true
        }
        return false
    };
    var K = function() {
        return aL
    };
    var Y = function(aT) {
        if (aT) {
            M(".jb-idx-title").show();
            M(".jb-classifier-link-wrapper.jb-classifier-thumb-area").show()
        } else {
            M(".jb-idx-title").hide();
            M(".jb-classifier-link-wrapper.jb-classifier-thumb-area").hide()
        }
    };
    var b = function() {
        var aT = W * az;
        if (aT < G.get_nav_btn_size(aj)) {
            aT = G.get_nav_btn_size(aj)
        }
        return aT
    };
    var ag = function(aT) {
        a = true;
        window.setTimeout(function() {
            a = false
        }, aT)
    };
    var t = function(aT) {
        aC = aT
    };
    var m = function() {
        return aC
    };
    var aE = function() {
        return aD
    };
    return {
        initialize: ae,
        show_current_page: P,
        show_prev_page: A,
        show_next_page: Q,
        move_to_next_page: k,
        move_to_prev_page: ar,
        show_page_4_image_position: at,
        show_page_by_page_index: au,
        is_last_page: aJ,
        is_first_page: r,
        get_index: K,
        repaint: n,
        get_thumblist_size: v,
        display_gallery_top: Y,
        get_image_index_range: aK,
        set_thumbnail_visited: w,
        get_thumb_height: b,
        yield_4_transition: ag,
        synchronize_config: p,
        get_show_area_position: H,
        set_visible_flag: t,
        is_visible: m,
        setContext: ap,
        cleanup_initial_load_flag: Z,
        isInTouchEvent: aE,
        getCurrentDisplayingThumbCount: j,
        set_container_size: ac
    }
};
var juicebox_gallery_detail_panel = function(ad) {
    var ai, a, ar, S, Y, E, ac, k, N, ao, D;
    var ax;
    var ah = ad;
    var az;
    var ay = null;
    var at = -1;
    var x = 0;
    var V, A;
    var aw;
    var al = false;
    var af = false;
    var aB = 12;
    var C = 18;
    var ap = false;
    var d, J;
    var H = false;
    var W = function(aC) {
        af = true;
        ai = aC.jquery;
        a = aC.document_id;
        ar = aC.container;
        ax = aC.caption_container;
        Y = aC.config;
        E = aC.utils;
        ac = aC.sizing;
        S = aC.glymng;
        k = aC.before_draw_event_callback;
        N = aC.finish_draw_event_callback;
        ao = aC.touch_event_callback;
        D = aC.caption_complete_callback;
        aw = 1000 * Y.imagetransitiontime;
        if (aw <= 0) {
            aw = 10
        }
        V = aC.current_width;
        A = aC.current_height;
        aq(0);
        az = aC.debug
    };
    var ae = function(aC) {
        d = aC;
        J = d._
    };
    var X = function() {
        if (!ay) {
            return 0
        }
        return ay.position
    };
    var v = function() {
        return ay
    };
    var aq = function(aC) {
        ay = d.gallery_manager().get_image(aC)
    };
    var t = function(aG, aE) {
        if (!aG) {
            aG = Y.captionposition.toUpperCase()
        }
        if (aG === "BOTTOM" || aG === "NONE" || aG === "BELOW_THUMBS") {
            return
        }
        if (typeof(D) != "function") {
            return
        }
        var aI = J(".caption_" + aE + " a");
        var aC = J(".caption_" + aE + " .jb-caption").height();
        if (aI.length > 0 && aC === 0) {
            aC = 50
        }
        aC = (aC && aI.length > 0 ? aC + 2 * aB : 0);
        var aD, aH, aF;
        if (aG === "BELOW_IMAGE" || d.utils.is_captionposition_default(Y)) {
            aD = S.get_image(aE);
            if (!aD.loaded) {
                return
            }
            aH = ac.get_image_display_size(aD, V, A, Y);
            aF = (aH.top + aH.height + ac.get_image_framewidth(V, A, Y));
            if (aF > A) {
                aF = A - ac.get_image_framewidth(V, A, Y) - Y.imagepadding
            }
            D(aF - (d.utils.is_captionposition_default(Y) ? aC : 0))
        } else {
            D(A - aC)
        }
    };
    var av = function(aM, aO, aG, aF, aE) {
        d.index_panel.cleanup_initial_load_flag();
        var aQ = at > -1 ? at : ay.position;
        var aN = -1;
        if (typeof(aF) != "undefined") {
            aN = aF
        } else {
            if (aM && S.get_next_image(aQ)) {
                aN = S.get_next_image(aQ).position
            } else {
                if (!aM && S.get_previous_image(aQ)) {
                    aN = S.get_previous_image(aQ).position
                }
            }
        }
        if (aN < 0) {
            return
        }
        var aL;
        var aV = Y.captionposition.toUpperCase();
        if (typeof(aG) === "undefined") {
            aG = true
        }
        if (aV === "NONE" || (",BOTTOM,BELOW_IMAGE,OVERLAY,BELOW_THUMBS,".indexOf("," + aV + ",") < 0 && Y.showimageoverlay.toUpperCase() === "NEVER")) {
            aG = false
        }
        var aR = Y.imagetransitiontype.toUpperCase();
        var aT = function(aZ) {
            if (aV === "NONE") {
                return
            }
            if (Y.showimageoverlay.toUpperCase() === "NEVER" && aV != "BOTTOM" && aV != "BELOW_THUMBS" && aV != "BELOW_IMAGE") {
                return
            }
            if (!Y.slidecaption && (aG || aV === "BOTTOM" || aV === "BELOW_IMAGE" || aV == "BELOW_THUMBS")) {
                if (E.is_firefox() && aR == "CROSS_FADE") {
                    J(".jb-cap-frame.jb-status-fading").fadeIn(aZ);
                    ax.fadeIn(aZ)
                } else {
                    E.fade_in(Y, J(".jb-cap-frame.jb-status-fading"), aZ);
                    E.fade_in(Y, ax, aZ)
                }
                M(aV, aN, aZ + 50)
            }
        };
        var aK = function(a0) {
            if (aG) {
                var aZ = a0;
                if (ai.browser.msie && ai.browser.version >= 7 && ai.browser.version < 8) {
                    aZ = 0
                }
                if (!aZ) {
                    aD.addClass("jb-status-fading").hide()
                } else {
                    E.fade_out(Y, aD.addClass("jb-status-fading"), aZ, null)
                }
            } else {
                aD.removeClass("jb-status-fading")
            }
        };
        var aY = 0;
        var aU = function(aZ) {
            k(aN);
            b(aN, aZ, null, aG, true);
            if (J(".jb-dt-main-image-" + aN).css("opacity") == 0.01) {
                J(".jb-dt-main-image-" + aN).css("opacity", 1)
            }
            if (aY) {
                window.clearTimeout(aY)
            }
            aY = 0;
            if (aZ) {
                aY = window.setTimeout(function() {
                    aY = 0;
                    N(aN)
                }, aZ + 50)
            } else {
                N(aN)
            }
            aT(aZ);
            at = -1
        };
        var aJ = function(a0, a1) {
            if (aY) {
                window.clearTimeout(aY)
            }
            aY = 0;
            var aZ = at > -1 ? at : aN;
            if (!aE) {
                k(aZ)
            }
            b(aZ, 0, null, aG, true);
            if (!aE && !a1) {
                N(aZ)
            }
            aT(a0);
            at = -1
        };
        if (at > -1) {
            aL = J(" .jb-panel-detail .jb-dt-main-frame, .jb-cap-frame");
            aL.stop(false, false);
            J(".jb-cap-frame.caption_" + aN).stop(false, false);
            J(".jb-dt-main-image-" + aQ).stop(false, false);
            if (x) {
                window.clearTimeout(x);
                x = 0
            }
            aJ(0, true)
        }
        if (typeof(aO) == "undefined") {
            aO = 0
        }
        at = aN;
        var aW = 1000 * Y.imagetransitiontime;
        if (aO > 0) {
            aW = aW * ((400 - aO / 2) / 400)
        }
        var aP = parseInt(V) + parseInt(Y.minimagegap) + (2 * ac.get_stage_padding(J("").width(), J("").height(), Y));
        var aI = E.is_in_iframe() && E.is_chrome();
        if (aE || !aI) {
            k(aN)
        }
        var aD = J(".jb-cap-frame.caption_" + aQ);
        aL = J(" .jb-panel-detail .jb-dt-main-frame");
        aL.stop();
        if (x) {
            window.clearTimeout(x);
            x = 0
        }
        var aX = aW / 2;
        if (d.utils.is_captionposition_default(Y)) {
            aX = 0
        }
        if (aO > 0 || (E.is_swipable_device() && aF == null)) {
            q(0);
            E.clean_up_transition(aL);
            aL.animate({
                left: (aM ? "-=" : "+=") + (aP - aO),
                avoidTransforms: !Y.use_webkit_transform,
                useTranslate3d: Y.use_3d_transform
            }, aW, "easeInOutQuart", function() {
                aJ(aW / 2)
            });
            aK(aX)
        } else {
            if (aR === "NONE" || aE) {
                aD.hide();
                aJ(0)
            } else {
                if (aR === "CROSS_FADE") {
                    var aH = ay;
                    ay = S.get_image(aN);
                    aL = J(".jb-dt-main-image-" + aQ);
                    if (aH.width != ay.width || aH.height != ay.height) {
                        var aC = J(".jcbx-glry-classic").css("background-color");
                        aL.css({
                            "background-color": aC
                        })
                    }
                    if (ay.loaded) {
                        ar.append(au(ay, 0, true, false, 1, true));
                        ax.append(e(ay, ax.width(), ax.height(), 0, false, 500));
                        if (juicebox_instance_count > 0 && d.features.autoplay.isPlaying()) {
                            aL.fadeOut(aW)
                        } else {
                            E.fade_out(Y, aL, aW, null, "images")
                        }
                        x = window.setTimeout(function() {
                            var aZ = at > -1 ? at : aN;
                            if (aI) {
                                k(aZ)
                            }
                            b(aZ, 0, null, aG, true);
                            N(aZ);
                            aT(aW / 2);
                            x = 0
                        }, aW + 100);
                        aK(aW)
                    } else {
                        aJ(aW / 2)
                    }
                } else {
                    if (aR === "FADE" || ((aF || aF === 0) && aR != "FADE" && aR != "CROSS_FADE" && aR != "NONE")) {
                        q(aW / 2);
                        if (aL.length > 0) {
                            if (juicebox_instance_count > 1 && d.features.autoplay.isPlaying()) {
                                var aS = function() {
                                    aL.fadeOut(aW / 2, function() {
                                        aU(aW / 2)
                                    })
                                };
                                window.setTimeout(function() {
                                    aS()
                                }, 100 + 100 * d.instance_id)
                            } else {
                                E.stop_fading("images");
                                E.fade_out(Y, aL, aW / 2, function() {
                                    aU(aW / 2)
                                }, "images", true)
                            }
                            aK(aW / 2)
                        } else {
                            if (aF || aF === 0) {
                                x = window.setTimeout(function() {
                                    x = 0;
                                    aU(aW / 2)
                                }, aW / 2)
                            }
                        }
                        aK(aW / 2)
                    } else {
                        q(0);
                        E.clean_up_transition(aL);
                        aL.animate({
                            left: (aM ? "-=" : "+=") + (aP - aO),
                            avoidTransforms: !Y.use_webkit_transform,
                            useTranslate3d: Y.use_3d_transform
                        }, aW, (E.is_earlier_ie() ? "easeOutQuart" : "easeInOutQuart"), function() {
                            aJ(aW / 2)
                        });
                        aK(aX)
                    }
                }
            }
        }
    };
    var aA = function(aD, aC) {
        av(true, aD, aC)
    };
    var Q = function(aE) {
        if (!aE) {
            return
        }
        var aC = 1000 * Y.imagetransitiontime;
        aC = aC * ((400 - aE / 2) / 400);
        var aD;
        aD = J(" .jb-panel-detail .jb-dt-main-frame");
        aD.stop();
        E.clean_up_transition(aD);
        aD.animate({
            left: "+=" + (-aE),
            avoidTransforms: !Y.use_webkit_transform,
            useTranslate3d: Y.use_3d_transform
        }, aC, "", null)
    };
    var G = function(aD, aC) {
        av(false, aD, aC)
    };
    var r = function() {
        if (Y.textcolor) {
            J(".jb-cap-frame a").css({
                color: E.format_color(Y.textcolor)
            })
        }
        if (Y.textshadowcolor) {
            J(".jb-cap-frame a").css({
                "text-shadow": E.get_text_shadow_style(Y.textshadowcolor, Y.textshadowcolora, true)
            })
        }
    };
    var U = function(aD, aC, aF, aE) {
        if (aD) {
            V = aD
        }
        if (aC) {
            A = aC
        }
        J(".jb-panel-detail").css({
            width: aD,
            height: aC,
            top: aF,
            left: aE
        })
    };
    var b = function(aV, aU, aL, aR, aC, aO, aJ) {
        if (aO) {
            V = aO
        }
        if (aJ) {
            A = aJ
        }
        if (aO || aJ) {
            J(".jb-dt-main-frame").css({
                width: V,
                height: A
            })
        }
        if (typeof(aR) === "undefined") {
            aR = true
        }
        var aS = parseInt(V) + parseInt(Y.minimagegap) + (2 * ac.get_stage_padding(J("").width(), J("").height(), Y));
        ay = S.get_image(aV);
        at = -1;
        var aK = J(".jb-panel-detail");
        if (aK.length > 0 && !aK.is(":visible")) {
            aK.show()
        }
        var aE = S.get_image(aV);
        var aN = S.get_previous_image(aV);
        var aQ = S.get_next_image(aV);
        var aG = aU > 0;
        var aT = Y.imagetransitiontype.toUpperCase();
        if (aT != "FADE" && aT != "CROSS_FADE" && aT != "NONE" && S.length() > 2) {
            ar.children(":not(.jb-dt-main-image-" + aV + ")").remove()
        } else {
            ar.children().remove()
        }
        var aF = ar.children(".jb-dt-main-image-" + aV);
        if (aF.length <= 0) {
            ar.append(au(aE, 0, true, aG));
            aF = ar.children(".jb-dt-main-image-" + (aE ? aE.position : ""))
        } else {
            aF.css({
                left: 0
            })
        }
        if (aE.loaded && (Y.imagenavposition.toUpperCase() === "IMAGE" || Y.buttonbarposition.toUpperCase() === "OVERLAY_IMAGE")) {
            var aI = ac.get_image_display_size(aE, V, A, Y);
            O(aI, aw / 2)
        }
        if (aN) {
            aF.before(au(aN, -aS, false, false))
        }
        if (aQ) {
            aF.after(au(aQ, aS, false, false))
        }
        if (!aF.is(":visible")) {
            if (!ai.browser.msie || ai.browser.version >= 10) {
                aF.show().css({
                    opacity: 0.01
                })
            }
            E.fade_in(Y, aF, aU, false, null, "captions")
        } else {
            if (aU) {
                if (aF.css("opacity") < 1) {
                    if (!ai.browser.msie || ai.browser.version >= 10) {
                        aF.show().css({
                            opacity: 0.01
                        })
                    }
                    E.fade_in(Y, aF, aU, false, null, "captions")
                }
            } else {
                aF.css({
                    opacity: 1
                })
            }
        }
        var aW = ax.width();
        var aD = ax.height();
        if (aR === true) {
            if (aG || aC) {
                if (ai.browser.msie || E.is_firefox3()) {
                    ax.hide()
                } else {
                    E.fade_out(Y, ax, 0)
                }
            } else {
                if (ay.loaded) {
                    E.fade_in(Y, ax, 0)
                }
            }
        } else {
            ax.hide()
        }
        Z(aE);
        var aP = aW + parseInt(Y.minimagegap) + ac.get_side_panel_width(Y);
        ax.html(e(aN, aW, aD, -aP, aR) + e(aE, aW, aD, 0, aR) + e(aQ, aW, aD, aP, aR));
        t("", aE.position);
        r();
        if (Y.captionbackcolor) {
            J(".jb-caption").css({
                "background-color": E.format_color(Y.captionbackcolor)
            })
        }
        if (Y.captionbacktopcolor) {
            var aM = E.format_color(Y.captionbacktopcolor);
            var aH = E.format_color(Y.captionbackcolor);
            if (!aH) {
                aH = "rgba(0, 0, 0, 0.3)"
            }
            J(".jb-caption").css({
                background: "linear-gradient(180deg, " + aM + ", " + aH + ")"
            })
        }
        if (aU > 0) {
            E.stop_fading("images");
            E.fade_in(Y, J(".jb-dt-main-image-" + aE.position), aU, false, aL, "images", true);
            if (aR) {
                E.fade_in(Y, ax, aU, false, null, "captions")
            }
        } else {
            if (aR && !aC) {
                ax.show()
            }
        }
    };
    var l = function(aD, aC) {
        E.fade_out(Y, J(".jb-dt-main-image-" + ay.position), aD, aC);
        E.fade_out(Y, ax, aD)
    };
    var F = function(aC) {
        if (aC >= S.length()) {
            aC = S.length() - 1
        }
        if (aC < 0) {
            return 0
        }
        return aC
    };
    var n = function(aD, aF) {
        var aC = S.get_range(F(aD), F(aF));
        for (var aE = 0; aE < aC.length; aE++) {
            R(aC[aE])
        }
    };
    var Z = function(aF) {
        if (!aF.loaded) {
            return
        }
        var aD = Y.captionposition.toUpperCase();
        if (!d.utils.is_captionposition_default(Y)) {
            if (aD === "BELOW_THUMBS") {
                return
            }
            if (aD === "BELOW_IMAGE") {
                ax.css({
                    overflow: "visible"
                })
            }
            return
        }
        var aE = ac.get_image_display_size(aF, V, A, Y);
        var aG = aE.top + aE.frameHeight - Y.maxcaptionheight + Y.framewidth;
        if (aG < 0) {
            aG = 0
        }
        var aH = parseInt(ar.css("top"));
        aG += aH;
        var aC = parseInt(J("").height()) - aH - aE.top - aE.frameHeight - Y.framewidth;
        ax.css({
            top: aG,
            bottom: aC,
            overflow: "hidden"
        })
    };
    var ab = function(aD, aC) {
        if (!aD) {
            aD = Y.captionposition.toUpperCase()
        }
        if (aD != "BELOW_THUMBS" || !E.is_side_layout(Y)) {
            return C
        }
        var aF = ah.get_show_area_position();
        var aE = aF.left + Y.thumbpadding - (aC ? 72 : 0);
        if (aE < C) {
            aE = C
        }
        return aE
    };
    var B = function(aH) {
        var aF = J(".caption_" + aH.position + " .jb-caption").height(),
            aC;
        var aE = Y.captionposition.toUpperCase();
        var aD = 140;
        if (!d.utils.is_captionposition_default(Y)) {
            aC = aD
        } else {
            if (aH.loaded) {
                if (!i(aH)) {
                    aC = 0;
                    aF = 0
                } else {
                    var aG = ac.get_image_display_size(aH, V, A, Y);
                    aC = aG.width;
                    aF = aG.height
                }
            } else {
                return null
            }
        }
        if (aC < 100 || aF < J(".caption_" + aH.position + " .jb-caption").height()) {
            return {
                display: "none"
            }
        } else {
            if (aC < aD) {
                return {
                    display: "block",
                    padding: "0"
                }
            } else {
                return {
                    display: i(aH) ? "block" : "none",
                    "padding-top": aB + "px",
                    "padding-right": ab(aE, true) + "px",
                    "padding-left": ab(aE) + "px",
                    "padding-bottom": (aa() ? aB : (aB + 18)) + "px"
                }
            }
        }
    };
    var h = function(aF) {
        var aE = B(aF);
        if (!aE) {
            return ""
        }
        var aC = "";
        for (var aD in aE) {
            if (!aD) {
                continue
            }
            aC += aD + ":" + aE[aD] + ";"
        }
        return aC
    };
    var am = function(aH, aD) {
        if (!aH) {
            return
        }
        var aE = Y.captionposition.toUpperCase();
        if (aE !== "BELOW_IMAGE" && !d.utils.is_captionposition_default(Y)) {
            return
        }
        var aF = parseInt(ax.width()) + parseInt(Y.minimagegap) + ac.get_side_panel_width(Y);
        var aG = (aH.position - ay.position) * aF;
        var aC = B(aH);
        if (aC) {
            J(".caption_" + aH.position + " .jb-caption").css(aC)
        }
        J(".jb-cap-frame.caption_" + aH.position).attr("style", T(aH, ax.width(), ax.height(), aG, aD))
    };
    var y = function() {
        var aC = Y.captionposition.toUpperCase();
        return (aC != "BELOW_IMAGE" && aC != "BOTTOM") ? false : true
    };
    var T = function(aE, aM, aH, aD, aK) {
        var aF = y();
        var aN = "position:absolute;";
        var aO, aG;
        var aJ = Y.captionposition.toUpperCase();
        var aC = Y.imagetransitiontype.toUpperCase();
        if (aC === "CROSS_FADE" && !aK && aE.loaded) {
            aN += (ai.browser.msie || E.is_firefox3()) ? "display:none;" : "opacity:0;"
        }
        if (aJ === "BELOW_IMAGE" || d.utils.is_captionposition_default(Y)) {
            if (!aE.loaded) {
                aO = (d.utils.is_captionposition_default(Y)) ? "" : "top:" + (aH - Y.maxcaptionheight > 0 ? aH - Y.maxcaptionheight : 0) + "px;";
                return aN + (aF ? "height:100%;" : "") + "width:100%;left:" + aD + "px;display:none;" + aO
            }
        } else {
            if ((!d.utils.is_captionposition_default(Y) && !aF) || !aE.loaded || aJ === "BOTTOM") {
                return aN + (aF ? "height:100%;" : "") + "width:" + aM + "px;left:" + aD + "px;"
            }
        }
        var aL = ac.get_image_display_size(aE, V, A, Y);
        var aI = ac.get_image_framewidth(V, A, Y);
        if (d.utils.is_captionposition_default(Y)) {
            aO = Y.imagecornerradius > 0 ? L(Y) : "";
            aG = "width:" + (aL.frameWidth) + "px;";
            aD += aI
        } else {
            aO = "top:" + (aL.top + aL.frameHeight + 2 * aI + ac.get_image_padding(V, A, Y)) + "px;";
            aG = "width:" + (aL.frameWidth + 2 * aI) + "px;"
        }
        return aN + aG + "height:100%;padding:0;margin:0;left:" + (aL.left + aD) + "px;" + aO
    };
    var m = 0;
    var M = function(aE, aD, aC) {
        if (aE === "BOTTOM" || aE === "BELOW_IMAGE" || d.utils.is_captionposition_default(Y) || aE === "NONE") {
            return
        }
        if (m) {
            window.clearTimeout(m);
            m = 0
        }
        m = window.setTimeout(function() {
            m = 0;
            t(aE, aD)
        }, aC)
    };
    var c = function(aC) {
        if (!aC) {
            aC = Y.captionposition.toUpperCase()
        }
        if (d.utils.is_captionposition_default(Y)) {
            if (d.config.showimageoverlay.toUpperCase() === "NEVER") {
                return false
            }
            if (d.config.showinfobutton && !d.features.showinfo.visible()) {
                return false
            }
        }
        if (d.utils.is_captionposition_default(Y) || aC === "BELOW_IMAGE" || aC == "BELOW_THUMBS") {
            return true
        }
        return false
    };
    var aj = function(aE, aD, aC) {
        if (!aE.loaded) {
            return
        }
        Z(aE);
        am(aE, aC);
        if (!aC) {
            if (!c()) {
                return
            }
            if (!ax.is(":visible")) {
                ax.show()
            }
            E.fade_in(Y, J(".jb-cap-frame.caption_" + aE.position), aD, true);
            M("", aE.position, aD)
        } else {
            if (ai.browser.msie && ai.browser.version >= 10 && ax.is(":visible")) {
                ax.css({
                    opacity: 1
                })
            }
        }
    };
    var R = function(aD, aE) {
        if (aD.isPreloading || aD.loaded) {
            return
        }
        var aC = new Image();
        aD.isPreloading = true;
        aC.onload = function() {
            aD.loaded = true;
            aD.width = aC.width;
            aD.height = aC.height;
            S.update_image(aD);
            var aG = J(".jb-panel-detail .jb-dt-main-image-" + aD.position);
            if (aG.length > 0) {
                var aF = function() {
                    aG.html(ak(aD, aE, false));
                    var aH = J(".jb-panel-detail .jb-dt-main-image-" + aD.position + " img");
                    aH.disableSelection();
                    if (ay.position === aD.position) {
                        aG.hide();
                        window.setTimeout(function() {
                            E.fade_in(Y, aG, aw);
                            if (ai.browser.msie && ai.browser.version >= 10) {
                                window.setTimeout(function() {
                                    aj(aD, aw, true);
                                    S.setFirstImageIndex(-1)
                                }, aw / 2)
                            } else {
                                var aI = false;
                                if (S.getFirstImageIndex() === aD.position) {
                                    aI = true
                                }
                                aj(aD, aw, aI);
                                S.setFirstImageIndex(-1)
                            }
                        }, 50)
                    }
                };
                if (E.is_swipable_device()) {
                    window.setTimeout(aF, 100)
                } else {
                    aF()
                }
            }
        };
        aC.src = aD.imageURL
    };
    var au = function(aE, aD, aC, aG, aK, aH) {
        if (!aE) {
            return ""
        }
        var aI = "";
        var aF = Y.imagetransitiontype.toUpperCase();
        if (aD === 0 && (aF === "CROSS_FADE" || aF === "FADE")) {
            if (!aK) {
                aK = 2
            }
            aI = "z-index:" + aK + ";"
        }
        var aJ = Y.showpreloader ? "<div class='jb-status-loading' style='position:absolute;top:0;left:0;width:" + V + "px;height:" + A + "px;padding:0;margin:0;" + aI + "'></div>" : "";
        if (aE.loaded) {
            aJ = ak(aE, aC, false, aH)
        } else {
            R(aE, aC)
        }
        return "<div class='jb-dt-main-frame jb-dt-main-image-" + aE.position + "' style='height:" + A + "px;width:" + V + "px;left:" + aD + "px;" + z(aG) + aI + "'>" + aJ + "</div>"
    };
    var z = function(aC) {
        if (!aC) {
            return ""
        }
        if (ai.browser.msie || E.is_firefox3()) {
            return "display:none;"
        }
        return "opacity:0;"
    };
    var i = function(aD) {
        if (!aD) {
            return ""
        }
        var aK = d.config.galleryfontface ? "font-family:" + d.config.galleryfontface + ";" : "";
        var aL, aH, aI = "";
        if (Y.useflickr) {
            aL = Y.flickrshowtitle ? aD.caption : "";
            aH = (Y.flickrshowdescription && aD.description) ? aD.description : "";
            aI = Y.flickrshowpagelink ? '<p class="jb-cap-content jb-caption-link"><a href="' + aD.imageFullURL + '" target="_blank"  style="' + P() + an() + ";" + aK + '">' + (Y.flickrpagelinktext ? Y.flickrpagelinktext : aD.caption) + "</a>&nbsp</p>" : ""
        } else {
            aL = aD.title ? aD.title : "";
            aH = aD.caption ? aD.caption : ""
        }
        var aC = Y.captionhalign.toUpperCase();
        var aE = "";
        if (aC === "CENTER") {
            aE = "text-align:center;"
        } else {
            if (aC === "RIGHT") {
                aE = "text-align:right;"
            }
        }
        var aJ = ai.trim(aL) ? "" : "";
        var aF = ai.trim(aH) ? '<div class="jb-caption-desc" style="' + aE + (Y.showimagenumber ? "" : "margin-right:0;") + (aL ? "margin-top:10px;" : "margin-top:0;") + aK + '">' + aH + "</div>" : "";
        var aG = Y.showimagenumber ? '<div class="jbac-number jb-classifier-layer" data-layer="2000" style="z-index:2000;' + ((E.ship || !al) ? "" : "padding-bottom:20px;") + P() + an() + aK + '">' + (aD.position + 1) + " / " + S.length() + "</div>" : "";
        return aG + aJ + aF + aI
    };
    var aa = function() {
        return (E.ship || !al)
    };
    var an = function() {
        if (!Y.textshadowcolor) {
            return ""
        }
        return "text-shadow:" + E.get_text_shadow_style(Y.textshadowcolor, Y.textshadowcolora, true) + ";"
    };
    var P = function() {
        if (!Y.textcolor) {
            return ""
        }
        return "color:" + E.format_color(Y.textcolor) + ";"
    };
    var e = function(aE, aI, aF, aD, aC, aN) {
        if (!aE) {
            return ""
        }
        if (!aN) {
            aN = 1000
        }
        var aJ = i(aE);
        var aL = Y.maxcaptionheight - (2 * aB);
        if (!aa()) {
            aL -= 18
        }
        if (aL <= 0) {
            aL = Y.maxcaptionheight > aF ? aF : Y.maxcaptionheight
        }
        var aM = "<div data-layer='1000' class='jb-caption jb-classifier-layer' style='overflow:hidden;z-index:" + aN + ";" + h(aE) + (d.utils.is_captionposition_default(Y) ? L(Y) : "") + "max-height:" + aL + "px;" + (aJ ? "" : "display:none;") + P() + an() + "'>" + aJ + "</div>";
        var aG = Y.captionposition.toUpperCase();
        var aH = true;
        if (aG === "NONE" || aG === "BELOW_IMAGE" || d.utils.is_captionposition_default(Y) || !aC || aD != 0) {
            aH = false
        }
        var aK = " class='jb-cap-frame caption_" + aE.position + "' style='" + (aJ ? T(aE, aI, aF, aD, aC) : (aH ? "" : "display:none;")) + "'";
        if (y()) {
            return "<div" + aK + ">" + aM + "</div>"
        } else {
            return "<table" + aK + "><tr><td>" + aM + "</td></tr></table>"
        }
    };
    var j = function(aD) {
        if (E.ship) {
            return
        }
        al = aD;
        var aC = Y.maxcaptionheight - (2 * aB);
        if (!aa()) {
            aC -= 18
        }
        if (aC <= 0) {
            aC = Y.maxcaptionheight > ax.height() ? ax.height() : Y.maxcaptionheight
        }
        var aF = aD ? aB + 18 : aB;
        var aE = aD ? "20px" : "";
        J(".jb-cap-frame .jb-caption").css({
            "padding-bottom": aF,
            "max-height": aC
        });
        J(".jb-cap-frame .jbac-number").css({
            "padding-bottom": aE
        })
    };
    var K = function(aC) {
        if (aC.position != X()) {
            return
        }
        s(aC);
        r()
    };
    var p = function(aC) {
        if (E.is_earlier_ie()) {
            return ""
        }
        if (E.is_small_android() || E.is_iphone()) {
            return "-webkit-box-shadow: 0px 0px " + aC.imageshadowblur + "px " + E.format_color(aC.imageshadowcolora) + ";"
        }
        return "box-shadow: 0px 0px " + aC.imageshadowblur + "px " + E.format_color(aC.imageshadowcolora) + ";"
    };
    var u = function(aC, aE) {
        if (E.is_earlier_ie()) {
            return ""
        }
        var aD = aC.imagecornerradius;
        if (aE) {
            aD = ag(aC)
        }
        return aD > 0 ? "border-radius:" + aD + "px;" : ""
    };
    var ag = function(aD) {
        var aC = aD.imagecornerradius;
        if (aD.framewidth && aD.imagecornerradius) {
            aC = aD.imagecornerradius - aD.framewidth
        }
        if (aC < 0) {
            aC = 0
        }
        return aC
    };
    var L = function(aC) {
        if (E.is_earlier_ie()) {
            return ""
        }
        return aC.imagecornerradius > 0 ? "border-bottom-left-radius:" + ag(aC) + "px;border-bottom-right-radius:" + ag(aC) + "px;" : ""
    };
    var ak = function(aE, aD, aN, aJ) {
        if (!aE) {
            return ""
        }
        var aH = ac.get_image_display_size(aE, V, A, Y);
        var aC = ac.suggested_image_size(aE, V, A, Y, Y.imagescalemode.toUpperCase());
        var aM = "";
        var aK = false;
        var aI = 0;
        var aL = 0;
        if (aC.height === "auto" && aH.frameHeight < aH.height) {
            aI = "-" + parseInt((aH.height - aH.frameHeight) / 2) + "px";
            aK = true
        }
        if (aC.width === "auto" && aH.frameWidth < aH.width) {
            aL = "-" + parseInt((aH.width - aH.frameWidth) / 2) + "px";
            aK = true
        }
        if (E.is_adobe_air() && Y.imagescalemode.toUpperCase() === "FILL") {
            aC.height = aC.expectedHeight + "px";
            aC.width = aC.expectedWidth + "px"
        }
        var aG = "<div class='jb-dt-main-image' style='position:absolute;top:" + aH.top + "px;left:" + aH.left + "px;height:" + aH.frameHeight + "px;width:" + aH.frameWidth + "px;padding:0;overflow:hidden;border:none;" + (Y.imageframecolor ? "border-color:" + E.format_color(Y.imageframecolor) + ";" : "") + (d.utils.is_earlier_ie() ? d.config.frameopacity + ";" : "") + p(Y) + u(Y) + "'><img style='${0}$height:" + aC.height + ";width:" + aC.width + ";" + aM + z(aN) + u(Y, true) + "'  src='" + aE.imageURL + "' alt='" + (aE.title ? aE.title : aE.imageURL) + "'></div>";
        var aF = ac.get_image_framewidth(V, A, Y);
        if (aF) {
            aG = aG.replace("border:none;", "border-style:solid;border-width:" + aF + "px;")
        }
        if (aE.position === ay.position) {
            if (aJ) {
                q(aw / 2)
            } else {
                O(aH, aw / 2)
            }
        }
        if (aK) {
            return aG.replace("${0}$", "display:inline;position:relative;top:" + aI + ";left:" + aL + ";")
        }
        return aG.replace("${0}$", "")
    };
    var I = function() {
        return H
    };
    var q = function(aC) {
        if (d.config.imagenavposition.toUpperCase() === "IMAGE") {
            var aD = (d.config.showimagenav.toUpperCase() === "NEVER") ? true : false;
            if (d.canImageMove() && !aD) {
                E.fade_out(Y, J(".jb-classifier-detail-area .jbn-left-button"), aC)
            }
            if (d.canImageMove(true) && !aD) {
                E.fade_out(Y, J(".jb-classifier-detail-area .jbn-right-button"), aC)
            }
        }
        if (d.config.buttonbarposition.toUpperCase() === "OVERLAY_IMAGE") {
            if ((!d.config.showinfobutton || (d.config.showinfobutton && d.features.showinfo.visible())) && d.detail_panel.is_visible()) {
                E.fade_out(Y, J(".jb-classifier-link-wrapper.jb-classifier-detail-area, .jb-classifier-link-wrapper.jb-classifier-detail-area .jb-bb-bar"), aC)
            }
        }
    };
    var O = function(aL, aI) {
        if (d.detail_panel.is_visible()) {
            H = true
        }
        if (d.config.imagenavposition.toUpperCase() != "IMAGE" && d.config.buttonbarposition.toUpperCase() != "OVERLAY_IMAGE") {
            return
        }
        var aP = ac.get_containers_size_and_position(d.glryWidth(), d.glryHeight(), d.index_panel.is_visible(), d.detail_panel.is_visible(), d.config_manager.isp, d.features.toppanel.isNeeded(), d.index_panel.get_thumb_height(), d.config, d.index_panel.getCurrentDisplayingThumbCount());
        var aQ = aP.detail_panel_top;
        var aM = ac.get_stage_padding(d.glryWidth(), d.glryHeight(), d.config);
        var aJ = parseInt(d.config.imagenavpadding);
        if (aJ <= 0) {
            aJ = 0
        }
        var aO = aL.top + (Math.min(aL.parentHeight, aL.height) / 2) - J(".jbn-nav-button").height() / 2 + d.config.framewidth;
        var aE = aL.left + aJ + d.config.framewidth;
        var aN = aL.parentWidth - (aL.left + aL.width + d.config.framewidth) + aJ;
        if (aN < aJ + d.config.framewidth) {
            aN = aJ + d.config.framewidth
        }
        if (d.config.imagenavposition.toUpperCase() === "IMAGE") {
            var aC = (d.config.showimagenav.toUpperCase() === "ALWAYS") ? true : false;
            J(".jb-classifier-detail-area .jbn-nav-left-touch-area .jbn-nav-button").css({
                left: aE,
                top: aO
            });
            J(".jb-classifier-detail-area .jbn-nav-right-touch-area .jbn-nav-button").css({
                right: aN,
                top: aO
            });
            if (d.canImageMove() && aC) {
                E.fade_in(Y, J(".jb-classifier-detail-area .jbn-left-button"), aI)
            }
            if (d.canImageMove(true) && aC) {
                E.fade_in(Y, J(".jb-classifier-detail-area .jbn-right-button"), aI)
            }
        }
        if (d.config.buttonbarposition.toUpperCase() === "OVERLAY_IMAGE") {
            var aR = parseInt(d.config.imagecornerradius / 4);
            var aG = aQ + aL.top + d.config.framewidth + aJ + aR;
            var aH = d.config.buttonbarhalign.toUpperCase();
            var aD = d.features.buttonbar.getButtonbarWidth();
            var aK = false;
            if (aL.width - aD < aJ) {
                aK = true
            }
            if (aH === "LEFT") {
                J(".jb-classifier-link-wrapper.jb-classifier-detail-area").css({
                    left: aE + aR + aP.detail_panel_left - 10,
                    top: aG,
                    width: aK ? aL.width - aJ : "auto"
                })
            } else {
                if (aH === "CENTER") {
                    aD = d.features.buttonbar.getButtonbarWidth();
                    var aF = parseInt((aL.width - aD) / 2 + aL.left + aM + d.config.framewidth);
                    aF -= 10;
                    J(".jb-classifier-link-wrapper.jb-classifier-detail-area").css({
                        left: aF + aP.detail_panel_left - aM,
                        top: aG
                    })
                } else {
                    aN -= 10;
                    J(".jb-classifier-link-wrapper.jb-classifier-detail-area").css({
                        right: aN + aR + aM + (d.config.thumbsposition.toUpperCase() === "RIGHT" ? (d.glryWidth() - aP.index_panel_left) : 0),
                        top: aG,
                        width: aK ? aL.width - aJ : "auto"
                    })
                }
            }
            if (((!d.config.showinfobutton && d.isOverlayVisible()) || (d.config.showinfobutton && d.features.showinfo.visible())) && d.detail_panel.is_visible()) {
                if (d.config.showimageoverlay.toUpperCase() != "NEVER") {
                    E.fade_in(Y, J(".jb-classifier-link-wrapper.jb-classifier-detail-area, .jb-classifier-link-wrapper.jb-classifier-detail-area .jb-bb-bar"), aI)
                }
            }
        }
    };
    var s = function(aH) {
        if (!aH) {
            return
        }
        var aC = ",BELOW_THUMBS,";
        var aF = ",BOTTOM,BELOW_IMAGE,OVERLAY,OVERLAY_IMAGE" + aC;
        var aE = "," + Y.captionposition.toUpperCase() + ",";
        ar.children().remove();
        var aD = ax.is(":visible") || aC.indexOf(aE) > -1;
        var aG = Y.showimageoverlay.toUpperCase();
        if (aG === "NEVER") {
            if (aF.indexOf(aE) < 0) {
                aD = false
            }
        }
        b(aH.position, 0, null, aD);
        return
    };
    var g = function(aC, aD) {
        V = aC;
        A = aD;
        J(".jb-dt-main-frame").css({
            width: aC,
            height: aD
        });
        s(ay, aC, aD, 0);
        aj(ay, 0, true);
        S.get_previous_image(ay.position);
        S.get_next_image(ay.position)
    };
    var o = function(aC) {
        ap = aC
    };
    var f = function() {
        return ap
    };
    var w = function() {
        var aC = v();
        if (aC && (aC.loaded || aC.detail_loaded)) {
            return true
        }
        return false
    };
    return {
        get_photo_position: X,
        move_2_next_photo: aA,
        move_2_previous_photo: G,
        initialize: W,
        populate_photo_html: b,
        repaint: g,
        get_current_photo: v,
        preload_images: n,
        fadeout_current_image: l,
        repopulate_caption_html: K,
        move_back: Q,
        set_caption_height_mode: j,
        is_initialized: function() {
            return af
        },
        change_2_photo: av,
        set_visible_flag: o,
        is_visible: f,
        setContext: ae,
        isImageShowed: I,
        set_photo_position: aq,
        set_container_size: U,
        isCurrentImageLoaded: w
    }
};
var gallery_defined = typeof(juicebox_utils) != "undefined";
if (!gallery_defined) {
    var juicebox_utils = new juice_box_utils(juicebox_lib.jQuery);
    var juicebox_registered_components = {};
    var juicebox_instances = [];
    var juicebox_instance_count = 0;
    var different_size_images_in_config = false;
    var juicebox = function(cnfg) {
        var $ = juicebox_lib.jQuery;
        var document_id = "jb-glry-id-" + juicebox_instance_count;
        var _ = function(path) {
            return $(context.utils.get_query_path(document_id, path))
        };
        var sizing = null;
        var current_width = null;
        var current_height = null;
        var gallery_manager = new juicebox_gallery_manager();
        var index_panel = new juicebox_gallery_index_panel(juicebox_utils, gallery_manager);
        var detail_panel = new juicebox_gallery_detail_panel(index_panel);
        var ignoredOptions4New = "showthumbsonload";
        var ignoredOptions4NewPage = ignoredOptions4New + ",enabledirectlinks";
        var featureInstances = {};
        for (var k in juicebox_registered_components) {
            featureInstances[k] = new juicebox_registered_components[k](null)
        }
        var context = {
            _: _,
            instance_id: juicebox_instance_count,
            utils: juicebox_utils,
            gallery_manager: function() {
                return gallery_manager
            },
            config_manager: new juicebox_config_manager($, juicebox_utils),
            index_panel: index_panel,
            detail_panel: detail_panel,
            sizing: function() {
                return sizing
            },
            glrySizePosition: function(indexVisible, detailVisible) {
                if (!sizing) {
                    return null
                }
                if (typeof(indexVisible) == "undefined") {
                    indexVisible = context.index_panel.is_visible()
                }
                if (typeof(detailVisible) == "undefined") {
                    detailVisible = context.detail_panel.is_visible()
                }
                return sizing.get_containers_size_and_position(current_width, current_height, indexVisible, detailVisible, context.config_manager.isp, context.features.toppanel.isNeeded(), context.index_panel.get_thumb_height(), context.config, index_panel.getCurrentDisplayingThumbCount())
            },
            glryStagPadding: function() {
                if (!sizing) {
                    return null
                }
                return sizing.get_stage_padding(current_width, current_height, context.config)
            },
            glryWidth: function() {
                return current_width
            },
            glryHeight: function() {
                return current_height
            },
            isFullScreenMode: function() {
                return sizing.is_fullscreen_mode(context.config)
            },
            glryRepaint: function(force, ignoreIndexPnl, noresize, donotAdjustHeight) {
                if (featureInstances.splash.visible()) {
                    featureInstances.splash.repaint();
                    return
                }
                repaint(force, ignoreIndexPnl, noresize, donotAdjustHeight)
            },
            isOverlayVisible: function() {
                return overlay_visible
            },
            setOverlayFlag: function(visible) {
                overlay_visible = visible
            },
            redrawIndexPanel: function(imgpos) {
                show_thumbnails(imgpos)
            },
            correctPath: function(path) {
                return correct_path(path)
            },
            setOverlay: function(visible, delay) {
                clearInactiveTimer();
                hideNavVisibility();
                overlay_visible = visible;
                display_overlay(delay)
            },
            showOverlayWithSetting: function(visible, delay) {
                if (!detail_panel.is_visible()) {
                    return
                }
                overlay_visible = visible;
                show_hide_overlay(visible, delay)
            },
            syncOverlayVisibility: function(isfirstimage) {
                set_overlay_visible(overlay_visible, isfirstimage);
                return overlay_visible
            },
            getGalleryInfo: function() {
                return get_current_gallery_image_info()
            },
            setExtendedGlry: function(jbglry) {
                extended_gallery = jbglry
            },
            getExtendedGlry: function() {
                return extended_gallery
            },
            showImage: function(position, delay, isfirstimage, fromHashEvent) {
                show_main_image(position, delay, isfirstimage, fromHashEvent)
            },
            switch2Main: function(position, cb) {
                switch_2_main_image(position, cb)
            },
            unbindResize: function() {
                $(window).unbind("resize", windowResize)
            },
            canImageMove: function(toNext) {
                return can_image_move(toNext)
            },
            canPageMove: function(toNext) {
                return can_page_move(toNext)
            },
            nextImage: function() {
                next_image()
            },
            previousImage: function() {
                previous_image()
            },
            turnOffFullscreen: function() {
                is_full_screen_mode = false
            },
            hasMultipleSizeImages: function() {
                return different_size_images_in_config
            },
            setImageEventIndex: function(idx) {
                lastImageEventIndex = idx
            },
            getIgnoredOptions4New: function() {
                return ignoredOptions4New
            },
            getMouseHoverPosition: function() {
                return mouseHoveringIn
            },
            showNextPage: function() {
                next_page()
            },
            resetInactiveTimer: function() {
                resetInactiveTimer()
            }
        };
        context.features = featureInstances;
        var flickr_loader = null;
        var overlay_visible = true;
        var is_switching_image = false;
        var mouseHoveringIn = 0;
        var ncnfg = context.config_manager.init(cnfg, null, "ck-s-");
        if (ncnfg) {
            cnfg = ncnfg
        }
        context.config = context.config_manager.get_config();
        var removeIgnoredOptions = function(ignoredOptions) {
            var aryOptions2Ignore = ignoredOptions.split(",");
            for (var i = 0; i < aryOptions2Ignore.length; i++) {
                if (aryOptions2Ignore[i].length <= 0) {
                    continue
                }
                delete context.config[aryOptions2Ignore[i]]
            }
        };
        if (typeof(expanded_jb_gallery) != "undefined") {
            removeIgnoredOptions(ignoredOptions4NewPage)
        }
        for (var j in context.features) {
            context.features[j].setContext(context)
        }
        context.detail_panel.setContext(context);
        context.index_panel.setContext(context);
        var pst = context.features.fullscreen.getPersistor();
        var pstm = pst && pst.parent_gallery_param ? pst.parent_gallery_param : null;
        gallery_manager.init(context.config, pstm && pstm.image_orders ? pstm.image_orders : "");
        var image_change_speed = 1000 * context.config.imagetransitiontime;
        var theme_cls = "jcbx-glry-classic";
        var themeUrl = "";
        var is_full_screen_mode = false;
        var right_button_offset = null;
        var extended_gallery = null;
        var inactiveTime = 0;
        var inactiveTimer = 0;
        var correct_path = function(path) {
            if (!path) {
                return ""
            }
            return context.utils.concate_path(context.config.baseurl, path)
        };
        var setup_layout = function(glry_width, glry_height, show_detail) {
            if (context.utils.is_large_screen_mode(context.config)) {
                if (context.features.showthumbsbutton.isThumbsHidden()) {
                    context.index_panel.set_visible_flag(false)
                } else {
                    context.index_panel.set_visible_flag(true)
                }
                context.detail_panel.set_visible_flag(true);
                _("").addClass("jb-flag-large-screen-mode")
            } else {
                if (show_detail) {
                    context.index_panel.set_visible_flag(false);
                    context.detail_panel.set_visible_flag(true)
                } else {
                    context.index_panel.set_visible_flag(true);
                    context.detail_panel.set_visible_flag(false)
                }
                _("").removeClass("jb-flag-large-screen-mode")
            }
        };
        var set_overlay_visible = function(show, initialLoad) {
            if (context.config.showinfobutton && (!initialLoad || (context.config.showoverlayonload && context.config.showimageoverlay.toUpperCase() != "NEVER"))) {
                overlay_visible = context.features.showinfo.visible()
            } else {
                var showimageoverlay = context.config.showimageoverlay.toUpperCase();
                if (showimageoverlay === "ALWAYS") {
                    overlay_visible = true
                } else {
                    if (showimageoverlay === "NEVER") {
                        overlay_visible = false
                    } else {
                        overlay_visible = show;
                        context.features.showinfo.showInfoCtrls(overlay_visible, 0, 0, true)
                    }
                }
            }
        };
        var show_hide_overlay = function(show, delay) {
            set_overlay_visible(show);
            display_overlay(delay)
        };
        var display_overlay = function(delay) {
            var excludesel = (!context.detail_panel.isImageShowed() && context.config.buttonbarposition.toUpperCase() === "OVERLAY_IMAGE") ? ":not(.jb-classifier-link-wrapper)" : "";
            if ($.browser.msie && overlay_visible) {
                _(".jb-classifier-show-on-over .jb-bb-bar").show()
            }
            var cappos = context.config.captionposition.toUpperCase();
            if (cappos.indexOf("OVERLAY") > -1) {
                var crntidx = detail_panel.get_photo_position();
                _(".jb-cap-frame.caption_" + crntidx).css({
                    opacity: 1,
                    display: ""
                })
            }
            context.utils.show_hide_controls(_(".jb-classifier-show-on-over" + excludesel), overlay_visible, delay)
        };
        var overlayTimer = 0;
        var set_overlay = function(show, delay) {
            if (is_switching_image) {
                return
            }
            if (!_(" .jb-panel-detail").is(":visible")) {
                return
            }
            if (context.features.showthumbsbutton.isSwitching()) {
                return
            }
            if (overlayTimer) {
                window.clearTimeout(overlayTimer);
                overlayTimer = 0
            }
            overlayTimer = window.setTimeout(function() {
                overlayTimer = 0;
                show_hide_overlay(show, ($.browser.msie && $.browser.version >= 7 && $.browser.version < 8) ? 0 : delay)
            }, 100)
        };
        var directIndex = function() {
            if (context.config.firstimageindex > 0 && context.config.firstimageindex <= gallery_manager.length()) {
                return context.config.firstimageindex - 1
            }
            var status = context.features.hashstatus.getHashStatus();
            if (status.hasSet) {
                return 0
            }
            if (status.directPicIdx >= 0 && status.directPicIdx < gallery_manager.length()) {
                return status.directPicIdx
            }
            return 0
        };
        var is_direct_open = function() {
            if (context.config.firstimageindex > 0 && context.config.firstimageindex <= gallery_manager.length()) {
                return true
            }
            if (!context.utils.is_large_screen_mode(context.config) && !context.config.showsmallthumbsonload) {
                return true
            }
            var ret = directGo2(true, true);
            if (ret === 1 || ret === 3) {
                return true
            }
            return false
        };
        var check_open_image_directly = function() {
            var ret = directGo2(true);
            if (ret === 1 || ret === 3) {
                context.detail_panel.set_visible_flag(true);
                context.index_panel.set_visible_flag(false);
                return true
            }
            if (context.config.firstimageindex > 0 && context.config.firstimageindex <= gallery_manager.length()) {
                show_main_image(context.config.firstimageindex - 1, image_change_speed, true);
                context.detail_panel.set_visible_flag(true);
                context.index_panel.set_visible_flag(false);
                return true
            }
            return false
        };
        var set_init_visible_panel = function() {
            setup_layout(current_width, current_height, true);
            var cntSize = sizing.get_containers_size_and_position(current_width, current_height, context.index_panel.is_visible(), context.detail_panel.is_visible(), context.config_manager.isp, context.features.toppanel.isNeeded(), context.index_panel.get_thumb_height(), context.config, index_panel.getCurrentDisplayingThumbCount());
            set_containers_size_and_position(cntSize);
            context.features.indexnav.setPosition(cntSize)
        };
        var lastImgIdx = -1;
        var directGo2 = function(dlink, donotOpen) {
            var result = 0;
            var status = context.features.hashstatus.getHashStatus();
            if (status.hasSet) {
                lastImgIdx = -1
            }
            if ((context.config.enabledirectlinks || dlink) && status.directPicIdx >= 0 && lastImgIdx != status.directPicIdx) {
                if (!donotOpen) {
                    lastImgIdx = status.directPicIdx;
                    set_init_visible_panel();
                    if (context.utils.is_large_screen_mode(context.config)) {
                        show_main_image(status.directPicIdx, image_change_speed, false, true)
                    } else {
                        switch_2_main_image(status.directPicIdx)
                    }
                }
                result |= 1
            }
            if (!context.utils.is_in_iframe()) {
                if ((!status.hasExpHashPrefix && context.features.fullscreen.switched_2_fullscreen() && !context.utils.is_new_expanded_window()) || (status.hasExpHash && !context.features.fullscreen.switched_2_fullscreen() && !is_full_screen_mode)) {
                    context.features.fullscreen.full_screen();
                    result |= 2
                }
            }
            return result
        };
        var fireInitializedEvent = function() {
            if (context.features.fullscreen.switched_2_fullscreen()) {
                return
            }
            if (juicebox_instances[context.instance_id] && typeof(juicebox_instances[context.instance_id].onInitComplete) === "function") {
                juicebox_instances[context.instance_id].onInitComplete()
            }
        };
        var show_splash_page = function() {
            if (context.config.fotomotostoreid) {
                context.utils.add_js_tag("https://widget.fotomoto.com/stores/script/" + context.config.fotomotostoreid + ".js?api=true&aid=68677e1269332506", "fotomotojs")
            }
            if (gallery_manager.length() <= 0) {
                return
            }
            context.utils.add_viewport_meta_tag_4_device(context.config, true);
            current_width = get_gallery_width();
            current_height = get_gallery_height();
            set_font();
            if (context.features.splash.isNeeded()) {
                context.config_manager.sync_option_with_dependency({
                    showexpandbutton: true,
                    originalshowexpandbutton: context.config.showexpandbutton
                });
                context.config = context.config_manager.get_config();
                _(".jb-classifier-detail-area").hide();
                _(".jb-panel-index").show();
                var resizeSplash = function() {
                    sizing.try_set_body_size(context.config, context.features.fullscreen.switched_2_fullscreen() || is_full_screen_mode);
                    context.features.splash.repaint()
                };
                $(window).resize(resizeSplash);
                context.features.splash.draw(_(" .jb-panel-index>.jb-idx-thumbnail-container"), function() {
                    $(window).unbind("resize", resizeSplash);
                    $(window).resize(windowResize);
                    context.features.fullscreen.full_screen()
                });
                if (!context.config.showthumbsonload) {
                    context.features.showthumbsbutton.setIndexVisibleFlag(false)
                }
                fireInitializedEvent();
                context.features.hashstatus.setHashChangedEvent(directGo2);
                var status = context.features.hashstatus.getHashStatus();
                if (status.hasExpHash) {
                    context.features.fullscreen.full_screen()
                }
            } else {
                after_loading_images();
                if (context.features.fullscreen.switched_2_fullscreen()) {
                    context.config_manager.sync_option_with_dependency({
                        showexpandbutton: true,
                        originalshowexpandbutton: context.config.showexpandbutton
                    });
                    context.config = context.config_manager.get_config()
                }
            }
        };
        var get_panel_params = function() {
            return {
                jquery: $,
                document_id: document_id,
                container: _(" .jb-panel-index>.jb-idx-thumbnail-container"),
                config: context.config,
                utils: context.utils,
                glymng: gallery_manager,
                sizing: sizing,
                finish_draw_event_callback: switch_2_main_image,
                touch_event_callback: after_page_changed,
                caption_complete_callback: set_touch_component_height,
                current_width: current_width,
                current_height: current_height,
                debug: {
                    debug3value: typeof(debug_info2) == "function" ? debug_info2 : null,
                    debugmsg: typeof(debug_message) == "function" ? debug_message : null
                }
            }
        };
        var hideOverlay = function() {
            if (!context.detail_panel.is_visible()) {
                return
            }
            if (context.features.touchevent.isInNavigation() || context.features.touchevent.isInTransitioning()) {
                return
            }
            if (is_switching_image) {
                return
            }
            overlay_visible = false;
            set_overlay(overlay_visible, 250)
        };
        var clearInactiveTimer = function() {
            if (inactiveTime <= 0) {
                return
            }
            window.clearTimeout(inactiveTimer);
            inactiveTimer = 0
        };
        var hideNavVisibility = function() {
            var showin = context.config.showimagenav.toUpperCase();
            if (showin != "NEVER" && showin != "ALWAYS") {
                mouseHoveringIn = 0;
                context.features.imagenav.repaint(250, mouseHoveringIn)
            }
        };
        var resetInactiveTimer = function() {
            if (inactiveTime > 0) {
                if (inactiveTimer) {
                    window.clearTimeout(inactiveTimer)
                }
                inactiveTimer = window.setTimeout(function() {
                    inactiveTimer = 0;
                    if (!context.config.showinfobutton) {
                        hideOverlay()
                    }
                    if (context.config.autohidethumbs && context.utils.is_large_screen_mode(context.config) && !context.features.showthumbsbutton.isThumbsHidden()) {
                        context.features.showthumbsbutton.toggle_index_panel_4_lsm()
                    }
                    hideNavVisibility()
                }, inactiveTime)
            }
        };
        var overlayHoverInTimer = 0;
        var leftNavHoverInTimer = 0;
        var rightNavHoverInTimer = 0;
        var isInTouchEvent = function() {
            return context.index_panel.isInTouchEvent() || context.features.touchevent.isInNavigation()
        };
        var setPanelHoverEvents = function() {
            if (!context.utils.is_complete_touch() && !context.config.forcetouchmode) {
                var try2ToggleThumbs = function() {
                    if (context.config.autohidethumbs && context.utils.is_large_screen_mode(context.config) && context.features.showthumbsbutton.isThumbsHidden()) {
                        context.features.showthumbsbutton.toggle_index_panel_4_lsm()
                    }
                };
                if (!context.config.showinfobutton) {
                    var selstr = "";
                    var showGalleryOverlay = function() {
                        if (!context.detail_panel.is_visible()) {
                            return
                        }
                        if (isInTouchEvent() || context.features.touchevent.isInTransitioning()) {
                            return
                        }
                        if (is_switching_image) {
                            return
                        }
                        if (overlay_visible) {
                            resetInactiveTimer();
                            return
                        }
                        overlay_visible = true;
                        set_overlay(overlay_visible, 250);
                        if (context.config.imagenavposition.toUpperCase() != "STAGE") {
                            context.features.imagenav.repaint(0, mouseHoveringIn)
                        }
                        resetInactiveTimer()
                    };
                    var resetHoverInTimer = function() {
                        if (!overlayHoverInTimer) {
                            window.clearTimeout(overlayHoverInTimer);
                            overlayHoverInTimer = 0
                        }
                    };
                    var setHoverEvent = function() {
                        var mouseIn = function() {
                            if (isInTouchEvent()) {
                                return
                            }
                            showGalleryOverlay()
                        };
                        var mouseMove = function() {
                            if (isInTouchEvent()) {
                                return
                            }
                            try2ToggleThumbs();
                            if (!overlay_visible) {
                                showGalleryOverlay()
                            }
                            resetInactiveTimer()
                        };
                        _(selstr).hover(function() {
                            if (context.utils.is_touchable_desktop()) {
                                resetHoverInTimer();
                                overlayHoverInTimer = window.setTimeout(function() {
                                    mouseIn()
                                }, 50)
                            } else {
                                mouseIn()
                            }
                        }, function() {
                            resetHoverInTimer();
                            if (isInTouchEvent()) {
                                return
                            }
                            hideOverlay()
                        }).mousemove(function() {
                            if (context.utils.is_touchable_desktop()) {
                                if (overlayHoverInTimer) {
                                    return
                                }
                                overlayHoverInTimer = window.setTimeout(function() {
                                    mouseMove();
                                    overlayHoverInTimer = 0
                                }, 50)
                            } else {
                                mouseMove()
                            }
                        }).mouseup(function() {
                            if (isInTouchEvent()) {
                                return false
                            }
                            showGalleryOverlay();
                            return false
                        })
                    };
                    var wt = 1000 * context.config.fadetime >= 200 ? 1000 * context.config.fadetime : 200;
                    window.setTimeout(function() {
                        setHoverEvent()
                    }, wt)
                } else {
                    if (context.config.autohidethumbs) {
                        _("").mousemove(function() {
                            try2ToggleThumbs()
                        })
                    }
                }
                var showin = context.config.showimagenav.toUpperCase();
                if (showin != "NEVER" && showin != "ALWAYS") {
                    var resetLeftNavHoverTimer = function() {
                        if (!leftNavHoverInTimer) {
                            return
                        }
                        window.clearTimeout(leftNavHoverInTimer);
                        leftNavHoverInTimer = 0
                    };
                    var resetRightNavHoverTimer = function() {
                        if (!rightNavHoverInTimer) {
                            return
                        }
                        window.clearTimeout(rightNavHoverInTimer);
                        rightNavHoverInTimer = 0
                    };
                    var setNavHoverEvent = function() {
                        var mouseInLeft = function() {
                            if (isInTouchEvent()) {
                                return
                            }
                            if (!context.detail_panel.isCurrentImageLoaded()) {
                                return
                            }
                            mouseHoveringIn = 1;
                            context.features.imagenav.repaint(250, mouseHoveringIn)
                        };
                        var mouseMoveLeft = function() {
                            if (isInTouchEvent()) {
                                return
                            }
                            if (!overlay_visible) {
                                mouseHoveringIn = 1;
                                context.features.imagenav.repaint(250, mouseHoveringIn)
                            }
                            resetInactiveTimer()
                        };
                        _(".jbn-nav-left-touch-area").hover(function() {
                            if (context.utils.is_touchable_desktop()) {
                                resetLeftNavHoverTimer();
                                leftNavHoverInTimer = window.setTimeout(function() {
                                    mouseInLeft()
                                }, 50)
                            } else {
                                mouseInLeft()
                            }
                        }, function() {
                            resetLeftNavHoverTimer();
                            if (isInTouchEvent()) {
                                return
                            }
                            if (mouseHoveringIn == 2) {
                                return
                            }
                            mouseHoveringIn = 0;
                            context.features.imagenav.repaint(0, mouseHoveringIn)
                        }).mousemove(function() {
                            if (context.utils.is_touchable_desktop()) {
                                if (leftNavHoverInTimer) {
                                    return
                                }
                                leftNavHoverInTimer = window.setTimeout(function() {
                                    mouseMoveLeft();
                                    leftNavHoverInTimer = 0
                                }, 50)
                            } else {
                                mouseMoveLeft()
                            }
                        }).mouseup(function() {
                            if (isInTouchEvent()) {
                                return true
                            }
                            mouseHoveringIn = 1;
                            context.features.imagenav.repaint(250, mouseHoveringIn);
                            return true
                        });
                        var mouseInRight = function() {
                            if (isInTouchEvent()) {
                                return
                            }
                            if (!context.detail_panel.isCurrentImageLoaded()) {
                                return
                            }
                            mouseHoveringIn = 2;
                            context.features.imagenav.repaint(250, mouseHoveringIn)
                        };
                        var mouseMoveRight = function() {
                            if (isInTouchEvent()) {
                                return
                            }
                            if (!overlay_visible) {
                                mouseHoveringIn = 2;
                                context.features.imagenav.repaint(250, mouseHoveringIn)
                            }
                            resetInactiveTimer()
                        };
                        _(".jbn-nav-right-touch-area").hover(function() {
                            if (context.utils.is_touchable_desktop()) {
                                resetRightNavHoverTimer();
                                rightNavHoverInTimer = window.setTimeout(function() {
                                    mouseInRight()
                                }, 50)
                            } else {
                                mouseInRight()
                            }
                        }, function() {
                            resetRightNavHoverTimer();
                            if (isInTouchEvent()) {
                                return
                            }
                            if (mouseHoveringIn == 1) {
                                return
                            }
                            mouseHoveringIn = 0;
                            context.features.imagenav.repaint(0, mouseHoveringIn)
                        }).mousemove(function() {
                            if (context.utils.is_touchable_desktop()) {
                                if (rightNavHoverInTimer) {
                                    return
                                }
                                rightNavHoverInTimer = window.setTimeout(function() {
                                    mouseMoveRight();
                                    rightNavHoverInTimer = 0
                                }, 50)
                            } else {
                                mouseMoveRight()
                            }
                        }).mouseup(function() {
                            if (isInTouchEvent()) {
                                return true
                            }
                            mouseHoveringIn = 2;
                            context.features.imagenav.repaint(250, mouseHoveringIn);
                            return true
                        })
                    };
                    var wt2 = 1000 * context.config.fadetime >= 200 ? 1000 * context.config.fadetime : 200;
                    window.setTimeout(function() {
                        setNavHoverEvent()
                    }, wt2)
                }
            }
        };
        var setNavEvents = function() {
            _(".jb-classifier-thumb-area .jbn-right-button").click(function() {
                return next_page(0)
            });
            _(".jb-classifier-thumb-area .jbn-left-button").click(function() {
                return previous_page(0)
            });
            var clickMode = context.config.imageclickmode.toUpperCase();
            if (!context.utils.is_touchable_device(context.config) || context.config.forcetouchmode || ((($.browser.msie && !context.utils.is_mobile_ie_10()) || (context.utils.is_touchable_desktop() && !context.utils.is_mobile_ie()) || (context.utils.is_mobile_ie_after_11() && !context.features.fullscreen.switched_2_fullscreen())) && clickMode != "OPEN_URL")) {
                var delta;
                _(".jb-classifier-detail-area .jbn-right-button").click(function() {
                    if (isInTouchEvent()) {
                        return false
                    }
                    delta = context.features.touchevent.getDelta();
                    if (delta.x || delta.y) {
                        return null
                    }
                    context.features.autoplay.stop();
                    return next_image(0)
                });
                _(".jb-classifier-detail-area .jbn-left-button").click(function() {
                    if (isInTouchEvent()) {
                        return false
                    }
                    context.features.autoplay.stop();
                    delta = context.features.touchevent.getDelta();
                    if (delta.x || delta.y) {
                        return null
                    }
                    return previous_image(0)
                });
                if (!context.config.forcetouchmode) {
                    if (clickMode === "NONE") {
                        _(".jb-classifier-detail-area .jbn-nav-right-touch-area").css("cursor", "default");
                        _(".jb-classifier-detail-area .jbn-nav-left-touch-area").css("cursor", "default")
                    } else {
                        if (clickMode === "OPEN_URL") {
                            _(".jb-classifier-detail-area .jbn-nav-right-touch-area").click(context.features.openurl.open_url);
                            _(".jb-classifier-detail-area .jbn-nav-left-touch-area").click(context.features.openurl.open_url)
                        } else {
                            _(".jb-classifier-detail-area .jbn-nav-right-touch-area").click(function() {
                                if (isInTouchEvent()) {
                                    return false
                                }
                                delta = context.features.touchevent.getDelta();
                                if (delta.x || delta.y) {
                                    return false
                                }
                                context.features.autoplay.stop();
                                return next_image(0)
                            });
                            _(".jb-classifier-detail-area .jbn-nav-left-touch-area").click(function() {
                                if (isInTouchEvent()) {
                                    return false
                                }
                                delta = context.features.touchevent.getDelta();
                                if (delta.x || delta.y) {
                                    return false
                                }
                                context.features.autoplay.stop();
                                return previous_image(0)
                            })
                        }
                    }
                }
            } else {
                var delay = parseInt(1005 * context.config.imagetransitiontime + 510 * context.config.imagetransitiontime);
                _(".jb-classifier-detail-area .jbn-right-button").bind("touchend", function(e) {
                    context.index_panel.yield_4_transition(delay);
                    e.preventDefault();
                    if (context.features.touchevent.isInTransitioning()) {
                        return
                    }
                    context.features.touchevent.setTransitioning(true);
                    context.features.autoplay.stop();
                    next_image(0);
                    window.setTimeout(function() {
                        context.features.touchevent.setTransitioning(false)
                    }, delay)
                });
                _(".jb-classifier-detail-area .jbn-left-button").bind("touchend", function(e) {
                    context.index_panel.yield_4_transition(delay);
                    e.preventDefault();
                    if (context.features.touchevent.isInTransitioning()) {
                        return
                    }
                    context.features.touchevent.setTransitioning(true);
                    context.features.autoplay.stop();
                    previous_image(0);
                    window.setTimeout(function() {
                        context.features.touchevent.setTransitioning(false)
                    }, delay)
                })
            }
        };
        var initialize_panels = function() {
            setup_layout(current_width, current_height, context.detail_panel.is_visible());
            var thumbpanelheigh = context.config.maxthumbrows * (context.config.thumbheight + context.config.thumbpadding);
            if (context.utils.is_side_layout(context.config)) {
                thumbpanelheigh = 10
            }
            var cntSize = sizing.get_containers_size_and_position(current_width, current_height, context.index_panel.is_visible(), context.detail_panel.is_visible(), context.config_manager.isp, context.features.toppanel.isNeeded(), thumbpanelheigh, context.config, index_panel.getCurrentDisplayingThumbCount());
            var params = get_panel_params();
            params.current_width = cntSize.index_panel_width;
            params.current_height = cntSize.index_panel_height;
            context.index_panel.initialize(params, is_full_screen_mode || context.features.fullscreen.switched_2_fullscreen());
            params.container = _(" .jb-panel-detail");
            params.caption_container = context.features.caption.getArea();
            params.current_width = cntSize.detail_panel_width;
            params.current_height = cntSize.detail_panel_height;
            params.before_draw_event_callback = before_show_main_image;
            params.finish_draw_event_callback = after_show_main_image;
            context.detail_panel.initialize(params)
        };
        var resizeTimer = 0;
        var windowResize = function() {
            if (resizeTimer) {
                window.clearTimeout(resizeTimer);
                resizeTimer = 0
            }
            if (context.utils.is_ios_mobile_chrome()) {
                resizeTimer = window.setTimeout(function() {
                    repaint(false);
                    resizeTimer = 0
                }, 200)
            } else {
                repaint(false)
            }
            var isFull = context.features.fullscreen.switched_2_fullscreen() || is_full_screen_mode;
            if (context.utils.is_iphone_6_plus_need_repaint(isFull)) {
                resizeTimer = window.setTimeout(function() {
                    repaint(false);
                    resizeTimer = 0
                }, 1000)
            }
        };
        var set_hover_over_navs = function() {
            if (context.config.navbuttoniconhovercolor) {
                var navattrbak = "";
                _(".jbn-nav-button-icon").hover(function() {
                    navattrbak = $(this).attr("style");
                    $(this).css({
                        color: context.utils.format_color(context.config.navbuttoniconhovercolor)
                    })
                }, function() {
                    if ($.browser.msie && $.browser.version < 10) {
                        $(this).css({
                            color: context.utils.format_color(context.config.navbuttoniconcolor)
                        })
                    } else {
                        $(this).attr("style", navattrbak)
                    }
                })
            }
        };
        var set_font = function() {
            if (!context.config.galleryfontface) {
                return
            }
            _(".jcbx-glry-classic").css({
                "font-family": context.config.galleryfontface
            })
        };
        var setSidePadding = function() {
            _(".jbn-nav-left-touch-area .jbn-nav-button").css({
                left: context.config.imagenavpadding
            });
            _(".jbn-nav-right-touch-area .jbn-nav-button").css({
                right: context.config.imagenavpadding
            })
        };
        var repaintButtonBar = function(setPanelOnly) {
            var isDirectOpen = is_direct_open();
            var isLsm = context.utils.is_large_screen_mode(context.config);
            if (!isLsm) {
                if (isDirectOpen) {
                    context.index_panel.set_visible_flag(false);
                    context.detail_panel.set_visible_flag(true)
                }
            }
            if (setPanelOnly) {
                return
            }
            var isFull = context.features.fullscreen.switched_2_fullscreen() || is_full_screen_mode;
            sizing.try_set_body_size(context.config, isFull);
            if (!(isDirectOpen && !isLsm)) {
                context.features.buttonbar.repaint()
            }
            context.features.buttonbar.setPosition()
        };
        var after_loading_images = function() {
            var cntSize;
            if (is_full_screen_mode) {
                $("body").css({
                    overflow: "hidden"
                })
            }
            if (context.config.randomizeimages) {
                gallery_manager.sort_images()
            }
            sizing.get_initial_size();
            $("#" + document_id).html(get_gallery_frame_html());
            set_font();
            context.features.touchevent.setEvent();
            initialize_panels();
            set_hover_over_navs();
            overlay_visible = context.config.showoverlayonload && context.config.showimageoverlay.toUpperCase() != "NEVER";
            if (context.config.showthumbsonload === false && context.utils.is_large_screen_mode(context.config)) {
                context.features.showthumbsbutton.toggle_index_panel_4_lsm(true, true, (is_direct_open() ? true : false))
            }
            repaintButtonBar(true);
            var showLoadingEffect = true;
            if (!context.utils.is_large_screen_mode(context.config) && context.config.autoplayonload) {
                showLoadingEffect = false
            }
            var trantm = 1000 * context.config.fadetime;
            var panelsWithEffects = "indexnav" + (context.utils.is_large_screen_mode(context.config) && context.config.imagenavposition.toUpperCase() === "STAGE" ? ",imagenav" : "");
            var isLsm = context.utils.is_large_screen_mode(context.config);
            var isDirectOpen = is_direct_open();
            if (isDirectOpen) {
                context.detail_panel.set_photo_position(directIndex())
            }
            if (!context.config.showoverlayonload) {
                if (isDirectOpen) {
                    gallery_manager.setFirstImageIndex(directIndex())
                } else {
                    if (isLsm) {
                        gallery_manager.setFirstImageIndex(0)
                    }
                }
            }
            if (showLoadingEffect) {
                panelsWithEffects += (isLsm || (context.config.showsmallthumbsonload && context.config.showsmallthumbsbutton) ? ",grytitle" : "");
                panelsWithEffects += (isLsm || isDirectOpen || !context.config.showsmallthumbsbutton ? ",backbutton" : "");
                if (isLsm || !context.config.showsmallthumbsbutton || isDirectOpen) {
                    panelsWithEffects += (context.config.buttonbarposition.toUpperCase() === "OVERLAY_IMAGE" ? "" : ",buttonbar")
                }
                var isindirssm = !isDirectOpen && !isLsm;
                if (index_panel.is_visible() && (isLsm || !isDirectOpen)) {
                    context.utils.fade_in(context.config, context._(".jb-panel-index.jb-classifier-thumb-area"), trantm, (context.utils.is_android() && !isLsm ? true : false), null, "indexpanel")
                }
                context.utils.reppaint_components(context.features, panelsWithEffects, trantm, function() {
                    if (!context.utils.is_new_expanded_window()) {
                        context.features.showinfo.showInfoCtrls(overlay_visible, 0, true);
                        if (isindirssm) {
                            repaint(true)
                        } else {
                            repaint(true, false, false, false, true);
                            if ((context.utils.is_android() || context.utils.is_ipad()) && isLsm) {
                                window.setTimeout(function() {
                                    repaint(true)
                                }, image_change_speed + 300)
                            }
                        }
                    } else {
                        avoidImageFreezing()
                    }
                    if (context.utils.is_earlier_ie()) {
                        window.setTimeout(function() {
                            repaint(true);
                            fireInitializedEvent()
                        }, 300)
                    } else {
                        window.setTimeout(function() {
                            fireInitializedEvent()
                        }, image_change_speed + 300)
                    }
                    repaintButtonBar()
                })
            } else {
                context.features.showinfo.showInfoCtrls(overlay_visible);
                repaintButtonBar()
            }
            if (context.config.useflickr) {
                _("").addClass("jb-flickr-glry")
            }
            if (context.features.fullscreen.switched_2_fullscreen()) {
                if (context.utils.need_viewport_meta(context.config) && !context.utils.host_has_viewport_meta()) {
                    _("").addClass("jb-large-icon")
                }
            }
            setSidePadding();
            // if (!jb4ddeemmoo.is4dm()) {
            //     window.setTimeout(function() {
            //         display_error_message(jb4ddeemmoo.invmsg())
            //     }, image_change_speed)
            // }
            setup_layout(current_width, current_height, context.detail_panel.is_visible());
            cntSize = sizing.get_containers_size_and_position(current_width, current_height, context.index_panel.is_visible(), context.detail_panel.is_visible(), context.config_manager.isp, context.features.toppanel.isNeeded(), context.index_panel.get_thumb_height(), context.config, index_panel.getCurrentDisplayingThumbCount());
            set_containers_size_and_position(cntSize);
            context.utils.set_components_position(context.features, "indexnav,imagenav,backbutton,grytitle,buttonbar", cntSize);
            $(window).resize(windowResize);
            if (context.utils.is_iphone() || context.utils.is_ipad()) {
                window.onorientationchange = function() {
                    repaint(true)
                }
            }
            context.utils.setup_components_event(context.features, "buttonbar");
            setNavEvents();
            if (context.detail_panel.is_visible()) {
                if (context.features.fullscreen.switched_2_fullscreen()) {
                    overlay_visible = context.features.fullscreen.getPersistor().parent_gallery_param.overlay_info_visible
                } else {
                    set_overlay_visible(overlay_visible, true)
                }
                if (!overlay_visible) {
                    display_overlay(0);
                    context.features.showinfo.showInfoCtrls(overlay_visible);
                    context.features.imagenav.repaint(250, mouseHoveringIn)
                }
            }
            set_key_events();
            context.config.onload();
            setPanelHoverEvents();
            context.features.hashstatus.setHashChangedEvent(directGo2);
            var forceInitialization = true;
            if (context.features.fullscreen.switched_2_fullscreen()) {
                forceInitialization = false;
                var opendFromSplash = context.features.fullscreen && context.features.fullscreen.getPersistor().parent_gallery_param.openedFromSplash && context.features.fullscreen.getPersistor().parent_gallery_param.openedFromSplash() ? true : false;
                if (context.utils.is_large_screen_mode(context.config)) {
                    show_main_image(context.features.fullscreen.getPersistor().parent_gallery_param.current_image_index, image_change_speed, true);
                    context.features.showthumbsbutton.setIndexVisibleFlag(!context.features.fullscreen.getPersistor().parent_gallery_param.hide_thumbnails_in_lsm);
                    repaint(true);
                    if (context.features.fullscreen.getPersistor().parent_gallery_param.is_autoplaying) {
                        context.features.autoplay.stop(false, true);
                        context.features.autoplay.toggleAutoPlay(false, opendFromSplash ? false : true)
                    }
                } else {
                    context.detail_panel.set_visible_flag(context.features.fullscreen.getPersistor().parent_gallery_param.is_detail_visible);
                    context.index_panel.set_visible_flag(context.features.fullscreen.getPersistor().parent_gallery_param.is_index_visible);
                    if (context.detail_panel.is_visible()) {
                        show_main_image(context.features.fullscreen.getPersistor().parent_gallery_param.current_image_index, image_change_speed, true);
                        repaint(true);
                        overlay_visible = context.features.fullscreen.getPersistor().parent_gallery_param.overlay_info_visible;
                        display_overlay(0);
                        context.features.showinfo.showInfoCtrls(overlay_visible);
                        context.features.imagenav.repaint(250, mouseHoveringIn);
                        if (context.features.fullscreen.getPersistor().parent_gallery_param.is_autoplaying) {
                            context.features.autoplay.stop(false, true);
                            context.features.autoplay.toggleAutoPlay(false, opendFromSplash ? false : true)
                        }
                    } else {
                        show_thumbnails(context.features.fullscreen.getPersistor().parent_gallery_param.current_image_index);
                        repaint(true)
                    }
                }
                context.utils.add_fullscreen_listener(function(fullscreen) {
                    if (!fullscreen && context.features.hashstatus.getHashStatus().hasExpHash) {
                        if (!context.config.scrollssmthumbs) {
                            context.features.fullscreen.full_screen()
                        }
                    }
                })
            } else {
                if (context.utils.is_new_expanded_window()) {
                    forceInitialization = false;
                    context.features.showthumbsbutton.setIndexVisibleFlag(context.config.hide_thumbnails_in_lsm != "true");
                    context.detail_panel.set_visible_flag(context.config.is_detail_visible === "true");
                    context.index_panel.set_visible_flag(context.config.is_index_visible === "true");
                    if (context.config.pageTitle) {
                        try {
                            $("head > title").html(context.config.pageTitle)
                        } catch (err) {}
                    }
                    if (context.detail_panel.is_visible()) {
                        show_main_image(context.config.firstimageindex ? context.config.firstimageindex - 1 : 0, image_change_speed, true)
                    }
                    repaint(true)
                }
            }
            if (!context.utils.is_new_expanded_window()) {
                window.setTimeout(function() {
                    if (context.config_manager.isp && context.features.fullscreen.switched_2_fullscreen()) {
                        lastImageEventIndex = context.features.fullscreen.getPersistor().parent_gallery_param.last_image_event_index;
                        for (var key in context.features.fullscreen.getPersistor().parent_gallery) {
                            if (typeof(context.features.fullscreen.getPersistor().parent_gallery[key]) != "function") {
                                continue
                            }
                            if (key === "onExpand") {
                                continue
                            }
                            juicebox_instances[context.instance_id][key] = context.features.fullscreen.getPersistor().parent_gallery[key]
                        }
                    }
                }, 100);
                if (!showLoadingEffect && context.utils.is_earlier_ie()) {
                    window.setTimeout(function() {
                        repaint(true)
                    }, 100)
                }
            }
            var panelVisibilityOverwritten = false;
            if (context.config.autoplayonload && !context.features.fullscreen.switched_2_fullscreen()) {
                var itisLsm = context.utils.is_large_screen_mode(context.config);
                if (!itisLsm) {
                    if (!isDirectOpen || !context.config.showsmallthumbsonload) {
                        switch_2_main_image(context.detail_panel.get_photo_position())
                    }
                    panelVisibilityOverwritten = true
                }
                window.setTimeout(function() {
                    context.features.autoplay.toggleAutoPlay(true)
                }, 100)
            }
            if (!showLoadingEffect) {
                window.setTimeout(function() {
                    fireInitializedEvent()
                }, 300)
            }
            if (forceInitialization) {
                var dcheckresult = check_open_image_directly();
                if (!dcheckresult && !panelVisibilityOverwritten) {
                    if (!context.config.showsmallthumbsbutton || !context.config.showsmallthumbsonload) {
                        context.detail_panel.set_visible_flag(true);
                        context.index_panel.set_visible_flag(false)
                    }
                    if (context.index_panel.is_visible()) {
                        show_thumbnails(0)
                    }
                    if (context.detail_panel.is_visible() && !context.features.fullscreen.switched_2_fullscreen()) {
                        if (!context.utils.is_large_screen_mode(context.config) || context.config.showthumbsonload) {
                            window.setTimeout(function() {
                                show_main_image(0, 1000 * context.config.fadetime, true)
                            }, 100)
                        }
                    }
                } else {
                    if (context.detail_panel.is_visible() && !context.utils.is_large_screen_mode(context.config)) {
                        overlay_visible = context.config.showoverlayonload;
                        context.features.showinfo.showInfoCtrls(overlay_visible);
                        show_hide_overlay(overlay_visible, 0)
                    }
                }
            }
            _(".jb-classifier-detail-area").disableSelection();
            inactiveTime = 1000 * context.config.inactivitytimeout;
            if (overlay_visible && !context.utils.is_complete_touch() && !context.config.forcetouchmode) {
                resetInactiveTimer()
            }
        };
        var can_image_move = function(to_next) {
            var glrylen = gallery_manager.length();
            if (glrylen <= 1) {
                return false
            }
            if (context.config.enablelooping) {
                return true
            }
            var imgpos = context.detail_panel.get_photo_position();
            if (to_next) {
                if (imgpos >= glrylen - 1) {
                    return false
                }
                return true
            } else {
                if (imgpos <= 0) {
                    return false
                }
                return true
            }
        };
        var can_page_move = function(to_next) {
            if (context.index_panel.is_last_page() && context.index_panel.is_first_page()) {
                return false
            }
            if (context.config.enablelooping) {
                return true
            }
            if (to_next) {
                if (context.index_panel.is_last_page()) {
                    return false
                }
                return true
            } else {
                if (context.index_panel.is_first_page()) {
                    return false
                }
                return true
            }
        };
        var set_key_events = function() {
            var setFocus = function() {
                if (context.features.fullscreen.switched_2_fullscreen() || is_full_screen_mode) {
                    if (!context.utils.is_in_iframe()) {
                        _("").focus()
                    }
                }
            };
            if (!context.config.enablekeyboardcontrols) {
                if (context.config.enableautoplay) {
                    setFocus();
                    _("").keydown(function(evt) {
                        if (evt.ctrlKey || evt.altKey || evt.shiftKey || evt.metaKey) {
                            return
                        }
                        switch (evt.keyCode) {
                            case 32:
                                evt.preventDefault();
                                context.features.autoplay.toggleAutoPlay();
                                break;
                            default:
                                break
                        }
                    })
                }
                return
            }
            if (context.utils.is_iphone() || context.utils.is_ipad() || context.utils.is_small_android()) {
                return
            }
            setFocus();
            _("").keydown(function(evt) {
                if (evt.ctrlKey || evt.altKey || evt.shiftKey || evt.metaKey) {
                    return
                }
                switch (evt.keyCode) {
                    case 32:
                        evt.preventDefault();
                        if (!context.config.enableautoplay) {
                            return
                        }
                        context.features.autoplay.toggleAutoPlay();
                        break;
                    case 37:
                    case 75:
                        evt.preventDefault();
                        context.features.autoplay.stop();
                        previous_image(0);
                        break;
                    case 39:
                    case 74:
                        evt.preventDefault();
                        context.features.autoplay.stop();
                        next_image(0);
                        break;
                    case 36:
                        evt.preventDefault();
                        context.features.autoplay.stop();
                        show_thumbnails(0);
                        show_main_image(0);
                        break;
                    case 35:
                        evt.preventDefault();
                        context.features.autoplay.stop();
                        var imgpos = gallery_manager.length() - 1;
                        show_thumbnails(imgpos);
                        show_main_image(imgpos);
                        break;
                    case 70:
                        if (is_full_screen_mode || context.features.fullscreen.switched_2_fullscreen()) {
                            return
                        }
                        evt.preventDefault();
                        context.features.fullscreen.full_screen();
                        break;
                    case 27:
                        if (context.features.fullscreen.switched_2_fullscreen()) {
                            evt.preventDefault();
                            context.features.fullscreen.full_screen()
                        }
                        break
                }
            })
        };
        var update_flickr_image_details = function(imageIndex, details) {
            if (!details) {
                return
            }
            var image = gallery_manager.get_image(imageIndex);
            if (image.flickrPhotoId !== details.id) {
                return
            }
            image.description = details.description;
            image.detail_loaded = true;
            if (context.detail_panel.is_initialized()) {
                context.detail_panel.repopulate_caption_html(image)
            }
        };
        var load_images = function(jsonobj) {
            if (context.config.useflickr) {
                flickr_loader = new juicebox_flickr_image_loader($, context.config_manager, display_error_message)
            }
            var limit = context.config_manager.isp ? (100000) : 50;
            if (context.config.useflickr) {
                flickr_loader.get_images(function(photos) {
                    for (var i = 0; i < photos.length && i < limit; i++) {
                        gallery_manager.add_image({
                            imageURL: photos[i].imageURL,
                            thumbURL: photos[i].thumbURL,
                            caption: photos[i].caption,
                            title: photos[i].caption,
                            imageFullURL: photos[i].imageFullURL,
                            flickrPhotoId: photos[i].flickrPhotoId
                        })
                    }
                    show_splash_page()
                }, null)
            } else {
                if (jsonobj && jsonobj.images) {
                    var ndimages = jsonobj.images;
                    var count = 0;
                    for (var i = 0; i < ndimages.length; i++) {
                        if (count >= limit) {
                            break
                        }
                        count++;
                        var currentimg = ndimages[i];
                        var attrName = "imageurl";
                        var useMultiSize = context.utils.ship;
                        if (useMultiSize) {
                            if (context.utils.is_retina_display()) {
                                if (context.utils.is_large_screen_mode(context.config)) {
                                    attrName = "largeimageurl"
                                }
                            } else {
                                if (context.utils.is_large_screen_mode(context.config)) {
                                    if (!$.browser.msie && context.config.usefullscreenexpand && context.features.fullscreen.switched_2_fullscreen()) {
                                        attrName = "largeimageurl"
                                    }
                                } else {
                                    attrName = "smallimageurl"
                                }
                            }
                            if (!different_size_images_in_config && (currentimg.largeimageurl || currentimg.smallimageurl)) {
                                different_size_images_in_config = true
                            }
                            if (attrName != "imageurl" && !currentimg[attrName]) {
                                attrName = "imageurl"
                            }
                        }
                        var imgurl = correct_path(currentimg[attrName]);
                        var tu = currentimg.thumburl;
                        var thmurl = (tu ? correct_path(tu) : imgurl);
                        var purchaseurl = (context.config_manager.isp ? currentimg.purchaseurl : "");
                        var lgImageUrl = (useMultiSize && currentimg.largeimageurl) ? correct_path(currentimg.largeimageurl) : "";
                        var smImageUrl = (useMultiSize && currentimg.smallimageurl) ? correct_path(currentimg.smallimageurl) : "";
                        var oriImageUrl = currentimg.imageurl ? correct_path(currentimg.imageurl) : "";
                        gallery_manager.add_image({
                            largeImageURL: lgImageUrl,
                            smallImageURL: smImageUrl,
                            originalImageURL: oriImageUrl,
                            imageURL: imgurl,
                            thumbURL: thmurl,
                            title: currentimg.title,
                            caption: currentimg.caption,
                            linkURL: correct_path(currentimg.linkurl),
                            linkTarget: currentimg.linktarget,
                            purchaseURL: purchaseurl
                        })
                    }
                    show_splash_page()
                }
            }
        };
        var get_gallery_height = function(donotAdjustHeight) {
            return sizing.get_gallery_height(context.config, context.features.fullscreen.switched_2_fullscreen() || is_full_screen_mode, context.features.fullscreen.switched_2_fullscreen(), donotAdjustHeight)
        };
        var get_gallery_width = function() {
            return sizing.get_gallery_width(context.config, context.features.fullscreen.switched_2_fullscreen() || is_full_screen_mode, context.features.fullscreen.switched_2_fullscreen())
        };
        var init_before_loading_gallery_html = function(container) {
            if ($.browser.msie && $.browser.version < 8) {
                var element = document.getElementById(context.config.containerid);
                element.innerHTML = "__"
            }
            sizing = new juicebox_sizing_manager($, container, context.utils);
            if (!context.utils.is_ie8()) {
                sizing.trySetContainerSize(context, context.config.gallerywidth, context.config.galleryheight, container)
            }
            if (!context.utils.is_ie8()) {
                is_full_screen_mode = sizing.is_fullscreen_mode(context.config)
            }
            sizing.try_set_body_size(context.config, context.features.fullscreen.switched_2_fullscreen() || is_full_screen_mode);
            if (!sizing.force_height_calculation(context.config) && (context.config.galleryheight + "").indexOf("%") > 0) {
                sizing.trySetContainerSize(context, context.config.gallerywidth, get_gallery_height(), container)
            } else {
                sizing.trySetContainerSize(context, context.config.gallerywidth, context.config.galleryheight, container)
            }
            if (context.utils.is_ie8()) {
                is_full_screen_mode = sizing.is_fullscreen_mode(context.config)
            }
            if (is_full_screen_mode) {
                $("body").addClass("jb-flag-fullscreen")
            }
            current_width = get_gallery_width();
            current_height = get_gallery_height()
        };
        var init_after_dom_loaded = function() {
            var container = $("#" + context.config.containerid);
            container.attr("oncontextmenu", "return false;");
            _(".jb-navigation.jb-classifier-detail-area").fadeOut(0);
            context.utils.init_components(context.features, "fullscreen");
            if (window.location.href.toLowerCase().indexOf("http") !== 0) {
                if (!context.utils.is_ie_edge() && (context.utils.is_chrome() || context.utils.is_opera() || context.utils.is_ie_after_11())) {
                    display_error_message(context.config.languagelistall.lcchm);
                    return
                }
            }
            var galleryFile = correct_path(context.config.configurl);
            $.ajax({
                url: galleryFile,
                type: "GET",
                dataType: "text",
                error: function() {
                    $("#" + document_id).html(display_error_message(context.config.languagelistall.ae))
                },
                success: function(data) {
                    var rsp, dataobj;
                    if (typeof data === "string") {
                        var isJson = $.trim(data)[0] != "<";
                        if (isJson) {
                            dataobj = context.config_manager.convert_2_json_lowercase_keys(data)
                        } else {
                            if ($.browser.msie) {
                                rsp = new ActiveXObject("Microsoft.XMLDOM");
                                rsp.async = false;
                                rsp.loadXML(data);
                                data = rsp
                            } else {
                                rsp = new DOMParser();
                                data = rsp.parseFromString(data.replace(/<!--[\s\S]*?-->/g, ""), "text/xml")
                            }
                            dataobj = context.config_manager.convert_xml_2_json(data)
                        }
                    } else {
                        dataobj = context.config_manager.convert_xml_2_json(data)
                    }
                    context.config_manager.sync_options(cnfg, dataobj);
                    context.config = context.config_manager.get_config();
                    for (var i in context.features) {
                        context.features[i].setContext(context)
                    }
                    if (context.utils.is_new_expanded_window()) {
                        removeIgnoredOptions(ignoredOptions4NewPage)
                    } else {
                        if (context.features.fullscreen.switched_2_fullscreen()) {
                            removeIgnoredOptions(ignoredOptions4New)
                        }
                    }
                    image_change_speed = 1000 * context.config.imagetransitiontime;
                    if (image_change_speed <= 0) {
                        image_change_speed = 1000
                    }
                    context.index_panel.synchronize_config(context.config);
                    _("." + theme_cls).attr("style", get_background_style());
                    var start_loading_images = function() {
                        if (context.config.showpreloader) {
                            window.setTimeout(function() {
                                load_images(dataobj)
                            }, 300)
                        } else {
                            load_images(dataobj)
                        }
                    };
                    var showPasswordDialog = context.config.usepassword;
                    if (showPasswordDialog) {
                        if (context.features.splash.isNeeded()) {
                            showPasswordDialog = false
                        } else {
                            if (context.features.fullscreen.switched_2_fullscreen()) {
                                var opendFromSplash = context.features.fullscreen && context.features.fullscreen.getPersistor().parent_gallery_param.openedFromSplash && context.features.fullscreen.getPersistor().parent_gallery_param.openedFromSplash() ? true : false;
                                if (!opendFromSplash) {
                                    showPasswordDialog = false
                                }
                            }
                        }
                    }
                    if (showPasswordDialog) {
                        var jbcore = context.utils.get_js_folder_url();
                        var statusKey = "loginStatus" + jbcore;
                        var successStatus = "valid";
                        var ls = (context.config.rememberpassword && window.sessionStorage) ? sessionStorage.getItem(statusKey) : false;
                        if (ls == successStatus) {
                            start_loading_images()
                        } else {
                            container = $("#" + context.config.containerid);
                            if (!is_full_screen_mode) {
                                var glryWidth = parseInt(container.width());
                                if (glryWidth <= 360) {
                                    container.addClass("jb-size-flag-010")
                                } else {
                                    if (glryWidth > 360 && glryWidth <= 480) {
                                        container.addClass("jb-size-flag-020")
                                    }
                                }
                            }
                            context.features.login.showLoginDialog(function(data) {
                                if (window.sessionStorage) {
                                    sessionStorage.setItem(statusKey, successStatus)
                                }
                                container.html(gallery_skeleton(document_id));
                                start_loading_images()
                            }, function() {
                                $("#" + document_id).html(display_error_message("Login failed."))
                            }, function() {
                                $("#" + document_id).html(display_error_message("Failed to login."))
                            })
                        }
                    } else {
                        start_loading_images()
                    }
                }
            })
        };
        var display_error_message = function(msg) {
            var container;
            if (context.config.containerid) {
                container = $("#" + context.config.containerid)
            } else {
                container = _("")
            }
            var msgHtml;
            if (container.height() <= 0 && context.config.galleryheight.indexOf("%") > 0) {
                sizing.trySetContainerSize(context, 0, $(window).height() * parseInt(context.config.galleryheight) / 100)
            }
            if (container && container.length > 0) {
                msgHtml = "<table style='width:100%;height:100%;text-align:center;background-color:#777;'><tr><td><div class='jb-error-message' style='color:white;font-family:sans-serif;font-size:18px;'>" + msg + "</div></td></tr></table>";
                container.html(msgHtml)
            } else {
                msgHtml = "<table style='width:100%;height:100%;text-align:center;font-family:sans-serif;font-size:18px;background-color:#777;color:#FFF;'><tr><td>" + msg + "</td></tr></table>";
                document.write(msgHtml)
            }
        };
        var get_badge_style_str = function() {
            return ["st", "yl", "e", "=", "'", "dis", "pl", "ay", ":", "bl", "ock", " !", "imp", "ort", "ant", ";", "width", ":", "9", "0", "px", " !im", "port", "ant;", "height", ":", "2", "4", "px", " !", "imp", "ort", "ant", ";", "overflow", ":", "hidden", " !", "imp", "ort", "ant", ";", "position", ":", "absolute", " !", "imp", "ort", "ant", ";", "z-index", ":", "3", "0", "0", "0"].join("")
        };
        var add_css_link = function(linkUrl) {
            var id = "jb-lnktag-theme-0";
            if ($("#" + id).length > 0) {
                return
            }
            var csslnk = document.createElement("link");
            csslnk.type = "text/css";
            csslnk.rel = "stylesheet";
            csslnk.id = id;
            var head = document.getElementsByTagName("head")[0] || document.documentElement;
            csslnk.href = linkUrl;
            head.appendChild(csslnk)
        };
        var init = function() {
            context.utils.init_components(context.features, "hashstatus");
            juicebox_instance_count++;
            if (context.config.themeurl) {
                themeUrl = context.config.themeurl
            } else {
                if (context.config.theme) {
                    themeUrl = correct_path(context.config.jbcore) + "themes/" + context.config.theme + "/css/style.css"
                }
            }
            add_css_link("jbcore/classic/theme.css");
            var container;
            if (context.config.containerid) {
                var dom_loading_tmr = 0;
                container = $("#" + context.config.containerid);
                if (container.length > 0) {
                    init_before_loading_gallery_html(container);
                    container.html(gallery_skeleton(document_id));
                    init_after_dom_loaded()
                } else {
                    dom_loading_tmr = window.setInterval(function() {
                        var cntnr = $("#" + context.config.containerid);
                        if (cntnr.length <= 0) {
                            if ($("body").length > 0) {
                                display_error_message(context.config.languagelistall.noid01 + context.config.containerid + context.config.languagelistall.noid02);
                                if (dom_loading_tmr) {
                                    window.clearInterval(dom_loading_tmr)
                                }
                                dom_loading_tmr = 0;
                                return
                            }
                            return
                        }
                        if (dom_loading_tmr) {
                            window.clearInterval(dom_loading_tmr)
                        }
                        dom_loading_tmr = 0;
                        init_before_loading_gallery_html(cntnr);
                        cntnr.html(gallery_skeleton(document_id));
                        init_after_dom_loaded()
                    }, 200)
                }
            } else {
                document.write(get_container_html(document_id));
                container = _("");
                init_before_loading_gallery_html(container);
                container.html(get_gallery_frame_html());
                init_after_dom_loaded()
            }
        };
        var get_container_html = function(documentId, token) {
            var ver = "";
            if ($.browser.msie) {
                ver = "jb-flag-msie jb-flag-msiever" + parseInt($.browser.version) + (context.utils.is_earlier_ie() ? " jb-flag-msie-bf9" : "")
            } else {
                if (context.utils.is_swipable_device()) {
                    ver = "jb-flag-touchable"
                }
            }
            return "<div id='" + documentId + "' tabindex='0' class='juicebox-gallery " + ver + "' style='width:100%;height:100%;'>" + (token ? token : "") + "</div>"
        };
        var get_autoplay_status_html = function() {
            if (!context.config.showautoplaystatus) {
                return ""
            }
            return "<div class='jb-status-message' style='position:absolute;display:none;" + (context.config.galleryfontface ? "font-family:" + context.config.galleryfontface + ";" : "") + "'></div>"
        };
        var get_background_style = function() {
            var hstr = "height:100%";
            var bkgrndcolor = context.config.backgroundcolor;
            if (context.features.fullscreen.switched_2_fullscreen() || context.utils.is_new_expanded_window()) {
                if (context.config.expandedbackgroundcolor) {
                    bkgrndcolor = context.config.expandedbackgroundcolor
                }
            }
            var bkcolorstyle = (bkgrndcolor ? "background-color:" + context.utils.format_color(bkgrndcolor) + ";" + (context.utils.is_earlier_ie() ? context.config.backgroundopacity + ";" : "") : "");
            return "display:none;width:100%;" + hstr + ";" + bkcolorstyle
        };
        var get_badge_image_url = function() {
            if (context.utils.is_adobe_air()) {
                return ""
            }
            return ["u", "rl", "(", "ht", "tp", "s:", "/", "/", "j", "ui", "ce", "b", "o", "x", ".", "n", "e", "t", "/", "i", "m", "g", "/", "jb", "0", "0", "1", ".", "p", "n", "g", ")"].join("")
        };
        var get_badge_link = function() {
            return ["on", "c", "l", "i", "c", "k", "=", '"', "w", "i", "n", "d", "o", "w", ".", "o", "p", "e", "n", "(", "'", "h", "t", "t", "p", "s:", "/", "/", "w", "w", "w", ".", "j", "u", "i", "c", "eb", "ox", ".", "ne", "t'", ")", ";", "return ", "false", ';"'].join("")
        };
        var get_gallery_frame_html = function() {
            var badge = "";
            // if (!context.utils.ship) {
            //     badge = "<div " + get_badge_style_str() + ($.browser.msie ? "" : " !important") + ";background: " + get_badge_image_url() + " no-repeat 0 0 !important;cursor:pointer;margin:0 !important;padding:0 !important;bottom:0 !important;right:0 !important' " + get_badge_link() + "></div>"
            // }
            // if (context.utils.is_adobe_air()) {
            //     badge = badge.replace("<div style=", "<div class='" + ["j", "b", "-", "b", "a", "d", "g", "e"].join("") + "' style=").replace(";background: " + get_badge_image_url() + " no-repeat 0 0 !important;", ";")
            // }
            var capposition = context.config.captionposition.toUpperCase();
            return "<div class='" + theme_cls + "' style='" + get_background_style() + "'>" + context.features.backgroundimage.getHtml() + context.features.toppanel.getHtml() + "<div class='jb-panel-index jb-classifier-thumb-area' data-layer='300' style='display:none;position:absolute !important;z-index:300;'><div class='jb-idx-thumbnail-container' style='height:100% !important;width:100% !important;margin:0;padding:0;position:relative;'></div><div class='jb-navigation index-navigation jb-classifier-thumb-area'><div class='jbn-nav-button jbn-left-button jbn-nav-button-icon jb-classifier-layer' data-layer='1000' style='z-index:1000;display:none;" + context.utils.get_nav_icon_style(context.config) + "'>" + context.utils.add_font_icon_4_ie8(context.config, "&#xe000;") + "</div><div class='jbn-nav-button jbn-right-button jbn-nav-button-icon jb-classifier-layer' data-layer='1000' style='z-index:1000;display:none;" + context.utils.get_nav_icon_style(context.config) + "'>" + context.utils.add_font_icon_4_ie8(context.config, "&#xe001;") + "</div></div><div class='jb-idx-thumbnail-show-more' style='left:3px;bottom:5px;height:30px;width:100%;position:absolute;display:none;'><a href='#'>more...</a></div></div>" + context.features.backbutton.getHtml() + context.features.buttonbar.getHtml4IndexPage() + "<div class='jb-panel-detail jb-classifier-detail-area jb-classifier-layer' data-layer='50' style='position:absolute !important'></div>" + context.features.grytitle.getHtml() + context.features.buttonbar.getHtml() + badge + ((capposition != "NONE" && capposition != "BELOW_THUMBS") ? context.features.caption.getHtml() : "") + "<div class='jb-navigation jb-classifier-detail-area jb-classifier-layer' data-layer='500' style='height:100%;z-index:500;'>" + get_autoplay_status_html() + "<div class='jbn-nav-touch-area jbn-nav-left-touch-area'>" + context.features.imagenav.getHtml(true) + "</div><div class='jbn-nav-touch-area jbn-nav-right-touch-area'>" + context.features.imagenav.getHtml() + "</div></div></div>"
        };
        var map_2_parent_gallery_url = function(url) {
            if (context.utils.is_new_expanded_window()) {
                var parentUrl = context.config.parenturl;
                if (!parentUrl) {
                    remove_expanding_hash(url)
                }
                var urlEles = url.split("#");
                var urlParentEles = parentUrl.split("#");
                return urlParentEles[0] + (urlEles.length >= 2 ? "#" + urlEles[1] : "")
            }
            return remove_expanding_hash(url)
        };
        var remove_expanding_hash = function(url) {
            if (!url) {
                return rul
            }
            var hashVal = context.features.hashstatus.getExpendedHash();
            var urlEles = url.split("#");
            if (urlEles.lenght <= 1) {
                return url
            }
            return urlEles[0] + "#" + urlEles[1].replace(hashVal, "")
        };
        var get_current_gallery_image_info = function() {
            var glryUrl;
            var currentImage = context.detail_panel.get_current_photo();
            if (context.config.enabledirectlinks) {
                glryUrl = window.location.href
            } else {
                glryUrl = context.features.hashstatus.getUrlWithImageHash(currentImage.position)
            }
            var galleryTitle = _(".jb-area-large-mode-title").text();
            var imgTitle = _(".caption_" + currentImage.position + " .jb-caption .jb-caption-title").text();
            var captionDesc = _(".caption_" + currentImage.position + " .jb-caption .jb-caption-desc").text();
            var sharedTxt = galleryTitle;
            if (sharedTxt) {
                if (imgTitle) {
                    sharedTxt += " | " + imgTitle
                }
            } else {
                if (imgTitle) {
                    sharedTxt = imgTitle
                }
            }
            var allTitles = sharedTxt;
            if (sharedTxt && captionDesc) {
                sharedTxt += " | " + captionDesc
            }
            if (!sharedTxt) {
                sharedTxt = captionDesc
            }
            return {
                shareUrl: encodeURIComponent(map_2_parent_gallery_url(glryUrl)),
                imageUrl: encodeURIComponent(context.utils.convert_to_absolute_path(currentImage.imageURL)),
                shareText: encodeURIComponent(sharedTxt),
                caption: encodeURIComponent(captionDesc),
                title: encodeURIComponent(imgTitle),
                galleryTitle: encodeURIComponent(galleryTitle),
                allTitles: encodeURIComponent(allTitles),
                imagePosition: currentImage.position
            }
        };
        var gallery_skeleton = function(documentId) {
            var frameHtml = get_gallery_frame_html();
            return get_container_html(documentId, frameHtml)
        };
        var lastPageEventIndex = -1;
        var after_page_changed = function(skipEvent) {
            context.features.indexnav.repaint();
            if (!skipEvent && context.config_manager.isp && juicebox_instances[context.instance_id] && typeof(juicebox_instances[context.instance_id].onThumbPageChange) === "function") {
                var curntPage = parseInt(context.index_panel.get_index()) + 1;
                if (curntPage != lastPageEventIndex) {
                    lastPageEventIndex = curntPage;
                    var curntImage = context.detail_panel.get_current_photo();
                    var evntObj = {
                        id: curntPage,
                        title: context.config.gallerytitle,
                        caption: curntImage.caption
                    };
                    juicebox_instances[context.instance_id].onThumbPageChange(evntObj)
                }
            }
        };
        var show_thumbnails = function(imgpos) {
            var cntSize = sizing.get_containers_size_and_position(current_width, current_height, context.index_panel.is_visible(), context.detail_panel.is_visible(), context.config_manager.isp, context.features.toppanel.isNeeded(), context.index_panel.get_thumb_height(), context.config, index_panel.getCurrentDisplayingThumbCount());
            context.index_panel.show_page_4_image_position(imgpos, cntSize.index_panel_width, cntSize.index_panel_height);
            context.utils.reppaint_components(context.features, "indexnav,grytitle,showthumbsbutton");
            if (context.index_panel.is_visible()) {
                set_containers_size_and_position(cntSize, true);
                context.features.indexnav.setPosition(cntSize)
            }
        };
        var need_jump_2_page = function(position) {
            if (!context.utils.is_swipable_device() || !context.features.touchevent.isInTransitioning()) {
                return false
            }
            var cntSize = sizing.get_containers_size_and_position(current_width, current_height, context.index_panel.is_visible(), context.detail_panel.is_visible(), context.config_manager.isp, context.features.toppanel.isNeeded(), context.index_panel.get_thumb_height(), context.config, index_panel.getCurrentDisplayingThumbCount());
            context.index_panel.show_page_4_image_position(position, cntSize.index_panel_width, cntSize.index_panel_height);
            return true
        };
        var before_show_main_image = function(position) {
            if (!context.features.autoplay.isPlaying() || context.config.autoplaythumbs) {
                context.index_panel.set_thumbnail_visited(position);
                if (context.index_panel.is_visible()) {
                    var idxRange = context.index_panel.get_image_index_range();
                    var rangeSize = idxRange.to - idxRange.from + 1;
                    if (position < idxRange.from - rangeSize) {
                        return
                    }
                    if (position > idxRange.to + rangeSize) {
                        return
                    }
                    if (position < idxRange.from && position === 0) {
                        if (!need_jump_2_page(position)) {
                            context.index_panel.move_to_next_page()
                        }
                    } else {
                        if (position > idxRange.to) {
                            if (!need_jump_2_page(position)) {
                                context.index_panel.move_to_next_page()
                            }
                        } else {
                            if (position < idxRange.from) {
                                if (!need_jump_2_page(position)) {
                                    context.index_panel.move_to_prev_page()
                                }
                            }
                        }
                    }
                }
            }
        };
        var after_show_main_image = function(position, fromHashEvent) {
            is_switching_image = false;
            context.features.grytitle.repaint();
            if (!fromHashEvent || window.location.href.split("#").length < 2 || !window.location.href.split("#")[1]) {
                context.features.hashstatus.setImageHash(position)
            }
            if (!context.features.autoplay.isPlaying() || context.config.autoplaythumbs) {
                var imgrange = context.index_panel.get_image_index_range();
                if (index_panel.is_visible() && (imgrange.from > position || imgrange.to < position)) {
                    show_thumbnails(position)
                }
            }
            var components = "buttonbar";
            if (overlay_visible) {
                components += ",backbutton"
            }
            context.utils.reppaint_components(context.features, components);
            set_caption_height_mode();
            if ((overlay_visible || context.config.showinfobutton) || context.config.imagenavposition.toUpperCase() != "STAGE") {
                context.features.imagenav.repaint(250, mouseHoveringIn)
            }
            context.features.showthumbsbutton.repaint();
            if (context.config_manager.isp && juicebox_instances[context.instance_id] && typeof(juicebox_instances[context.instance_id].onImageChange) === "function") {
                needImageEventOnFirstLoad = false;
                var curntImage = context.detail_panel.get_current_photo();
                var curntImgIdxNo = parseInt(curntImage.position) + 1;
                var evntObj = {
                    id: curntImgIdxNo,
                    title: context.config.gallerytitle,
                    caption: curntImage.caption
                };
                if (curntImgIdxNo != lastImageEventIndex) {
                    lastImageEventIndex = curntImgIdxNo;
                    juicebox_instances[context.instance_id].onImageChange(evntObj)
                }
            }
            context.features.download.onImageChange({});
            handle_image_preload();
            if (context.utils.is_chrome()) {
                _(" *").disableSelection()
            } else {
                _(".jb-dt-main-image-" + position + " img").disableSelection();
                _(".table_page_" + context.index_panel.get_index() + " img").disableSelection();
                if ($.browser.mozilla) {
                    _(".jb-navigation.jb-classifier-detail-area *").disableSelection()
                }
            }
            if ($.browser.msie && $.browser.version >= 8 && context.config.firstimageindex > 0) {
                context.index_panel.set_thumbnail_visited(position);
                window.setTimeout(function() {
                    context.index_panel.set_thumbnail_visited(position)
                }, 200)
            }
        };
        var needImageEventOnFirstLoad = true;
        var lastImageEventIndex = -1;
        var show_main_image = function(position, delay, isfirstimage, fromHashEvent, dwidth, dheight) {
            context.features.touchevent.resetFlags();
            if (!delay && $.browser.msie) {
                window.setTimeout(function() {
                    context.index_panel.set_thumbnail_visited(position)
                }, 100)
            } else {
                context.index_panel.set_thumbnail_visited(position)
            }
            if (!context.utils.is_large_screen_mode(context.config)) {
                context.features.buttonbar.setPosition()
            }
            if (isfirstimage) {
                context.detail_panel.populate_photo_html(position, delay, function() {
                    after_show_main_image(position, needImageEventOnFirstLoad);
                    needImageEventOnFirstLoad = false
                }, context.features.caption.isVisible(isfirstimage), false, dwidth, dheight);
                return
            }
            if (delay) {
                is_switching_image = true;
                context.detail_panel.change_2_photo(false, 0, context.features.caption.isVisible(), position)
            } else {
                context.detail_panel.populate_photo_html(position, 0, null, context.features.caption.isVisible(isfirstimage), false, dwidth, dheight);
                after_show_main_image(position, fromHashEvent)
            }
            needImageEventOnFirstLoad = false;
            avoidImageFreezing()
        };
        var hacking_timer = 0;
        var avoidImageFreezing = function() {
            if (!context.utils.is_android() && !($.browser.msie && $.browser.version >= 8 && $.browser.version <= 9)) {
                return
            }
            if (hacking_timer) {
                window.clearTimeout(hacking_timer)
            }
            hacking_timer = window.setTimeout(function() {
                repaint(true);
                hacking_timer = 0
            }, 500)
        };
        var handle_image_preload = function() {
            var range;
            var preldopt = context.config.imagepreloading.toUpperCase();
            if (preldopt === "ALL") {
                range = {
                    from: 0,
                    to: gallery_manager.length() - 1
                }
            } else {
                if (preldopt === "NEXT") {
                    range = {
                        from: context.detail_panel.get_current_photo().position,
                        to: context.detail_panel.get_current_photo().position
                    }
                } else {
                    range = context.index_panel.get_image_index_range()
                }
            }
            if (flickr_loader) {
                var flickrRage = range;
                if (preldopt != "ALL" && (!context.config.showthumbsonload || context.config.maxthumbrows <= 0 || context.config.maxthumbcolumns <= 0)) {
                    flickrRage = {
                        from: 0,
                        to: gallery_manager.length() - 1
                    }
                }
                flickr_loader.load_flickr_images_detail(gallery_manager.get_images(), flickrRage, update_flickr_image_details)
            }
            if (context.utils.is_large_screen_mode(context.config)) {
                context.detail_panel.preload_images(range.from, range.to + 1)
            }
        };
        var set_touch_component_height = function(height) {
            var size = sizing.get_containers_size_and_position(current_width, current_height, context.index_panel.is_visible(), context.detail_panel.is_visible(), context.config_manager.isp, context.features.toppanel.isNeeded(), context.index_panel.get_thumb_height(), context.config, index_panel.getCurrentDisplayingThumbCount());
            set_touch_component_size(size.detail_panel_top, size.detail_panel_left, size.detail_panel_width, height)
        };
        var set_touch_component_size = function(top, left, width, height) {
            _(".jb-navigation.jb-classifier-detail-area").css({
                top: top,
                left: left,
                width: width,
                height: height
            })
        };
        var switch_2_main_image = function(position, cb) {
            context.features.autoplay.stop();
            if (context.index_panel.is_visible() && context.detail_panel.is_visible()) {
                show_main_image(position, image_change_speed);
                return
            }
            context.detail_panel.set_visible_flag(true);
            context.index_panel.set_visible_flag(false);
            var hideIndexEvent = function() {
                if (!context.utils.is_large_screen_mode(context.config)) {
                    if (context.config_manager.isp && juicebox_instances[context.instance_id] && typeof(juicebox_instances[context.instance_id].onShowThumbs) === "function") {
                        juicebox_instances[context.instance_id].onShowThumbs(false)
                    }
                }
            };
            if (_(".jb-panel-index").is(":visible")) {
                var navpnl = _(".jb-panel-index .jb-thm-thumb-image, .jb-panel-index  .jb-idx-thumb");
                if (!navpnl.length) {
                    _(".jb-classifier-thumb-area").hide();
                    _(".jb-classifier-detail-area, .jb-area-caption").show();
                    show_main_image(position);
                    if (cb) {
                        cb()
                    }
                } else {
                    var transitionTime = 250;
                    navpnl.stop();
                    context.utils.fade_out(context.config, navpnl, transitionTime);
                    window.setTimeout(function() {
                        _(".jb-classifier-thumb-area").hide();
                        var dtpnl = _(".jb-classifier-detail-area, .jb-area-caption");
                        dtpnl.stop();
                        _(".jb-area-caption").html("");
                        if (context.utils.is_firefox3()) {
                            dtpnl.css({
                                opacity: 1,
                                display: "none"
                            })
                        }
                        dtpnl.children(".jb-dt-main-frame").remove();
                        context.features.buttonbar.trySetInvisible();
                        context.utils.fade_in(context.config, dtpnl, transitionTime);
                        window.setTimeout(function() {
                            show_main_image(position, transitionTime);
                            hideIndexEvent();
                            if (cb) {
                                cb()
                            }
                        }, 20)
                    }, transitionTime > 50 ? transitionTime - 50 : transitionTime)
                }
            } else {
                show_main_image(position);
                if (cb) {
                    cb()
                }
            }
        };
        var set_caption_height_mode = function() {
            if (context.config_manager.isp || !context.detail_panel.is_visible()) {
                return
            }
            var isHigh = true;
            if (context.index_panel.is_visible() && context.config.captionposition.toUpperCase() !== "BOTTOM" && context.config.captionposition.toUpperCase() !== "BELOW_THUMBS") {
                isHigh = false
            }
            context.detail_panel.set_caption_height_mode(isHigh)
        };
        var repaint_timer = 0;
        var repaint = function(force, ignoreIndexPnl, noresize, donotAdjustHeight, skipShowMain) {
            sizing.try_set_body_size(context.config, context.features.fullscreen.switched_2_fullscreen() || is_full_screen_mode);
            var _current_height = noresize ? current_height : get_gallery_height(donotAdjustHeight);
            var _current_width = noresize ? current_width : get_gallery_width();
            var cntSize;
            if (!sizing.force_height_calculation(context.config) && (context.config.galleryheight + "").indexOf("%") > 0) {
                var glryheight = _current_height;
                var adjht = 0;
                if (context.features.fullscreen.switched_2_fullscreen() && context.config.autofullscreenexpand) {
                    adjht = 3
                }
                if ($("#" + context.config.containerid).length > 0) {
                    sizing.trySetContainerSize(context, 0, glryheight + adjht)
                } else {
                    _("").parent().height(glryheight + adjht)
                }
            }
            if ($("#jb-glry-dlg:visible").length > 0 && _("").parent().attr("id") != "jb-glry-dlg") {
                return
            }
            if (right_button_offset == null) {
                right_button_offset = _(".jbn-right-button").width() + parseInt(_(".jbn-right-button").css("margin-right"))
            }
            context.index_panel.cleanup_initial_load_flag();
            if (force || ((current_width != _current_width || current_height != _current_height))) {
                current_width = _current_width;
                current_height = _current_height;
                glryheight = _current_height;
                if (context.features.fullscreen.switched_2_fullscreen()) {
                    _("").css({
                        width: _current_width,
                        height: glryheight
                    })
                } else {
                    if (sizing.force_height_calculation(context.config)) {
                        _("").css({
                            height: glryheight
                        })
                    }
                    if (sizing.force_width_calculation(context.config)) {
                        _("").css({
                            width: _current_width
                        })
                    }
                }
                setup_layout(_current_width, _current_height, context.detail_panel.is_visible());
                cntSize = sizing.get_containers_size_and_position(_current_width, _current_height, context.index_panel.is_visible(), context.detail_panel.is_visible(), context.config_manager.isp, context.features.toppanel.isNeeded(), context.index_panel.get_thumb_height(), context.config, index_panel.getCurrentDisplayingThumbCount());
                set_containers_size_and_position(cntSize, skipShowMain);
                if (!skipShowMain) {
                    if (context.detail_panel.is_visible()) {
                        var wrappersel = (context.utils.is_swipable_device() || context.config.buttonbarposition.toUpperCase() === "OVERLAY_IMAGE") ? ":not(.jb-classifier-link-wrapper)" : "";
                        var excluded = overlay_visible ? "" : ":not(.jb-classifier-show-on-over)";
                        var mainselstr = (overlay_visible && context.utils.is_swipable_device()) ? ".jb-classifier-detail-area" + excluded + wrappersel + ", .jb-area-caption" : ".jb-classifier-detail-area" + excluded + wrappersel;
                        var imgs;
                        if (context.utils.is_earlier_ie()) {
                            _(mainselstr).fadeIn(100);
                            imgs = _(".jb-panel-detail img");
                            imgs.fadeIn(100);
                            _(".jb-panel-detail").fadeIn(100)
                        } else {
                            _(mainselstr).css("opacity", 1).show();
                            imgs = _(".jb-panel-detail img");
                            imgs.css("opacity", 1).show();
                            _(".jb-panel-detail").css("opacity", 1)
                        }
                        if (_(".jb-panel-detail").html()) {
                            context.detail_panel.repaint(cntSize.detail_panel_width, cntSize.detail_panel_height)
                        } else {
                            show_main_image(context.detail_panel.get_photo_position(), 0, false, true, cntSize.detail_panel_width, cntSize.detail_panel_height)
                        }
                        context.features.caption.setMaxHeight(cntSize)
                    } else {
                        context.detail_panel.repaint(cntSize.detail_panel_width, cntSize.detail_panel_height);
                        _(".jb-classifier-detail-area, .jb-area-caption, .jb-classifier-link-wrapper.jb-classifier-detail-area").hide()
                    }
                }
                if (context.index_panel.is_visible() && !ignoreIndexPnl) {
                    _(".jb-classifier-thumb-area").show();
                    _(".jb-panel-index").show();
                    var imgpos = context.detail_panel.get_photo_position();
                    context.index_panel.show_page_4_image_position(imgpos, cntSize.index_panel_width, cntSize.index_panel_height, true)
                } else {
                    _(".jb-panel-index").hide()
                }
                context.features.showthumbsbutton.repaint();
                context.index_panel.set_thumbnail_visited(context.detail_panel.get_photo_position());
                set_caption_height_mode();
                context.utils.set_components_position(context.features, "imagenav,indexnav,grytitle,buttonbar", cntSize);
                context.features.grytitle.repaint()
            }
            if (!donotAdjustHeight) {
                if (context.features.fullscreen.switched_2_fullscreen()) {
                    if (!context.utils.is_android() && !$.browser.msie) {
                        var offset = _("").offset();
                        if (offset) {
                            window.scrollTo(offset.left, offset.top)
                        }
                    }
                } else {
                    if (is_full_screen_mode) {
                        if (context.utils.is_iphone()) {
                            window.scrollTo(0, 1);
                            if (repaint_timer) {
                                window.clearTimeout(repaint_timer);
                                repaint_timer = 0
                            }
                            repaint_timer = window.setTimeout(function() {
                                window.scrollTo(0, 1)
                            }, 1000)
                        }
                    }
                }
            }
            context.utils.reppaint_components(context.features, "backgroundimage")
        };
        if (context.config.css != null) {
            document.write("<style id='" + document_id + "_style'>" + context.config.css.replace(/\}\s/g, "} #" + document_id + " ").replace(/^/, "#" + document_id + " ") + "</style>");
            init()
        } else {
            init()
        }
        var next_page = function() {
            if (!can_page_move(true)) {
                return false
            }
            context.index_panel.move_to_next_page(0, context.features.indexnav.repaint);
            handle_image_preload();
            return false
        };
        var previous_page = function() {
            if (!can_page_move(false)) {
                return false
            }
            context.index_panel.move_to_prev_page(0, context.features.indexnav.repaint);
            handle_image_preload();
            return false
        };
        var next_image = function(deltaX) {
            if (!can_image_move(true) || !context.detail_panel.is_visible()) {
                return false
            }
            context.detail_panel.move_2_next_photo(deltaX, context.features.caption.isVisible());
            return false
        };
        var previous_image = function(deltaX) {
            if (!can_image_move(false) || !context.detail_panel.is_visible()) {
                return false
            }
            context.detail_panel.move_2_previous_photo(deltaX, context.features.caption.isVisible());
            return false
        };
        var set_containers_size_and_position = function(expected_size, skipCaptionPosition) {
            var set_toucharea_height = function(position, size) {
                var halfht = size.detail_panel_height / 2 + parseInt(_(".jbn-right-button").height() / 2);
                var clnk = _(".jb-cap-frame.caption_" + position + " a");
                var cappos = context.config.captionposition.toUpperCase();
                var needReduce = cappos != "BOTTOM" && cappos != "NONE" && cappos != "BELOW_IMAGE" && cappos != "BELOW_THUMBS";
                set_touch_component_size(size.detail_panel_top, size.detail_panel_left, size.detail_panel_width, size.detail_panel_height - (!needReduce || clnk.length <= 0 ? 0 : (halfht > context.config.maxcaptionheight ? context.config.maxcaptionheight : halfht)))
            };
            var pos = context.detail_panel.get_current_photo().position;
            set_toucharea_height(pos, expected_size);
            context.index_panel.set_container_size(expected_size.index_panel_width, expected_size.index_panel_height, expected_size.index_panel_top, expected_size.index_panel_left);
            context.detail_panel.set_container_size(expected_size.detail_panel_width, expected_size.detail_panel_height, expected_size.detail_panel_top, expected_size.detail_panel_left);
            var cpppos = context.config.captionposition.toUpperCase();
            var caphover = !context.utils.is_earlier_ie() && (cpppos != "NONE" && cpppos != "BOTTOM" && cpppos != "BELOW_IMAGE" && cpppos != "BELOW_THUMBS");
            var capHeight = expected_size.caption_panel_height;
            if (!($.browser.msie && $.browser.version <= 8) && (context.utils.is_large_screen_mode(context.config) && (context.features.showthumbsbutton.isThumbsHidden() || caphover) || !context.utils.is_large_screen_mode(context.config))) {
                capHeight = "100%"
            }
            var capTop = expected_size.caption_panel_top;
            if (cpppos === "BELOW_THUMBS") {
                capHeight = "auto"
            }
            if (!skipCaptionPosition) {
                context.features.caption.setAreaStyle({
                    width: expected_size.caption_panel_width,
                    height: capHeight,
                    top: capTop,
                    left: expected_size.caption_panel_left,
                    bottom: expected_size.caption_panel_bottom
                });
                context.features.caption.setMaxHeight(expected_size)
            }
            context.features.toppanel.setAreaStyle({
                width: expected_size.top_panel_width,
                height: expected_size.top_panel_height,
                top: expected_size.top_panel_top,
                left: expected_size.top_panel_left
            })
        };
        var debug_info = function() {
            var win = $(window);
            var getMsg = function(simplify) {
                return "timestamp = " + ((new Date()).valueOf() + "").substring(9) + "<br/>isfullscreen = " + is_full_screen_mode + (simplify ? "" : "<br/>r_h = " + sizing.get_initial_win_size(win.height(), win.width())) + "<br/>current_height = " + current_height + "<br/>current_width = " + current_width + "<br/>scrn.h = " + screen.height + "<br/>scrn.w = " + screen.width + "<br/>win.h = " + $(window).height() + "<br/>win.w = " + $(window).width() + "<br/>window.innerHeight = " + window.innerHeight + "<br/>window.innerWidth = " + window.innerWidth + (simplify ? "" : "<br/>doc.h = " + $(document).height()) + (simplify ? "" : "<br/>bd.h = " + $("body").height()) + (simplify ? "" : "<br/>bd.w = " + $("body").width()) + (simplify ? "" : "<br/>doc.w = " + $(document).width()) + (simplify ? "" : "<br/>bd.w = " + $("body").width()) + (simplify ? "" : "<br/>glry.h = " + _("").height())
            };
            var selMsgArea = ".jb-navigation";
            if (context.utils.is_large_screen_mode(context.config)) {
                selMsgArea = ".jb-classifier-detail-area.jb-navigation"
            }
            _(selMsgArea).html(getMsg(true)).css({
                color: "white",
                "font-size": "20px"
            }).click(function() {
                $(".jb-bb-btn-de-show-list").html(getMsg(true));
                $(".jb-area-large-mode-title, .jb-area-caption").html("");
                return false
            })
        };
        var debug_viewport_info = function() {
            var msg = "timestamp = " + ((new Date()).valueOf() + "").substring(9) + "<br/>viewport=" + $("#jb-viewport").attr("content");
            _(".jb-navigation").html(msg).css({
                color: "white",
                "font-size": "20px"
            }).click(function() {
                window.location.href = window.location.href.replace(/#/g, "") + "?cw=" + current_width + "&ch=" + current_height;
                return false
            });
            $("#jb-debug-message").html(msg).show()
        };
        var debug_info2 = function(v1, v2, v3) {
            _(".jb-navigation").html("timestamp = " + ((new Date()).valueOf() + "").substring(9) + "<br/>v1 = " + v1 + "<br/>v2 = " + v2 + "<br/>v3 = " + v3).css({
                color: "white",
                "font-size": "20px"
            })
        };
        var debug_message = function(msg) {
            _(".jb-navigation").html(msg + " @timestamp=" + ((new Date()).valueOf() + "").substring(9)).css({
                color: "white",
                "font-size": "20px"
            })
        };
        context.utils.init_components(context.features, "api");
        juicebox_instances[context.instance_id].debug = function(script) {
            context.config.debugmode = true;
            eval(script)
        };
        return juicebox_instances[context.instance_id]
    }
}
juicebox_registered_components.api = function() {
    var b, c;
    var d = function(e) {
        b = e;
        c = b._
    };
    var a = function() {
        var f = -1;
        var h = {
            sendMessage: function(i) {
                if (b.config_manager.isp && juicebox_instances[b.instance_id] && typeof(juicebox_instances[b.instance_id].onExpand) === "function") {
                    if (f < 0 || f != i) {
                        juicebox_instances[b.instance_id].onExpand(i)
                    }
                    f = i
                }
            },
            restore: function(i, j) {
                b.features.hashstatus.setExpanded(false);
                b.features.hashstatus.enableHashEvent(true);
                b.setExtendedGlry(null);
                if (b.features.splash.isSet()) {
                    return
                }
                if (typeof(j) != "undefined") {
                    window.setTimeout(function() {
                        b.showOverlayWithSetting(j, 0);
                        b.features.showinfo.showInfoCtrls(j);
                        if (!b.detail_panel.is_visible()) {
                            c(".jb-area-caption").hide()
                        }
                        $('.jb-dt-main-frame[style*="opacity: 0.01"]').fadeIn()
                    }, 500)
                }
                b.features.showthumbsbutton.toggle_index_panel_4_lsm(true, i)
            },
            setGallerySize: function(l, i) {
                if (b.features.fullscreen.switched_2_fullscreen()) {
                    return
                }
                b.sizing().trySetContainerSize(b, l, i);
                var j = parseInt(l) + "px";
                var k = parseInt(i) + "px";
                b.turnOffFullscreen();
                b.config.gallerywidth = j;
                b.config.galleryheight = k;
                c("").height(k);
                b.glryRepaint(true)
            },
            getScreenMode: function() {
                return b.utils.is_large_screen_mode(b.config) ? "LARGE" : "SMALL"
            }
        };
        var e = function(k, j) {
            if (b.features.splash.visible()) {
                return false
            }
            var i = b.index_panel.is_visible();
            if (b.getExtendedGlry()) {
                i = b.getExtendedGlry().isIndexVisible()
            }
            if (b.utils.is_large_screen_mode(b.config) || !i) {
                if (j) {
                    j()
                }
                return false
            }
            var l = b.detail_panel.get_photo_position() + k;
            if (l < 0) {
                if (b.config.enablelooping) {
                    l = b.gallery_manager().length() - 1
                } else {
                    l = 0
                }
            }
            if (l >= b.gallery_manager().length()) {
                if (b.config.enablelooping) {
                    l = 0
                } else {
                    l = b.gallery_manager().length() - 1
                }
            }
            if (b.getExtendedGlry()) {
                b.getExtendedGlry().switch2MainE(l)
            } else {
                b.switch2Main(l, j)
            }
            return true
        };
        var g = b.config_manager.isp ? {
            showGallery: function(i) {
                if (!i) {
                    b.features.audio.stop();
                    b.features.autoplay.stop()
                }
                i ? c("").show() : c("").hide()
            },
            showImage: function(j) {
                if (b.getExtendedGlry()) {
                    b.getExtendedGlry().showImageE(j);
                    return
                }
                var i = b.gallery_manager().length();
                j--;
                if (j < 0 || j >= i) {
                    return
                }
                b.showImage(j)
            },
            showNextImage: function() {
                if (e(1)) {
                    return
                }
                if (b.getExtendedGlry()) {
                    b.getExtendedGlry().showNextImageE();
                    return
                }
                b.nextImage()
            },
            showPreviousImage: function() {
                if (e(-1)) {
                    return
                }
                if (b.getExtendedGlry()) {
                    b.getExtendedGlry().showPreviousImageE();
                    return
                }
                b.previousImage()
            },
            showIndexByImage: function() {
                if (b.getExtendedGlry()) {
                    b.getExtendedGlry().showIndexByImageE();
                    return
                }
                b.redrawIndexPanel()
            },
            toggleAutoPlay: function(i) {
                e(0, function() {
                    if (b.getExtendedGlry()) {
                        b.getExtendedGlry().toggleAutoPlayE(false, i);
                        return
                    }
                    b.features.autoplay.toggleAutoPlay(false, i, true)
                })
            },
            toggleThumbs: function() {
                if (e(0)) {
                    return
                }
                if (b.getExtendedGlry()) {
                    b.getExtendedGlry().toggleThumbsE();
                    return
                }
                b.features.showthumbsbutton.indexButtonClicked(true)
            },
            toggleAudio: function() {
                if (b.getExtendedGlry()) {
                    b.getExtendedGlry().toggleAudioE();
                    return
                }
                b.features.audio.toggleAudioPlay()
            },
            toggleExpand: function() {
                c("").trigger("mouseover");
                if (b.getExtendedGlry()) {
                    b.getExtendedGlry().toggleExpandE();
                    return
                }
                b.features.fullscreen.full_screen()
            },
            toggleOverlay: function() {
                if (b.features.splash.visible()) {
                    return
                }
                b.features.showinfo.toggle_info()
            },
            openImageLink: function() {
                b.features.openurl.open_url()
            },
            showThumbPage: function(i) {
                i--;
                b.index_panel.show_page_by_page_index(i)
            },
            getImageInfo: function(l) {
                l--;
                var i = b.gallery_manager().length();
                if (l < 0 || l >= i) {
                    return null
                }
                var j = b.gallery_manager().get_image(l);
                var k = j.originalImageURL;
                if (!k) {
                    k = j.imageFullURL
                }
                if (!k) {
                    k = j.imageURL
                }
                var m = j.caption;
                if (m == j.title) {
                    m = j.description ? j.description : ""
                }
                return {
                    id: parseInt(j.position) + 1,
                    imageURL: k,
                    largeImageURL: j.largeImageURL,
                    smallImageURL: j.smallImageURL,
                    displayingImageURL: j.imageURL,
                    thumbURL: j.thumbURL,
                    caption: m,
                    title: j.title,
                    linkURL: j.linkURL ? j.linkURL : "",
                    linkTarget: j.linkTarget ? j.linkTarget : "",
                    purchaseURL: j.purchaseURL
                }
            },
            getImageCount: function() {
                return b.gallery_manager().length()
            },
            getThumbPageIndex: function() {
                return parseInt(b.index_panel.get_index()) + 1
            },
            getImageIndex: function() {
                return parseInt(b.detail_panel.get_current_photo().position) + 1
            }
        } : {};
        if (b.config_manager.isp && b.features.fullscreen.getPersistor().parent_gallery) {
            g = {
                showImageE: function(j) {
                    var i = b.gallery_manager().length();
                    j--;
                    if (j < 0 || j >= i) {
                        return
                    }
                    b.showImage(j)
                },
                showNextImageE: b.nextImage,
                showPreviousImageE: b.previousImage,
                showIndexByImageE: b.redrawIndexPanel,
                toggleAutoPlayE: b.features.autoplay.toggleAutoPlay,
                toggleThumbsE: b.features.showthumbsbutton.indexButtonClicked,
                toggleAudioE: b.features.audio.toggleAudioPlay,
                toggleExpandE: b.features.fullscreen.full_screen,
                switch2MainE: b.switch2Main,
                isIndexVisible: b.index_panel.is_visible
            }
        }
        juicebox_instances[b.instance_id] = juicebox_lib.jQuery.extend(h, g)
    };
    return {
        setContext: d,
        init: a
    }
};
juicebox_registered_components.touchevent = function() {
    var q, E;
    var f = juicebox_lib.jQuery;
    var k = false,
        o = false,
        C = 0,
        r, d, w, p, c, u;
    var v = function(F) {
        q = F;
        E = q._
    };
    var e = function() {
        g()
    };
    var t = function() {};
    var i = function() {
        return {
            x: w,
            y: u
        }
    };
    var z = function() {
        k = false;
        o = false;
        if (C) {
            window.clearTimeout(C);
            C = 0
        }
    };
    var y = function() {
        return k
    };
    var j = function() {
        return o
    };
    var B = function(F) {
        return k = F
    };
    var h = function(F) {
        return o = F
    };
    var n = function(F) {
        if (E(".jb-area-caption").is(":visible")) {
            E(".jb-area-caption").addClass("jb-status-cap-hide-4-move").fadeOut(F)
        }
    };
    var m = function(F) {
        E(".jb-area-caption.jb-status-cap-hide-4-move").removeClass("jb-status-cap-hide-4-move").fadeIn(F)
    };
    var a = function(F) {
        if (q.config.imagenavposition.toUpperCase() != "IMAGE") {
            return
        }
        E(".jb-classifier-detail-area .jbn-nav-button div").fadeOut(F)
    };
    var b = function() {
        if (q.config.imagenavposition.toUpperCase() != "IMAGE") {
            return
        }
        q.features.imagenav.repaint(0, q.getMouseHoverPosition())
    };
    var A = function(F) {
        if (q.config.buttonbarposition.toUpperCase() != "OVERLAY_IMAGE") {
            return
        }
        E(".jb-classifier-link-wrapper.jb-classifier-detail-area, .jb-classifier-link-wrapper.jb-classifier-detail-area .jb-bb-bar").fadeOut(F)
    };
    var D = function(F) {
        if (q.config.buttonbarposition.toUpperCase() != "OVERLAY_IMAGE") {
            return
        }
        if (q.utils.is_buttonbarposition_default(q.config) && !q.isOverlayVisible()) {
            return
        }
        if (!q.detail_panel.is_visible()) {
            return
        }
        if (!F) {
            F = 0
        }
        E(".jb-classifier-link-wrapper.jb-classifier-detail-area, .jb-classifier-link-wrapper.jb-classifier-detail-area .jb-bb-bar").fadeIn(F)
    };
    var x = function() {
        if (q.config.imagenavposition.toUpperCase() != "STAGE") {
            window.setTimeout(function() {
                b()
            }, 500 * q.config.imagetransitiontime)
        }
    };
    var s = function(G, F) {
        q.detail_panel.move_back(G);
        x();
        if (q.utils.is_buttonbarposition_default(q.config) || q.config.buttonbarposition.toUpperCase() == "OVERLAY_IMAGE") {
            window.setTimeout(function() {
                D()
            }, 500 * q.config.imagetransitiontime)
        }
        window.setTimeout(function() {
            m()
        }, 500 * q.config.imagetransitiontime);
        if (F) {
            window.setTimeout(function() {
                F()
            }, 1000 * q.config.imagetransitiontime + 100)
        }
    };
    var l = function() {
        q.setOverlay(!q.isOverlayVisible(), 250)
    };
    var g = function() {
        if ((f.browser.msie || q.utils.is_ie_after_11()) && !q.utils.is_ie_touch()) {
            return
        }
        if (q.utils.is_mobile_ie()) {
            f(".jb-navigation.jb-classifier-detail-area .jbn-nav-touch-area").hide()
        }
        var H = function(U, V) {
            if (q.utils.is_touchable_desktop()) {
                window.setTimeout(function() {
                    k = false;
                    w = 0;
                    u = 0
                }, 150)
            } else {
                k = false;
                w = 0;
                u = 0
            }
            o = true;
            var S = parseInt(1000 * q.config.imagetransitiontime * (q.glryWidth() - w) / q.glryWidth());
            if (V > 10) {
                q.features.autoplay.stop();
                if (!q.canImageMove(false)) {
                    s(V, function() {
                        q.glryRepaint(true, false, true, true)
                    })
                } else {
                    q.detail_panel.move_2_previous_photo(Math.abs(V), ((q.config.captionposition.toUpperCase() === "BELOW_THUMBS" && !q.index_panel.is_visible()) ? false : q.isOverlayVisible()))
                }
                U.preventDefault()
            } else {
                if (V < -10) {
                    q.features.autoplay.stop();
                    if (!q.canImageMove(true)) {
                        s(V)
                    } else {
                        q.detail_panel.move_2_next_photo(Math.abs(V), ((q.config.captionposition.toUpperCase() === "BELOW_THUMBS" && !q.index_panel.is_visible()) ? false : q.isOverlayVisible()))
                    }
                    U.preventDefault()
                } else {
                    var T = q.config.imageclickmode.toUpperCase();
                    if (T === "OPEN_URL") {
                        q.features.openurl.open_url();
                        C = 0;
                        o = false;
                        b();
                        D();
                        m();
                        return
                    }
                    if (!q.config.showinfobutton) {
                        q.detail_panel.move_back(w);
                        var R = q.config.showimageoverlay.toUpperCase();
                        if (R === "AUTO") {
                            l()
                        } else {
                            if (R === "ALWAYS") {
                                q.setOverlay(true, 250)
                            }
                        }
                        if (q.config.captionposition.toUpperCase() === "BELOW_IMAGE") {
                            E(".jb-area-caption").fadeIn()
                        }
                        x()
                    } else {
                        s(V);
                        C = 0;
                        o = false;
                        return
                    }
                }
            }
            q.index_panel.yield_4_transition(S);
            if (q.utils.is_large_screen_mode(q.config)) {
                C = window.setTimeout(function() {
                    C = 0;
                    o = false
                }, S)
            } else {
                o = false
            }
        };
        var G = function(R) {
            if (R.pointerType && R.pointerType != "touch") {
                return
            }
            if (q.features.fullscreen.switched_2_fullscreen() || q.utils.is_mobile_ie_after_11()) {
                R.preventDefault()
            }
            if (k) {
                return
            }
            if (o) {
                o = false
            }
            w = 0;
            u = 0;
            if (!k) {
                k = true;
                if (q.utils.is_touchable_desktop()) {
                    var S = q.utils.getMsPointerXy(R);
                    r = S.x;
                    p = S.y
                } else {
                    r = R.originalEvent.touches[0].pageX;
                    p = R.originalEvent.touches[0].pageY
                }
                d = r;
                c = p;
                a(0);
                A(0)
            }
        };
        var O = 0;
        var M = function(S) {
            if (S.pointerType && S.pointerType != "touch") {
                return
            }
            var R = 0;
            var V = 0;
            if (q.features.fullscreen.switched_2_fullscreen() || q.isFullScreenMode() || Math.abs(R - r) > Math.abs(V - p)) {
                S.preventDefault()
            }
            if (q.utils.is_touchable_desktop()) {
                var T = q.utils.getMsPointerXy(S);
                R = T.x;
                V = T.y
            } else {
                R = S.originalEvent.touches[0].pageX;
                V = S.originalEvent.touches[0].pageY
            }
            if (o) {
                return
            }
            if (!k) {
                return
            }
            n(0);
            w = R - r;
            u = V - p;
            if (Math.abs(w) > 10) {
                q.features.autoplay.stop()
            }
            var U = E(" .jb-panel-detail .jb-dt-main-frame");
            q.utils.clean_up_transition(U);
            U.animate({
                left: "+=" + (R - d),
                avoidTransforms: !q.config.use_webkit_transform,
                useTranslate3d: q.config.use_3d_transform
            }, 0);
            d = R;
            c = V;
            if (q.utils.is_android()) {
                if (O) {
                    window.clearTimeout(O)
                }
                O = window.setTimeout(function() {
                    O = 0;
                    P(S)
                }, 1000)
            }
        };
        var P = function(S) {
            if (S.pointerType && S.pointerType != "touch") {
                return
            }
            if (q.config.autofullscreenexpand) {
                q.utils.show_real_fullscreen(q.config.containerid)
            }
            if (O) {
                window.clearTimeout(O);
                O = 0
            }
            var R = Math.abs(w) > Math.abs(u);
            if (q.features.fullscreen.switched_2_fullscreen() || q.isFullScreenMode() || R || q.utils.is_mobile_ie_after_11()) {
                S.preventDefault()
            }
            if (o || !k) {
                w = 0;
                u = 0;
                k = false;
                return
            }
            if (R) {
                H(S, w)
            } else {
                if (Math.abs(u) > 10) {
                    s(w);
                    if (!q.isFullScreenMode() && !q.features.fullscreen.switched_2_fullscreen()) {
                        window.scrollBy(0, -1 * u)
                    }
                    k = false
                } else {
                    H(S, 0)
                }
            }
        };
        if (q.utils.is_ie_after_11()) {
            var K = "ms";
            if (window.navigator.pointerEnabled) {
                K = ""
            }
            var N = document.getElementsByClassName("jb-navigation jb-classifier-detail-area");
            for (var I = 0; I < N.length; I++) {
                var Q = N[I];
                Q.addEventListener(K + "pointerdown", G, false);
                Q.addEventListener(K + "pointermove", M, false);
                Q.addEventListener(K + "pointerout", P, false)
            }
        } else {
            if (q.utils.is_touchable_desktop() || q.utils.is_mobile_ie_10()) {
                var F = document.getElementsByClassName("jb-navigation jb-classifier-detail-area");
                for (var J = 0; J < F.length; J++) {
                    var L = F[J];
                    L.addEventListener("touchstart", G, false);
                    L.addEventListener("touchmove", M, false);
                    L.addEventListener("touchend", P, false);
                    L.addEventListener("gesturestart", G, false);
                    L.addEventListener("gesturechange", M, false);
                    L.addEventListener("gestureend", P, false)
                }
            } else {
                if (!f.browser.msie && !document.msFullscreenEnabled) {
                    E(".jb-navigation.jb-classifier-detail-area").bind("touchstart", G).bind("touchmove", M).bind("touchend", P)
                }
            }
        }
        if (q.config.forcetouchmode && !q.utils.is_touchable_desktop()) {
            E(".jb-classifier-detail-area .jbn-left-button, .jb-classifier-detail-area .jbn-right-button").mouseup(function(R) {
                R.preventDefault();
                k = false
            }).mousedown(function(R) {
                R.preventDefault()
            }).mousemove(function(R) {
                R.preventDefault()
            });
            E(".jb-navigation.jb-classifier-detail-area").mousedown(function(S) {
                if (S.which !== 1) {
                    return
                }
                var R = {
                    originalEvent: {
                        touches: [{}]
                    }
                };
                S.preventDefault();
                R.preventDefault = function() {};
                R.originalEvent.touches[0].pageX = S.screenX;
                R.originalEvent.touches[0].pageY = S.screenY;
                G(R)
            }).mousemove(function(S) {
                if (S.which !== 1) {
                    k = false;
                    return
                }
                if (!k) {
                    return
                }
                var R = {
                    originalEvent: {
                        touches: [{}]
                    }
                };
                R.preventDefault = function() {};
                R.originalEvent.touches[0].pageX = S.screenX;
                R.originalEvent.touches[0].pageY = S.screenY;
                M(R)
            }).mouseup(function() {
                if (!k) {
                    return
                }
                var R = {};
                R.preventDefault = function() {};
                P(R)
            }).mouseout(function() {
                if (!k) {
                    return
                }
                var R = {};
                R.preventDefault = function() {};
                P(R)
            })
        }
    };
    return {
        setContext: v,
        setEvent: e,
        init: t,
        isInNavigation: y,
        isInTransitioning: j,
        resetFlags: z,
        setNavigation: B,
        setTransitioning: h,
        getDelta: i
    }
};
juicebox_registered_components.caption = function() {
    var b, l;
    var k = function(m) {
        b = m;
        l = b._
    };
    var h = function() {
        var o = b.config.captionposition.toUpperCase();
        if (o === "NONE") {
            return ""
        }
        var m;
        if (o === "BELOW_IMAGE" || o === "BOTTOM" || o === "BELOW_THUMBS") {
            m = "jb-flag-size-fixed"
        } else {
            m = "jb-classifier-show-on-over"
        }
        var n = b.config.thumbsposition.toUpperCase();
        http: var p = ((o === "BOTTOM" || o === "BELOW_THUMBS") && (n != "LEFT" && n != "RIGHT")) ? 400 : 200;
        return "<div class='jb-area-caption jb-classifier-layer " + m + "' data-layer='200' style='display:none; position:absolute !important;overflow:hidden; bottom: 0; z-index:" + p + "; max-height:" + b.config.maxcaptionheight + "px;" + (b.config.galleryfontface ? "font-family:" + b.config.galleryfontface + ";" : "") + "'></div>"
    };
    var e = function() {
        return l(".jb-area-caption")
    };
    var a = function(m) {
        l(".jb-area-caption").css(m)
    };
    var c = function(m) {
        m.html(h());
        return true
    };
    var i = function() {};
    var j = function() {};
    var f = function(n) {
        if (!g()) {
            return
        }
        var m = l(".jb-area-caption");
        if (n) {
            m.fadeIn(n)
        } else {
            m.show()
        }
    };
    var g = function(m) {
        var n = b.config.captionposition.toUpperCase();
        if (n === "NONE") {
            return false
        }
        if (b.config.captionposition.toUpperCase() === "BELOW_THUMBS" && !b.index_panel.is_visible()) {
            return false
        }
        if (n === "BELOW_IMAGE" || n === "BOTTOM" || n === "BELOW_THUMBS") {
            return true
        }
        return b.syncOverlayVisibility(m)
    };
    var d = function(p) {
        var m = ",BOTTOM,NONE,BELOW_IMAGE,BELOW_THUMBS,";
        var n = "," + b.config.captionposition.toUpperCase() + ",";
        if (!p || (!p.detail_panel_top && !p.detail_panel_height)) {
            return
        }
        var o = (b.config.maxcaptionheight > p.detail_panel_height && m.indexOf(n) < 0) ? p.detail_panel_height : b.config.maxcaptionheight;
        if (o <= 0) {
            o = 0
        }
        a({
            "max-height": o
        })
    };
    return {
        setContext: k,
        getHtml: h,
        draw: c,
        setEvent: i,
        init: j,
        repaint: f,
        isVisible: g,
        setAreaStyle: a,
        getArea: e,
        setMaxHeight: d
    }
};
juicebox_registered_components.splash = function() {
    var a, q, e, k, i = false,
        f = false;
    var o = function(r) {
        a = r;
        q = a._
    };
    var h = function() {
        if (!k) {
            k = (a.config.splashimageurl ? a.correctPath(a.config.splashimageurl) : a.gallery_manager().get_image(0).imageURL)
        }
        var s = a.config.galleryfontface ? "font-family:" + a.config.galleryfontface + ";" : "";
        var r = "style='display:none;position:absolute;left:0;top:0;width:" + a.glryWidth() + "px;height:" + a.glryHeight() + "px;" + s + "'";
        return "<table><tr><td class='jb-splash-holder'><img src='" + k + "' " + r + "/>                     <div class='jb-splash-background' " + r + "></div>                     <div class='jb-splash'>                     <div class='jb-splash-info jb-layer' data-layer='100' style='z-index:100;'>                         <h3 style='" + s + "'>" + (a.config.splashtitle ? a.config.splashtitle : a.config.gallerytitle) + "</h3>                         " + (a.config.splashshowimagecount ? "<p class='jb-splash-cnt' style='" + s + "'>" + a.gallery_manager().length() + " " + a.config.languagelistall.splimgs + "</p>" : "") + b(s) + "<a class='jb-splash-view-glry' href='#' style='" + s + "'>" + a.config.splashbuttontext + "</a>                     </div>                 </div></td></tr></table>"
    };
    var b = function(r) {
        if (!a.config.gallerydescription) {
            return ""
        }
        return "<p class='jb-splash-desc' style='" + r + "'>" + a.config.gallerydescription + "</p>"
    };
    var p = function(r) {
        if (!r.playaudioonload) {
            return false
        }
        if (!f) {
            return false
        }
        return true
    };
    var l = function() {
        return f
    };
    var n = function(r) {
        i = true;
        f = true;
        e = r;
        r.html(h());
        d();
        a.features.audio.init(true);
        if (a.config.autoplayonload) {
            a.features.autoplay.set_autoplay_flag(1)
        }
        a.setOverlayFlag(a.config.showoverlayonload);
        a.features.showinfo.showInfoCtrls(a.config.showoverlayonload);
        if (a.config.firstimageindex > 0 && a.config.firstimageindex <= a.gallery_manager().length()) {
            a.detail_panel.set_photo_position(a.config.firstimageindex - 1)
        }
        q(".jb-splash-view-glry, .jb-splash, .jb-splash-background").click(function() {
            i = false;
            a.features.fullscreen.full_screen();
            return false
        })
    };
    var c = function() {
        return i
    };
    var j = function() {};
    var d = function() {
        var s = a.sizing();
        var t = s.get_gallery_width(a.config, false);
        var r = s.get_gallery_height(a.config, false);
        a.sizing().position_2_fill_image(t, r, k, function(u) {
            q(".jb-splash-holder img").css({
                top: u.imageTop,
                left: u.imageLeft,
                width: u.imageWidth,
                height: u.imageHeight
            }).show();
            q(".jb-splash-background").height(r);
            a.sizing().trySetContainerSize(a, 0, r)
        }, true);
        if (a.utils.is_iphone() && (a.features.fullscreen.switched_2_fullscreen() || a.isFullScreenMode())) {
            window.scrollTo(0, 1)
        }
    };
    var g = function() {
        if (a.features.fullscreen.switched_2_fullscreen() || a.utils.is_new_expanded_window()) {
            return false
        }
        return m()
    };
    var m = function() {
        var r = a.config.showsplashpage.toUpperCase();
        if (r === "NEVER") {
            return false
        } else {
            if (r === "ALWAYS") {
                return true
            } else {
                if (!a.utils.is_large_screen_mode(a.config) && !a.isFullScreenMode()) {
                    return true
                }
            }
        }
        return false
    };
    return {
        setContext: o,
        getHtml: h,
        draw: n,
        setEvent: j,
        repaint: d,
        isNeeded: g,
        isSet: m,
        visible: c,
        need2PlayAudioAfterSplash: p,
        opendFromSplash: l
    }
};
juicebox_registered_components.hashstatus = function() {
    var k = "expanded";
    var i, s, j = false;
    var d = juicebox_lib.jQuery;
    var n = function(t) {
        i = t;
        s = i._
    };
    var c = function() {};
    var m = function() {
        if (!i.features.fullscreen.switched_2_fullscreen() && i.instance_id > 0) {
            k = "expand" + (i.instance_id + 1)
        }
    };
    var r = function() {
        return k
    };
    var p = function(v) {
        if (i.utils.need_new_window(i.config)) {
            return
        }
        d(window).unbind("hashchange");
        if (q) {
            window.clearTimeout(q)
        }
        q = window.setTimeout(function() {
            q = 0;
            o()
        }, 100);
        var w = window.location.href.split("#");
        if (!v) {
            if (w.length <= 1) {
                return
            }
            var u = w[1].replace(k, "").replace(/expand\d+/g, "");
            if (u == w[1]) {
                return
            }
            window.location.href = w[0] + "#" + u;
            return
        } else {
            if (w.length == 1) {
                window.location.href = w[0] + "#" + k;
                return
            }
            var t = w[1].replace("expanded", "").replace(k, "").replace(/expand\d+/g, "") + k;
            if (t == w[1]) {
                return
            }
            window.location.href = w[0] + "#" + t;
            return
        }
    };
    var h = false;
    var q = 0;
    var g = function(t) {
        h = true;
        var w = window.location.href.split("#");
        var u = "";
        if (w.length == 2 && w[1].indexOf(k) > -1) {
            u = k
        }
        var v = i.gallery_manager().get_image(t).original_position;
        return w[0] + "#" + (parseInt(v) + 1) + u
    };
    var l = function(t) {
        if (!i.config.enabledirectlinks) {
            return
        }
        var v = window.location.href.split("#");
        var u = i.gallery_manager().get_image(t).original_position;
        if (v.length >= 2 && u === parseInt(v[1]) - 1) {
            return
        }
        d(window).unbind("hashchange");
        window.location.href = g(t);
        if (q) {
            window.clearTimeout(q)
        }
        q = window.setTimeout(function() {
            q = 0;
            o()
        }, 100)
    };
    var f = 0;
    var a;
    var o = function(t) {
        if (t) {
            a = t
        }
        if (d.browser.msie && d.browser.version < 8) {
            if (f) {
                window.clearInterval(f)
            }
            f = 0;
            if (!a) {
                return
            }
            f = window.setInterval(function() {
                if (j || !a) {
                    return
                }
                a()
            }, 800)
        } else {
            d(window).bind("hashchange", function() {
                if (j || !a) {
                    return
                }
                a()
            })
        }
    };
    var b = function(t) {
        j = !t
    };
    var e = function() {
        var t = window.location.href.split("#");
        var u = (t.length >= 2) ? parseInt(t[1]) - 1 : -1;
        u = i.gallery_manager().get_current_position(u);
        if (u >= 0 && u < i.gallery_manager().length()) {} else {
            u = -1
        }
        return {
            hasExpHash: t.length == 2 && t[1].indexOf(k) >= 0,
            directPicIdx: u,
            hasSet: h,
            hasExpHashPrefix: t.length == 2 && t[1].indexOf("expand") >= 0
        }
    };
    return {
        setContext: n,
        setEvent: c,
        init: m,
        setExpanded: p,
        getUrlWithImageHash: g,
        setImageHash: l,
        setHashChangedEvent: o,
        getHashStatus: e,
        enableHashEvent: b,
        getExpendedHash: r
    }
};
juicebox_registered_components.backgroundimage = function() {
    var a, k;
    var j = function(n) {
        a = n;
        k = a._
    };
    var l = 0;
    var m = 0;
    var f = function() {
        var o = a.correctPath(a.config.backgroundurl);
        k(".jb-panel-background").remove();
        if (!o) {
            return ""
        }
        if (a.features.fullscreen.switched_2_fullscreen()) {
            l = a.features.fullscreen.getPersistor().parent_gallery_param.background_image_width;
            m = a.features.fullscreen.getPersistor().parent_gallery_param.background_image_height;
            var n = i(true);
            var q = "";
            if (typeof(n) != "undefined" && n) {
                if (typeof(n.imageTop) != "undefined") {
                    q += "top:" + n.imageTop + "px;"
                }
                if (typeof(n.imageLeft) != "undefined") {
                    q += "left:" + n.imageLeft + "px;"
                }
                if (n.imageWidth) {
                    q += "width:" + n.imageWidth + "px;"
                }
                if (n.imageHeight) {
                    q += "height:" + n.imageHeight + "px;"
                }
            }
            return "<img class='jb-panel-background' src='" + o + "' style='position:absolute;" + q + "'/>"
        } else {
            var p = new Image();
            p.onload = function() {
                l = p.width;
                m = p.height;
                i();
                k(".jb-panel-background").attr("src", o).show()
            };
            p.src = o;
            return "<img class='jb-panel-background' style='display:none;position:absolute;'/>"
        }
    };
    var b = function(n) {
        n.html(f());
        return true
    };
    var g = function() {
        k(".jb-bb-btn-de-show-list").click(d)
    };
    var d = function() {
        return false
    };
    var h = function() {};
    var i = function(o) {
        if (!a.config.backgroundurl) {
            return null
        }
        if (!l || !m) {
            return null
        }
        var n = {};
        var r = a.config.backgroundscale.toUpperCase();
        var q = k(".jb-panel-background");
        var p = a.glryHeight();
        var s = a.glryWidth();
        if (o) {
            if (a.config.usefullscreenexpand && a.utils.support_real_fullscreen && screen.height && screen.width) {
                p = parseInt(screen.height);
                s = parseInt(screen.width)
            } else {
                p = $(window).height();
                s = $(window).width()
            }
        }
        if (r === "FILL") {
            n = a.sizing().get_image_display_size({
                width: l,
                height: m
            }, s, p, a.config, "FILL", true);
            q.css({
                top: n.unadjtop,
                left: n.unadjleft,
                width: n.width,
                height: n.height
            })
        } else {
            if (r === "NONE") {} else {
                q.css({
                    width: s,
                    height: p
                });
                n = {
                    imageTop: 0,
                    imageLeft: 0,
                    imageWidth: s,
                    imageHeight: p
                }
            }
        }
        return n
    };
    var c = function() {
        i()
    };
    var e = function() {
        return {
            width: l,
            height: m
        }
    };
    return {
        setContext: j,
        getHtml: f,
        draw: b,
        setEvent: g,
        init: h,
        repaint: c,
        getSizingInfo: e
    }
};
juicebox_registered_components.grytitle = function() {
    var a, j;
    var h = function(l) {
        a = l;
        j = a._
    };
    var f = function(l) {
        return l ? "jb-idx-title" : "jb-area-large-mode-title"
    };
    var d = function(m) {
        if (!a.config.gallerytitle) {
            return ""
        }
        var o = a.config.gallerytitleposition.toUpperCase();
        if (o === "NONE") {
            return ""
        }
        var n = a.utils.is_large_screen_mode(a.config);
        if (n && m) {
            return ""
        }
        var p;
        var l = f(m);
        if (o != "TOP" && !m) {
            l += " jb-classifier-show-on-over"
        }
        if (n || a.config.gallerytitle.indexOf("<") > -1) {
            p = a.config.gallerytitle
        } else {
            p = '<textarea rows="1" class="jb-idx-ssm-title-wrapper" readonly="true" style="background:transparent;border:none;overflow:hidden;resize: none;">' + a.config.gallerytitle + "</textarea>"
        }
        if (a.config.gallerytitleposition.toUpperCase() != "ABOVE_THUMBS") {
            return "<div class='" + l + "' style='position: absolute;display:none;'>" + p + "</div>"
        }
        return "<div class='" + l + "jb-classifier-layer' data-layer='600' style='position:absolute;display:none;z-index:600'>" + p + "</div>"
    };
    var b = function(l) {
        l.html(d());
        return true
    };
    var e = function() {};
    var g = function() {};
    var c = function(l) {
        k(l);
        if (a.config.galleryfontface) {
            a._("." + f(true) + ", ." + f()).css("font-family", a.config.galleryfontface)
        }
    };
    var k = function(l) {
        var q = j(".jb-area-large-mode-title");
        var o;
        if (a.utils.is_large_screen_mode(a.config)) {
            a.index_panel.display_gallery_top(false);
            if (a.config.gallerytitle) {
                var n = a.config.showimageoverlay.toUpperCase();
                var p = a.config.gallerytitleposition.toUpperCase();
                if (a.config.textcolor) {
                    q.css({
                        color: a.utils.format_color(a.config.textcolor)
                    })
                }
                if (a.config.textshadowcolor) {
                    q.css({
                        "text-shadow": a.utils.get_text_shadow_style(a.config.textshadowcolor, a.config.textshadowcolora, true)
                    })
                }
                if (p == "TOP") {
                    o = q.html(a.config.gallerytitle)
                } else {
                    if (p === "ABOVE_THUMBS") {
                        if (a.index_panel.is_visible()) {
                            o = q.html(a.config.gallerytitle).css({
                                height: "auto",
                                overflow: "visible",
                                "white-space": "normal"
                            }).removeClass("jb-classifier-show-on-over")
                        } else {
                            q.hide()
                        }
                    } else {
                        var m = j(".jb-area-large-mode-title.jb-classifier-show-on-over");
                        if (a.config.showinfobutton && !a.features.showinfo.visible()) {
                            o = null
                        } else {
                            if (a.isOverlayVisible() || n === "ALWAYS") {
                                o = m.html(a.config.gallerytitle)
                            } else {
                                if (n === "NEVER") {
                                    m.html(a.config.gallerytitle).hide()
                                }
                            }
                        }
                    }
                }
                if (o) {
                    if (l) {
                        a.utils.fade_in(a.config, o, l, false, null, "title")
                    } else {
                        o.show()
                    }
                }
            }
        } else {
            q.remove();
            if (a.index_panel.is_visible()) {
                a.index_panel.display_gallery_top(a.index_panel.is_visible())
            }
        }
    };
    var i = function(G) {
        var p = a.config.gallerytitleposition.toUpperCase();
        var H = a.glryStagPadding();
        var C = 10 + H;
        var n = 10;
        var K = G ? G : a.glrySizePosition();
        var t = C;
        var J = t,
            L = t;
        var F = a.config.gallerytitlehalign.toUpperCase();
        var l = true;
        var w = 0;
        if (F === "RIGHT") {
            l = false
        }
        w = n + K.detail_panel_top;
        if (p === "TOP") {
            w = n + 1 + K.top_panel_top
        } else {
            if (p === "ABOVE_THUMBS") {
                var m = a.index_panel.get_show_area_position();
                var I = parseInt(a._(".jb-area-large-mode-title").css("font-size"));
                if (K.is_sideway_layout) {
                    w = parseInt(m.top - I - a.config.thumbpadding)
                } else {
                    w = parseInt(K.index_panel_top - a.sizing().constTitleHeight4AboveThumbs + m.top)
                }
                if (w < 0) {
                    w = 0
                }
                if (F === "CENTER") {
                    J = K.index_panel_left + a.config.thumbhseparation - a.config.thumbpadding + (K.index_panel_width - j(".jb-area-large-mode-title").width()) / 2;
                    L = "auto"
                } else {
                    if (F === "RIGHT") {
                        L = a.glryWidth() - K.index_panel_left - m.left - m.width;
                        J = "auto"
                    } else {
                        J = m.left + K.index_panel_left;
                        L = "auto"
                    }
                }
            }
        }
        var v = "auto";
        var q = a.config.buttonbarposition.toUpperCase();
        var z = ((q === "OVERLAY" && p === "OVERLAY") || (q === "TOP" && p === "TOP")) ? true : false;
        var E = a.utils.is_large_screen_mode(a.config);
        if (E && z) {
            var o = a.config.buttonbarhalign.toUpperCase();
            var B = parseInt(j(".jb-bb-bar").parent().width());
            var y = a._(".jb-area-large-mode-title").width();
            var A = a.glryWidth() - 2 * a.config.stagepadding - B - 30;
            var s = y > A - 50;
            if (s) {
                if ((o === "LEFT" && F === "RIGHT") || (o === "RIGHT" && F === "LEFT")) {
                    v = A;
                    if (v < 250) {
                        v = 250
                    }
                }
            }
        }
        var u = a.config.thumbsposition.toUpperCase();
        var x = p === "ABOVE_THUMBS" && (u === "LEFT" || u === "RIGHT") ? true : false;
        var D = j(".jb-area-large-mode-title a").length > 0 ? 600 : 200;
        var r;
        if (F === "CENTER") {
            if (x) {
                if (p != "ABOVE_THUMBS") {
                    J = H - parseInt(j(".jb-area-large-mode-title").css("padding-left"));
                    L = H + (u === "RIGHT" ? 0 : K.detail_panle_left)
                } else {
                    if (p === "ABOVE_THUMBS") {}
                }
            }
            if (a.index_panel.is_visible()) {
                r = {
                    left: J,
                    top: w,
                    right: L,
                    height: "auto",
                    "text-align": "center",
                    overflow: "visible",
                    "white-space": "normal",
                    "z-index": D
                }
            } else {
                r = {
                    left: J,
                    top: w,
                    right: L,
                    height: "auto",
                    "text-align": "center",
                    overflow: "hidden",
                    "white-space": "nowrap",
                    "z-index": D
                }
            }
        } else {
            if (l) {
                if (x) {
                    if (u === "RIGHT") {
                        if (p != "ABOVE_THUMBS") {
                            J = K.index_panel_left
                        }
                    }
                }
                if (a.index_panel.is_visible()) {
                    r = {
                        left: J,
                        right: "auto",
                        height: "auto",
                        width: v,
                        top: w,
                        "text-align": "left",
                        overflow: "visible",
                        "white-space": "normal",
                        "z-index": D
                    }
                } else {
                    r = {
                        left: J,
                        right: "auto",
                        height: "auto",
                        width: v,
                        top: w,
                        "text-align": "left",
                        overflow: "hidden",
                        "white-space": "nowrap",
                        "z-index": D
                    }
                }
            } else {
                if (x && p != "ABOVE_THUMBS") {
                    if (u === "LEFT") {
                        L += (current_width - K.detail_panel_left)
                    } else {
                        L -= 10
                    }
                }
                if (a.index_panel.is_visible()) {
                    r = {
                        left: "auto",
                        right: L,
                        top: w,
                        height: "auto",
                        width: v,
                        "text-align": "right",
                        overflow: "visible",
                        "white-space": "normal",
                        "z-index": D
                    }
                } else {
                    r = {
                        left: "auto",
                        right: L,
                        top: w,
                        height: "auto",
                        width: v,
                        "text-align": "right",
                        overflow: "hidden",
                        "white-space": "nowrap",
                        "z-index": D
                    }
                }
            }
        }
        a._(".jb-area-large-mode-title").css(r)
    };
    return {
        setContext: h,
        getHtml: d,
        draw: b,
        setEvent: e,
        init: g,
        repaint: c,
        setPosition: i
    }
};
juicebox_registered_components.toppanel = function(d) {
    var b = d;
    var k = function(l) {
        b = l
    };
    var h = function() {
        if (!g()) {
            return ""
        }
        return "<div class='jb-panel-top' style='position:absolute;background-color:" + b.utils.format_color(b.config.topbackcolor) + (b.utils.is_earlier_ie() ? ";" + b.config.topbackopacity + ";" : "") + "'> </div>"
    };
    var c = function(l) {
        l.html(h());
        return true
    };
    var a = function(l) {
        b._(".jb-panel-top").css(l)
    };
    var i = function() {
        b._(".jb-bb-btn-de-show-list").click(f)
    };
    var f = function() {
        return false
    };
    var j = function() {};
    var e = function() {};
    var g = function() {
        if (!b.utils.is_large_screen_mode(b.config)) {
            return false
        }
        var l = b.config.backbuttonposition.toUpperCase();
        if (b.config.gallerytitleposition.toUpperCase() === "TOP" || b.config.buttonbarposition.toUpperCase() === "TOP" || l === "TOP") {
            return true
        }
        return false
    };
    return {
        setContext: k,
        getHtml: h,
        draw: c,
        setEvent: i,
        init: j,
        repaint: e,
        isNeeded: g,
        setAreaStyle: a
    }
};
juicebox_registered_components.backbutton = function() {
    var a, n;
    var e = juicebox_lib.jQuery;
    var k = function(o) {
        a = o;
        n = a._
    };
    var m = function() {
        if (a.config.backbuttonposition.toUpperCase() === "TOP") {
            return 6
        }
        return 10
    };
    var g = function() {
        if (!f()) {
            return ""
        }
        var o = a.config.backbuttonposition.toUpperCase();
        var p = "";
        if (o === "OVERLAY") {
            p = " jb-classifier-show-on-over"
        }
        if (a.config.showsmallbackbutton) {
            p += " jb-classifier-detail-area"
        }
        if (a.config.backbuttonuseicon) {
            p += " jb-go-back-icon-frame"
        }
        return "<div class='jb-go-back jb-classifier-layer" + p + "' data-layer='600' style='position:absolute !important;z-index:600; top: " + m() + "px; left: 10px; display:none;" + (f() && a.config.backbuttonuseicon ? a.utils.get_button_bar_style(a.config, true) : "") + "'>" + h() + "</div>"
    };
    var b = function(o) {
        o.html(g());
        return true
    };
    var i = function() {
        n(".jb-bb-btn-de-show-list").click(d)
    };
    var d = function() {
        return false
    };
    var j = function() {};
    var c = function(o) {
        if (!f()) {
            return
        }
        a.utils.fade_in(a.config, n(".jb-go-back"), o, false, null, "backbtn")
    };
    var f = function() {
        if (a.config.showsmallbackbutton) {
            return true
        }
        var o = a.config.backbuttonposition.toUpperCase();
        if (o === "TOP" || o === "OVERLAY") {
            return true
        }
        return false
    };
    var h = function() {
        if (!a.features.backbutton.isNeeded()) {
            return ""
        }
        var s;
        var q = a.config.backbuttonuseicon ? "jb-go-back-icon" : "jb-go-back-text";
        var r = (a.config.backbuttonuseicon && e.browser.msie && e.browser.version < 9) ? "&#xe014;" : (a.config.backbuttonuseicon ? "" : a.config.backbuttontext);
        var o = a.config.backbuttonuseicon ? " title='" + a.config.languagelistall.gobk + "'" : "";
        var p = (e.browser.msie && e.browser.version < 8) ? "padding-top:" + parseInt(a.utils.get_button_bar_button_size(a.config).buttonWidth / 4) + "px;" : "";
        if (a.config.backbuttonurl) {
            s = "<a href='" + a.config.backbuttonurl + "'" + (a.config.showsmallbackbutton ? " class='jb-classifier-show-on-over " + q + "'" : "class='" + q + "'") + " style='" + p + (a.config.backbuttonuseicon ? a.utils.get_button_bar_icon_style(a.config, true) : "") + "'" + o + ">" + r + "</a>"
        } else {
            s = "<a href='#' onclick='history.back(); return false;'" + (a.config.showsmallbackbutton ? " class='jb-classifier-show-on-over " + q + "'" : "class='" + q + "'") + " style='" + p + (a.config.backbuttonuseicon ? a.utils.get_button_bar_icon_style(a.config, true) : "") + "'" + o + ">" + r + "</a>"
        }
        return s
    };
    var l = function() {
        if (!a.features.backbutton.isNeeded()) {
            n(".jb-go-back").remove();
            return
        }
        var p = m() + a.glryStagPadding();
        var o = a.glrySizePosition(true, true);
        var t = p;
        var r = a.config.backbuttonposition.toUpperCase() != "OVERLAY" ? p : (o.detail_panel_top + 10);
        var s = a.config.backbuttonhalign.toUpperCase();
        var q;
        if (s === "CENTER") {
            q = {
                top: r,
                left: t,
                right: t,
                "text-align": "center",
                "z-index": 550
            };
            if (a.config.backbuttonuseicon) {
                q.left = parseInt((a.glryWidth() - 38) / 2);
                q.right = "auto";
                q.padding = 0;
                q.width = "auto"
            }
        } else {
            if (s === "RIGHT") {
                q = {
                    top: r,
                    left: "auto",
                    right: t,
                    "z-index": 650
                }
            } else {
                q = {
                    top: r,
                    left: t,
                    right: "auto",
                    "z-index": 650
                }
            }
        }
        if (!a.config.showsmallbackbutton) {
            n(".jb-go-back").html(h()).css(q).show()
        } else {
            n(".jb-go-back").html(h()).css(q)
        }
        if (a.config.textcolor) {
            n(".jb-go-back a.jb-go-back-text").css({
                color: a.utils.format_color(a.config.textcolor)
            })
        }
        if (a.config.textshadowcolor) {
            n(".jb-go-back a.jb-go-back-text").css({
                "text-shadow": a.utils.get_text_shadow_style(a.config.textshadowcolor, a.config.textshadowcolora, true)
            })
        }
        if (a.config.galleryfontface) {
            n(".jb-go-back a").css("font-family", a.config.galleryfontface)
        }
    };
    return {
        setContext: k,
        getHtml: g,
        draw: b,
        setEvent: i,
        init: j,
        repaint: c,
        isNeeded: f,
        setPosition: l
    }
};
juicebox_registered_components.buttonbar = function() {
    var g = juicebox_lib.jQuery;
    var q, y;
    var u = function(A) {
        q = A;
        y = q._
    };
    var j = 4;
    var m = function() {
        if (q.utils.is_large_screen_mode(q.config)) {
            return ""
        }
        return "<div class='jb-classifier-link-wrapper jb-classifier-thumb-area jb-classifier-layer' data-layer='3000' style='z-index:3000;right:10px;top:10px;display:none;'><div class='jb-bb-bar' style='" + q.utils.get_button_bar_style(q.config) + "'><div class='jb-bb-button jb-bb-btn-full-screen" + ((q.features.fullscreen.switched_2_fullscreen() || q.utils.is_new_expanded_window()) ? " jb-bb-btn-de-full-screen" : "") + "' title='" + ((q.features.fullscreen.switched_2_fullscreen() || q.utils.is_new_expanded_window()) ? q.config.languagelistall.ef : q.config.languagelistall.gf) + "' style='" + q.utils.get_button_bar_icon_style(q.config) + "'>" + q.utils.add_font_icon_4_ie8(q.config, (q.features.fullscreen.switched_2_fullscreen() || q.utils.is_new_expanded_window()) ? "&#xe006;" : "&#xe005;", true) + "</div></div></div>"
    };
    var z = function() {
        var B = q.config.buttonbarposition.toUpperCase();
        if (B === "NONE") {
            return ""
        }
        var A = "",
            C = "display:none;";
        if (B != "TOP" && !q.config.showinfobutton) {
            A = "jb-classifier-show-on-over"
        }
        return "<div class='jb-classifier-link-wrapper jb-classifier-detail-area jb-classifier-layer " + A + "' data-layer='3000' style='z-index:3000;" + C + "'>" + (v() ? "<div class='jb-bb-bar' style='" + q.utils.get_button_bar_style(q.config) + "background-color:" + q.utils.format_color(q.config.buttonbarbackcolor) + "'>" + p() + w("jb-bb-splitter-1") + k() + w("jb-bb-splitter-2") + f() + w("jb-bb-splitter-3") + r() + "</div>" : "") + "</div>"
    };
    var o = function(A) {
        A.html(z());
        return true
    };
    var p = function() {
        var A = q.features.fullscreen.getPersistor();
        return i("jb-bb-btn-de-show-list", q.config.languagelistall.st, q.utils.is_large_screen_mode(q.config) ? "&#xe002;" : "&#xe003;") + i("jb-bb-btn-open-url", q.config.languagelistall.oiinw, "&#xe004;") + (q.config.showdownloadbutton ? i("jb-bb-btn-download", q.config.languagelistall.download, "D") : "") + i("jb-bb-btn-full-screen" + ((A.is_full_screen || q.utils.is_new_expanded_window()) ? " jb-bb-btn-de-full-screen" : ""), ((A.is_full_screen || q.utils.is_new_expanded_window()) ? q.config.languagelistall.ef : q.config.languagelistall.gf), (A.is_full_screen || q.utils.is_new_expanded_window()) ? "&#xe006;" : "&#xe005;")
    };
    var k = function() {
        return i("jb-bb-btn-top-nav jb-bb-btn-top-nav-left", q.config.languagelistall.goprv, "&#xe007;") + i("jb-bb-btn-auto-play", q.config.languagelistall.strta, "&#xe009;") + i("jb-bb-btn-top-nav jb-bb-btn-top-nav-right", q.config.languagelistall.gonxt, "&#xe008;")
    };
    var f = function() {
        return i("jb-bb-btn-show-info", q.config.languagelistall.hdinfo, "&#xe00b;") + i("jb-bb-btn-audio", q.config.languagelistall.plya, "&#xe00c;")
    };
    var r = function() {
        return i("jb-bb-btn-fotomoto", q.config.languagelistall.fotomoto, "&#xe00e;", q.config.fotomotostoreid ? false : true) + (q.config.sharefacebook ? i("jb-bb-btn-facebook", q.config.languagelistall.facebook, "&#xe00f;") : "") + (q.config.sharetwitter ? i("jb-bb-btn-twitter", q.config.languagelistall.twitter, "&#xe010;") : "") + (q.config.sharegplus ? i("jb-bb-btn-gplus", q.config.languagelistall.gplus, "&#xe011;") : "") + (q.config.sharepinterest ? i("jb-bb-btn-printerest", q.config.languagelistall.printerest, "&#xe012;") : "") + (q.config.sharetumblr ? i("jb-bb-btn-tumblr", q.config.languagelistall.tumblr, "&#xe013;") : "") + (q.config.showemailbutton ? i("jb-bb-btn-email", q.config.languagelistall.email, "M") : "")
    };
    var i = function(A, D, C, B) {
        return "<div class='jb-bb-button " + A + "' title='" + D + "' style='" + q.utils.get_button_bar_icon_style(q.config) + (B ? ";display:none;" : "") + "'>" + q.utils.add_font_icon_4_ie8(q.config, C, true) + "</div>"
    };
    var e = function() {
        q.utils.init_components(q.features, "audio");
        q.utils.setup_components_event(q.features, "showthumbsbutton,openurl,download,fullscreen,topnavleft,autoplay,topnavright,showinfo,audio,fotomoto,facebook,twitter,gplus,printerest,tumblr,email");
        if (q.config.buttonbariconhovercolor) {
            var A = "";
            var B = ".jb-bb-button";
            if (q.features.backbutton.isNeeded() && q.config.backbuttonuseicon) {
                B += ", .jb-go-back-icon"
            }
            y(B).hover(function() {
                A = g(this).attr("style");
                g(this).css({
                    color: q.utils.format_color(q.config.buttonbariconhovercolor)
                })
            }, function() {
                if (g.browser.msie && g.browser.version < 10) {
                    g(this).css({
                        color: q.utils.format_color(q.config.buttonbariconcolor)
                    })
                } else {
                    g(this).attr("style", A)
                }
            })
        }
        y(".jb-bb-btn-top-nav.jb-bb-btn-top-nav-left").click(function() {
            q.features.autoplay.stop();
            return q.previousImage(0)
        });
        y(".jb-bb-btn-top-nav.jb-bb-btn-top-nav-right").click(function() {
            q.features.autoplay.stop();
            return q.nextImage(0)
        })
    };
    var v = function() {
        if (q.config.buttonbarposition.toUpperCase() === "NONE") {
            return false
        }
        return true
    };
    var w = function(A) {
        var D = 0;
        var C = "";
        if (q.config.buttonbariconrealsize && parseInt(q.config.buttonbariconrealsize)) {
            D = parseInt(q.config.buttonbariconrealsize)
        }
        if (q.config.buttonbariconcolor) {
            C = "border-color:" + q.config.buttonbariconcolor + ";"
        }
        var B = parseInt(D / 2) - 1;
        return "<div class='jb-bb-splitter " + A + "' style='" + (D ? "height:" + D + "px;margin:" + B + "px 2px " + B + "px 2px;" : "") + C + "'></div>"
    };
    var t = function() {};
    var a = function(A) {
        if (A) {
            if (q.config.showimageoverlay.toUpperCase() === "NEVER") {
                return
            }
            var B = y(".jb-classifier-link-wrapper.jb-classifier-detail-area");
            q.utils.fade_in(q.config, B, A, false, null, "btnbar")
        } else {
            d()
        }
    };
    var n = function() {
        var B = d(true);
        var A = q.utils.get_button_bar_button_size(q.config);
        return A.buttonWidth * B.detailButtonCount + A.padding + (j * B.separatorCount)
    };
    var c = function() {
        return d(true)
    };
    var x = function() {
        if (q.utils.is_large_screen_mode(q.config)) {
            return
        }
        if (q.config.showimageoverlay.toUpperCase() === "NEVER" || (q.config.showimageoverlay.toUpperCase() !== "ALWAYS" && !q.isOverlayVisible())) {
            y(".jb-bb-bar").hide()
        }
    };
    var d = function(C) {
        var G = false;
        var M = false;
        var L = 0;
        var B = 0;
        var D = [0, 0, 0, 0];
        if (!q.features.showthumbsbutton.isVisible()) {
            y(".jb-bb-btn-de-show-list").hide()
        } else {
            M = true;
            D[0]++;
            L++
        }
        if (!q.config.showcaption) {
            y(".jb-caption").hide()
        }
        if (!q.config.showopenbutton) {
            y(".jb-bb-btn-open-url").hide()
        } else {
            M = true;
            D[0]++;
            L++
        }
        if (!q.config.showdownloadbutton) {
            y(".jb-bb-btn-download").hide()
        } else {
            M = true;
            D[0]++;
            L++
        }
        if (!q.config.showautoplaybutton) {
            y(".jb-bb-btn-auto-play").hide()
        } else {
            M = true;
            D[1]++;
            L++
        }
        if (!s()) {
            y(".jb-bb-btn-audio").hide()
        } else {
            M = true;
            D[2]++;
            L++
        }
        if (!l()) {
            y(".jb-bb-btn-full-screen").hide()
        } else {
            D[0]++;
            if (q.index_panel.is_visible() && !q.utils.is_large_screen_mode(q.config)) {
                G = true;
                B++
            } else {
                M = true;
                L++
            }
        }
        if (!q.config.showinfobutton) {
            y(".jb-bb-btn-show-info").hide()
        } else {
            M = true;
            D[2]++;
            L++
        }
        if (!q.config.shownavbuttons) {
            y(".jb-bb-btn-top-nav").hide()
        } else {
            M = true;
            D[1] += 2;
            L += 2
        }
        if (!q.features.fotomoto.isVisible()) {
            if (!C) {
                var J = y(".jb-bb-btn-fotomoto").is(":visible");
                y(".jb-bb-btn-fotomoto").hide();
                if (J) {
                    b()
                }
            }
        } else {
            if (!C && !y(".jb-bb-btn-fotomoto").is(":visible")) {
                y(".jb-bb-btn-fotomoto").show();
                b()
            }
            M = true;
            D[3]++;
            L++
        }
        if (!q.config.sharefacebook) {
            y(".jb-bb-btn-facebook").hide()
        } else {
            M = true;
            D[3]++;
            L++
        }
        if (!q.config.sharetwitter) {
            y(".jb-bb-btn-twitter").hide()
        } else {
            M = true;
            D[3]++;
            L++
        }
        if (!q.config.sharegplus) {
            y(".jb-bb-btn-gplus").hide()
        } else {
            M = true;
            D[3]++;
            L++
        }
        if (!q.config.sharepinterest) {
            y(".jb-bb-btn-printerest").hide()
        } else {
            M = true;
            D[3]++;
            L++
        }
        if (!q.config.sharetumblr) {
            y(".jb-bb-btn-tumblr").hide()
        } else {
            M = true;
            D[3]++;
            L++
        }
        if (!q.config.showemailbutton) {
            y(".jb-bb-btn-email").hide()
        } else {
            M = true;
            D[3]++;
            L++
        }
        var N = 0;
        if (D[0] && D[1]) {
            y(".jb-bb-splitter-1").show();
            N++
        } else {
            y(".jb-bb-splitter-1").hide()
        }
        if (D[2] && (D[1] || D[0])) {
            y(".jb-bb-splitter-2").show();
            N++
        } else {
            y(".jb-bb-splitter-2").hide()
        }
        if (D[3] && (D[2] || D[1] || D[0])) {
            y(".jb-bb-splitter-3").show();
            N++
        } else {
            y(".jb-bb-splitter-3").hide()
        }
        if (C) {
            var I = [];
            for (var H = 0; H < D.length; H++) {
                if (!D[H]) {
                    continue
                }
                for (var F = 0; F < D[H]; F++) {
                    if (F == 0 && I.length) {
                        I.push("s")
                    }
                    I.push("b")
                }
            }
            return {
                detailButtonCount: L,
                indexButtonCount: B,
                separatorCount: N,
                buttonPattern: I
            }
        }
        var K = q.config.showimageoverlay.toUpperCase();
        var A = q.config.buttonbarposition.toUpperCase();
        var E = ".jb-classifier-link-wrapper.jb-classifier-detail-area";
        if (A === "NONE") {
            y(E + ", .jb-classifier-link-wrapper.jb-classifier-thumb-area").remove()
        } else {
            if (q.config.showinfobutton || q.isOverlayVisible() || A === "TOP" || K === "ALWAYS") {
                if (q.detail_panel.is_visible() && A != "OVERLAY_IMAGE") {
                    y(E).show()
                }
            } else {
                y(E).hide()
            }
        }
        if (M) {
            y(E + " .jb-bb-bar").show()
        } else {
            y(E + " .jb-bb-bar").hide()
        }
        if (!G) {
            y(".jb-classifier-link-wrapper.jb-classifier-thumb-area").hide()
        } else {
            y(".jb-classifier-link-wrapper.jb-classifier-thumb-area").show()
        }
        return null
    };
    var l = function() {
        if (!q.utils.is_in_iframe() && q.config.usefullscreenexpand && q.utils.exit_support_real_fullscreen()) {
            return true
        }
        if (q.config.showexpandbutton && q.config.originalshowexpandbutton && (!q.isFullScreenMode() || q.features.fullscreen.switched_2_fullscreen() || q.utils.is_new_expanded_window()) && (!q.utils.is_in_iframe())) {
            return true
        }
        return false
    };
    var s = function() {
        if (!q.config.showaudiobutton || q.utils.is_earlier_ie()) {
            return false
        }
        return true
    };
    var b = function() {
        var P = q.config.buttonbarposition.toUpperCase();
        if (P != "OVERLAY_IMAGE" && P != "NONE") {
            var J, F = q.config.buttonbarhalign.toUpperCase();
            var D = 0;
            var I = (P == q.config.backbuttonposition.toUpperCase()) || (!q.utils.is_large_screen_mode(q.config) && q.config.showsmallbackbutton);
            if (q.detail_panel.is_visible() && q.features.backbutton.isNeeded() && I) {
                var K = q.config.backbuttonhalign.toUpperCase();
                if ((K === "LEFT" && F == "RIGHT") || (K === "RIGHT" && F == "LEFT")) {
                    D = g(".jb-go-back").width() + 55
                }
            }
            var B = false;
            var T = q.glrySizePosition();
            var C = 10;
            var S = q.glryStagPadding();
            var H = S;
            J = n();
            var L = C + T.detail_panel_top;
            if (P === "TOP") {
                L = C - 4 + T.top_panel_top
            }
            var A = q.utils.get_button_bar_button_size(q.config);
            var O = q.glryWidth() - 2 * q.config.stagepadding - (D ? D : 25);
            if (J > O) {
                J = O
            }
            var E = A.buttonWidth;
            var Q = d(true);
            var N = 0;
            var G = h();
            for (var R = 0; R < Q.buttonPattern.length; R++) {
                if (Q.buttonPattern[R] == "b") {
                    N += E;
                    if (N + A.padding + j > J) {
                        if (R > 0 && Q.buttonPattern[R - 1] == "s") {
                            var M = J;
                            if (R == Q.buttonPattern.length - 1 && O > J) {
                                J += E / G
                            } else {
                                J -= E / 4
                            }
                        } else {
                            if (R == Q.buttonPattern.length - 1 && O > J) {
                                J += E / G
                            }
                        }
                        break
                    }
                }
                if (Q.buttonPattern[R] == "s") {
                    N += j
                }
            }
            if (F === "CENTER") {
                B = true;
                H = parseInt((q.glryWidth() - J) / 2) - 10
            } else {
                if (F === "LEFT") {
                    B = true
                }
            }
            if (B) {
                y(".jb-classifier-link-wrapper.jb-classifier-detail-area").css({
                    left: H,
                    top: L,
                    width: J
                })
            } else {
                y(".jb-classifier-link-wrapper.jb-classifier-detail-area").css({
                    right: H,
                    top: L,
                    width: J
                })
            }
        }
    };
    var h = function() {
        var A = 10;
        if (q.config.buttonbariconsize < 3) {
            A = 1
        } else {
            if (q.config.buttonbariconsize < 8) {
                A = 2
            } else {
                if (q.config.buttonbariconsize < 12) {
                    A = 5
                } else {
                    if (q.config.buttonbariconsize < 15) {
                        A = 8
                    }
                }
            }
        }
        return A
    };
    return {
        setContext: u,
        getHtml: z,
        draw: o,
        setEvent: e,
        init: t,
        repaint: a,
        setPosition: b,
        getVisibleBtnCount: c,
        getButtonbarWidth: n,
        getHtml4IndexPage: m,
        needFullscreenButton: l,
        trySetInvisible: x
    }
};
juicebox_registered_components.imagenav = function() {
    var a, k;
    var d = juicebox_lib.jQuery;
    var i = function(l) {
        a = l;
        k = a._
    };
    var f = function(l) {
        if (!e()) {
            return ""
        }
        var m = l ? "left" : "right";
        return "<div class='jbn-nav-button jb-classifier-layer' data-layer='1000' style='z-index:1000;position:absolute;" + m + ":" + (a.glryStagPadding() + 10) + "px;" + a.utils.get_nav_btn_size_style(a.config, false) + "'><div class='jbn-" + m + "-button jbn-nav-button-icon' style='display:none;" + a.utils.get_nav_icon_style(a.config) + "'>" + a.utils.add_font_icon_4_ie8(a.config, (l ? "&#xe000;" : "&#xe001;")) + "</div></div>"
    };
    var b = function(l) {
        l.html(f());
        return true
    };
    var g = function() {};
    var h = function() {};
    var j = function(t) {
        var o = a.sizing();
        var q = parseInt(a.config.navbuttoniconrealsize);
        if (!q) {
            q = 18
        }
        var w = a.utils.get_nav_btn_size(a.config);
        var x = w / 2;
        if (a.config.imagenavposition.toUpperCase() != "IMAGE") {
            a._(".jb-navigation.jb-classifier-detail-area .jbn-nav-button").css("top", parseInt(t.detail_panel_height / 2 - x) + "px")
        }
        var r = a.config.thumbnavposition.toUpperCase();
        var n = (!t.is_sideway_layout && a.config.gallerytitleposition.toUpperCase() === "ABOVE_THUMBS" && r != "BOTTOM" ? o.constTitleHeight4AboveThumbs : 0);
        if (a.utils.is_large_screen_mode(a.config)) {
            var y = a.index_panel.get_thumb_height() / 2 - x;
            var s = a.index_panel.get_show_area_position();
            var v = a.glryStagPadding();
            var p = a.config.captionposition.toUpperCase();
            if (r === "BOTTOM") {
                var m = s.top + a.index_panel.get_thumb_height();
                if (p === "BELOW_THUMBS") {
                    y = m + parseInt((t.caption_panel_top - (m) - q - a.config.thumbpadding) / 2)
                } else {
                    y = m + o.padding_bottom_index_nav(a.config)
                }
                var l = m + parseInt((t.index_panel_height - a.index_panel.get_thumb_height()) / 2) - x;
                if (y < m) {
                    y = m
                }
                if (t.is_sideway_layout && a.config.showpagingtext) {
                    if (y + 2 * a.config.thumbpadding < l) {
                        y += a.config.thumbpadding
                    }
                }
                if (y > l) {
                    y = l
                }
            } else {
                if (t.is_sideway_layout) {
                    y = (a.glryHeight() - t.top_panel_height - 2 * v - (p === "BOTTOM" ? t.caption_panel_height : 0)) / 2 - x + (p === "BOTTOM" ? v : 0);
                    var u = a.config.thumbsvalign.toUpperCase();
                    if (u === "TOP" || u === "BOTTOM") {
                        y = s.top + parseInt((a.index_panel.get_thumb_height() - w + a.config.thumbpadding) / 2)
                    }
                }
            }
            if (a.config.usethumbdots) {
                var z = a.config.thumbnavposition.toUpperCase();
                if (a.config.showpagingtext && z === "BOTTOM") {
                    n += 10
                }
                if (y < 0) {
                    n += 7 + ((q <= 20) ? (22 - q) / 2 : 0)
                }
                if (!a.config_manager.isp) {
                    n += 11
                }
            } else {}
            k(".jb-navigation.jb-classifier-thumb-area .jbn-nav-button").css("top", parseInt(y + n) + "px")
        } else {
            k(".jb-navigation.jb-classifier-thumb-area .jbn-nav-button").css("top", parseInt((t.index_panel_height / 2 - x) + n) + "px")
        }
    };
    var e = function() {
        var l = a.config.showimagenav.toUpperCase();
        if (l === "ALWAYS") {
            return true
        }
        if (a.utils.is_swipable_device()) {
            return false
        }
        if (l === "NEVER") {
            return false
        }
        return true
    };
    var c = function(p, q) {
        var u = false;
        if (!a.detail_panel.isImageShowed() && a.config.imagenavposition.toUpperCase() === "IMAGE") {
            u = true
        }
        var o = a.config.showimagenav.toUpperCase();
        var v = o === "NEVER" ? true : false;
        if (!v && a.config.imagenavposition.toUpperCase() != "STAGE" && !a.detail_panel.isCurrentImageLoaded()) {
            v = true
        }
        var m = k(".jb-classifier-detail-area .jbn-left-button");
        var s = k(".jb-classifier-detail-area .jbn-nav-left-touch-area");
        var l = k(".jb-bb-button.jb-bb-btn-top-nav.jb-bb-btn-top-nav-left");
        var n = true;
        if (v) {
            m.hide()
        } else {
            if (!a.canImageMove()) {
                if (!u) {
                    m.hide();
                    if (!a.utils.is_large_screen_mode(a.config)) {
                        window.setTimeout(function() {
                            m.hide()
                        }, 50)
                    }
                }
                l.css({
                    opacity: 0.5
                });
                s.addClass("dt-nav-disabled")
            } else {
                if (!u) {
                    n = true;
                    if (!v) {
                        if (o === "ALWAYS") {
                            n = false
                        } else {
                            if (q === 1) {
                                n = false
                            }
                        }
                    }
                    if (!p) {
                        if (!n) {
                            if (a.utils.is_earlier_ie() && a.config.navbuttoniconopacity) {
                                m.show().css({
                                    filter: a.config.navbuttonbackcoloropacity.replace("filter:", "")
                                })
                            } else {
                                m.show().css({
                                    opacity: 1
                                })
                            }
                        } else {
                            if (a.utils.is_earlier_ie() && a.config.navbuttoniconopacity) {
                                m.show().css({
                                    filter: a.config.navbuttonbackcoloropacity
                                })
                            } else {
                                m.show().css({
                                    opacity: 0
                                })
                            }
                        }
                    } else {
                        if (!n) {
                            if (d.browser.msie || document.msFullscreenEnabled) {
                                m.fadeOut();
                                window.setTimeout(function() {
                                    m.fadeIn(p)
                                }, 100)
                            } else {
                                m.fadeIn(p)
                            }
                        } else {
                            m.fadeOut(p)
                        }
                    }
                }
                l.css({
                    opacity: 1
                });
                s.removeClass("dt-nav-disabled")
            }
        }
        var t = k(".jb-classifier-detail-area .jbn-right-button");
        var w = k(".jb-classifier-detail-area .jbn-nav-right-touch-area");
        var r = k(".jb-bb-button.jb-bb-btn-top-nav.jb-bb-btn-top-nav-right");
        if (v) {
            t.hide()
        } else {
            if (!a.canImageMove(true)) {
                t.hide();
                if (!a.utils.is_large_screen_mode(a.config)) {
                    window.setTimeout(function() {
                        t.hide()
                    }, 50)
                }
                r.css({
                    opacity: 0.5
                });
                w.addClass("dt-nav-disabled")
            } else {
                n = true;
                if (!v) {
                    if (o === "ALWAYS") {
                        n = false
                    } else {
                        if (q === 2) {
                            n = false
                        }
                    }
                }
                if (!p) {
                    if (!n) {
                        t.show().css({
                            opacity: 1
                        })
                    } else {
                        t.show().css({
                            opacity: 0
                        })
                    }
                } else {
                    if (!n) {
                        t.fadeIn(p)
                    } else {
                        t.fadeOut(p)
                    }
                }
                r.css({
                    opacity: 1
                });
                w.removeClass("dt-nav-disabled")
            }
        }
    };
    return {
        setContext: i,
        getHtml: f,
        draw: b,
        setEvent: g,
        init: h,
        repaint: c,
        setPosition: j,
        isNeeded: e
    }
};
juicebox_registered_components.indexnav = function() {
    var a, i;
    var g = function(j) {
        a = j;
        i = a._
    };
    var d = function() {
        return ""
    };
    var b = function(j) {
        j.html(d());
        return true
    };
    var e = function() {};
    var f = function() {};
    var c = function(m) {
        var j = a.utils.is_large_screen_mode(a.config);
        var k = i(".jb-classifier-thumb-area .jbn-left-button");
        if (!j && !a.config.showsmallthumbnav) {
            k.hide()
        } else {
            if (!a.canPageMove()) {
                k.hide();
                if (!a.utils.is_large_screen_mode(a.config)) {
                    window.setTimeout(function() {
                        k.hide()
                    }, 50)
                }
            } else {
                if (!m) {
                    k.show()
                } else {
                    k.fadeIn(m)
                }
            }
        }
        var l = i(".jb-classifier-thumb-area .jbn-right-button");
        if (!j && !a.config.showsmallthumbnav) {
            l.hide()
        } else {
            if (!a.canPageMove(true)) {
                l.hide();
                if (!a.utils.is_large_screen_mode(a.config)) {
                    window.setTimeout(function() {
                        l.hide()
                    }, 50)
                }
            } else {
                if (!m) {
                    l.show()
                } else {
                    a.utils.fade_in(a.config, l, m, false, null, "idxnavs")
                }
            }
        }
    };
    var h = function(o) {
        var m = a.index_panel.get_thumblist_size();
        var q = a.utils.get_nav_btn_size(a.config);
        var n = parseInt(((o.index_panel_width - m.width) / 2 - q) - (q / 3));
        if ((q / 3) > 10 && n < 5) {
            n = 5
        }
        var r = o.index_panel_width - m.width - 2 * q;
        var k = a.config.thumbwidth - q + a.config.thumbpadding;
        if (a.utils.is_large_screen_mode(a.config)) {
            if (a.config.thumbnavposition.toUpperCase() === "BOTTOM") {
                n = parseInt((o.index_panel_width - m.width) / 2 + k / 2);
                if (parseInt(a.config.maxthumbcolumns) <= 1) {
                    n -= parseInt(a.config.thumbwidth / 2 - 12)
                }
            }
            if (a.config.thumbnavposition.toUpperCase() === "BOTTOM" && a.config.usethumbdots) {
                if (a.config.maxthumbcolumns <= 4) {
                    n -= 11
                } else {
                    n -= 3
                }
            }
        }
        var j = a.config.thumbshalign.toUpperCase();
        var p = a.config.thumbpadding / 2;
        var l = a.config.thumbnavposition.toUpperCase() === "BOTTOM" ? k - p : 0;
        if (j === "LEFT") {
            i(".index-navigation .jbn-left-button").css("left", (p + l) + "px");
            i(".index-navigation .jbn-right-button").css("right", (r - p + l) + "px")
        } else {
            if (j === "RIGHT") {
                i(".index-navigation .jbn-left-button").css("left", (r - p + l) + "px");
                i(".index-navigation .jbn-right-button").css("right", (p + l) + "px")
            } else {
                i(".index-navigation .jbn-left-button").css("left", (n) + "px");
                i(".index-navigation .jbn-right-button").css("right", (n) + "px")
            }
        }
    };
    return {
        setContext: g,
        getHtml: d,
        draw: b,
        setEvent: e,
        init: f,
        repaint: c,
        setPosition: h
    }
};
juicebox_registered_components.showthumbsbutton = function(e) {
    var a = e;
    var q = null;
    var i = false;
    var p = false;
    var f = juicebox_lib.jQuery;
    var n = function(r) {
        a = r;
        q = a._
    };
    var j = function() {
        q(".jb-bb-btn-de-show-list").click(function() {
            return l()
        })
    };
    var l = function(r) {
        var s = function() {
            o()
        };
        if (!a.utils.is_large_screen_mode(a.config)) {
            if (a.config_manager.isp && juicebox_instances[a.instance_id] && typeof(juicebox_instances[a.instance_id].onShowThumbs) === "function") {
                juicebox_instances[a.instance_id].onShowThumbs(true)
            }
            s();
            return false
        }
        return b(r)
    };
    var o = function(u) {
        a.features.autoplay.stop();
        var x = u ? u : 0;
        if (a.detail_panel.get_photo_position() > 0) {
            x = a.detail_panel.get_photo_position()
        }
        if (a.index_panel.is_visible() && a.detail_panel.is_visible()) {
            a.redrawIndexPanel(x);
            return false
        }
        a.detail_panel.set_visible_flag(false);
        a.index_panel.set_visible_flag(true);
        var t = q(" .jb-panel-detail, .jb-area-caption");
        if (t.is(":visible")) {
            p = true;
            var w = q(" .jb-panel-detail img");
            if (w.length > 0) {
                w.fadeOut(250)
            }
            q(".jb-classifier-link-wrapper").hide();
            t.fadeOut(250);
            window.setTimeout(function() {
                q(" .jb-classifier-detail-area, .jb-area-caption").hide();
                q(".jb-classifier-thumb-area").fadeIn(200);
                a.redrawIndexPanel(x);
                p = false
            }, 250)
        } else {
            a.redrawIndexPanel()
        }
        if (a.config.enabledirectlinks) {
            var s = a.features.hashstatus.getExpendedHash();
            var v = window.location.href.split("#");
            var r = "";
            if (v.length == 2 && v[1].indexOf(s) >= 0) {
                r = s
            }
            window.location.href = window.location.href.split("#")[0] + "#" + r
        }
        return false
    };
    var b = function(C, A, r) {
        var B;
        var v = a.config.thumbsposition.toUpperCase();
        var D = 500;
        var y = q(".jb-panel-index");
        if (typeof(A) == "boolean") {
            i = A
        } else {
            i = !i
        }
        y.stop();
        q(".jb-panel-detail .jb-dt-main-image, .jb-panel-detail .jb-dt-main-image img").stop();
        if (i) {
            var t = function() {
                a.index_panel.set_visible_flag(false);
                y.hide();
                a.features.grytitle.setPosition();
                a.features.buttonbar.setPosition();
                if (!r) {
                    a.glryRepaint(true, false, true)
                }
            };
            if (!C) {
                var x = parseInt(y.height());
                var s = parseInt(y.width());
                q(".jb-panel-index .jb-area-large-mode-title").css({
                    overflow: "hidden",
                    "white-space": "nowrap"
                });
                if (v === "TOP") {
                    y.animate({
                        top: "-=" + (x),
                        height: "-=" + (x),
                        avoidTransforms: true
                    }, 500, "easeInOutQuart", t)
                } else {
                    if (v === "LEFT") {
                        q(".index-navigation .jbn-nav-button").hide();
                        y.animate({
                            left: "-=" + (s),
                            width: "-=" + (s),
                            avoidTransforms: true
                        }, 500, "easeInOutQuart", t)
                    } else {
                        if (v === "RIGHT") {
                            q(".index-navigation .jbn-nav-button").hide();
                            y.animate({
                                left: "+=" + (s),
                                width: "-=" + (s),
                                avoidTransforms: true
                            }, 500, "easeInOutQuart", t)
                        } else {
                            y.animate({
                                top: "+=" + (x),
                                height: "-=" + (x),
                                avoidTransforms: true
                            }, 500, "easeInOutQuart", t)
                        }
                    }
                }
            } else {
                t()
            }
        } else {
            B = a.glrySizePosition(true, true);
            a.glryRepaint(true, true, true);
            var F = B.index_panel_top;
            var z = B.index_panel_left;
            var w = B.index_panel_height;
            var u = B.index_panel_width;
            if (v === "TOP") {
                w = 0;
                F = B.index_panel_top - B.index_panel_height
            } else {
                if (v === "LEFT") {
                    u = 0;
                    z = B.index_panel_left - B.index_panel_width
                } else {
                    if (v === "RIGHT") {
                        u = 0;
                        z = B.index_panel_left + B.index_panel_width
                    } else {
                        w = 0;
                        F = B.index_panel_top + B.index_panel_height
                    }
                }
            }
            y.css({
                top: F,
                height: w,
                left: z,
                width: u
            });
            if (f.browser && f.browser.msie) {
                y.css("opacity", 1)
            }
            y.show();
            if (q(".jb-idx-show-area table").length <= 0) {
                a.index_panel.show_current_page()
            }
            q(".jb-panel-index .jb-area-caption").show();
            if (a.config.gallerytitleposition.toUpperCase() === "ABOVE_THUMBS") {
                q(".jb-panel-index .jb-area-large-mode-title").show()
            }
            var E = function() {
                a.index_panel.set_visible_flag(true);
                y.hide();
                if (!r) {
                    a.glryRepaint(true, false, true)
                }
            };
            if (!C) {
                q(".jb-panel-index .jb-area-large-mode-title").css({
                    overflow: "hidden",
                    "white-space": "nowrap"
                });
                if (v === "TOP") {
                    y.animate({
                        top: "-=" + (-B.index_panel_height),
                        height: "+=" + (B.index_panel_height),
                        avoidTransforms: true
                    }, 500, "easeInOutQuart", E)
                } else {
                    if (v === "LEFT") {
                        y.animate({
                            left: "+=" + (B.index_panel_width),
                            width: "+=" + (B.index_panel_width),
                            avoidTransforms: true
                        }, 500, "easeInOutQuart", E)
                    } else {
                        if (v === "RIGHT") {
                            y.animate({
                                left: "-=" + (B.index_panel_width),
                                width: "+=" + (B.index_panel_width),
                                avoidTransforms: true
                            }, 500, "easeInOutQuart", E)
                        } else {
                            y.animate({
                                top: "+=" + (-B.index_panel_height),
                                height: "+=" + (B.index_panel_height),
                                avoidTransforms: true
                            }, 500, "easeInOutQuart", E)
                        }
                    }
                }
            } else {
                E()
            }
        }
        if (a.config_manager.isp && juicebox_instances[a.instance_id] && typeof(juicebox_instances[a.instance_id].onShowThumbs) === "function") {
            juicebox_instances[a.instance_id].onShowThumbs(!i)
        }
        if (a.utils.is_touchable_desktop()) {
            a.features.touchevent.setTransitioning(true);
            window.setTimeout(function() {
                a.features.touchevent.setTransitioning(false)
            }, 50)
        }
        return false
    };
    var m = function() {};
    var h = function() {
        return i
    };
    var c = function(r) {
        i = !r
    };
    var d = function() {
        return p
    };
    var g = function() {
        if (!a.config.showsmallthumbsbutton || !a.config.showthumbsbutton) {
            return false
        }
        if (!a.config.showsmallthumbsbutton || (!a.config.showthumbsbutton && a.utils.is_large_screen_mode(a.config))) {
            return false
        }
        return true
    };
    var k = function() {
        var s = q(".jb-bb-btn-de-show-list");
        if (a.utils.is_large_screen_mode(a.config)) {
            if (a.index_panel.is_visible()) {
                s.attr("title", a.config.languagelistall.htlsm)
            } else {
                s.attr("title", a.config.languagelistall.stlsm)
            }
        } else {
            s.attr("title", a.config.languagelistall.st);
            if (g()) {
                s.show()
            } else {
                s.hide();
                if (q(".jb-bb-bar>div:visible").length <= 0) {
                    var r = a.features.buttonbar.getVisibleBtnCount();
                    if (r.detailButtonCount <= 0) {
                        q(".jb-classifier-detail-area .jb-bb-bar").hide()
                    }
                    if (r.indexButtonCount <= 0) {
                        q(".jb-classifier-thumb-area .jb-bb-bar").hide()
                    }
                }
            }
            if (a.detail_panel.is_visible()) {
                a.index_panel.display_gallery_top(false)
            } else {}
        }
    };
    return {
        setContext: n,
        setEvent: j,
        init: m,
        isThumbsHidden: h,
        switch2Thumbnails: o,
        isSwitching: d,
        toggle_index_panel_4_lsm: b,
        setIndexVisibleFlag: c,
        repaint: k,
        indexButtonClicked: l,
        isVisible: g
    }
};
juicebox_registered_components.openurl = function() {
    var c, e;
    var f = function(i) {
        c = i;
        e = c._
    };
    var h = function() {
        c._(".jb-bb-btn-open-url").click(d)
    };
    var g = function(i) {
        if (i.linkURL) {
            return i.linkURL
        } else {
            if (i.largeImageURL) {
                return i.largeImageURL
            }
            return i.imageURL
        }
        return ""
    };
    var d = function() {
        var i = c.detail_panel.get_current_photo();
        if (c.config.useflickr) {
            if (i.imageFullURL) {
                window.open(i.imageFullURL);
                return false
            }
        }
        var k = g(i);
        var j = i.linkTarget ? i.linkTarget.toLowerCase() : "";
        if (j === "_self") {
            window.location.href = k
        } else {
            window.open(k, j)
        }
        return false
    };
    var b = function() {};
    var a = function() {};
    return {
        setContext: f,
        setEvent: h,
        init: b,
        repaint: a,
        open_url: d,
        getTargetUrl: g
    }
};
juicebox_registered_components.fullscreen = function() {
    var a, m, d;
    var c = juicebox_lib.jQuery;
    var g = null;
    var k = function(o) {
        a = o;
        m = a._;
        var n = a.config;
        d = {
            parent_gallery_param: n.persistor_param,
            is_full_screen: ((n.fullscreen_displaying_mode) ? true : false),
            parent_gallery: n.parent_gallery,
            initial_body_css_inline_style: (n.initial_body_css_inline_style ? n.initial_body_css_inline_style : ""),
            initial_html_css_inline_style: (n.initial_html_css_inline_style ? n.initial_html_css_inline_style : ""),
            scroll_position: (n.scroll_position ? n.scroll_position : {}),
            initial_height: 0,
            initial_width: 0
        }
    };
    var f = function() {
        m(".jb-bb-btn-full-screen").click(b)
    };
    var i = function() {
        g = new juicebox_gallery_dialog({
            jquery: c
        })
    };
    var b = function() {
        return l()
    };
    var l = function() {
        if (!d.is_full_screen) {
            if (a.utils.is_new_expanded_window()) {
                window.history.back();
                return false
            }
            juicebox_instances[a.instance_id].sendMessage(true);
            a.features.hashstatus.enableHashEvent(false);
            a.features.hashstatus.setExpanded(true);
            if (!a.utils.is_in_iframe() && a.utils.need_new_window(a.config)) {
                var E;
                if (c.browser.msie && c.browser.version < 8 && c.browser.version >= 7) {
                    E = {
                        configurl: a.utils.convert_to_absolute_path(a.correctPath(a.config.configurl)),
                        themeurl: a.utils.convert_to_absolute_path(a.config.themeurl),
                        backgroundcolor: a.config.expandedbackgroundcolor ? a.config.expandedbackgroundcolor : a.config.backgroundcolor,
                        hide_thumbnails_in_lsm: a.features.showthumbsbutton.isThumbsHidden(),
                        backgroundurl: a.utils.convert_to_absolute_path(a.correctPath(a.config.backgroundurl)),
                        firstimageindex: a.detail_panel.get_current_photo() ? a.detail_panel.get_current_photo().position + 1 : 0,
                        baseurl: a.utils.convert_to_absolute_path(a.config.baseurl)
                    }
                } else {
                    if (a.features.splash.isNeeded()) {
                        a.detail_panel.set_visible_flag(true);
                        a.index_panel.set_visible_flag(false)
                    }
                    E = {
                        showsplashpage: "NEVER",
                        configurl: a.utils.convert_to_absolute_path(a.correctPath(a.config.configurl)),
                        themeurl: a.utils.convert_to_absolute_path(a.config.themeurl),
                        baseurl: a.utils.convert_to_absolute_path(a.config.baseurl),
                        backgroundcolor: a.config.expandedbackgroundcolor ? a.config.expandedbackgroundcolor : a.config.backgroundcolor,
                        audiourlmp3: (a.config.audiourlmp3 ? a.utils.convert_to_absolute_path(a.config.audiourlmp3) : ""),
                        backgroundurl: a.utils.convert_to_absolute_path(a.correctPath(a.config.backgroundurl)),
                        firstimageindex: a.detail_panel.get_current_photo() ? a.detail_panel.get_current_photo().position + 1 : 0,
                        hide_thumbnails_in_lsm: a.features.showthumbsbutton.isThumbsHidden(),
                        is_detail_visible: a.detail_panel.is_visible(),
                        is_index_visible: a.index_panel.is_visible(),
                        maxthumbcolumns: a.config.maxthumbcolumns,
                        maxthumbrows: a.config.maxthumbrows,
                        pageTitle: a.config.gallerytitle ? a.config.gallerytitle : c("head > title").text(),
                        image_orders: a.gallery_manager().get_image_orders()
                    };
                    E.backbuttonurl = a.config.backbuttonurl ? a.utils.convert_to_absolute_path(a.config.backbuttonurl) : "";
                    E.audiourlogg = (a.config.audiourlogg ? a.utils.convert_to_absolute_path(a.config.audiourlogg) : "");
                    E.languagelist = a.config.languagelistbak;
                    E.parenturl = document.location.href
                }
                a.config_manager.get_cookie_manager().saveConfig({
                    skip: "gallerywidth,galleryheight,containerid,enabledirectlinks,usefullscreenexpand,expandinnewpage,languagelistall,splashtitle,splashimageurl,splashshowimagecount,gallerydescription,thumb_load_placeholder,main_load_placeholder,showthumbsonload,use_webkit_transform,use_3d_transform,sync_caption_dimensions,theme,flickrtagmode,flickrsort,flickrimagesize,seoadditionaltext,enableseo,showsplashpage,smallthumbslidetime,thumbpreloading,fadetime,dialogfadetime",
                    config: E
                });
                if (a.features.audio.isPlaying()) {
                    a.features.audio.toggleAudioPlay()
                }
                document.location.href = a.utils.get_js_folder_url() + "full.html";
                return false
            }
            var q = a.utils.get_viewport_meta_content();
            a.utils.set_viewport_meta(a.config, true);
            var t = c.extend({}, a.config);
            var z = a.getIgnoredOptions4New().split(",");
            for (var A = 0; A < z.length; A++) {
                if (z[A].length <= 0) {
                    continue
                }
                delete t[z[A]]
            }
            t.containerid = g.get_id();
            t.gallerywidth = "100%";
            t.galleryheight = "100%";
            t.fullscreen_displaying_mode = true;
            t.parent_gallery = juicebox_instances[a.instance_id];
            var B = c("body").attr("style");
            t.initial_body_css_inline_style = B ? B : "";
            t.initial_html_css_inline_style = c("html").attr("style");
            t.scroll_position = {};
            t.scroll_position.scrollTop = c(window).scrollTop();
            t.scroll_position.scrollLeft = c(window).scrollLeft();
            window.scroll(0, 0);
            t.persistor_param = {};
            t.persistor_param.image_orders = a.gallery_manager().get_image_orders();
            t.persistor_param.viewportContent = q;
            var D = c(window);
            var C = a.utils.is_large_screen_mode(a.config);
            t.persistor_param.max_side_length = Math.max(D.width(), D.height());
            t.persistor_param.restore_viewport = function(J, I) {
                a.utils.set_viewport_value(J, I)
            };
            var n = a.config.showsmallthumbsonload && !a.utils.is_large_screen_mode(a.config) ? true : false;
            t.persistor_param.is_index_visible = a.features.splash.isSet() ? n : a.index_panel.is_visible();
            t.persistor_param.is_detail_visible = a.features.splash.isSet() ? !n : a.detail_panel.is_visible();
            t.persistor_param.current_image_index = a.detail_panel.get_photo_position();
            t.persistor_param.restore_image = function(I) {
                a.setImageEventIndex(I + 1);
                if (C) {
                    a.showImage(I)
                } else {
                    a.switch2Main(I)
                }
            };
            t.persistor_param.restore_index = (C ? a.redrawIndexPanel : a.features.showthumbsbutton.switch2Thumbnails);
            t.persistor_param.splash_is_set = a.features.splash.isSet();
            t.persistor_param.background_image_width = a.features.backgroundimage.getSizingInfo().width;
            t.persistor_param.background_image_height = a.features.backgroundimage.getSizingInfo().height;
            t.persistor_param.gallery_manager = a.gallery_manager;
            t.persistor_param.hide_thumbnails_in_lsm = a.features.showthumbsbutton.isThumbsHidden();
            t.persistor_param.last_image_event_index = (a.detail_panel.get_current_photo() ? a.detail_panel.get_current_photo().position : 0) + 1;
            t.persistor_param.overlay_info_visible = a.config.showinfobutton ? a.features.showinfo.visible() : a.isOverlayVisible();
            t.persistor_param.openedFromSplash = a.features.splash.opendFromSplash;
            if (a.features.audio.isNeeded()) {
                t.persistor_param.is_audio_playing = a.features.audio.isPlaying();
                t.persistor_param.parent_toggle_audio_play = a.features.audio.toggleAudioPlay;
                t.persistor_param.need2PlayAudioAfterSplash = a.features.splash.need2PlayAudioAfterSplash;
                t.persistor_param.stopAudioPlay = a.features.audio.stop
            }
            t.persistor_param.parent_set_info_visible = a.features.showinfo.showInfoCtrls;
            t.persistor_param.different_size_images_in_config = a.hasMultipleSizeImages;
            var r = a.features.autoplay.isPlaying();
            a.features.autoplay.stop(false, true);
            t.persistor_param.is_autoplaying = r;
            t.persistor_param.restore_autoplay = function(I) {
                if (I != a.features.autoplay.isPlaying()) {
                    a.features.autoplay.toggleAutoPlay(false, true)
                }
            };
            t.persistor_param.restore_autohide = function() {
                a.resetInactiveTimer()
            };
            t.persistor_param.repaint_glry = function(I) {
                a.glryRepaint(I)
            };
            if (!(a.utils.is_swipable_device() || a.config.forcetouchmode || a.config.showinfobutton)) {
                a.setOverlay(false, 0)
            }
            var F = {
                overflow: "hidden",
                margin: 0,
                padding: 0
            };
            c("html").css(F);
            c("body").addClass("jb-flag-fullscreen");
            var x = C ? false : true;
            if (a.config.backgroundopacity === 1 || a.config.backgroundopacity === "1" || (typeof(a.config.backgroundopacity) === "string" && a.config.backgroundopacity.indexOf("filter") === 0 && a.config.backgroundopacity.indexOf("100") > 0)) {
                x = true
            } else {
                t.persistor_param.restore_zindex = function() {
                    m("").show();
                    m("").focus()
                };
                m("").hide()
            }
            var v = a.config.expandedbackgroundcoloropacity >= 1 ? true : false;
            var G = 1000 * a.config.dialogfadetime;
            g.fadein_dialog(v, G, function() {
                a.setExtendedGlry(new juicebox(t))
            });
            if (a.config.usefullscreenexpand || a.config.autofullscreenexpand) {
                a.utils.show_real_fullscreen("jb-glry-dlg");
                if (a.utils.is_android() && a.index_panel.is_visible() && !a.utils.is_large_screen_mode(a.config)) {
                    window.setTimeout(function() {
                        a.showNextPage()
                    }, 1000)
                }
            }
        } else {
            var p = c(window);
            if (a.utils.need_viewport_meta(a.config)) {
                if (d.parent_gallery_param.viewportContent) {
                    if (a.utils.is_android() && a.config.usefullscreenexpand) {
                        window.setTimeout(function() {
                            a.utils.set_viewport_meta_content(d.parent_gallery_param.viewportContent)
                        }, 1500)
                    } else {
                        a.utils.set_viewport_meta_content(d.parent_gallery_param.viewportContent)
                    }
                } else {
                    if (!a.utils.is_ipad()) {
                        d.parent_gallery_param.restore_viewport(0.4, true)
                    }
                }
            } else {
                var u = d.parent_gallery_param.viewportContent ? d.parent_gallery_param.viewportContent : "";
                a.utils.set_viewport_meta_content(u)
            }
            if (!d.parent_gallery_param.splash_is_set) {
                d.parent_gallery_param.parent_set_info_visible(a.features.showinfo.visible());
                var w = a.detail_panel.get_photo_position();
                if (a.detail_panel.is_visible()) {
                    d.parent_gallery_param.restore_image(w)
                }
                if (a.index_panel.is_visible()) {
                    d.parent_gallery_param.restore_index(w)
                }
            }
            window.setTimeout(function() {
                c("html").css({
                    overflow: ""
                });
                c("body").css({
                    overflow: "auto"
                });
                window.setTimeout(function() {
                    if (juicebox_instances.length > 1) {
                        d.initial_html_css_inline_style = d.initial_html_css_inline_style.replace(/ /g, "").replace("overflow:hidden;")
                    }
                    c("body").removeClass("jb-flag-fullscreen").attr("style", d.initial_body_css_inline_style);
                    c("html").attr("style", d.initial_html_css_inline_style);
                    window.setTimeout(function() {
                        window.scroll(d.scroll_position.scrollLeft, d.scroll_position.scrollTop);
                        d.parent_gallery_param.restore_autohide();
                        d.parent_gallery_param.repaint_glry(true)
                    }, 300)
                }, 100)
            }, 100);
            if (d.parent_gallery_param.restore_zindex) {
                d.parent_gallery_param.restore_zindex()
            }
            var s = function() {
                d.parent_gallery.restore(!a.index_panel.is_visible() || a.features.showthumbsbutton.isThumbsHidden(), a.isOverlayVisible())
            };
            var H = function() {
                var I = 1000 * a.config.dialogfadetime;
                g.fadeout_dialog(I, s);
                a.unbindResize()
            };
            var y = function() {
                g.cleanup_dialog();
                a.unbindResize();
                d.parent_gallery.restore(a.features.showthumbsbutton.isThumbsHidden(), a.isOverlayVisible())
            };
            if (a.config.usefullscreenexpand || a.config.autofullscreenexpand) {
                a.utils.exit_fullscreen();
                if (a.utils.is_android()) {
                    window.setTimeout(function() {
                        a.glryRepaint(true)
                    }, 1300)
                }
                y()
            } else {
                H()
            }
            var o = a.features.autoplay.isPlaying();
            if (a.features.fullscreen.switched_2_fullscreen()) {
                if (a.features.fullscreen.getPersistor().parent_gallery_param.openedFromSplash()) {
                    if (a.features.fullscreen.getPersistor().parent_gallery_param.stopAudioPlay) {
                        a.features.fullscreen.getPersistor().parent_gallery_param.stopAudioPlay()
                    }
                    o = a.config.autoplayonload ? true : false
                }
            }
            d.parent_gallery_param.restore_autoplay(o);
            a.features.hashstatus.enableHashEvent(false);
            if (!a.features.splash.isSet()) {
                d.parent_gallery.sendMessage(false)
            }
        }
        return false
    };
    var j = function() {
        return d.is_full_screen
    };
    var h = function() {
        return d.is_full_screen ? d.parent_gallery : null
    };
    var e = function() {
        return d
    };
    return {
        setContext: k,
        setEvent: f,
        init: i,
        switched_2_fullscreen: j,
        full_screen: b,
        parentGallery: h,
        getPersistor: e
    }
};
juicebox_registered_components.autoplay = function() {
    var a, q, l = 0,
        j;
    var g = juicebox_lib.jQuery;
    var o = function(r) {
        a = r;
        q = a._;
        j = 1000 * a.config.imagetransitiontime
    };
    var h = function() {
        return "<div class='' title='" + a.config.languagelistall.st + "' style='" + a.utils.get_button_bar_icon_style(config) + "'>" + a.utils.add_font_icon_4_ie8(config, utils.is_large_screen_mode(config) ? "&#xe002;" : "&#xe003;", true) + "</div>"
    };
    var b = function(r) {
        if (!a.config.showthumbsbutton) {
            return false
        }
        if (!a.allowDisplay()) {
            return false
        }
        r.html(h());
        return true
    };
    var i = function() {
        q(".jb-bb-btn-auto-play").click(function() {
            p();
            return false
        })
    };
    var k = function() {};
    var c = function() {};
    var p = function(r, t, s) {
        if (!s && !a.config.showautoplaybutton && !a.config.enableautoplay && !a.config.autoplayonload) {
            return false
        }
        if (l) {
            window.clearInterval(l);
            l = 0;
            d(t);
            return false
        }
        if (a.detail_panel.is_visible()) {
            if (a.config.gonextonautoplay && !r) {
                a.nextImage(0)
            } else {}
        }
        f();
        d(t);
        return false
    };
    var d = function(w) {
        var t = a.config.languagelistall.aon;
        if (l) {
            q(".jb-bb-btn-auto-play").toggleClass("jb-status-playing").attr("title", a.config.languagelistall.stpa).html(a.utils.add_font_icon_4_ie8(a.config, "&#xe00a;"))
        } else {
            t = a.config.languagelistall.aoff;
            q(".jb-bb-btn-auto-play").toggleClass("jb-status-playing").attr("title", a.config.languagelistall.strta).html(a.utils.add_font_icon_4_ie8(a.config, "&#xe009;"))
        }
        if (a.config.showautoplaystatus && !w) {
            var v = q(".jb-status-message");
            var r = a.glrySizePosition(a.index_panel.is_visible(), a.detail_panel.is_visible(), a.config_manager.isp, a.features.toppanel.isNeeded(), a.index_panel.get_thumb_height(), a.config);
            var u = r.detail_panel_height / 2 - 18;
            var s = r.detail_panel_width / 2 - 79;
            v.css({
                top: u,
                left: s,
                width: "140px"
            });
            v.html(t).fadeIn(300);
            window.setTimeout(function() {
                v.hide().fadeOut(j);
                v.fadeOut(300)
            }, 1000)
        }
    };
    var n = function(r) {
        l = r
    };
    var f = function() {
        l = window.setInterval(function() {
            if (g("#jb-glry-dlg").is(":visible") && !q("").is(":visible")) {
                return
            }
            if (!a.canImageMove(true)) {
                a.features.autoplay.toggleAutoPlay();
                return
            }
            var r = a.gallery_manager().get_next_image(a.detail_panel.get_photo_position()).position;
            var s = q(".jb-dt-main-image-" + r + " .jb-status-loading");
            if (s.length <= 0 && a.config.main_load_placeholder.indexOf("jb-status-") > 0) {
                a.nextImage(0)
            }
        }, 1000 * a.config.displaytime + j)
    };
    var m = function() {
        if (l) {
            p()
        }
    };
    var e = function() {
        return l != 0
    };
    return {
        setContext: o,
        getHtml: h,
        draw: b,
        setEvent: i,
        init: k,
        repaint: c,
        toggleAutoPlay: p,
        stop: m,
        isPlaying: e,
        set_autoplay_flag: n
    }
};
juicebox_registered_components.showinfo = function() {
    var a, i, e = true;
    var d = juicebox_lib.jQuery;
    var h = function(j) {
        a = j;
        i = a._
    };
    var f = function() {
        if (!a.config.showinfobutton) {
            return
        }
        i(".jb-bb-btn-show-info").click(function() {
            g();
            return false
        })
    };
    var g = function() {
        e = !e;
        a.setOverlayFlag(e);
        c(e, 250, false)
    };
    var b = function() {
        return e
    };
    var c = function(k, l, o, p) {
        e = k;
        if (p) {
            return
        }
        if (!a.detail_panel.is_visible()) {
            return
        }
        var n = (!a.detail_panel.isImageShowed() && a.config.buttonbarposition.toUpperCase() === "OVERLAY_IMAGE") ? ":not(.jb-classifier-link-wrapper)" : "";
        if (o) {
            n += ":not(.jb-area-caption)"
        }
        a.utils.show_hide_controls(i(".jb-classifier-show-on-over" + n), k, ((d.browser.msie && d.browser.version >= 7 && d.browser.version < 8) ? 0 : l));
        if (!o) {
            i(".jb-area-caption table").css({
                display: ""
            })
        }
        if (a.config.imagetransitiontype.toUpperCase() === "CROSS_FADE" && !(d.browser.msie || a.utils.is_firefox3())) {
            var j = l ? l : 50;
            window.setTimeout(function() {
                i(".jb-area-caption table").css({
                    opacity: 1
                })
            }, j)
        }
        var m = k ? a.config.languagelistall.hdinfo : a.config.languagelistall.sinfo;
        i(".jb-bb-button.jb-bb-btn-show-info").attr("title", m)
    };
    return {
        setContext: h,
        setEvent: f,
        showInfoCtrls: c,
        visible: b,
        toggle_info: g
    }
};
juicebox_registered_components.audio = function() {
    var a, m, c, f;
    var l = function(n) {
        a = n;
        m = a._
    };
    var h = function() {
        m(".jb-bb-btn-audio").click(function() {
            i();
            return false
        })
    };
    var i = function() {
        var n = false;
        if (a.features.fullscreen.switched_2_fullscreen() && a.features.fullscreen.getPersistor().parent_gallery_param.parent_toggle_audio_play) {
            c = !a.features.fullscreen.getPersistor().parent_gallery_param.parent_toggle_audio_play();
            n = true
        } else {
            if (!f) {
                return c
            }
        }
        if (a.utils.is_earlier_ie()) {
            return c
        }
        if (c) {
            if (!n) {
                if (f) {
                    f.pause()
                }
            }
            c = false;
            m(".jb-bb-btn-audio").removeClass("jb-status-playing").attr("title", a.config.languagelistall.plya)
        } else {
            if (!n) {
                if (f) {
                    f.play()
                }
                if (f.paused) {
                    return c
                }
            }
            c = true;
            m(".jb-bb-btn-audio").addClass("jb-status-playing").attr("title", a.config.languagelistall.psa)
        }
        return c
    };
    var j = function(n) {
        var p;
        if (a.config.audiourlmp3) {
            p = a.config.audiourlmp3
        }
        if (a.features.fullscreen.switched_2_fullscreen() && a.features.fullscreen.getPersistor().parent_gallery_param.parent_toggle_audio_play) {
            if (a.features.fullscreen.getPersistor().parent_gallery_param.need2PlayAudioAfterSplash && a.features.fullscreen.getPersistor().parent_gallery_param.need2PlayAudioAfterSplash(a.config)) {
                i()
            } else {
                c = a.features.fullscreen.getPersistor().parent_gallery_param.is_audio_playing;
                if (a.features.fullscreen.getPersistor().parent_gallery_param.is_audio_playing) {
                    m(".jb-bb-btn-audio").addClass("jb-status-playing").attr("title", a.config.languagelistall.psa)
                } else {
                    m(".jb-bb-btn-audio").removeClass("jb-status-playing").attr("title", a.config.languagelistall.plya)
                }
            }
        } else {
            if (p && !a.utils.is_earlier_ie() && !a.utils.is_adobe_air()) {
                try {
                    f = new Audio(p);
                    f.addEventListener("ended", function() {
                        this.currentTime = 0;
                        if (a.config.loopaudio) {
                            if (c) {
                                this.play()
                            }
                        } else {
                            i()
                        }
                    }, false);
                    f.volume = a.config.audiovolume;
                    if (!n && a.config.playaudioonload) {
                        i()
                    }
                } catch (o) {
                    console.error("cannot handle audio")
                }
            }
        }
    };
    var g = function() {
        return f != null
    };
    var d = function() {
        return c
    };
    var b = function() {};
    var k = function(n, o) {
        if (c) {
            i(n, o)
        }
    };
    var e = function() {
        if (f) {
            f.pause()
        }
        f = null
    };
    return {
        setContext: l,
        setEvent: h,
        init: j,
        repaint: b,
        toggleAudioPlay: i,
        isNeeded: g,
        isPlaying: d,
        stop: k,
        remove: e
    }
};
juicebox_registered_components.fotomoto = function() {
    var b, c;
    var d = function(g) {
        b = g;
        c = b._
    };
    var f = function() {
        c(".jb-bb-btn-fotomoto").click(e)
    };
    var e = function() {
        if (b.config.fotomotostoreid) {
            FOTOMOTO.API.showWindow(10, b.detail_panel.get_current_photo().imageURL)
        } else {
            var g = b.detail_panel.get_current_photo();
            if (g.purchaseURL) {
                window.open(g.purchaseURL, "_blank")
            }
        }
        return false
    };
    var a = function() {
        if (b.utils.is_in_iframe()) {
            return false
        }
        if (!b.utils.is_large_screen_mode(b.config)) {
            return false
        }
        if (b.config.fotomotostoreid) {
            return true
        }
        var g = b.detail_panel.get_current_photo();
        if (g && g.purchaseURL) {
            return true
        }
        return false
    };
    return {
        setContext: d,
        setEvent: f,
        isVisible: a
    }
};
juicebox_registered_components.facebook = function() {
    var b, c;
    var d = function(f) {
        b = f;
        c = b._
    };
    var e = function() {
        c(".jb-bb-btn-facebook").click(a)
    };
    var a = function() {
        var f = b.getGalleryInfo();
        window.open("http://www.facebook.com/sharer.php?u=" + f.shareUrl, "", "menubar=no,toolbar=no,resizable=yes," + b.utils.get_popup_position_string(560, 420));
        return false
    };
    return {
        setContext: d,
        setEvent: e
    }
};
juicebox_registered_components.twitter = function() {
    var a, b;
    var c = function(f) {
        a = f;
        b = a._
    };
    var e = function() {
        b(".jb-bb-btn-twitter").click(d)
    };
    var d = function() {
        var f = a.getGalleryInfo();
        window.open("https://twitter.com/intent/tweet?text=" + f.shareText + "&url=" + f.shareUrl, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes," + a.utils.get_popup_position_string(600, 420));
        return false
    };
    return {
        setContext: c,
        setEvent: e
    }
};
juicebox_registered_components.gplus = function() {
    var b, c;
    var d = function(f) {
        b = f;
        c = b._
    };
    var e = function() {
        c(".jb-bb-btn-gplus").click(a)
    };
    var a = function() {
        var f = b.getGalleryInfo();
        window.open("https://plus.google.com/share?url=" + f.shareUrl, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes," + b.utils.get_popup_position_string(600, 420));
        return false
    };
    return {
        setContext: d,
        setEvent: e
    }
};
juicebox_registered_components.printerest = function() {
    var a, c;
    var d = function(f) {
        a = f;
        c = a._
    };
    var e = function() {
        c(".jb-bb-btn-printerest").click(b)
    };
    var b = function() {
        var f = a.getGalleryInfo();
        window.open("https://pinterest.com/pin/create/bookmarklet/?media=" + f.imageUrl + "&description=" + f.shareText + "&is_video=false&url=" + f.shareUrl + "&next=/pin/create/bookmarklet/%3Fmedia%3D" + f.imageUrl + "%26description%3D" + f.shareText + "%26is_video%3Dfalse%26url%3D" + encodeURI(f.shareUrl), "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes," + a.utils.get_popup_position_string(600, 420));
        return false
    };
    return {
        setContext: d,
        setEvent: e
    }
};
juicebox_registered_components.tumblr = function() {
    var a, c;
    var d = function(f) {
        a = f;
        c = a._
    };
    var e = function() {
        c(".jb-bb-btn-tumblr").click(b)
    };
    var b = function() {
        var f = a.getGalleryInfo();
        window.open("http://www.tumblr.com/share/photo?source=" + f.imageUrl + "&caption=" + f.shareText + "&click_thru=" + f.shareUrl, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes," + a.utils.get_popup_position_string(600, 420));
        return false
    };
    return {
        setContext: d,
        setEvent: e
    }
};
juicebox_registered_components.email = function() {
    var a, c;
    var e = juicebox_lib.jQuery;
    var d = function(g) {
        a = g;
        c = a._
    };
    var f = function() {
        c(".jb-bb-btn-email").click(b)
    };
    var b = function() {
        if (a.config.emailaddress) {
            var h = a.getGalleryInfo();
            var i = e.trim(decodeURI(h.title));
            var j = e.trim(decodeURI(a.config.gallerytitle));
            var g = a.config.languagelistall.rgdimg + " %23" + (h.imagePosition + 1) + (i ? "%3A %22" + encodeURIComponent(i) + "%22" : "") + (a.config.gallerytitle ? " " + a.config.languagelistall.ingrly + " %22" + j + "%22" : "") + " (" + h.shareUrl + ").";
            window.location = "mailto:" + a.config.emailaddress + "?subject=" + encodeURIComponent(a.config.emailsubject) + "&body=" + g
        } else {}
        return false
    };
    return {
        setContext: d,
        setEvent: f
    }
};
juicebox_registered_components.download = function() {
    var a, b;
    var c = function(g) {
        a = g;
        b = a._
    };
    var e = function(g) {
        return a.features.openurl.getTargetUrl(g)
    };
    var f = function() {
        var j = a.detail_panel.get_current_photo();
        var g = a.utils.get_button_bar_button_size(a.config).buttonWidth + "px;";
        var i = a.utils.get_js_folder_url();
        var h = e(j);
        var k = a.utils.convert_to_absolute_path(h);
        var l = i + "juicebox.php?downloading_file=" + encodeURIComponent(k);
        b(".jb-bb-btn-download").html('<a href="' + l + '" style="display:block;position:absolute;top:0;height:100%;width:' + g + '" download></a>')
    };
    var d = function(g) {
        var l = a.detail_panel.get_current_photo();
        var j = a.utils.get_js_folder_url();
        var o = e(l);
        var n = a.utils.convert_to_absolute_path(o);
        var h = j + "juicebox.php?downloading_file=" + encodeURIComponent(n);
        var m = b(".jb-bb-btn-download a");
        var i = a.utils;
        var k = i.is_firefox() || i.is_chrome() || i.is_opera() ? o : h;
        b(".jb-bb-btn-download a").attr({
            href: k
        })
    };
    return {
        setContext: c,
        setEvent: f,
        onImageChange: d
    }
};
juicebox_registered_components.login = function() {
    var b, i;
    var e = juicebox_lib.jQuery;
    var h = function(j) {
        b = j;
        i = b._
    };
    var g = function() {};
    var c = function(k, j) {
        var l = a(j);
        if (!l) {
            return ""
        }
        return k + " " + l
    };
    var a = function(j) {
        if (!j) {
            return ""
        }
        return '<a href="mailto:' + j + "?subject=Password Request&body=Please provide a new password for the image gallery at: " + window.location.href + '">' + j + "</a>"
    };
    var f = function(j, k) {
        e.ajax({
            url: b.utils.get_js_folder_url() + "juicebox.php?get_form_text=true",
            type: "GET",
            error: function() {
                k("Cannot load password.")
            },
            success: function(l) {
                if (l && l.result) {
                    if (l.result == "OK") {
                        j(l.prompt_message, l.signup_message, l.recovery_email)
                    } else {
                        k("Cannot load password.")
                    }
                }
            }
        })
    };
    var d = function(k, n, m) {
        var o = "#" + b.config.containerid;
        var l = "<div style='width:100%;height:100%;text-align:center;'><div id='jb-dialog-login-form'><div id='jb-dialog-login-form-prompt' class='jb-dialog-login-form-text'></div><div class='jb-dialog-input-area jb-dialog-login-form-text'><input id='jb-dialog-login-text' type='password' name='pssword' maxlength='45' placeholder='" + b.config.languagelistall.pwd + "'/><input id='jb-dialog-btn-login-submit' class='jb-dialog-login-form-text' type='submit' value='OK'/></div><div class='jb-login-error-message'>" + b.config.languagelistall.wrongpwd + "</div><div id='jb-dialog-login-form-prompt-message' class='jb-dialog-login-form-text'>To request a new password, send email</div></div></div>";
        var j = function(p) {
            e(o + " .jb-login-error-message").hide();
            var q = e(o + " #jb-dialog-login-text").val();
            e.ajax({
                url: b.utils.get_js_folder_url() + "juicebox.php",
                type: "POST",
                data: "password=" + q,
                error: function() {
                    m()
                },
                success: function(r) {
                    if (r && r.result) {
                        if (r.result == "OK") {
                            k()
                        } else {
                            e(o + " .jb-login-error-message").show()
                        }
                    }
                }
            })
        };
        f(function(t, p, q) {
            var s = b.config.backgroundcolor ? b.utils.format_color(b.config.backgroundcolor) : "#222";
            if (b.isFullScreenMode() && !b.features.fullscreen.switched_2_fullscreen()) {
                e("body, " + o).css({
                    "background-color": s,
                    overflow: "hidden",
                    height: "100%",
                    width: "100%"
                })
            } else {
                e(o).css({
                    "background-color": s
                })
            }
            e(o).html(l);
            var r = e(o + " #jb-dialog-login-form");
            if (b.config.textcolor) {
                r.css({
                    color: b.config.textcolor
                })
            }
            e(o + " #jb-dialog-login-form-prompt").html(t);
            e(o + " #jb-dialog-login-form-prompt-message").html(c(p, q));
            e(o + " #jb-dialog-login-text").focus().keydown(function(u) {
                if (u.keyCode != 13) {
                    return
                }
                j(q)
            });
            e(o + " #jb-dialog-btn-login-submit").click(function() {
                j(q);
                return false
            })
        }, function(p) {
            e(o).html(l);
            e(o + " #jb-dialog-login-form-prompt-message").css({
                color: "red"
            }).html(p)
        })
    };
    return {
        setContext: h,
        setEvent: g,
        showLoginDialog: d
    }
};