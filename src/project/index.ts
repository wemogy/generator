import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';

class ProjectGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = [
      {
        name: 'Base Structure',
        generator: 'wemogy:project-core'
      },
      {
        name: '.NET SDK',
        generator: 'wemogy:project-sdk-dotnet'
      }
    ];
  }
}

export default resolveGeneratorInheritance(ProjectGenerator);
