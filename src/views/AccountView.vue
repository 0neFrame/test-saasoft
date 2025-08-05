<script setup lang="ts">
import { reactive } from "vue"
import { useAccountStore } from "@/stores/account"
import { AccountModel, type Account, type AccountWithChecks, type Labels } from "@/models/Account"

import TableAccountList from "@/components/TableAccountList.vue"

const accountList = reactive<AccountWithChecks[]>(
   useAccountStore().accounts.map((item: Account) => {
      if (item) {
         return { ...item, errors: AccountModel.createAccountErrors(false), labelText: stringifyLabels(item.labels), validLength: AccountModel.createAccountFieldLength() }
      }
   }) as AccountWithChecks[]
)
function addItem() {
   if (accountList.some((acc) => Object.values(acc.errors).some((err) => err))) return

   accountList.push(AccountModel.createAccountWithChecks())
   useAccountStore().addAccount(AccountModel.createAccount())
}
function stringifyLabels(list: Labels): string {
   return list.length ? list.map((label) => label.text).join("; ") : ""
}
</script>

<template>
   <div class="d-flex gap align-center">
      <h1>Учетные записи</h1>
      <v-btn icon="mdi-plus" @click="addItem"></v-btn>
   </div>

   <v-alert text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;" type="warning"></v-alert>

   <TableAccountList v-model="accountList"></TableAccountList>
</template>

<style scoped>
.table {
   display: table;
   width: 100%;
   box-sizing: border-box;
   border-collapse: collapse;
   empty-cells: show;
}
.table-caption {
   display: table-caption;
   padding: 10px;
   color: #333;
   font-size: 16px;
   text-align: center;
}
.table-colgroup {
   display: table-column-group;
}
.table-col {
   display: table-column;
}
.table-thead {
   display: table-header-group;
}
.table-tbody {
   display: table-row-group;
}
.table-tfoot {
   display: table-footer-group;
}
.table-tr {
   display: table-row;
}
.table-th {
   display: table-cell;
   padding: 10px;
   text-align: left;
}
.table-td {
   display: table-cell;
   padding: 10px;
}
.table-td.icon {
   align-content: center;
}

.table-th.table-th__multi > div {
   width: 50%;
}
</style>
