import htmlToPdfmake from 'html-to-pdfmake';
import type { Content } from 'pdfmake/interfaces';
import { JSDOM } from 'jsdom';

type ContentReplacer = Record<string, string>;

export const getHtmlContent = (
  html: string,
  replacers: ContentReplacer = {},
): Content => {
  Object.entries(replacers).forEach(([key, value]) => {
    const key1 = `{{${key}}}`;
    const key2 = `{{ ${key} }}`;

    html = html.replaceAll(key1, value).replaceAll(key2, value);
  });

  return htmlToPdfmake(html, new JSDOM().window);
};
