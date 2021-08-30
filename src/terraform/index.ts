const yosay = require('yosay');
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import * as Generator from 'yeoman-generator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class TerraformGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);
    this.generators = [
      {
        name: 'Empty',
        generator: 'wemogy:terraform-empty'
      },
      {
        name: 'Azure Kubernetes Service (AKS)',
        generator: 'wemogy:terraform-aks'
      },
      {
        name: 'Kubernetes Cluster configuration',
        generator: 'wemogy:terraform-kubernetes'
      }
      // {
      // 	name: 'GitHub Actions',
      // 	generator: 'wemogy:github-actions'
      // }
    ];
  }
}

export default resolveGeneratorInheritance(TerraformGenerator);
