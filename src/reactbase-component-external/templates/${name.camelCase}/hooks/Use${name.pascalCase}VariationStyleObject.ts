import { createUseComponentVariationStyleObjectHookNew } from '@wemogy/reactbase';
import <%= name.pascalCase %>ThemeDeclaration from '../theme/<%= name.pascalCase %>ThemeDeclaration';

const use<%= name.pascalCase %>VariationStyleObject = createUseComponentVariationStyleObjectHookNew(<%= name.pascalCase %>ThemeDeclaration);

export default use<%= name.pascalCase %>VariationStyleObject;
