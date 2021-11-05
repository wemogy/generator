import _ = require('lodash');
import * as Generator from 'yeoman-generator';
import optionOrPrompt, { AdvancedQuestions } from './OptionOrPrompt';

class BaseTemplateGenerator extends Generator {
  protected answers: any;
  protected optionOrPrompt: (questions: AdvancedQuestions) => Promise<any> = optionOrPrompt.bind(this);

  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {}

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {}

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}

  protected eclint(): void {
    this.log('Applying EditorConfig rules by running eclint...');
    this.spawnCommandSync('eclint', ['fix', '$(git ls-files)'], { shell: true });
  }

  protected copyTemplateToDestination(destinationSubPath: string, params?: object): void {
    if (!params) {
      params = {};
    }

    const args = { ...this.answers, ...params };
    const argNames = Object.keys(args);

    this.fs.copyTpl(
      this.templatePath(),
      `${this.destinationPath()}/${destinationSubPath}`,
      args,
      {},
      {
        globOptions: {
          dot: true // Include dotfiles (like .stylecop)
        },
        processDestinationPath: (filePath: string): string => {
          for (let argName of argNames) {
            filePath = filePath.replace(`$${argName}`, this.upperCamelCase(args[argName]));
          }

          return filePath;
        }
      }
    );
  }

  //#region conventions

  protected upperCamelCase(str: string): string {
    return _.upperFirst(_.camelCase(str));
  }

  //#endregion
}

export default BaseTemplateGenerator;
