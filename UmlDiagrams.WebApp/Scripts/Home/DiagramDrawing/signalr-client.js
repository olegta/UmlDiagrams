function SignalRClient() {
    var self = this;

    self.sendRenameDiagram = $.connection.diagramDrawingHub.server.renameDiagram;

    self.sendResizeDiagram = $.connection.diagramDrawingHub.server.resizeDiagram;

}

(function () {
    var hub = $.connection.diagramDrawingHub;
    hub.client.renameDiagram = function () {
        diagram.rename;
    };
    $.connection.hub.start().done(function () {
        var diagram = $.connection.diagramDrawingHub.server.joinDiagramEdditing(diagram.getId());
        //initializeDiagram(diagram);
    });

    
})();