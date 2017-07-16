Vue and Blaze integration
=========================

This Meteor package provides Vue components and Blaze templates for easier integration of [Vue](https://vuejs.org/)
and [Blaze](http://blazejs.org) in the same application, with full reactivity across boundaries.

Adding this package to your Meteor application provides:
 * `blaze-template` Vue component, to render Blaze templates from Vue
 * `VueComponent` Blaze template, to render Vue components from Blaze
 * `RouterLink` Blaze template, to render links for [Vue Router](https://router.vuejs.org/en/) in Blaze templates

**You have to use [Tracker-enabled fork of Vue](https://github.com/meteor-vue/vue) and
[fork of Tracker](https://github.com/meteor-vue/tracker).**
See [these instructions for more information](https://github.com/meteor-vue/guide).

Installation
------------

```
meteor add vuejs:blaze-integration
```

blaze-template
--------------

From Vue, you can render Blaze templates with `<blaze-template>` Vue component:

```vue
<blaze-template template="myBlazeTemplate" :data="{message}"></blaze-template>
```

For example, Blaze template could be:

```handlebars
<template name="myBlazeTemplate">
  <p>Message from Vue: {{message}}</p>
</template>
```

This example also binds the data context to the template. So you can pass data from Vue to Blaze template.

You can bind the property to make template dynamic, bound to `templateData` reactive Vue property:

```vue
<blaze-template :template="templateData"></blaze-template>
```

You can use a different tag for the wrapper tag (default is `div`):

```vue
<blaze-template template="myBlazeTemplate" tag="span"></blaze-template>
```

Any extra arguments are passed on to wrapper tag:

```vue
<blaze-template template="myBlazeTemplate" class="foobar"></blaze-template>
```

If you put any content between start and end tag, it is passed to the Blaze template as `Template.contentBlock`:

```vue
<blaze-template template="myBlazeTemplateBlockHelper">
  <p>This is slot content from Vue: {{slotValue}}</p>
</blaze-template>
```

Example Blaze template:

```handlebars
<template name="myBlazeTemplateBlockHelper">
  <p>Blaze content.</p>
  {{> Template.contentBlock}}
</template>
```

It is reactive as well. `slotValue` comes from the Vue component, but it is rendered inside Blaze
block helper template.

VueComponent
------------

From Blaze, you can render Vue components with `VueComponent` Blaze template:

```handlebars
{{> VueComponent component="my-vue-component" props=props}}
```

This example also binds props to the component. So you can pass data from Blaze to Vue component.
Reactively, by having `props` reactively change.

RouterLink
----------

If you use Vue Router in your application, you might want to change pages from Blaze.
Simply using `<a href="...">` will not work well because it will trigger the whole application
to reload on location change. Instead, you can use `RouterLink` Blaze template:

```handlebars
{{#RouterLink to="/"}}Go to Home{{/RouterLink}}
```

This will render a link which will on click trigger page change through router.

The template aims to be equivalent to [`<router-link>` Vue component](https://router.vuejs.org/en/api/router-link.html).
For example, you can pass as `to` an object which will be resolved to the target location.