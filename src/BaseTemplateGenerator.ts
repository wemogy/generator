import * as Generator from 'yeoman-generator';
import optionOrPrompt from './OptionOrPrompt';

class BaseTemplateGenerator extends Generator {
  protected answers: any;
  protected optionOrPrompt = optionOrPrompt.bind(this);

  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {}

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {}

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default BaseTemplateGenerator;
