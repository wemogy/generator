import chalk = require('chalk');
import BaseTemplateGenerator from '../BaseTemplateGenerator';

class GitHubBuildWorkflowGenerator extends BaseTemplateGenerator {
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
        name: 'dotnet',
        message: 'Build .NET?',
        default: false,
        followUpQuestions: [
          {
            type: 'input',
            name: 'buildDotnetActionPath',
            message: 'Path to .NET Build Action',
            default: './.github/actions/dotnet'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'javaScript',
        message: 'Build JavaScript?',
        default: false,
        followUpQuestions: [
          {
            type: 'input',
            name: 'buildJavaScriptActionPath',
            message: 'Path to JavaScript Build Action',
            default: './.github/actions/javascript'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'containers',
        message: 'Build Containers?',
        default: false,
        followUpQuestions: [
          {
            type: 'input',
            name: 'containersActionPath',
            message: 'Path to Containers Action',
            default: './.github/actions/containers'
          }
        ]
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
      this.log(`${chalk.yellow('Hint:')} Please don't forget to set the GitHub Secret: WEMOGY_PACKAGES_TOKEN`);
    }
  }
}

export default GitHubBuildWorkflowGenerator;
