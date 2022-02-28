const yosay = require('yosay');
import BaseTemplateGenerator from '../BaseTemplateGenerator';

class TerraformAksGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.prompt([
      {
        type: 'select',
        name: 'folder',
        message: 'Terraform Folder',
        choices: ['terraform', 'terraform/shared', 'terraform/individual']
      },
      {
        type: 'input',
        name: 'kubernetesVersion',
        message: 'Kubernetes Version',
        default: '1.20.7'
      },
      {
        type: 'input',
        name: 'aadAdminGroupId',
        message: 'AAD Admin Group ID',
        default: '00000000-0000-0000-0000-000000000000'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.copyTemplateToDestination(this.destinationPath(`env/${this.answers.folder}`));
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default TerraformAksGenerator;
