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

    self.rename = function(newName) {
        _name = newName;
    }

    self.getName = function() {
        return _name;
    }

    self.resize = function(width, height) {
        _width = width;
        _height = height;
    }

    self.getWidth = function() {
        return _width;
    }

    self.getHeight = function() {
        return _height;
    }

    self.addElement = function(element) {
        
    }

    self.addClass = function (classDiv, container) {
        $("#diagram-container").append(classDiv);
        var leftPosition = Number(classDiv.css("left").match(/\d+/)) - container.offsetLeft;
        var topPosition = Number(classDiv.css("top").match(/\d+/)) - container.offsetTop;
        classDiv.css({ "left": leftPosition + "px", "top": topPosition + "px" });
        classDiv.draggable({
            containment: "#diagram-container"
        }).resizable({
            handles: "all"
        });

        // support contenteditable in draggable 
        $(".type-title", classDiv).dblclick(function () {
            console.log("enable");
            classDiv.draggable({ disabled: true });
            $(this).focus();
        });
        classDiv.click(function () {
            console.log("disable");
            classDiv.draggable({ disabled: false });
        });
    }
}

function DrawingState() { };

DrawingState.prototype.act = function() {
    throw new Error("Not implemented");
};

function PointerState() { };
PointerState.prototype = Object.create(DrawingState);
PointerState.prototype.act = function () { };

function ClassAdding() { }

ClassAdding.prototype = Object.create(DrawingState);

