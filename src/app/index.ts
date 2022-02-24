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
      new GeneratorSelection('Project: Empty structure', 'wemogy:project-empty'),
      new GeneratorSelection('Project: Customer project', 'wemogy:project-customer'),
      new GeneratorSelection('Project: wemogy Module', 'wemogy:project-module'),
      new SeparatorSelection(),
      new GeneratorSelection('Frontend (React)', 'wemogy:frontend-react'),
      new GeneratorSelection('Library (.NET)', 'wemogy:library-dotnet'),
      new GeneratorSelection('SDK (.NET)', 'wemogy:sdk-dotnet'),
      new GeneratorSelection('SDK (JavaScript)', 'wemogy:sdk-javascript'),
      new GeneratorSelection('Web Service (ASP.NET)', 'wemogy:webservice-aspnet'),
      new GeneratorSelection('Web Service (Azure Function - .NET)', 'wemogy:webservice-azurefunction-dotnet'),
      new GeneratorSelection('Solution (.NET)', 'wemogy:dotnet-solution'),
      new SeparatorSelection(),
      new GeneratorSelection('Terraform', 'wemogy:terraform'),
      new GeneratorSelection('GitHub', 'wemogy:github'),
      new GeneratorSelection('Dapr', 'wemogy:dapr'),
      new GeneratorSelection('Docker', 'wemogy:docker'),
      new GeneratorSelection('Azure', 'wemogy:azure'),
      new GeneratorSelection('Helm', 'wemogy:helm'),
      new GeneratorSelection('Yeoman', 'wemogy:yeoman'),
      new GeneratorSelection('Git', 'wemogy:git'),
      new GeneratorSelection('wemogy CLI', 'wemogy:wemogy-cli'),
      new SeparatorSelection(),
      new GeneratorSelection('ReactBase', 'wemogy:reactbase'),
      new SeparatorSelection()
    ];

    this.log(yosay(`Welcome to the ${chalk.blue(`wemogy`)} code generator!`));
    this.log(
      chalk.yellow(
        'Hint: The generator automatically creates the correct folder structure. Please make sure to call this generator from the repository root.'
      )
    );
    this.log('');
  }
}

export default resolveGeneratorInheritance(AppGenerator);
