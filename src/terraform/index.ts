const yosay = require('yosay');
import * as Generator from 'yeoman-generator';

class TerraformGenerator extends Generator {
  private answers: any; // Answers captured by prompt
  private generators = [
    {
      name: 'Empty',
      generator: 'wemogy:terraform-empty'
    },
    {
      name: 'Azure Kubernetes Service (AKS)',
      generator: 'wemogy:terraform-aks'
    },
    {
      name: 'Kubernetes Cluster configuration',
      generator: 'wemogy:terraform-kubernetes'
    }
  ];

  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.prompt({
      type: 'list',
      name: 'generator',
      message: 'What do you want to generate?',
      choices: this.generators.map(x => x.name)
    });
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {}

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {
    const selection = this.generators.find(x => x.name === this.answers.generator);
    this.composeWith(selection.generator);
  }
}

export default TerraformGenerator;
