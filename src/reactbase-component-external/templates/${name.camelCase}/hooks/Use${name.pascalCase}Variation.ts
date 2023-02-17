import { createUseComponentVariationHookNew } from '@wemogy/reactbase';
import <%= name.pascalCase %>ThemeDeclaration from '../theme/<%= name.pascalCase %>ThemeDeclaration';

const use<%= name.pascalCase %>Variation = createUseComponentVariationHookNew(<%= name.pascalCase %>ThemeDeclaration);

export default use<%= name.pascalCase %>Variation;
