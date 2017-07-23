// instead of letting aurelia-pal define Object.getPropertyDescriptor we'll do it here
// so nodejs can garbage collect aurelia-pal
(Object as any).getPropertyDescriptor = function(subject: any, name: any) {
  let pd = Object.getOwnPropertyDescriptor(subject, name);
  let proto = Object.getPrototypeOf(subject);
  while (typeof pd === 'undefined' && proto !== null) {
    pd = Object.getOwnPropertyDescriptor(proto, name);
    proto = Object.getPrototypeOf(proto);
  }
  return pd;
};
