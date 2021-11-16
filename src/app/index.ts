import * as chalk from 'chalk';
import GeneratorSelection from '../GeneratorSelection';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
const yosay = require('yosay');
import { resolveGeneratorInheritance } from '../GeneratorResolver';
import SeparatorSelection from '../SeparatorSelection';

class AppGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);
    this.generators = [
      new GeneratorSelection('wemogy Empty project structure', 'wemogy:project-empty'),
      new GeneratorSelection('wemogy Web Service (.NET)', 'wemogy:project-webservice-dotnet'),
      new GeneratorSelection('wemogy Class Library (.NET)', 'wemogy:project-lib-dotnet'),
      new GeneratorSelection('wemogy SDK (.NET)', 'wemogy:project-sdk-dotnet'),
      new GeneratorSelection('wemogy SDK (JavaScript)', 'wemogy:project-sdk-javascript'),
      new GeneratorSelection('wemogy Frontend (React)', 'wemogy:project-frontend-react'),
      new SeparatorSelection(),
      new GeneratorSelection('.NET', 'wemogy:dotnet'),
      new GeneratorSelection('TypeScript', 'wemogy:typescript'),
      new GeneratorSelection('Terraform', 'wemogy:terraform'),
      new GeneratorSelection('Yeoman', 'wemogy:yeoman'),
      new GeneratorSelection('GitHub', 'wemogy:github'),
      new GeneratorSelection('Dapr', 'wemogy:dapr'),
      new SeparatorSelection(),
      new GeneratorSelection('ReactBase', 'wemogy:reactbase'),
      new SeparatorSelection(),
      new GeneratorSelection('wemogy CLI', 'wemogy:wemogy-cli'),
      new SeparatorSelection()
    ];

    this.log(yosay(`Welcome to the ${chalk.blue(`wemogy`)} code generator!`));
    this.log(
      `Choose generators with the ${chalk.cyan(
        'wemogy'
      )} prefix, to generate new projects as part of a larger wemogy repository. This will automatically create the correct folder structure.`
    );
    this.log(chalk.yellow('Hint: Please make sure to call this generator from the repository root.'));
    this.log('');
    this.log(
      'All other options generate basic templates for specific technologies without any specific folder structure.'
    );
    this.log('');
  }
}

export default resolveGeneratorInheritance(AppGenerator);
