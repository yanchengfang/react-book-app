/// <reference types="vite/client" />

// 声明路径别名模块
declare module '@/components/*' {
  import type { couldHasProps } from './types/componentTypes';
  const component: React.FC<couldHasProps>;
  export default component;
}
declare module '@/pages/*' {
  const component: React.FC;
  export default component;
}

// 通用模块声明
declare module '*?module' {
  const src: string;
  export default src;
}