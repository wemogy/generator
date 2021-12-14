const yosay = require('yosay');
import BaseTemplateGenerator from '../BaseTemplateGenerator';

class TerraformKubernetesConfigGenerator extends BaseTemplateGenerator {
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
        message: 'Ingress: controller.service.loadBalancerIP',
        default: 'azurerm_public_ip.ingress_ip.ip_address'
      },
      {
        type: 'input',
        name: 'name',
        message:
          'Ingress: controller.service.annotations.service\\.beta\\.kubernetes\\.io\\/azure-load-balancer-resource-group',
        default: 'azurerm_resource_group.default.name'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.copyTemplateToDestination();
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default TerraformKubernetesConfigGenerator;
