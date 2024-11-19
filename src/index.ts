import consola from "consola";
import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

import { posInstance, DICTIONARY, startApp } from "./libs/pos-instance";

// Ruta POST
app.post("/api/code/:code", async (req: any, res: any) => {
    try {
        if (!posInstance.isConnected()) {
            return res.status(500).send("Error: POS no está conectado");
        }

        const code = req.params?.code as string;

        if (!DICTIONARY[code]) {
            return res.status(400).send("Error: Código no válido");
        }

        const keys = await posInstance.loadKeys();

        const result = await DICTIONARY[code](req.body);
        return res.send({ result, keys });
    } catch (error: any) {
        return res.send(`Error: ${error.message}`);
    }
});

// Iniciar el servidor
function startServer() {
    app.listen(port, () => {
        consola.start(`Servidor escuchando en http://localhost:${port}`);
    });
}
startApp().then((port) => {
    if (port === false) {
        consola.error("No se encontró ningún POS conectado");
    } else {
        startServer();
    }
}).catch((err) => {
    consola.error(`Ocurrió un error inesperado. POS: ${err.message}`);
});
