import fs from 'fs';
import handlebars from 'handlebars';

import IMailTemplateProvider from '../models/IMailTemplate';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
