import BaseDotnetTemplateGenerator from '../BaseDotnetTemplateGenerator';
import _ = require('lodash');
import { join } from 'path';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class LibsCqrsQueryGenerator extends BaseDotnetTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Name of the query (without Query suffix)'
      },
      {
        type: 'input',
        name: 'resultType',
        message: 'Result type'
      },
      this.projectPrompt,
      {
        type: 'checkbox',
        name: 'additionalPipelienSteps',
        message: 'Which additional pipeline steps do you want to create?',
        choices: ['Validator'],
        default: []
      },
      {
        when: (answers: any) => _.includes(answers.additionalPipelienSteps, 'Validator'),
        type: 'list',
        name: 'validatorType',
        message: 'Which type of validator do you want to create?',
        choices: ['FluentValidation', 'default'],
        default: 'FluentValidation'
      }
    ]);
  }

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    const isGenericCommand = this.answers.resultType !== '';
    const { additionalPipelienSteps, validatorType } = this.answers;
    const namespace = `${this.answers.projectName}.Queries`;

    const copyTemplateFolder = (dir: string) => {
      this.copyTemplateToDestination(this.destinationPath(join(this.getProjectPath(), 'Queries')), { namespace }, dir);
    };

    copyTemplateFolder('query');

    if (additionalPipelienSteps.includes('Validator')) {
      copyTemplateFolder(validatorType === 'FluentValidation' ? 'validator-fluent-validation' : 'validator-default');
    }
  }
}

export default resolveGeneratorInheritance(LibsCqrsQueryGenerator);
