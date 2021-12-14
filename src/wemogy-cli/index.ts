import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class WemogyCli extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = [new GeneratorSelection('Create command', 'wemogy:wemogy-cli-command')];
  }
}

export default resolveGeneratorInheritance(WemogyCli);
