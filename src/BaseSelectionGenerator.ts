import * as Generator from 'yeoman-generator';
import GeneratorSelection from './GeneratorSelection';
import SeparatorSelection from './SeparatorSelection';

class BaseSelectionGenerator extends Generator {
  private answers: any;
  protected generators: (GeneratorSelection | SeparatorSelection)[];

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
        choices: this.generators.map(x => {
          if (x instanceof GeneratorSelection) {
            return x.name;
          }

          if (x instanceof SeparatorSelection) {
            return { type: 'separator', line: x.line };
          }
        })
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    const generatorSelections = this.generators.filter(x => x instanceof GeneratorSelection) as GeneratorSelection[];
    const selection = generatorSelections.find(x => x.name === this.answers.selectedGenerator);
    this.composeWith(selection.generator);
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default BaseSelectionGenerator;
