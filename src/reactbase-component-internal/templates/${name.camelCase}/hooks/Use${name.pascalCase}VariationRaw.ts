import <%= name.pascalCase %>ThemeDeclaration from "../theme/<%= name.pascalCase %>ThemeDeclaration";
import { createUseComponentVariationRawHook } from "../../../../reactBaseComponentFactoryBuilder";

const use<%= name.pascalCase %>VariationRaw = createUseComponentVariationRawHook(
  <%= name.pascalCase %>ThemeDeclaration
);

export default use<%= name.pascalCase %>VariationRaw;
