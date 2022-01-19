import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class AzureGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = this.generators = [
      new GeneratorSelection('Customer Project Scaffolding', 'wemogy:azure-project-customer')
    ];
  }
}

export default resolveGeneratorInheritance(AzureGenerator);
