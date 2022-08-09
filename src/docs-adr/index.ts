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
        name: 'title',
        message: 'Title'
      }
    ]);
  }

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.copyTemplateToDestination(this.destinationPath('docs/adr'));
  }
}

export default resolveGeneratorInheritance(DocsDocusurusGenerator);
