import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  formatTextToMarkdown,
  formatMarkdownToText,
} from "./markdownFormatter";

export interface NoteComponentProps {}

const Note = styled.pre`
  width: 100vw;
  border-radius: 10px 10px 0 0;
  flex-grow: 1;
  background: transparent;
  resize: none;
  padding: 10px;
  font-size: 0.8rem;
  white-space: pre-wrap;
`;

const NoteComponent = (props: NoteComponentProps) => {
  const defaultNote: string = formatTextToMarkdown(``);

  const [note, setNote] = useState(defaultNote);
  const [carPos, setCarPos] = useState(0);

  let noteFieldRef: React.RefObject<HTMLPreElement> = React.createRef();

  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      console.log("useEffect");
      setCaretPosition(noteFieldRef.current, carPos);
    } else didMountRef.current = true;
  });

  const handleChange = (event: React.FormEvent<HTMLPreElement>) => {
    const inputElement: HTMLPreElement = event.currentTarget;

    const inputText: string = inputElement.innerText;

    setCarPos(getCharacterOffsetWithin(inputElement));

    const cleanText: string = formatMarkdownToText(inputText);
    setNote(formatTextToMarkdown(cleanText));
  };

  return (
    <Note
      ref={noteFieldRef}
      contentEditable="true"
      onInput={handleChange}
      dangerouslySetInnerHTML={{ __html: note }}
    ></Note>
  );
};

function getCharacterOffsetWithin(element) {
  var start = 0;
  var end = 0;
  var doc = element.ownerDocument || element.document;
  var win = doc.defaultView || doc.parentWindow;
  var sel;
  if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
          var range = win.getSelection().getRangeAt(0);
          var preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(element);
          preCaretRange.setEnd(range.startContainer, range.startOffset);
          start = preCaretRange.toString().length;
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          end = preCaretRange.toString().length;
      }
  } else if ( (sel = doc.selection) && sel.type != "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToStart", textRange);
      start = preCaretTextRange.text.length;
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      end = preCaretTextRange.text.length;
  }
  console.log({ start: start, end: end });
  return start;
}

// function getCharacterOffsetWithin(node): number {
//   var range = window.getSelection().getRangeAt(0);
//   var treeWalker = document.createTreeWalker(
//     node,
//     NodeFilter.SHOW_TEXT,
//     function filter(node: Node) {
//       var nodeRange = document.createRange();
//       nodeRange.selectNode(node);
//       return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1
//         ? NodeFilter.FILTER_ACCEPT
//         : NodeFilter.FILTER_REJECT;
//     } as any,
//     false
//   );

//   var charCount = 0;
//   while (treeWalker.nextNode()) {
//     const curNode: any = treeWalker.currentNode as any;
//     charCount += curNode.length;
//   }
//   if (range.startContainer.nodeType == 3) {
//     charCount += range.startOffset;
//   }
//   return charCount;
// }

export function setCaretPosition(el, pos) {
  // Loop through all child nodes
  for (var node of el.childNodes) {
    if (node.nodeType == 3) {
      // we have a text node
      if (node.length >= pos) {
        // finally add our range
        var range = document.createRange(),
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
      if (pos == -1) {
        return -1; // no need to finish the for loop
      }
    }
  }
  return pos; // needed because of recursion stuff
}

export default NoteComponent;
