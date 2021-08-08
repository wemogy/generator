const yosay = require('yosay');
import * as Generator from 'yeoman-generator';

class TerraformEmptyGenerator extends Generator {
  private answers: any; // Answers captured by prompt

  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.prompt([
      {
        type: 'confirm',
        name: 'remoteBackend',
        message: 'Are you using a remote backend?'
      },
      {
        when: (answers: any) => answers.remoteBackend,
        type: 'input',
        name: 'remoteBackendStorageAccountName',
        message: 'Remote backend Azure Storage Account Name'
      },
      {
        type: 'confirm',
        name: 'azureSubscription',
        message: 'Are you targeting a specific Azure Subscription?'
      },
      {
        when: (answers: any) => answers.azureSubscription,
        type: 'input',
        name: 'azureSubscriptionId',
        message: 'Azure Subscription ID'
      },
      {
        when: (answers: any) => answers.azureSubscription,
        type: 'input',
        name: 'azureTenantId',
        message: 'Azure Tenant ID'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.fs.copyTpl(this.templatePath(), this.destinationPath(), this.answers);
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {
    this.log(
      'Project structure has been created. Please checkout our docs for details: https://docs.wemogy.com/docs-internal/devops/terraform'
    );
  }
}

export default TerraformEmptyGenerator;
