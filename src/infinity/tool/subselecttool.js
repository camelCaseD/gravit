(function (_) {
    /**
     * The sub selection tool
     * @class GXSubSelectTool
     * @extends GXSelectTool
     * @constructor
     * @version 1.0
     */
    function GXSubSelectTool() {
        GXSelectTool.call(this);
    };

    GObject.inherit(GXSubSelectTool, GXSelectTool);

    /** @override */
    GXSubSelectTool.prototype.getGroup = function () {
        return 'select';
    };

    /** @override */
    GXSubSelectTool.prototype.getImageClass = function () {
        return 'g-tool-subselect';
    };

    /** @override */
    GXSubSelectTool.prototype.getHint = function () {
        return GXSelectTool.prototype.getHint.call(this)
            .setTitle(new GLocale.Key(GXSubSelectTool, "title"));
    };

    /** @override */
    GXSubSelectTool.prototype.getActivationCharacters = function () {
        return ['A', '1'];
    };

    /** @override */
    GXSubSelectTool.prototype.getCursor = function () {
        var result = GXSelectTool.prototype.getCursor.call(this);
        if (result === GUICursor.Select) {
            return GUICursor.SelectInverse;
        } else if (result === GUICursor.SelectDot) {
            return GUICursor.SelectDotInverse;
        } else {
            return result;
        }
    };

    /** @override */
    GXSubSelectTool.prototype.activate = function (view, layer) {
        GXSelectTool.prototype.activate.call(this, view, layer);

        // Set detail mode for selection for sub-select tool
        this._editor.setSelectionDetail(true);
    };

    /** @override */
    GXSubSelectTool.prototype.deactivate = function (view, layer) {
        // Remove detail mode for selection for sub-select tool
        this._editor.setSelectionDetail(false);

        GXSelectTool.prototype.deactivate.call(this, view, layer);
    };

    /** override */
    GXSubSelectTool.prototype.toString = function () {
        return "[Object GXSubSelectTool]";
    };

    _.GXSubSelectTool = GXSubSelectTool;
})(this);