import { glob } from 'glob';
import path = require('path/posix');
import { timer } from 'rxjs';

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

export function enforceSolutionFilePresence(): void {
  // Check, if a solution is already present.
  if (getSlnFiles().length === 0) {
    this.log.error(
      'No existing .sln file found. Please create a new one first by running: yo wemogy:project-solution-dotnet'
    );
    this.cancelCancellableTasks();
  }
}
