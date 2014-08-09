'use strict';
/**
 *	Handles uploaded images by creating thumbnails and appending them to the DOM
 */
var filesController = (function (FileReader, lightboxController) {
	var ctl = {},
		acceptedMimeTypes = ['image/png', 'image/jpeg'],
        thumbWidth = 150,
        thumbHeight = 150,
		thumbsHolder;

    var createThumbnail = function (type, img) {
        var canvas,
            ctx,
            thumb;

        // create canvas to resize original image for thumbnail purpose
        // it doesn't keep a proper aspect ratio
        // since it is not a case for this task
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        ctx.canvas.width = thumbWidth;
        ctx.canvas.height = thumbHeight;
        ctx.drawImage(img, 0, 0, thumbWidth, thumbHeight);

        thumb = new Image();
        thumb.className = 'loaded';
        thumb.src = canvas.toDataURL(type);

        // attach click listener for a lightbox
        thumb.addEventListener('click', function () {
            return lightboxController.show(img.src);
        }, false);

        return thumb;
    };

	ctl.init = function (holder) {
		thumbsHolder = holder;
	};

	ctl.handleFiles = function (files) {
		var reader,
			file,
            idx = 0;

		if (thumbsHolder === undefined) {
			throw 'Thumbnails holder must be set before!';
		}

		// reset holder contents before adding new ones
		thumbsHolder.innerHTML = '';

		for (var i = 0; i < files.length; i++) {
			file = files[i];
			if (acceptedMimeTypes.indexOf(file.type) === -1) {
				continue;
			}

			reader = new FileReader();
			reader.onload = (function (theFile, idx) {
			    return function (e) {
			    	var img = new Image();
			    	img.onload = function() {
                        var thumb = createThumbnail(theFile.type, this),
                            delay = (idx * 0.1) + 's';
                        thumb.style.animationDelay = delay;
                        thumb.style.webkitAnimationDelay = delay;
                        thumbsHolder.appendChild(thumb);
					};
			    	img.src = e.target.result;
			    };
			})(file, idx);
			reader.readAsDataURL(file);
            idx++;
		}
	};
	
	return ctl;
})(FileReader, lightboxController);