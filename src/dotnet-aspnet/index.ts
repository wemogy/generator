import * as _ from 'lodash';
import { addProjectToSln, getSlnSelectionOptions, toPascalCase } from '../DotnetHelpers';
import BaseTemplateGenerator from '../BaseTemplateGenerator';

class DotAspNetGenerator extends BaseTemplateGenerator {
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
        message: 'Project name',
        default: `Wemogy.Services.${toPascalCase(this.appname)}`
      },
      {
        type: 'input',
        name: 'parentPath',
        message: 'Project parent folder path (from repository root)',
        default: 'src'
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
    this.fs.copy(
      this.templatePath('Project.csproj'),
      this.destinationPath(`${this.answers.name}/${this.answers.name}.csproj`)
    );
    this.fs.copyTpl(this.templatePath('Dockerfile'), this.destinationPath('Dockerfile'), this.answers);
    this.fs.copyTpl(this.templatePath('content'), this.destinationPath(this.answers.name), this.answers);

    if (this.answers.unitTests) {
      this.composeWith('wemogy:dotnet-xunit', {
        name: `${this.answers.name}.Tests`,
        referenceProjectToTest: true,
        projectToTest: `../${this.answers.name}/${this.answers.name}.csproj`,
        solution: this.answers.solution
      });
    }
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

export default DotAspNetGenerator;
