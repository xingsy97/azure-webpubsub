## API Report File for "socketio-webpubsub-extension"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import * as engine from 'engine.io';
import * as SIO from 'socket.io';
import { WebPubSubServiceClientOptions } from '@azure/web-pubsub';

// @public
export function init(): void;

// @public (undocumented)
export function useAzureWebPubSub(this: SIO.Server, webPubSubOptions: WebPubSubExtensionOptions, useDefaultAdapter?: boolean): SIO.Server;

// @public
export class WebPubSubAdapterProxy {
    constructor(extraArgForWpsAdapter: string);
}

// @public
export class WebPubSubEioServer extends engine.Server {
    constructor(options: engine.ServerOptions, webPubSubOptions: WebPubSubExtensionOptions);
}

// @public (undocumented)
export interface WebPubSubExtensionOptions {
    // (undocumented)
    connectionString: string;
    // (undocumented)
    hub: string;
    // (undocumented)
    path: string;
    // (undocumented)
    webPubSubServiceClientOptions?: WebPubSubServiceClientOptions;
}

// (No @packageDocumentation comment for this package)

```