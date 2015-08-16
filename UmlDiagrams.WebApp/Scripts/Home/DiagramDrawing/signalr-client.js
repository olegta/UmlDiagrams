function SignalRClient() {
    var self = this;

    self.sendRenameDiagram = $.connection.diagramDrawingHub.server.renameDiagram;

    self.sendResizeDiagram = $.connection.diagramDrawingHub.server.resizeDiagram;

}

(function () {
    var hub = $.connection.diagramDrawingHub;
    hub.client.addDiagram = function () {
        alert(123);
    };
    $.connection.hub.start().done(function () {
        $.connection.diagramDrawingHub.server.renameDiagram("456");
    });

    
})();