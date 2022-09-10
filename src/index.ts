// Dependencies
import got, { Got } from "got"
import Blacklist from "./models/Blacklist.js"
import Script, { IScriptData } from "./models/Script.js"
import User from "./models/User.js"
import Whitelist from "./models/Whitelist.js"

//
export interface InternalAPIResponse<T> {
    data: T
}

//
export interface IIdentifier {
    discord_id?: string
    wl_key?: string
    HWID?: string
}

//
export interface ILog {
    executed_on: string
    type: string
    discord_id: string
    wl_key: string
    key_status: string
    assigned_HWID: string
    exec_HWID: string
    executor_fingerprint: string
    game_userid: string
    message: string
}

//
export interface IConfigurationDetails {
    token: string
    discord_id: string
    discord_username: string
    discord_discriminator: string
    discord_avatar: string
    created_on: string // should be a unix timestamp
    scriptsEnabled: string // should be a boolean
    cooldown_fail_attempts: string // should be a number
    cooldown_hours: string // should be a number
    synV2: string // should be a boolean
    synV3: string // should be a boolean
    scriptWare: string // should be a boolean
    krnl: string // should be a boolean
    fluxus: string // should be a boolean
    oxygenU: string // should be a boolean
    heartbeat: string // should be a boolean
    onetimekey: string // should be a boolean
    hwidreset: string // should be a boolean
    account_id: string
    account_status: "Active"
    plan_id: string
    plan_renewal_date: string // should be a unix timestamp
    discord_guild: string | null
    bot_role_id: string | null
    buyer_role_id: string | null
    webhook_url: string | null
    webhook_avatar_url: string | null
    webhook_username: string | null
    event_execution: string // should be a boolean
    event_failed_attempt: string // should be a boolean
    event_setting_change: string // should be a boolean
    webhook_enabled: string
    webhook_id: string
    botAccess: string // should be a boolean 
    apiAccess: string // should be a boolean
    plan_name: "Tier 1" | "Tier 2" | "Tier 3" | "Tier 4"
}

// Create a new client
export interface ILuaGuardClient {
    Token: string
}
interface LuaGuardClient extends ILuaGuardClient { }
class LuaGuardClient {
    // Vars
    HttpClient: Got
    HttpClientInternal: Got

    // Constructor
    constructor(Data: ILuaGuardClient) {
        // Add the properties
        Object.assign(this, Data)

        // Create the HTTP client
        this.HttpClient = got.extend({
            prefixUrl: "https://api.luawl.com/",
            headers: {
                "user-agent": "axios" // bruh ass anti bot
            }
        })
        this.HttpClientInternal = got.extend({
            prefixUrl: "https://api2.luawl.com/",
            headers: {
                "user-agent": "axios" // bruh ass anti bot
            }
        })
    }

    // Returns all of the scripts
    async GetScripts() {
        return <IScriptData[]>await this.HttpClient.post("getAccountScripts.php").json()
    }

    // Returns script logs
    async GetScriptLogs(Data: IIdentifier) {
        return <ILog[]>await this.HttpClient.post("getLogs.php").json()
    }

    // Grabs your configuration stuff (use this to get buyer role, etc - even though it has their own endpoint)
    async GrabConfiguration() {
        return <IConfigurationDetails>await got.post("https://api2.luawl.com/getConfigurationDetails.php", {
            headers: {
                "user-agent": "axios" // bruh ass anti bot
            },
        }).json()
    }

    // Set your configuration (not bothered to type this)
    async SetConfiguration(Data: any) {
        return await this.HttpClientInternal.post("getConfigurationDetails.php", {
            headers: {
                "user-agent": "axios" // bruh ass anti bot
            },
            json: Data
        }).json()
    }
}

// Export
export {Blacklist}
export {Script}
export {User}
export {Whitelist}
export default LuaGuardClient