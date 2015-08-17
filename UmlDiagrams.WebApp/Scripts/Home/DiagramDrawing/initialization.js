$(function () {
    "use strict";

    /** @const */
    var CREATING_ELEMENT_CLASS = "dragging-to-diagram";
    /** @const */
    var TOOLBOX_POINTER_CLASS = "icon-pointer";
    /** @const */
    var TOOLBOX_CLASS_CLASS = "icon-class";
    /** @const */
    var TOOLBOX_INTERFACE_CLASS = "icon-interface";
    /** @const */
    var TOOLBOX_ENUMERATION_CLASS = "icon-enumeration";
    /** @const */
    var TOOLBOX_COMMENT_CLASS = "icon-comment";
    /** @const */
    var TOOLBOX_ASSOCIATION_CLASS = "icon-association";
    /** @const */
    var TOOLBOX_AGGREGATION_CLASS = "icon-aggregation";
    /** @const */
    var TOOLBOX_COMPOSITION_CLASS = "icon-composition";
    /** @const */
    var TOOLBOX_DEPENDENCY_CLASS = "icon-dependency";
    /** @const */
    var TOOLBOX_INHERITANCE_CLASS = "icon-inheritance";
    /** @const */
    var TOOLBOX_CONNECTOR_CLASS = "icon-connector";


    var diagram = new Diagram($("#diagram-container"), $("#diagram-container canvas"));


    var toolboxItems = $("#uml-elements-items").children();
    toolboxItems.bind("mousemove", function () {
        var selected = this;
        if (!$(selected).hasClass("toolbox-element-selected"))
            $(selected).addClass("toolbox-element-over");
        toolboxItems.each(function () {
            if (this !== selected)
                $(this).removeClass("toolbox-element-over");
        });
    }).bind("mouseout", function() {
        $(this).removeClass("toolbox-element-over");
    }).bind("mousedown", function () {
        var selected = this;
        var classes = $(selected).children().first().attr("class").split(/\s+/);
        for (var i = 0; i < classes.length; i++) {
            if (Diagram.States.hasOwnProperty(classes[i])) {
                console.dir(Diagram.States[classes[i]]);
                diagram.setDrawingMode(Diagram.States[classes[i]]);
                break;
            }
        }
        $(selected).addClass("toolbox-element-selected");
        toolboxItems.each(function () {
            $(this).removeClass("toolbox-element-over");
            if (this !== selected)
                $(this).removeClass("toolbox-element-selected");
        });        
    }).first().trigger("mousedown");

    $("." + TOOLBOX_POINTER_CLASS).addClass(CREATING_ELEMENT_CLASS);

    var draggableItems = [
        { icon: ".icon-class", helper: "#class-clone" },
        { icon: ".icon-interface", helper: "#interface-clone" },
        { icon: ".icon-enumeration", helper: "#enumeration-clone" },
        { icon: ".icon-comment", helper: "#comment-clone" }
    ];
    for (var i = 0; i < draggableItems.length; i++) {
        (function () { // сохраняем текущее значение счетчика
            var draggableInfo = draggableItems[i];
            $(draggableInfo.icon).parent().draggable({
                helper: function() {
                    return $(draggableInfo.helper).clone().css("display", "")
                        .removeAttr("id")
                        .addClass(CREATING_ELEMENT_CLASS);
                },
                cursorAt: { left: 0 }
            });
        })();
    }

    $("#diagram-container").droppable({
        tolerance: "fit",
        drop: function (event, ui) {
            if (!ui.helper.hasClass(CREATING_ELEMENT_CLASS))
                return;
            var activeElement = diagram.getHelper();
            if (!activeElement)
                throw new Error("droped element not found");
            activeElement.removeClass(CREATING_ELEMENT_CLASS);
            var leftPosition = Number(ui.helper.css("left").match(/\d+/))
                - $("#diagram-container")[0].offsetLeft;
            var topPosition = Number(ui.helper.css("top").match(/\d+/))
                - $("#diagram-container")[0].offsetTop;
            alert(leftPosition + " " + topPosition);
            diagram.act(activeElement, leftPosition, topPosition);
        }
    }).resizable({
        stop: diagram.resize
    }).click(function (event) {
        // diagram.act(newItemDiv, event.pageX, event.pageY);
    });
    $(document).on("click", ".collapse-icon,.expand-icon", function () {
        var typeContainer = $(this).closest(".type-container");
        if ($(this).hasClass("collapse-icon")) {
            typeContainer.animate({ height: $(this).parent().outerHeight(true) + "px" });
        } else if ($(this).hasClass("expand-icon")) {
            typeContainer.animate({ height: typeContainer[0].scrollHeight });
        } else {
            throw new Error("invalid state of expand-collapse icon");
        }
        $(this).toggleClass("collapse-icon");
        $(this).toggleClass("expand-icon");
    });

    $(document).on("click", ".button-add-attribute", function () {
        addItemsLine.call(this, ".attributes-list");
    });

    $(document).on("click", ".button-add-operation", function () {
        addItemsLine.call(this, ".operations-list");
    });

    $(document).on("click", ".button-add-literal", function () {
        addItemsLine.call(this, ".literals-list");
    });
});

function addItemsLine(listSelector) {
    var container = $(this).closest(".type-container");
    var creatingItem = $("<li>").attr("contenteditable", "true");
    $(listSelector, container).append(creatingItem);
    makeContenteditable(creatingItem, container);
    $(creatingItem).focus();
}
