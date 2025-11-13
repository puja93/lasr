/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CONFIG_ENDPOINT?: string;
  readonly VITE_SANDBOX_ID?: string;
  readonly VITE_MAPBOX_ACCESS_TOKEN?: string;
  readonly VITE_CONN_DETAILS_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
