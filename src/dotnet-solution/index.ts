const yosay = require('yosay');
import * as Generator from 'yeoman-generator';

class DotSolutionGenerator extends Generator {
  private answers: any; // Answers captured by prompt

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
        message: 'Solution name',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'styleCop',
        message: 'Include StyleCop config?'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.fs.copy(this.templatePath('Solution.sln'), this.destinationPath(`${this.answers.name}.sln`));

    if (this.answers.styleCop) {
      this.composeWith('wemogy:dotnet-stylecop');
    }
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default DotSolutionGenerator;
