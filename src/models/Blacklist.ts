// Dependencies
import LuaGuardClient from "../index.js"
import { IUser } from "./User.js"

//
export interface IBlacklist {
    Client: LuaGuardClient
}
interface Blacklist extends IBlacklist {}
class Blacklist {
    // Constructor
    constructor(Data: IBlacklist) {
        // Add the properties
        Object.assign(this, Data)
    }

    // Blacklist a user
    static async add(Client: LuaGuardClient, Data: IUser) {
        return await Client.HttpClient.post("createBlacklist.php", {
            json: Data
        }).text()
    }
    async add(Data: IUser) {
        return await Blacklist.add(this.Client, Data)
    }

    // Unblacklist a user
    static async remove(Client: LuaGuardClient, Data: IUser) {
        return await Client.HttpClient.post("removeBlacklist.php", {
            json: Data
        }).text()
    }
    async remove(Data: IUser) {
        return await Blacklist.remove(this.Client, Data)
    }
}

// Export
export default Blacklist