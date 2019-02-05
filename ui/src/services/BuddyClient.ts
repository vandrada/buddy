import axios, { AxiosInstance } from 'axios'

export enum BuddyEndpoint {
    Inventory = "inventory"
}

export class BuddyClient {
    ax: AxiosInstance
    base: string

    constructor(base?: string) {
        this.base = base || 'http://localhost:5000'
        this.ax = axios.create()
    }

    private paramsFor(params: any) {
        let urlParams = ""
        for (const key in params) {
            if (urlParams != "") {
                urlParams += "&"
            }
            if (params[key] != undefined) {
                urlParams += `${key}=${encodeURIComponent(params[key])}`
            }
        }
        return urlParams
    }

    private endpointFor(endpoint: any): string {
        return `${this.base}/${endpoint}`
    }

    getInventory = async (params?: any) => {
        const base = this.endpointFor(BuddyEndpoint.Inventory)
        const url = params ? `${base}?${this.paramsFor(params)}` : base
        return await this.ax.get(url)
    }
}
