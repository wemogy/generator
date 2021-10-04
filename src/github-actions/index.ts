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
        name: 'Pipeline for Builds',
        generator: 'wemogy:github-actions-pipeline-build'
      },
      {
        name: 'Pipeline for Releases',
        generator: 'wemogy:github-actions-pipeline-release'
      }
    ];
  }
}

export default resolveGeneratorInheritance(GitHubActionsGenerator);
