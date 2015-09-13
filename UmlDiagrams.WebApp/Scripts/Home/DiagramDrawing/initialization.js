var diagram = null;

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

    var nameField = $("#diagram-name");
    diagram = new Diagram($("#diagram-container"), nameField.text());
    diagram.setDrawingMode(Diagram.States["icon-pointer"]);

    nameField.bind("input", function() {
        diagram.rename($(this).text());
        // todo: signal R notifyDiagramRenamed(diagram.getId(), diagram.getName())
    });

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
        var first = $(selected).children().first();
        var classes = first.attr("class").split(/\s+/);
        for (var i = 0; i < classes.length; i++) {
            if (Diagram.States.hasOwnProperty(classes[i])) {
                diagram.setDrawingMode(Diagram.States[classes[i]]);
                break;
            }
        }
        pickOutToolboxElement($(selected));
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
            diagram.act(activeElement, leftPosition, topPosition);
            resetDrawingMode();
        }
    }).resizable({
        stop: function(event, ui) {
            diagram.resize(event, ui);
            // TODO: signal R notifyDiagramResize(self)
        }
    }).click(function (event) {
        var position = diagram.getDivForDrawing().position();
        diagram.act(diagram.getHelper(), event.pageX - position.left, event.pageY - position.top);
        if (diagram.actionCompleted())
            resetDrawingMode();
    });

    function pickOutToolboxElement(elementDiv) {
        elementDiv.addClass("toolbox-element-selected");
        toolboxItems.each(function () {
            $(this).removeClass("toolbox-element-over");
            if (this !== elementDiv[0])
                $(this).removeClass("toolbox-element-selected");
        });
    }

    function resetDrawingMode() {
        diagram.setDrawingMode(Diagram.States["icon-pointer"]);
        pickOutToolboxElement(toolboxItems.first());
    }
});


