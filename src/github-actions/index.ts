import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class GitHubActionsGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);
    this.generators = [
      new GeneratorSelection('Action for .NET Builds', 'wemogy:github-actions-action-build-dotnet'),
      new GeneratorSelection('Action for JavaScript Builds', 'wemogy:github-actions-action-build-javascript'),
      new GeneratorSelection('Action for Container Image Builds', 'wemogy:github-actions-action-containers'),
      new GeneratorSelection('Action for Terraform', 'wemogy:github-actions-action-terraform'),
      new GeneratorSelection('Workflow for Builds', 'wemogy:github-actions-workflow-build'),
      new GeneratorSelection('Workflow for Releases', 'wemogy:github-actions-workflow-release'),
      new GeneratorSelection('Workflow for Coding Style Checks', 'wemogy:github-actions-workflow-style')
    ];
  }
}

export default resolveGeneratorInheritance(GitHubActionsGenerator);
