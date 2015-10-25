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
    hub.client.addClass = function (elementDto) {
        addElement(elementDto, "class-clone", UmlClass);
    };
    hub.client.addInterface = function (elementDto) {
        addElement(elementDto, "interface-clone", UmlInterface);
    };
    hub.client.addEnum = function (elementDto) {
        addElement(elementDto, "enumeration-clone", UmlEnum);
    };
    hub.client.addComment = function (elementDto) {
        addElement(elementDto, "comment-clone", UmlComment);
    };
    hub.client.moveElement = function (elementDto) {
        var element = diagram.getUmlElementById(elementDto.Id);
        element.resize(elementDto.YPosition, elementDto.XPosition, elementDto.Width, elementDto.Height);
    }; 
    hub.client.renameElement = function (elementDto) {
        var element = diagram.getUmlElementById(elementDto.Id);
        element.setTitle(elementDto.Text);
    };
    hub.client.addArrow = function (arrowDto) {
        var firstElement = diagram.getUmlElementById(arrowDto.First.Id);
        var secondElement = diagram.getUmlElementById(arrowDto.Second.Id);
        var arrow = new Arrow(firstElement, secondElement);
        arrow.setId(arrowDto.Id);
        diagram.addArrow(arrow);
    };
    hub.client.deleteElement = function (id) {
        diagram.deleteElement(id);
    };
    hub.client.addAttribute = function (elementId, attributeId) {
        var element = diagram.getUmlElementById(elementId);
        var attribute = element.newAttribute();
        attribute.setId(attributeId);
        element.addItemsLine(".attributes-list", attribute);
    };
    hub.client.renameAttribute = function (elementId, attributeId, newName) {
        var element = diagram.getUmlElementById(elementId);
        //var attribute = element.getAttribute(attributeId);
        //attribute.setName(newName);
    };
    
    
    $.connection.hub.logging = true; 
    $.connection.hub.start().done(function () {
        $.connection.diagramDrawingHub.server.joinDiagramEdditing(diagram.getId());
    }).fail(function(error) {
        console.log('Invocation of start failed. Error: ' + error);
    });

    function addElement(elementDto, helperId, ctor) {
        console.log("receive add element to diagram", helperId);
        console.log(elementDto);
        var div = $("#" + helperId)
            .clone()
            .css("display:", "")
            .removeAttr("id");
        var umlItem = new ctor(div, diagram, elementDto.YPosition, elementDto.XPosition);
        umlItem.setId(elementDto.Id);
        diagram.addItem(umlItem);
    }
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
    notifyUmlClassAdded: function (id, element) {
        hub.server.addClass(id, notifier._prepareElement(element));
    },
    notifyUmlInterfaceAdded: function(id, element) {
        hub.server.addInterface(id, notifier._prepareElement(element));
    },
    notifyUmlEnumAdded: function(id, element) {
        hub.server.addEnum(id, notifier._prepareElement(element));
    },
    notifyUmlCommentAdded: function (id, element) {
        hub.server.addComment(id, notifier._prepareElement(element));
    },

    notifyUmlElementMoved: function (id, element) {
        hub.server.moveElement(id, element.getId(),
            element.getTop(), element.getLeft(), element.getWidth(), element.getHeight());
    },

    notifyUmlElementRenamed: function (id, element) {
        hub.server.renameElement(id, element.getId(), element.getTitle());
    },

    notifyArrowAdded: function (id, arrow) {
        hub.server.addArrow(id, arrow.getId(), arrow.getFirstElement().getId(), arrow.getSecondElement().getId());
    },

    notifyDeleteElement: function (id, element) {
        hub.server.deleteElement(id, element.getId());
    },

    notifyAttributeAdded: function (id, element, attribute) {
        hub.server.addAttribute(id, element.getId(), attribute.getId());
    },

    notifyItemMemberChanged: function (id, elementId, attributeId, newName) {
        hub.server.renameAttribute(id, element.getId(), attribute.getId());
    },

    _prepareElement: function(element) {
        console.log("notify add element");
        return {
            Id: element.getId(),
            XPosition: element.getLeft(),
            YPosition: element.getTop(),
            Width: element.getWidth(),
            Height: element.getHeight(),
            Text: element.getTitle()
        };
    }
};