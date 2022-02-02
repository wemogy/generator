import _ = require('lodash');
import BaseTemplateGenerator from '../BaseTemplateGenerator';

class WemogyCliCommand extends BaseTemplateGenerator {
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
        name: 'path',
        message: 'Command path',
        default: 'dotnet'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Command name',
        default: 'create'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    const namespace = this.pascalCase(this.answers.path.replace('/', ' '));
    const relativePath = this.answers.path
      .split('/')
      .map(() => '../')
      .join('');

    this.copyTemplateToDestination(`src/commands/${this.answers.path}`, { namespace, relativePath });
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default WemogyCliCommand;
