import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';

class OtherGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);
    this.generators = [
      {
        name: '.NET',
        generator: 'wemogy:dotnet'
      },
      {
        name: 'TypeScript',
        generator: 'wemogy:typescript'
      },
      {
        name: 'Terraform',
        generator: 'wemogy:terraform'
      },
      {
        name: 'Yeoman',
        generator: 'wemogy:yeoman'
      },
      {
        name: 'GitHub Actions',
        generator: 'wemogy:github-actions'
      }
    ];
  }
}

export default resolveGeneratorInheritance(OtherGenerator);
