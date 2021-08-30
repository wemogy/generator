import * as Generator from 'yeoman-generator';

class EmptyProjectGenerator extends Generator {
  answers: any; // Answers captured by prompt

  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname // Default to current folder name
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      {
        ...this.answers
      },
      null,
      // Include dotfiles (like .gitignore)
      {
        globOptions: {
          dot: true
        }
      }
    );
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default EmptyProjectGenerator;
