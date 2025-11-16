import { Server as HTTPServer } from "node:http";
import { Server as SocketIOServer } from "socket.io";

declare global {
  // eslint-disable-next-line no-var
  var io: SocketIOServer | undefined;
}

export function initIO(server: HTTPServer) {
  if (!global.io) {
    global.io = new SocketIOServer(server, {
      path: "/api/socket/io",
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    console.log("Socket.IO initialized");

    global.io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  } else {
    console.log("Reusing existing Socket.IO instance");
  }

  return global.io;
}

export const io = global.io;
