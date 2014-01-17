(function (_) {
    /**
     * An instance of an opened document
     * @class EXDocument
     * @extends GEventTarget
     * @constructor
     * @version 1.0
     */
    function EXDocument(scene, blob, temporaryTitle) {
        this._blob = blob;
        this._scene = scene;
        this._editor = new GXEditor(scene);
        this._windows = [];
        this._activeWindow = null;
        // TODO : I18N
        this._temporaryTitle = temporaryTitle;
    };
    GObject.inherit(EXDocument, GEventTarget);

    /**
     * The underlying scene
     * @type {GXScene}
     * @private
     */
    EXDocument.prototype._scene = null;

    /**
     * The underlying blob, may be null
     * @type {GBlob}
     * @private
     */
    EXDocument.prototype._blob = null;

    /**
     * The underlying editor working on the document
     * @type {GXSceneEditor}
     * @private
     */
    EXDocument.prototype._editor = null;

    /**
     * The windows attached to the document
     * @type {Array<EXWindow>}
     * @private
     */
    EXDocument.prototype._windows = null;

    /**
     * The currently active window of this document
     * @type {EXWindow}
     * @private
     */
    EXDocument.prototype._activeWindow = null;

    /**
     * The temporary title of no blob is assigned
     * @type {String}
     * @private
     */
    EXDocument.prototype._temporaryTitle = null;

    /**
     * Returns the scene this document is working on
     * @returns {GXScene}
     */
    EXDocument.prototype.getScene = function () {
        return this._scene;
    };

    /**
     * Returns the blob this document is working on if any
     * @returns {GBlob}
     */
    EXDocument.prototype.getBlob = function () {
        return this._blob;
    };

    /**
     * Assigns a blob this document is working on
     * @param {GBlob} blob
     */
    EXDocument.prototype.setBlob = function (blob) {
        if (blob && blob !== this.blob) {
            this._blob = blob;

            // TODO : Trigger update event here
        }
    };

    /**
     * Return the underlying editor
     * @returns {GXSceneEditor}
     */
    EXDocument.prototype.getEditor = function () {
        return this._editor;
    };

    /**
     * Returns a list of all windows attached to this document
     * @return {Array<EXWindow>}
     */
    EXDocument.prototype.getWindows = function () {
        return this._windows;
    };

    /**
     * Returns the currently active window of this document
     * @return {EXWindow}
     */
    EXDocument.prototype.getActiveWindow = function () {
        return this._activeWindow;
    };

    /**
     * Returns the title for the document
     * @return {String}
     */
    EXDocument.prototype.getTitle = function () {
        if (this.blob) {
            return this.blob.getName();
        } else {
            return this._temporaryTitle;
        }
    };

    /**
     * Returns whether this document is saveable which
     * is the case if it has an underyling, valid blob
     * and when it's internal editor's undo list has
     * modifications.
     * @return {Boolean}
     */
    EXDocument.prototype.isSaveable = function () {
        return this.blob && this.editor.getUndoList().hasUndo();
    };

    /**
     * Saves the document if it has an underlying blob
     */
    EXDocument.prototype.save = function () {
        // TODO : Reset undo list/set save point
        if (this.blob) {
            this.blob.store(GXNode.serialize(this.scene));
        }
    };

    _.EXDocument = EXDocument;
})(this);
