import _ = require('lodash');
import * as Generator from 'yeoman-generator';
import optionOrPrompt, { AdvancedQuestions } from './OptionOrPrompt';
import { replaceAll } from './StringHelpers';

class TemplateArgument {
  public get pascalCase(): string {
    return _.upperFirst(_.camelCase(this.toString()));
  }

  public get camelCase(): string {
    return _.camelCase(this.toString());
  }

  public get snakeCase(): string {
    return _.snakeCase(this.toString());
  }

  public get kebabCase(): string {
    return _.kebabCase(this.toString());
  }

  public constructor(private readonly arg: any) {}

  public toString(): string {
    return this.arg.toString();
  }
}

function toTemplateArguments(obj: object): object {
  obj = _.cloneDeep(obj);
  for (const propertyName in obj) {
    // only replace string values
    if (typeof obj[propertyName] === 'string') {
      obj[propertyName] = new TemplateArgument(obj[propertyName]);
    }
  }
  return obj;
}

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
  public writing(): void {
    this.copyTemplateToDestination();
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}

  protected eclint(): void {
    this.log('Applying EditorConfig rules by running eclint...');
    this.spawnCommandSync('eclint', ['fix', '$(git ls-files)'], { shell: true });
  }

  protected copyTemplateToDestination(destinationSubPath = '.', params?: object, sourceSubPath = '.'): void {
    if (!params) {
      params = {};
    }

    const args = {
      ...toTemplateArguments(this.answers),
      ...toTemplateArguments(params)
    };

    const argNames = Object.keys(args);

    this.log(args);

    this.fs.copyTpl(
      this.templatePath(sourceSubPath),
      this.destinationPath(destinationSubPath),
      args,
      {},
      {
        globOptions: {
          dot: true // Include dotfiles (like .stylecop)
        },
        processDestinationPath: (filePath: string): string => {
          for (let argName of argNames) {
            filePath = replaceAll(filePath, '${' + argName + '}', args[argName]);
            filePath = replaceAll(filePath, '${' + argName + '.camelCase}', args[argName].camelCase);
            filePath = replaceAll(filePath, '${' + argName + '.pascalCase}', args[argName].pascalCase);
            filePath = replaceAll(filePath, '${' + argName + '.snakeCase}', args[argName].snakeCase);
            filePath = replaceAll(filePath, '${' + argName + '.kebabCase}', args[argName].kebabCase);
          }
          return filePath;
        }
      }
    );
  }

  //#region conventions

  protected pascalCase(str: string): string {
    return _.upperFirst(_.camelCase(str));
  }

  //#endregion
}

export default BaseTemplateGenerator;
