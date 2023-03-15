import { StoryObj, ComponentMeta } from '@storybook/react';
import <%= name.pascalCase %> from './<%= name.pascalCase %>';
import I<%= name.pascalCase %>Props from './I<%= name.pascalCase %>Props';

// CSF 3.0
export default {
  component: <%= name.pascalCase %>,
  title: 'Atoms/<%= name.pascalCase %>'
} as ComponentMeta<typeof <%= name.pascalCase %>>;

// CSF 3.0 - explicit render function
export const Default: StoryObj<I<%= name.pascalCase %>Props> = {
  args: {
  }
};
