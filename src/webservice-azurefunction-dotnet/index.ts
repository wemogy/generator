import * as _ from 'lodash';
import { addProjectToSln, toPascalCase } from '../DotnetHelpers';
import { toNoWhitespaceLowerCase } from '../StringHelpers';
import BaseDotnetTemplateGenerator from '../BaseDotnetTemplateGenerator';

class WeserviceAzureFunctionDotnetGenerator extends BaseDotnetTemplateGenerator {
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
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.copyTemplateToDestination(
      this.destinationPath(`src/webservices/${toNoWhitespaceLowerCase(this.answers.folder)}`)
    );
  }

  // Where installation are run (npm, bower)
  public install(): void {
    addProjectToSln.bind(this)(
      this.getSolutionPath(),
      this.destinationPath(
        `src/webservices/${toNoWhitespaceLowerCase(this.answers.folder)}/${this.answers.name}/${
          this.answers.name
        }.csproj`
      )
    );
    addProjectToSln.bind(this)(
      this.getSolutionPath(),
      this.destinationPath(
        `src/webservices/${toNoWhitespaceLowerCase(this.answers.folder)}/${this.answers.name}.UnitTests/${
          this.answers.name
        }.UnitTests.csproj`
      )
    );
  }

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default WeserviceAzureFunctionDotnetGenerator;
