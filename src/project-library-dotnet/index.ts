import _ = require('lodash');
import { toNoWhitespaceLowerCase } from '../StringHelpers';
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import chalk = require('chalk');

class LibraryDotnetProjectGenerator extends BaseTemplateGenerator {
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
        message: 'Library name (just the name without suffix in case of multi package library)'
      },
      {
        type: 'confirm',
        name: 'multiPackageLibrary',
        message: 'Multi package library?',
        default: false,
        followUpQuestions: [
          {
            type: 'input',
            name: 'coreProjectName',
            message: 'The name of the core library',
            default: (answers: any) => `${answers.name}.Core`
          }
        ]
      },
      {
        type: 'confirm',
        name: 'nuget',
        message: 'Packable via NuGet?',
        default: true,
        followUpQuestions: [
          {
            type: 'input',
            name: 'nugetRepoUrl',
            message: 'Nuget: GitHub Repository Url'
          },
          {
            type: 'input',
            name: 'nugetDescription',
            message: 'NuGet: Package description'
          }
        ]
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    // Base structure
    this.log('Generating base folder structure...');
    this.composeWith('wemogy:project-empty', {
      name: this.answers.name,
      skipEclint: true
    });

    // .NET Library
    this.log('Generating .NET Library...');
    this.composeWith('wemogy:library-dotnet', {
      solutionName: this.answers.name,
      folder: this.answers.multiPackageLibrary ? 'core' : '',
      name: this.answers.multiPackageLibrary ? this.answers.coreProjectName : this.answers.name,
      nuget: this.answers.nuget,
      nugetRepoUrl: this.answers.nugetRepoUrl,
      nugetDescription: this.answers.nugetDescription,
      skipEclint: true
    });

    // GitHub Workflows
    this.log('Generating GitHub Actions Workflows...');

    this.composeWith('wemogy:github-workflow-style', {
      name: toNoWhitespaceLowerCase(this.answers.name),
      skipEclint: true
    });

    this.composeWith('wemogy:github-action-dotnet', {
      slnPath: 'src',
      skipEclint: true
    });

    this.composeWith('wemogy:github-workflow-test', {
      dotnet: true,
      helm: false,
      skipSecretHints: true,
      skipEclint: true
    });

    this.composeWith('wemogy:github-workflow-release-nuget', {
      slnPath: 'src',
      skipEclint: true
    });
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {
    this.log();

    this.eclint();
  }
}

export default LibraryDotnetProjectGenerator;
