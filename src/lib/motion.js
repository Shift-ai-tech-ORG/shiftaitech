import { useSyncExternalStore } from 'react'

/* One shared pause switch for the looping WebGL pieces on the home page. */
let paused = false
const listeners = new Set()

export function isMotionPaused() {
  return paused
}

export function toggleMotion() {
  paused = !paused
  listeners.forEach((fn) => fn())
}

export function subscribeMotion(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function useMotionPaused() {
  return useSyncExternalStore(subscribeMotion, isMotionPaused, () => false)
}
