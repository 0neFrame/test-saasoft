<script setup lang="ts">
import type { AccountWithChecks } from "@/models/Account"
import { reactive } from "vue"

const props = defineProps<{
   item: AccountWithChecks
}>()

const emit = defineEmits(["updateItem"])

const model = reactive<AccountWithChecks>(props.item)
model.password = null
</script>

<template>
   <v-text-field v-model="model.login" :error="model.errors.login" @blur="emit('updateItem', { item: model, keyName: 'login' })"></v-text-field>
</template>
