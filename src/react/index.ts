import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class React extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = [
      new GeneratorSelection('Component', 'wemogy:react-component'),
      new GeneratorSelection('New ReactBase-like component (For your project)', 'wemogy:reactbase-component-external'),
      new GeneratorSelection('New ReactBase component (For ReactBase itself)', 'wemogy:reactbase-component-internal'),
      new GeneratorSelection(
        'Customize ReactBase component (Customize for your project)',
        'wemogy:reactbase-component-customize'
      )
    ];
  }
}

export default resolveGeneratorInheritance(React);
