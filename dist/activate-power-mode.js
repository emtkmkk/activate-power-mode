(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object')
        exports["POWERMODE"] = factory();
    else
        root["POWERMODE"] = factory();
})(this, function() {
    return /******/ (function(modules) { // webpackBootstrap
        /******/  // モジュールキャッシュ
        /******/  var installedModules = {};

        /******/  // require関数
        /******/  function __webpack_require__(moduleId) {

            /******/ 		// モジュールがキャッシュにあるか確認
            /******/ 		if (installedModules[moduleId])
                /******/ 			return installedModules[moduleId].exports;

            /******/ 		// 新しいモジュールを作成し、キャッシュに保存
            /******/ 		var module = installedModules[moduleId] = {
                /******/ 			exports: {},
                /******/ 			id: moduleId,
                /******/ 			loaded: false
                /******/ 		};

            /******/ 		// モジュール関数を実行
            /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

            /******/ 		// モジュールを読み込み済みとしてフラグを立てる
            /******/ 		module.loaded = true;

            /******/ 		// モジュールのエクスポートを返す
            /******/ 		return module.exports;
            /******/ 	}

        /******/ 	// モジュールオブジェクトを公開
        /******/ 	__webpack_require__.m = modules;

        /******/ 	// モジュールキャッシュを公開
        /******/ 	__webpack_require__.c = installedModules;

        /******/ 	// 公開パスを設定
        /******/ 	__webpack_require__.p = "";

        /******/ 	// エントリーモジュールを読み込み、エクスポートを返す
        /******/ 	return __webpack_require__(0);
        /******/ })
    /************************************************************************/
    /******/ ([
        /* 0 */
        /***/ (function(module, exports, __webpack_require__) {

            'use strict';

            // キャンバスを作成
            var canvas = document.createElement('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9999999;background:transparent;';
            canvas.style.backgroundColor = 'transparent';

            // ウィンドウリサイズ時にキャンバスサイズを更新
            window.addEventListener('resize', function () {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });

            // キャンバスをドキュメントに追加
            document.body.appendChild(canvas);

            var context = canvas.getContext('2d');
            var particles = [];
            var particlePointer = 0;
            var rendering = false;

            // 派手さの設定オプション
            var settings = {
                particleMinCount: 10, // パーティクルの最低数
                particleMaxCount: 25, // パーティクルの最大数
                shakeMinIntensity: 1, // 画面の揺れの最低強度
                shakeMaxIntensity: 5, // 画面の揺れの最高強度
                particleSize: 3, // パーティクルのサイズ
            };

            POWERMODE.shake = true;

            // ランダムな値を生成する関数
            function getRandom(min, max) {
                return Math.random() * (max - min) + min;
            }

            // 色を取得する関数
            function getColor(el) {
                if (POWERMODE.colorful) {
                    var u = getRandom(0, 360);
                    return 'hsla(' + getRandom(u - 10, u + 10) + ', 100%, ' + getRandom(50, 80) + '%, ' + 1 + ')';
                } else {
                    return window.getComputedStyle(el).color;
                }
            }

            // キャレットの位置を取得する関数
            function getCaret() {
                var el = document.activeElement;
                var bcr;
                if (el.tagName === 'TEXTAREA' ||
                    (el.tagName === 'INPUT' && (el.getAttribute('type') === 'text' || el.getAttribute('type') === 'search' || el.getAttribute('type') == null))) {
                    var offset = __webpack_require__(1)(el, el.selectionEnd);
                    bcr = el.getBoundingClientRect();
                    return {
                        x: offset.left + bcr.left,
                        y: offset.top + bcr.top,
                        color: getColor(el)
                    };
                }
                var selection = window.getSelection();
                if (selection.rangeCount) {
                    var range = selection.getRangeAt(0);
                    var startNode = range.startContainer;
                    if (startNode.nodeType === document.TEXT_NODE) {
                        startNode = startNode.parentNode;
                    }
                    bcr = range.getBoundingClientRect();
                    return {
                        x: bcr.left,
                        y: bcr.top,
                        color: getColor(startNode)
                    };
                }
                return { x: 0, y: 0, color: 'transparent' };
            }

            // パーティクルを作成する関数
            function createParticle(x, y, color) {
                return {
                    x: x,
                    y: y,
                    alpha: 1,
                    color: color,
                    velocity: {
                        x: -1 + Math.random() * 2,
                        y: -3.5 + Math.random() * 2,
                    }
                };
            }

            // POWERMODEのメイン関数
            function POWERMODE() {
                { // パーティクルを生成
                    var caret = getCaret();
                    var numParticles = Math.round(getRandom(settings.particleMinCount, settings.particleMaxCount));
                    while (numParticles--) {
                        particles[particlePointer] = createParticle(caret.x, caret.y, caret.color);
                        particlePointer = (particlePointer + 1) % 500;
                    }
                }
                { // 画面を揺らす
                    if (POWERMODE.shake) {
                        var intensity = getRandom(settings.shakeMinIntensity, settings.shakeMaxIntensity); // 揺れの強度
                        var x = intensity * (Math.random() > 0.5 ? -1 : 1);
                        var y = intensity * (Math.random() > 0.5 ? -1 : 1);
                        document.body.style.marginLeft = x + 'px';
                        document.body.style.marginTop = y + 'px';
                        setTimeout(function() {
                            document.body.style.marginLeft = '';
                            document.body.style.marginTop = '';
                        }, 75);
                    }
                }
                if (!rendering) {
                    requestAnimationFrame(loop);
                }
            };

            POWERMODE.colorful = false;

            // アニメーションループ
            function loop() {
                rendering = true;
                context.clearRect(0, 0, canvas.width, canvas.height);
                var rendered = false;
                var rect = canvas.getBoundingClientRect();
                for (var i = 0; i < particles.length; ++i) {
                    var particle = particles[i];
                    if (particle.alpha <= 0.1) continue;
                    particle.velocity.y += 0.05; // 重力
                    particle.x += particle.velocity.x;
                    particle.y += particle.velocity.y;
                    particle.alpha *= 0.96;
                    context.globalAlpha = particle.alpha;
                    context.fillStyle = particle.color;
                    context.fillRect(
                        Math.round(particle.x - settings.particleSize / 2) - rect.left,
                        Math.round(particle.y - settings.particleSize / 2) - rect.top,
                        settings.particleSize, settings.particleSize
                    );
                    rendered = true;
                }
                if (rendered) {
                    requestAnimationFrame(loop);
                } else {
                    rendering = false;
                }
            }

            // 派手さの設定を変更する関数
            POWERMODE.setSettings = function(newSettings) {
                Object.assign(settings, newSettings);
            };

            module.exports = POWERMODE;

        /***/ }),
        /* 1 */
        /***/ (function(module, exports) {

            /* jshint browser: true */

            (function () {

                // ミラーリングするdivにコピーするプロパティ
                var properties = [
                    'direction',  // RTLサポート
                    'boxSizing',
                    'width',  // ChromeとIEではスクロールバーを除外し、ミラーディブがテキストエリアと正確に一致するようにする
                    'height',
                    'overflowX',
                    'overflowY',  // IEのためにスクロールバーをコピー

                    'borderTopWidth',
                    'borderRightWidth',
                    'borderBottomWidth',
                    'borderLeftWidth',
                    'borderStyle',

                    'paddingTop',
                    'paddingRight',
                    'paddingBottom',
                    'paddingLeft',

                    // https://developer.mozilla.org/en-US/docs/Web/CSS/font
                    'fontStyle',
                    'fontVariant',
                    'fontWeight',
                    'fontStretch',
                    'fontSize',
                    'fontSizeAdjust',
                    'lineHeight',
                    'fontFamily',

                    'textAlign',
                    'textTransform',
                    'textIndent',
                    'textDecoration',  // 影響があるかもしれないが、安全のため
                    'letterSpacing',
                    'wordSpacing',

                    'tabSize',
                    'MozTabSize'
                ];

                var isFirefox = window.mozInnerScreenX != null;

                function getCaretCoordinates(element, position, options) {

                    var debug = options && options.debug || false;
                    if (debug) {
                        var el = document.querySelector('#input-textarea-caret-position-mirror-div');
                        if (el) { el.parentNode.removeChild(el); }
                    }

                    // ミラーリングするdiv
                    var div = document.createElement('div');
                    div.id = 'input-textarea-caret-position-mirror-div';
                    document.body.appendChild(div);

                    var style = div.style;
                    var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;  // IE < 9用

                    // デフォルトのテキストエリアスタイル
                    style.whiteSpace = 'pre-wrap';
                    if (element.nodeName !== 'INPUT')
                        style.wordWrap = 'break-word';  // テキストエリアのみに適用

                    // オフスクリーンに配置
                    style.position = 'absolute';  // 正確な座標を返すために必要
                    if (!debug)
                        style.visibility = 'hidden';  // 'display: none'ではなく、レンダリングが必要

                    // 要素のプロパティをdivに転送
                    properties.forEach(function (prop) {
                        style[prop] = computed[prop];
                    });

                    if (isFirefox) {
                        // Firefoxはテキストエリアのオーバーフロープロパティについて嘘をつく: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
                        if (element.scrollHeight > parseInt(computed.height))
                            style.overflowY = 'scroll';
                    } else {
                        style.overflow = 'hidden';  // Chromeのためにスクロールバーを表示しない; IEはoverflowY = 'scroll'を保持
                    }

                    div.textContent = element.value.substring(0, position);
                    // input type="text" vs textareaに対する2番目の特別な処理: スペースはノンブレークスペースに置き換える必要がある - http://stackoverflow.com/a/13402035/1269037
                    if (element.nodeName === 'INPUT')
                        div.textContent = div.textContent.replace(/\s/g, "\u00a0");

                    var span = document.createElement('span');
                    // 改行が発生する長い単語が次の行に移動する場合など、折り返しは正確に複製する必要がある (#7)。
                    // 信頼できる唯一の方法は、キャレット位置で作成された<span>にテキストエリアの残りの内容をすべてコピーすること。
                    // inputの場合、'.'だけで十分ですが、なぜ手間をかけるのか？
                    span.textContent = element.value.substring(position) || '.';  // ||は完全に空のフェイクスパンがまったくレンダリングされないため
                    div.appendChild(span);

                    var coordinates = {
                        top: span.offsetTop + parseInt(computed['borderTopWidth']),
                        left: span.offsetLeft + parseInt(computed['borderLeftWidth'])
                    };

                    if (debug) {
                        span.style.backgroundColor = '#aaa';
                    } else {
                        document.body.removeChild(div);
                    }

                    return coordinates;
                }

                if (typeof module != "undefined" && typeof module.exports != "undefined") {
                    module.exports = getCaretCoordinates;
                } else {
                    window.getCaretCoordinates = getCaretCoordinates;
                }

            }());

        /***/ })
    /******/ ])
    });
;
