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
    self._diagram.getDiagramContainer().append(self._umlItemDiv);
    self._umlItemDiv.css({ "left": self._leftPosition + "px", "top": self._topPosition + "px" });
    self._umlItemDiv.draggable({
        containment: self._diagram.getDiagramContainer(),
        stop: function (event, ui) {
            self.move(ui.position.top, ui.position.left);
            notifier.notifyUmlElementMoved(self._diagram.getId(), self);
        }
    }).resizable({
        handles: "all",
        stop: function (event, ui) {
            self.resize(self._umlItemDiv.position().top,
                self._umlItemDiv.position().left,
                self._umlItemDiv.width(),
                self._umlItemDiv.height());
            notifier.notifyUmlElementMoved(self._diagram.getId(), self);
        }
    });

    this._width = Number(this._umlItemDiv.width());
    this._height = Number(this._umlItemDiv.height());

    makeContenteditable($(".type-title", self._umlItemDiv), self._umlItemDiv);
    $(".type-title", self._umlItemDiv).bind("input", function () {
        self._title = $(this).text();
        notifier.notifyUmlElementRenamed(self._diagram.getId(), self);
    });

    $(self._umlItemDiv).on("click", ".button-add-attribute", function () {
        var attribute = self.newAttribute();
        self.addItemsLine.call(self, ".attributes-list", attribute);
        notifier.notifyAttributeAdded(self._diagram.getId(), self, attribute)
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

    $(self._umlItemDiv).contextmenu({
        delegate: ".type-title",
        menu: [ { title: "Удалить", cmd: "del" } ],
        select: function (event, ui) {
            console.log("delete " + ui.cmd + " on " + ui.target.text());
            // без таймаута вылетит эксепшн при попытке закрыть меню
            setTimeout(function () {
                self._diagram.deleteElement(self.getId());
            });
            notifier.notifyDeleteElement(self._diagram.getId(), self);
        }
    });
};

UmlElement.prototype.getArrows = function () {
    return this._arrows;
};

UmlElement.prototype.destroy = function () {
    for (var i = 0; i < this._arrows.length; i++) {
        this._arrows[i].destroy();
    };
    $(this._umlItemDiv).contextmenu("destroy");
    $(this._umlItemDiv).remove();
};

UmlElement.prototype.getTitle = function () {
    return this._title;
};

UmlElement.prototype.setTitle = function (title) {
    console.log($(".type-title", this._umlItemDiv).length);
    $(".type-title", this._umlItemDiv).text(title);
};

UmlElement.prototype.move = function (top, left) {
    this._topPosition = top;
    this._leftPosition = left;
    this.redrawArrors();
};

UmlElement.prototype.resize = function (top, left, width, height) {
    this._width = width;
    this._height = height;
    this._topPosition = top;
    this._leftPosition = left;
    $(this._umlItemDiv).width(width);
    $(this._umlItemDiv).height(height);
    $(this._umlItemDiv).css({ "top": top, "left": left });
    this.redrawArrors();
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
    var self = this;
    var creatingItem = $("<li>").attr("contenteditable", "true").text(umlItemMember.getName());
    $(listSelector, self._umlItemDiv).append(creatingItem);
    makeContenteditable(creatingItem, self._umlItemDiv);
    creatingItem.bind("input", function() {
        umlItemMember.setName($(this).text());
        notifier.notifyItemMemberChanged(self._diagram.getId(),
            self.getId(), umlItemMember.getId(), umlItemMember.getName());
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