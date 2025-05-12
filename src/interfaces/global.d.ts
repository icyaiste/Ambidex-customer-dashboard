interface Window {
  env: {
    VITE_REACT_APP_BACKEND_URL: string;
  };
}

declare module "../locales/*.js" {
  export const sv_SE: Record<string, any>;
  export const eng_US: Record<string, any>;
}
