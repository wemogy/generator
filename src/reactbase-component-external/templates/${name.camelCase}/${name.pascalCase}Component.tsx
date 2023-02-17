import { createReactBaseComponent } from '@wemogy/reactbase';
import <%= name.pascalCase %>Implementation from './implementation/<%= name.pascalCase %>Implementation';
import <%= name.pascalCase %>ThemeDeclaration from './theme/<%= name.pascalCase %>ThemeDeclaration';

const <%= name.pascalCase %>Component = createReactBaseComponent(
  <%= name.pascalCase %>Implementation,
  <%= name.pascalCase %>ThemeDeclaration,
  { base: {} }
);

export default <%= name.pascalCase %>Component;
