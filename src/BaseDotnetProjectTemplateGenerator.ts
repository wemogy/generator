import * as _ from 'lodash';
import BaseTemplateGenerator from './BaseTemplateGenerator';
import { getSlnFiles } from './DotnetHelpers';

class BaseDotnetProjectTemplateGenerator extends BaseTemplateGenerator {
  private slnAvailable: boolean;

  protected slnPrompt = {
    when: () => !this.slnAvailable,
    type: 'input',
    name: 'solutionName',
    message: 'Solution name',
    default: _.upperFirst(_.camelCase(this.appname))
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
        destinationRoot: this.destinationRoot('src'),
        name: this.answers.solutionName,
        styleCop: true
      });
    }
  }

  protected getSolutionPath(): string | undefined {
    return this.slnAvailable ? undefined : `./src/${this.answers.solutionName}.sln`;
  }
}

export default BaseDotnetProjectTemplateGenerator;
