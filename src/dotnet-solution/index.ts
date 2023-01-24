import BaseTemplateGenerator from '../BaseTemplateGenerator';
import * as _ from 'lodash';
import { toPascalCase } from '../DotnetHelpers';

class DotNetSolutionGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Solution name',
        default: `Wemogy.${toPascalCase(this.appname)}`
      },
      {
        type: 'input',
        name: 'targetDirectory',
        message: 'Target directory',
        default: 'src'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.copyTemplateToDestination(this.answers.targetDirectory);
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default DotNetSolutionGenerator;
