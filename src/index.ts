import Koa from "koa";
import Router from "@koa/router";
import { bodyParser } from "@koa/bodyparser";
import { bot } from "./bot"; // Assuming you have a Bot class or interface in ./bot

const app = new Koa();
const router = new Router();

app.use(bodyParser());

bot()?.ev.on("connection.update", ({ connection }) => {
    console.log(connection);
});

router.post("/send-message", async (ctx) => {
    const { phoneNumber, text } = ctx.request.body;
    try {
        const response = await bot()?.sendMessage(`${phoneNumber}@s.whatsapp.net`, { text });
        ctx.body = { success: true, response };
    } catch (error) {
        if (error instanceof Error) {
            ctx.status = 500;
            ctx.body = { success: false, message: error.message };
        }
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
