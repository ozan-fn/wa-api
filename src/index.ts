import Koa from "koa";
import Router from "@koa/router";
import { bodyParser } from "@koa/bodyparser";
import { connect } from "./bot";
import * as emoji from "node-emoji";

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

async function main() {
    var bot = await connect();

    bot.ev.on("connection.update", async (conn) => {
        if (conn.connection == "close") {
            bot.end(undefined);
            bot = await connect();
        }
    });

    router.post("/send-message", async (ctx) => {
        const { phoneNumber, text } = ctx.request.body;
        try {
            const response = await bot.sendMessage(`${phoneNumber}@s.whatsapp.net`, { text: emoji.emojify(text) });
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
