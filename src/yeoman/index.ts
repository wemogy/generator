import {resolveGeneratorInheritance} from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class YeomanGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);
    this.generators = [
      new GeneratorSelection('Selector Generator', 'wemogy:yeoman-selector'),
      new GeneratorSelection('Template Generator (Generic)', 'wemogy:yeoman-template'),
      new GeneratorSelection('Template Generator (.NET)', 'wemogy:yeoman-template-dotnet')
    ];
  }
}

export default resolveGeneratorInheritance(YeomanGenerator);
