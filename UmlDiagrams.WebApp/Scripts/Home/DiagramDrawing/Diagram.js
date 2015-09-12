/**
 * Diagram class
 * @param {jQuery} divElement 
 */
function Diagram(divElement) {
    var self = this;

    var _divElement = divElement;
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
        _state.setDiagram(self);
    };

    self.act = function (uiHelper, leftPosition, topPosition) { 
        _state.act(uiHelper, leftPosition, topPosition);
    };

    self.getHelper = function () {
        return _state.getHelper();
    };

    self.getDivForDrawing = function () {
        return _divElement;
    };

    self.resize = function(event, ui) {
        var arrowsCanvas = $("canvas", _divElement);
        arrowsCanvas.prop("width", ui.size.width);
        arrowsCanvas.prop("height", ui.size.height);
        for (var i = 0; i < _arrows.length; i++) {
            _arrows[i].draw();
        }
        // TODO: signal R notifyDiagramResize(self)
    };

    self.addItem = function (umlItem) {
        _elements.push(umlItem);
        umlItem.setDiadram(self);
        umlItem.show();
        // TODO: signal R notifyUmlElementAdded(umlItem)
    };

    self.getDiagramContainer = function () {
        return _divElement;
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