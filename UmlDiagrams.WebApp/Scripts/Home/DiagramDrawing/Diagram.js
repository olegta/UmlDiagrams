/**
 * Diagram class
 * @param {jQuery} divElement 
 */
function Diagram(divElement) {
    var self = this;

    var _divElement = divElement;
    var _name = $("#diagram-name", _divElement).val();// TODO: init variables
    var _width;
    var _height;
    var _elements = [];
    var _arrows = [];
    /** @type DrawingState */
    var _state = Diagram.States["icon-pointer"];

    self.rename = function(newName) {
        _name = newName;
    };

    self.getName = function() {
        return _name;
    };

    self.resize = function(width, height) {
        _width = width;
        _height = height;
    };

    self.getWidth = function() {
        return _width;
    };

    self.getHeight = function() {
        return _height;
    };

    self.setDrawingMode = function (drawingMode) {
        _state = drawingMode;
        console.dir(_state);
    };

    self.act = function (uiHelper) {
        console.dir(_state);
        _state.act(uiHelper);
    };

    self.getDivForDrawingMode = function () {
    }
}

Diagram.States = {
    "icon-pointer": new PointerState(),
    "icon-class": new ClassAdding(),
    "icon-interface": new InterfaceAdding(),
    "icon-enumeration": new EnumAdding(),
    "icon-comment": new CommentAdding(),
    "icon-association": new AssociationDrawing(),
    "icon-aggregation": new AggregationDrawing(),
    "icon-composition": new CompositionDrawing(),
    "icon-dependency": new DependencyDrawing(),
    "icon-inheritance": new InheritanceDrawing(),
    "icon-connector": new ConnectorDrawing()
}