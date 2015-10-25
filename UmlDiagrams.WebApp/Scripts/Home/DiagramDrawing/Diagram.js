"use strict";

/**
 * Diagram class
 * @param {jQuery} divElement 
 */
function Diagram(divElement, name) {
    var self = this;

    var _id = GLOBAL_DIAGRAM_ID;
    var _name = name;

    var _divElement = divElement;
    var _elements = [];
    var _arrows = [];

    /** @type DrawingState */
    var _state = Diagram.States["icon-pointer"];


    self.deleteElement = function (id) {
        console.log("deleting id: " + _id)
        var element = self.getUmlElementById(id);
        element.destroy();
    }

    self.getUmlElementById = function (id) {
        console.log("diagram id: " + _id)
        for (var i = 0; i < _elements.length; i++) {
            console.log("compare " + id + " to " + _elements[i].getId())
            if (_elements[i].getId().toUpperCase() === id.toUpperCase())
                return _elements[i];
        };
    }

    self.getId = function() {
        return _id;
    }

    self.setId = function(id) {
        _id = id;
    }

    self.rename = function(newName) {
        _name = newName;
    };

    self.getName = function() {
        return _name;
    };

    self.getWidth = function() {
        return divElement.width();
    }

    self.setWidth = function(width) {
        divElement.width(width);
    }

    self.getHeight = function() {
        return divElement.height();
    }

    self.setHeight = function(height) {
        divElement.height(height);
    }


    self.setDrawingMode = function (drawingMode) {
        _state = drawingMode;
        _state.setDiagram(self);
        _state.switchOn();
    };

    self.act = function (uiHelper, leftPosition, topPosition) { 
        _state.act(uiHelper, leftPosition, topPosition);
    };

    self.getHelper = function () {
        return _state.getHelper();
    };

    self.actionCompleted = function() {
        return _state.actionCompleted();
    }

    self.getDivForDrawing = function () {
        return _divElement;
    };

    self.resize = function (width, height) {
        var arrowsCanvas = $("canvas", _divElement);
        arrowsCanvas.prop("width", width);
        arrowsCanvas.prop("height", height);
        for (var i = 0; i < _arrows.length; i++) {
            _arrows[i].draw();
        }
    };

    self.addItem = function (umlItem) {
        _elements.push(umlItem);
        umlItem.setDiadram(self);
        umlItem.show();
        console.log("element added: " + umlItem.getId());
    };

    self.getDiagramContainer = function () {
        return _divElement;
    }

    self.getClickedElement = function(x, y) {
        for (var i = _elements.length - 1; i >= 0; i--) {
            if (_elements[i].matchPoint(x, y))
                return _elements[i];
        }
        return null;
    }

    self.addArrow = function (arrow) {
        if (_elements.indexOf(arrow.getFirstElement() === -1)
            || _elements.indexOf(arrow.getSecondElement() === -1)) {
            //throw new Error("arrow elements not attached to diagram");
        }
        arrow.getFirstElement().addArrow(arrow);
        arrow.getSecondElement().addArrow(arrow);
        _arrows.push(arrow);

        var canvas = $("<canvas>")
            .prop("width", self.getWidth())
            .prop("height", self.getWidth());
        canvas.insertBefore($(_divElement.children("div").first()));

        arrow.attachCanvas(_divElement, canvas[0]);
        arrow.draw();
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