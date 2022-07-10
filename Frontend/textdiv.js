var textdiv = document.getElementsByClassName("edit");

function insertIntoDoc(data, copy) {
  if (!window.getSelection) return;
  const sel = window.getSelection();
  if (!sel.rangeCount) return;
  const range = sel.getRangeAt(0);
  range.collapse(true);
  const span = document.createElement("span");
  span.appendChild(document.createTextNode(data));
  span.style.whiteSpace = "pre";
  range.insertNode(span);
  // Move the caret immediately after the inserted span
  range.setStartAfter(span);
  range.collapse(true);
  if (copy) {
    let data2;
    switch (data) {
      case "{":
        data2 = "}";
        break;
      case "(":
        data2 = ")";
        break;
      case "[":
        data2 = "]";
        break;
      case "<":
        data2 = ">";
        break;
      default:
        data2 = data;
        break;
    }
    const span1 = document.createElement("span");
    span1.appendChild(document.createTextNode(data2));
    span1.style.whiteSpace = "pre";
    range.insertNode(span1);
    range.collapse(true);
  }
  sel.removeAllRanges();
  sel.addRange(range);
}
