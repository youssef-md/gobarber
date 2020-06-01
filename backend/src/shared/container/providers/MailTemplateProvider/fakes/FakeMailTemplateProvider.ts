import IMailTemplateProvider from '../models/IMailTemplate';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class FakeMailProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}
