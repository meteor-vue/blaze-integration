import './router-link.html';

// Top view is a Vue component instance.
function topView(view) {
  while (view.originalParentView || view.parentView) {
    view = view.originalParentView || view.parentView;
  }
  return view;
}

const routerLinkOptions = [
  'to', 'replace', 'append', 'tag', 'active-class', 'exact', 'event', 'exact-active-class',
];

Template.RouterLink.helpers({
  href() {
    const vm = topView(Template.instance().view);
    const current = vm.$route;
    const args = Template.currentData();
    const {href} = vm.$router.resolve(args.to, current, args.append);
    return href;
  },
  attributes() {
    const args = Template.currentData();
    return Object.keys(args)
      .filter(argName => routerLinkOptions.indexOf(argName) === -1)
      .reduce((attrs, key) => {
        return Object.assign(attrs, { [key]: args[key] });
      }, {});
  },
});

// Taken from vue-router's router-link component's code.
function guardEvent(event) {
  // Don't redirect with control keys.
  if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return;
  // Don't redirect when preventDefault called.
  if (event.defaultPrevented) return;
  // Don't redirect on right click.
  if (event.button !== undefined && event.button !== 0) return;
  // Don't redirect if `target="_blank"`.
  if (event.currentTarget && event.currentTarget.getAttribute) {
    const target = event.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) return;
  }
  // This may be a Weex event which doesn't have this method.
  if (event.preventDefault) {
    event.preventDefault();
  }
  return true;
}

Template.RouterLink.events({
  'click a'(event) {
    // Some other anchor's click?
    if (Template.instance().firstNode !== event.currentTarget) return;

    if (!guardEvent(event)) return;

    const vm = topView(Template.instance().view);
    const current = vm.$route;
    const router = vm.$router;
    const args = Template.currentData();

    const {location} = vm.$router.resolve(args.to, current, args.append);

    if (args.replace) {
      router.replace(location);
    }
    else {
      router.push(location);
    }
  }
});
