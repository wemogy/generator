import * as Generator from "yeoman-generator";
import * as _ from 'lodash';

export default abstract class BaseTemplateGenerator extends Generator{

  get generatorName(): string {
    // the name is the class name
    return Object.getPrototypeOf(this).constructor.name;
  }

  get name(): string {
    return this.generatorName.replace('Generator', '');
  }

  get templateFolderName(): string{
    return _.kebabCase(this.name);
  }

  protected constructor(args: any, opts: any) {
    super(args, opts);
    this.log('Working :)');
  }

  public abstract getQuestions(): Generator.Questions<any>;
}
