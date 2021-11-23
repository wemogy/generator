import * as _ from 'lodash';
import { addProjectToSln, getSlnSelectionOptions, toPascalCase } from '../DotnetHelpers';
import BaseTemplateGenerator from '../BaseTemplateGenerator';

class DotAzureFunctionGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.argument('defaultName', { type: String, required: false });
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: this.pascalCase(this.options.defaultName) || 'MyProject'
      },
      {
        type: 'list',
        name: 'solution',
        message: 'Add to Solution',
        choices: getSlnSelectionOptions()
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.copyTemplateToDestination();
  }

  // Where installation are run (npm, bower)
  public install(): void {
    addProjectToSln.bind(this)(
      this.answers.solution,
      this.destinationPath(`${this.answers.name}/${this.answers.name}.csproj`)
    );
  }

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default DotAzureFunctionGenerator;
