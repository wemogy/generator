import * as _ from 'lodash';
import { addProjectToSln, getSlnSelectionOptions, toPascalCase } from '../DotnetHelpers';
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { toNoWhitespaceLowerCase } from '../StringHelpers';
import BaseDotnetTemplateGenerator from '../BaseDotnetTemplateGenerator';

class WebserviceAspNetGenerator extends BaseDotnetTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      this.slnPrompt,
      {
        type: 'input',
        name: 'folder',
        message: 'Subfolder name',
        default: `main`
      },
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: `Wemogy.${toPascalCase(this.appname)}.WebServices.Main`
      },
      {
        type: 'confirm',
        name: 'dapr',
        message: 'Use Dapr?',
        default: true
      },
      {
        type: 'confirm',
        name: 'wemogyIdentity',
        message: 'Use wemogy Identity?',
        default: true
      },
      {
        type: 'confirm',
        name: 'authorization',
        message: 'Use Authorization?',
        default: true
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.composeSolutionIfNeeded();
    this.copyTemplateToDestination(
      this.destinationPath(`src/webservices/${toNoWhitespaceLowerCase(this.answers.folder)}`)
    );
  }

  // Where installation are run (npm, bower)
  public install(): void {
    addProjectToSln.bind(this)(
      this.getSolutionPath(),
      this.destinationPath(
        `src/webservices/${toNoWhitespaceLowerCase(this.answers.folder)}/${this.answers.name}.Api/${
          this.answers.name
        }.Api.csproj`
      )
    );
    addProjectToSln.bind(this)(
      this.getSolutionPath(),
      this.destinationPath(
        `src/webservices/${toNoWhitespaceLowerCase(this.answers.folder)}/${this.answers.name}.Core/${
          this.answers.name
        }.Core.csproj`
      )
    );
    addProjectToSln.bind(this)(
      this.getSolutionPath(),
      this.destinationPath(
        `src/webservices/${toNoWhitespaceLowerCase(this.answers.folder)}/${this.answers.name}.Core.UnitTests/${
          this.answers.name
        }.Core.UnitTests.csproj`
      )
    );
  }

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default WebserviceAspNetGenerator;
