import BaseTemplateGenerator from '../BaseTemplateGenerator';

class DotnetSdkProjectGenerator extends BaseTemplateGenerator {
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
    // Class Library
    this.composeWith('wemogy:dotnet-classlib', {
      destinationRoot: this.destinationRoot('src/sdk'),
      name: this.answers.name,
      nuget: true
    });

    // Unit Test
    this.composeWith('wemogy:dotnet-xunit', {
      destinationRoot: this.destinationRoot('src/sdk'),
      name: `${this.answers.name}.Tests`
    });
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default DotnetSdkProjectGenerator;
