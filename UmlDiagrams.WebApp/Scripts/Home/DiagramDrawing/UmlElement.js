"use strict";

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
            self.redrawArrors();
        }
    }).resizable({
        handles: "all",
        stop: function (event, ui) {
            self._width = (self._umlItemDiv.width());
            self._height = (self._umlItemDiv.height());
            self._topPosition = self._umlItemDiv.position().top;
            self._leftPosition = self._umlItemDiv.position().left;
            // todo signal R: notifyUmlElementResized(self)
            self.redrawArrors();
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

    $(self._umlItemDiv).on("click", ".collapse-icon,.expand-icon", function () {
        var typeContainer = $(this).closest(".type-container");
        if ($(this).hasClass("collapse-icon")) {
            self._height = $(this).parent().outerHeight(true);
        } else if ($(this).hasClass("expand-icon")) {
            self._height = typeContainer[0].scrollHeight;
        } else {
            throw new Error("invalid state of expand-collapse icon");
        }
        typeContainer.animate({ height: self._height + "px" });
        $(this).toggleClass("collapse-icon");
        $(this).toggleClass("expand-icon");
        self.redrawArrors();
    });
};

UmlElement.prototype.setDiadram = function (diagram) {
    this._diagram = diagram;
};

UmlElement.prototype.getId = function () {
    return this._id;
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

UmlElement.prototype.redrawArrors = function() {
    for (var i = 0; i < this._arrows.length; i++) {
        this._arrows[i].draw();
    }
}

UmlElement.prototype.addArrow = function (arrow) {
    for (var i = 0; i < this._arrows.length; i++) {
        if (this._arrows[i].getId() === arrow.getId()) {
            console.warn("arrow " + arrow + " duplicate existed " + this._arrows[i]);
            return;
        }
    }
    this._arrows.push(arrow);
}

UmlElement.prototype.matchPoint = function (x, y) {
    return this._leftPosition < x
        && this._leftPosition + this._width > x
        && this._topPosition < y
        && this._topPosition + this._height > y;
}

UmlElement.prototype.serializeToDto = function () {
    throw new Error("not implemented");
}

UmlElement.prototype.getTop = function () {
    return this._topPosition;
}

UmlElement.prototype.setTop = function (top) {
    this._topPosition = top;
}

UmlElement.prototype.getLeft = function () {
    return this._leftPosition;
}

UmlElement.prototype.setLeft = function (left) {
    this._leftPosition = left;
}

UmlElement.prototype.getWidth = function () {
    return this._width;
}

UmlElement.prototype.setwidth = function (width) {
    this._width = width;
}

UmlElement.prototype.getHeight = function () {
    return this._height;
}

UmlElement.prototype.setHeight = function (height) {
    this._height = height;
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

UmlClass.prototype.serializeToDto = function () {
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