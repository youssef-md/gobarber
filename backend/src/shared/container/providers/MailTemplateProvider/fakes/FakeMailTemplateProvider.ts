import IMailTemplateProvider from '../models/IMailTemplate';

export default class FakeMailProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}
