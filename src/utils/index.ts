export const sensitiveRegex = (text?: string): string => {
  if (!text) return "";
  return text
    .toLocaleLowerCase()
    .replace(/a/g, "[a,á,à,ä,â,ã]")
    .replace(/e/g, "[e,é,ë,è,ê,ẽ]")
    .replace(/i/g, "[i,í,ï,ì,î,ĩ]")
    .replace(/o/g, "[o,ó,ö,ò,ô,õ]")
    .replace(/u/g, "[u,ü,ú,ù,û,ũ]");
};
