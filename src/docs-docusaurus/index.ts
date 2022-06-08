import { toPascalCase } from '../StringHelpers';
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class DocsDocusurusGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: toPascalCase(this.appname)
      },
      {
        type: 'input',
        name: 'repoOwner',
        message: 'GitHub repository owner',
        default: 'wemogy'
      },
      {
        type: 'input',
        name: 'repoName',
        message: 'GitHub repository name',
        default: this.appname
      }
    ]);
  }

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.copyTemplateToDestination(this.destinationPath('docs/public'));
  }
}

export default resolveGeneratorInheritance(DocsDocusurusGenerator);
