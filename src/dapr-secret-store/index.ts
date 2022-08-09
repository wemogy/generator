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
      }
    ]);
  }

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.copyTemplateToDestination();
  }
}

export default resolveGeneratorInheritance(DaprSecretStore);
