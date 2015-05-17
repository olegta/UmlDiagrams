function DrawingState() { };

DrawingState.prototype.act = function () {
    throw new Error("Not implemented");
};

function PointerState() {
    DrawingState.apply(this, arguments);
}
PointerState.prototype = Object.create(DrawingState.prototype);
PointerState.prototype.act = function () { };

function ClassAdding() {
    DrawingState.apply(this, arguments);
}

ClassAdding.prototype = Object.create(DrawingState.prototype);

ClassAdding.prototype.act = function (classDiv) {
    $("#diagram-container").append(classDiv);
    var leftPosition = Number(classDiv.css("left").match(/\d+/))
        - $("#diagram-container")[0].offsetLeft;
    var topPosition = Number(classDiv.css("top").match(/\d+/))
        - $("#diagram-container")[0].offsetTop;
    classDiv.css({ "left": leftPosition + "px", "top": topPosition + "px" });
    classDiv.draggable({
        containment: "#diagram-container"
    }).resizable({
        handles: "all"
    });

    // support contenteditable in draggable
    $(".type-title", classDiv).dblclick(function () {
        classDiv.draggable({ disabled: true });
        $(this).focus();
    });
    classDiv.click(function () {
        classDiv.draggable({ disabled: false });
    });
};

function InterfaceAdding() {
    DrawingState.apply(this, arguments);
}

InterfaceAdding.prototype = Object.create(DrawingState.prototype);
InterfaceAdding.prototype.act = function () { };

function EnumAdding() {
    DrawingState.apply(this, arguments);
}

EnumAdding.prototype = Object.create(DrawingState.prototype);
EnumAdding.prototype.act = function () { };

function CommentAdding() {
    DrawingState.apply(this, arguments);
}

CommentAdding.prototype = Object.create(DrawingState.prototype);
CommentAdding.prototype.act = function () { };

function AssociationDrawing() {
    DrawingState.apply(this, arguments);
}

AssociationDrawing.prototype = Object.create(DrawingState.prototype);
AssociationDrawing.prototype.act = function () { }

function AggregationDrawing() {
    DrawingState.apply(this, arguments);
}

AggregationDrawing.prototype = Object.create(DrawingState.prototype);
AggregationDrawing.prototype.act = function () { }

function CompositionDrawing() {
    DrawingState.apply(this, arguments);
}

CompositionDrawing.prototype = Object.create(DrawingState.prototype);
CompositionDrawing.prototype.act = function () { }

function DependencyDrawing() {
    DrawingState.apply(this, arguments);
}

DependencyDrawing.prototype = Object.create(DrawingState.prototype);
DependencyDrawing.prototype.act = function () { }

function InheritanceDrawing() {
    DrawingState.apply(this, arguments);
}

InheritanceDrawing.prototype = Object.create(DrawingState.prototype);
InheritanceDrawing.prototype.act = function () { }

function ConnectorDrawing() {
    DrawingState.apply(this, arguments);
}

ConnectorDrawing.prototype = Object.create(DrawingState.prototype);
ConnectorDrawing.prototype.act = function () { }