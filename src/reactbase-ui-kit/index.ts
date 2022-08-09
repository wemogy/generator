import _ = require('lodash');
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class ReactbaseUiKitComponent extends BaseTemplateGenerator {
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
      },
      {
        type: 'input',
        name: 'section',
        message: 'Section (core, layout, advanced, ...)',
        default: 'MyComponent'
      }
    ]);
  }

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.appendToIndex();
  }

  private appendToIndex(): void {
    const indexPath = this.destinationPath() + '/index.ts';
    const componentName = this.pascalCase(this.answers.name);
    const componentNameCamelCase = this.camelCase(this.answers.name);
    const line = `export { ${componentName}Base as ${componentName} } from '../ui/uiElements/${this.answers.section}/${componentNameCamelCase}/${componentName}Component';`;
    this.appendLine(indexPath, line);
  }
}

export default resolveGeneratorInheritance(ReactbaseUiKitComponent);
