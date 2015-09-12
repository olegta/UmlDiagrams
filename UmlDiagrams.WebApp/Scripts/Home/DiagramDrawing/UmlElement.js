"use strict";

// todo: code duplicates in show methods and title elements match
function UmlElement(div, diagram, top, left, title) {
    this._id = guid();
    this._umlItemDiv = div;
    this._topPosition = top;
    this._leftPosition = left;
    this._diagram = diagram;
    this._width = div.width();
    this._height = div.height();
    this._title = title;
};

UmlElement.prototype.show = function () {
    var self = this;
    $("#diagram-container").append(self._umlItemDiv);
    self._umlItemDiv.css({ "left": self._leftPosition + "px", "top": self._topPosition + "px" });
    self._umlItemDiv.draggable({
        containment: "#diagram-container"
    }).resizable({
        handles: "all"
    });
    makeContenteditable($(".type-title", self._umlItemDiv), self._umlItemDiv);
    $(self._umlItemDiv).on("click", ".button-add-attribute", function () {
        self.newAttribute();
        self.addItemsLine.call(self, ".attributes-list");
    });

    $(self._umlItemDiv).on("click", ".button-add-operation", function () {
        self.newOperation();
        self.addItemsLine.call(self, ".operations-list");
    });

    $(self._umlItemDiv).on("click", ".button-add-literal", function () {
        self.newLiteral();
        self.addItemsLine.call(self, ".literals-list");
    });
};

UmlElement.prototype.setDiadram = function (diagram) {
    this._diagram = diagram;
};

UmlElement.prototype.setId = function (id) {
    if (!id)
        id = guid();
    this._id = id;
};

UmlElement.prototype.addItemsLine = function (listSelector) {
    var creatingItem = $("<li>").attr("contenteditable", "true");
    $(listSelector, this._umlItemDiv).append(creatingItem);
    makeContenteditable(creatingItem, this._umlItemDiv);
    $(creatingItem).focus();
}

UmlElement.prototype.newAttribute = function () {
    throw new Error("not implemented");
}

UmlElement.prototype.newOperation = function () {
    throw new Error("not implemented");
}

UmlElement.prototype.newLiteral = function () {
    throw new Error("not implemented");
}



function UmlClass(div, diagram, top, left) {
    UmlElement.call(this, div, diagram, top, left, $(".type-title", div).text());
    this._attributes = [];
    this._operations = [];
};

UmlClass.prototype = Object.create(UmlElement.prototype);

UmlClass.prototype.show = function() {
    UmlElement.prototype.show.apply(this, arguments);
};

UmlClass.prototype.newAttribute = function () {
    this._attributes.push("");
}

UmlClass.prototype.newOperation = function () {
    this._operations.push("");
}



function UmlInterface(div, diagram, top, left) {
    UmlElement.call(this, div, diagram, top, left, $(".type-title", div).text());
    this._operations = [];
};

UmlInterface.prototype = Object.create(UmlElement.prototype);

UmlInterface.prototype.show = function() {
    UmlElement.prototype.show.apply(this, arguments);
};

UmlClass.prototype.newOperation = function () {
    this._operations.push("");
}



function UmlEnum(div, diagram, top, left) {
    UmlElement.call(this, div, diagram, top, left, $(".type-title", div).text());
    this._literals = [];
};

UmlEnum.prototype = Object.create(UmlElement.prototype);

UmlEnum.prototype.show = function() {
    UmlElement.prototype.show.apply(this, arguments);
};

UmlClass.prototype.newLiteral = function () {
    this._literals.push("");
}



function UmlComment(div, diagram, top, left) {
    UmlElement.call(this, div, diagram, top, left, $(".type-title", div).text());
}

UmlComment.prototype = Object.create(UmlElement.prototype);

UmlComment.prototype.show = function () {
    UmlElement.prototype.show.apply(this, arguments);
};