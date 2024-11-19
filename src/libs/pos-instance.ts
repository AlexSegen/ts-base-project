// const { POSIntegrado } = require("transbank-pos-sdk");
import { POSIntegrado } from "./fake-transbank-pos-sdk";
import consola from "consola";

const posInstance = new POSIntegrado();

const startApp = (): Promise<any> => {
    posInstance.setDebug(true);

    return posInstance
        .autoconnect()
        .then(async (port) => {
            return port as { path: string } | false;
        })
        .catch((err) => {
            consola.error(`Ocurrió un error inesperado. POS: ${err.message}`);
            throw new Error(`Ocurrió un error inesperado. POS: ${err.message}`);
        });
}

const DICTIONARY = {
    "0250": () => posInstance.getLastSale(),
    "0700": () => posInstance.getTotals(),
    "0260": ({ printOnPos }: { printOnPos: boolean }) => posInstance.salesDetail(printOnPos),
} as any;

export { posInstance, DICTIONARY, startApp };
