<template>
<div>
    <span class="tooltip text-white"><slot></slot></span>
    <router-link to="/tariffs">
        <svg width="21" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.598 1.854c.599-1.843 3.205-1.843 3.804 0l.904 2.783A2 2 0 0015.21 6.02h2.926c1.937 0 2.743 2.48 1.175 3.618l-2.367 1.72a2 2 0 00-.727 2.237l.905 2.783c.599 1.842-1.51 3.375-3.078 2.236l-2.367-1.72a2 2 0 00-2.352 0l-2.367 1.72c-1.568 1.139-3.676-.394-3.078-2.236l.905-2.783a2 2 0 00-.727-2.237l-2.368-1.72C.122 8.498.928 6.02 2.865 6.02h2.926a2 2 0 001.903-1.382l.904-2.783z" fill="#FBBC05"/></svg>
    </router-link>  
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>
