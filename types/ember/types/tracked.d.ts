// Fix tracked typescript definition for defineProperty(this, 'prop', tracked())
declare module '@glimmer/tracking' {
  function tracked(target: Object, propertyKey: string | symbol): void;
  function tracked(): PropertyDescriptor;
}
