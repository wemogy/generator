const yosay = require('yosay');
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import * as Generator from 'yeoman-generator';

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
        type: 'input',
        name: 'id',
        message: 'Terraform ID',
        default: 'default'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Resource Name',
        default: '"${var.prefix}aks"'
      },
      {
        type: 'confirm',
        name: 'publicIp',
        message: 'Create public IP address for Ingress?'
      },
      {
        when: (answers: any) => answers.publicIp,
        type: 'input',
        name: 'publicIpName',
        message: 'Public IP address Resource Name',
        default: '"${var.prefix}aksingress"'
      },
      {
        type: 'input',
        name: 'vnetName',
        message: 'Virtual Network Name',
        default: '"${var.prefix}vnet"'
      },
      {
        type: 'input',
        name: 'resourceGroupName',
        message: 'Azure Resource Group Name',
        default: 'azurerm_resource_group.default.name'
      },
      {
        when: (answers: any) => answers.publicIp,
        type: 'input',
        name: 'resourceGroupId',
        message: 'Azure Resource Group ID',
        default: 'azurerm_resource_group.default.id'
      },
      {
        type: 'input',
        name: 'location',
        message: 'Azure Location',
        default: 'azurerm_resource_group.default.location'
      },
      {
        type: 'input',
        name: 'kubernetesVersion',
        message: 'Kubernetes Version',
        default: '1.20.7'
      },
      {
        type: 'confirm',
        name: 'createProviders',
        message: 'Create Terraform providers for this cluster?'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    // AKS
    this.fs.copyTpl(this.templatePath('azure_aks.tf'), this.destinationPath('azure_aks.tf'), this.answers);
    this.fs.copyTpl(
      this.templatePath('azure_networking.tf'),
      this.destinationPath('azure_networking.tf'),
      this.answers
    );

    // RBAC
    if (this.answers.publicIp) {
      this.fs.copyTpl(this.templatePath('azure_rbac.tf'), this.destinationPath('azure_rbac.tf'), this.answers);
    }

    // Providers
    if (this.answers.createProviders) {
      this.fs.copyTpl(
        this.templatePath('provider_kubernetes.tf'),
        this.destinationPath('provider_kubernetes.tf'),
        this.answers
      );
    }
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

export default TerraformAksGenerator;
