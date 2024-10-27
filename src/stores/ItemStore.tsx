import { makeAutoObservable } from "mobx";
import axios from "axios";
import { Item } from "../types/Item";

class ItemStore {
    items: Item[] = [];
    isLoading: boolean = false;
    currentPage: number = 1;
    totalCount: number = 0;  

    constructor() {
        makeAutoObservable(this);
    }

     async fetchItems() {
        if (this.isLoading) return;  

        this.isLoading = true;
        try {
            const response = await axios.get(`https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${this.currentPage}`);
            this.items.push(...response.data.items); 
            this.totalCount = response.data.total_count;  
            this.currentPage++; 
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            this.isLoading = false;
        }
    }

     removeItem(id: number) {
        this.items = this.items.filter(item => item.id !== id);
    }

     editItem(id: number, updatedItem: Partial<Item>) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items[index] = { ...this.items[index], ...updatedItem };
        }
    }

     hasMoreItems() {
        return this.items.length < this.totalCount;  
    }
}

export const itemStore = new ItemStore();
