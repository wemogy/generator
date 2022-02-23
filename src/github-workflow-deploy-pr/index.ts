import chalk = require('chalk');
import BaseTemplateGenerator from '../BaseTemplateGenerator';

class GitHubWorkflowPipelineGenerator extends BaseTemplateGenerator {
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
        name: 'name',
        message: 'Project name (lowercase)',
        default: this.appname
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.fs.copyTpl(this.templatePath(), this.destinationPath('.github/workflows'), this.answers);
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {
    if (!this.options.skipSecretHints) {
      this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: AZURE_APP_ID`);
      this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: AZURE_PASSWORD`);
      this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: AZURE_TENANT_ID`);
      this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: AKS_NAME`);
      this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: AKS_RESOURCE_GROUP`);
      this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: CONTAINER_REGISTRY_SERVER`);
      this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: WEMOGY_PULL_SECRET_USERNAME`);
      this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: WEMOGY_PULL_SECRET_PASSWORD`);
      this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: WEMOGY_PACKAGES_TOKEN`);
      this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: TERRAFORM_BACKEND_ACCESS_KEY`);
    }
  }
}

export default GitHubWorkflowPipelineGenerator;
