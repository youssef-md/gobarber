import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse({ template, variables }: IParseMailTemplateDTO): Promise<string>;
}
