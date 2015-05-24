/**
 * Support contenteditable in draggable
 * @param {jQuery} editable div
 * @param {jQuery} draggable element
 */
function makeContenteditable(editable, container) {
    editable.dblclick(function () {
         container.draggable({ disabled: true });
        $(this).focus();
    });
    container.click(function () {
         container.draggable({ disabled: false });
    });
}