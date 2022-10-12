import { glob } from 'glob';
import path = require('path');
import * as _ from 'lodash';

export const NO_SOLUTION_SELECTED = 'None';

export function getSlnFiles(): string[] {
  return glob.sync('./**/*.sln');
}

export function getSlnSelectionOptions(): string[] {
  const options = getSlnFiles();
  options.unshift(NO_SOLUTION_SELECTED);
  return options;
}

export function addProjectToSln(slnFile: string, projectFile: string): void {
  if (slnFile !== NO_SOLUTION_SELECTED) {
    this.spawnCommandSync('dotnet', ['sln', `/${path.relative('/', slnFile)}`, 'add', projectFile]);
  }
}

export function addProjectReferenceToProject(destinationProjectPath: string, pathOfProjectToReference: string): void {
  this.spawnCommandSync('dotnet', [
    'add',
    `/${path.relative('/', destinationProjectPath)}`,
    'reference',
    pathOfProjectToReference
  ]);
}

export function enforceSolutionFilePresence(): void {
  // Check, if a solution is already present.
  if (getSlnFiles().length === 0) {
    this.log.error(
      'No existing .sln file found. Please create a new one first by running: yo wemogy:project-solution-dotnet'
    );
    this.cancelCancellableTasks();
  }
}

export function toPascalCase(name: string): string {
  return _.upperFirst(_.camelCase(name));
}
