<script setup lang="ts">
import type { Workshop } from '@prisma/client'
import { JSONContent, generateHTML } from '@tiptap/vue-3'
import RichTextEditor from '~/components/FormFields/RichTextEditor.vue'
import { Skill } from '~/enums/Skill'

definePageMeta({
  layout: 'admin'
})
const detailsContent: JSONContent = ref({ type: 'doc', content: [] })
const workshop: Ref<Workshop> = ref({
  title: '',
  details: detailsContent.value,
  startTime: new Date(),
  endTime: new Date(),
  skill: Skill.beginner,
  totalSlots: 10,
  priceAED: 0
})

const skillOptions = computed(() => {
  const skillArr = Object.keys(Skill).map((key: any) => Skill[key])

  return skillArr.map(skill => ({
    label: skill,
    value: (skill as Skill)
  }))
})

async function submitForm () {
  workshop.value.startTime = new Date(workshop.value.startTime)
  workshop.value.endTime = new Date(workshop.value.endTime)

  const res = await fetch('/api/Workshops/create', {
    method: 'POST',
    body: JSON.stringify(workshop.value)
  })
}
</script>

<template>
  <NForm>
    {{ workshop }}
    <NFormItem label="Title">
      <NInput v-model:value="workshop.title" />
    </NFormItem>

    {{ workshop.startTime }}
    <RichTextEditor v-model="workshop.details" />
    <NSpace>
      <NFormItem label="Start">
        <NDatePicker v-model:value="workshop.startTime" type="datetime" />
      </NFormItem>
      <NFormItem label="End">
        <NDatePicker v-model:value="workshop.endTime" type="datetime" />
      </NFormItem>
    </NSpace>

    <NFormItem label="Skill Level">
      <NSelect v-model:value="workshop.skill" :options="skillOptions" />
    </NFormItem>
    <NFormItem label="Price">
      <NInputNumber v-model:value="workshop.priceAED" />
    </NFormItem>
    <NFormItem label="Max People">
      <NInputNumber v-model:value="workshop.totalSlots" />
    </NFormItem>
  </NForm>
  <NButton @click="() => submitForm()">
    Submit
  </NButton>
</template>
