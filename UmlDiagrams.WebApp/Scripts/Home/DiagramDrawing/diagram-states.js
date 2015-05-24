"use strict";

function DrawingState() { };

DrawingState.prototype.act = function () {
    throw new Error("Not implemented");
};


function PointerState() {
    DrawingState.apply(this, arguments);
}
PointerState.prototype = Object.create(DrawingState.prototype);
PointerState.prototype.act = function () { };


function UmlItemAdding() {
    DrawingState.apply(this, arguments);
}
UmlItemAdding.prototype = Object.create(DrawingState.prototype);

UmlItemAdding.prototype.act = function (umlItemDiv, leftPosition, topPosition) {
    $("#diagram-container").append(umlItemDiv);
    umlItemDiv.css({ "left": leftPosition + "px", "top": topPosition + "px" });
};


function ClassAdding() {
    DrawingState.apply(this, arguments);
}

ClassAdding.prototype = Object.create(UmlItemAdding.prototype);

ClassAdding.prototype.act = function (classDiv) {
    UmlItemAdding.prototype.act.call(this, classDiv);
    classDiv.draggable({
        containment: "#diagram-container"
    }).resizable({
        handles: "all"
    });
    makeContenteditable($(".type-title", classDiv), classDiv);
};


function InterfaceAdding() {
    DrawingState.apply(this, arguments);
}

InterfaceAdding.prototype = Object.create(UmlItemAdding.prototype);
InterfaceAdding.prototype.act = function (interfaceDiv) {
    UmlItemAdding.prototype.act.call(this, interfaceDiv);
    interfaceDiv.draggable({
        containment: "#diagram-container"
    }).resizable({
        handles: "all"
    });

    makeContenteditable($(".type-title", interfaceDiv), interfaceDiv);
};


function EnumAdding() {
    DrawingState.apply(this, arguments);
}

EnumAdding.prototype = Object.create(UmlItemAdding.prototype);
EnumAdding.prototype.act = function (enumDiv) {
    UmlItemAdding.prototype.act.call(this, enumDiv);
    enumDiv.draggable({
        containment: "#diagram-container"
    }).resizable({
        handles: "all"
    });

    makeContenteditable($(".type-title", enumDiv), enumDiv);
};


function CommentAdding() {
    DrawingState.apply(this, arguments);
}

CommentAdding.prototype = Object.create(UmlItemAdding.prototype);
CommentAdding.prototype.act = function(commentDiv) {
    UmlItemAdding.prototype.act.call(this, commentDiv);
    commentDiv.draggable({
        containment: "#diagram-container"
    }).resizable({
        handles: "all"
    });
    makeContenteditable($(".comment-clone", commentDiv), commentDiv);
};


function AssociationDrawing() {
    DrawingState.apply(this, arguments);
}

AssociationDrawing.prototype = Object.create(DrawingState.prototype);
AssociationDrawing.prototype.act = function () { };


function AggregationDrawing() {
    DrawingState.apply(this, arguments);
}

AggregationDrawing.prototype = Object.create(DrawingState.prototype);
AggregationDrawing.prototype.act = function () { };


function CompositionDrawing() {
    DrawingState.apply(this, arguments);
}

CompositionDrawing.prototype = Object.create(DrawingState.prototype);
CompositionDrawing.prototype.act = function () { };


function DependencyDrawing() {
    DrawingState.apply(this, arguments);
}

DependencyDrawing.prototype = Object.create(DrawingState.prototype);
DependencyDrawing.prototype.act = function () { };


function InheritanceDrawing() {
    DrawingState.apply(this, arguments);
}

InheritanceDrawing.prototype = Object.create(DrawingState.prototype);
InheritanceDrawing.prototype.act = function () { };


function ConnectorDrawing() {
    DrawingState.apply(this, arguments);
}

ConnectorDrawing.prototype = Object.create(DrawingState.prototype);
ConnectorDrawing.prototype.act = function() {};