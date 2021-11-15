import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class ScriptSecrets extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'keyVaultName',
        message: 'Azure Key Vault Name',
        default: 'myvault'
      },
      {
        type: 'input',
        name: 'filePath',
        message: 'Path of the file to generate (relative to the script)',
        default: '../dapr/secrets/secrets.json'
      }
    ]);
  }

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.copyTemplateToDestination();
  }

  public end(): void {
    this.log.info("Don't forget to make the script executable with `chmod +x secrets.sh`");
  }
}

export default resolveGeneratorInheritance(ScriptSecrets);
