$(function() {
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
});