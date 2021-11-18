
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
		<svg style="width:5rem" viewBox="0 0 24 24">
			<path fill="#FFF" d="M13 2V7.08A5.47 5.47 0 0 0 12 7A5.47 5.47 0 0 0 11 7.08V2M16.9 15A5 5 0 0 1 16.73 15.55L20 17.42V22H18V18.58L15.74 17.29A4.94 4.94 0 0 1 8.26 17.29L6 18.58V22H4V17.42L7.27 15.55A5 5 0 0 1 7.1 15H5.3L2.55 16.83L1.45 15.17L4.7 13H7.1A5 5 0 0 1 7.37 12.12L5.81 11.12L2.24 12L1.76 10L6.19 8.92L8.5 10.45A5 5 0 0 1 15.5 10.45L17.77 8.92L22.24 10L21.76 12L18.19 11.11L16.63 12.11A5 5 0 0 1 16.9 13H19.3L22.55 15.16L21.45 16.82L18.7 15M11 14A1 1 0 1 0 10 15A1 1 0 0 0 11 14M15 14A1 1 0 1 0 14 15A1 1 0 0 0 15 14Z" />
		</svg>
		<span class="ff-secodary" style="font-size: 2rem; padding-top: 2rem">No hay {{text}} disponibles</span>
	</div>
	`,
	props: {text: 'actividades'}
})
Vue.component('v-box',{
	template: /*HTML */`<div style="display: flex; justify-content: center; align-items: center" :style="{height: s + 'rem', width: s + 'rem', display: !flex ? 'inline-flex': 'flex'}"> <slot></slot> </div>`,
	props: {s: {default: 1}, flex: Boolean}
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
Vue.component('vcd-activity', {
	template: /*HTML */`
		
		<div style="display: grid; grid-template-columns:  1fr; gap: .5rem">
			
			<div style="background: var(--panel); color: #FFF; border-radius: 1rem; padding: 1rem; flex: 1">
				<div class="f-start" style="width: 100%; align-items: flex-start;">
					<div class="f-fill">
						<div>{{data.title}}</div>
						<div style="font-size: .6rem; font-weight: bold; letter-spacing: 2px;" :style="{color: $root.colorCourse(data.courseName).solid}">{{data.courseName}}</div>
					</div>
					<vcd-date :date="data.dateBegin" v-if="data.type != 'EXAM' && !isBegin"></vcd-date>
					<a v-else class="cd-btn acd-waves" style="width: 48px; background: var(--success)" :href="data.url">Abrir</a>
				</div>
				<v-box s=".5" flex></v-box>
				<div class="f-end">
					<div style="display: grid; grid-auto-flow: column; grid-auto-columns: max-content;gap: 0.5rem" class="f-fill">
						
						<a title="IR AL MODULO DE CURSO" :href="data.urlPanel" style="padding: 0 0.5rem; border-radius: .5rem; height: 32px;" :style="{background: $root.colorCourse(data.courseName).linear}" class="f-c">
							<svg viewBox="0 0 24 24" style="height: 1.4rem; fill: #fff">
								<path v-if="data.type == 'FORUM'" d="M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7A2,2 0 0,1 7,5H21A2,2 0 0,1 23,7V17A2,2 0 0,1 21,19H16.9L13.2,22.71C13,22.89 12.76,23 12.5,23H12M3,15H1V3A2,2 0 0,1 3,1H19V3H3V15Z"></path>
								<path v-else-if="data.type == 'HOMEWORK'" d="M13,10H11a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Zm5,0a4,4,0,0,0-3-3.86V5A3,3,0,0,0,9,5V6.14A4,4,0,0,0,6,10a4,4,0,0,0-4,4v3a3,3,0,0,0,3,3H6.18A3,3,0,0,0,9,22h6a3,3,0,0,0,2.82-2H19a3,3,0,0,0,3-3V14A4,4,0,0,0,18,10ZM6,18H5a1,1,0,0,1-1-1V14a2,2,0,0,1,2-2ZM11,5a1,1,0,0,1,2,0V6H11Zm5,14a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1V18a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2Zm0-4.44A3.91,3.91,0,0,0,14,14H10a3.91,3.91,0,0,0-2,.56V10a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2ZM20,17a1,1,0,0,1-1,1H18V12a2,2,0,0,1,2,2Z"></path>
								<path v-else-if="data.type == 'EXAM'" d="M17,21L14.25,18L15.41,16.84L17,18.43L20.59,14.84L21.75,16.25M12.8,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19A2,2 0 0,1 21,5V12.8C20.12,12.29 19.09,12 18,12L17,12.08V11H7V13H14.69C13.07,14.07 12,15.91 12,18C12,19.09 12.29,20.12 12.8,21M12,15H7V17H12M17,7H7V9H17"></path>
							</svg>
						</a>
						<div v-if="data.type != 'EXAM'"  style="padding: 0 0.5rem; border-radius: .5rem; height: 32px; border: 2px solid black; background: var(--panel-light)" :style="{'border-color': isBegin ? 'var(--primary)': 'var(--success)'}" class="f-start">
							<span>{{isBegin ? 'Fin:': ''}}</span>
							<v-box s=".5"></v-box>
							<vcd-countdown2 :date="isBegin ? data.dateEnd: data.dateBegin"></vcd-countdown2>
						</div>
						<div v-if="data.type == 'FORUM'" style="padding: 0 0.5rem; border-radius: .5rem; height: 32px; background: var(--panel-light)" class="f-start">
							<span>Respo.: {{data.myAnswers >= 1? 'OK' : 'FALTA'}}</span>
						</div>
						<div v-if="data.type == 'HOMEWORK' && data.isGroup" style="padding: 0 0.5rem; border-radius: .5rem; height: 32px; background: var(--panel-light)" class="f-start">
							<span>Grupal</span>
						</div>
						<div v-if="data.type == 'HOMEWORK'" style="padding: 0 0.5rem; border-radius: .5rem; height: 32px; background: var(--panel-light)" class="f-start">
							<span>Intentos: {{data.intents - data.intentsUseds}}/{{data.intents}}</span>
						</div>
						<div v-if="data.type == 'EXAM'" style="padding: 0 0.5rem; border-radius: .5rem; height: 32px; background: var(--panel-light)" class="f-start">
							<span>Intentos restantes: {{data.intents}}</span>
						</div>
					</div>
					<div title="" class="cd-activity-type f-c" :style="{'border-color': $root.colorCourse(data.courseName).solid}">
						
						<span>{{({HOMEWORK: 'TAREA', FORUM: 'FORO', 'EXAM': 'EXAM'})[data.type]}}</span>
					</div>
				</div>
				
			</div>
		</div>
	`,
	props: ['data'],
	computed: {
		isBegin(){
			const [now, date] = [this.$root.now, (new Date(this.data.dateBegin)).getTime()]
			return now > date
		}
	}
})
Vue.component('vcd-dashconferences-item', {
	template: /*html*/`
		<a class="cd-dashconferences-item" :class="{'cd-dashconferences-item-disable': !isBegin}" :href="isBegin? data.url : '#'" :target="isBegin? '_blank' : ''">
			<div :style="{fill: $root.colorCourse(data.courseName).solid}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="uim-tertiary" d="M14,18H5c-1.65611-0.00181-2.99819-1.34389-3-3V9c0.00181-1.65611,1.34389-2.99819,3-3h9c1.65611,0.00181,2.99819,1.34389,3,3v6C16.99819,16.65611,15.65611,17.99819,14,18z"></path><path class="uim-primary" d="M21.89465,7.55359c-0.24683-0.49432-0.8476-0.69495-1.34192-0.44812l-3.56421,1.7821C16.98999,8.92572,16.99994,8.96149,17,9v6c-0.00006,0.03851-0.01001,0.07428-0.01147,0.11243l3.56421,1.7821C20.69165,16.96381,20.84479,16.99994,21,17c0.55212-0.00037,0.99969-0.44788,1-1V8C21.99994,7.84503,21.96387,7.6922,21.89465,7.55359z"></path></svg>
				<span style="height: 18px;" class="f-c cd-dashconferences-item-title">{{data.courseName.slice(0,22)}}</span>
				<span style="height: 18px;" class="f-c cd-dashconferences-item-message-notinit">EN ESPERA...</span>
				<b v-if="isBegin" class="acd-fadeOut" style="animation-iteration-count: infinite; animation-duration: 2s; animation-name: fadeOut2;"></b>
			</div>
			<v-box s=.5></v-box>
			<section v-if="countdown" style="background: var(--panel-light);line-height: .8rem; height: 30px; width: 100%; border-radius: var(--rounded); font-size: .8rem; justify-content: center" class="f-start">
				<span>{{isBegin ? 'Fin: ': ''}}</span>
				<vcd-countdown2 :date="isBegin ? data.dateEnd: data.dateBegin"></vcd-countdown2>
			</section>
		</a>
	`,
	props: {data: Object, countdown: Boolean},
	computed: {
		isBegin(){
			return this.$root.now > (new Date(this.data.dateBegin)).getTime()
		}
	}
})
Vue.component('vcd-gallery-string', {
	template: /*HTML*/`
	<div v-if="data.length" class="cd-gallery-string">
		<span v-for="(course, i) of data" :style="{opacity: i == position ? 1: 0}">{{$root.removeGroupsText(course.title)}}</span>
	</div>
	`,
	data(){
		return {
			position: 0
		}
	},
	props: ['data'],
	mounted(){
		if (this.data.length) setInterval(() => {this.position = (this.position + 1) % this.data.length}, 2000)
	}
})
Vue.component('vcd-info-notify',{
	template: /*HTML */`
		<div class="cd-info-notify" :class="{'active-element': $root.moduleActiveId == 'md_schedule_2'}" v-if="$root.schedule.data.length && (info.current.length + info.next.length > 0)" @click="$root.openPanel = true; $root.moduleActiveId = 'md_schedule_2'">
			<div class="cd-btn" style="width: 36px; border-radius: 0.5rem;">
				<svg width="2.4rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22,9H2V6c0-1.65685,1.34315-3,3-3h14c1.65685,0,3,1.34315,3,3V9z" class="uim-tertiary"></path><path d="M2,19c0.00183,1.65613,1.34387,2.99817,3,3h14c1.65613-0.00183,2.99817-1.34387,3-3V9H2V19z" class="uim-quaternary"></path><path d="M7,7C6.44772,7,6,6.55228,6,6V2c0-0.55228,0.44772-1,1-1s1,0.44772,1,1v4C8,6.55228,7.55228,7,7,7z M17,7c-0.55228,0-1-0.44772-1-1V2c0-0.55228,0.44772-1,1-1s1,0.44772,1,1v4C18,6.55228,17.55228,7,17,7z" class="uim-primary"></path><circle cx="7" cy="13" r="1" class="uim-primary"></circle><circle cx="17" cy="13" r="1" class="uim-primary"></circle><circle cx="12" cy="13" r="1" class="uim-primary"></circle><circle cx="12" cy="17" r="1" class="uim-primary"></circle><circle cx="7" cy="17" r="1" class="uim-primary"></circle><circle cx="17" cy="17" r="1" class="uim-primary"></circle></svg>
			</div>
			<v-box s=".5"></v-box>
			<div class="cd-info-notify-currenteCourse cd-info-notify-course" style="flex: 1" v-show="info.current.length && (!next || info.next.length == 0)">
				<div style="font-size: .8rem; color: var(--success);">CURSO ACTUAL</div>
				<vcd-gallery-string :data="info.current"></vcd-gallery-string>
			</div>
			<div class="cd-info-notify-nextCourse cd-info-notify-course" v-if="info.next.length && (next || info.current.length == 0)">
				
				<div style="font-size: .8rem; color: var(--text-default);">SIGUIENTE CURSO: <vcd-countdown2 :date="info.next[0].start"></vcd-countdown2></div>
				<vcd-gallery-string :data="info.next"></vcd-gallery-string>
			
			</div>
		
			<a class="cd-notify-nextinfo f-c" href="#" @click="next = !next" v-show="info.current.length && info.next.length">
				<svg style="height:24px" viewBox="0 0 24 24" v-if="next">
					<path fill="#FFF" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
				</svg>
				<svg style="height:24px" viewBox="0 0 24 24" v-else>
					<path fill="#FFF" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
				</svg>
			</a>
		</div>
	`,
	data(){
		return {
			next: false
		}
	},
	computed: {
		info(){
			const now = new Date(this.$root.now)
			const courses = {}
			let courseNext = []
			let courseCurrent = []
			//OBTENEMOS LOS CURSOS QUE CORRESPONDEN AL DIA ACTUAL Y LUEGO LO ORDENAMOS POR FECHA DE INICIO
			let list = JSON.parse(JSON.stringify(this.$root.schedule.data)).map(e=>{
				let [startRef, endRef] = [new Date(e.start), new Date(e.end)]
				let [start, end] = [this.addDays(this.$root.now, startRef.getDay() - now.getDay()), this.addDays(this.$root.now, endRef.getDay() - now.getDay())]
				start.setHours(startRef.getHours(),startRef.getMinutes(),0,0)
				end.setHours(endRef.getHours(),endRef.getMinutes(),0,0)
				
				e.start = start.getTime()
				e.end = end.getTime()
				return e
			}).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
			
			//AÑADIMOS ALGUNOS CURSOS DE LA SEMANA SIGUIENTE
			let courseNextWeek = list.filter((e, i)=> i < 4).map(e=>{
				let new_e = {...e}
				new_e.start = this.addDays(new_e.start, 7).getTime()
				new_e.end = this.addDays(new_e.end, 7).getTime()
				return new_e
			})
			list = list.concat(courseNextWeek)
			
			list.forEach(i => {

				//BUSQUEDA DE TODOS LOS PROXIMOS CURSOS
				if (courses[i.start] == undefined) courses[i.start] = []
				courses[i.start].push(i)

				//BUSQUEDA DEL CURSO ACTIVO
				const [dStart, dEnd] = [new Date(i.start), new Date(i.end)]
				if (
					dStart.getHours() <= now.getHours() && 
					dEnd.getHours() > now.getHours() &&
					dStart.getDay() == now.getDay()
				) courseCurrent.push(i)
				
			});
			//BUSQUEDA DEL PROXIMO CURSO
			for (const i in courses) {
				if (i > now.getTime()) {
					courseNext = courses[i]
					break
				}
			}



			return {current: courseCurrent, next: courseNext}
		}
	},
	methods: {
		addDays(date, days) {
			const result = new Date(date);
			result.setDate(result.getDate() + days);
			return result;
		},
		isTomorrow(datetime){
			return new Date(datetime).getDay() == new Date(this.$root.now).getDay() + 1
		},
	}
})
Vue.component('vcd-dashconferences', {
	template: /*html*/
	`<div class="cd-dashconferences" v-if="data.length">
		<vcd-dashconferences-item v-for="conference of data" :data="conference" :countdown="countdown"></vcd-dashconferences-item>
	</div>`,
	props: {data: Object, countdown: Boolean}
})
Vue.component('vcd-date', {
	template: /*HTML */
	`<div class="cd-date">
		<div class="cd-date-month f-c">
			<span v-if="isAfter">Ahora</span>
			<span v-else-if="isToday">Hoy</span>
			<span v-else>{{day}} {{month}}</span>
		</div>
		<div class="cd-date-time f-c">{{hour}}</div>
	</div>
	`,
	props: ['date'],
	computed: {
		hour(){
			const date = new Date(this.date)
			return (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + (date.getHours() > 11? 'pm' : 'am')
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
Vue.component('vcd-countdown2', {
	template: /*HTML */`<span>En {{dateCalcule}}</span>`,
	props: ['date'],
	computed: {
		dateCalcule(){
			const now = this.$root.now
			const distance = ((typeof this.date) == 'object' ? this.date: new Date(this.date)).getTime() - now;
			
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
			return distance < 0 ? '0m 0s' : (days ? days + "d ": '') + (hours + days ? hours + "h " : '') + (days ? '' : minutes + "m ") + (days + hours ? '' :seconds + 's')
		}
	}
})
Vue.component('vcd-notification',{
	template: /*HTML */`
		<div class="cd-notification"  :style="{fill: $root.colorCourse(notification.course).solid}" style="display: grid; grid-template-columns: auto 1fr; gap: 1rem">
			<div>
				<svg style="width: 2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18,13.18463V10c0-3.31372-2.68628-6-6-6s-6,2.68628-6,6v3.18463C4.83832,13.59863,4.00146,14.69641,4,16v2c0,0.00037,0,0.00073,0,0.00116C4.00031,18.5531,4.44806,19.00031,5,19h14c0.00037,0,0.00073,0,0.00116,0C19.5531,18.99969,20.00031,18.55194,20,18v-2C19.99854,14.69641,19.16168,13.59863,18,13.18463z" class="uim-tertiary"></path><path d="M8.14233 19c.4472 1.72119 1.99689 2.99817 3.85767 3 1.86078-.00183 3.41046-1.27881 3.85767-3H8.14233zM12 4c.34149 0 .67413.03516 1 .08997V3c0-.55231-.44769-1-1-1s-1 .44769-1 1v1.08997C11.32587 4.03516 11.65851 4 12 4z" class="uim-primary"></path></svg>
			</div>
			<div>
				<div>{{notification.course}}</div>
				<div style="font-size: .7rem; margin-top: -.25rem">Publicado {{notification.dateBeginHuman}}</div>
				
				<v-box s=".5" flex></v-box>
				<div>{{notification.title}}</div>
				<div v-if="notification.title != notification.content" style="font-size: .8rem" v-html="notification.content"></div>
			</div>
			<div class="cd-notification-close f-c" v-if="notification.state" @click="notification.state = false">
				<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
			</div>
		</div>
	`,
	props: ['notification'],
})