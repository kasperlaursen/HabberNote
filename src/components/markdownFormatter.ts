export interface markdownLookupObject {
  regex: RegExp;
  startTag: string;
  endTag: string;
}

const markdownLookup: markdownLookupObject[] = [
  {
    regex: /(#+)(.*)/g,
    startTag: "<b>",
    endTag: "</b>",
  },
  {
    regex: /(##+)(.*)/g,
    startTag: "<b>",
    endTag: "</b>",
  },
  {
    regex: /(\*\*|__)(.*?)\1/g,
    startTag: "<b>",
    endTag: "</b>",
  },
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
