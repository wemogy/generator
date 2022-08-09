import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class ReactbaseComponent extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Component Name',
        default: 'MyComponent'
      }
    ]);
  }

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.updateComponentThemeCollection();
    this.copyTemplateToDestination();
  }

  private updateComponentThemeCollection(): void {
    this.getComponentThemeCollectionFilePath();
  }

  private getComponentThemeCollectionFilePath(): string {
    console.log(this.destinationPath('..'));
    return '';
  }
}

export default resolveGeneratorInheritance(ReactbaseComponent);
