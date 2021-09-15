import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { addProjectToSln, getSlnSelectionOptions } from '../DotnetHelpers';

class <%= className %> extends BaseTemplateGenerator {
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
        default: this.appname
      },
      // ...
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
    // Project file
    this.fs.copy(
      this.templatePath('Project.csproj'),
      this.destinationPath(`${this.answers.name}/${this.answers.name}.csproj`)
    );

    // Project Content
    this.fs.copyTpl(this.templatePath('content'), this.destinationPath(this.answers.name), this.answers);

    // Unit Tests
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

export default <%= className %>;
