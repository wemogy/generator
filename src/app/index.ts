import * as chalk from 'chalk';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
const yosay = require('yosay');
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class AppGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);
    this.generators = [
      {
        name: 'New wemogy project component',
        generator: 'wemogy:project'
      },
      {
        name: 'Single template',
        generator: 'wemogy:template'
      }
    ];
    this.log(yosay(`Welcome to the ${chalk.blue(`wemogy`)} code generator!`));
    this.log(
      `Choose "${chalk.cyan(
        this.generators[0].name
      )}" to generate a new project component (part of a larger wemogy project) for a wemogy repository.`
    );
    this.log('This will automatically create the correct folder structure.');
    this.log(`${chalk.yellow('Hint:')} Please make sure to call this generator from the repository root.`);
    this.log('');
    this.log(`Choose "${chalk.cyan(this.generators[1].name)}" to generate basic templates for specific technologies.`);
    this.log('This will not generate any specific folder structure.');
    this.log('');
  }
}

export default resolveGeneratorInheritance(AppGenerator);
