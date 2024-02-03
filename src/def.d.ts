interface Route {
    name: string;
    path: string;
}

interface MinecraftServer {
    type: "java" | "bedrock";
    ip: string;
    name: string;
    description?: string;
}
