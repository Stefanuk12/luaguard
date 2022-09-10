// Dependencies
import got from "got"
import LuaGuardClient, { InternalAPIResponse } from "../index.js"

//
export interface IScriptData {
    wl_script_id: string // should be a number but whatever
    script_name: string
    script_notes: string
    shoppy_link: string | null
    enabled: "1" | "0" // should be a bool but whatever
    created_on: string // should be unix but no
}

export type IWLScript = InternalAPIResponse<{
    wl_script_id: string // should be a number but whatever
    script_name: string
    scriptMode: string
    notif: string
    script_notes: string
    shoppy_link: string | null
    isUniversal: "1" | "0" // should be a bool but whatever
    enabled: "1" | "0" // should be a bool but whatever
    webhook_url: string | null
    scriptUID: string
    created_on: string // should be unix but no
    scriptExecutions: string // should be a number
    keysWhitelisted: string // should be a number but no
    onlineNow: string // should be a number but no
}>

//
export interface IScript {
    wl_script_id: string
    Client: LuaGuardClient
}
interface Script extends IScript {}
class Script {
    // Constructor
    constructor(Data: IScript) {
        // Add the IScript
        Object.assign(this, Data)
    }

    // Grabs every script
    static async GetAll(Client: LuaGuardClient) {
        return <IWLScript>await Client.HttpClientInternal.post("getWLScripts.php", {
            headers: {
                "user-agent": "axios"
            }
        }).json()
    }
}

// Export
export default Script