<template>
  <div>
      <div class="text-white">{{ docs }}</div>
      <div class="text-white">{{ route.params.id }}</div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import {db} from '../composables/fireConf'
import { useRoute } from 'vue-router'
export default defineComponent({
    setup() {
        const route: any = useRoute()

        return { route }
    },
    data() {
        return {
            docs: [] as any,
        }
    },
    mounted() {
        const getStock = async () => {
            const stocks = await db.collection("stocks").doc(this.route.params.id)
            stocks.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    this.docs = doc.data()
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
        getStock()
    }
})
</script>

<style>

</style>