import makeWASocket, {
    Browsers,
    UserFacingSocketConfig,
    WASocket,
    makeCacheableSignalKeyStore,
    useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import pino, { Logger } from "pino";

var conn: WASocket;
const logger = pino({ level: "silent" });

async function connect() {
    if (conn) return conn;
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + "/session");
    conn = makeWASocket({
        printQRInTerminal: true,
        auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, logger) },
        logger: logger,
    });
    conn.ev.on("creds.update", saveCreds);
    return conn;
}

export { connect };
