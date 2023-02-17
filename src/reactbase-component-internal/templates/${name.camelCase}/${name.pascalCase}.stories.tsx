import { StoryObj, ComponentMeta } from '@storybook/react';

import { <%= name.pascalCase %> as <%= name.pascalCase %>Base, Full<%= name.pascalCase %>Props } from './';

export const <%= name.pascalCase %> = <%= name.pascalCase %>Base.extendVariations({
  base: {
  }
});

// CSF 3.0
export default {
  component: <%= name.pascalCase %>,
  title: 'Atoms/<%= name.pascalCase %>',
  excludeStories: ['<%= name.pascalCase %>'] // exclude the component itself from the storybook
} as ComponentMeta<typeof <%= name.pascalCase %>>;

// CSF 3.0 - explicit render function
export const Default: StoryObj<Full<%= name.pascalCase %>Props> = {
  args: {
    children: 'Primary variant',
    iconVariation: 'advanced',
    primary: true
  }
};
