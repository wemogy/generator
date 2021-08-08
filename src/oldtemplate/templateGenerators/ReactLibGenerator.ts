import * as Generator from "yeoman-generator";
import BaseTemplateGenerator from './BaseTemplateGenerator';

export default class ReactLibGenerator extends BaseTemplateGenerator{
  public constructor(args: any, opts: any) {
    super(args, opts);
  }

  public getQuestions(): Generator.Questions<any>{
    return [
      {
        message: 'Really lib?',
        type: 'input',
        name: 'p1'
      },
      {
        message: 'Really 2 lib?',
        type: 'input',
        name: 'p2',
        default: 'Hallo'
      }
    ]
  }
}
