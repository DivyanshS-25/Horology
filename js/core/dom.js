// HOROLOGY — DOM Utilities
export function $(selector, scope = document) {
  return scope.querySelector(selector);
}

export function $$(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

export function on(element, eventType, selector, handler) {
  if (typeof selector === 'function') {
    element.addEventListener(eventType, selector);
    return () => element.removeEventListener(eventType, selector);
  }

  const delegate = (e) => {
    const target = e.target.closest(selector);
    if (target && element.contains(target)) {
      handler.call(target, e, target);
    }
  };

  element.addEventListener(eventType, delegate);
  return () => element.removeEventListener(eventType, delegate);
}

export function safeHtml(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    const val = values[i - 1];
    return acc + (val !== undefined && val !== null ? val : '') + str;
  });
}
