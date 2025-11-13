import { headers } from 'next/headers';
import { App } from '@/components/app/app';
import { getAppConfig } from '@/lib/utils';

export default async function Page() {
  const hdrs = await headers();
  const appConfig = await getAppConfig(hdrs);
  const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN || '';

  return <App appConfig={appConfig} mapboxToken={mapboxToken} />;
}
