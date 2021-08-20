<template>
    <stock-nav></stock-nav>
    <div class="h-screen  p-5 sm:p-10 lg:px-32 mx-auto">
        <div class=" relative rounded-lg shadow-brand p-5 lg:p-10 w-full h-5/6  overflow-scroll">
            <div class="flex justify-between items-center">
                <div class="text-2xl mb-5 font-benzin-semibold">Добавление Акции</div>
                <button class="px-5 py-2 border-2 rounded-md cursor-pointer transition duration-200 hover:bg-deep-green hover:text-white border-deep-green text-deep-green" @click="addStock(); router.go(-1)">Сохранить</button>
            </div>
            <tabs v-model="activeTab">

                <tab class="font-ttnorms" title="Основное">
                    <div>Тикер</div>
                    <input v-model="stock.ticker" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-40 border-2 rounded-md">

                    <div class="mt-5">
                        <div>Логотип</div>
                        <input @change="handleChange" class="mb-5" name="image" type="file" placeholder="Картинка">
                    </div>

                    <div>Trading View ID</div>
                    <input v-model="stock.tradingView" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-40 border-2 rounded-md">

                    <div class="mt-5">Рекомендация</div>
                    <div class="flex flex-col space-y-2">
                        <input v-model="stock.recommendation.text" type="text" class="border-light-purple focus:border-light-purple focus:ring-0 w-40 border-2 rounded-md">
                        <textarea v-model="stock.recommendation.comment" name="" id="" cols="10" class="w-72 h-32 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md"></textarea>
                    </div>
                    <div class="mt-5">Сектор</div>
                    <div class="flex space-x-3 items-center">
                        <Listbox v-model="selectedSector">
                            <ListboxButton class="py-2 px-3 border-2 border-light-purple rounded-md w-72">
                                <div class="flex justify-between">
                                    <div>{{ selectedSector.name }}</div>
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
                                <ListboxOptions class="absolute mt-2 z-10 bg-white w-72 py-2 px-3 border-2 border-light-purple rounded-md">
                                    <ListboxOption
                                        v-for="(sector, i) in sectors"
                                        :key="i"
                                        :value="sector"
                                    >
                                        <div class="cursor-pointer py-1 text-gray-500 hover:text-black transition">{{ sector.name }}</div>
                                    </ListboxOption>
                                </ListboxOptions>
                            </transition>
                        </Listbox>
                        <div class="flex space-x-1">
                            <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.sector.color">
                            <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.sector.color">
                            <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.sector.color">
                        </div>
                    </div>
                </tab>


                <tab class="font-ttnorms" title="Фундаментальные показатели">
                    <div class="grid grid-cols-3 gap-10">
                        <div>
                            <div>fwd P/E24</div>
                            <div>
                                <input v-model="stock.fwd.text" type="text" class="w-full  border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <input v-model="stock.fwd.comment" placeholder="comment" type="text" class="w-full mt-2 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <input v-model="stock.fwd.sectorDiff" placeholder="Отличие от сектора" type="text" class="w-full mt-2 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <div class="space-x-3">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.fwd.color" @click="stock.fwd.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.fwd.color" @click="stock.fwd.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.fwd.color" @click="stock.fwd.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.fwd.color" @click="stock.fwd.num = 0">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Debt/Equity</div>
                            <div>
                                <input v-model="stock.debtEquity.text" type="text" class="w-full  border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <input v-model="stock.debtEquity.comment" placeholder="comment" type="text" class="w-full mt-2 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <input v-model="stock.debtEquity.sectorDiff" placeholder="Отличие от сектора" type="text" class="w-full mt-2 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <div class="space-x-3">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.debtEquity.color" @click="stock.debtEquity.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red"  type="radio" value="#FF005C" id="red" v-model="stock.debtEquity.color" @click="stock.debtEquity.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow"  type="radio" value="#FBBC05" id="yellow" v-model="stock.debtEquity.color" @click="stock.debtEquity.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple"  type="radio" value="#AD92B7" id="gray" v-model="stock.debtEquity.color" @click="stock.debtEquity.num = 0">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Current ratio</div>
                            <div>
                                <input v-model="stock.currentRatio.text" type="text" class="w-full  border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <input v-model="stock.currentRatio.comment" placeholder="comment" type="text" class="w-full mt-2 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <input v-model="stock.currentRatio.sectorDiff" placeholder="Отличие от сектора" type="text" class="w-full mt-2 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <div class="space-x-3">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.currentRatio.color" @click="stock.currentRatio.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.currentRatio.color" @click="stock.currentRatio.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.currentRatio.color" @click="stock.currentRatio.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.currentRatio.color" @click="stock.currentRatio.num = 0">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Open interest</div>
                            <div>
                                <input v-model="stock.openInterest.text" type="text" class="w-full  border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <input v-model="stock.openInterest.comment" placeholder="comment" type="text" class="w-full mt-2 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <input v-model="stock.openInterest.sectorDiff" placeholder="Отличие от сектора" type="text" class="w-full mt-2 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <div class="space-x-3">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.openInterest.color">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.openInterest.color">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.openInterest.color">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.openInterest.color">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Analysts</div>
                            <div>
                                <input v-model="stock.analysts.text" type="text" class="w-full  border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <input v-model="stock.analysts.comment" placeholder="comment" type="text" class="w-full mt-2 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <input v-model="stock.analysts.sectorDiff" placeholder="Отличие от сектора" type="text" class="w-full mt-2 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <div class="space-x-3">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.analysts.color">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.analysts.color">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.analysts.color">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.analysts.color">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Short-float</div>
                            <div>
                                <input v-model="stock.shortFloat.text" type="text" class="w-full  border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <input v-model="stock.shortFloat.comment" placeholder="comment" type="text" class="w-full mt-2 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <input v-model="stock.shortFloat.sectorDiff" placeholder="Отличие от сектора" type="text" class="w-full mt-2 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                                <div class="space-x-3">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.shortFloat.color">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.shortFloat.color">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.shortFloat.color">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.shortFloat.color">
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="mt-5">
                        <div class="mb-3">В целом</div>
                            <Listbox v-model="selectedFundSum">
                                <ListboxButton class="py-2 px-3 border-2 border-light-purple rounded-md w-56">
                                    <div class="flex items-center space-x-3">
                                        <div :style="`background-color: ${selectedFundSum.color}`" class="w-5 h-5 rounded-full"></div>
                                        <div>{{ selectedFundSum.text }}</div>
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
                                <ListboxOptions class="absolute z-10 mt-2 bg-white w-56 space-y-3 p-3 border-2 border-light-purple rounded-md">
                                    <ListboxOption
                                        v-for="(trend, i) in sums"
                                        :key="i"
                                        :value="trend"
                                    >
                                        <div class="flex items-center space-x-3 cursor-pointer">
                                            <div :style="`background-color: ${trend.color}`" class="w-5 h-5 rounded-full"></div>
                                            <div>{{ trend.text }}</div>
                                        </div>
                                    </ListboxOption>
                                </ListboxOptions>
                                </transition>
                            </Listbox>
                    </div>
                </tab>
                <tab class="font-ttnorms" title="Тех. анализ">
                    <h1 class="text-xl">Индикаторы</h1>
                   <div class="flex space-x-7 2xl:space-x-14 mt-2">
                        <div>
                            <div>Уровни</div>
                            <div>
                                <input v-model="stock.levels.text" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-56 border-2 rounded-md">
                                <input v-model="stock.levels.sectorDiff" type="text" placeholder="Отличие от сектора" class="mt-3 border-light-purple focus:border-light-purple focus:ring-0 w-56 border-2 rounded-md">
                                <div class="space-x-3">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.levels.color" @click="stock.levels.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.levels.color" @click="stock.levels.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.levels.color" @click="stock.levels.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.levels.color" @click="stock.levels.num = 0">
                                </div>
                            </div>
                        </div> 

                        <div>
                            <div>Fibo</div>
                            <div>
                                <input v-model="stock.fibo.text" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-56 border-2 rounded-md">
                                <input v-model="stock.fibo.sectorDiff" type="text" placeholder="Отличие от сектора" class="mt-3 border-light-purple focus:border-light-purple focus:ring-0 w-56 border-2 rounded-md">
                                <div class="space-x-3">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.fibo.color" @click="stock.fibo.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.fibo.color" @click="stock.fibo.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.fibo.color" @click="stock.fibo.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.fibo.color" @click="stock.fibo.num = 0">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Stoch</div>
                            <div>
                                <input v-model="stock.stoch.text" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-56 border-2 rounded-md">
                                <input v-model="stock.stoch.sectorDiff" type="text" placeholder="Отличие от сектора" class="mt-3 border-light-purple focus:border-light-purple focus:ring-0 w-56 border-2 rounded-md">
                                <div class="space-x-3">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.stoch.color" @click="stock.stoch.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.stoch.color" @click="stock.stoch.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.stoch.color" @click="stock.stoch.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.stoch.color" @click="stock.stoch.num = 0">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Pattern</div>
                            <div>
                                <input v-model="stock.pattern.text" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-56 border-2 rounded-md">
                                <input v-model="stock.pattern.sectorDiff" type="text" placeholder="Отличие от сектора" class="mt-3 border-light-purple focus:border-light-purple focus:ring-0 w-56 border-2 rounded-md">
                                <div class="space-x-3">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.pattern.color" @click="stock.pattern.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.pattern.color" @click="stock.pattern.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.pattern.color" @click="stock.pattern.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.pattern.color" @click="stock.pattern.num = 0">
                                </div>
                            </div>
                        </div>
                   </div>
                   

                    <h1 class="text-xl mt-10">Признаки тренда</h1>
                    <div class="flex space-x-10">
                        <div>
                            <div class="mb-3">Higs Lows</div>
                            <Listbox v-model="selectedHighLows">
                                <ListboxButton class="py-2 px-3 border-2 border-light-purple rounded-md w-56">
                                    <div class="flex items-center space-x-3">
                                        <div :style="`background-color: ${selectedHighLows.color}`" class="w-5 h-5 rounded-full"></div>
                                        <div>{{ selectedHighLows.text }}</div>
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
                                <ListboxOptions class="absolute mt-2 z-10 bg-white w-56 space-y-3 px-3 border-2 border-light-purple rounded-md">
                                    <ListboxOption
                                        v-for="(trend, i) in trendOptions"
                                        :key="i"
                                        :value="trend"
                                    >
                                        <div class="flex items-center space-x-3 cursor-pointer">
                                            <div :style="`background-color: ${trend.color}`" class="w-5 h-5 rounded-full"></div>
                                            <div>{{ trend.text }}</div>
                                        </div>
                                    </ListboxOption>
                                </ListboxOptions>
                                </transition>
                            </Listbox>
                            <input v-model="stock.highLowsDiff" type="text" placeholder="Отличие от сектора" class="mt-3 w-56 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                        </div>

                        <div>
                            <div class="mb-3">Sma Ema</div>
                            <Listbox v-model="selectedSmaEma">
                                <ListboxButton class="py-2 px-3 border-2 border-light-purple rounded-md w-56">
                                    <div class="flex items-center space-x-3">
                                        <div :style="`background-color: ${selectedSmaEma.color}`" class="w-5 h-5 rounded-full"></div>
                                        <div>{{ selectedSmaEma.text }}</div>
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
                                <ListboxOptions class="absolute mt-2 z-10 bg-white w-56 space-y-3 px-3 border-2 border-light-purple rounded-md">
                                    <ListboxOption
                                        v-for="(trend, i) in trendOptions"
                                        :key="i"
                                        :value="trend"
                                    >
                                        <div class="flex items-center space-x-3 cursor-pointer">
                                            <div :style="`background-color: ${trend.color}`" class="w-5 h-5 rounded-full"></div>
                                            <div>{{ trend.text }}</div>
                                        </div>
                                    </ListboxOption>
                                </ListboxOptions>
                                </transition>
                            </Listbox>
                            <input v-model="stock.smaEmaDiff" type="text" placeholder="Отличие от сектора" class="mt-3 w-56 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                        </div>

                        <div>
                            <div class="mb-3">Accum/Dist</div>
                            <Listbox v-model="selectedAccum">
                                <ListboxButton class="py-2 px-3 border-2 border-light-purple rounded-md w-56">
                                    <div class="flex items-center space-x-3">
                                        <div :style="`background-color: ${selectedAccum.color}`" class="w-5 h-5 rounded-full"></div>
                                        <div>{{ selectedAccum.text }}</div>
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
                                <ListboxOptions class="absolute mt-2 z-10 bg-white w-56 space-y-3 px-3 border-2 border-light-purple rounded-md">
                                    <ListboxOption
                                        v-for="(trend, i) in trendOptions"
                                        :key="i"
                                        :value="trend"
                                    >
                                        <div class="flex items-center space-x-3 cursor-pointer">
                                            <div :style="`background-color: ${trend.color}`" class="w-5 h-5 rounded-full"></div>
                                            <div>{{ trend.text }}</div>
                                        </div>
                                    </ListboxOption>
                                </ListboxOptions>
                                </transition>
                            </Listbox>
                            <input v-model="stock.accumDiff" type="text" placeholder="Отличие от сектора" class="mt-3 w-56 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                        </div>

                        <div>
                            <div class="mb-3">ADX</div>
                            <Listbox v-model="selectedAdx">
                                <ListboxButton class="py-2 px-3 border-2 border-light-purple rounded-md w-56">
                                    <div class="flex items-center space-x-3">
                                        <div :style="`background-color: ${selectedAdx.color}`" class="w-5 h-5 rounded-full"></div>
                                        <div>{{ selectedAdx.text }}</div>
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
                                <ListboxOptions class="absolute mt-2 z-10 bg-white w-56 space-y-3 px-3 border-2 border-light-purple rounded-md">
                                    <ListboxOption
                                        v-for="(trend, i) in trendOptions"
                                        :key="i"
                                        :value="trend"
                                    >
                                        <div class="flex items-center space-x-3 cursor-pointer">
                                            <div :style="`background-color: ${trend.color}`" class="w-5 h-5 rounded-full"></div>
                                            <div>{{ trend.text }}</div>
                                        </div>
                                    </ListboxOption>
                                </ListboxOptions>
                                </transition>
                            </Listbox>
                            <input v-model="stock.adxDiff" type="text" placeholder="Отличие от сектора" class="mt-3 w-56 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md">
                        </div>
                    </div>
                    <div class="mt-5">
                        <div class="mb-3">В целом</div>
                            <Listbox v-model="selectedTechSum">
                                <ListboxButton class="py-2 px-3 border-2 border-light-purple rounded-md w-56">
                                    <div class="flex items-center space-x-3">
                                        <div :style="`background-color: ${selectedTechSum.color}`" class="w-5 h-5 rounded-full"></div>
                                        <div>{{ selectedTechSum.text }}</div>
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
                                <ListboxOptions class="absolute z-10 mt-2 bg-white w-56 space-y-3 p-3 border-2 border-light-purple rounded-md">
                                    <ListboxOption
                                        v-for="(trend, i) in sums"
                                        :key="i"
                                        :value="trend"
                                    >
                                        <div class="flex items-center space-x-3 cursor-pointer">
                                            <div :style="`background-color: ${trend.color}`" class="w-5 h-5 rounded-full"></div>
                                            <div>{{ trend.text }}</div>
                                        </div>
                                    </ListboxOption>
                                </ListboxOptions>
                                </transition>
                            </Listbox>
                    </div>
                </tab>
                <tab class="font-ttnorms" title="Фон">
                    <div class="grid grid-cols-3 gap-5">
                        <div>
                            <h1>Новость</h1>
                            <input class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="news.text" type="text">
                        </div>
                        <div>
                            <h1>Тип</h1>
                            <input class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="news.type" type="text">
                        </div>
                        <div>
                            <h1>Потенциал роста</h1>
                            <input class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="news.potential" type="text">
                        </div>
                    </div>
                    <div class="flex space-x-5 items-center justify-between">
                        <div class="flex cursor-pointer mt-12">
                            <div class="border-2 border-black rounded-md px-4 py-3" @click="pushNews">Добавить новость</div>
                        </div>
                        <div class="mt-5">
                            <div class="mb-3">В целом</div>
                                <Listbox v-model="selectedContextSum">
                                    <ListboxButton class="py-2 px-3 border-2 border-light-purple rounded-md w-56">
                                        <div class="flex items-center space-x-3">
                                            <div :style="`background-color: ${selectedContextSum.color}`" class="w-5 h-5 rounded-full"></div>
                                            <div>{{ selectedContextSum.text }}</div>
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
                                    <ListboxOptions class="absolute z-10 mt-2 bg-white w-56 space-y-3 p-3 border-2 border-light-purple rounded-md">
                                        <ListboxOption
                                            v-for="(trend, i) in sums"
                                            :key="i"
                                            :value="trend"
                                        >
                                            <div class="flex items-center space-x-3 cursor-pointer">
                                                <div :style="`background-color: ${trend.color}`" class="w-5 h-5 rounded-full"></div>
                                                <div>{{ trend.text }}</div>
                                            </div>
                                        </ListboxOption>
                                    </ListboxOptions>
                                    </transition>
                                </Listbox>
                        </div>
                    </div>

                    <div class="mt-10">
                        <header class="grid grid-cols-3 py-3 border-b border-t border-black">
                            <h1>Новость</h1>
                            <h1>Тип</h1>
                            <h1>Потенциал роста</h1>
                        </header>
                        <main v-for="(i, index) in stock.news" :key="index" class="grid grid-cols-3 py-3 border-b border-black">
                            <p>{{ i.text }}</p>
                            <p>{{ i.type }}</p>
                            <div class="flex justify-between items-center">
                                <p>{{ i.potential }}</p>
                                <div @click="stock.news.splice(index, 1)" class="text-base-red cursor-pointer text-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </main>
                    </div>
                </tab>
                <tab class="font-ttnorms" title="Сценарии">
                    <div class="grid grid-cols-2 gap-5">
                        <div>
                            <h1>Название</h1>
                            <textarea class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="scenario.name" type="text"></textarea>
                        </div>
                        <div>
                            <h1>Описание</h1>
                            <textarea class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="scenario.description" type="text"></textarea>
                        </div>
                        <div>
                            <h1>Проект решения</h1>
                            <textarea class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="scenario.project" type="text"></textarea>
                        </div>
                        <div>
                            <h1>Вероятность</h1>
                            <textarea class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="scenario.probability" type="text"></textarea>
                            <div class="flex space-x-1">
                                <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="scenario.color">
                                <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="scenario.color">
                                <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="scenario.color">
                            </div>
                        </div>
                    </div>
                    <div class="flex cursor-pointer mt-3">
                        <div class="border-2 border-black rounded-md px-4 py-3" @click="pushScenario">Добавить сценарий</div>
                    </div>
                    <div class="mt-5">
                        <table v-if="stock.scenarios[0]" class="table-auto w-full">
                            <thead>
                                <tr class="border-b border-t">
                                    <th class="text-left py-3">Название</th>
                                    <th class="text-left">Описание</th>
                                    <th class="text-left">Проект решения</th>
                                    <th class="text-left">Вероятность</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b" v-for="(s, index) in stock.scenarios" :key="s.id">
                                    <td class="py-3">{{ s.name }}</td>
                                    <td>{{ s.description }}</td>
                                    <td>{{ s.project }}</td>
                                    <td class="flex items-center my-auto py-3 space-x-3">
                                        <div>{{ s.probability }}</div>
                                        <div class="w-4 h-4 rounded-full" :style="`background-color: ${s.color}`"></div>
                                    </td>
                                    <td @click="stock.scenarios.splice(index, 1)" class="text-base-red cursor-pointer text-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </tab>
            </tabs>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import stockFuncs from '../composables/stockFuncs'
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'
import StockNav from '../components/StockNav.vue'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
export default defineComponent({
  components: { Tab, Tabs, Listbox, ListboxButton, ListboxOptions, ListboxOption, StockNav },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const { stock, addStock, handleChange, uploadImage, file } = stockFuncs()
        const activeTab = ref(0)

        const scenario = ref({
            name: '',
            description: '',
            project: '',
            probability: '',
            color: '',
        })

        const news = ref({
            text: '',
            type: '',
            potential: '',
        })

        const pushScenario = () => {
            stock.value.scenarios.push(scenario.value)
            scenario.value = {
                name: '',
                description: '',
                project: '',
                probability: '',
                color: '',
            }
        }

        const pushNews = () => {
            stock.value.news.push(news.value)
            news.value = {
                text: '',
                type: '',
                potential: '', 
            }
        }

        const sectors = [
            {},
            { name: 'Товары первой необходимости' },
            { name: 'Технологии' },
            { name: 'Услуги' },
            { name: 'Здравоохранение' },
            { name: 'Комуникационные услуги' },
            { name: 'Товары длительного пользования' },
            { name: 'Материалы' },
            { name: 'Товары первой необходимости' },
            { name: 'Промышленность' },
            { name: 'Нефть и газ' },
            { name: 'Финансы' },
            { name: 'Недвижимость' },
        ]
        

        const trendOptions = [
            { color: '#00FF4A', text: 'Аптренд', num: 1 },
            { color: '#FF005C', text: 'Даунтренд', num: 100 },
            { color: '#FBBC05', text: 'Зона риска', num: 10 },
            { color: '#AD92B7', text: 'Флэт', num: 0 },
        ] 

        const sums = [
            { color: '#AD92B7', text: 'Не отображать'},
            { color: '#00FF4A', text: 'В норме' },
            { color: '#FBBC05', text: 'Внимание' },
            { color: '#FF005C', text: 'Угроза' },
        ]
        
        const selectedSector = ref<any>(sectors[0])
        const selectedHighLows = ref<any>(trendOptions[0])
        const selectedSmaEma = ref<any>(trendOptions[0])
        const selectedAccum = ref<any>(trendOptions[0])
        const selectedAdx = ref<any>(trendOptions[0])
        const selectedTrendSum = ref<any>(sums[0])
        const selectedTechSum = ref<any>(sums[0])
        const selectedFundSum = ref<any>(sums[0])
        const selectedContextSum = ref<any>(sums[0])
        const trendParams = ref<any>([selectedHighLows, selectedSmaEma, selectedAccum, selectedAdx])

        watchEffect(() => {
            stock.value.sector = selectedSector.value
            stock.value.highLows = selectedHighLows.value
            stock.value.smaEma = selectedSmaEma.value
            stock.value.accum = selectedAccum.value
            stock.value.adx = selectedAdx.value
            stock.value.trendSum = selectedTrendSum.value
            stock.value.techSum = selectedTechSum.value
            stock.value.fundSum = selectedFundSum.value
            stock.value.contextSum = selectedContextSum.value
        })

        return {
            scenario,
            pushScenario,
            news,
            pushNews,
            selectedContextSum,
            selectedTrendSum,
            selectedTechSum,
            selectedFundSum,
            selectedHighLows,
            handleChange,
            selectedSmaEma,
            selectedAccum,
            selectedAdx,
            sums,
            trendOptions,
            trendParams,
            sectors, 
            selectedSector, 
            router, 
            activeTab, 
            route, 
            stock, 
            addStock,
        }
    },
})
</script>