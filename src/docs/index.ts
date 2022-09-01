import {resolveGeneratorInheritance} from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class DocsGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = this.generators = [
      new GeneratorSelection('Docusaurus', 'wemogy:docs-docusaurus'),
      new GeneratorSelection('Architecture Decision Record (ADR)', 'wemogy:docs-adr')
    ];
  }
}

export default resolveGeneratorInheritance(DocsGenerator);
