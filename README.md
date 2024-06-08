# Eminem

Have you ever wanted to register and emit events and realized there's not a single library out there, that fulfills this very specific and niche need? You're not gonna believe the next part. Your wait is over. Welcome to Eminem. Slim & fully type safe event mitter.

### How to use it

```ts
import { createEminem } from '@dolanske/eminem'

interface Events {
  join: (username: string, timestamp: number) => void
}

// Create new eminem instance and provide it with the
// events you'll be using.
const emitter = createEminem<Events>()

// Register event listeners
emitter.on('join', (username, timestamp) => {
  // username will be automatically typed as string
})

// Emit an event. The emit function will expect the same
// arguments that were provided when new emitter was registered
emitter.emit('join', 'dolanske', Date.now())
```

### Api

##### On

Register an event listener. The callback types are based on the name of the base events.
Returns function, that when called, removes the provided callback from the listeners.

```ts
emitter.on<Name extends keyof Events>(event: Name, callback: Events[Name]) => StopperFn
```

##### Emit

Emit an event. This event can also contain optional parameters

```ts
emitter.emit<Name extends keyof Events>(event: Name, ...args: Parameters<Events[Name]>) => void
```

##### Flush

Similar to `emit`, but all registered listener callbacks are removed afterwards.

```ts
emitter.flush<Name extends keyof Events>(event: Name, ...args: Parameters<Events[Name]>) => void
```

##### Clear key

Removes all registered listener callbacks for a specific event.

```ts
emitter.clearKey<Name extends keyof Events>(event: Name) => void
```

##### Reset

Resets the entire emitter. Remove all registered listener callbacks.

```ts
emitter.reset() => void
```
