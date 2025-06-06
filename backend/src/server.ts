import app from "./app"
import mongoose from "mongoose"
import config from "./app/config"
import { Server } from "http"
import seedSuperAdmin from "./app/DB";

let server: Server;


async function main() {

    try {
        await mongoose.connect(config.dbUrl as string)
       server= app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
        })
        console.log('Database connected')
        seedSuperAdmin()
    }
    catch (error) {
        console.log(error)
    }
}

main()

process.on('unhandledRejection', (error) => {
    console.log('Unhandled Rejection at:', error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
}
);

process.on('uncaughtException', (error) => {
    console.log('Uncaught Exception thrown:', error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
}
);