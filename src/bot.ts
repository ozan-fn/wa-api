import makeWASocket, { Browsers, WASocket, useMultiFileAuthState } from "@whiskeysockets/baileys";

var conn: WASocket | undefined;

async function connect() {
    if (conn) return conn;
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + "/session");
    conn = makeWASocket({ printQRInTerminal: true, auth: state });
    conn.ev.on("creds.update", saveCreds);
}

connect();

const bot = () => conn;

export { bot, connect };
