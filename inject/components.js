
function htmlToElement(html) {var template = document.createElement('template');html = html.trim();template.innerHTML = html;return template.content.firstChild;}
function createStorage(data) {
	const version = 'dbUtilsv0.0.2'
	let defdata = {variables: data,mutations: {}}
	Object.keys(defdata.variables).forEach(ele => {
		defdata.mutations[ele] = {
				deep: true,
				handler() {
					let pre = {}
					Object.keys(defdata.variables).forEach(e => {pre[e] = this[e]});
					localStorage.setItem(version, JSON.stringify(pre))
				}
			}
	});

	if (localStorage.getItem(version) == undefined) localStorage.setItem(version, JSON.stringify(defdata.variables))
	else {
		let temp = JSON.parse(localStorage.getItem(version))
		if(Object.keys(defdata.variables).toString() == Object.keys(temp).toString()) defdata.variables = temp
	}

	return defdata
}

Vue.component('vcd-tabbox',{
	template: /*HTML */
	`
	<div class="cd-nav-btn-content f-c">
			<a :id="'tabbox_' + tabid" href="#" class="cd-nav-btn" :class="$root.tabposition == tabid ? 'active' : ''" @click="$root.tabposition = tabid">
				<div>
					<b v-if="counter">{{counter}}</b>
					<i class="mdi" :class="icon" v-if="icon"></i>
                    <slot v-else></slot>
				</div>
				<span>{{text}}</span>
			</a>
	</div>
	`,
	props: {
		tabid: String, 
		text: {default: 'tab name'}, 
		icon: {type: String}, 
		counter: {default: 0}, 
	}
})
Vue.component('vcd-void-box',{
	template: /*HTML */
	`<div v-else class="f-c" style="height: 100%">
		<i class="mdi mdi-spider-thread" style="font-size: 5rem"></i>
		<span class="ff-secodary" style="font-size: 2rem; padding-top: 4rem">No hay {{text}} disponibles</span>
	</div>
	`,
	props: {text: 'actividades'}
})
Vue.component('svg-mdi',{
    template: `
        <svg viewBox="0 0 24 24">
            <path :d="path" v-if="path"/>
        </svg>
    `,
    props: {
		path: {type: String}
	},
})
Vue.component('vcd-btn-icon', {
	template: /*HTML */
	`
		<a @click="launchEvents" :href="href" class="cd-btn cd-btn-icon">
			<slot></slot>
		</a>
	`,
	props: {
		minimizeApp: Boolean,
		href: {type: String, default: '#'}
	},
	methods: {
		launchEvents(){
            
			if (this.minimizeApp) {
				this.$root.moduleActiveId = 'md_activities'
				this.$root.openPanel = false
			}
		}
	}
})
Vue.component('vcd-btn', {
	template: /*HTML */
	`<a @click="launchEvents" class="cd-btn" :class="'cd-btn-' + type">
		<i class="mdi mdi-24px" :class="icon"></i>
		
	</a>
	`,
	props: {
		minimizeApp: Boolean,
		type: {type: String, default: 'icon'},
		icon: {type: String, default() {return this.$root.icon_link}},
	},
	methods: {
		launchEvents(){
			if (this.minimizeApp) {
				this.$root.moduleActiveId = 'md_activities'
				this.$root.openPanel = false
			}
		}
	}
})
Vue.component('vcd-date', {
	template: /*HTML */
	`<div class="cd-date">
		<div class="cd-date-month">
			<span v-if="isAfter">Ahora</span>
			<span v-else-if="isToday">Hoy</span>
			<span v-else>{{day}} {{month}}</span>
		</div>
		<div v-show="!isAfter" class="cd-date-time f-c">{{hour}}</div>
	</div>
	`,
	props: ['date'],
	computed: {
		hour(){
			const date = new Date(this.date)
			return (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + (date.getHours() > 11? 'p' : 'a')
		},
		day(){
			return (new Date(this.date)).getDate()
		},
		month(){
			return this.$root.months[(new Date(this.date)).getMonth()]
		},
		isToday(){
			const [now, date] = [new Date(this.$root.now), new Date(this.date)]
			return now.getFullYear() == date.getFullYear() && now.getMonth() == date.getMonth() && now.getDay() == date.getDay()
		},
		isAfter(){
			const [now, date] = [this.$root.now, (new Date(this.date)).getTime()]
			return now > date
		}
	}
})
Vue.component('vcd-countdown',{
	template: /*HTML */
	`<div class="cd-countdown f-c">
		{{isAfter ? 'Termina en': 'Inicia en'}}
		<span>{{isAfter? dateViewEnd: dateViewStart}}</span>
	</div>
	`,
	props: ['dateEnd', 'dateStart'],
	computed: {
		isAfter(){
			return this.$root.now > (new Date(this.dateStart)).getTime()
		},
		dateViewEnd(){
			const now = this.$root.now
			const distance = (new Date(this.dateEnd)).getTime() - now;
			
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
			return distance < 0 ? '0m 0s' : (days ? days + "d ": '') + (hours + days ? hours + "h " : '') + (days ? '' : minutes + "m ") + (days + hours ? '' :seconds + 's')
		},
		dateViewStart(){
			const now = this.$root.now
			const distance = (new Date(this.dateStart)).getTime() - now;
			
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
			return distance < 0 ? '0m 0s' : (days ? days + "d ": '') + (hours + days ? hours + "h " : '') + (days ? '' : minutes + "m ") + (days + hours ? '' :seconds + 's')
		}
	},
	
})