<script setup>
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('');
// 编辑器配置
const editorConfig = {
    placeholder: '请输入内容...',
    scroll:false
}

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
</script>

<template>
    <div>
        <!-- 编辑器 -->
        <Editor
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            @onCreated="handleCreated"
        />
    </div>
</template>

<!-- 别忘了引入样式 -->
<style> 
</style>