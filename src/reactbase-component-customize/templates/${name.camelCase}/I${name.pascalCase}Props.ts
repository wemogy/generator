import { ReactBaseComponentProps } from '@wemogy/reactbase';
import <%= name.pascalCase %> from './<%= name.pascalCase %>';

type I<%= name.pascalCase %>Props = ReactBaseComponentProps<typeof <%= name.pascalCase %>>;

export default I<%= name.pascalCase %>Props;
