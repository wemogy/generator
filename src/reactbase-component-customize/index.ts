import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class ReactbaseComponentCustomize extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'ReactBase component name (e.g. Text, Button, etc.)'
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name (e.g. MyProject), which will be used as a namespace for the variations'
      }
    ]);
  }
}

export default resolveGeneratorInheritance(ReactbaseComponentCustomize);
