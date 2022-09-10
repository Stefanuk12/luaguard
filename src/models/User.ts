// Dependencies
import LuaGuardClient, { InternalAPIResponse } from "../index.js"
import Blacklist from "./Blacklist.js"
import Whitelist from "./Whitelist.js"

//
export type IKeyDetailsData = InternalAPIResponse<{
    discord_id: string
    discord_username: string
    discord_avatar: string | null
    created_on: string // should be a unix timestamp
    HWID_reset_counts: string // should be a number
    last_hwid_reset_date: string | null // should be a unix timestamp
    wl_key: string
    note: string
    HWID: string
    key_status: string
    wl_script_id: string
    scriptName: string
    expiration: string | null
    hours_remaining: string | null
    totalExecutions: number
    totalFailedAttempts: string // shold be a number
    lastExecuted: string | null // should be a unix timestamp
}>
export interface IKeyDetails {
    data: IKeyDetailsData
    dailyActivity: Array<unknown>
    logDetails: Array<unknown>
    scripts: Array<{
        wl_script_id: string
        script_name: string
    }>
    keyTags: string[]
}
// Class
export interface IUser {
    discord_id?: string
    wl_key?: string
}
export interface IUserWithClient extends IUser {
    Client: LuaGuardClient
}
interface User extends IUserWithClient { }
class User {
    // Constructor
    constructor(Data: IUserWithClient) {
        // Add the properties
        Object.assign(this, Data)
    }

    // Reset a user's HWID
    static async ResetHWID(Client: LuaGuardClient, Data: IUser) {
        return await Client.HttpClient.post("resetHWID.php", {
            json: Data
        })
    }
    async ResetHWID() {
        return await User.ResetHWID(this.Client, {
            discord_id: this.discord_id,
            wl_key: this.wl_key
        })
    }

    // Disable (essentially removes their whitelist)
    static async Disable(Client: LuaGuardClient, Data: IUser) {
        return Whitelist.remove(Client, Data)
    }
    async Disable() {
        return await User.Disable(this.Client, {
            discord_id: this.discord_id,
            wl_key: this.wl_key
        })
    }

    // Checks if a user is on cooldown
    static async Cooldown(Client: LuaGuardClient, Data: IUser) {
        return (await Client.HttpClient.post("isOnCooldown.php", {
            json: Data
        }).text()) == '"User is not on cooldown"'
    }
    async Cooldown() {
        return User.RemoveCooldown(this.Client, {
            discord_id: this.discord_id,
            wl_key: this.wl_key
        })
    }

    // Removes a user's cooldown
    static async RemoveCooldown(Client: LuaGuardClient, Data: IUser) {
        return (await Client.HttpClient.post("removeCooldown", {
            json: Data
        }))
    }
    async RemoveCooldown() {
        return User.RemoveCooldown(this.Client, {
            discord_id: this.discord_id,
            wl_key: this.wl_key
        })
    }

    // Blacklists a user
    static async Blacklist(Client: LuaGuardClient, Data: IUser) {
        return await Blacklist.add(Client, Data)
    }
    async Blacklist() {
        return User.Blacklist(this.Client, {
            discord_id: this.discord_id,
            wl_key: this.wl_key
        })
    }

    // Unblacklists a user
    static async Unblacklist(Client: LuaGuardClient, Data: IUser) {
        return await Blacklist.remove(Client, Data)
    }
    async Unblacklist() {
        return User.Unblacklist(this.Client, {
            discord_id: this.discord_id,
            wl_key: this.wl_key
        })
    }

    // Gets all of the data
    static async GetData(Client: LuaGuardClient, Data: IUser) {
        return <IKeyDetails>await Client.HttpClientInternal.post("getKeyDetails.php", {
            json: Data
        }).json()
    }

    // Adds a tag to the user
    static async AddTag(Client: LuaGuardClient, user: IUser, Tag: string) {
        //
        return await Client.HttpClient.post("add", {
            json: Object.assign(user, {
                tags: [Tag]
            })
        })
    }
}

// Export
export default User