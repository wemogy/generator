import BaseTemplateGenerator from '../BaseTemplateGenerator';
import * as _ from 'lodash';
import { addProjectToSln, getSlnSelectionOptions, toPascalCase } from '../DotnetHelpers';

class DotXunitGenerator extends BaseTemplateGenerator {
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
        message: 'Project name',
        default: `Wemogy.${toPascalCase(this.appname)}.UnitTests`
      },
      {
        type: 'confirm',
        name: 'referenceProjectToTest',
        message: 'Reference project to test',
        default: false,
        followUpQuestions: [
          {
            type: 'input',
            name: 'projectToTest',
            message: 'Project to test'
          }
        ]
      },
      {
        type: 'list',
        name: 'solution',
        message: 'Add to Solution',
        choices: getSlnSelectionOptions()
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.fs.copyTpl(
      this.templatePath('Project.csproj'),
      this.destinationPath(`${this.answers.name}/${this.answers.name}.csproj`),
      this.answers
    );
    this.fs.copyTpl(this.templatePath('content'), this.destinationPath(this.answers.name), this.answers);
  }

  // Where installation are run (npm, bower)
  public install(): void {
    addProjectToSln.bind(this)(
      this.answers.solution,
      this.destinationPath(`${this.answers.name}/${this.answers.name}.csproj`)
    );
  }

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default DotXunitGenerator;
