import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class HelmGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = this.generators = [
      new GeneratorSelection('Customer project Helm Chart', 'wemogy:helm-customer-project'),
      new GeneratorSelection('wemogy Module Helm Chart', 'wemogy:helm-module')
    ];
  }
}

export default resolveGeneratorInheritance(HelmGenerator);
