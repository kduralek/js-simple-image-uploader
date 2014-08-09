'use strict';
/**
 *	Bootstrap module responsible for application setup 
 */
var app = (function (document) {
	return {
		run: function () {
			// prepare DOM elements
			var droppableElement = document.getElementById('droppable'),
				fileInputElement = document.getElementById('file-input'),
				thumbsElement = document.getElementById('thumbnails'),
                lightboxElement = document.getElementById('lightbox');

			// setup container for thumbnails
			filesController.init(thumbsElement);

            // setup lightbox controller
            lightboxController.init(lightboxElement);

			// bind to file input changes
			fileInput.onChange.call(fileInputElement, filesController.handleFiles);

			// attach drag'n'drop events droppableElement
			// and set callback function to be executed on drop
			droppable.onDragDrop.call(droppableElement, filesController.handleFiles);
		}
	};
})(document, filesController, fileInput, droppable);