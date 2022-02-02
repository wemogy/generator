import * as _ from 'lodash';
import { addProjectToSln, getSlnSelectionOptions, toPascalCase } from '../DotnetHelpers';
import BaseTemplateGenerator from '../BaseTemplateGenerator';

class DotAspNetGenerator extends BaseTemplateGenerator {
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
        default: this.options.defaultName || 'MyProject'
      },
      {
        type: 'input',
        name: 'parentPath',
        message: 'Project parent folder path (from repository root)',
        default: 'src'
      },
      {
        type: 'confirm',
        name: 'dapr',
        message: 'Use Dapr?',
        default: true
      },
      {
        type: 'confirm',
        name: 'wemogyIdentity',
        message: 'Use wemogy Identity?',
        default: true
      },
      {
        type: 'confirm',
        name: 'authorization',
        message: 'Use Authorization?',
        default: true
      },
      {
        type: 'confirm',
        name: 'unitTests',
        message: 'Add Unit Tests',
        default: true
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
    this.log(this.answers);
    this.copyTemplateToDestination();
    this.log(this.answers);

    // Unit Tests
    if (this.answers.unitTests) {
      this.composeWith('wemogy:dotnet-xunit', {
        name: `${this.answers.name}.Core.UnitTests`,
        referenceProjectToTest: true,
        projectToTest: `../${this.answers.name}.Core/${this.answers.name}.Core.csproj`,
        solution: this.answers.solution
      });
    }
  }

  // Where installation are run (npm, bower)
  public install(): void {
    addProjectToSln.bind(this)(
      this.answers.solution,
      this.destinationPath(`${this.answers.name}.Api/${this.answers.name}.Api.csproj`)
    );
    addProjectToSln.bind(this)(
      this.answers.solution,
      this.destinationPath(`${this.answers.name}.Core/${this.answers.name}.Core.csproj`)
    );
  }

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default DotAspNetGenerator;
