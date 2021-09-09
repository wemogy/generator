import BaseTemplateGenerator from '../BaseTemplateGenerator';

class DotnetMicroserviceProjectGenerator extends BaseTemplateGenerator {
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
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.composeWith('wemogy:dotnet-aspnet', {
      destinationRoot: this.destinationRoot(`src/services/${this.answers.name.toLowerCase()}`),
      name: this.answers.name,
      parentPath: `src/services/${this.answers.name.toLowerCase()}`,
      unitTests: true
    });
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default DotnetMicroserviceProjectGenerator;
