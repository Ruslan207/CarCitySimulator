/**
 * Created by anton on 3/8/17.
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Base64, dataUriRegex, performClick, handleFileSelect, requestFileFromLocal, patchLoader;
    return {
        setters:[],
        execute: function() {
            Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) {
                    n = e.charCodeAt(f++);
                    r = e.charCodeAt(f++);
                    i = e.charCodeAt(f++);
                    s = n >> 2;
                    o = (n & 3) << 4 | r >> 4;
                    u = (r & 15) << 2 | i >> 6;
                    a = i & 63;
                    if (isNaN(r)) {
                        u = a = 64;
                    }
                    else if (isNaN(i)) {
                        a = 64;
                    }
                    t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
                } return t; }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) {
                    s = this._keyStr.indexOf(e.charAt(f++));
                    o = this._keyStr.indexOf(e.charAt(f++));
                    u = this._keyStr.indexOf(e.charAt(f++));
                    a = this._keyStr.indexOf(e.charAt(f++));
                    n = s << 2 | o >> 4;
                    r = (o & 15) << 4 | u >> 2;
                    i = (u & 3) << 6 | a;
                    t = t + String.fromCharCode(n);
                    if (u != 64) {
                        t = t + String.fromCharCode(r);
                    }
                    if (a != 64) {
                        t = t + String.fromCharCode(i);
                    }
                } t = Base64._utf8_decode(t); return t; }, _utf8_encode: function (e) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) {
                    var r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r);
                    }
                    else if (r > 127 && r < 2048) {
                        t += String.fromCharCode(r >> 6 | 192);
                        t += String.fromCharCode(r & 63 | 128);
                    }
                    else {
                        t += String.fromCharCode(r >> 12 | 224);
                        t += String.fromCharCode(r >> 6 & 63 | 128);
                        t += String.fromCharCode(r & 63 | 128);
                    }
                } return t; }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) {
                    r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r);
                        n++;
                    }
                    else if (r > 191 && r < 224) {
                        c2 = e.charCodeAt(n + 1);
                        t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                        n += 2;
                    }
                    else {
                        c2 = e.charCodeAt(n + 1);
                        c3 = e.charCodeAt(n + 2);
                        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                        n += 3;
                    }
                } return t; } };
            dataUriRegex = /^data:(.*?)(;base64)?,(.*)$/;
            performClick = function (elem) {
                if (elem && document.createEvent) {
                    var evt = document.createEvent("MouseEvents");
                    evt.initEvent("click", true, false);
                    elem.dispatchEvent(evt);
                }
            };
            handleFileSelect = function (evt, loader, instance, onLoad, onProgress, onError) {
                console.log('start reading from local file');
                var file = evt.target.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    var content = reader.result;
                    console.log('loaded local file');
                    console.log(content.substring(0, 15) + ((reader.result.length > 15) ? '...' : ''));
                    loader.call(instance, reader.result, onLoad, onProgress, onError);
                };
                reader.readAsDataURL(file);
            };
            exports_1("requestFileFromLocal", requestFileFromLocal = function (url, loadFunc, instance, onLoad, onProgress, onError) {
                var input = document.createElement('INPUT');
                input.setAttribute("type", "file");
                input.addEventListener('change', function (evt) {
                    handleFileSelect(evt, loadFunc, instance, onLoad, onProgress, onError);
                });
                // alert('Choose '+url);
                performClick(input);
            });
            exports_1("patchLoader", patchLoader = function (loader, checkWhiteList, loadHandler) {
                var oldLoadFunc = loader.prototype.load;
                loader.prototype.load = function (url, onLoad, onProgress, onError) {
                    var instance = this;
                    console.log('Request ' + url.substring(0, 64) + ((url.length > 15) ? '...' : ''));
                    if ((!checkWhiteList && !url.match(dataUriRegex)) || (checkWhiteList(url))) {
                        if (!loadHandler) {
                            var input = document.createElement('INPUT');
                            input.setAttribute("type", "file");
                            input.addEventListener('change', function (evt) {
                                handleFileSelect(evt, oldLoadFunc, instance, onLoad, onProgress, onError);
                            });
                            performClick(input);
                        }
                        else {
                            loadHandler(url, oldLoadFunc, instance, onLoad, onProgress, onError);
                        }
                    }
                    else {
                        console.log('Use standard load func');
                        return oldLoadFunc(arguments);
                    }
                };
            });
        }
    }
});
//# sourceMappingURL=PatchDialogFileLoader.js.map