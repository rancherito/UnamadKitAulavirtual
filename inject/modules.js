Vue.component('vcd-exam', {
	template: /*html */
	`
	<div class="cd-list">
		<div class="cd-list-time">
			<vcd-btn minimizeApp :href="$root.protocol + '://aulavirtual.unamad.edu.pe/web/evaluations/ListAllTests?s=' + data.sectionId"></vcd-btn>
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
				<vcd-btn-icon v-if="data.homeworkstds" class="cd-bg-success" icon="mdi-check" minimizeApp :href="$root.protocol + '://aulavirtual.unamad.edu.pe/web/homework?s=' + data.sectionId">
					<svg-mdi path="M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z"></svg-mdi>
				</vcd-btn-icon>
				<vcd-btn-icon v-else minimizeApp class="acd-waves" :href="$root.protocol + '://aulavirtual.unamad.edu.pe/web/homework?s=' + data.sectionId">
					<svg-mdi path="M14,7H10V2.1C12.28,2.56 14,4.58 14,7M4,7C4,4.58 5.72,2.56 8,2.1V7H4M14,12C14,14.42 12.28,16.44 10,16.9V18A3,3 0 0,0 13,21A3,3 0 0,0 16,18V13A4,4 0 0,1 20,9H22L21,10L22,11H20A2,2 0 0,0 18,13H18V18A5,5 0 0,1 13,23A5,5 0 0,1 8,18V16.9C5.72,16.44 4,14.42 4,12V9H14V12Z"></svg-mdi>
				</vcd-btn-icon>
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
				<vcd-btn-icon v-if="data.participations" minimizeApp class="cd-bg-success" :href="$root.protocol + '://aulavirtual.unamad.edu.pe/web/forum/details?f=' + data.forumId + '&s=' + data.sectionId">
					<svg-mdi path="M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z"></svg-mdi>
				</vcd-btn-icon>
				<vcd-btn-icon class="acd-waves" v-else minimizeApp :href="$root.protocol + '://aulavirtual.unamad.edu.pe/web/forum/details?f=' + data.forumId + '&s=' + data.sectionId">
					<svg-mdi path="M14,7H10V2.1C12.28,2.56 14,4.58 14,7M4,7C4,4.58 5.72,2.56 8,2.1V7H4M14,12C14,14.42 12.28,16.44 10,16.9V18A3,3 0 0,0 13,21A3,3 0 0,0 16,18V13A4,4 0 0,1 20,9H22L21,10L22,11H20A2,2 0 0,0 18,13H18V18A5,5 0 0,1 13,23A5,5 0 0,1 8,18V16.9C5.72,16.44 4,14.42 4,12V9H14V12Z"></svg-mdi>
				</vcd-btn-icon>
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
			<vcd-btn-icon v-if="isBegin" class="acd-waves" :href="data.url" target="_blank">
				<svg-mdi path="M14,7H10V2.1C12.28,2.56 14,4.58 14,7M4,7C4,4.58 5.72,2.56 8,2.1V7H4M14,12C14,14.42 12.28,16.44 10,16.9V18A3,3 0 0,0 13,21A3,3 0 0,0 16,18V13A4,4 0 0,1 20,9H22L21,10L22,11H20A2,2 0 0,0 18,13H18V18A5,5 0 0,1 13,23A5,5 0 0,1 8,18V16.9C5.72,16.44 4,14.42 4,12V9H14V12Z"></svg-mdi>
			</vcd-btn-icon>
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
				
				<div style="flex: 1">
					<div style="font-size: .8rem;font-weight: bold;color: var(--success);">CURSO ACTUAL</div>
					<div v-for="course in info.current">{{$root.removeGroupsText(course.title)}}</div>
				</div>
				
			</div>
			<div class="cd-info-notify-nextCourse cd-info-notify-course" v-if="info.next.length && (next || info.current.length == 0)">
				
				<div style="display: flex; flex: 1">
					<div style="flex: 1">
						<div style="font-size: .8rem;font-weight: bold;color: var(--text-default);">SIGUIENTE CURSO EN: {{dateViewStart(info.next[0].start)}}</div>
						<div v-for="course in info.next">{{$root.removeGroupsText(course.title)}}</div>
					</div>
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
Vue.component('cd-schedule-2', {
	template: /*html*/`
	<div style="position: relative; height: 100%">
		<div class="f-end" style="right: 1rem; top: -4rem; position: absolute">
			<a class="cd-btn" href="#" @click="$root.schedule.default = !$root.schedule.default">
				
				<span style="padding-right: .5rem">{{$root.schedule.default ? 'General' : 'Dias'}}</span>
				<svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="$root.schedule.default">
					<path d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3" />
				</svg>
				<svg style="width:24px;height:24px" viewBox="0 0 24 24" v-else>
					<path d="M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9" />
				</svg>
			</a>
		</div>
			
		<div style="height: 100%; padding: 1rem; overflow-y: auto">
			
			<div v-if="$root.schedule.default">
				<div style="display: grid; grid-template-columns: repeat(5, 1fr); width: calc(100% - 60px - .5rem);gap: 0.5rem; margin-bottom: .5rem; margin-left: calc(60px + .5rem)">
					<div class="f-c" v-for="(day, i) of days" :class="{'cd-schedule-per-day-active-day': currentdDay == i + 1}" @click="selectedDay = i + 1" style="cursor: pointer;flex: 1; height: 32px; border-radius: var(--rounded2); color: white" :style="{background: selectedDay == i + 1 ? 'var(--primary)' : 'var(--panel)'}">{{day}}</div>
				</div>
				
				<div style="display: flex" v-if="currentSchedule.timesSchedule.length">
					<div style="padding-right: 0.5rem">
						<div class="f-c" v-for="time of currentSchedule.timesSchedule" style="height: 40px; width: 60px;">
							<div class="c" style="border: 1px solid var(--secondary); border-radius: var(--rounded2); padding: .25rem .5rem; width: 100%">{{time12(time)}}</div>
						</div>
					</div>
					<section style="flex: 1; padding-top: 20px">
						<div v-for="(group, ix) of currentSchedule.schedule" :style="{height: 40 * group.sizeStack + 'px'}" style="display: flex">
							<div class="f-c c" style="flex: 1 1 0px; height: 100%; padding: 2px 0 0 2px" v-for="courseName of group.courses" :style="{'padding-top': ix == 0 ? 0 : '2px'}">
								<div class="f-c" style="height: 100%; width: 100%; border-radius: var(--rounded); padding: 0.5rem; color: white" :style="{background: $root.colorCourse(courseName), 'font-size': 1 + (group.courses.length > 1 ? -.3 : 0) + (group.sizeStack > 1? .2 : 0) + 'rem'}">
									{{$root.removeGroupsText(courseName)}}
								</div>
							</div>
						</div>
					</section>
					
				</div>
				<div v-else class="f-c">
					<v-box s="4"></v-box>
					<svg style="width:6rem" viewBox="0 0 24 24">
						<path fill="#fff" d="M19,4H18V2H16V4H8V2H6V4H5A2,2 0 0,0 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6A2,2 0 0,0 19,4M19,20H5V10H19V20M5,8V6H19V8H5M8.23,17.41L9.29,18.47L11.73,16.03L14.17,18.47L15.23,17.41L12.79,14.97L15.23,12.53L14.17,11.47L11.73,13.91L9.29,11.47L8.23,12.53L10.67,14.97L8.23,17.41Z" />
					</svg>
					<v-box s="1"></v-box>
					<span class="c" style="font-size: 1.2rem">El día de hoy</span>
					<span class="c" style="font-size: 1.2rem">no tiene actvidades pendientes</span>
				</div>
			</div>
			
			<cd-schedule v-else></cd-schedule>
		</div>
	</div>
		
	`,
	data(){
		return {
			selectedDay: new Date(this.$root.now).getDay(),
			currentdDay: new Date(this.$root.now).getDay(),
			days: ['LU', 'MA', 'MI', 'JU', 'VI']
		}
	},
	computed: {
		currentSchedule(){
			let currentSchedule = [...this.$root.schedule.data]
			.filter(e => e.startNormalized?.day == this.selectedDay)

			let times = [], timesSchedule = [], schedule = []
			currentSchedule.forEach(e => {
				for (let i = 0; i < e.endNormalized.hour - e.startNormalized.hour; i++) if(!times.find(ee => ee == e.startNormalized.hour + i)) times.push(e.startNormalized.hour + i)
			})
			times.sort()
			if(times.length) for (let i = times[0]; i <= times[times.length - 1]; i++) timesSchedule.push(i)

			timesSchedule.forEach(e => {
				schedule.push({
					hourStart: e,
					hourEnd: e + 1,
					sizeStack: 1,
					courses: JSON.parse(JSON.stringify(currentSchedule)).filter(ee => e >= ee.startNormalized.hour && e < ee.endNormalized.hour).map(ee => {return ee.title}).sort(e=>e.localeCompare(e))
				})
			})
			for (let i = 0; i < schedule.length - 1; i++) {
				if (schedule[i].courses.join('') == schedule[i + 1].courses.join('')) {
					schedule[i].sizeStack++
					schedule[i].hourEnd = schedule[i + 1].hourEnd
					schedule.splice(i + 1, 1)
					i--
				}
			}
			if(timesSchedule.length) timesSchedule.push(timesSchedule[timesSchedule.length - 1] + 1)
			console.log(timesSchedule);
			return {schedule, timesSchedule}
		}
	},
	mounted(){
		//this.selectedDay = 
	},
	methods: {
		time12(hour){
			const hour12 = (hour > 12 ? hour - 12 : hour)
			return /*(hour12 >= 10 ? '' : '0') +*/ hour12 + (hour > 11? 'pm' : 'am')
		},
	}
})
Vue.component('cd-schedule', {
	template: /*HTML*/
	`
		<div>
			<div v-if="$root.schedule.data.length" class="cd-schedule">
				<div class="cd-schedule-head">
					<div :class="{'cd-schedule-head-day-active': (new Date(now)).getDay() == i + 1}" v-for="(day, i) of $root.days" class="f-c cd-schedule-head-day">
						<span class="f-c">{{day}}</span>
					</div>
				</div>
				<div class="cd-schedule-body" :style="{'max-height': (scheduleTimes.hours.length * 20) + 'px'}">
					<div class="cd-schedule-courses">
						<div style="width: 100%; display: flex">
							<div class="cd-schedule-day" :class="{'cd-schedule-day-active': (new Date(now)).getDay() == i}" v-for="(day, i) in scheduleTimes.schedule">
								<div v-for="(courses, hour) in day"  v-if="courses.size" :style="{'max-height': (courses.size * 20) + 'px', height: (courses.size * 20) + 'px'}">
									<div v-for="course in courses.courses" class="cd-schedule-course" :style="{'max-width': (100/courses.courses.length) + '%', 'width': (100/courses.courses.length) + '%'}">
										
										<span 
											class="f-c cd-schedule-course-item"
											:style="{'background': $root.colorCourse(course.title)}"
										>
											{{time12(new Date(course.start).getHours())}}-{{time12(parseInt(hour)+1)}}
										</span>
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</div>
				
			</div>
			
			<v-box></v-box>
			<div v-if="$root.schedule.data.length">
				<div class="f-start" v-for="course of $root.courses.list">
					<span style="height: 1rem; width: 1rem; background-color: var(--panel)" :style="{'background-color': $root.colorCourse(course.name)}"></span>
					<v-box s=".5"></v-box>
					<span style="flex: 1">{{course.name}}</span>
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
Vue.component('vcd-info',{
	template: /* HTML */
	`
	<vcd-autoScroll padding="0 1rem">
		<div class="cd-list">
			<div class="cd-list-content">
				Notas Version: 1.0.11<br><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Nuevo diseño de tema.</span><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Botón de inicio y cerrar sesión en el nuevo tema.</span><br>
				<span><i class="mdi mdi-plus cd-text-primary mdi-24px"></i> Cuenta regresiva del próximo curso a iniciarce en el horario.</span><br>
				<span><i class="mdi mdi-auto-fix cd-text-primary mdi-24px"></i> Corrección de colores.</span><br>
				<span><i class="mdi mdi-auto-fix cd-text-primary mdi-24px"></i> Corrección al momento de sincronizar horario del estudiante.</span><br>
			</div>
		</div>
		<div class="cd-list">
			<div class="cd-list-content">
				Notas Version: 1.0.0 alpha<br><br>
				<span><i class="mdi mdi-information cd-text-primary mdi-24px"></i> Lanzamiento oficial de la extensión.</span><br>
				<span><i class="mdi mdi-auto-fix cd-text-primary mdi-24px"></i> Corrección de visualizacion de foros que desaparecian aún cuando no han finalizado.</span><br>
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
				<div class="cd-dialog-content">
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