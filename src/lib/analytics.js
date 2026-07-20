// Both values are public by design: the phc_ key is write-only ingestion and
// ships in the bundle of every PostHog site. Env vars win if a CI build ever
// supplies them (they're set as GitHub Actions variables), otherwise these
// literals keep local builds working.
const KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY ?? 'phc_z9AFSWLAfWABhscEe8jt4vQj6hotyUb9V5z5vB7eAbqZ'
const HOST = import.meta.env.VITE_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com'

// posthog-js is ~76KB gzipped — more than half the rest of the site. Loading it
// as its own async chunk keeps it out of the critical path, so the profile
// still paints at the old speed and analytics attach a moment later.
let instance = null

// Defer to after first paint, when the main thread is free. Importing at module
// scope put this chunk on the critical path and delayed the largest paint.
const whenIdle = (fn) => {
  const run = () => (window.requestIdleCallback ?? ((cb) => setTimeout(cb, 200)))(fn)
  if (document.readyState === 'complete') run()
  else window.addEventListener('load', run, { once: true })
}

// Only the deployed site reports. Local dev would otherwise fill the project
// with pageviews from your own work-in-progress.
const ready = !import.meta.env.PROD ? null : (async () => {
  await new Promise(whenIdle)
  const { default: posthog } = await import('posthog-js')

  posthog.init(KEY, {
    api_host: HOST,

    // No cookies and no localStorage, so no consent banner is required.
    // The site is a SPA, so one visit is one page load — the whole
    // About → Work → case study journey still holds together in memory.
    persistence: 'memory',

    // Records which elements get clicked without hand-tagging each one.
    autocapture: true,

    // react-router navigation isn't a real page load; App fires these itself.
    capture_pageview: false,
    capture_pageleave: true,

    // Session recording replays a real person's mouse and keystrokes, which
    // would need disclosure. Heatmaps give the click data without that.
    disable_session_recording: true,
    enable_heatmaps: true,

    // Nothing on the site uses surveys — skip the extra module it pulls in.
    disable_surveys: true,
  })

  instance = posthog
  return posthog
})()

export function initAnalytics() {
  return ready
}

// Called on every react-router navigation so tab switches show up as pageviews.
// Awaits the chunk so navigations during the initial load aren't dropped.
export async function capturePageview(path) {
  if (!ready) return
  const posthog = instance ?? (await ready)
  posthog.capture('$pageview', { $current_url: window.location.origin + path })
}
