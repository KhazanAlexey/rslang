declare module "*.svg" {
  const svg: string;
  export = svg
}

declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export = SVG
}
