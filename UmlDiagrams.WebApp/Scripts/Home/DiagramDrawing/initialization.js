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


    var diagram = new Diagram();


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

    $(".icon-class").parent().draggable({
        helper: function () {
            return $("#class-clone").clone().css("display", "")
                .removeAttr("id")
                .addClass(CREATING_ELEMENT_CLASS);
        },
        cursorAt: { left: 0 }
    });

    $("#diagram-container").droppable({
        tolerance: "fit",
        drop: function (event, ui) {
            if (!ui.helper.hasClass(CREATING_ELEMENT_CLASS))
                return;
            console.log("add class");
            var classDiv = ui.helper.clone();
            classDiv.removeClass(CREATING_ELEMENT_CLASS);
            diagram.act(classDiv);
        }
    }).resizable({
        
    }).click(function () {
        
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
        var container = $(this).closest(".type-container");
        var creatingAttribute = $("<li>").attr("contenteditable", "true");
        $(".attributes-list", container).append(creatingAttribute);
        makeContenteditable(creatingAttribute, container);
    });

    $(document).on("click", ".button-add-operation", function () {
        var container = $(this).closest(".type-container");
        var creatingOperation = $("<li>").attr("contenteditable", "true");
        $(".operations-list", container).append(creatingOperation);
        makeContenteditable(creatingOperation, container);
    });


});
