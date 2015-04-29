$(function () {
    console.log("creating dialog");
    $("#create-new-dialog").dialog({
        modal: true,
        autoOpen: false,
        buttons: [
            {
                text: "Ok",
                click: function () {
                    $("form", $(this)).submit();
                }
            },
            {
                text: "Отмена",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });
    $(".create-new-diagram-button").bind("click", function () {
        $("#create-new-dialog").dialog("open");
    });
});