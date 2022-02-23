import BaseSelectionGenerator from '../BaseSelectionGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';
import GeneratorSelection from '../GeneratorSelection';

class TerraformGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);
    this.generators = [
      new GeneratorSelection('Empty', 'wemogy:terraform-empty'),
      new GeneratorSelection('Azure Kubernetes Service (AKS)', 'wemogy:terraform-aks')
    ];
  }
}

export default resolveGeneratorInheritance(TerraformGenerator);
