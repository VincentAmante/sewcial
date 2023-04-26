
<script setup lang="ts">
import { useEditor, EditorContent, JSONContent } from '@tiptap/vue-3'
import { StarterKit } from '@tiptap/starter-kit'
import { Paragraph } from '@tiptap/extension-paragraph'
import { OrderedList } from '@tiptap/extension-ordered-list'
import TipTapButton from './TipTapButton.vue'

defineProps<{
  modelValue: JSONContent
}>()

const emit = defineEmits(['update:modelValue'])
const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit
  ],
  editorProps: {
    attributes: {
      class: 'prose max-w-none px-2 py-1'
    }
  },
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getJSON())
  }
})
</script>

<template>
  <div class="py-2 mx-4 bg-white rounded-md flex flex-col gap-2 border-solid border-[1px] border-dark max-w-lg my-2">
    <div
      v-if="editor"
      class="text-sm flex flex-row border-b-[1px] border-solid border-dark px-2 flex-wrap gap-1 pb-2"
    >
      <div class="border-solid border-[1px] p-1 rounded-md border-dark">
        <TipTapButton
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :is-active="editor?.isActive('bold')"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <span class="font-bold">B</span>
        </TipTapButton>
        <TipTapButton
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :is-active="editor?.isActive('italic')"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <span class="italic font-normal">i</span>
        </TipTapButton>
        <TipTapButton
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :is-active="editor?.isActive('strike')"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <span class=" line-through">s</span>
        </TipTapButton>
        <TipTapButton
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :is-active="editor?.isActive('code')"
          @click="editor.chain().focus().toggleCode().run()"
        >
          <code>code</code>
        </TipTapButton>
        <TipTapButton
          @click="editor.chain().focus().unsetAllMarks().run()"
        >
          clear marks
        </TipTapButton>
        <TipTapButton
          @click="editor.chain().focus().clearNodes().run()"
        >
          clear nodes
        </TipTapButton>
      </div>
      <div class="border-solid border-[1px] p-1 rounded-md border-dark">
        <TipTapButton
          :is-active="editor?.isActive('paragraph')"
          @click="editor.chain().focus().setParagraph().run()"
        >
          P
        </TipTapButton>
        <TipTapButton
          :is-active="editor.isActive('heading', { level: 1 })"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          h1
        </TipTapButton>
        <TipTapButton
          :is-active="editor.isActive('heading', { level: 2 })"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          h2
        </TipTapButton>
        <TipTapButton

          :is-active="editor.isActive('heading', { level: 3 })"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          h3
        </TipTapButton>
        <TipTapButton

          :is-active="editor.isActive('heading', { level: 4 })"
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        >
          h4
        </TipTapButton>
        <TipTapButton

          :is-active="editor.isActive('heading', { level: 5 })"
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        >
          h5
        </TipTapButton>
        <TipTapButton
          :is-active="editor.isActive('heading', { level: 6 })"
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        >
          h6
        </TipTapButton>
      </div>
      <div class="border-solid border-[1px] p-1 rounded-md border-dark">
        <TipTapButton
          :class="{ 'is-active': editor.isActive('bulletList') }"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          bullet list
        </TipTapButton>
        <TipTapButton
          :class="{ 'is-active': editor.isActive('orderedList') }"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          ordered list
        </TipTapButton>
        <TipTapButton
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        >
          code block
        </TipTapButton>
        <TipTapButton
          :class="{ 'is-active': editor.isActive('blockquote') }"
          @click="editor.chain().focus().toggleBlockquote().run()"
        >
          blockquote
        </TipTapButton>
      </div>
      <div class="border-solid border-[1px] p-1 rounded-md border-dark">
        <TipTapButton
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          horizontal rule
        </TipTapButton>
        <TipTapButton
          @click="editor.chain().focus().setHardBreak().run()"
        >
          hard break
        </TipTapButton>
        <TipTapButton
          :disabled="!editor.can().chain().focus().undo().run()"
          @click="editor.chain().focus().undo().run()"
        >
          undo
        </TipTapButton>
        <TipTapButton
          :disabled="!editor.can().chain().focus().redo().run()"
          @click="editor.chain().focus().redo().run()"
        >
          redo
        </TipTapButton>
      </div>
    </div>
    <editor-content
      v-model="editor"
      :editor="editor"
      class="bg-white p-1 h-full"
    />
  </div>
</template>
