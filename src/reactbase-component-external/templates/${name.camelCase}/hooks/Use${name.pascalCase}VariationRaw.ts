import { createUseComponentVariationRawHookNew } from '@wemogy/reactbase';
import <%= name.pascalCase %>ThemeDeclaration from '../theme/<%= name.pascalCase %>ThemeDeclaration';

const use<%= name.pascalCase %>VariationRaw = createUseComponentVariationRawHookNew(<%= name.pascalCase %>ThemeDeclaration);

export default use<%= name.pascalCase %>VariationRaw;
