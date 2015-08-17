/**
 * Diagram class
 * @param {jQuery} divElement 
 */
function Diagram(divElement, canvasElement) {
    var self = this;

    var _divElement = divElement;
    var _arrowsCanvas = canvasElement;
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
    };

    self.act = function (uiHelper, leftPosition, topPosition) {
        _state.act(uiHelper, leftPosition, topPosition);
    };

    self.getHelper = function () {
        return _state.getHelper();
    };

    self.getDivForDrawingMode = function () {
    };

    self.resize = function (event, ui) {
        _arrowsCanvas.prop("width", ui.size.width);
        _arrowsCanvas.prop("height", ui.size.height);
        for (var i = 0; i < _arrows.length; i++) {
            _arrows[i].draw();
        }
        var context = _arrowsCanvas[0].getContext('2d');
        //alert(context);
        //// Рисуем окружность 
        context.strokeStyle = "#050";
        //context.fillStyle = "#fc0";
        context.beginPath();
        context.arc(100, 100, 50, 0, Math.PI * 2, true);
        context.moveTo(100, 100);
        context.lineTo(50, 50);
        context.closePath();
        context.stroke();
        context.fill();
        // TODO: signal R
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