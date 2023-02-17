import { ValueOf } from "ts-essentials";
import { <%= name.pascalCase %> } from "..";

type <%= name.pascalCase %>Variation = ReferenceDictionary["<%= name.camelCase %>"];

export default <%= name.pascalCase %>Variation;

declare global {
  interface <%= name.pascalCase %>Variations {
    default: typeof <%= name.pascalCase %>["variationKey"];
  }

  interface ReferenceDictionary {
    <%= name.camelCase %>: ValueOf<<%= name.pascalCase %>Variations>;
  }
}
