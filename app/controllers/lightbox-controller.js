'use strict';
/**
 * Displays original (non-resized) image on a layer
 */
var lightboxController = (function () {
    var lightboxEl,
        ctl = {};

    ctl.show = function (src) {
        var img = new Image();
        img.src = src;
        lightboxEl.innerHTML = '';
        lightboxEl.appendChild(img);
        lightboxEl.className = 'shown';
        lightboxEl.addEventListener('click', ctl.close, false);
    };

    ctl.close = function () {
        lightboxEl.removeEventListener('click', ctl.close, false);
        lightboxEl.className = '';
    };

    ctl.init = function (element) {
        lightboxEl = element;
    };

    return ctl;
})();