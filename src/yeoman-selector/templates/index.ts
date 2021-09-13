import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';

class <%= className %> extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = [
      {
        name: 'Test Generator A',
        generator: 'wemogy:test-a'
      },
      {
        name: 'Test Generator B',
        generator: 'wemogy:test-b'
      }
    ];
  }
}

export default resolveGeneratorInheritance(<%= className %>);
