import _ = require('lodash');
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class AzureWemogyModuleProjectGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Module name (without wemogy prefix)',
        default: this.appname
      },
      {
        type: 'input',
        name: 'subscription',
        message: 'Subscription ID',
        default: '2421b4f0-f1da-48e8-adc8-30166c4147af'
      },
      {
        type: 'input',
        name: 'location',
        message: 'Region',
        default: 'westeurope'
      },
      {
        type: 'confirm',
        name: 'addGitHubSecrets',
        message: 'Add Service Principal to GitHub? (this requires this generator to be run in a checked out repo)'
      }
    ]);
  }

  public install(): void {
    const cleanName = _.replace(this.answers.name, ' ', '').toLowerCase();
    try {
      // Make script executable
      this.spawnCommandSync('chmod', ['+x', 'script.sh'], { shell: true });

      // Execute script with parameters
      this.spawnCommandSync(
        './script.sh',
        [cleanName, this.answers.subscription, this.answers.location, this.answers.addGitHubSecrets],
        {
          shell: true
        }
      );
    } finally {
      // Delete script after execution
      this.spawnCommandSync('rm', ['script.sh'], { shell: true });
    }
  }
}

export default resolveGeneratorInheritance(AzureWemogyModuleProjectGenerator);
