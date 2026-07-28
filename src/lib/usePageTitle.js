import { useEffect } from 'react'
import { TABS, CASE_STUDIES, SITE } from '../data/content.js'

const STATIC = {
  '/network': 'Network',
  '/analytics': 'Analytics',
}

// "Faisal Amin: About | Portfolio" — the section name tracks the active tab.
export function titleForPath(pathname) {
  let section = STATIC[pathname]

  if (!section && pathname.startsWith('/work/')) {
    const slug = pathname.slice('/work/'.length).replace(/\/+$/, '')
    section = CASE_STUDIES.find((c) => c.slug === slug)?.project ?? 'Work'
  }

  if (!section) {
    const tab = TABS.find((t) => t.path === pathname || (t.path === '/' && pathname === '/about'))
    section = tab?.label ?? 'About'
  }

  return `${SITE.name}: ${section} | Portfolio`
}

export default function usePageTitle(pathname) {
  useEffect(() => {
    document.title = titleForPath(pathname)
  }, [pathname])
}
