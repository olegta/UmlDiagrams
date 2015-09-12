"use strict";

// todo: code duplicates in show methods and title elements match
function UmlElement(div, diagram, top, left, title, width, height) {
    this._id = guid();
    this._umlItemDiv = div;
    this._topPosition = top;
    this._leftPosition = left;
    this._diagram = diagram;
    if (width)
        this._width = Number(div.width());
    if (height)
        this._height = Number(div.height());
    this._title = title;
    this._arrows = [];
};

UmlElement.prototype.show = function () {
    var self = this;
    this._diagram.getDiagramContainer().append(self._umlItemDiv);
    self._umlItemDiv.css({ "left": self._leftPosition + "px", "top": self._topPosition + "px" });
    self._umlItemDiv.draggable({
        containment: this._diagram.getDiagramContainer(),
        stop: function (event, ui) {
            self._topPosition = ui.position.top;
            self._leftPosition = ui.position.left;
            // todo signal R: notifyUmlElementDragged(self)
        }
    }).resizable({
        handles: "all",
        stop: function (event, ui) {
            self._width = Number(self._umlItemDiv.width());
            self._height = Number(self._umlItemDiv.height());
            // todo signal R: notifyUmlElementResized(self)
        } 
    });

    this._width = Number(this._umlItemDiv.width());
    this._height = Number(this._umlItemDiv.height());

    makeContenteditable($(".type-title", self._umlItemDiv), self._umlItemDiv);
    $(".type-title", self._umlItemDiv).bind("input", function () {
        self._title = $(this).text();
        // todo: signal R: notifyUmlElementRenamed(self);
    });

    $(self._umlItemDiv).on("click", ".button-add-attribute", function () {
        var attribute = self.newAttribute();
        self.addItemsLine.call(self, ".attributes-list", attribute);
    });

    $(self._umlItemDiv).on("click", ".button-add-operation", function () {
        var operation = self.newOperation();
        self.addItemsLine.call(self, ".operations-list", operation);
    });

    $(self._umlItemDiv).on("click", ".button-add-literal", function () {
        var literal = self.newLiteral();
        self.addItemsLine.call(self, ".literals-list", literal);
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

UmlElement.prototype.addItemsLine = function (listSelector, umlItemMember) {
    var creatingItem = $("<li>").attr("contenteditable", "true").text(umlItemMember.getName());
    $(listSelector, this._umlItemDiv).append(creatingItem);
    makeContenteditable(creatingItem, this._umlItemDiv);
    creatingItem.bind("input", function() {
        umlItemMember.setName($(this).text());
        // todo: signal R notifyItemMemberChanged(umlItemMember)
    });
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



function UmlClass(div, diagram, top, left, width, height) {
    UmlElement.call(this, div, diagram, top, left, $(".type-title", div).text(), width, height);
    this._attributes = [];
    this._operations = [];
};

UmlClass.prototype = Object.create(UmlElement.prototype);

UmlClass.prototype.show = function() {
    UmlElement.prototype.show.apply(this, arguments);
};

UmlClass.prototype.newAttribute = function () {
    var attribute = new UmlAttribute();
    this._attributes.push(attribute);
    // todo: signal R notifyAttributeAdded(operation)
    return attribute;
}

UmlClass.prototype.newOperation = function () {
    var operation = new UmlOperation();
    this._operations.push(operation);
    // todo: signal R notifyOperationAdded(operation)
    return operation;
}



function UmlInterface(div, diagram, top, left, width, height) {
    UmlElement.call(this, div, diagram, top, left, $(".type-title", div).text(), width, height);
    this._operations = [];
};

UmlInterface.prototype = Object.create(UmlElement.prototype);

UmlInterface.prototype.show = function() {
    UmlElement.prototype.show.apply(this, arguments);
};

UmlInterface.prototype.newOperation = function () {
    var operation = new UmlOperation();
    this._operations.push(operation);
    // todo: signal R notifyOperationAdded(operation)
    return operation;
}



function UmlEnum(div, diagram, top, left, width, height) {
    UmlElement.call(this, div, diagram, top, left, $(".type-title", div).text(), width, height);
    this._literals = [];
};

UmlEnum.prototype = Object.create(UmlElement.prototype);

UmlEnum.prototype.show = function() {
    UmlElement.prototype.show.apply(this, arguments);
};

UmlEnum.prototype.newLiteral = function () {
    var literal = new UmlLiteral();
    this._literals.push(literal);
    // todo: signal R notifyLiteralAdded(operation)
    return literal;
}



function UmlComment(div, diagram, top, left, width, height) {
    UmlElement.call(this, div, diagram, top, left, $(".type-title", div).text(), width, height);
}

UmlComment.prototype = Object.create(UmlElement.prototype);

UmlComment.prototype.show = function () {
    UmlElement.prototype.show.apply(this, arguments);
};