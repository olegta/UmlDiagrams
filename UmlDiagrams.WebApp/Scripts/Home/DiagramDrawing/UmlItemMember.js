"use strict";

function UmlItemMember() {
    this._id = guid();
    this._name = "";
    // todo: div reference?
}

UmlItemMember.prototype.getId = function () { return this._id; }

UmlItemMember.prototype.setId = function (id) { this._id = id; }

UmlItemMember.prototype.getName = function () { return this._name; }

UmlItemMember.prototype.setName = function (name) { this._name = name; }



function UmlAttribute() {
    UmlItemMember.apply(this, arguments);
}

UmlAttribute.prototype = Object.create(UmlItemMember.prototype);



function UmlOperation() {
    UmlItemMember.apply(this, arguments);
}

UmlOperation.prototype = Object.create(UmlItemMember.prototype);



function UmlLiteral() {
    UmlItemMember.apply(this, arguments);
}

UmlLiteral.prototype = Object.create(UmlItemMember.prototype);