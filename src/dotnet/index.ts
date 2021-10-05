import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class DotNetGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);
    this.generators = [
      new GeneratorSelection('Solution', 'wemogy:dotnet-solution'),
      new GeneratorSelection('Class Library', 'wemogy:dotnet-classlib'),
      new GeneratorSelection('ASP.NET Web API', 'wemogy:dotnet-aspnet'),
      new GeneratorSelection('xUnit Tests', 'wemogy:dotnet-xunit')
    ];
  }
}

export default resolveGeneratorInheritance(DotNetGenerator);
