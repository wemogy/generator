import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class React extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = [new GeneratorSelection('Component', 'wemogy:react-component')];
  }
}

export default resolveGeneratorInheritance(React);
