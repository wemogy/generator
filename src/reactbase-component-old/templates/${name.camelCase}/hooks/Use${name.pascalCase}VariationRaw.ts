import { <%= name.pascalCase %>ThemeDeclaration } from "..";
import { createUseComponentVariationRawHook } from "../../../..";

const use<%= name.pascalCase %>VariationRaw = createUseComponentVariationRawHook(
  <%= name.pascalCase %>ThemeDeclaration
);

export default use<%= name.pascalCase %>VariationRaw;
