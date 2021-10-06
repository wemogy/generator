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
        name: 'folder',
        message: 'Subfolder name',
        default: 'javascript'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.composeWith('wemogy:typescript-empty', {
      destinationRoot: this.destinationRoot(`src/sdk/${this.answers.folder.toLowerCase()}`),
      defaultName: `@wemogy/${this.appname.toLowerCase()}-sdk`
    });
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {
    this.eclint();
  }
}

export default DotnetSdkProjectGenerator;
