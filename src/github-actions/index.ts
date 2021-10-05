import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';

class GitHubActionsGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);
    this.generators = [
      {
        name: 'Action for .NET Builds',
        generator: 'wemogy:github-actions-action-build-dotnet'
      },
      {
        name: 'Action for JavaScript Builds',
        generator: 'wemogy:github-actions-action-build-javascript'
      },
      {
        name: 'Action for Container Image Builds',
        generator: 'wemogy:github-actions-action-containers'
      },
      {
        name: 'Action for Terraform',
        generator: 'wemogy:github-actions-action-terraform'
      },
      {
        name: 'Workflow for Builds',
        generator: 'wemogy:github-actions-workflow-build'
      },
      {
        name: 'Workflow for Releases',
        generator: 'wemogy:github-actions-workflow-release'
      },
      {
        name: 'Workflow for Coding Style Checks',
        generator: 'wemogy:github-actions-workflow-style'
      }
    ];
  }
}

export default resolveGeneratorInheritance(GitHubActionsGenerator);
