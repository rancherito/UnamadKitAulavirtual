
const styleAula = `
<style>
body.theme-dark div[ng-controller=IndexController] > div:nth-child(2){
    display: grid;
    grid-template-areas:
    "a b";
    grid-template-columns: 1fr 500px;
    grid-template-rows: 1fr;
    gap: 1rem;
}
#course-no-mobile{
    max-height: none !important;
    grid-area: a;
}
.page-content>.ng-scope>*:nth-child(2)>.row {
    grid-area: b;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    gap: 1rem;
}
.page-content>.ng-scope>*:nth-child(2)>.row > *{
    width: 100% !important;
    padding: 1rem;
    margin: 0;
}
div[ng-controller=IndexController] .row>.col-md-6.hidden-sm {
    display: none !important;
}
body.theme-dark  #course-no-mobile,
body.theme-dark  div[ng-controller=IndexController] .row>.col-md-6.hidden-sm,
body.theme-dark  .page-content>.ng-scope>*:nth-child(2)>.row{
    padding: 0;
    margin: 0;
    width: 100%;
}

.cd-anunces{
    display: flex;
}
button:focus{
    outline: none !important;
}
.btn.btn-back{
    background-color: var(--web-primary) !important;
}
@media (min-width: 768px) {
    body.theme-dark nav.left-menu {
        border-bottom: 5px solid var(--web-primary) !important;
    }
}
body.theme-dark > nav.left-menu {
    background: var(--panel) !important;
    border-bottom: 5px solid var(--web-primary) !important;
}
.quick-nav-trigger{
    background: var(--panel);
}
nav.top-menu{
    background: #f3f3f3 !important;
}
.box-courses .row.row-labels{
    display: none;
}
.box-courses .img-course {
    padding: 1rem 0;
    margin: 0;
}
.box-courses .img-course img {
    width: 100%;
}
body.theme-dark .title-course {
    white-space: normal;
}
.row-course > a{
    display: flex;
    background: white;
    border-bottom: 1px solid lightgray;
}
body.theme-dark .box-courses {
    max-height: none !important;
}
body.menu-top.menu-static nav.left-menu + nav.top-menu{
	padding: 0 !important;
	height: 56px !important;
}
body.theme-dark .content-dates,
body.theme-dark .content-dates + div,
body.theme-dark .content-Announcement,
body.theme-dark #course-no-mobile,
body.theme-dark .row-body2,
.tool-item,
.item-Announcement,
.desc-box,
.list-student-css,
.item-forum,
.sidebar-panel,
.course-container,
.item-annoucement,
.group-card {
    background-color: white !important;
    border-radius: .5rem;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}
body.theme-dark hr{
    display: none;
}

.row-course>a  > div:nth-child(1){
    padding: 0;
    padding-left: 1rem;
    width: 3rem;
}
.row-course>a>div:nth-child(2) {
    padding: 1rem;
    flex: 1;
}
.row-course>a>div:nth-child(2) .row{
    margin: 0;
}

.box-courses .row-course:not(:last-child){
    margin-bottom: 2px;
}

.cd-icon-rotate::before{
    animation-name: rotateanimation;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

@media (max-width: 768px) {
    .row-course>a>div:nth-child(1) {
        display: none;
    }
}
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
			if (this.minimizeApp) this.$root.menuTabposition = 0
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
Vue.component('vcd-cooldown',{
	template: /*HTML */
	`<div class="cd-cooldown f-c">
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
			<vcd-cooldown :dateEnd="data.dateEndCustom" :dateStart="data.dateBeginCustom"></vcd-cooldown>
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
			<vcd-cooldown :dateEnd="data.dateEnd" :dateStart="data.dateBegin"></vcd-cooldown>
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
			<vcd-cooldown :dateEnd="data.endTime" :dateStart="data.startTime"></vcd-cooldown>
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
	<div>
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
	</div>
	
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