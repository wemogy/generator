import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';

class ProjectGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = [
      {
        name: 'Basic project structure',
        generator: 'wemogy:project-core'
      },
      {
        name: 'SDK (.NET)',
        generator: 'wemogy:project-sdk-dotnet'
      },
      {
        name: 'Service / Microservice (.NET)',
        generator: 'wemogy:project-service-dotnet'
      },
      {
        name: 'Class Library (.NET)',
        generator: 'wemogy:project-lib-dotnet'
      }
    ];
  }
}

export default resolveGeneratorInheritance(ProjectGenerator);
