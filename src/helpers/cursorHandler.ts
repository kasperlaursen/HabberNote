/**
 * Returns the start position of the current selection.
 * Code originally by Tim Down on stackoverflow https://stackoverflow.com/a/4812022
 * @param element The html div element that the cursor is in
 * @param wasEnter Flag to determine if the last keypress was Enter
 */
export const getCharacterOffset = (element, wasEnter: boolean): number => {
  let start = 0;
  //let end = 0;
  const doc = element.ownerDocument || element.document;
  const win = doc.defaultView || doc.parentWindow;
  let sel;
  if (typeof win.getSelection != "undefined") {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      const range = win.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.startContainer, range.startOffset);
      start = preCaretRange.toString().length;
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      //end = preCaretRange.toString().length;
    }
  } else if ((sel = doc.selection) && sel.type !== "Control") {
    const textRange = sel.createRange();
    const preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint("EndToStart", textRange);
    start = preCaretTextRange.text.length;
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    //end = preCaretTextRange.text.length;
  }
  // If the last keypress was Enter, add one to the position!
  return wasEnter ? start + 1 : start;
};

/**
 * Sets the cursor to the defined position in the passed element
 * Code originally by Sorunome on stackoverflow https://stackoverflow.com/a/36953852
 * @param element The element to set the position on.
 * @param pos The position to set the cursor at
 */
export const setCaretPosition = (element, pos): number => {
  // Loop through all child nodes
  for (const node of element.childNodes) {
    if (node.nodeType === 3) {
      // we have a text node
      if (node.length >= pos) {
        // finally add our range
        const range = document.createRange(),
          sel = window.getSelection();
        range.setStart(node, pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return -1; // we are done
      } else {
        pos -= node.length;
      }
    } else {
      pos = setCaretPosition(node, pos);
      if (pos === -1) {
        return -1; // no need to finish the for loop
      }
    }
  }
  return pos; // needed because of recursion stuff
};
