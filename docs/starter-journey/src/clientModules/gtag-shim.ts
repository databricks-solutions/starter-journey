/**
 * Ensures window.gtag is callable before @docusaurus/plugin-google-gtag runs
 * onRouteDidUpdate (which calls gtag inside setTimeout). Some browsers,
 * extensions, or CSP setups block the inline gtag bootstrap while the bundle
 * still includes the plugin client module, which throws "gtag is not a function".
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function ensureGtag(): void {
  if (!ExecutionEnvironment.canUseDOM) {
    return;
  }
  const w = window as Window & {dataLayer?: unknown[]; gtag?: unknown};
  if (typeof w.gtag === 'function') {
    return;
  }
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer!.push(args);
  };
}

ensureGtag();

export default {};
