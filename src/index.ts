import bot from "./bot";

bot?.ev.on("connection.update", ({ connection }) => console.log(connection));
