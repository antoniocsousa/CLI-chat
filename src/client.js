import { io } from "socket.io-client";
import readline from "readline";

const socket = io("https://cli-chat-2hcg.onrender.com/");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});

rl.question("Digite seu nome: ", (name) => {
    console.log(`Bem vindo, ${name}\n\n`);

    rl.prompt();

    socket.on("message-client", (message) => {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);

        console.log(message);

        rl.prompt(true);
    })

    rl.on("line", (input) => {
        if (input.trim() !== "") {
            socket.emit("message", `${name}: ${input}`);
        }
        rl.prompt();
    });
});
