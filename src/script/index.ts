import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class Script extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = this.generators = [new GeneratorSelection('Generate Local Secrets', 'wemogy:script-secrets')];
  }
}

export default resolveGeneratorInheritance(Script);
