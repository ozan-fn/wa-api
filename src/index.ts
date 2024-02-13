import Koa from "koa";
import Router from "@koa/router";
import { bodyParser } from "@koa/bodyparser";
import { connect } from "./bot";
import * as emoji from "node-emoji";
import { WASocket } from "@whiskeysockets/baileys";

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

let bot: WASocket;

async function connectBot() {
    let connected = false;
    while (!connected) {
        try {
            bot = await connect();
            connected = true;
            console.log("Bot connected successfully");
        } catch (error) {
            console.error("Failed to connect bot, retrying...", error);
            await new Promise((resolve) => setTimeout(resolve, 5000)); // Tunda  5 detik sebelum mencoba lagi
        }
    }
}

async function main() {
    await connectBot(); // Memastikan bot terhubung sebelum melanjutkan

    bot.ev.on("connection.update", async (conn) => {
        if (conn.connection === "close") {
            console.log("Connection closed, attempting to reconnect...");
            await connectBot(); // Coba terhubung ulang saat koneksi ditutup
        }
    });

    router.post("/send-message", async (ctx) => {
        const { phoneNumber, text } = ctx.request.body;
        try {
            const response = await bot.sendMessage(`${phoneNumber}@s.whatsapp.net`, { text: emoji.emojify(text) });
            console.log(phoneNumber, response?.status);
            ctx.body = { success: true, response };
        } catch (error) {
            if (error instanceof Error) {
                ctx.status = 500;
                ctx.body = { success: false, message: error.message };
            }
        }
    });

    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
}

main();
