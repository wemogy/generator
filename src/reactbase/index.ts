import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class Reactbase extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = [
      new GeneratorSelection('Component', 'wemogy:reactbase-component'),
      new GeneratorSelection('Component External', 'wemogy:reactbase-component-external'),
      new GeneratorSelection('UI-Kit Component', 'wemogy:reactbase-ui-kit')
    ];
  }
}

export default resolveGeneratorInheritance(Reactbase);
