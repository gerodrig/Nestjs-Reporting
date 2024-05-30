import type { TDocumentDefinitions } from 'pdfmake/interfaces';

type ReportOptions = {
  name: string;
};

export const getHelloWorldReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { name } = options;
  const documentDefinition: TDocumentDefinitions = {
    content: [`Hello ${name}`],
  };

  return documentDefinition;
};
