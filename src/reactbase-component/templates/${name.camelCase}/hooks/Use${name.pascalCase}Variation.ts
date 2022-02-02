import { <%= name.pascalCase %>ThemeDeclaration } from "..";
import { createUseComponentVariationHook } from "../../../..";

const use<%= name.pascalCase %>Variation = createUseComponentVariationHook(
  <%= name.pascalCase %>ThemeDeclaration
);

export default use<%= name.pascalCase %>Variation;
