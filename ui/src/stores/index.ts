import { observable, action } from 'mobx'

import { BuddyClient } from '../services/BuddyClient'

export enum Department {
    Grocery = "Grocery",
    Produce = "Produce",
    Pharmacy = "Pharmacy",
}

export enum Unit {
    Pound = "lb",
    Each = "Each",
}

export interface Product {
    cost: number,
    department: string,
    description: string,
    last_sold: string,
    price: number,
    product_id: number,
    shelf_life: number,
    unit: string,
    x_for: number,

}

export class BuddyStore {
    client = new BuddyClient();

    @observable
    inventory: Product[] = [];

    @action
    getInventory(params?: any) {
        this.client.getInventory(params).then(
            inventory => {
                this.inventory = inventory.data
            }
        )
    }
}

const buddyStore = new BuddyStore()
export const stores = {
    buddyStore,
}

export default stores
