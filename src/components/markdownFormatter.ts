export interface markdownLookupObject {
  regex: RegExp;
  startTag: string;
  endTag: string;
}

const markdownLookup: markdownLookupObject[] = [
  {
    regex: /(#+)(.*)/,
    startTag: "<b>",
    endTag: "</b>"
  },
  {
    regex: /(##+)(.*)/,
    startTag: "<b>",
    endTag: "</b>"
  },
  {
    regex: /(\*\*|__)(.*?)\1/,
    startTag: "<b>",
    endTag: "</b>"
  }
];

export const formatTextToMarkdown = (text: string): string => {
  console.log("formatTextToMarkdown", text);
  let mdText: string = text;
  // Loop over markdown loop, to format all entries from the string
  markdownLookup.forEach(mdObj => {
    const { regex, startTag, endTag } = mdObj;
    const matches = mdText.match(regex) ? mdText.match(regex)[0] : "";
    console.log(matches);
    mdText = mdText.replace(regex, `${startTag}${matches}${endTag}`);
  });
  console.log(mdText);
  return mdText;
};

export const formatMarkdownToText = (mdText: string): string => {
  console.log("formatMarkdownToText", mdText);
  const replaceRegex: string = markdownLookup
    .map(mdObj => {
      const escapeRegex = "/[.*+?^${}()|[]\\]/g";
      const startTag = mdObj.startTag.replace(escapeRegex, "\\$&");
      const endTag = mdObj.endTag.replace(escapeRegex, "\\$&");
      return [startTag, endTag];
    })
    .reduce((a, v) => a.concat(v), [])
    .join("|");
  return mdText.replace(`/${replaceRegex}/gi`, "");
};
