import makeWASocket, { Browsers, WASocket, useMultiFileAuthState } from "@whiskeysockets/baileys";

function main() {
    let conn: WASocket | undefined;
    (async () => {
        const { state, saveCreds } = await useMultiFileAuthState(__dirname + "/session");
        conn = makeWASocket({ printQRInTerminal: true, auth: state, browser: Browsers.macOS("Desktop"), syncFullHistory: true });
        conn.ev.on("creds.update", saveCreds);
    })();
    return conn;
}

export default main();
