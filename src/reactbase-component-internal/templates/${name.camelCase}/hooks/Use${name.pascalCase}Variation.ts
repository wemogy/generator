import <%= name.pascalCase %>ThemeDeclaration from '../theme/<%= name.pascalCase %>ThemeDeclaration';
import { createUseComponentVariationHook } from "../../../../reactBaseComponentFactoryBuilder";

const use<%= name.pascalCase %>Variation = createUseComponentVariationHook(<%= name.pascalCase %>ThemeDeclaration);

export default use<%= name.pascalCase %>Variation;
