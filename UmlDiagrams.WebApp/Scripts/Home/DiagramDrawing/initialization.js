$(function () {
    "use strict";

    /** @const */
    var CREATING_ELEMENT_CLASS = "dragging-to-diagram";

    var toolboxItems = $("#uml-elements-items").children();
    toolboxItems.bind("mousemove", function() {
        var selected = this;
        if (!$(selected).hasClass("toolbox-element-selected"))
            $(selected).addClass("toolbox-element-over");
        toolboxItems.each(function() {
            if (this !== selected)
                $(this).removeClass("toolbox-element-over");
        });
    }).bind("mouseout", function() {
        $(this).removeClass("toolbox-element-over");
    }).bind("click", function() {
        var selected = this;
        $(selected).addClass("toolbox-element-selected");
        toolboxItems.each(function() {
            $(this).removeClass("toolbox-element-over");
            if (this !== selected)
                $(this).removeClass("toolbox-element-selected");
        });
    });

    $("#diagram-container").droppable({
        tolerance: "fit",
        drop: function (event, ui) {
            if (!ui.helper.hasClass(CREATING_ELEMENT_CLASS))
                return;
            var helperCopy = ui.helper.clone();
            helperCopy.removeClass(CREATING_ELEMENT_CLASS);
            $("#diagram-container").append(helperCopy);
            var leftPosition = Number(helperCopy.css("left").match(/\d+/)) - this.offsetLeft;
            var topPosition = Number(helperCopy.css("top").match(/\d+/)) - this.offsetTop;
            helperCopy.css({ "left": leftPosition + "px", "top": topPosition + "px" });
            helperCopy.draggable({
                containment: "#diagram-container"
            }).resizable({
                handles: "all"
            });

            // support contenteditable in draggable 
            $(".type-title", helperCopy).dblclick(function () {
                console.log("enable");
                helperCopy.draggable({ disabled: true });
                $(this).focus();
            });
            helperCopy.click(function () {
                console.log("disable");
                helperCopy.draggable({ disabled: false });
            });
        }
    }).resizable({
        
    });

    $(".icon-class").parent().draggable({
        helper: function() {
            return $("#class-clone").clone().css("display", "")
                .removeAttr("id")
                .addClass(CREATING_ELEMENT_CLASS);
        },
        cursorAt: { left: 0 }
    });
});