import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class <%= name.pascalCase %> extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = this.generators = [new GeneratorSelection('Test A', 'wemogy:test-a')];
  }
}

export default resolveGeneratorInheritance(<%= name.pascalCase %>);
