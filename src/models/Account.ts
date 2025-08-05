export type AccountType = "Локальная" | "LDAP"
export type Labels = Label[]

export interface Label {
   text: string
}

export interface AccountErrors {
   labelText: boolean
   login: boolean
   password: boolean
}

interface AccountFieldLength {
   labelText: number
   login: number
   password: number
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
   validLength: AccountFieldLength
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
         validLength: this.createAccountFieldLength(),
      }
   }

   static createAccountErrors(required: boolean = true): AccountErrors {
      return {
         labelText: false,
         login: required,
         password: required,
      }
   }

   static createAccountFieldLength(): AccountFieldLength {
      return {
         labelText: 50,
         login: 100,
         password: 100,
      }
   }
}
