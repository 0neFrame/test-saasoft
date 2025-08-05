<script setup lang="ts">
import { useAccountStore } from "@/stores/account"
import { type AccountErrors, type AccountWithChecks } from "@/models/Account"

import InputTypeLocale from "@/components/InputTypeLocale.vue"
import InputTypeLDAP from "@/components/InputTypeLDAP.vue"
import { ref, toValue } from "vue"

const inputTypeList = {
   Локальная: InputTypeLocale,
   LDAP: InputTypeLDAP,
}

const accountList = defineModel<AccountWithChecks[]>({ required: true })

function checkValidation(item: AccountWithChecks): AccountErrors {
   type AccountErrorsKeys = keyof AccountErrors

   const itemErrors = ref<AccountErrors>({ labelText: false, login: false, password: false })
   const nameErrors = Object.keys(item.errors) as AccountErrorsKeys[]

   nameErrors.forEach((errKey) => {
      const value = item[errKey]

      const isKeyPass = errKey === "password"
      const isKeyLoginOrPass = errKey === "login" || isKeyPass
      const isStringValue = typeof value === "string"
      const isTypeLocal = item.type === "Локальная"

      const invalidLength = isStringValue && value.length > item.validLength[errKey]

      if (isKeyLoginOrPass && isStringValue) {
         itemErrors.value[errKey] = !value.length || invalidLength
      } else if (isTypeLocal && isKeyPass) {
         itemErrors.value[errKey] = value === null || invalidLength
      } else {
         itemErrors.value[errKey] = invalidLength
      }
   })

   return toValue(itemErrors)
}
function parseLabels(item: AccountWithChecks) {
   if (!item.labelText.trim()) {
      item.labels = []
      return
   }

   item.labels = item.labelText
      .split(";")
      .map((label) => label.trim())
      .filter((label) => label !== "")
      .map((label) => ({ text: label }))
}
function deleteItem(id: number) {
   accountList.value.splice(id, 1)
   useAccountStore().removeAccount(id)
}
function updateItem(id: number, item: AccountWithChecks) {
   item.errors = checkValidation(item)

   if (Object.values(item.errors).every((check) => !check)) {
      const { labels, type, login, password } = item
      const accountData = { labels, type, login, password }
      useAccountStore().saveAccount(id, accountData)
   }
}
</script>

<template>
   <div class="table">
      <div class="table-colgroup">
         <div class="table-col" style="width: 20%"></div>
         <div class="table-col" style="width: 15%"></div>
         <div class="table-col" style="width: 60%"></div>
         <div class="table-col" style="width: 5%"></div>
      </div>

      <div class="table-thead">
         <div class="table-tr">
            <div class="table-th">Метки</div>
            <div class="table-th">Тип записи</div>
            <div class="table-th table-th__multi d-flex gap">
               <div>Логин</div>
               <div>Пароль</div>
            </div>
         </div>
      </div>

      <div class="table-tbody">
         <div v-for="(item, itemKey) in accountList" :key="itemKey" class="table-tr">
            <div v-if="item" class="table-th">
               <v-text-field v-model:model-value="item.labelText" :error="item.errors.labelText" @update:model-value="parseLabels(item)" @blur="updateItem(itemKey, item)"></v-text-field>
            </div>

            <div v-if="item" class="table-td">
               <v-select v-model="item.type" :items="['Локальная', 'LDAP']" @update:modelValue="updateItem(itemKey, item)"></v-select>
            </div>

            <div v-if="item" class="table-td">
               <component :is="inputTypeList[item.type]" :item="item" @updateItem="updateItem(itemKey, $event)"></component>
            </div>

            <div class="table-td icon"><v-btn icon="mdi-delete" variant="text" @click="deleteItem(itemKey)"></v-btn></div>
         </div>
      </div>
   </div>
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
