import {resolveGeneratorInheritance} from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class DockerSelectionGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = this.generators = [new GeneratorSelection('Docker Compose', 'wemogy:docker-compose')];
  }
}

export default resolveGeneratorInheritance(DockerSelectionGenerator);
