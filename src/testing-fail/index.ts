import BaseTemplateGenerator from '../BaseTemplateGenerator';

class TestingFailGenerator extends BaseTemplateGenerator {
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
        name: 'letter',
        message: 'Choose a letter',
        choices: ['A', 'B', 'C']
      },
      {
        name: 'final',
        message: 'Your final choice?',
        default: (answers: any) => answers.letter
      }
    ]);

    this.answers = await this.optionOrPrompt([
      {
        type: 'list',
        name: 'letter',
        message: 'Choose a letter',
        choices: ['A', 'B', 'C']
      },
      {
        name: 'final',
        message: 'Your final choice?',
        default: (answers: any) => answers.letter // This time, default does not work: answers in undefined
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.log(`Nice, you chose ${this.answers.final}`);
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default TestingFailGenerator;
