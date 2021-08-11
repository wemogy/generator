import * as Generator from 'yeoman-generator';

class TerraformKubernetesGenerator extends Generator {
  private answers: any; // Answers captured by prompt

  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.prompt([
      // NGINX
      {
        type: 'confirm',
        name: 'nginx',
        message: 'Install NGINX Ingress Controller'
      },
      {
        when: (answers: any) => answers.nginx,
        type: 'input',
        name: 'ingressIp',
        message: 'Ingress IP Address',
        default: 'azurerm_public_ip.default.ip_address'
      },
      {
        when: (answers: any) => answers.nginx,
        type: 'input',
        name: 'ingressIpResourceGroupName',
        message: 'Ingress IP Address Resource Group',
        default: 'azurerm_resource_group.default.name'
      },

      // Cert Manager
      {
        type: 'confirm',
        name: 'certManager',
        message: 'Install Cert Manager'
      },

      // Linkerd
      {
        type: 'confirm',
        name: 'linkerd',
        message: 'Install Linkerd'
      },

      // akv2k8s
      {
        type: 'confirm',
        name: 'akv2k8s',
        message: 'Install Azure KeyVault to Kubernetes (akv2k8s)'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    // NGINX
    if (this.answers.nginx) {
      this.fs.copyTpl(
        this.templatePath('kubernetes_nginx.tf'),
        this.destinationPath('kubernetes_nginx.tf'),
        this.answers
      );
    }

    // Cert Manager
    if (this.answers.certManager) {
      this.fs.copyTpl(
        this.templatePath('kubernetes_cert_manager.tf'),
        this.destinationPath('kubernetes_cert_manager.tf'),
        this.answers
      );
    }

    // Linkerd
    if (this.answers.linkerd) {
      this.fs.copyTpl(
        this.templatePath('kubernetes_linkerd.tf'),
        this.destinationPath('kubernetes_linkerd.tf'),
        this.answers
      );
    }

    // akv2k8s
    if (this.answers.akv2k8s) {
      this.fs.copyTpl(
        this.templatePath('kubernetes_akv2k8s.tf'),
        this.destinationPath('kubernetes_akv2k8s.tf'),
        this.answers
      );
    }
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default TerraformKubernetesGenerator;
