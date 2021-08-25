<template>
  <div class="text-white" @click="openModal">
    <slot></slot>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block grad text-white w-full max-w-xl p-5 lg:p-20 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="text-lg md:text-2xl text-white leading-6 font-benzin-semibold"
              >
                Оформите бесплатную<br> подписку на {{$props.ticker}}
              </DialogTitle>
              
              <form @submit.prevent="closeModal(2000); subscribe();">
                <input v-model="sub.email" placeholder="Введите Email" type="email" class="border-2 mt-5 text-sm placeholder-base-green font-benzin-semibold text-base-green border-base-green bg-transparent rounded-md focus:ring-0 focus:border-base-green">
                <div class="mt-4">
                  <button
                    type="submit"
                    class="inline-flex justify-center px-4 py-2 text-sm font-benzin-semibold border-2 border-gray-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  >
                    Оформить
                  </button>
                </div>
              </form>
              <div class="mt-2 font-ttnorms">
                {{subMessage}}
              </div>

              
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, watchEffect } from 'vue'
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue'
import subFuncs from '../composables/subFuncs'

export default defineComponent({
    components: {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogOverlay,
        DialogTitle, 
    },
    props: {
        modelValue: {
            type: [String, Number],
        },
        ticker: {
            type: String,
        }
    },
    setup(props) {
      const isOpen = ref(false)
      let storedEmail = localStorage.getItem('email')
      const { addSub, sub } = subFuncs()
      const subMessage = ref('')

      const subscribe = () => {
        setTimeout(() => {
          subMessage.value = `Вы подписались на ${sub.value.ticker}`
        }, 200);
        setTimeout(() => {
          subMessage.value = ''
        }, 2000);
      }


      watchEffect(() => {
        sub.value.email = storedEmail
      })

      return {
        sub,
        subMessage,
        subscribe,
        addSub,
        storedEmail,
        isOpen,
        closeModal(t) {
          if (sub.value.email != storedEmail) {
            localStorage.setItem('email', sub.value.email)
          }
          sub.value.ticker = props.ticker
          addSub()
          setTimeout(() => {
            isOpen.value = false
          }, t);
        },
        openModal() {
          isOpen.value = true
        },
      } 
    },
})
</script>

<style>
.grad {
    background: linear-gradient(78.15deg, #2A063F 0%, #6E00AD 19.79%, #440E60 47.95%, #2A063F 100%);
}
</style>