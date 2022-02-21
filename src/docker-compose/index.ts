import chalk = require('chalk');
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class DockerComposeTemplateGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'serviceName',
        message: '(Folder) name of the service',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'dapr',
        message: 'Add Dapr Sidecar?',
        default: true
      }
    ]);
  }

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.copyTemplateToDestination(this.destinationPath('env/docker'));
  }

  // Called last, cleanup, say good bye, etc
  public end(): void {
    if (!this.options.skipSecretHints) {
      this.log(
        `${chalk.yellow(
          'Hint:'
        )} Don't forget to replace the placeholders in the env/docker/.env file with your own values.`
      );
    }
  }
}

export default resolveGeneratorInheritance(DockerComposeTemplateGenerator);
