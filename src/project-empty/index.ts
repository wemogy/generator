import BaseTemplateGenerator from '../BaseTemplateGenerator';

class CoreProjectGenerator extends BaseTemplateGenerator {
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
        message: 'Your project name',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'emptyFolders',
        message: 'Generate empty folder structure?',
        default: false
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    // .gitignore has to be created manually, as it will be ignored when placing it into /templates by default.
    // See this issue for more: https://github.com/yeoman/generator/issues/812
    this.fs.copy(this.templatePath('gitignore/gitignore-content'), this.destinationPath('.gitignore'));
    this.fs.copyTpl(
      this.templatePath('root'),
      this.destinationPath(),
      {
        ...this.answers
      },
      null,
      // Include dotfiles (like .editorconfig)
      {
        globOptions: {
          dot: true
        }
      }
    );

    if (this.answers.emptyFolders) {
      this.fs.copy(this.templatePath('folders'), this.destinationPath(), {
        globOptions: {
          dot: true
        }
      });
    }
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {
    this.eclint();
  }
}

export default CoreProjectGenerator;
