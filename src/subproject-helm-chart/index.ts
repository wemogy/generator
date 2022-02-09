import BaseTemplateGenerator from '../BaseTemplateGenerator';

class HelmChartSubprojectGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.argument('name', { type: String, required: false });
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {}

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.composeWith('wemogy:helm-chart', {
      destinationRoot: this.destinationRoot(`env/helm`),
      name: this.options.name
    });
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {
    this.eclint();
  }
}

export default HelmChartSubprojectGenerator;
