import _ = require('lodash');
import { toNoWhitespaceLowerCase } from '../StringHelpers';
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import chalk = require('chalk');
import { addProjectReferenceToProject } from '../DotnetHelpers';

class LibraryDotnetProjectGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    const solutionName = this.findFirstFileWithExtension(this.destinationPath('src'), '.sln')?.replace('.sln', '');

    console.log(
      'findFirstFileOccurrence',
      this.findFirstFileOccurrence(this.destinationPath('src'), `${solutionName}.Core.csproj`)
    );

    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'solutionName',
        message: 'Solution name?',
        default: solutionName
      },
      {
        type: 'input',
        name: 'coreProjectName',
        message: 'Core project name?',
        default: (answers: any) => `${answers.solutionName}.Core`
      },
      {
        type: 'input',
        name: 'name',
        message: 'Package name (just the name without solution name prefix, e.g. "cosmos")'
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
    // .NET Library
    this.log('Generating .NET Library...');
    this.composeWith('wemogy:library-dotnet', {
      solutionName: this.answers.solutionName,
      folder: _.camelCase(this.answers.name),
      name: this.getProjectName(),
      nuget: true,
      nugetRepoUrl: this.answers.nugetRepoUrl,
      nugetDescription: this.answers.nugetDescription,
      skipEclint: true
    });
  }

  // Where installation are run (npm, bower)
  public install(): void {
    // Add reference to core library
    const coreLibraryPath = this.findFirstFileOccurrence(this.destinationPath('src'), this.answers.coreProjectName);
    const projectName = this.findFirstFileOccurrence(this.destinationPath('src'), this.getProjectName());
    addProjectReferenceToProject.bind(this)(projectName, coreLibraryPath);
  }

  private getProjectName(): string {
    return `${this.answers.solutionName}.${this.pascalCase(this.answers.name)}`;
  }

  // Called last, cleanup, say good bye, etc
  public end(): void {
    this.log();

    this.eclint();
  }
}

export default LibraryDotnetProjectGenerator;
