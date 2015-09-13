function Arrow(firstElement, secondElement, type) {
    var self = this;

    var _id = guid();

    var _firstElement = firstElement;
    var _secondElement = secondElement;

    var _arrowType = type;

    var _isDirty = false;

    var _arrowCanvas;

    self.attachCanvas = function (diagram, canvas) {
        _diagram = diagram;
        _arrowCanvas = canvas;
    }

    self.draw = function () {
        $(_arrowCanvas).css("width", "");
        $(_arrowCanvas).css("height", "");
        var context = _arrowCanvas.getContext('2d');
        if (_isDirty) {
            context.clearRect(0, 0, _arrowCanvas.width, _arrowCanvas.height);
        }
        _isDirty = true;

        var firstPoint = getCentre(_firstElement);
        console.log(firstPoint.x);
        console.log(firstPoint.y);
        var secondPoint = getCentre(_secondElement);

        context.strokeStyle = "#050";
        context.beginPath();
        context.moveTo(firstPoint.x, firstPoint.y);
        context.lineTo(secondPoint.x, secondPoint.y);
        context.arc(secondPoint.x, secondPoint.y, 3, 0, Math.PI * 2, true);
        context.closePath();
        context.stroke();
        context.fill();
        console.log(firstPoint);
        console.log(secondPoint);
        function getCentre(umlElement) {
            return {
                x: umlElement.getLeft() + umlElement.getWidth() / 2,
                y: umlElement.getTop() + umlElement.getHeight() / 2
            }
        }
    }


    self.getId = function() {
        return _id;
    }
    self.setId = function(id) {
        _id = id;
    }
    self.getFirstElement = function() {
        return _firstElement;
    }
    self.setFirstElement = function(element) {
        _firstElement = element;
    }
    self.getSecondElement = function() {
        return _secondElement;
    }
    self.setSecondElement = function(element) {
        _secondElement = element;
    }
    self.getType = function() {
        return _arrowType;
    }
    self.setType = function(type) {
        _arrowType = type;
    }
    self.toString = function() {
        return "[id: " + _id + " name: " + _name + "]";
    }
}