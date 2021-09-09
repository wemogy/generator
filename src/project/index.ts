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
        name: 'SDK (.NET)',
        generator: 'wemogy:project-sdk-dotnet'
      },
      {
        name: '(Micro-)service (.NET)',
        generator: 'wemogy:project-service-dotnet'
      }
    ];
  }
}

export default resolveGeneratorInheritance(ProjectGenerator);
