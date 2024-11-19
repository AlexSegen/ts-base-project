export class POSIntegrado {
    constructor() { }

    setDebug(debug: boolean) {
        console.log(`setDebug result, debug: ${debug}`);
    }

    isConnected() {
        return true;
    }

    autoconnect() {
        return new Promise((resolve) => resolve({
            path: "autoconnect result",
        }));
    }
    loadKeys() {
        return new Promise((resolve) => resolve("loadKeys result"));
    }

    getLastSale() {
        return new Promise((resolve) => resolve("getLastSale result"));
    }

    getTotals() {
        return new Promise((resolve) => resolve("getTotals result"));
    }

    salesDetail(printOnPos?: boolean) {
        return new Promise((resolve) => resolve(`salesDetail result, printOnPos: ${printOnPos}`));
    }
}
