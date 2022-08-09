import { ReactBaseComponentProps } from "../../../../reactBaseComponentBuilder";
import <%= name.pascalCase %>Component from "../<%= name.pascalCase %>Component";

type Full<%= name.pascalCase %>Props = ReactBaseComponentProps<typeof <%= name.pascalCase %>Component>;

export default Full<%= name.pascalCase %>Props;
