/** Strip every hyphen and dash so none appear in on-screen copy. */
export function noHyphen(text: string | null | undefined): string {
  if (text == null) return "";
  return text
    .replace(/[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D-]+/g, " ")
    .replace(/ {2,}/g, " ");
}
