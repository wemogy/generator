import { toNoWhitespaceLowerCase } from '../StringHelpers';
import BaseTemplateGenerator from '../BaseTemplateGenerator';

class TerraformEmptyGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'list',
        name: 'folder',
        message: 'Terraform Folder',
        choices: ['terraform', 'shared', 'individual']
      },
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'remoteBackendStorageAccountName',
        message: 'Remote backend Azure Storage Account Name',
        default: `${toNoWhitespaceLowerCase(this.appname)}tfstate`
      },
      {
        type: 'list',
        name: 'remoteBackendStorageBlobContainerName',
        message: 'Remote backend Blob Container Name',
        choices: ['tfstate', 'tfstate-dev']
      },
      {
        type: 'input',
        name: 'azureSubscriptionId',
        message: 'Azure Subscription ID',
        default: '00000000-0000-0000-0000-000000000000'
      },
      {
        type: 'input',
        name: 'azureTenantId',
        message: 'Azure Tenant ID',
        default: '00000000-0000-0000-0000-000000000000'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.answers.isSingleResourceGroup = this.answers.folder === 'terraform';
    if (this.answers.folder === 'terraform') {
      this.copyTemplateToDestination(this.destinationPath(`env/${this.answers.folder}`));
    } else {
      this.copyTemplateToDestination(this.destinationPath(`env/terraform/${this.answers.folder}`));
    }
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default TerraformEmptyGenerator;
