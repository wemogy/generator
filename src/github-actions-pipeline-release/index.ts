import BaseTemplateGenerator from '../BaseTemplateGenerator';

class GitHubActionsReleasePipelineGenerator extends BaseTemplateGenerator {
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
          },
          {
            type: 'input',
            name: 'containerRegistryServer',
            message: 'Container Registry Server',
            default: '${{ secrets.CONTAINER_REGISTRY_LOGIN_SERVER }}'
          },
          {
            type: 'input',
            name: 'containerRegistryUsername',
            message: 'Container Registry Username',
            default: '${{ secrets.CONTAINER_REGISTRY_USERNAME }}'
          },
          {
            type: 'input',
            name: 'containerRegistryPassword',
            message: 'Container Registry Password (please use a GitHub Secret)',
            default: '${{ secrets.CONTAINER_REGISTRY_PASSWORD }}'
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
          },
          {
            type: 'input',
            name: 'helmPath',
            message: 'Path to Helm Chart',
            default: 'env/helm'
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
  public end(): void {}
}

export default GitHubActionsReleasePipelineGenerator;