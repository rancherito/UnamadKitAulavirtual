
const styleAula = `
<style>
</style>
`

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
Vue.component('vcd-void-box',{
	template: /*HTML */
	`<div v-else class="f-c" style="height: 100%">
		<i class="mdi mdi-spider-thread" style="font-size: 5rem"></i>
		<span class="ff-secodary" style="font-size: 2rem; padding-top: 4rem">No hay {{text}} disponibles</span>
	</div>
	`,
	props: {text: 'actividades'}
})
Vue.component('vcd-btn', {
	template: /*HTML */
	`<a @click="launchEvents" class="mdl-button mdl-button--raised mdl-button--colored" :class="'cd-btn-' + type">
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
			if (this.minimizeApp) this.$root.moduleActiveId = 0
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
Vue.component('vcd-exam', {
	template: /*html */
	`
	<div class="cd-list">
		<div class="cd-list-time">
			<vcd-btn minimizeApp class="acd-waves" :href="$root.protocol + '://aulavirtual.unamad.edu.pe/web/evaluations/ListAllTests?s=' + data.sectionId"></vcd-btn>
		</div>
		<div class="cd-list-content">
			<div class="cd-list-title">{{data.title}}</div>
			<div class="cd-list-subtitle" :style="{color: $root.colorCourse(data.nameCourse)}">CURSO: {{data.nameCourse}}</div>
			<div class="cd-list-subtitle2">
				Intentos: {{data.intent}}
			</div>
		</div>
	</div>
	`,
	props: ['data']
})
Vue.component('vcd-homework', {
	template: /* HTML */
	`
	<div class="cd-list">
		<div class="cd-list-time">
			<template v-if="isBegin">
				<vcd-btn v-if="data.homeworkstds" class="cd-bg-success" icon="mdi-check" minimizeApp :href="$root.protocol + '://aulavirtual.unamad.edu.pe/web/homework?s=' + data.sectionId"></vcd-btn>
				<vcd-btn v-else minimizeApp class="acd-waves" :href="$root.protocol + '://aulavirtual.unamad.edu.pe/web/homework?s=' + data.sectionId"></vcd-btn>
			</template>
			<vcd-date v-else :date="data.dateBeginCustom"></vcd-date>
		</div>
		
		<div class="cd-list-content">
			
			<div class="cd-list-title">{{data.title}}</div>
			<!--<div class="cd-list-description" v-html="homework.description"></div>-->
			<div class="cd-list-subtitle" :style="{color: $root.colorCourse(data.nameCourse)}">CURSO: {{data.nameCourse}}</div>
			<div class="cd-list-subtitle2">
				{{data.isGroup ? 'GRUPAL':'INDIVIDUAL'}} | Intentos: {{data.intents - data.homeworkstds}}/{{data.intents}} | <a @click="$root.minimizeApp" class="cd-small-chip" :href="$root.protocol + '://aulavirtual.unamad.edu.pe/web/homework?s=' + data.sectionId">Ver tareas<a>
			</div>
			
		</div>
		<div class="cd-list-access">
			<vcd-countdown :dateEnd="data.dateEndCustom" :dateStart="data.dateBeginCustom"></vcd-countdown>
		</div>
		
	</div>
	`,
	props: ['data'],
	computed: {
		isBegin(){
			const [now, date] = [this.$root.now, (new Date(this.data.dateBeginCustom)).getTime()]
			return now > date
		}
	}
})
Vue.component('vcd-forums', {
	template: /*HTML*/
	`
	<div class="cd-list">
		<div class="cd-list-time">
			<template v-if="isBegin">
				<vcd-btn v-if="data.participations" minimizeApp class="cd-bg-success" icon="mdi-check" :href="$root.protocol + '://aulavirtual.unamad.edu.pe/web/forum/details?f=' + data.forumId + '&s=' + data.sectionId"></vcd-btn>
				<vcd-btn v-else minimizeApp class="acd-waves" :href="$root.protocol + '://aulavirtual.unamad.edu.pe/web/forum/details?f=' + data.forumId + '&s=' + data.sectionId"></vcd-btn>
			</template>
			<vcd-date v-else :date="data.dateBegin"></vcd-date>
		</div>
		<div class="cd-list-content">
			<div class="cd-list-title">{{data.name}}</div>
			<div class="cd-list-subtitle" :style="{color: $root.colorCourse(data.nameCourse)}">CURSO: {{data.nameCourse}}</div>
		</div>
		<div class="cd-list-access">
			<vcd-countdown :dateEnd="data.dateEnd" :dateStart="data.dateBegin"></vcd-countdown>
		</div>
	</div>
	`,
	props: ['data'],
	computed: {
		isBegin(){
			const [now, date] = [this.$root.now, (new Date(this.data.dateBegin)).getTime()]
			return now > date
		}
	},
	mounted(){
	}
})
Vue.component('vcd-conference', {
	template: /*HTML*/
	`
	<div  class="cd-list">
		<div class="cd-list-time">
			<vcd-btn v-if="isBegin" class="acd-waves" :href="data.url" target="_blank"></vcd-btn>
			<vcd-date v-else :date="data.startTime"></vcd-date>
		</div>

		<div class="cd-list-content">
			<div class="cd-list-title">{{data.title}}</div>
			<div class="cd-list-subtitle" :style="{color: $root.colorCourse(data.nameCourse)}">CURSO: {{data.nameCourse}}</div>
		</div>
		<div class="cd-list-access">
			<vcd-countdown :dateEnd="data.endTime" :dateStart="data.startTime"></vcd-countdown>
		</div>
	</div>
	`,
	props: ['data'],
	computed: {
		isBegin(){
			const [now, date] = [this.$root.now, (new Date(this.data.startTime)).getTime()]
			return now > date
		}
	}
})
Vue.component('vcd-info-notify',{
	template: /*HTML */`
		<div class="cd-info-notify" v-if="$root.schedule.data.length && (info.current.length + info.next.length > 0)">
			<div class="cd-info-notify-currenteCourse cd-info-notify-course" style="margin-bottom: 2px" v-show="info.current.length && (!next || info.next.length == 0)">
				<i class="mdi mdi-alarm-check f-c"></i>
				<div style="flex: 1">
					<div style="font-size: .8rem;font-weight: bold;color: var(--success);">CURSO ACTUAL</div>
					<div v-for="course in info.current">{{$root.removeGroupsText(course.title)}}</div>
				</div>
				
			</div>
			<div class="cd-info-notify-nextCourse cd-info-notify-course" v-if="info.next.length && (next || info.current.length == 0)">
				<i class="mdi mdi-calendar-end f-c"></i>
				<div style="display: flex; flex: 1">
					<div style="flex: 1">
						<div style="font-size: .8rem;font-weight: bold;color: var(--text-default);">SIGUIENTE CURSO</div>
						<div v-for="course in info.next">{{$root.removeGroupsText(course.title)}}</div>
					</div>
					<div class="cd-countdown f-c" style="margin-left: .5rem">
						Inicia en
						<span>{{dateViewStart(info.next[0].start)}}</span>
					</div>
				</div>
				
			</div>
			<a class="cd-notify-nextinfo f-c" href="#" @click="next = !next" v-show="info.current.length && info.next.length">
				<i class="mdi" :class="next? 'mdi-chevron-left':  'mdi-chevron-right'"></i>
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
			const list = [...this.$root.schedule.data.filter(e => (new Date(e.start)).getDay() == now.getDay())].sort((a, b) => a.start.localeCompare(b.start))
			

			list.forEach(i => {

				//BUSQUEDA DEL PROXIMO CURSO
				if (courses[i.start] == undefined) courses[i.start] = []
				courses[i.start].push(i)

				//BUSQUEDA DEL CURSO ACTIVO
				const [dStart, dEnd] = [new Date(i.start), new Date(i.end)]
				if (dStart.getHours() <= now.getHours() && dEnd.getHours() > now.getHours()) {
					courseCurrent.push(i)
				}
			});

			for (const i in courses) {
				const CourseFound = new Date(i);
				if ((CourseFound.getHours() * 60 * 60 ) + (CourseFound.getMinutes() * 60 ) + CourseFound.getSeconds()  > (now.getHours() * 60 * 60 ) + (now.getMinutes() * 60 ) + now.getSeconds()) {
					courseNext = courses[i]
					break
				}
			}



			return {current: courseCurrent, next: courseNext}
		}
	},
	methods: {
		
		dateViewStart(date){
			
			const now = this.$root.now

			let dateNow = new Date(now)
			let dateCourse = new Date(date)

			dateNow.setHours(dateCourse.getHours(), dateCourse.getMinutes(), 0, 0)

			const distance = dateNow.getTime() - now;
			
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
			return distance < 0 ? '0m 0s' : (days ? days + "d ": '') + (hours + days ? hours + "h " : '') + (days ? '' : minutes + "m ") + (days + hours ? '' :seconds + 's')
		},
	}
})
Vue.component('cd-schedule', {
	template: /*HTML*/
	`
	<div id="modalschedule" style="display: none;">
		<div class="cd-schedule-container f-c">
			<div v-if="$root.schedule.data.length" class="cd-schedule">
				<div class="cd-schedule-head">
					<div style="width: 60px; background: var(--bg)"></div>
					<div v-for="(day, i) of $root.days" class="f-c" style="width: calc(20% - (60px / 5))" >
						<span :style="{background: (new Date(now)).getDay() == i + 1? 'var(--primary)' : 'transparent'}" class="f-c">{{day}}</span>
					</div>
				</div>
				<div class="cd-schedule-body" :style="{'max-height': (scheduleTimes.hours.length * 40) + 'px'}">
					<div class="cd-schedule-hours">
						<span v-for="(hour, h) in scheduleTimes.hours" class="f-c" style="height: 40px; max-height: 40px; min-height: 40px">
							<b style="transform: translateY(-50%)">{{time12(hour)}}</b>
						</span>
					</div>
					<div class="cd-schedule-courses">
						<div style="width: 100%; display: flex">
							<div class="cd-schedule-day" v-for="(day, i) in scheduleTimes.schedule" :style="{background: (new Date(now)).getDay() == i? 'var(--panel)' : 'transparent'}">
								<div v-for="(courses, hour) in day"  v-if="courses.size" :style="{'max-height': (courses.size * 40) + 'px', height: (courses.size * 40) + 'px'}">
									<div v-for="course in courses.courses" class="cd-schedule-course" :class="{'cd-schedule-dcourse' :courses.courses.length > 1}" :style="{'max-width': (100/courses.courses.length) + '%', 'width': (100/courses.courses.length) + '%'}">
										
										<span 
											class="f-c cd-schedule-course-item"
											:style="{background: $root.colorCourse(course.title), position: isActiveCourse(courses, i) ? 'relative' : 'inherit'}" 
											:class="{'acd-waves': isActiveCourse(courses, i)}"
										>
												{{$root.removeGroupsText(course.title)}}
										</span>
										<b class="cd-schedule-course-time">{{time12(new Date(course.start).getHours())}}-{{time12(parseInt(hour)+1)}}</b>
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</div>
				
			</div>
			<div v-else class="cd-schedule-info f-c">
				<h1 style="text-align: center"> <i class="mdi mdi-school"></i> </h1>
				<h5 style="text-align: center">Sincronización de horario académico</h5>
				<p style="text-align: center">
					Para sincronizar tu horario académico ve a <a target="_blank" :href="$root.protocol + '://intranet.unamad.edu.pe/'" style="color: var(--primary)">intranet.unamad.edu.pe</a> e inicia sesión. En la parte superior derecha habra un indicador que te avisara si ya se sincronizo los datos,
					cuando hayas terminado regresa a tu aula virtual y recarga la página.
				</p>
			</div>
		</div>
		
	</div>
	`,
	data(){
		return {
			now: this.$root.now
		}
	},
	methods: {
		isActiveCourse(course, iteration){
			return (new Date(this.now)).getHours() >= course.init && (new Date(this.now)).getHours() < course.end && (new Date(this.now)).getDay() == iteration
		},
		time12(hour){
			const hour12 = (hour > 12 ? hour - 12 : hour)
			return /*(hour12 >= 10 ? '' : '0') +*/ hour12 + (hour > 11? 'pm' : 'am')
		},
	},
	computed: {
		scheduleTimes(){
			let times2 = [], h = {}, times3 = []

			this.$root.schedule.data.forEach(course => {
				let [s, e] = [(new Date(course.start)).getHours(), (new Date(course.end)).getHours()]
				for (let i = 0; i < e - s; i++) if (!times2.find(e => e == s + i)) times2.push(s + i)
			})
			times2.sort((a, b) => a - b)
			if(times2.length) for (let i = times2[0]; i <= times2[times2.length - 1] + 1; i++) times3.push(i)
			

			for (let i = 1; i <= 5; i++) {
				h[i] = {}
				times3.forEach(e => {
					let tem = [...this.$root.schedule.data].filter(course => {
						const [dateS, dateE] = [new Date(course.start), new Date(course.end)]
						return dateS.getDay() == i && (e >= dateS.getHours() && e < dateE.getHours())
					})
					h[i][e] = {size: 1, courses: tem, init: e, end: e + 1}
				})

				for (let ii = 0; ii < times3.length - 1; ii++) {
					const [currentTime, afterTime] = [h[i][times3[ii]], h[i][times3[ii + 1]]];
					if (
						times3[ii] + 1 == times3[ii + 1] && 
						currentTime.courses.length == afterTime.courses.length &&
						[...currentTime.courses].sort((a,b) => a.title > b.title ? 1 : -1).reduce((a, b) => a + b.title, '') == [...afterTime.courses].sort((a,b) => a.title > b.title ? 1 : -1).reduce((a, b) => a + b.title, '')
					) {
						afterTime.size += currentTime.size
						afterTime.init -= currentTime.size
						currentTime.size = 0
					}
				}
			}

			return {schedule: h, hours: times3};
		}
	}
})
Vue.component('vcd-tabbox',{
	template: /*HTML */
	`
	<div class="cd-nav-btn-content f-c">
		<a :id="'tabbox_' + tabid" href="#" class="cd-nav-btn" :class="$root.tabposition == tabid ? 'active' : ''" @click="$root.tabposition = tabid">
			<div>
				<b v-if="counter">{{counter}}</b>
				<i class="mdi" :class="icon"></i>
			</div>
			<span>{{text}}</span>
		</a>
		<div class="mdl-tooltip mdl-tooltip--top" :data-mdl-for="'tabbox_' + tabid">{{text}}</div>
	</div>
	`,
	props: {
		tabid: String, 
		text: {default: 'tab name'}, 
		icon: {default: 'mdi-folder-home'}, 
		counter: {default: 0}, 
	}
})
Vue.component('vcd-info',{
	template: /* HTML */
	`
	<vcd-autoScroll padding="0 1rem">
		<div class="cd-list">
			<div class="cd-list-content">
				Notas Version: 1.0.0 alpha<br><br>
				<span><i class="mdi mdi-information cd-text-primary mdi-24px"></i> Lanzamiento oficial de la extensión.</span><br>
				<span><i class="mdi mdi-information cd-text-primary mdi-24px"></i> Corrección de visualizacion de foros que desaparecian aún cuando no han finalizado.</span><br>
			</div>
		</div>
		<div class="cd-list">
			<div class="cd-list-content">
				Notas Version: 0.1.4 beta<br><br>
				<span><i class="mdi mdi-auto-fix cd-text-primary mdi-24px"></i> Corrección de colores del horario.</span><br>
			</div>
		</div>
		<div class="cd-list">
			<div class="cd-list-content">
				Notas Version: 0.1.3 beta<br><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Módulo de exámenes.</span><br>
			</div>
		</div>
		<div class="cd-list">
			<div class="cd-list-content">
				Notas Version: 0.1.2 beta<br><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Sincronización con intranet para extraccion de datos del horario académico.</span><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Módulo de horario académico.</span><br>
			</div>
		</div>
		<div class="cd-list">
			<div class="cd-list-content">
				Notas Version: 0.1.1 beta<br><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Los botones de acceso rápido ahora siempre estarán visibles en la parte derecha de la página.</span><br>
				<span><i class="mdi mdi-minus cd-text-primary mdi-24px"></i> El diseño personalizado automatico se elimino.</span><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Para activar el diseño personalizado se añadio un nuevo botón al lado inferior derecho.</span><br>
				<span><i class="mdi mdi-information cd-text-primary mdi-24px"></i> Actualización de datos cada 130 segundos.</span><br>
				<span><i class="mdi mdi-auto-fix cd-text-primary mdi-24px"></i> Corrección de errores al contabilizar participaciones en foros.</span><br>
			</div>
		</div>
		<div class="cd-list">
			
			<div class="cd-list-content">
				Notas Version: 0.0.5 beta<br><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Añadido de experiencias de usuario(UX), para un mejor manejo de la aplicación.</span><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Uso de color #ec2449 para indicar una actividad pendiente y #8bc34a para indicar una actividad resuelta.</span><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Las actividades resueltas y que estén en estado activo no son contabilizadas.</span><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Al abrir el link de una actividad se minimizará el panel de acceso rápido.</span><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> El link de acceso se movió al lado izquierdo el cual solo se activará cuando inicie la actividad según lo programado por el docente.</span><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Se añadido un calendario al lado izquierdo que indica la fecha de inicio de la actividad.</span><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Se añadió una cuenta regresiva al lado derecho para indicar la fecha de cierre de la actividad.</span><br>

			</div>
		</div>
		<div class="cd-list">
			<div class="cd-list-content">
				Notas Version: 0.0.4 beta<br><br>
				<span><i class="mdi mdi-auto-fix cd-text-primary mdi-24px"></i> Corrección de errores a la hora de visualizar foros.</span><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Integración de API de localStorage para preservar información de manera local.</span><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Integración de API de Fetch que mejora las solicitides al servidor.</span><br>
			</div>
		</div>
		<div class="cd-list">
			<div class="cd-list-content">
				Notas Version: 0.0.3 beta<br><br>
				<span><i class="mdi mdi-auto-fix cd-text-primary mdi-24px"></i> Corrección de peticiones HTTPS que impedian acceder a la api de la web desde HTTP.</span><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Detección de tareas grupales.</span>
			</div>
		</div>
		<div class="cd-list">
			<div class="cd-list-content">
				Notas Version: 0.0.2 beta<br><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Módulos implementados de Cursos, Tareas, Conferencias y Foros.</span><br>
				<span><i class="mdi mdi-information cd-text-primary mdi-24px"></i> Datos recopilados desde la API de esta web.</span><br>
				<span><i class="mdi mdi-information cd-text-primary mdi-24px"></i> Actualización de datos cada 60 segundos.</span><br>
				<span><i class="mdi mdi-information cd-text-primary mdi-24px"></i> Actividades expiradas no se toman en cuenta.</span><br>
			</div>
		</div>
	</vcd-autoScroll>
	`
})
Vue.component('vcd-helper-list',{
	template: /*html */
	`<div style="display: flex; justify-content: space-between; padding-bottom: .5rem">
		<div style="display: flex;">
			<span style="padding: .5rem 1rem; background-color: var(--panel); border-radius: .5rem; margin-right: 2px">Inicia</span>
			<span v-if="archived" style="padding: .5rem 1rem; background-color: var(--panel); border-radius: .5rem">({{archived}}) Por Archivar</span>
		</div>
		<span></span>
	</div>
	`,
	props: {archived: 0}
})
Vue.component('vcd-module',{
	template:/*HTML*/ `
		<div id="modelinject">
			<div class="cd-dialog">
				<div class="cd-dialog-actions-top">
					<div class="mdl-typography--headline" style="color: white">{{title}}</div>
					<div style="display: flex"></div>
				</div>
				<div class="cd-dialog-content" style="flex: 1; position: relative">
					<div style="position: absolute; height: 100%; width: 100%">
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
		
	`,
	props: ['title']
})

Vue.component('vcd-autoScroll', {
	template: /*HTML */`
		<div style="height: 100%; flex: 1">
			<div style="overflowY: auto; height: 100%;" class="cd-scroll-custom"  :style="{padding: padding}"><slot></slot></div>
		</div>
	`,
	props: {
		padding: {default: '0'}
	}
})