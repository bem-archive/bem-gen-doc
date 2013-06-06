var BEMHTML = function() {
  var cache,
      xjst = (function(exports) {
    function $1(__$ctx) {
        var __t = __$ctx._mode;
        if (__t === "default") {
            return $2(__$ctx);
        } else if (__t === "tag") {
            return $116(__$ctx);
        } else if (__t === "mix") {
            return $222(__$ctx);
        } else if (__t === "content") {
            return $242(__$ctx);
        } else if (__t === "attrs") {
            return $287(__$ctx);
        } else if (__t === "js") {
            return $338(__$ctx);
        } else if (__t === "url") {
            if (__$ctx.block === "example") {
                if (!!__$ctx.elem === false) {
                    return $357(__$ctx);
                } else {
                    return $390(__$ctx);
                }
            } else {
                return $390(__$ctx);
            }
        } else if (__t === "bem") {
            return $362(__$ctx);
        } else if (__t === "doctype") {
            if (__$ctx.block === "page") {
                if (!!__$ctx.elem === false) {
                    return $385(__$ctx);
                } else {
                    return $390(__$ctx);
                }
            } else {
                return $390(__$ctx);
            }
        } else {
            return $390(__$ctx);
        }
    }
    function $2(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "block") {
            return $3(__$ctx);
        } else if (__t === "catalogue") {
            return $50(__$ctx);
        } else if (__t === "example") {
            if (!!__$ctx.elem === false) {
                return $71(__$ctx);
            } else {
                return $76(__$ctx);
            }
        } else if (__t === "menu") {
            if (__$ctx.elem === "item") {
                if (!(__$ctx["__$anflg195661543"] !== true) === false) {
                    if (!__$ctx.ctx.url === false) {
                        {
                            "";
                            var __r167 = __$ctx["__$anflg195661543"];
                            __$ctx["__$anflg195661543"] = true;
                            {
                                "";
                                var __r168 = __$ctx.ctx;
                                __$ctx.ctx = {
                                    block: "link",
                                    mix: {
                                        block: "menu",
                                        elem: "item"
                                    },
                                    url: __$ctx.ctx.url,
                                    content: __$ctx.ctx.content
                                };
                                var __r169 = __$ctx._mode;
                                __$ctx._mode = "";
                                $390(__$ctx);
                                __$ctx.ctx = __r168;
                                __$ctx._mode = __r169;
                                "";
                            }
                            __$ctx["__$anflg195661543"] = __r167;
                            "";
                        }
                        return;
                    } else {
                        return $390(__$ctx);
                    }
                } else {
                    return $390(__$ctx);
                }
            } else {
                return $390(__$ctx);
            }
        } else if (__t === "page") {
            if (!(__$ctx["__$anflg292260918"] !== true) === false) {
                if (!!__$ctx.elem === false) {
                    return $101(__$ctx);
                } else {
                    return $390(__$ctx);
                }
            } else {
                return $390(__$ctx);
            }
        } else if (__t === "global") {
            return $106(__$ctx);
        } else {
            return $390(__$ctx);
        }
    }
    function $3(__$ctx) {
        if (!(__$ctx["__$anflg744719696"] !== true) === false) {
            if (!__$ctx._isShowCase === false) {
                if (!!__$ctx.elem === false) {
                    return $7(__$ctx);
                } else {
                    return $12(__$ctx);
                }
            } else {
                return $12(__$ctx);
            }
        } else {
            return $12(__$ctx);
        }
    }
    function $7(__$ctx) {
        var _$59ctx = __$ctx.ctx;
        {
            "";
            var __r216 = __$ctx["__$anflg744719696"];
            __$ctx["__$anflg744719696"] = true;
            {
                "";
                var __r217 = __$ctx.ctx;
                __$ctx.ctx = {
                    block: "catalogue",
                    elem: "item",
                    content: [ {
                        elem: "item-name",
                        url: _$59ctx.url,
                        content: _$59ctx.name
                    }, {
                        elelm: "item-title",
                        content: _$59ctx.title
                    } ]
                };
                var __r218 = __$ctx._mode;
                __$ctx._mode = "";
                $390(__$ctx);
                __$ctx.ctx = __r217;
                __$ctx._mode = __r218;
                "";
            }
            __$ctx["__$anflg744719696"] = __r216;
            "";
        }
        undefined;
        return;
    }
    function $12(__$ctx) {
        var __t = __$ctx.elem;
        if (__t === "mod") {
            if (!(__$ctx["__$anflg572681338"] !== true) === false) {
                if (!__$ctx._isElem === false) {
                    if (!!__$ctx._firstMod === false) {
                        __$ctx._firstMod = __$ctx.ctx;
                        {
                            "";
                            var __r204 = __$ctx["__$anflg572681338"];
                            __$ctx["__$anflg572681338"] = true;
                            {
                                "";
                                var __r205 = __$ctx.ctx;
                                __$ctx.ctx = [ {
                                    block: "headline",
                                    mods: {
                                        level: 5
                                    },
                                    content: "Модификаторы элемента"
                                }, __$ctx.ctx ];
                                var __r206 = __$ctx._mode;
                                __$ctx._mode = "";
                                $390(__$ctx);
                                __$ctx.ctx = __r205;
                                __$ctx._mode = __r206;
                                "";
                            }
                            __$ctx["__$anflg572681338"] = __r204;
                            "";
                        }
                        undefined;
                        return;
                    } else {
                        return $22(__$ctx);
                    }
                } else {
                    return $22(__$ctx);
                }
            } else {
                return $22(__$ctx);
            }
        } else if (__t === "elem") {
            if (!(__$ctx["__$anflg276539626"] !== true) === false) {
                return $32(__$ctx);
            } else {
                if (!(__$ctx["__$anflg416818843"] !== true) === false) {
                    if (!!__$ctx._firstElem === false) {
                        __$ctx._firstElem = __$ctx.ctx;
                        {
                            "";
                            var __r196 = __$ctx["__$anflg416818843"];
                            __$ctx["__$anflg416818843"] = true;
                            {
                                "";
                                var __r197 = __$ctx.ctx;
                                __$ctx.ctx = [ {
                                    block: "headline",
                                    mods: {
                                        level: 3
                                    },
                                    content: "Элементы"
                                }, __$ctx.ctx ];
                                var __r198 = __$ctx._mode;
                                __$ctx._mode = "";
                                $390(__$ctx);
                                __$ctx.ctx = __r197;
                                __$ctx._mode = __r198;
                                "";
                            }
                            __$ctx["__$anflg416818843"] = __r196;
                            "";
                        }
                        undefined;
                        return;
                    } else {
                        return $390(__$ctx);
                    }
                } else {
                    return $390(__$ctx);
                }
            }
        } else if (__t === "mod-val") {
            if (!(__$ctx["__$anflg874647055"] !== true) === false) {
                return $43(__$ctx);
            } else {
                return $390(__$ctx);
            }
        } else if (__t === "note") {
            return null;
            return;
        } else {
            return $390(__$ctx);
        }
    }
    function $22(__$ctx) {
        if (!(__$ctx["__$anflg941156261"] !== true) === false) {
            if (!!__$ctx._firstMod === false) {
                __$ctx._firstMod = __$ctx.ctx;
                {
                    "";
                    var __r188 = __$ctx["__$anflg941156261"];
                    __$ctx["__$anflg941156261"] = true;
                    {
                        "";
                        var __r189 = __$ctx.ctx;
                        __$ctx.ctx = [ {
                            block: "headline",
                            mods: {
                                level: 3
                            },
                            content: "Модификаторы"
                        }, __$ctx.ctx ];
                        var __r190 = __$ctx._mode;
                        __$ctx._mode = "";
                        $390(__$ctx);
                        __$ctx.ctx = __r189;
                        __$ctx._mode = __r190;
                        "";
                    }
                    __$ctx["__$anflg941156261"] = __r188;
                    "";
                }
                undefined;
                return;
            } else {
                return $390(__$ctx);
            }
        } else {
            return $390(__$ctx);
        }
    }
    function $32(__$ctx) {
        var __r199, __r203, __r200, __r201, __r202;
        return "", __r199 = __$ctx["__$anflg276539626"], __$ctx["__$anflg276539626"] = true, __r203 = ("", __r200 = __$ctx._isElem, __$ctx._isElem = true, __r201 = __$ctx._firstMod, __$ctx._firstMod = null, __r202 = $3(__$ctx), __$ctx._isElem = __r200, __$ctx._firstMod = __r201, "", __r202), __$ctx["__$anflg276539626"] = __r199, "", __r203;
        return;
    }
    function $43(__$ctx) {
        var __r191, __r195, __r192, __r193, __r194;
        return "", __r191 = __$ctx["__$anflg874647055"], __$ctx["__$anflg874647055"] = true, __r195 = ("", __r192 = __$ctx.ctx, __$ctx.ctx = {
            tag: "tr",
            content: [ {
                elem: "mod-val-name",
                content: __$ctx.ctx.name
            }, {
                elem: "mod-val-title",
                content: __$ctx.ctx.title
            } ]
        }, __r193 = __$ctx._mode, __$ctx._mode = "", __r194 = $390(__$ctx), __$ctx.ctx = __r192, __$ctx._mode = __r193, "", __r194), __$ctx["__$anflg874647055"] = __r191, "", __r195;
        return;
    }
    function $50(__$ctx) {
        if (__$ctx.elem === "item-name") {
            if (!(__$ctx["__$anflg962430141"] !== true) === false) {
                if (!__$ctx.ctx.url === false) {
                    return $54(__$ctx);
                } else {
                    return $59(__$ctx);
                }
            } else {
                return $59(__$ctx);
            }
        } else {
            return $59(__$ctx);
        }
    }
    function $54(__$ctx) {
        var __r211, __r215, __r212, __r213, __r214;
        return "", __r211 = __$ctx["__$anflg962430141"], __$ctx["__$anflg962430141"] = true, __r215 = ("", __r212 = __$ctx.ctx, __$ctx.ctx = {
            block: "link",
            mix: {
                block: __$ctx.block,
                elem: __$ctx.elem
            },
            url: __$ctx.environ["site-root"] + __$ctx.ctx.url,
            content: __$ctx.ctx.content
        }, __r213 = __$ctx._mode, __$ctx._mode = "", __r214 = $390(__$ctx), __$ctx.ctx = __r212, __$ctx._mode = __r213, "", __r214), __$ctx["__$anflg962430141"] = __r211, "", __r215;
        return;
    }
    function $59(__$ctx) {
        if (!(__$ctx["__$anflg766625576"] !== true) === false) {
            if (!(__$ctx.mods && __$ctx.mods.type === "showcase") === false) {
                if (!!__$ctx.elem === false) {
                    var __r207, __r210, __r208, __r209;
                    return "", __r207 = __$ctx["__$anflg766625576"], __$ctx["__$anflg766625576"] = true, __r210 = ("", __r208 = __$ctx._isShowCase, __$ctx._isShowCase = true, __r209 = $50(__$ctx), __$ctx._isShowCase = __r208, "", __r209), __$ctx["__$anflg766625576"] = __r207, "", __r210;
                    return;
                } else {
                    return $390(__$ctx);
                }
            } else {
                return $390(__$ctx);
            }
        } else {
            return $390(__$ctx);
        }
    }
    function $71(__$ctx) {
        if (!!__$ctx.ctx.url === false) {
            return false;
            return;
        } else {
            return $76(__$ctx);
        }
    }
    function $76(__$ctx) {
        if (!(__$ctx["__$anflg672984227"] !== true) === false) {
            if (!true === false) {
                if (!!__$ctx.elem === false) {
                    return $80(__$ctx);
                } else {
                    return $390(__$ctx);
                }
            } else {
                return $390(__$ctx);
            }
        } else {
            return $390(__$ctx);
        }
    }
    function $80(__$ctx) {
        var __r173, __r174, __r175, __r176, __r177, __r178;
        var _$4aurl = ("", __r173 = __$ctx._mode, __$ctx._mode = "url", __r174 = __$ctx.ctx, __$ctx.ctx = __$ctx.ctx.url, __r175 = $357(__$ctx), __$ctx._mode = __r173, __$ctx.ctx = __r174, "", __r175), _$4asrc = ("", __r176 = __$ctx._mode, __$ctx._mode = "url", __r177 = __$ctx.ctx, __$ctx.ctx = __$ctx.ctx.src, __r178 = $357(__$ctx), __$ctx._mode = __r176, __$ctx.ctx = __r177, "", __r178);
        {
            "";
            var __r179 = __$ctx["__$anflg672984227"];
            __$ctx["__$anflg672984227"] = true;
            {
                "";
                var __r180 = __$ctx._url;
                __$ctx._url = _$4aurl;
                var __r181 = __$ctx._src;
                __$ctx._src = _$4asrc;
                $71(__$ctx);
                __$ctx._url = __r180;
                __$ctx._src = __r181;
                "";
            }
            __$ctx["__$anflg672984227"] = __r179;
            "";
        }
        undefined;
        return;
    }
    function $101(__$ctx) {
        var __r162, __r163;
        var _$39ctx = __$ctx.ctx, _$39doctype = ("", __r162 = __$ctx._mode, __$ctx._mode = "doctype", __r163 = $385(__$ctx), __$ctx._mode = __r162, "", __r163), _$39buf = [ _$39doctype, {
            elem: "root",
            content: [ {
                elem: "head",
                content: [ {
                    elem: "meta",
                    attrs: {
                        charset: "utf-8"
                    }
                }, {
                    elem: "title",
                    content: _$39ctx.title
                }, _$39ctx.meta || "", _$39ctx.hasOwnProperty("favicon") ? {
                    elem: "favicon",
                    url: _$39ctx.favicon
                } : "", {
                    elem: "assets",
                    content: _$39ctx.assets
                } ]
            }, _$39ctx ]
        } ];
        {
            "";
            var __r164 = __$ctx["__$anflg292260918"];
            __$ctx["__$anflg292260918"] = true;
            {
                "";
                var __r165 = __$ctx.ctx;
                __$ctx.ctx = _$39buf;
                var __r166 = __$ctx._mode;
                __$ctx._mode = "";
                $390(__$ctx);
                __$ctx.ctx = __r165;
                __$ctx._mode = __r166;
                "";
            }
            __$ctx["__$anflg292260918"] = __r164;
            "";
        }
        undefined;
        return;
    }
    function $106(__$ctx) {
        if (!(__$ctx["__$anflg724833736"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                var _$36params = __$ctx.ctx.environ, _$36env = __$ctx.environ;
                for (p in _$36params) {
                    _$36params.hasOwnProperty(p) && (_$36env[p] = _$36params[p]);
                }
                {
                    "";
                    var __r161 = __$ctx["__$anflg724833736"];
                    __$ctx["__$anflg724833736"] = true;
                    $106(__$ctx);
                    __$ctx["__$anflg724833736"] = __r161;
                    "";
                }
                undefined;
                return;
            } else {
                return $390(__$ctx);
            }
        } else {
            return $390(__$ctx);
        }
    }
    function $116(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "catalogue") {
            if (__$ctx.elem === "item") {
                return "section";
                return;
            } else {
                return $390(__$ctx);
            }
        } else if (__t === "block") {
            var __t = __$ctx.elem;
            if (__t === "elem-name") {
                return "h4";
                return;
            } else if (__t === "mod-val-title") {
                return "td";
                return;
            } else if (__t === "mod-val-name") {
                return "th";
                return;
            } else if (__t === "mod-val-list") {
                return "table";
                return;
            } else if (__t === "mod-name") {
                return "h4";
                return;
            } else if (__t === "level") {
                return "";
                return;
            } else if (__t === "section") {
                return "h3";
                return;
            } else {
                return $390(__$ctx);
            }
        } else if (__t === "b-link") {
            if (__$ctx.elem === "inner") {
                return "span";
                return;
            } else {
                if (!(__$ctx.mods && __$ctx.mods.pseudo) === false) {
                    if (!!__$ctx.elem === false) {
                        return __$ctx.ctx.url ? "a" : "span";
                        return;
                    } else {
                        return $148(__$ctx);
                    }
                } else {
                    return $148(__$ctx);
                }
            }
        } else if (__t === "example") {
            if (!(__$ctx.elem === "live" || __$ctx.elem === "source") === false) {
                return "iframe";
                return;
            } else {
                if (__$ctx.elem === "title") {
                    return "a";
                    return;
                } else {
                    return $390(__$ctx);
                }
            }
        } else if (__t === "menu") {
            if (__$ctx.elem === "item") {
                return "span";
                return;
            } else {
                return $390(__$ctx);
            }
        } else if (__t === "link") {
            if (!__$ctx.ctx.url === false) {
                if (!!__$ctx.elem === false) {
                    return "a";
                    return;
                } else {
                    return $172(__$ctx);
                }
            } else {
                return $172(__$ctx);
            }
        } else if (__t === "headline") {
            if (!__$ctx.mods.level === false) {
                if (!!__$ctx.elem === false) {
                    return "h" + __$ctx.mods.level;
                    return;
                } else {
                    return $183(__$ctx);
                }
            } else {
                return $183(__$ctx);
            }
        } else if (__t === "page") {
            var __t = __$ctx.elem;
            if (__t === "js") {
                return "script";
                return;
            } else if (__t === "css") {
                if (!__$ctx.ctx.url === false) {
                    return "link";
                    return;
                } else {
                    return "style";
                    return;
                }
            } else if (__t === "assets") {
                return "";
                return;
            } else if (__t === "favicon") {
                return "link";
                return;
            } else if (__t === "head") {
                return "head";
                return;
            } else if (__t === "link") {
                return "link";
                return;
            } else if (__t === "title") {
                return "title";
                return;
            } else if (__t === "meta") {
                return "meta";
                return;
            } else if (__t === "root") {
                return "html";
                return;
            } else {
                if (!!__$ctx.elem === false) {
                    return "body";
                    return;
                } else {
                    return $390(__$ctx);
                }
            }
        } else if (__t === "global") {
            if (!!__$ctx.elem === false) {
                return "";
                return;
            } else {
                return $390(__$ctx);
            }
        } else {
            return $390(__$ctx);
        }
    }
    function $148(__$ctx) {
        if (!!__$ctx.elem === false) {
            return "a";
            return;
        } else {
            return $390(__$ctx);
        }
    }
    function $172(__$ctx) {
        if (!!__$ctx.elem === false) {
            return "span";
            return;
        } else {
            return $390(__$ctx);
        }
    }
    function $183(__$ctx) {
        if (!!__$ctx.elem === false) {
            return "h1";
            return;
        } else {
            return $390(__$ctx);
        }
    }
    function $222(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "block") {
            var __t = __$ctx.elem;
            if (__t === "elem-name" || __t === "mod-name") {
                return {
                    block: "headline",
                    mods: {
                        level: 4
                    }
                };
                return;
            } else if (__t === "description") {
                return {
                    block: "static-text"
                };
                return;
            } else {
                return $390(__$ctx);
            }
        } else if (__t === "headline") {
            if (!!__$ctx.elem === false) {
                if (!!__$ctx.mods.level === false) {
                    return {
                        mods: {
                            level: 1
                        }
                    };
                    return;
                } else {
                    return $390(__$ctx);
                }
            } else {
                return $390(__$ctx);
            }
        } else {
            return $390(__$ctx);
        }
    }
    function $242(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "block") {
            var __t = __$ctx.elem;
            if (__t === "elem") {
                return [ {
                    elem: "elem-name",
                    content: __$ctx.ctx.name
                }, {
                    elem: "elem-title",
                    content: __$ctx.ctx.title
                }, __$ctx.ctx.description, __$ctx.ctx.examples, __$ctx.ctx.content ];
                return;
            } else if (__t === "mod") {
                var _$4tctx = __$ctx.ctx;
                return [ {
                    elem: "mod-name",
                    content: _$4tctx.name
                }, {
                    elem: "mod-title",
                    content: _$4tctx.title
                }, _$4tctx.description, {
                    elem: "mod-val-list",
                    content: _$4tctx.content
                }, _$4tctx.examples ];
                return;
            } else if (__t === "examples") {
                return $248(__$ctx);
            } else if (__t === "level") {
                return [ {
                    elem: "note",
                    content: __$ctx.ctx.name
                }, __$ctx.ctx.content ];
                return;
            } else {
                return $258(__$ctx);
            }
        } else if (__t === "b-link") {
            if (!(__$ctx.mods && __$ctx.mods.pseudo) === false) {
                if (!!__$ctx.ctx._wrap === false) {
                    if (!!__$ctx.elem === false) {
                        if (!!__$ctx.mods.inner === false) {
                            {
                                "";
                                var __r186 = __$ctx._mode;
                                __$ctx._mode = "";
                                var __r187 = __$ctx.ctx;
                                __$ctx.ctx = {
                                    elem: "inner",
                                    content: __$ctx.ctx.content,
                                    _wrap: true
                                };
                                $390(__$ctx);
                                __$ctx._mode = __r186;
                                __$ctx.ctx = __r187;
                                "";
                            }
                            undefined;
                            return;
                        } else {
                            return $390(__$ctx);
                        }
                    } else {
                        return $390(__$ctx);
                    }
                } else {
                    return $390(__$ctx);
                }
            } else {
                return $390(__$ctx);
            }
        } else if (__t === "example") {
            if (__$ctx.elem === "source-switch") {
                return {
                    block: "link",
                    mods: {
                        pseudo: "yes"
                    },
                    mix: {
                        block: "cut"
                    },
                    content: "Исходный код"
                };
                return;
            } else {
                if (!!__$ctx.elem === false) {
                    return [ {
                        elem: "title",
                        url: __$ctx._url,
                        content: __$ctx.ctx.title
                    }, {
                        elem: "source-switch"
                    }, {
                        elem: "source",
                        url: __$ctx._src
                    }, {
                        elem: "live",
                        url: __$ctx._url
                    } ];
                    return;
                } else {
                    return $390(__$ctx);
                }
            }
        } else {
            return $390(__$ctx);
        }
    }
    function $248(__$ctx) {
        if (!__$ctx._.isSimple(__$ctx.ctx.content) === false) {
            __$ctx.ctx.content;
            return;
        } else {
            if (!__$ctx._.isArray(__$ctx.ctx.content) === false) {
                var __r170, __r171, __r172;
                var _$48ctx = __$ctx.ctx, _$48i = 0, _$48l = _$48ctx.content.length, _$48r = [];
                while (_$48i < _$48l) {
                    _$48r.push(("", __r170 = __$ctx.ctx, __r171 = __r170.content, __r170.content = _$48ctx.content[_$48i++], __r172 = $248(__$ctx), __r170.content = __r171, "", __r172));
                }
                return _$48r;
                return;
            } else {
                return $258(__$ctx);
            }
        }
    }
    function $258(__$ctx) {
        if (!!__$ctx.elem === false) {
            return [ {
                elem: "name",
                content: __$ctx.ctx.name
            }, {
                elem: "title",
                content: __$ctx.ctx.title
            }, __$ctx.ctx.description && {
                elem: "description",
                content: __$ctx.ctx.description
            }, __$ctx.ctx.examples, __$ctx.ctx.content ];
            return;
        } else {
            return $390(__$ctx);
        }
    }
    function $287(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "b-link") {
            if (!(__$ctx.mods && __$ctx.mods.pseudo) === false) {
                if (!!__$ctx.elem === false) {
                    if (!!__$ctx.ctx.url === false) {
                        return {};
                        return;
                    } else {
                        return $297(__$ctx);
                    }
                } else {
                    return $297(__$ctx);
                }
            } else {
                return $297(__$ctx);
            }
        } else if (__t === "example") {
            if (!(__$ctx.elem === "live" || __$ctx.elem === "source") === false) {
                return {
                    src: __$ctx.ctx.url
                };
                return;
            } else {
                if (__$ctx.elem === "title") {
                    return {
                        href: __$ctx.ctx.url,
                        target: "_blank"
                    };
                    return;
                } else {
                    if (!!__$ctx.elem === false) {
                        return {
                            id: __$ctx.ctx.id
                        };
                        return;
                    } else {
                        return $390(__$ctx);
                    }
                }
            }
        } else if (__t === "link") {
            if (!__$ctx.ctx.url === false) {
                if (!!__$ctx.elem === false) {
                    return {
                        href: __$ctx.ctx.url
                    };
                    return;
                } else {
                    return $390(__$ctx);
                }
            } else {
                return $390(__$ctx);
            }
        } else if (__t === "page") {
            var __t = __$ctx.elem;
            if (__t === "js") {
                if (!__$ctx.ctx.url === false) {
                    return {
                        src: __$ctx.ctx.url
                    };
                    return;
                } else {
                    return $390(__$ctx);
                }
            } else if (__t === "css") {
                if (!__$ctx.ctx.url === false) {
                    return {
                        rel: "stylesheet",
                        href: __$ctx.ctx.url
                    };
                    return;
                } else {
                    return $390(__$ctx);
                }
            } else if (__t === "favicon") {
                return {
                    rel: "shortcut icon",
                    href: __$ctx.ctx.url
                };
                return;
            } else {
                return $390(__$ctx);
            }
        } else {
            return $390(__$ctx);
        }
    }
    function $297(__$ctx) {
        if (!!__$ctx.elem === false) {
            return $299(__$ctx);
        } else {
            return $390(__$ctx);
        }
    }
    function $299(__$ctx) {
        var __r182, __r183, __r184, __r185;
        var _$4mctx = __$ctx.ctx, _$4mprops = [ "title", "target" ], _$4mp = typeof _$4mctx.url, _$4ma = {
            href: _$4mp === "undefined" || _$4mp === "string" ? _$4mctx.url : (_$4mp = [], "", __r182 = __$ctx._buf, __$ctx._buf = _$4mp, __r183 = __$ctx._mode, __$ctx._mode = "", __r184 = __$ctx.ctx, __$ctx.ctx = _$4mctx.url, __r185 = $390(__$ctx), __$ctx._buf = __r182, __$ctx._mode = __r183, __$ctx.ctx = __r184, "", __r185, _$4mp.join(""))
        };
        while (_$4mp = _$4mprops.pop()) {
            _$4mctx[_$4mp] && (_$4ma[_$4mp] = _$4mctx[_$4mp]);
        }
        return _$4ma;
        return;
    }
    function $338(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "b-link") {
            if (!(__$ctx.mods && __$ctx.mods.pseudo) === false) {
                if (!!__$ctx.elem === false) {
                    return true;
                    return;
                } else {
                    return $390(__$ctx);
                }
            } else {
                return $390(__$ctx);
            }
        } else if (__t === "example") {
            if (!!__$ctx.elem === false) {
                return true;
                return;
            } else {
                return $390(__$ctx);
            }
        } else {
            return $390(__$ctx);
        }
    }
    function $357(__$ctx) {
        return __$ctx.environ["site-root"] + "/examples/examples.sets/" + __$ctx.ctx;
        return;
    }
    function $362(__$ctx) {
        if (__$ctx.block === "page") {
            var __t = __$ctx.elem;
            if (__t === "js" || __t === "css" || __t === "assets" || __t === "head" || __t === "link" || __t === "title" || __t === "meta") {
                return false;
                return;
            } else {
                return $390(__$ctx);
            }
        } else {
            return $390(__$ctx);
        }
    }
    function $385(__$ctx) {
        return __$ctx.ctx.doctype || "<!doctype html>";
        return;
    }
    function $390(__$ctx) {
        if (!__$ctx._start === false) {
            if (!!__$ctx.environ === false) {
                __$ctx.environ = {};
                applyc(__$ctx);
                undefined;
                return;
            } else {
                return $396(__$ctx);
            }
        } else {
            return $396(__$ctx);
        }
    }
    function $396(__$ctx) {
        var __t = __$ctx._mode;
        if (__t === "content") {
            return __$ctx.ctx.content;
            return;
        } else if (__t === "mix" || __t === "bem" || __t === "jsAttr" || __t === "js" || __t === "cls" || __t === "attrs" || __t === "tag") {
            return undefined;
            return;
        } else {
            if (!__$ctx.ctx === false) {
                if (!__$ctx.ctx.link === false) {
                    if (!!__$ctx._.isSimple(__$ctx.ctx) === false) {
                        return $417(__$ctx);
                    } else {
                        return $422(__$ctx);
                    }
                } else {
                    return $422(__$ctx);
                }
            } else {
                return $422(__$ctx);
            }
        }
    }
    function $417(__$ctx) {
        var __r159, __r160;
        function _$2vfollow() {
            if (this.ctx.link === "no-follow") {
                return undefined;
            } else {
                undefined;
            }
            var data = this._links[this.ctx.link];
            return "", __r159 = this.ctx, this.ctx = data, __r160 = $1(__$ctx), this.ctx = __r159, "", __r160;
        }
        if (!cache || !__$ctx._cacheLog) {
            return _$2vfollow.call(__$ctx);
        } else {
            undefined;
        }
        var _$2vcontents = __$ctx._buf.slice(__$ctx._cachePos).join("");
        __$ctx._cachePos = __$ctx._buf.length;
        __$ctx._cacheLog.push(_$2vcontents, {
            log: __$ctx._localLog.slice(),
            link: __$ctx.ctx.link
        });
        var _$2vres = _$2vfollow.call(__$ctx);
        __$ctx._cachePos = __$ctx._buf.length;
        return _$2vres;
        return;
    }
    function $422(__$ctx) {
        if (!cache === false) {
            if (!__$ctx.ctx === false) {
                if (!__$ctx.ctx.cache === false) {
                    return $426(__$ctx);
                } else {
                    return $431(__$ctx);
                }
            } else {
                return $431(__$ctx);
            }
        } else {
            return $431(__$ctx);
        }
    }
    function $426(__$ctx) {
        var _$2ucached;
        function _$2usetProperty(obj, key, value) {
            if (key.length === 0) {
                return undefined;
            } else {
                undefined;
            }
            if (Array.isArray(value)) {
                var target = obj;
                for (var i = 0; i < value.length - 1; i++) {
                    target = target[value[i]];
                }
                value = target[value[i]];
            } else {
                undefined;
            }
            var host = obj, previous;
            for (var i = 0; i < key.length - 1; i++) {
                host = host[key[i]];
            }
            previous = host[key[i]];
            host[key[i]] = value;
            return previous;
        }
        if (_$2ucached = cache.get(__$ctx.ctx.cache)) {
            var _$2uoldLinks = __$ctx._links;
            if (__$ctx.ctx.links) {
                __$ctx._links = __$ctx.ctx.links;
            } else {
                undefined;
            }
            for (var _$2ui = 0; _$2ui < _$2ucached.log.length; _$2ui++) {
                if (typeof _$2ucached.log[_$2ui] === "string") {
                    __$ctx._buf.push(_$2ucached.log[_$2ui]);
                    continue;
                } else {
                    undefined;
                }
                var _$2ulog = _$2ucached.log[_$2ui], _$2ureverseLog;
                _$2ureverseLog = _$2ulog.log.map(function(entry) {
                    return {
                        key: entry[0],
                        value: _$2usetProperty(this, entry[0], entry[1])
                    };
                }, __$ctx).reverse();
                {
                    "";
                    var __r149 = __$ctx.ctx, __r150 = __r149.cache;
                    __r149.cache = null;
                    var __r151 = __$ctx._cacheLog;
                    __$ctx._cacheLog = null;
                    var __r152 = __$ctx.ctx, __r153 = __r152.link;
                    __r152.link = _$2ulog.link;
                    $1(__$ctx);
                    __r149.cache = __r150;
                    __$ctx._cacheLog = __r151;
                    __r152.link = __r153;
                    "";
                }
                undefined;
                _$2ureverseLog.forEach(function(entry) {
                    _$2usetProperty(this, entry.key, entry.value);
                }, __$ctx);
            }
            __$ctx._links = _$2uoldLinks;
            return _$2ucached.res;
        } else {
            undefined;
        }
        var _$2ucacheLog = [], _$2ures;
        {
            "";
            var __r154 = __$ctx.ctx, __r155 = __r154.cache;
            __r154.cache = null;
            var __r156 = __$ctx._cachePos;
            __$ctx._cachePos = __$ctx._buf.length;
            var __r157 = __$ctx._cacheLog;
            __$ctx._cacheLog = _$2ucacheLog;
            var __r158 = __$ctx._localLog;
            __$ctx._localLog = [];
            {
                _$2ures = $1(__$ctx);
                var _$2utail = __$ctx._buf.slice(__$ctx._cachePos).join("");
                if (_$2utail) {
                    _$2ucacheLog.push(_$2utail);
                } else {
                    undefined;
                }
            }
            __r154.cache = __r155;
            __$ctx._cachePos = __r156;
            __$ctx._cacheLog = __r157;
            __$ctx._localLog = __r158;
            "";
        }
        cache.set(__$ctx.ctx.cache, {
            log: _$2ucacheLog,
            res: _$2ures
        });
        return _$2ures;
        return;
    }
    function $431(__$ctx) {
        var __t = __$ctx._mode;
        if (__t === "default") {
            return $433(__$ctx);
        } else if (__t === "") {
            if (!__$ctx._.isSimple(__$ctx.ctx) === false) {
                __$ctx._listLength--;
                var _$2sctx = __$ctx.ctx;
                (_$2sctx && _$2sctx !== true || _$2sctx === 0) && __$ctx._buf.push(_$2sctx);
                return;
            } else {
                if (!!__$ctx.ctx === false) {
                    __$ctx._listLength--;
                    return;
                } else {
                    if (!__$ctx._.isArray(__$ctx.ctx) === false) {
                        return $442(__$ctx);
                    } else {
                        if (!true === false) {
                            return $445(__$ctx);
                        } else {
                            return $e(__$ctx);
                        }
                    }
                }
            }
        } else {
            return $e(__$ctx);
        }
    }
    function $433(__$ctx) {
        var __r132, __r120, __r124, __r125, __r126, __r127, __r128, __r129, __r130, __r131, __r121, __r133, __r134, __r135, __r138, __r139, __r140, __r141, __r142, __r143;
        var _$2t_this = __$ctx, _$2tBEM_ = _$2t_this.BEM, _$2tv = __$ctx.ctx, _$2tbuf = __$ctx._buf, _$2ttag;
        _$2ttag = ("", __r120 = __$ctx._mode, __$ctx._mode = "tag", __r121 = $116(__$ctx), __$ctx._mode = __r120, "", __r121);
        typeof _$2ttag != "undefined" || (_$2ttag = _$2tv.tag);
        typeof _$2ttag != "undefined" || (_$2ttag = "div");
        if (_$2ttag) {
            var _$2tjsParams, _$2tjs;
            if (__$ctx.block && _$2tv.js !== false) {
                _$2tjs = ("", __r124 = __$ctx._mode, __$ctx._mode = "js", __r125 = $338(__$ctx), __$ctx._mode = __r124, "", __r125);
                _$2tjs = _$2tjs ? __$ctx._.extend(_$2tv.js, _$2tjs === true ? {} : _$2tjs) : _$2tv.js === true ? {} : _$2tv.js;
                _$2tjs && ((_$2tjsParams = {})[_$2tBEM_.INTERNAL.buildClass(__$ctx.block, _$2tv.elem)] = _$2tjs);
            } else {
                undefined;
            }
            _$2tbuf.push("<", _$2ttag);
            var _$2tisBEM = ("", __r126 = __$ctx._mode, __$ctx._mode = "bem", __r127 = $362(__$ctx), __$ctx._mode = __r126, "", __r127);
            typeof _$2tisBEM != "undefined" || (_$2tisBEM = typeof _$2tv.bem != "undefined" ? _$2tv.bem : _$2tv.block || _$2tv.elem);
            var _$2tcls = ("", __r128 = __$ctx._mode, __$ctx._mode = "cls", __r129 = $390(__$ctx), __$ctx._mode = __r128, "", __r129);
            _$2tcls || (_$2tcls = _$2tv.cls);
            var _$2taddJSInitClass = _$2tv.block && _$2tjsParams;
            if (_$2tisBEM || _$2tcls) {
                _$2tbuf.push(' class="');
                if (_$2tisBEM) {
                    _$2tBEM_.INTERNAL.buildClasses(__$ctx.block, _$2tv.elem, _$2tv.elemMods || _$2tv.mods, _$2tbuf);
                    var _$2tmix = ("", __r130 = __$ctx._mode, __$ctx._mode = "mix", __r131 = $222(__$ctx), __$ctx._mode = __r130, "", __r131);
                    _$2tv.mix && (_$2tmix = _$2tmix ? _$2tmix.concat(_$2tv.mix) : _$2tv.mix);
                    if (_$2tmix) {
                        var _$2tvisited = {};
                        function _$2tvisitedKey(block, elem) {
                            return (block || "") + "__" + (elem || "");
                        }
                        _$2tvisited[_$2tvisitedKey(__$ctx.block, __$ctx.elem)] = true;
                        if (!__$ctx._.isArray(_$2tmix)) {
                            _$2tmix = [ _$2tmix ];
                        } else {
                            undefined;
                        }
                        for (var _$2ti = 0; _$2ti < _$2tmix.length; _$2ti++) {
                            var _$2tmixItem = _$2tmix[_$2ti], _$2thasItem = _$2tmixItem.block || _$2tmixItem.elem, _$2tblock = _$2tmixItem.block || _$2tmixItem._block || _$2t_this.block, _$2telem = _$2tmixItem.elem || _$2tmixItem._elem || _$2t_this.elem;
                            _$2thasItem && _$2tbuf.push(" ");
                            _$2tBEM_.INTERNAL[_$2thasItem ? "buildClasses" : "buildModsClasses"](_$2tblock, _$2tmixItem.elem || _$2tmixItem._elem || (_$2tmixItem.block ? undefined : _$2t_this.elem), _$2tmixItem.elemMods || _$2tmixItem.mods, _$2tbuf);
                            if (_$2tmixItem.js) {
                                (_$2tjsParams || (_$2tjsParams = {}))[_$2tBEM_.INTERNAL.buildClass(_$2tblock, _$2tmixItem.elem)] = _$2tmixItem.js === true ? {} : _$2tmixItem.js;
                                _$2taddJSInitClass || (_$2taddJSInitClass = _$2tblock && !_$2tmixItem.elem);
                            } else {
                                undefined;
                            }
                            if (_$2thasItem && !_$2tvisited[_$2tvisitedKey(_$2tblock, _$2telem)]) {
                                _$2tvisited[_$2tvisitedKey(_$2tblock, _$2telem)] = true;
                                var _$2tnestedMix = ("", __r132 = __$ctx.block, __$ctx.block = _$2tblock, __r133 = __$ctx.elem, __$ctx.elem = _$2telem, __r134 = __$ctx._mode, __$ctx._mode = "mix", __r135 = $222(__$ctx), __$ctx.block = __r132, __$ctx.elem = __r133, __$ctx._mode = __r134, "", __r135);
                                if (_$2tnestedMix) {
                                    for (var _$2tj = 0; _$2tj < _$2tnestedMix.length; _$2tj++) {
                                        var _$2tnestedItem = _$2tnestedMix[_$2tj];
                                        if (!_$2tnestedItem.block && !_$2tnestedItem.elem || !_$2tvisited[_$2tvisitedKey(_$2tnestedItem.block, _$2tnestedItem.elem)]) {
                                            _$2tnestedItem._block = _$2tblock;
                                            _$2tnestedItem._elem = _$2telem;
                                            _$2tmix.splice(_$2ti + 1, 0, _$2tnestedItem);
                                        } else {
                                            undefined;
                                        }
                                    }
                                } else {
                                    undefined;
                                }
                            } else {
                                undefined;
                            }
                        }
                    } else {
                        undefined;
                    }
                } else {
                    undefined;
                }
                _$2tcls && _$2tbuf.push(_$2tisBEM ? " " : "", _$2tcls);
                _$2taddJSInitClass && _$2tbuf.push(" i-bem");
                _$2tbuf.push('"');
            } else {
                undefined;
            }
            if (_$2tjsParams) {
                var _$2tjsAttr = ("", __r138 = __$ctx._mode, __$ctx._mode = "jsAttr", __r139 = $390(__$ctx), __$ctx._mode = __r138, "", __r139);
                _$2tbuf.push(" ", _$2tjsAttr || "onclick", '="return ', __$ctx._.attrEscape(JSON.stringify(_$2tjsParams)), '"');
            } else {
                undefined;
            }
            var _$2tattrs = ("", __r140 = __$ctx._mode, __$ctx._mode = "attrs", __r141 = $287(__$ctx), __$ctx._mode = __r140, "", __r141);
            _$2tattrs = __$ctx._.extend(_$2tattrs, _$2tv.attrs);
            if (_$2tattrs) {
                var _$2tname;
                for (_$2tname in _$2tattrs) {
                    if (_$2tattrs[_$2tname] === undefined) {
                        continue;
                    } else {
                        undefined;
                    }
                    _$2tbuf.push(" ", _$2tname, '="', __$ctx._.attrEscape(_$2tattrs[_$2tname]), '"');
                }
            } else {
                undefined;
            }
        } else {
            undefined;
        }
        if (__$ctx._.isShortTag(_$2ttag)) {
            _$2tbuf.push("/>");
        } else {
            _$2ttag && _$2tbuf.push(">");
            var _$2tcontent = ("", __r142 = __$ctx._mode, __$ctx._mode = "content", __r143 = $242(__$ctx), __$ctx._mode = __r142, "", __r143);
            if (_$2tcontent || _$2tcontent === 0) {
                var _$2tisBEM = __$ctx.block || __$ctx.elem;
                {
                    "";
                    var __r144 = __$ctx._notNewList;
                    __$ctx._notNewList = false;
                    var __r145 = __$ctx.position;
                    __$ctx.position = _$2tisBEM ? 1 : __$ctx.position;
                    var __r146 = __$ctx._listLength;
                    __$ctx._listLength = _$2tisBEM ? 1 : __$ctx._listLength;
                    var __r147 = __$ctx.ctx;
                    __$ctx.ctx = _$2tcontent;
                    var __r148 = __$ctx._mode;
                    __$ctx._mode = "";
                    $390(__$ctx);
                    __$ctx._notNewList = __r144;
                    __$ctx.position = __r145;
                    __$ctx._listLength = __r146;
                    __$ctx.ctx = __r147;
                    __$ctx._mode = __r148;
                    "";
                }
                undefined;
            } else {
                undefined;
            }
            _$2ttag && _$2tbuf.push("</", _$2ttag, ">");
        }
        return;
    }
    function $442(__$ctx) {
        var _$2qv = __$ctx.ctx, _$2ql = _$2qv.length, _$2qi = 0, _$2qprevPos = __$ctx.position, _$2qprevNotNewList = __$ctx._notNewList;
        if (_$2qprevNotNewList) {
            __$ctx._listLength += _$2ql - 1;
        } else {
            __$ctx.position = 0;
            __$ctx._listLength = _$2ql;
        }
        __$ctx._notNewList = true;
        while (_$2qi < _$2ql) {
            var _$2qnewCtx = _$2qv[_$2qi++];
            {
                "";
                var __r119 = __$ctx.ctx;
                __$ctx.ctx = _$2qnewCtx === null ? "" : _$2qnewCtx;
                $390(__$ctx);
                __$ctx.ctx = __r119;
                "";
            }
            undefined;
        }
        _$2qprevNotNewList || (__$ctx.position = _$2qprevPos);
        return;
    }
    function $445(__$ctx) {
        var _$2pvBlock = __$ctx.ctx.block, _$2pvElem = __$ctx.ctx.elem, _$2pblock = __$ctx._currBlock || __$ctx.block;
        __$ctx.ctx || (__$ctx.ctx = {});
        {
            "";
            var __r112 = __$ctx._mode;
            __$ctx._mode = "default";
            var __r113 = __$ctx._links;
            __$ctx._links = __$ctx.ctx.links || __$ctx._links;
            var __r114 = __$ctx.block;
            __$ctx.block = _$2pvBlock || (_$2pvElem ? _$2pblock : undefined);
            var __r115 = __$ctx._currBlock;
            __$ctx._currBlock = _$2pvBlock || _$2pvElem ? undefined : _$2pblock;
            var __r116 = __$ctx.elem;
            __$ctx.elem = __$ctx.ctx.elem;
            var __r117 = __$ctx.mods;
            __$ctx.mods = (_$2pvBlock ? __$ctx.ctx.mods : __$ctx.mods) || {};
            var __r118 = __$ctx.elemMods;
            __$ctx.elemMods = __$ctx.ctx.elemMods || {};
            {
                __$ctx.block || __$ctx.elem ? __$ctx.position = (__$ctx.position || 0) + 1 : __$ctx._listLength--;
                $2(__$ctx);
                undefined;
            }
            __$ctx._mode = __r112;
            __$ctx._links = __r113;
            __$ctx.block = __r114;
            __$ctx._currBlock = __r115;
            __$ctx.elem = __r116;
            __$ctx.mods = __r117;
            __$ctx.elemMods = __r118;
            "";
        }
        return;
    }
    function $e(__$ctx) {
        throw new Error(this);
        return;
    }
    !function() {
        var BEM_ = {}, toString = Object.prototype.toString, SHORT_TAGS = {
            area: 1,
            base: 1,
            br: 1,
            col: 1,
            command: 1,
            embed: 1,
            hr: 1,
            img: 1,
            input: 1,
            keygen: 1,
            link: 1,
            meta: 1,
            param: 1,
            source: 1,
            wbr: 1
        };
        (function(BEM, undefined) {
            var MOD_DELIM = "_", ELEM_DELIM = "__", NAME_PATTERN = "[a-zA-Z0-9-]+";
            function buildModPostfix(modName, modVal, buffer) {
                buffer.push(MOD_DELIM, modName, MOD_DELIM, modVal);
            }
            function buildBlockClass(name, modName, modVal, buffer) {
                buffer.push(name);
                modVal && buildModPostfix(modName, modVal, buffer);
            }
            function buildElemClass(block, name, modName, modVal, buffer) {
                buildBlockClass(block, undefined, undefined, buffer);
                buffer.push(ELEM_DELIM, name);
                modVal && buildModPostfix(modName, modVal, buffer);
            }
            BEM.INTERNAL = {
                NAME_PATTERN: NAME_PATTERN,
                MOD_DELIM: MOD_DELIM,
                ELEM_DELIM: ELEM_DELIM,
                buildModPostfix: function(modName, modVal, buffer) {
                    var res = buffer || [];
                    buildModPostfix(modName, modVal, res);
                    return buffer ? res : res.join("");
                },
                buildClass: function(block, elem, modName, modVal, buffer) {
                    var typeOf = typeof modName;
                    if (typeOf == "string") {
                        if (typeof modVal != "string") {
                            buffer = modVal;
                            modVal = modName;
                            modName = elem;
                            elem = undefined;
                        } else {
                            undefined;
                        }
                    } else {
                        if (typeOf != "undefined") {
                            buffer = modName;
                            modName = undefined;
                        } else {
                            if (elem && typeof elem != "string") {
                                buffer = elem;
                                elem = undefined;
                            } else {
                                undefined;
                            }
                        }
                    }
                    if (!(elem || modName || buffer)) {
                        return block;
                    } else {
                        undefined;
                    }
                    var res = buffer || [];
                    elem ? buildElemClass(block, elem, modName, modVal, res) : buildBlockClass(block, modName, modVal, res);
                    return buffer ? res : res.join("");
                },
                buildModsClasses: function(block, elem, mods, buffer) {
                    var res = buffer || [];
                    if (mods) {
                        var modName;
                        for (modName in mods) {
                            if (!mods.hasOwnProperty(modName)) {
                                continue;
                            } else {
                                undefined;
                            }
                            var modVal = mods[modName];
                            if (modVal == null) {
                                continue;
                            } else {
                                undefined;
                            }
                            modVal = mods[modName] + "";
                            if (!modVal) {
                                continue;
                            } else {
                                undefined;
                            }
                            res.push(" ");
                            if (elem) {
                                buildElemClass(block, elem, modName, modVal, res);
                            } else {
                                buildBlockClass(block, modName, modVal, res);
                            }
                        }
                    } else {
                        undefined;
                    }
                    return buffer ? res : res.join("");
                },
                buildClasses: function(block, elem, mods, buffer) {
                    var res = buffer || [];
                    elem ? buildElemClass(block, elem, undefined, undefined, res) : buildBlockClass(block, undefined, undefined, res);
                    this.buildModsClasses(block, elem, mods, buffer);
                    return buffer ? res : res.join("");
                }
            };
        })(BEM_);
        var buildEscape = function() {
            var ts = {
                '"': "&quot;",
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;"
            }, f = function(t) {
                return ts[t] || t;
            };
            return function(r) {
                r = new RegExp(r, "g");
                return function(s) {
                    return ("" + s).replace(r, f);
                };
            };
        }();
        function BEMContext(context, apply_) {
            this.ctx = typeof context === null ? "" : context;
            this.apply = apply_;
            this._buf = [];
            this._ = this;
            this._start = true;
            this._mode = "";
            this._listLength = 0;
            this._notNewList = false;
            this.position = 0;
            this.block = undefined;
            this.elem = undefined;
            this.mods = undefined;
            this.elemMods = undefined;
        }
        BEMContext.prototype.isArray = function isArray(obj) {
            return toString.call(obj) === "[object Array]";
        };
        BEMContext.prototype.isSimple = function isSimple(obj) {
            var t = typeof obj;
            return t === "string" || t === "number" || t === "boolean";
        };
        BEMContext.prototype.isShortTag = function isShortTag(t) {
            return SHORT_TAGS.hasOwnProperty(t);
        };
        BEMContext.prototype.extend = function extend(o1, o2) {
            if (!o1 || !o2) {
                return o1 || o2;
            } else {
                undefined;
            }
            var res = {}, n;
            for (n in o1) {
                o1.hasOwnProperty(n) && (res[n] = o1[n]);
            }
            for (n in o2) {
                o2.hasOwnProperty(n) && (res[n] = o2[n]);
            }
            return res;
        };
        BEMContext.prototype.identify = function() {
            var cnt = 0, id = BEM_["__id"] = +(new Date), expando = "__" + id, get = function() {
                return "uniq" + id + ++cnt;
            };
            return function(obj, onlyGet) {
                if (!obj) {
                    return get();
                } else {
                    undefined;
                }
                if (onlyGet || obj[expando]) {
                    return obj[expando];
                } else {
                    return obj[expando] = get();
                }
            };
        }();
        BEMContext.prototype.xmlEscape = buildEscape("[&<>]");
        BEMContext.prototype.attrEscape = buildEscape('["&<>]');
        BEMContext.prototype.BEM = BEM_;
        BEMContext.prototype.isFirst = function isFirst() {
            return this.position === 1;
        };
        BEMContext.prototype.isLast = function isLast() {
            return this.position === this._listLength;
        };
        BEMContext.prototype.generateId = function generateId() {
            return this.identify(this.ctx);
        };
        exports.apply = BEMContext.apply = function _apply() {
            var ctx = new BEMContext(this, apply);
            ctx.apply();
            return ctx._buf.join("");
        };
    }();
    return exports;
    exports.apply = apply;
    function apply(ctx) {
        return applyc(ctx || this);
    }
    function applyc(__$ctx) {
        return $1(__$ctx);
    }
    return exports;
})(typeof exports === "undefined" ? {} : exports);;
  return function(options) {
    if (!options) options = {};
    cache = options.cache;
    return xjst.apply.call(
[this]
    );
  };
}();
typeof exports === "undefined" || (exports.BEMHTML = BEMHTML);