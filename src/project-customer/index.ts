import _ = require('lodash');
import { toNoWhitespaceLowerCase, toPascalCase } from '../StringHelpers';
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import chalk = require('chalk');

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
      {
        type: 'checkbox',
        name: 'components',
        message: 'Which components do you want to create?',
        choices: ['React Frontend', 'ASP.NET Backend Service']
      },
      {
        when: answers => answers.components.includes('ASP.NET Backend Service'),
        type: 'input',
        name: 'backendServiceName',
        message: 'Folder name of the ASP.NET Backend Service',
        default: 'main'
      },
      {
        type: 'input',
        name: 'azureSubscriptionId',
        message: 'Azure Subscription ID',
        default: '00000000-0000-0000-0000-000000000000'
      },
      {
        type: 'input',
        name: 'azureTenantId',
        message: 'Azure Tenant ID',
        default: '00000000-0000-0000-0000-000000000000'
      },
      {
        type: 'input',
        name: 'azureDevKeyVaultName',
        message: 'Developer Azure KeyVault Name',
        default: `${toNoWhitespaceLowerCase(this.appname)}devsecrets`
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    const slnName = `Wemogy.${toPascalCase(this.answers.name)}`;
    const helmChartName = toNoWhitespaceLowerCase(this.answers.name);
    const serviceName = toNoWhitespaceLowerCase(this.answers.backendServiceName);

    // Base structure
    this.log('Generating base folder structure...');
    this.composeWith('wemogy:project-empty', {
      name: this.answers.name,
      skipEclint: true
    });

    // React Frontend
    if (this.answers.components.includes('React Frontend')) {
      this.log('Generating React frontend projects...');

      this.composeWith('wemogy:frontend-react', {
        name: `@wemogy/${toNoWhitespaceLowerCase(this.answers.name)}-web`,
        folder: 'web',
        skipEclint: true
      });
    }

    // ASP.NET Backend Service
    if (this.answers.components.includes('ASP.NET Backend Service')) {
      this.log('ASP.NET Backend Service...');

      // .NET Core Library
      this.composeWith('wemogy:library-dotnet', {
        folder: 'shared/core',
        name: `${slnName}.Shared.Core`,
        nuget: false,
        solutionName: slnName,
        skipEclint: true
      });

      // ASP.NET API Service
      this.composeWith('wemogy:webservice-aspnet', {
        folder: serviceName,
        name: `${slnName}.WebServices.${toPascalCase(this.answers.backendServiceName)}`,
        dapr: true,
        wemogyIdentity: false,
        authorization: false,
        solutionName: slnName,
        skipEclint: true
      });

      // Dapr Secret Store
      this.composeWith('wemogy:dapr-secret-store', {
        name: 'secret-store',
        keyVaultName: this.answers.azureDevKeyVaultName,
        helmChartFolder: toNoWhitespaceLowerCase(this.answers.name),
        skipEclint: true
      });

      // Helm Chart
      this.composeWith('wemogy:helm-customer-project', {
        name: helmChartName,
        service: serviceName,
        skipEclint: true
      });

      this.composeWith('wemogy:github-action-helm', {
        helmChartName: helmChartName,
        skipEclint: true
      });

      // GitHub Actions
      this.composeWith('wemogy:github-action-containers', {
        dockerfilePath: `src/webservices/${serviceName}/Dockerfile`,
        containerName: `${toNoWhitespaceLowerCase(this.answers.name)}-${toNoWhitespaceLowerCase(
          this.answers.backendServiceName
        )}`,
        skipSecretHints: true,
        skipEclint: true
      });
    }

    // Terraform
    this.log('Generating Terraform...');

    // Shared Terraform
    this.composeWith('wemogy:terraform-empty', {
      folder: 'shared',
      remoteBackendStorageAccountName: `${toNoWhitespaceLowerCase(this.answers.name)}tfstate`,
      remoteBackendStorageBlobContainerName: 'tfstate',
      azureSubscriptionId: this.answers.azureSubscriptionId,
      azureTenantId: this.answers.azureTenantId,
      skipEclint: true
    });

    // Individual Terraform
    this.composeWith('wemogy:terraform-empty', {
      folder: 'individual',
      remoteBackendStorageAccountName: `${toNoWhitespaceLowerCase(this.answers.name)}tfstate`,
      remoteBackendStorageBlobContainerName: 'tfstate-dev',
      azureSubscriptionId: this.answers.azureSubscriptionId,
      azureTenantId: this.answers.azureTenantId,
      skipEclint: true
    });

    // GitHub Workflows
    this.log('Generating GitHub Actions...');

    this.composeWith('wemogy:github-workflow-style', {
      name: toNoWhitespaceLowerCase(this.answers.name),
      skipEclint: true
    });

    this.composeWith('wemogy:github-workflow-build', {
      dotnet: false,
      javaScript: false,
      containers: true,
      containersActionPath: './.github/actions/containers',
      skipSecretHints: true,
      skipEclint: true
    });

    this.composeWith('wemogy:github-workflow-release-app', {
      destinationRoot: this.destinationRoot('.'),
      name: toNoWhitespaceLowerCase(this.answers.name),
      skipSecretHints: true,
      skipEclint: true
    });

    this.composeWith('wemogy:github-workflow-deploy-pr', {
      destinationRoot: this.destinationRoot('.'),
      name: toNoWhitespaceLowerCase(this.answers.name),
      skipSecretHints: true,
      skipEclint: true
    });

    this.composeWith('wemogy:github-workflow-shared-infrastructure', {
      destinationRoot: this.destinationRoot('.'),
      name: toNoWhitespaceLowerCase(this.answers.name),
      skipSecretHints: true,
      skipEclint: true
    });

    // Docker Compose
    this.composeWith('wemogy:docker-compose', {
      serviceName: serviceName,
      dapr: true,
      skipEclint: true
    });

    // Scripts
    this.composeWith('wemogy:script-secrets', {
      keyVaultName: `${toNoWhitespaceLowerCase(this.answers.name)}devsecrets`,
      subscriptionId: this.answers.azureSubscriptionId,
      projectType: 'Customer project'
    });
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {
    this.log();
    this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: AZURE_APP_ID`);
    this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: AZURE_PASSWORD`);
    this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: AZURE_TENANT_ID`);
    this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: AKS_NAME`);
    this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: AKS_RESOURCE_GROUP`);
    this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: CONTAINER_REGISTRY_SERVER`);
    this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: WEMOGY_PULL_SECRET_USERNAME`);
    this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: WEMOGY_PULL_SECRET_PASSWORD`);
    this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: WEMOGY_PACKAGES_TOKEN`);
    this.log(`${chalk.yellow('Hint:')} Check if GitHub Repo or Org Secret is set: TERRAFORM_BACKEND_ACCESS_KEY`);
    this.log();

    this.eclint();
  }
}

export default CustomerProjectGenerator;
