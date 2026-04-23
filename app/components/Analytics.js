'use client';

import Script from 'next/script';
import { siteConfig } from '@/site.config';

export default function Analytics() {
  const { googleAnalyticsId, goatTrackerUrl } = siteConfig.analytics;

  return (
    <>
      {/* Google Analytics */}
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `}
          </Script>
        </>
      )}

      {/* GoatTracker */}
      {goatTrackerUrl && (
        <Script
          data-goatcounter={goatTrackerUrl}
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
