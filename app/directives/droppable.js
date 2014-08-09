'use strict';
/**
 *	Directive maintains drag'n'drop events in given drop area
 */
var droppable = (function(){
	var leavePromise,
		onDragOver, onDragEnter, onDragLeave, onDrop;
	
	onDragOver = function (e) {
		if (leavePromise){
			clearTimeout(leavePromise);
		}
		e.dataTransfer.dropEffect = 'move';
		if (e.preventDefault) {
			e.preventDefault();
		}
		this.classList.add('over');
		return false;
	};

	onDragEnter = function () {
		if (leavePromise){
			clearTimeout(leavePromise);
		}
		this.classList.add('over');
		return false;
	};

	onDragLeave = function () {
		var self = this;
		if (leavePromise){
			clearTimeout(leavePromise);
		}
		leavePromise = setTimeout(function(){
			self.classList.remove('over');
			return false;
		}, 100);
	};

	onDrop = function (e, callbackFn) {
		e.stopPropagation();
		e.preventDefault();

		this.classList.remove('over');
		callbackFn(e.dataTransfer.files);
		return false;
	};

	// binds callback function on drop event
	var onDragDrop = function (callbackFn) {
		this.addEventListener('dragover', onDragOver, false);
		this.addEventListener('dragenter', onDragEnter, false);
		this.addEventListener('dragleave', onDragLeave, false);
		this.addEventListener('drop', function (e) {
			return onDrop.call(this, e, callbackFn);
		}, false);
	};

	// Method not really needed in this case 
	// but we shouldn't forget about events unbinding
	var destroy = function () {
		this.removeEventListener('dragover', onDragOver, false);
		this.removeEventListener('dragenter', onDragEnter, false);
		this.removeEventListener('dragover', onDragLeave, false);
		this.removeEventListener('drop', onDrop, false);
	};

	// expose public methods
	return {
		onDragDrop: onDragDrop,
		destroy: destroy
	}
})();