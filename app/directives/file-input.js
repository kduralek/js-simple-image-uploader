'use strict';
/**
 *	Input[type=file] directive to watch for 
 * 	input changes when selecting files from file system
 */
var fileInput = (function () {

	var onChangeHandler = function (e, callbackFn) {
		// execute files handler
		callbackFn(e.target.files);

		// if we want to upload the same file again
		// we have to reset input's value
		this.value = '';
	};

	var onChange = function (callbackFn) {
		this.addEventListener('change', function (e) {
			return onChangeHandler.call(this, e, callbackFn);
		}, false);
	};

	var destroy = function () {
		this.removeEventListener('change', onChangeHandler, false);
	};

	return {
		onChange: onChange,
		destroy: destroy
	};
})();