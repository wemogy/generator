import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';

class YeomanGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = [
      {
        name: 'Selector Generator',
        generator: 'wemogy:yeoman-selector'
      },
      {
        name: 'Generic Template Generator',
        generator: 'wemogy:yeoman-template'
      },
      {
        name: 'Generic Project Template Generator',
        generator: 'wemogy:yeoman-template'
      },
      {
        name: '.NET Template Generator',
        generator: 'wemogy:yeoman-template-dotnet'
      }
    ];
  }
}

export default resolveGeneratorInheritance(YeomanGenerator);
