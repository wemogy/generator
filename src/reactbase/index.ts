import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class Reactbase extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = [new GeneratorSelection('Create component', 'wemogy:reactbase-component')];
  }
}

export default resolveGeneratorInheritance(Reactbase);
