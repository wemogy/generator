import * as chalk from 'chalk';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
const yosay = require('yosay');
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class AppGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);
    this.generators = [
      {
        name: 'Project Template',
        generator: 'wemogy:project'
      },
      {
        name: '.NET',
        generator: 'wemogy:dotnet'
      },
      {
        name: 'Terraform',
        generator: 'wemogy:terraform'
      },
      {
        name: 'Yeoman',
        generator: 'wemogy:yeoman'
      }
      // {
      // 	name: 'GitHub Actions',
      // 	generator: 'wemogy:github-actions'
      // }
    ];
    this.log(yosay(`Welcome to the ${chalk.blue(`wemogy`)} code generator!`));
  }
}

export default resolveGeneratorInheritance(AppGenerator);
