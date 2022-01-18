import BaseTemplateGenerator from '../BaseTemplateGenerator';

class ReactFrontendSubprojectGenerator extends BaseTemplateGenerator {
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
        default: 'web'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: `@wemogy/${this.appname.toLowerCase()}-web`
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.composeWith('wemogy:typescript-react', {
      destinationRoot: this.destinationRoot(`src/frontend/${this.answers.folder.toLowerCase()}`),
      name: this.answers.name
    });
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {
    this.eclint();
  }
}

export default ReactFrontendSubprojectGenerator;
