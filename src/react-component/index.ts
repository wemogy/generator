import _ = require('lodash');
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class ReactComponent extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    // Resolve prefix
    const prefixParts = [];
    const destinationPathParts = this.destinationPath().split('/');
    if (destinationPathParts.includes('ui')) {
      let lastItem;
      do {
        lastItem = destinationPathParts.pop();

        if (lastItem !== 'ui') {
          prefixParts.unshift(lastItem);
        }
      } while (lastItem !== 'ui');
    }
    const defaultStorybookSection = prefixParts.length > 0 ? prefixParts.map(this.pascalCase).join('/') : '';

    this.answers = await this.optionOrPrompt([
      {
        type: 'list',
        name: 'type',
        message: 'Component Type',
        choices: ['Atom', 'Molecule', 'Organism', 'Template', 'Page']
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component Name',
        default: 'MyComponent'
      },
      {
        type: 'input',
        name: 'storybookSection',
        message: 'Storybook section',
        default: (answers: any) => {
          const typeSection = `${this.pascalCase(answers.type)}s`;
          if (defaultStorybookSection) {
            return `${defaultStorybookSection}/${typeSection}`;
          }
          return typeSection;
        }
      },
      {
        type: Boolean,
        name: 'withMobxReactObserver',
        default: false,
        description: 'Wrap with Mobx react observer?'
      }
    ]);
  }

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    // Copy template to destination
    const directory = `${this.answers.type.toLowerCase()}s`;
    this.copyTemplateToDestination(this.destinationPath(directory));

    // Add export statement to index.ts
    const indexFilePath = this.destinationPath(`${directory}/index.ts`);
    const exportStatement = `export * from './${_.camelCase(this.answers.name)}';`;
    this.appendToFileIfNotExists(indexFilePath, exportStatement);
  }
}

export default resolveGeneratorInheritance(ReactComponent);
