'use strict';
/**
 * Manipulates image data on canvas
 */
var imageController = (function () {
    var ctl = {};

    // returns an image as dataUrl
    ctl.resizeToFill = function (img, type, resizeTo) {
        var canvas,
            ctx,
            shorterDim;

        // calculate shorter image side
        shorterDim = Math.min(img.width, img.height);

        // create canvas, resize and crop image to shorter side
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        ctx.canvas.width = resizeTo;
        ctx.canvas.height = resizeTo;
        ctx.drawImage(img, 0, 0, shorterDim, shorterDim, 0, 0, resizeTo, resizeTo);

        return canvas.toDataURL(type);
    };

    return ctl;
})();
