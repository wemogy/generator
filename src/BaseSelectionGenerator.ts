import * as Generator from 'yeoman-generator';
import GeneratorSelection from './GeneratorSelection';

class BaseSelectionGenerator extends Generator {
  private answers: any;
  protected generators: GeneratorSelection[];

  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'selectedGenerator',
        message: 'What do you want to generate?',
        choices: this.generators.map(x => x.name)
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    const selection = this.generators.find(x => x.name === this.answers.selectedGenerator);
    this.composeWith(selection.generator);
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default BaseSelectionGenerator;
