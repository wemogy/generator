import _ = require('lodash');
import { toKebabCase, toNoWhitespaceLowerCase, toPascalCase } from '../StringHelpers';
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import chalk = require('chalk');

class ModuleProjectGenerator extends BaseTemplateGenerator {
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
        name: 'name',
        message: 'Module name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'repoUrl',
        message: 'GitHub Repository URL (for publishing packages)',
        default: `https://github.com/wemogy/${toKebabCase(this.appname)}`
      },
      {
        type: 'checkbox',
        name: 'components',
        message: 'Which components do you want to create?',
        choices: ['JavaScript SDK', '.NET SDK', 'ASP.NET Backend Service']
      },
      {
        when: answers => answers.components.includes('ASP.NET Backend Service'),
        type: 'input',
        name: 'backendServiceName',
        message: 'Name of the backend service',
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
        default: `${toNoWhitespaceLowerCase(this.appname)}devvault`
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    const slnName = `Wemogy.${toPascalCase(this.answers.name)}`;
    const helmChartName = toNoWhitespaceLowerCase(this.answers.name);

    // Base structure
    this.log('Generating base folder structure...');
    this.composeWith('wemogy:project-empty', {
      name: this.answers.name,
      skipEclint: true
    });

    // JavaScript SDK
    if (this.answers.components.includes('JavaScript SDK')) {
      this.log('Generating JavaScript SDK...');

      this.composeWith('wemogy:sdk-javascript', {
        name: `@wemogy/${toNoWhitespaceLowerCase(this.answers.name)}-sdk`,
        repoUrl: this.answers.repoUrl,
        skipEclint: true
      });

      this.composeWith('wemogy:github-action-javascript', {
        jsPath: `src/sdk/javascript`,
        skipSecretHints: true,
        skipEclint: true
      });
    }

    // .NET SDK
    if (this.answers.components.includes('.NET SDK')) {
      this.log('Generating .NET SDK...');

      this.composeWith('wemogy:sdk-dotnet', {
        name: `${slnName}.Sdk`,
        repoUrl: this.answers.repoUrl,
        solutionName: slnName,
        skipEclint: true
      });

      this.composeWith('wemogy:github-action-dotnet', {
        slnPath: `src/${slnName}.sln`,
        skipSecretHints: true,
        skipEclint: true
      });
    }

    // ASP.NET Backend Service
    if (this.answers.components.includes('ASP.NET Backend Service')) {
      this.log('Generating ASP.NET Backend Service...');

      this.composeWith('wemogy:library-dotnet', {
        folder: 'core',
        name: `${slnName}.Shared.Core`,
        nuget: false,
        solutionName: slnName,
        skipEclint: true
      });

      // ASP.NET API Service
      this.composeWith('wemogy:webservice-aspnet', {
        folder: toNoWhitespaceLowerCase(this.answers.backendServiceName),
        name: `${slnName}.Webservices.${toPascalCase(this.answers.backendServiceName)}`,
        dapr: true,
        wemogyIdentity: false,
        authorization: false,
        solutionName: slnName,
        skipEclint: true
      });

      this.composeWith('wemogy:github-action-containers', {
        dockerfilePath: `src/webservices/${toNoWhitespaceLowerCase(this.answers.backendServiceName)}/Dockerfile`,
        containerName: `${toNoWhitespaceLowerCase(this.answers.name)}-${toNoWhitespaceLowerCase(
          this.answers.backendServiceName
        )}`,
        skipSecretHints: true,
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
      this.composeWith('wemogy:helm-wemogy-module', {
        name: helmChartName,
        service: toNoWhitespaceLowerCase(this.answers.backendServiceName),
        skipEclint: true
      });
    }

    // Terraform
    this.log('Generating Terraform...');

    this.composeWith('wemogy:terraform-empty', {
      folder: 'terraform',
      remoteBackendStorageAccountName: `${toNoWhitespaceLowerCase(this.answers.name)}tfstate`,
      remoteBackendStorageBlobContainerName: 'tfstate',
      azureSubscriptionId: this.answers.azureSubscriptionId,
      azureTenantId: this.answers.azureTenantId,
      skipEclint: true
    });

    // GitHub Workflows
    this.log('Generating GitHub Actions Workflows...');

    this.composeWith('wemogy:github-workflow-style', {
      name: toNoWhitespaceLowerCase(this.answers.name),
      skipEclint: true
    });

    this.composeWith('wemogy:github-workflow-build', {
      dotnet: this.answers.components.includes('.NET SDK'),
      buildDotnetActionPath: './.github/actions/dotnet',
      javaScript: this.answers.components.includes('JavaScript SDK'),
      buildJavaScriptActionPath: './.github/actions/javascript',
      containers: this.answers.components.includes('ASP.NET Backend Service'),
      containersActionPath: './.github/actions/containers',
      skipSecretHints: true,
      skipEclint: true
    });

    this.composeWith('wemogy:github-workflow-release-module', {
      nuget: this.answers.components.includes('.NET SDK'),
      buildDotnetActionPath: './.github/actions/dotnet',
      npm: this.answers.components.includes('JavaScript SDK'),
      buildJavaScriptActionPath: './.github/actions/javascript',
      containers: this.answers.components.includes('ASP.NET Backend Service'),
      containersActionPath: './.github/actions/containers',
      helm: this.answers.components.includes('ASP.NET Backend Service'),
      helmChartName: helmChartName,
      skipSecretHints: true,
      skipEclint: true
    });
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {
    this.log();
    this.log(`${chalk.yellow('Hint:')} Please don't forget to set the GitHub Secret: HELM_REPO_TOKEN`);
    this.log(`${chalk.yellow('Hint:')} Please don't forget to set the GitHub Secret: CONTAINER_REGISTRY_LOGIN_SERVER`);
    this.log(`${chalk.yellow('Hint:')} Please don't forget to set the GitHub Secret: CONTAINER_REGISTRY_USERNAME`);
    this.log(`${chalk.yellow('Hint:')} Please don't forget to set the GitHub Secret: CONTAINER_REGISTRY_PASSWORD`);
    this.log(`${chalk.yellow('Hint:')} Please don't forget to set the GitHub Secret: WEMOGY_PACKAGES_TOKEN`);
    this.log();

    this.eclint();
  }
}

export default ModuleProjectGenerator;
