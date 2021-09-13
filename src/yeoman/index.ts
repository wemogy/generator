import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';

class YeomanGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = [
      {
        name: 'Template Generator',
        generator: 'wemogy:yeoman-template'
      },
      {
        name: 'Selector Generator',
        generator: 'wemogy:yeoman-selector'
      }
    ];
  }
}

export default resolveGeneratorInheritance(YeomanGenerator);
