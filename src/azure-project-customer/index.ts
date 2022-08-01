import _ = require('lodash');
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class AzureCustomerProjectGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'subscription',
        message: 'Subscription ID'
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

  public writing(): void {
    // Overriding from base, to make sure, that no files are copied.
  }

  public install(): void {
    const cleanName = this.answers.name.replaceAll(' ', '');
    const scriptPath = `${__dirname}/templates/script.sh`;

    // Make script executable
    this.spawnCommandSync('chmod', ['+x', scriptPath], { shell: true });

    // Execute script with parameters
    this.spawnCommandSync(
      scriptPath,
      [cleanName, this.answers.subscription, this.answers.location, this.answers.addGitHubSecrets],
      {
        shell: true
      }
    );
  }
}

export default resolveGeneratorInheritance(AzureCustomerProjectGenerator);
