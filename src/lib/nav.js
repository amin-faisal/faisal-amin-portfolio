import { TABS } from '../data/content.js'

// '/about' is an alias the router accepts for the default '/' tab.
export const TAB_PATHS = new Set([...TABS.map((t) => t.path), '/about'])

export const isTabPath = (path) => TAB_PATHS.has(path)

// Moving between profile tabs replaces the history entry instead of stacking
// one per tab, so Back exits the site rather than rewinding the tabs.
export const navOptions = (path) => (isTabPath(path) ? { replace: true } : undefined)
