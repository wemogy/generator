import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class DaprSecretStore extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Secret Store Name',
        default: 'secret-store'
      },
      {
        type: 'input',
        name: 'keyVaultName',
        message: 'Azure Key Vault Name',
        default: 'MyVault'
      },
      {
        type: 'list',
        name: 'environment',
        message: 'Environment',
        choices: ['Local', 'Kubernetes']
      },
      {
        when: (answers: any) => answers.environment === 'Local',
        type: 'input',
        name: 'localStorePath',
        message: 'Path to local Secrets file (relative to where you call dapr run from)',
        default: 'env/dapr/secrets/secrets.json'
      },
      {
        when: (answers: any) => answers.environment === 'Local',
        type: 'input',
        name: 'secretScriptPath',
        message: 'Where to store the script to generate secrets?',
        default: 'env/scripts/secrets.sh'
      },
      {
        type: 'input',
        name: 'path',
        message: 'Path',
        default: '.'
      }
    ]);
  }

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    switch (this.answers.environment) {
      case 'Local':
        this.copyTemplateToDestination(`${this.answers.path}/secretStore.yaml`, undefined, 'local/secretStore.yaml');
        this.copyTemplateToDestination(this.answers.localStorePath, undefined, 'local/secrets.json');
        this.copyTemplateToDestination(this.answers.secretScriptPath, undefined, 'local/secrets.sh');
        break;
      case 'Kubernetes':
        this.copyTemplateToDestination(this.answers.path, undefined, 'kubernetes');
        break;
      default:
        this.log.error('Unknown Environment');
    }
  }
}

export default resolveGeneratorInheritance(DaprSecretStore);
