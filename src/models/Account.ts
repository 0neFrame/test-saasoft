export type AccountType = "Локальная" | "LDAP"
export type Labels = Label[]

export interface Label {
   text: string
}

interface AccountErrors {
   labelText: boolean
   type: boolean
   login: boolean
   password: boolean
}

export interface AccountValid {
   item: AccountWithChecks
   keyName: keyof AccountErrors
   validLength?: number
}

export interface Account {
   labels: Labels
   type: AccountType
   login: string
   password: string | null
}

export interface AccountWithChecks extends Account {
   labelText: string
   errors: AccountErrors
}

export class AccountModel {
   static createAccount(): Account {
      return {
         labels: [],
         type: "Локальная",
         login: "",
         password: "",
      }
   }

   static createAccountWithChecks(): AccountWithChecks {
      return {
         ...this.createAccount(),
         errors: this.createAccountErrors(),
         labelText: "",
      }
   }

   static createAccountErrors(): AccountErrors {
      return {
         labelText: false,
         type: false,
         login: false,
         password: false,
      }
   }
}
