<template>
	<stock-nav></stock-nav>

    <div class="font-ttnorms p-5 sm:p-10 lg:px-32 mx-auto">
		<div class="grid grid-cols-12">
			<stock-links class="hidden md:flex"></stock-links>
			<div id="box" class="col-span-12 lg:col-span-10 md:shadow-brand rounded-md md:p-7">   
                <div class="">
                    <Listbox v-if="selectedStock" v-model="selectedStock">
                        <ListboxButton class="py-2 px-3 border-2 border-light-purple rounded-md">
                            <div class="flex space-x-2 items-center">
                                <img class="w-8" :src="selectedStock.logo" alt="">
                                <div class="font-benzin-semibold">#{{ selectedStock.ticker }}</div>
                                <img class="w-3" src="/img/icons/arrowDown.svg" alt="">
                            </div>
                        </ListboxButton>
                        <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-out"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                        >
                            <ListboxOptions class="absolute mt-2 z-10 bg-white w-40 py-2 px-3 border-2 border-light-purple rounded-md">
                                <ListboxOption
                                    v-for="stock in stocks"
                                    :key="stock"
                                    :value="stock"
                                >
                                    <div v-if="stock != selectedStock" class="flex py-2 space-x-2 items-center cursor-pointer border-b border-light-purple">
                                        <img class="w-8" :src="stock.logo" alt="">
                                        <div class="font-benzin-semibold">#{{ stock.ticker }}</div>
                                    </div>
                                </ListboxOption>
                            </ListboxOptions>
                        </transition>
                    </Listbox>
                </div>
                
                <div class="hidden md:block">
                    <tabs v-if="selectedStock" v-model="activeTab" :selectedStock="selectedStock.id" class="">
                        <tab title="График">
                            <h1 class="font-benzin-bold text-xl my-5">Сценарии</h1> 
                            <div @click="s.show = !s.show" class="border-b py-3" v-for="(s, index) in selectedStock.scenarios" :key="index">
                                <div class="flex justify-between">
                                    <div class="flex space-x-2 cursor-pointer">
                                        <img v-if="!s.show" class="w-4" src="../assets/icons/chevron-right.svg" alt="">
                                        <img v-else class="w-4" src="../assets/icons/chevron-down.svg" alt="">
                                        <div>{{s.name}}</div>
                                    </div>
                                    <div class="flex space-x-2 items-center">
                                        <div>{{s.probability}}</div>
                                        <div class="w-4 h-4 rounded-full" :style="`background-color: ${s.color}`"></div>
                                    </div>
                                </div>

                                <div v-if="s.show">
                                    <div class="mt-2">
                                        <h1 class="font-semibold">Описание</h1>
                                        <div class="mt-1">{{s.description}}</div>
                                    </div>

                                    <div class="mt-2">
                                        <h1 class="font-semibold">Проект решения</h1>
                                        <div class="mt-1">{{s.project}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="h-96 2xl:h-130">
                                <div v-if="width > 600" id="tv" class="w-full h-full"></div>
                            </div>
                        </tab>
                        <tab title="Фон">
                            <h1 class="font-benzin-bold text-xl my-5">События и фон</h1>
                            <div class="mt-10">
                                <header class="grid grid-cols-12 py-3 border-b border-t border-black">
                                    <h1 class="col-span-8">Новость</h1>
                                    <h1 class="col-span-2">Тип</h1>
                                    <h1 class="col-span-2">Потенциал роста</h1>
                                </header>
                                <main v-for="(i, index) in selectedStock.news" :key="index" class="grid grid-cols-12 py-3 border-b border-black">
                                    <p class="col-span-8">{{ i.text }}</p>
                                    <p class="col-span-2">{{ i.type }}</p>
                                    <p class="col-span-2">{{ i.potential }}</p>
                                </main>
                            </div>
                        </tab>
                        <tab title="Фундаментальные показатели">
                            <h1 class="font-benzin-bold text-xl my-5">Фундаментальные показатели</h1>
                            <table class="table-fixed w-full">
                                <thead>
                                    <tr>
                                        <th class="w-1/3 text-left">Наименование</th>
                                        <th class="w-1/3 text-left">Показатель</th>
                                        <th class="w-1/3 text-left">Отличие от сектора</th>
                                        <th class="w-1/3 text-left">Комментарий</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <tr class="w-full border-b">
                                        <td class="py-3 has-tooltip">Цена к прибыли'2024<span class="tooltip text-white">Цена к ожидаемой в 2024 году прибыли</span></td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.fwd.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.fwd.text }}</div>
                                        </td>
                                        <td>{{selectedStock.fwd.sectorDiff}}</td>
                                        <td>{{ selectedStock.fwd.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3 has-tooltip">Долг/капитал <span class="tooltip text-white">Отношение долга к собственному капиталу</span></td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.debtEquity.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.debtEquity.text }}</div>
                                        </td>
                                        <td>{{selectedStock.debtEquity.sectorDiff}}</td>
                                        <td>{{ selectedStock.debtEquity.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3 has-tooltip">Текущая ликвидность <span class="tooltip text-white">Коэффициент текущей ликвидности: покрытие текущих (до года) обязательств текущими активами</span></td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.currentRatio.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.currentRatio.text }}</div>
                                        </td>
                                        <td>{{selectedStock.currentRatio.sectorDiff}}</td>
                                        <td>{{ selectedStock.currentRatio.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3 has-tooltip">Цель опционов<span class="tooltip text-white">Поведение опционов - на какой цене самые крупные ставки</span></td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.openInterest.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.openInterest.text }}</div>
                                        </td>
                                        <td>{{selectedStock.openInterest.sectorDiff}}</td>
                                        <td>{{ selectedStock.openInterest.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3 has-tooltip">Цель аналитиков<span class="tooltip text-white">Рейтинги аналитиков</span></td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.analysts.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.analysts.text }}</div>
                                        </td>
                                        <td>{{selectedStock.analysts.sectorDiff}}</td>
                                        <td>{{ selectedStock.analysts.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3 has-tooltip">Шорт-позиции<span class="tooltip text-white">Доля акций, которые находятся в короткой (ставка на падение) позиции</span></td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.shortFloat.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.shortFloat.text }}</div>
                                        </td>
                                        <td>{{selectedStock.shortFloat.sectorDiff}}</td>
                                        <td>{{ selectedStock.shortFloat.comment }}</td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </tab>
                        <tab title="Технический анализ">
                            <h1 class="font-benzin-bold text-xl my-5">Технический анализ</h1>
                            <header class="grid grid-cols-3 py-3 border-b border-black font-benzin-semibold">
                                <h1>Индикаторы</h1>
                                <h1>Показатель</h1>
                                <h1>Отличие от сектора</h1>
                            </header>
                            <main class="grid grid-cols-3 py-3 border-b border-black">
                                <div class="has-tooltip">Целевые уровни<span class="tooltip text-white">Исторические уровни, на которых цена находила поддержку/сопротивление</span></div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <div :style="`background-color: ${selectedStock.levels.color}`" class="w-4 h-4 rounded-full"></div>
                                    <div>{{ selectedStock.levels.text }}</div>
                                </div>
                                <div>{{ selectedStock.levels.sectorDiff }}</div>
                            </main>
                            <main class="grid grid-cols-3 py-3 border-b border-black">
                                <div class="has-tooltip">Уровни Фибоначчи<span class="tooltip text-white">Уровень, рассчитанный по ряду Фибоначчи, который выступает поддержкой или сопротивлением. Хорошо указывает глубину отката и динамику импульса продолжения роста</span></div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <div :style="`background-color: ${selectedStock.fibo.color}`" class="w-4 h-4 rounded-full"></div>
                                    <div>{{ selectedStock.fibo.text }}</div>
                                </div>
                                <div>{{ selectedStock.fibo.sectorDiff }}</div>
                            </main>
                            <main class="grid grid-cols-3 py-3 border-b border-black">
                                <div class="has-tooltip">Перекупленность<span class="tooltip text-white">Показатели перекупленности/перепроданности по осциллятору Stochastic</span></div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <div :style="`background-color: ${selectedStock.stoch.color}`" class="w-4 h-4 rounded-full"></div>
                                    <div>{{ selectedStock.stoch.text }}</div>
                                </div>
                                <div>{{ selectedStock.stoch.sectorDiff }}</div>
                            </main>
                            <main class="grid grid-cols-3 py-3 border-b border-black">
                                <div class="has-tooltip">Свечной паттерн</div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <div :style="`background-color: ${selectedStock.pattern.color}`" class="w-4 h-4 rounded-full"></div>
                                    <div>{{ selectedStock.pattern.text }}</div>
                                </div>
                                <div>{{ selectedStock.pattern.sectorDiff }}</div>
                            </main>

                            <header class="grid grid-cols-3 py-3 border-b border-black font-benzin-semibold mt-5">
                                <h1>Признаки тренда</h1>
                                <h1>Показатель</h1>
                                <h1>Отличие от сектора</h1>
                            </header>
                            <main class="grid grid-cols-3 py-3 border-b border-black">
                                <div class="has-tooltip">Максимумы/минимумы<span class="tooltip text-white">Более высокие максимумы и минимумы в диапазоне роста, более низкие - в диапазоне снижения</span></div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <div :style="`background-color: ${selectedStock.highLows.color}`" class="w-4 h-4 rounded-full"></div>
                                    <div>{{ selectedStock.highLows.text }}</div>
                                </div>
                                <div>{{ selectedStock.highLowsDiff }}</div>
                            </main>
                            <main class="grid grid-cols-3 py-3 border-b border-black">
                                <div class="has-tooltip">Скользящие средние<span class="tooltip text-white">Положение относительно скользящих средних и их положение относительно друг друга. Цена выше 20й средней, а 20я выше 50й - признаки аптренда</span></div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <div :style="`background-color: ${selectedStock.smaEma.color}`" class="w-4 h-4 rounded-full"></div>
                                    <div>{{ selectedStock.smaEma.text }}</div>
                                </div>
                                <div>{{ selectedStock.smaEmaDiff }}</div>
                            </main>
                            <main class="grid grid-cols-3 py-3 border-b border-black">
                                <div class="has-tooltip">Накопление позиций<span class="tooltip text-white">Увеличение накопления позиций по индикатору Accumulation/Distribution, которые увеличивает объем накопленных позиций после зеленых свечей и уменьшает после красных</span></div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <div :style="`background-color: ${selectedStock.accum.color}`" class="w-4 h-4 rounded-full"></div>
                                    <div>{{ selectedStock.accum.text }}</div>
                                </div>
                                <div>{{ selectedStock.accumDiff }}</div>
                            </main>
                            <main class="grid grid-cols-3 py-3 border-b border-black">
                                <div class="has-tooltip">Сила тренда<span class="tooltip text-white">Рассчитывается на основании последовательного направления, чем больше свечей в пользу конкретного направления, тем сильнее показатели тренда, используется индикатор ADX</span></div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <div :style="`background-color: ${selectedStock.adx.color}`" class="w-4 h-4 rounded-full"></div>
                                    <div>{{ selectedStock.adx.text }}</div>
                                </div>
                                <div>{{ selectedStock.adxDiff }}</div>
                            </main>
                        </tab>
                    </tabs>
                </div>
                
                <!-- MOBILE -->
                <h1 class="font-benzin-bold text-xl my-5 md:hidden">Сценарии</h1> 
                <div @click="s.show = !s.show" class="border-b py-3 md:hidden" v-for="(s, index) in selectedStock.scenarios" :key="index">
                    <div class="flex justify-between">
                        <div class="flex space-x-2">
                            <img v-if="!s.show" class="w-4" src="../assets/icons/chevron-right.svg" alt="">
                            <img v-else class="w-4" src="../assets/icons/chevron-down.svg" alt="">
                            <div>{{s.name}}</div>
                        </div>
                        <div class="flex space-x-2 items-center">
                            <div>{{s.probability}}</div>
                            <div class="w-4 h-4 rounded-full" :style="`background-color: ${s.color}`"></div>
                        </div>
                    </div>

                    <div v-if="s.show">
                        <div class="mt-2">
                            <h1 class="font-semibold">Описание</h1>
                            <div class="mt-1">{{s.description}}</div>
                        </div>

                        <div class="mt-2">
                            <h1 class="font-semibold">Проект решения</h1>
                            <div class="mt-1">{{s.project}}</div>
                        </div>
                    </div>
                </div>

			    <div v-if="width < 600" id="tv" class="w-full h-64 md:hidden mt-5"></div>	

                <div v-if="selectedStock" class="md:hidden">
                    <h1 class="font-benzin-bold text-xl my-5">События и фон</h1>
                    <div class="flex justify-between py-3 border-b border-black font-semibold">
                        <p>Тип</p>
                        <p>Потенциал</p>
                    </div>
                    <div v-for="(i, index) in selectedStock.news" :key="index" class="font-ttnorms py-3 border-b border-black">
                        <div class="flex justify-between">
                            <p>{{i.type}}</p>
                            <p>{{i.potential}}</p>
                        </div>
                        <div>{{i.text}}</div>
                    </div>

                   <h1 class="font-benzin-bold text-xl my-5">Фундаментальные показатели</h1>
                    <div class="font-ttnorms divide-y divide-light-purple">
                        
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Цена к прибыли'2024</div>
                                <div :style="`background-color: ${selectedStock.fwd.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.fwd.text }}</div>
                            </div>
                            <div class="flex justify-between pb-6">
                                <div>Отличие от сектора</div>
                                <div>{{selectedStock.fwd.sectorDiff}}</div>
                            </div>
                            <div>{{ selectedStock.fwd.comment }}</div>
                        </div>
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Долг/капитал</div>
                                <div :style="`background-color: ${selectedStock.debtEquity.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.debtEquity.text }}</div>
                            </div>
                            <div class="flex justify-between pb-6">
                                <div>Отличие от сектора</div>
                                <div>{{selectedStock.debtEquity.sectorDiff}}</div>
                            </div>
                            <div>{{ selectedStock.debtEquity.comment }}</div>
                        </div>
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Текущая ликвидность</div>
                                <div :style="`background-color: ${selectedStock.currentRatio.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.currentRatio.text }}</div>
                            </div>
                            <div class="flex justify-between pb-6">
                                <div>Отличие от сектора</div>
                                <div>{{selectedStock.currentRatio.sectorDiff}}</div>
                            </div>
                            <div>{{ selectedStock.currentRatio.comment }}</div>
                        </div>
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Цель опционов</div>
                                <div :style="`background-color: ${selectedStock.openInterest.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.openInterest.text }}</div>
                            </div>
                            <div class="flex justify-between pb-6">
                                <div>Отличие от сектора</div>
                                <div>{{selectedStock.openInterest.sectorDiff}}</div>
                            </div>
                            <div>{{ selectedStock.openInterest.comment }}</div>
                        </div>
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Цель аналитиков</div>
                                <div :style="`background-color: ${selectedStock.analysts.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.analysts.text }}</div>
                            </div>
                            <div class="flex justify-between pb-6">
                                <div>Отличие от сектора</div>
                                <div>{{selectedStock.analysts.sectorDiff}}</div>
                            </div>
                            <div>{{ selectedStock.analysts.comment }}</div>
                        </div>
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Шорт-позиции</div>
                                <div :style="`background-color: ${selectedStock.shortFloat.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.shortFloat.text }}</div>
                            </div>
                            <div class="flex justify-between pb-6">
                                <div>Отличие от сектора</div>
                                <div>{{selectedStock.shortFloat.sectorDiff}}</div>
                            </div>
                            <div>{{ selectedStock.shortFloat.comment }}</div>
                        </div>
                        
                    </div> 

                   <h1 class="font-benzin-bold text-xl my-5">Технический анализ</h1>
                    <h2 class="font-benzin-semibold">Индикаторы</h2>
                    <div class="font-ttnorms divide-y divide-light-purple">
                        <div>
                            <div class="flex justify-between py-3">
                                <div>Уровни</div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.levels.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="50"/>
                                    </svg>
                                    <div>{{ selectedStock.levels.text }}</div>
                                </div>
                            </div>
                            <div class="flex justify-between pb-3">
                                <div>Отличие от сектора</div>
                                <div>{{selectedStock.levels.sectorDiff}}</div>
                            </div> 
                        </div>
                        <div>
                            <div class="flex justify-between py-3">
                                <div>Fibo</div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.fibo.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="50"/>
                                    </svg>
                                    <div>{{ selectedStock.fibo.text }}</div>
                                </div>
                            </div>
                            <div class="flex justify-between pb-3">
                                <div>Отличие от сектора</div>
                                <div>{{selectedStock.fibo.sectorDiff}}</div>
                            </div> 
                        </div>
                        <div>
                            <div class="flex justify-between py-3">
                                <div>Stoch</div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.stoch.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="50"/>
                                    </svg>
                                    <div>{{ selectedStock.stoch.text }}</div>
                                </div>
                            </div>
                            <div class="flex justify-between pb-3">
                                <div>Отличие от сектора</div>
                                <div>{{selectedStock.stoch.sectorDiff}}</div>
                            </div> 
                        </div>
                        <div>
                            <div class="flex justify-between py-3">
                                <div>Pattern</div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.pattern.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="50"/>
                                    </svg>
                                    <div>{{ selectedStock.pattern.text }}</div>
                                </div>
                            </div>
                            <div class="flex justify-between pb-3">
                                <div>Отличие от сектора</div>
                                <div>{{selectedStock.stoch.sectorDiff}}</div>
                            </div> 
                        </div>
                    </div> 
                    <h2 class="font-benzin-semibold mt-3">Признаки тренда</h2>
                    <div class="font-ttnorms divide-y divide-light-purple">
                        <div>
                            <div class="flex justify-between py-3">
                                <div>Higs Lows</div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.highLows.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="50"/>
                                    </svg>
                                    <div>{{ selectedStock.highLows.text }}</div>
                                </div>
                            </div>
                            <div class="flex justify-between pb-3">
                                <div>Отличие от сектора</div>
                                <div>{{selectedStock.highLowsDiff}}</div>
                            </div> 
                        </div>
                        <div>
                            <div class="flex justify-between py-3">
                                <div>Sma Ema</div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.smaEma.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="50"/>
                                    </svg>
                                    <div>{{ selectedStock.smaEma.text }}</div>
                                </div>
                            </div>
                            <div class="flex justify-between pb-3">
                                <div>Отличие от сектора</div>
                                <div>{{selectedStock.smaEmaDiff}}</div>
                            </div> 
                        </div>
                        <div>
                            <div class="flex justify-between py-3">
                                <div>Accum/Dist</div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.accum.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="50"/>
                                    </svg>
                                    <div>{{ selectedStock.accum.text }}</div>
                                </div>
                            </div>
                            <div class="flex justify-between pb-3">
                                <div>Отличие от сектора</div>
                                <div>{{selectedStock.accumDiff}}</div>
                            </div> 
                        </div>
                        <div>
                            <div class="flex justify-between py-3">
                                <div>ADX</div>
                                <div class="flex space-x-1 items-center font-ttnorms">
                                    <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.adx.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="50"/>
                                    </svg>
                                    <div>{{ selectedStock.adx.text }}</div>
                                </div>
                            </div>
                            <div class="flex justify-between pb-3">
                                <div>Отличие от сектора</div>
                                <div>{{selectedStock.adxDiff}}</div>
                            </div> 
                        </div>
                    </div> 
                </div>
			</div>
		</div>
    </div>
</template>

<script lang="ts">
import stockFuncs from '../composables/stockFuncs'
import { useRouter, useRoute } from 'vue-router'
import { ref, defineComponent, onMounted, watchEffect, watch } from 'vue'
import StockLinks from '../components/StockLinks.vue'
import StockNav from '../components/StockNav.vue'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import Tab from '../components/Tab.vue'
import Tabs from '../components/Tabs.vue'
import useBreakpoints from '../composables/useBreakpoints'

export default defineComponent({
  components: { 
        StockLinks,
        StockNav,
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        Tab,
        Tabs,
    },
	setup() {
        const { width, type } = useBreakpoints()
        const route = useRoute()
        const { stocks, stock, getStocks, getStockTV, embedChart } = stockFuncs()
        getStocks()
        const activeTab = ref(0)

        const selectedStock = ref<any>('')
        watchEffect(() => {
            try {
                if (route.params.id) {
                    let myStock = stocks.value.filter(obj => {
                        console.log(obj.id, route.params.id, route.name)
                        return obj.id.toString() == route.params.id.toString()
                    })
                    selectedStock.value = myStock[0]
                    if (route.name == 'Analytics') {
                        console.log('this part gone wild')
                        getStockTV(myStock[0].id)
                        // embedChart(myStock[0].id)
                    }
                } else {
                    selectedStock.value = stocks.value[0]
                    console.log('hello there', route.name)
                    if (route.name == 'Analytics') {
                        getStockTV(stocks.value[0].id)
                        // embedChart(stocks.value[0].id)
                    }
                }
            } catch (error) {}
        })

        watch(selectedStock, () => {
            if (!!document.getElementById('tv')) {
                if (route.name == 'Analytics') {
                    getStockTV(selectedStock.value.id)
                    // embedChart(selectedStock.value.id)
                }
            }
        })


		const info = ref(['', 'Тикер', 'Сектор', 'Тренд', 'Тех. анализ', 'Фундаментальный анализ'])

        return {
        	stocks,
        	stock,
        	getStocks,
            getStockTV,
			info,
            route,
            selectedStock,
            activeTab,
            width,
            type,
            embedChart,
        }
	},
})
</script>