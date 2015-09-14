function SignalRClient() {
    var self = this;

    self.sendRenameDiagram = $.connection.diagramDrawingHub.server.renameDiagram;

    self.sendResizeDiagram = $.connection.diagramDrawingHub.server.resizeDiagram;

}

var hub = $.connection.diagramDrawingHub;

(function () {
    hub.client.initializeDiagram = function (diagramDto) {
        console.log(diagramDto);
        //initializeDiagram(diagramDto);
    };
    hub.client.renameDiagram = function (diagramDto) {
        console.log("receive rename");
        console.log(diagramDto);
        $("#diagram-name").children("input").first().val(diagramDto.Name);
        diagram.rename(diagramDto.name);
    };
    hub.client.resizeDiagram = function (diagramDto) {
        console.log("receive resize");
        console.log(diagramDto);
        diagram.getDivForDrawing().width(diagramDto.Width);
        diagram.getDivForDrawing().height(diagramDto.Height);
        diagram.resize(diagramDto.Width, diagramDto.Height);
    };
    hub.client.addElement = function (elementDto) {
        console.log("receive add element to diagram");
        console.log(elementDto);
    };
    
    $.connection.hub.logging = true;
    $.connection.hub.start().done(function () {
        $.connection.diagramDrawingHub.server.joinDiagramEdditing(diagram.getId());
    }).fail(function(error) {
        console.log('Invocation of start failed. Error: ' + error);
    });

    
})();

var notifier = {
    notifyDiagramRenamed: function (diagram) {
        console.log("notify rename diagram");
        hub.server.renameDiagram(diagram.getId(), diagram.getName());
    },
    notifyDiagramResized: function(diagram) {
        console.log("notify resize diagram");
        hub.server.resizeDiagram(diagram.getId(), diagram.getWidth(), diagram.getHeight());
    },
    notifyUmlElementAdded: function(id, element) {
        console.log("notify add element");
        hub.server.addElement(id, {
            Id: element.getId(),
            XPosition: element.getLeft(),
            YPosition: element.getTop(),
            Width: element.getWidth(),
            Height: element.getHeight()
        });
    }
};