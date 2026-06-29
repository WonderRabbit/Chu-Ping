import React from 'react';

export default function <%= pascalName %>(props) {
  return (
    <section>
      <h2><%= pascalName %></h2>
      {props.children}
    </section>
  );
}
