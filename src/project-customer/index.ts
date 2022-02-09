import _ = require('lodash');
import BaseTemplateGenerator from '../BaseTemplateGenerator';

class CustomerProjectGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'customer',
        message: 'Customer name'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: this.appname
      },
      // Frontend
      {
        type: 'confirm',
        name: 'frontend',
        message: 'Generate Frontend?',
        default: true,
        followUpQuestions: [
          {
            type: 'checkbox',
            name: 'frontendSubprojects',
            message: 'Which Frontend subprojects do you want to create?',
            choices: ['React'],
            default: ['React']
          }
        ]
      },
      // Backend
      {
        type: 'confirm',
        name: 'backend',
        message: 'Generate Backend?',
        default: true,
        followUpQuestions: [
          {
            type: 'checkbox',
            name: 'backendSubprojects',
            message: 'Which Backend subprojects do you want to create?',
            choices: ['ASP.NET API Service'],
            default: ['ASP.NET API Service']
          }
        ]
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    const cleanCustomer = _.replace(this.answers.customer, ' ', '').toLowerCase();
    const cleanName = _.replace(this.answers.name, ' ', '').toLowerCase();

    // Base structure
    this.log('Generating base folder structure...');
    this.composeWith('wemogy:project-empty', {
      name: this.answers.name,
      emptyFolders: false
    });

    // Frontend
    if (this.answers.frontend) {
      this.log('Generating Frontend projects...');

      // React
      if (this.answers.frontendSubprojects.indexOf('React') > -1) {
        this.composeWith('wemogy:subproject-frontend-react', {
          folder: 'web',
          name: `@${cleanCustomer}/${cleanName}-web`
        });
      }
    }

    // Backend
    if (this.answers.backend) {
      this.log('Generating Backend projects...');

      // ASP.NET API Service
      if (this.answers.backendSubprojects.indexOf('ASP.NET API Service') > -1) {
        this.composeWith('wemogy:subproject-webservice-dotnet', {
          folder: 'main',
          dapr: true,
          wemogyIdentity: false,
          authorization: false
        });
      }

      // Helm Chart
      this.composeWith('wemogy:subproject-helm-chart', {
        name: cleanName
      });
    }
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {
    this.eclint();
  }
}

export default CustomerProjectGenerator;
