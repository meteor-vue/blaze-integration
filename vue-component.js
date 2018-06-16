import {_} from 'meteor/underscore';
import {EJSON} from 'meteor/ejson';

import {DataLookup} from 'meteor/peerlibrary:data-lookup';

import Vue from 'vue';

import './vue-component.html';

function removeVm(vm) {
  vm.$destroy();
  if (vm.$el) {
    vm.$el.remove();
  }
}

Template.VueComponent.onRendered(function () {
  this.autorun((computation) => {
    if (this.vm) {
      removeVm(this.vm);
      this.vm = null;
    }

    // Using DataLookup to depend only on "component" value from the data context.
    // We do not want to recreate the whole component unnecessarily.
    let component = DataLookup.get(() => Template.currentData(this.view), 'component', (a, b) => a === b) || null;
    let componentName = ""; // name of component will be used in error message

    // I propose to replace by condition by
    // typeof myVar === 'string' || myVar instanceof String
    if (_.isString(component)) {
      componentName = component;
      component = Vue.component(component);
    }
    else { // i propose better define this condition
      componentName = ""; // i do not why component can be something else like string
      component = Vue.extend(component);
    }

    // Extra arguments to be passed to the component's constructor.
    // Any change in them recreate the whole component.
    let args = DataLookup.get(() => Template.currentData(this.view), 'args', EJSON.equals) || {};

    if (component) {
      // It can be any element, because it gets replaced by Vue.
      const el = document.createElement('div');
      this.view._domrange.parentElement.insertBefore(el, this.view.lastNode());

      // Initial set of non-reactive props.
      const propsData = Tracker.nonreactive(() => DataLookup.lookup(Template.currentData(this.view), 'props'));

      // To prevent unnecessary reruns of the autorun if constructor registers any dependency.
      // The only dependency we care about is on "component" which has already been established.
      this.vm = Tracker.nonreactive(() => {
        return new component(_.extend({
          el,
          propsData,
        }, args));
      });

      // And now observe props and update them if they change.
      this.autorun((computation) => {
        const props = DataLookup.get(() => Template.currentData(this.view), 'props', EJSON.equals) || {};
        _.each(_.keys(this.vm._props || {}), (key, i) => {
          this.vm._props[key] = props[key];
        });
      });
    } else {
        throw new Error(`Component ${componentName} not found by Vue.component method`);
    }
  });
});

Template.VueComponent.onDestroyed(function () {
  if (this.vm) {
    removeVm(this.vm);
    this.vm = null;
  }
});
