import type { Account } from "@/models/Account"
import { defineStore } from "pinia"

export const useAccountStore = defineStore("account", {
   state: () => ({
      accounts: JSON.parse(localStorage.getItem("accounts") || "[]") as Account[],
   }),
   actions: {
      addAccount(account: Account) {
         this.accounts.push(account)
         this.saveToLocalStorage()
      },
      saveAccount(id: number, account: Account) {
         this.accounts[id] = account
         this.saveToLocalStorage()
      },
      removeAccount(id: number) {
         this.accounts.splice(id, 1)
         this.saveToLocalStorage()
      },
      saveToLocalStorage() {
         localStorage.setItem("accounts", JSON.stringify(this.accounts))
      },
   },
})
