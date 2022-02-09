import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class CustomerProjectHelmGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Chart name (without "wemogy")',
        default: this.appname
      },
      {
        type: 'input',
        name: 'service',
        message: 'Service name (more can be added manually)',
        default: 'main'
      }
    ]);
  }

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.copyTemplateToDestination();
  }
}

export default resolveGeneratorInheritance(CustomerProjectHelmGenerator);
