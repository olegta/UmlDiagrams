"use strict";

function DrawingState() { };

DrawingState.prototype.act = function () {
    throw new Error("Not implemented");
};

DrawingState.prototype.getHelper = function () {
    throw new Error("Not implemented");
};


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

UmlItemAdding.prototype.act = function (umlItemDiv, leftPosition, topPosition) {
    $("#diagram-container").append(umlItemDiv);
    umlItemDiv.css({ "left": leftPosition + "px", "top": topPosition + "px" });
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
    UmlItemAdding.prototype.act.call(this, classDiv, leftPosition, topPosition);
    classDiv.draggable({
        containment: "#diagram-container"
    }).resizable({
        handles: "all"
    });
    makeContenteditable($(".type-title", classDiv), classDiv);
};

ClassAdding.prototype.getHelper = function () {
    return this.copyClone("class-clone");
}


function InterfaceAdding() {
    DrawingState.apply(this, arguments);
}

InterfaceAdding.prototype = Object.create(UmlItemAdding.prototype);

InterfaceAdding.prototype.act = function (interfaceDiv, leftPosition, topPosition) {
    UmlItemAdding.prototype.act.call(this, interfaceDiv, leftPosition, topPosition);
    interfaceDiv.draggable({
        containment: "#diagram-container"
    }).resizable({
        handles: "all"
    });

    makeContenteditable($(".type-title", interfaceDiv), interfaceDiv);
};

InterfaceAdding.prototype.getHelper = function () {
    return this.copyClone("interface-clone");
}


function EnumAdding() {
    DrawingState.apply(this, arguments);
}

EnumAdding.prototype = Object.create(UmlItemAdding.prototype);
EnumAdding.prototype.act = function (enumDiv, leftPosition, topPosition) {
    UmlItemAdding.prototype.act.call(this, enumDiv, leftPosition, topPosition);
    enumDiv.draggable({
        containment: "#diagram-container"
    }).resizable({
        handles: "all"
    });

    makeContenteditable($(".type-title", enumDiv), enumDiv);
};

EnumAdding.prototype.getHelper = function () {
    return this.copyClone("enumeration-clone");
}


function CommentAdding() {
    DrawingState.apply(this, arguments);
}

CommentAdding.prototype = Object.create(UmlItemAdding.prototype);
CommentAdding.prototype.act = function (commentDiv, leftPosition, topPosition) {
    UmlItemAdding.prototype.act.call(this, commentDiv, leftPosition, topPosition);
    commentDiv.draggable({
        containment: "#diagram-container"
    }).resizable({
        handles: "all"
    });
    makeContenteditable($(".comment-clone", commentDiv), commentDiv);
};

CommentAdding.prototype.getHelper = function () {
    return this.copyClone("comment-clone");
}


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