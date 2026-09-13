// CSS module declarations
declare module "*.css" {
  const styles: { [className: string]: string };
  export default styles;
}

// Side-effect CSS imports (e.g. import './globals.css')
declare module "*.css" {}
