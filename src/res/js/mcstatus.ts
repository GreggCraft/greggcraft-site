// simple library for interacting with mcstatus

interface JavaPlayer {
    uuid: string;
    name_raw: string;
    name_clean: string;
    name_html: string;
}

interface JavaAddon {
    name: string;
    version: string;
}

interface JavaServerStatus {
    online: boolean;
    host: string;
    port: number;
    ip_address?: string | null;
    eula_blocked: boolean;
    retrieved_at: number;
    expires_at: number;
    version?: {
        name_raw: string;
        name_clean: string;
        name_html: string;
        protocol: number;
    } | null;
    players?: {
        online: number;
        max: number;
        list: JavaPlayer[];
    };
    motd?: {
        raw: string;
        clean: string;
        html: string;
    };
    icon?: string | null;
    mods?: JavaAddon[];
    software?: string | null;
    plugins?: JavaAddon[];
    srv_record?: {
        host: string;
        port: number;
    }
}

interface BedrockServerStatus {
    online: boolean;
    host: string;
    port: number;
    ip_address: string | null;
    eula_blocked: boolean;
    recieved_at: number;
    expires_at: number;
    version?: {
        name: string;
        protocol: number;
    };
    players?: {
        online: number;
        max: number;
    };
    motd?: {
        raw: string;
        clean: string;
        html: string;
    };
    gamemode: string;
    server_id: string;
    edition: "MCPE" | "MCEE";
}

// Our own structure :>
interface UniversalServerStatus {
    online: boolean;
    players?: {
        online: number;
        max: number;
    };
    version: {
        name: string;
        protocol: number;
    };
}

export const API_HOST = "https://api.mcstatus.io/v2";
export const apiFetch: typeof fetch = async (input, options) => fetch(API_HOST + input, options);
export async function queryServer(server: Omit<MinecraftServer, "name">): Promise<UniversalServerStatus> {
    const remoteStatus: JavaServerStatus & BedrockServerStatus = await (await apiFetch(`/status/${server.type}/${server.ip}`)).json();
    const status: any = {
        online: remoteStatus.online,
    };

    if (remoteStatus.players) status.players = {
        online: remoteStatus.players?.online,
        max: remoteStatus.players?.max,
    };

    if (remoteStatus.version) status.version = {
        name: remoteStatus.version.name_clean ?? remoteStatus.version.name,
        protocol: remoteStatus.version.protocol,
    };

    return status;
};
