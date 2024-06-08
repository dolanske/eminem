/**
 * Generic event emitter, used for registering and emitting events.
 *
 * @returns Emitter instance
 */
export function createEminem<Events extends Record<string, any>>() {
  let eventCallbacks = new Map()

  /**
   * Register an event listener for a specific event type.
   *
   * @param event Event identifier
   * @param callback Callback to execute when event is fired
   * @returns Stopper function, which removes the current callback from being triggered again.
   */
  function on<EventName extends keyof Events>(event: EventName, callback: Events[EventName]) {
    if (!eventCallbacks.has(event))
      eventCallbacks.set(event, new Set())

    const existing = eventCallbacks.get(event)!
    existing.add(callback)
    eventCallbacks.set(event, existing)

    return () => {
      const isIn = eventCallbacks.get(event)
      if (isIn && isIn.has(callback))
        isIn?.delete(callback)
    }
  }

  /**
   * Trigger events at a specific event identifier
   *
   * @param event Event name
   * @param args Arguments for the callback function, comma separated
   */
  function emit<EventName extends keyof Events>(event: EventName, ...args: Parameters<Events[EventName]>) {
    if (!event)
      throw new TypeError('Missing event name')

    const callbacks = eventCallbacks.get(event)

    if (callbacks) {
      for (const cb of callbacks)
        cb(...args)
    }
  }

  /**
   * Trigger events at a specific identifier and remove all callbacks from the
   * key.
   *
   * @param event Event name
   * @param args Arguments for the callback function, comma separated
   */
  function flush<EventName extends keyof Events>(event: EventName, ...args: Parameters<Events[EventName]>) {
    emit(event, ...args)
    clearKey(event)
  }

  /**
   * Empties all the keys and callbacks from the emitter without emitting
   * anything.
   */
  function reset() {
    eventCallbacks = new Map()
  }

  /**
   * Removes all events under a specific key.
   *
   * @param event Event name
   */
  function clearKey<EventName extends keyof Events>(event: EventName) {
    eventCallbacks.set(event, new Set())
  }

  return {
    on,
    emit,
    flush,
    reset,
    clearKey,
  }
}

export type Emitter<T extends Record<string, any>> = ReturnType<typeof createEminem<T>>
export type On<T extends Record<string, any>> = Emitter<T>['on']
