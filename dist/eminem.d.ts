/**
 * Generic event emitter, used for registering and emitting events.
 *
 * @returns Emitter instance
 */
export declare function createEminem<Events extends Record<string, any>>(): {
    on: <EventName extends keyof Events>(event: EventName, callback: Events[EventName]) => () => void;
    emit: <EventName_1 extends keyof Events>(event: EventName_1, ...args: Parameters<Events[EventName_1]>) => void;
    flush: <EventName_2 extends keyof Events>(event: EventName_2, ...args: Parameters<Events[EventName_2]>) => void;
    reset: () => void;
    clearKey: <EventName_3 extends keyof Events>(event: EventName_3) => void;
};

export declare type Emitter<T extends Record<string, any>> = ReturnType<typeof createEminem<T>>;

export declare type On<T extends Record<string, any>> = Emitter<T>['on'];

export { }
