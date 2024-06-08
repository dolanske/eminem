# Eminem

Have you ever wanted to register and emit events and realized there's not a single library out there, that fulfills this very specific and niche need? You're not gonna believe the next part. Your wait is over. Welcome to Eminem. Slim & fully type safe event mitter.

### How to use it

```ts
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

TODO
