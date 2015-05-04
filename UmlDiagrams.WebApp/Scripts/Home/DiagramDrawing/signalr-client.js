$(function () {
    $.connection.diagramDrawingHub.client.addDiagram = function () {
        alert(123);
    };
    $.connection.hub.start().done(function() {
        $.connection.diagramDrawingHub.server.renameDiagram({ a: "123", b: "456" });
    });
});