<script setup lang="ts">
import type { AccountWithChecks } from "@/models/Account"
import { reactive } from "vue"

const props = defineProps<{
   item: AccountWithChecks
}>()

const emit = defineEmits(["updateItem"])

const model = reactive<AccountWithChecks>(props.item)
</script>

<template>
   <div class="d-flex gap">
      <v-text-field v-model="model.login" :error="model.errors.login" @blur="emit('updateItem', { item: model, keyName: 'login' })"></v-text-field>
      <v-text-field v-model="model.password" :error="model.errors.password" type="password" @blur="emit('updateItem', { item: model, keyName: 'password' })"></v-text-field>
   </div>
</template>
