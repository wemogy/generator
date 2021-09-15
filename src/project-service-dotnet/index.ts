import { enforceSolutionFilePresence } from '../DotnetHelpers';
import BaseDotnetProjectTemplateGenerator from '../BaseDotnetProjectTemplateGenerator';

class DotnetServiceProjectGenerator extends BaseDotnetProjectTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {
    enforceSolutionFilePresence.bind(this)();
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      this.slnPrompt, // Ask for a solution name, if none was found
      {
        type: 'input',
        name: 'folder',
        message: 'Subfolder name',
        default: 'main'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.composeSolutionIfNeeded();

    this.composeWith('wemogy:dotnet-aspnet', {
      destinationRoot: this.destinationRoot(`src/services/${this.answers.folder.toLowerCase()}`),
      parentPath: `src/services/${this.answers.folder.toLowerCase()}`,
      unitTests: true,
      solution: this.getSolutionPath()
    });
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default DotnetServiceProjectGenerator;
