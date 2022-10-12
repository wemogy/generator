import {resolveGeneratorInheritance} from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class Dapr extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = this.generators = [new GeneratorSelection('Secret Store', 'wemogy:dapr-secret-store')];
  }
}

export default resolveGeneratorInheritance(Dapr);
