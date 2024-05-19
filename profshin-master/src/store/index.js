import {createPinia} from "pinia";
import {PiniaLogger} from "pinia-logger";
import {BackendPaginatorPlugin} from "@/plugins/index";
import {PiniaLoading} from 'pinia-plugin-loading'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const pinia = createPinia();

pinia.use(
    PiniaLogger({
      expanded: false,
      // disabled: process.env.MODE === 'production',
    })
);

pinia.use(
    PiniaLoading
)

pinia.use(
    BackendPaginatorPlugin()
)

pinia.use(piniaPluginPersistedstate)

export * from "./ui";
export * from "./catalog";
