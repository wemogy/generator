import { toPascalCase } from '../DotnetHelpers';
import BaseDotnetProjectTemplateGenerator from '../BaseDotnetProjectTemplateGenerator';

class DotnetLibraryProjectGenerator extends BaseDotnetProjectTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      this.slnPrompt, // Ask for a solution name, if none was found
      {
        type: 'input',
        name: 'folder',
        message: 'Subfolder name',
        default: 'core'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.composeSolutionIfNeeded();

    this.composeWith('wemogy:dotnet-classlib', {
      destinationRoot: this.destinationRoot(`src/shared/${this.answers.folder.toLowerCase()}`),
      defaultName: `Wemogy.${toPascalCase(this.appname)}.Shared.${toPascalCase(this.answers.folder)}`,
      unitTests: true,
      solution: this.getSolutionPath()
    });
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {
    this.eclint();
  }
}

export default DotnetLibraryProjectGenerator;
