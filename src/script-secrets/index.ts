import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class SecretScriptGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'keyVaultName',
        message: 'KeyVault Name',
        default: `${this.appname}devkv`
      },
      {
        type: 'input',
        name: 'subscriptionId',
        message: 'KeyVault Subscription ID',
        default: '00000000-0000-0000-0000-000000000000'
      },
      {
        type: 'list',
        name: 'projectType',
        message: 'Project Type',
        choices: ['Customer project', 'wemogy Module']
      }
    ]);
  }

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.answers.terraformSecretName =
      this.answers.projectType === 'Customer project' ? 'TerraformDevBackendSasToken' : 'TerraformBackendAccessKey';
    this.copyTemplateToDestination(this.destinationPath('env/scripts/'));
  }
}

export default resolveGeneratorInheritance(SecretScriptGenerator);
