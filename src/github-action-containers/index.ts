import BaseTemplateGenerator from '../BaseTemplateGenerator';

class GitHubContainersActionGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'dockerfilePath',
        message: 'Path to dockerfile',
        default: 'src/webservices/my-service/Dockerfile'
      },
      {
        type: 'input',
        name: 'containerName',
        message: 'Container name',
        default: 'my-container'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.copyTemplateToDestination(this.destinationPath('.github/actions'));
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default GitHubContainersActionGenerator;
