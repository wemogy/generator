import * as Generator from "yeoman-generator";
import BaseTemplateGenerator from './BaseTemplateGenerator';

export default class ReactAppGenerator extends BaseTemplateGenerator{
  public constructor(args: any, opts: any) {
    super(args, opts);
  }

  public getQuestions(): Generator.Questions<any>{
    return [
      {
        message: 'Really?',
        type: 'input',
        name: 'p1'
      },
      {
        message: 'Really 2?',
        type: 'input',
        name: 'p2',
        default: 'Hallo'
      }
    ]
  }
}
