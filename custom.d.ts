// see webpack typescript tutorial
// basically, we need to let static stuff pass through the typescript checker.
declare module '*.svg' {
  const content: any;
  export default content;
}
