"use strict";

// часть классов возможно лишние, но они понадобятся при кастомизации добавления элементов разных типов и стрелок разных типов

var CLASS_TYPE = "class";
var INTERFACE_TYPE = "interface";
var ENUM_TYPE = "enum";
var COMMENT_TYPE = "comment";

function DrawingState() { };

DrawingState.prototype.act = function () {
    throw new Error("Not implemented");
};

DrawingState.prototype.getHelper = function () {
    throw new Error("Not implemented");
};

DrawingState.prototype.actionCompleted = function () {
    return true;
};

DrawingState.prototype.setDiagram = function (diagram) {
    this._diagram = diagram;
};

DrawingState.prototype.switchOn = function () { };


function PointerState() {
    DrawingState.apply(this, arguments);
}
PointerState.prototype = Object.create(DrawingState.prototype);
PointerState.prototype.act = function () { };
PointerState.prototype.getHelper = function () { };


function UmlItemAdding() {
    DrawingState.apply(this, arguments);
}
UmlItemAdding.prototype = Object.create(DrawingState.prototype);

UmlItemAdding.prototype.act = function (umlItem) {
    this._diagram.addItem(umlItem);
    notifier.notifyUmlElementAdded(this._diagram.getId(), umlItem);
};

UmlItemAdding.prototype.copyClone = function (helperId) {
    return $("#" + helperId)
        .clone()
        .css("display:", "")
        .removeAttr("id");
};


function ClassAdding() { 
    DrawingState.apply(this, arguments);
}

ClassAdding.prototype = Object.create(UmlItemAdding.prototype);

ClassAdding.prototype.act = function (classDiv, leftPosition, topPosition) {
    UmlItemAdding.prototype.act.call(this,
        new UmlClass(classDiv, this._diagram, topPosition, leftPosition));
};

ClassAdding.prototype.getHelper = function () {
    return this.copyClone("class-clone");
}


function InterfaceAdding() {
    DrawingState.apply(this, arguments);
}

InterfaceAdding.prototype = Object.create(UmlItemAdding.prototype);

InterfaceAdding.prototype.act = function (interfaceDiv, leftPosition, topPosition) {
    UmlItemAdding.prototype.act.call(this,
        new UmlInterface(interfaceDiv, this._diagram, topPosition, leftPosition));
};

InterfaceAdding.prototype.getHelper = function () {
    return this.copyClone("interface-clone");
}


function EnumAdding() {
    DrawingState.apply(this, arguments);
}

EnumAdding.prototype = Object.create(UmlItemAdding.prototype);
EnumAdding.prototype.act = function (enumDiv, leftPosition, topPosition) {
    UmlItemAdding.prototype.act.call(this,
        new UmlEnum(enumDiv, this._diagram, topPosition, leftPosition));
};

EnumAdding.prototype.getHelper = function () {
    return this.copyClone("enumeration-clone");
}


function CommentAdding() {
    DrawingState.apply(this, arguments);
}

CommentAdding.prototype = Object.create(UmlItemAdding.prototype);
CommentAdding.prototype.act = function (commentDiv, leftPosition, topPosition) {
    UmlItemAdding.prototype.act.call(this, new UmlComment(commentDiv, this._diagram, topPosition, leftPosition));
};

CommentAdding.prototype.getHelper = function () {
    return this.copyClone("comment-clone");
}


function ArrowDrawing() {
    this._selectFirstUmlElement = function(first) {
        this._activeAction = this._connectElements.bind(this, first);
    }

    this._connectElements = function (first, second) {
        if (first === second)
            return;

        var arrow = new Arrow(first, second, this.getArrowType());
        this._diagram.addArrow(arrow);
        // todo: signal R notifyArrowAdded(arrow)
        this._activeAction = this._selectFirstUmlElement;
    }

    this._activeAction = this._selectFirstUmlElement;
}

ArrowDrawing.prototype = Object.create(DrawingState.prototype);

ArrowDrawing.prototype.act = function (commentDiv, leftPosition, topPosition) {
    var umlElement = this._diagram.getClickedElement(leftPosition, topPosition);
    if (umlElement !== null)
        this._activeAction(umlElement);
};

ArrowDrawing.prototype.getHelper = function () {
    return null;
}

ArrowDrawing.prototype.getArrowType = function () {
    throw new Error("Not implemnted");
}

ArrowDrawing.prototype.actionCompleted = function() {
    return this._activeAction === this._selectFirstUmlElement;
}

ArrowDrawing.prototype.switchOn = function () {
    this._activeAction = this._selectFirstUmlElement;;
}


function AssociationDrawing() {
    ArrowDrawing.apply(this, arguments);
}

AssociationDrawing.prototype = Object.create(ArrowDrawing.prototype);

AssociationDrawing.prototype.getArrowType = function () {
    return "Association";
}


function AggregationDrawing() {
    ArrowDrawing.apply(this, arguments);
}

AggregationDrawing.prototype = Object.create(ArrowDrawing.prototype);

AggregationDrawing.prototype.getArrowType = function () {
    return "Aggregation";
}


function CompositionDrawing() {
    ArrowDrawing.apply(this, arguments);
}

CompositionDrawing.prototype = Object.create(ArrowDrawing.prototype);

CompositionDrawing.prototype.getArrowType = function () {
    return "Composition";
}


function DependencyDrawing() {
    ArrowDrawing.apply(this, arguments);
}

DependencyDrawing.prototype = Object.create(ArrowDrawing.prototype);

DependencyDrawing.prototype.getArrowType = function () {
    return "Dependency";
}


function InheritanceDrawing() {
    ArrowDrawing.apply(this, arguments);
}

InheritanceDrawing.prototype = Object.create(ArrowDrawing.prototype);

InheritanceDrawing.prototype.getArrowType = function () {
    return "Inheritance";
}


function ConnectorDrawing() {
    ArrowDrawing.apply(this, arguments);
}

ConnectorDrawing.prototype = Object.create(ArrowDrawing.prototype);

ConnectorDrawing.prototype.getArrowType = function () {
    return "Connector";
}
