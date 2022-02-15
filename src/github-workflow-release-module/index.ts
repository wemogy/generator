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
        type: 'confirm',
        name: 'nuget',
        message: 'Publish NuGet package?',
        default: true,
        followUpQuestions: [
          {
            type: 'input',
            name: 'buildDotnetActionPath',
            message: 'Path to .NET Build Action',
            default: './.github/workflows/build-dotnet'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'npm',
        message: 'Publish NPM package?',
        default: true,
        followUpQuestions: [
          {
            type: 'input',
            name: 'buildJavaScriptActionPath',
            message: 'Path to JavaScript Build Action',
            default: './.github/workflows/build-javascript'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'containers',
        message: 'Publish Container image?',
        default: true,
        followUpQuestions: [
          {
            type: 'input',
            name: 'containersActionPath',
            message: 'Path to Containers Action',
            default: './.github/workflows/containers'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'helm',
        message: 'Publish Helm Chart?',
        default: true,
        followUpQuestions: [
          {
            type: 'input',
            name: 'helmChartName',
            message: 'Helm Chart Name',
            default: 'wemogy-demo'
          }
        ]
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.copyTemplateToDestination(this.destinationPath('.github/workflows'));
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {
    if (this.answers.infrastructure) {
      if (!this.options.skipSecretHints) {
        this.log(`${chalk.yellow('Hint:')} Please don't forget to set the GitHub Secret: HELM_REPO_TOKEN`);
        this.log(
          `${chalk.yellow('Hint:')} Please don't forget to set the GitHub Secret: CONTAINER_REGISTRY_LOGIN_SERVER`
        );
        this.log(`${chalk.yellow('Hint:')} Please don't forget to set the GitHub Secret: CONTAINER_REGISTRY_USERNAME`);
        this.log(`${chalk.yellow('Hint:')} Please don't forget to set the GitHub Secret: CONTAINER_REGISTRY_PASSWORD`);
        this.log(`${chalk.yellow('Hint:')} Please don't forget to set the GitHub Secret: WEMOGY_PACKAGES_TOKEN`);
      }
    }
  }
}

export default GitHubWorkflowPipelineGenerator;
