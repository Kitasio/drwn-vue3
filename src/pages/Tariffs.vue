<template>
    <stock-nav></stock-nav>    
    <div class="md:h-screen font-ttnorms p-5 sm:p-10 lg:px-32 mx-auto">
        <div class="grid grid-cols-12 h-5/6">
            <stock-links class="hidden sm:inline"></stock-links>
            <div class="col-span-12 lg:col-span-10 pb-10">
                <div id="box" class=" shadow-brand rounded-md px-5 md:px-10 py-5 flex flex-col justify-between md:flex-row">
                    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full">

                        <div :class="{'filter grayscale opacity-30 hover:opacity-100 hover:grayscale-0 cursor-pointer': dbUser.subscriber}" class="shadow-brand transition duration-500 grad-pink flex flex-col justify-between p-5 rounded-xl h-full w-full text-white">
                            <div>
                                <h1 class="text-3xl font-benzin-bold">Тариф<br> “Старт”</h1>
                                <div class="mt-5 space-y-2">
                                    <div v-for="(i, index) in tariffStart" :key="index" class="flex space-x-4 items-center">
                                        <svg width="12" height="9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.189 8.925L.075 4.831a.254.254 0 010-.36L1.113 3.43c.1-.1.26-.1.36 0L4.18 6.125c.1.099.261.098.36-.002L10.525.076c.099-.101.26-.101.36-.002l1.04 1.041c.1.1.1.26.002.36l-6.52 6.584.001.001-.86.865c-.099.1-.26.1-.36 0z" fill="#fff"/></svg>
                                        <p class="text-sm">{{i.text}}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-if="!dbUser.subscriber" class="text-center text-lg mt-5">Выбран</div>
                        </div>

                        <div @click="pay()" :class="{'filter grayscale opacity-30 hover:opacity-100 hover:grayscale-0 cursor-pointer': !dbUser.subscriber}" class="shadow-brand transition duration-500 grad flex flex-col justify-between p-5 rounded-xl h-full w-full text-white">
                            <div>
                                <h1 class="text-3xl font-benzin-bold">Тариф<br> “Трейдер”</h1>
                                <div class="mt-5 space-y-2">
                                    <div v-for="(i, index) in tariffStart" :key="index" class="flex space-x-4 items-center">
                                        <svg width="12" height="9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.189 8.925L.075 4.831a.254.254 0 010-.36L1.113 3.43c.1-.1.26-.1.36 0L4.18 6.125c.1.099.261.098.36-.002L10.525.076c.099-.101.26-.101.36-.002l1.04 1.041c.1.1.1.26.002.36l-6.52 6.584.001.001-.86.865c-.099.1-.26.1-.36 0z" fill="#fff"/></svg>
                                        <p class="text-sm">{{i.text}}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-if="dbUser.subscriber" class="text-center text-lg mt-5">Выбран</div>
                        </div>

                        <div :class="{'filter grayscale opacity-30 hover:opacity-100 hover:grayscale-0 cursor-pointer': !dbUser.premium}" class="shadow-brand transition duration-500 grad-black flex flex-col justify-between p-5 rounded-xl h-full w-full text-white">
                            <div>
                                <h1 class="text-3xl font-benzin-bold">Тариф<br> “Премиум”</h1>
                                <div class="mt-5 space-y-2">
                                    <div v-for="(i, index) in tariffStart" :key="index" class="flex space-x-4 items-center">
                                        <svg width="12" height="9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.189 8.925L.075 4.831a.254.254 0 010-.36L1.113 3.43c.1-.1.26-.1.36 0L4.18 6.125c.1.099.261.098.36-.002L10.525.076c.099-.101.26-.101.36-.002l1.04 1.041c.1.1.1.26.002.36l-6.52 6.584.001.001-.86.865c-.099.1-.26.1-.36 0z" fill="#fff"/></svg>
                                        <p class="text-sm">{{i.text}}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-if="dbUser.premium" class="text-center text-lg mt-5">Выбран</div>
                        </div>
                    </div>
                </div>
                <!-- {{dbUser.subscriptionUpdated}} -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import StockNav from '../components/StockNav.vue'
import StockLinks from '../components/StockLinks.vue'
import authFuncs from '../composables/authFuncs'
import { auth, db, ts } from '../composables/fireConf'

export default defineComponent({
    components: {
        StockNav,
        StockLinks,
    },
    setup() {
        const { getUser, dbUser, user } = authFuncs()
        getUser()

        const tariffStart = ref([
            { text: 'Собственный домен' },
            { text: 'Однократная оплата за размещение' },
            { text: 'Неограниченное серврерное пространство' },
            { text: 'Ежедневное резервное копирование' },
            { text: 'Доступ к базе пользователей' },
            { text: 'Внутренняя служба поддержки' },
        ])

        const pay = () => {
            var widget = new cp.CloudPayments();
            var receipt = {
                Items: [//товарные позиции
                    {
                        label: 'Ежемесячная подписка на drwn.biz, тарифф "Трейдер"', //наименование товара
                        price: 490.00, //цена
                        quantity: 1.00, //количество
                        amount: 490.00, //сумма
                        vat: 0, //ставка НДС
                        method: 0, // тег-1214 признак способа расчета - признак способа расчета
                        object: 0, // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
                    }
                ],
                taxationSystem: 0, //система налогообложения; необязательный, если у вас одна система налогообложения
                email: user.value.email, //e-mail покупателя, если нужно отправить письмо с чеком
                phone: '', //телефон покупателя в любом формате, если нужно отправить сообщение со ссылкой на чек
                isBso: false, //чек является бланком строгой отчетности
                amounts:
                {
                    electronic: 490.00, // Сумма оплаты электронными деньгами
                    advancePayment: 0.00, // Сумма из предоплаты (зачетом аванса) (2 знака после запятой)
                    credit: 0.00, // Сумма постоплатой(в кредит) (2 знака после запятой)
                    provision: 0.00 // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после запятой)
                }
            };
            var data = {};
            data.CloudPayments = {
                CustomerReceipt: receipt, //чек для первого платежа
                recurrent: {
                interval: 'Month',
                period: 1, 
                customerReceipt: receipt //чек для регулярных платежей
                }
                }; //создание ежемесячной подписки

            widget.charge({ // options
                publicId: 'pk_4025d91550552c61948655bdaab18', //id из личного кабинета
                description: 'Подписка на ежемесячный доступ к сайту drwn.biz', //назначение
                amount: 1, //сумма
                currency: 'RUB', //валюта
                // invoiceId: '1234567', //номер заказа  (необязательно)
                accountId: user.value.email, //идентификатор плательщика (обязательно для создания подписки)
                skin: "mini",
                data: data
            },
            function (options: any) { // success
                //действие при успешной оплате
                console.log('success payment!!, options: ', options)
                auth.onAuthStateChanged(user => {
                    if (user) {
                        db.collection('users').doc(user.uid).update({
                            subscriber: true,
                            subscriptionUpdated: new Date(),
                        })
                    }
                })
            },
            function (reason: any, options: any) { // fail
                //действие при неуспешной оплате
                console.log('failed payment, reason: ', reason)
            });
        }

        return {
            tariffStart,
            dbUser,
            user,
            pay,
        }
    },
})
</script>
