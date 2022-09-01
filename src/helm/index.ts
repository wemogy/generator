import {resolveGeneratorInheritance} from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class HelmSelectionGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = this.generators = [
      new GeneratorSelection('Helm Chart for a customer project', 'wemogy:helm-customer-project'),
      new GeneratorSelection('Helm Chart for a wemogy module', 'wemogy:helm-wemogy-module')
    ];
  }
}

export default resolveGeneratorInheritance(HelmSelectionGenerator);
