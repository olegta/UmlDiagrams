function Arrow(firstElement, secondElement, canvas) {
    var self = this;

    var _firstElement = firstElement;
    var _secondElement = secondElement;

    var _arrowCanvas = canvas;

    var isDirty = false;

    self.draw = function () {
        var context;
        if (isDirty) {
            context = _arrowsCanvas[0].getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        isDirty = true;
        //// Рисуем окружность 
        context.strokeStyle = "#050";
        //context.fillStyle = "#fc0";
        context.beginPath();
        context.arc(100, 100, 3, 0, Math.PI * 2, true);
        context.moveTo(100, 100);
        context.lineTo(50, 50);
        context.closePath();
        context.stroke();
        context.fill();
    }
}