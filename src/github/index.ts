import {resolveGeneratorInheritance} from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class GitHubGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);
    this.generators = [
      new GeneratorSelection('Action for .NET Builds', 'wemogy:github-action-dotnet'),
      new GeneratorSelection('Action for JavaScript Builds', 'wemogy:github-action-javascript'),
      new GeneratorSelection('Action for Container Image Builds', 'wemogy:github-action-containers'),
      new GeneratorSelection('Action for Helm Charts', 'wemogy:github-action-helm'),
      new GeneratorSelection('Workflow for Builds', 'wemogy:github-workflow-build'),
      new GeneratorSelection('Workflow for Tests', 'wemogy:tests'),
      new GeneratorSelection('Workflow for Shared Infrastructure', 'wemogy:github-workflow-shared-infrastructure'),
      new GeneratorSelection(
        'Workflow for App Releases (with GitHub Environments)',
        'wemogy:github-workflow-release-app'
      ),
      new GeneratorSelection(
        'Workflow for Module Deployments (without GitHub Environments)',
        'wemogy:github-workflow-deploy-module'
      ),
      // new GeneratorSelection(
      //   'Workflow for App Deployments (without GitHub Environments)',
      //   'wemogy:github-workflow-deploy-app'
      // ),
      new GeneratorSelection('Workflow for Pull Request Deployments', 'wemogy:github-workflow-deploy-pr'),
      new GeneratorSelection('Workflow for Coding Style Checks', 'wemogy:github-workflow-style'),
      new GeneratorSelection('Workflow for publishing Docusaurus', 'wemogy:github-workflow-docs')
    ];
  }
}

export default resolveGeneratorInheritance(GitHubGenerator);
