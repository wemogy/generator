import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';

class DotNetGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);
    this.generators = [
      {
        name: 'Solution',
        generator: 'wemogy:dotnet-solution'
      },
      {
        name: 'Class Library',
        generator: 'wemogy:dotnet-classlib'
      },
      {
        name: 'ASP.NET Web API',
        generator: 'wemogy:dotnet-aspnet'
      },
      {
        name: 'xUnit Tests',
        generator: 'wemogy:dotnet-xunit'
      }
    ];
  }
}

export default resolveGeneratorInheritance(DotNetGenerator);
