import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class YeomanGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);
    this.generators = [
      new GeneratorSelection('Selector Generator', 'wemogy:yeoman-selector'),
      new GeneratorSelection('Generic Template Generator', 'wemogy:yeoman-template'),
      new GeneratorSelection('.NET Template Generator', 'wemogy:yeoman-template-dotnet'),
      new GeneratorSelection('Generic Project Template Generator', 'wemogy:yeoman-template-project'),
      new GeneratorSelection('.NET Project Template Generator', 'wemogy:yeoman-template-project-dotnet')
    ];
  }
}

export default resolveGeneratorInheritance(YeomanGenerator);
