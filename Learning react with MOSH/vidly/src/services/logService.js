import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn:"https://94b1eac22986452aa21dd14a284010d4@o606204.ingest.sentry.io/5745079",
    integrations: [new Integrations.BrowserTracing()],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  console.log(error);
  Sentry.captureException(error);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    init,
    log
}