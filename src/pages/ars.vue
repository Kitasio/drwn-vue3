<template>
	<div>
		<input v-model="changer"  type="text" name="">
		<div @click="changeName(changer)" class="text-white">change name</div>
		<div class="text-white text-center w-full">hello {{ name }}</div>
		<div class="text-white text-center w-full">{{ changer }}</div>

		<div v-for="(person, index) in people" :key="index" class="flex text-white space-x-10">
			<div>His name is {{ person.name }}</div>
			<div>Age is {{ person.age }}</div>
		</div>

		<div @click="showSecret = !showSecret" class="text-white mt-20 cursor-pointer">show secret</div>
		<div v-if="showSecret" class="text-white text-2xl">Secret info</div>

		<div class="text-white" v-html="htmlData"></div>

	</div>
</template>

<style>
	.myel {
		height: 200px;
	}
</style>

<script>
export default {
	// любая инфа для темплейта
	data() {
		return {
			name: "Arseny",
			showSecret: false,
			changer: "",
			people: [
				{ name: "nick", age: 26 },
				{ name: "donny", age: 46 },
				{ name: "natasha", age: 28 },
			],
			htmlData: "<p style='color: indigo'>hello bitch</p>"
		}
	},
	// методы для темплейта
	methods: {
		changeName: function(i) {
			this.people[0].name = i
		}
	},
	// обычные скрипты
	mounted() {

	}
 }
</script>