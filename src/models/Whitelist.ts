// Dependencies
import LuaGuardClient from "../index.js"
import { IUser } from "./User.js"

//
export interface IWhitelistAdd {
    discord_id: string
    trial_hours?: number // 1 or 0. wtf just use a boolean?
    wl_script_id?: number
}

export interface IWhitelist {
    Client: LuaGuardClient
}
interface Whitelist extends IWhitelist {}
class Whitelist {
    // Constructor
    constructor(Data: IWhitelist) {
        // Add the properties
        Object.assign(this, Data)
    }

    // Whitelist a user
    static async add(Client: LuaGuardClient, Data: IWhitelistAdd) {
        return await Client.HttpClient.post("whitelistUser.php", {
            json: Data
        }).text()
    }
    async add(Data: IWhitelistAdd) {
        return await Whitelist.add(this.Client, Data)
    }

    // Unwhitelist a user
    static async remove(Client: LuaGuardClient, Data: IUser) {
        return await Client.HttpClient.post("deleteKey.php", {
            json: Data
        }).text()
    }
    async remove(Data: IUser) {
        return await Whitelist.remove(this.Client, Data)
    }
}

// Export
export default Whitelist