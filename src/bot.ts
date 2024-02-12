import makeWASocket, { Browsers, UserFacingSocketConfig, WASocket, useMultiFileAuthState } from "@whiskeysockets/baileys";
import pino, { Logger } from "pino";

var conn: WASocket;

async function connect() {
    if (conn) return conn;
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + "/session");
    conn = makeWASocket({ printQRInTerminal: true, auth: state, browser: Browsers.macOS("Desktop"), syncFullHistory: true });
    conn.ev.on("creds.update", saveCreds);
    return conn;
}

export { connect };
