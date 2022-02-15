import * as _ from 'lodash';
import BaseTemplateGenerator from './BaseTemplateGenerator';
import { getSlnFiles, toPascalCase } from './DotnetHelpers';

class BaseDotnetTemplateGenerator extends BaseTemplateGenerator {
  private slnAvailable: boolean;

  protected slnPrompt = {
    when: () => !this.slnAvailable,
    type: 'input',
    name: 'solutionName',
    message: 'Solution name',
    default: `Wemogy.${toPascalCase(this.appname)}`
  };

  constructor(args: any, options: any) {
    super(args, options);
    this.slnAvailable = getSlnFiles().length > 0;
    if (!this.slnAvailable) {
      this.log.info('No .NET Solution found. We will create one during the process.');
    }
  }

  protected composeSolutionIfNeeded() {
    if (!this.slnAvailable) {
      this.composeWith('wemogy:dotnet-solution', {
        name: this.answers.solutionName,
        styleCop: true
      });
    }
  }

  protected getSolutionPath(): string {
    return this.slnAvailable ? getSlnFiles()[0] : `./src/${this.answers.solutionName}.sln`;
  }
}

export default BaseDotnetTemplateGenerator;
