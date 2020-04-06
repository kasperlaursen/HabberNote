export interface markdownLookupObject {
  regex: RegExp;
  startTag: string;
  endTag: string;
}

const markdownLookup: markdownLookupObject[] = [
  {
    // Title
    regex: /(?<!#)#(?!#)(.*)/g,
    startTag: "<b class='title'>",
    endTag: "</b>",
  },
  {
    // Header 2
    regex: /(?<!#)##(?!#)(.*)/g,
    startTag: "<b class='h1'>",
    endTag: "</b>",
  },
  {
    // Header 3+
    regex: /(###+)(.*)/g,
    startTag: "<b class='h2'>",
    endTag: "</b>",
  },
  {
    // Bold
    regex: /(\*\*|__)(.*?)\1/g,
    startTag: "<b>",
    endTag: "</b>",
  },
  {
    // Italic
    regex: /((?<!_)_(?!_)|(?<!\*)\*(?!\*))(.*?)\1/g,
    startTag: "<i>",
    endTag: "</i>",
  },
  {
    // Code
    regex: /`(.*?)`/g,
    startTag: "<code>",
    endTag: "</code>",
  },
  {
    // Bullet list Item
    regex: /\n\*(.*)/g,
    startTag: "<span class='bullet'>",
    endTag: "</span>",
  },
  {
    // Number List item
    regex: /\n[0-9]+\.(.*)/g,
    startTag: "<span class='number'>",
    endTag: "</span>",
  }
];

export const formatTextToMarkdown = (text: string): string => {
  let mdText: string = text;
  // Loop over markdown loop, to format all entries from the string
  markdownLookup.forEach((mdObj) => {
    const { regex, startTag, endTag } = mdObj;
    mdText = mdText.replace(regex, (match) => `${startTag}${match}${endTag}`);
  });
  return mdText;
};

export const formatMarkdownToText = (mdText: string): string => {
  const replaceRegex: string = markdownLookup
    .map((mdObj) => {
      const escapeRegex = "/[.*+?^${}()|[]\\]/g";
      const startTag = mdObj.startTag.replace(escapeRegex, "\\$&");
      const endTag = mdObj.endTag.replace(escapeRegex, "\\$&");
      return [startTag, endTag];
    })
    .reduce((a, v) => a.concat(v), [])
    .join("|");
  return mdText.replace(`/${replaceRegex}/gi`, "");
};
