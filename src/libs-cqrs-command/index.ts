import BaseDotnetTemplateGenerator from '../BaseDotnetTemplateGenerator';
import _ = require('lodash');
import { join } from 'path';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class LibsCqrsCommandGenerator extends BaseDotnetTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Name of the command (without Command suffix)'
      },
      {
        type: 'input',
        name: 'resultType',
        message: 'Result type (leave empty if none)',
        default: ''
      },
      this.projectPrompt,
      {
        type: 'checkbox',
        name: 'additionalPipelienSteps',
        message: 'Which additional pipeline steps do you want to create?',
        choices: ['Validator', 'Authorization', 'Pre-Processor', 'Post-Processor'],
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
    const namespace = `${this.answers.projectName}.Commands`;

    const copyTemplateFolder = (dir: string) => {
      this.copyTemplateToDestination(this.destinationPath(join(this.getProjectPath(), 'Commands')), { namespace }, dir);
    };

    copyTemplateFolder(isGenericCommand ? 'generic-command' : 'void-command');

    if (additionalPipelienSteps.includes('Authorization')) {
      copyTemplateFolder('authorization');
    }

    if (additionalPipelienSteps.includes('Validator')) {
      copyTemplateFolder(validatorType === 'FluentValidation' ? 'validator-fluent-validation' : 'validator-default');
    }

    if (additionalPipelienSteps.includes('Pre-Processor')) {
      copyTemplateFolder('pre-processor');
    }

    if (additionalPipelienSteps.includes('Post-Processor')) {
      copyTemplateFolder(isGenericCommand ? 'post-processor-generic-command' : 'post-processor-void-command');
    }
  }
}

export default resolveGeneratorInheritance(LibsCqrsCommandGenerator);
