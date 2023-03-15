import React from 'react';
<% if (enableMobxObserver) { -%>
import { observer } from 'mobx-react-lite';
<% } -%>
import I<%= name.pascalCase %>Props from './I<%= name.pascalCase %>Props';

const <%= name.pascalCase %>: React.FC<I<%= name.pascalCase %>Props> = () => {
  return null;
};

export default <% if (enableMobxObserver) { %>observer(<% } %><%= name.pascalCase %><% if (enableMobxObserver) { %>)<% } %>;
