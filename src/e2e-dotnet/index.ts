import _ = require('lodash');
import { toNoWhitespaceLowerCase } from '../StringHelpers';
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import chalk = require('chalk');

class E2EDotnetGenerator extends BaseTemplateGenerator {
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
        message: 'Solution name (which will be used as project name as well)'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    // .NET Solution
    this.log('Generating solution...');
    this.composeWith('wemogy:dotnet-solution', {
      name: this.answers.name,
      targetDirectory: 'e2e',
      skipEclint: true
    });

    // .NET Project
    this.log('Generating .NET project...');
    this.composeWith('wemogy:test-dotnet', {
      solutionName: this.answers.name,
      targetDirectory: 'e2e',
      folder: '',
      name: this.answers.name,
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

export default E2EDotnetGenerator;
