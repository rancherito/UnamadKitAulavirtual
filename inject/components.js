function htmlToElement(html) {var template = document.createElement('template');html = html.trim();template.innerHTML = html;return template.content.firstChild;}
function createStorage(data) {
	const version = 'dbUtilsv0.0.1'
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
	else defdata.variables = JSON.parse(localStorage.getItem(version))
	return defdata
}
Vue.component('vcd-date', {
	template: /*HTML */
	`<div class="cd-list-time-item">
		<i class="mdi mdi-calendar-blank f-c"></i>
		<span>{{day}}</span>
		<b>{{month}}</b>
		<b>{{hour}}</b>
	</div>
	`,
	props: ['date'],
	computed: {
		hour(){
			const date = new Date(this.date)
			return date.getHours() + ':' + date.getMinutes()
		},
		day(){
			return (new Date(this.date)).getDate()
		},
		month(){
			return this.$root.months[(new Date(this.date)).getMonth()]
		}
	}
})
Vue.component('vcd-cooldown',{
	template: /*HTML */
	`<div class="cd-cooldown f-c">{{dateView}}</div>
	`,
	data(){
		return {
			dateView: '0m',
			interval: null
		}
	},
	props: ['date'],
	methods: {
		generate(){
			let countDownDate = new Date(this.date).getTime();
			const now = new Date().getTime();
			const distance = countDownDate - now;
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			this.dateView = (days ? days + "d ": '') + (hours ? hours + "h " : '') + (days ? '' : minutes + "m ") + (days + hours ? '' :seconds + 's');
			if (distance < 0 && this.interval != null) clearInterval(this.interval);
			
		}
	},
	created(){
		
		this.generate()
		this.interval = setInterval(() => {
			this.generate()
		}, 1000);
	}
})
Vue.component('vcd-homework', {
		template: /* HTML */
		`
		<div class="cd-list">
			<div class="cd-list-time">
				<vcd-date :date="data.dateBeginCuston"></vcd-date>
			</div>
			
			<div class="cd-list-content">
				
				<div class="cd-list-title">{{data.title}}</div>
				<!--<div class="cd-list-description" v-html="homework.description"></div>-->
				<div class="cd-list-subtitle">CURSO: {{data.nameCourse}}</div>
				<div class="cd-list-subtitle2">
					{{data.isGroup ? 'GRUPAL':'INDIVIDUAL'}} | Intentos: {{data.intents - data.homeworkstds}}/{{data.intents}}
				</div>
				
			</div>
			<div class="cd-list-access">
				<vcd-cooldown :date="data.dateEndCuston"></vcd-cooldown>
				<a class="mdl-button mdl-button--raised mdl-button--colored" :href="$parent.protocol + '://aulavirtual.unamad.edu.pe/web/homework?s=' + data.sectionId">
					<i class="mdi mdi-link"></i>
				</a>
			</div>
			
		</div>
		`,
		props: ['data']
	})
	
	Vue.component('vcd-forums', {
		template: /*HTML*/
		`
		<div class="cd-list">
			<i class="cd-list-icon mdi mdi-forum"></i>
			<div class="cd-list-content">
				<a v-if="data.differenceTime < 0" class="cd-list-more mdl-button mdl-button--raised mdl-button--colored" :href="$parent.protocol + '://aulavirtual.unamad.edu.pe/web/forum/details?f=' + data.forumId + '&s=' + data.sectionId">Ver</a>
				<div class="cd-list-title">{{data.name}}</div>
				<div class="cd-list-subtitle">CURSO: {{data.nameCourse}}</div>
				<div class="cd-list-subtitle2">Inicia: {{data.dateStartString}}</div>
				
				<div class="cd-list-subtitle2">Termina: {{data.dateEndString}}</div>
			</div>
		</div>
		`,
		props: ['data']
	})
	Vue.component('vcd-conference', {
		template: /*HTML*/
		`
		<div  class="cd-list">
			<i class="cd-list-icon mdi mdi-message-video"></i>
			<div class="cd-list-content">
				<a class="cd-list-more mdl-button mdl-button--raised mdl-button--colored" :href="data.url" target="_blank">Abrir</a>
				<div class="cd-list-title">{{data.title}}</div>
				<div class="cd-list-subtitle">CURSO: {{data.nameCourse}}</div>
				<div class="cd-list-subtitle2">Inicia: {{data.dateEndString}}</div>
			</div>
		</div>
		`,
		props: ['data']
	})

	Vue.component('vcd-info',{
		template: /* HTML */
		`
		<div>
			<div class="cd-list">
				<div class="cd-list-content">
					Version: 0.0.4 beta<br><br>
					Notas de la versión<br><br>
					<i class="mdi mdi-auto-fix cd-text-primary"></i> Correccion de errores a la hora de visualizar foros.<br>
					<i class="mdi mdi-plus cd-text-primary"></i> Integracion la la api de localStorage para preservar informacion de manera local<br>
					<i class="mdi mdi-plus cd-text-primary"></i> Integracion la la api de Fetch para mejor gestion de contenido solicitado al servidor<br>
				</div>
			</div>
			<div class="cd-list">
				<div class="cd-list-content">
					Version: 0.0.3 beta<br><br>
					Notas de la versión<br><br>
					<i class="mdi mdi-auto-fix cd-text-primary"></i> Correccion de peticiones https que inpedian acceder a la api de la web.<br>
					<i class="mdi mdi-plus cd-text-primary"></i> Deteccion de tareas grupales
				</div>
			</div>
			<div class="cd-list">
				<div class="cd-list-content">
					Version: 0.0.2 beta<br><br>
					Notas de la versión:<br><br>
					<i class="mdi mdi-plus cd-text-primary"></i> Implementación de los modulos de Cursos, Tareas, Conferencias y Foros.<br>
					<i class="mdi mdi-information cd-text-primary"></i> Esta aplicación recopila informacion proveida por API de esta web.<br>
					<i class="mdi mdi-information cd-text-primary"></i> La información se actualiza cada 1 minuto aproximadamente.<br>
					<i class="mdi mdi-information cd-text-primary"></i> Las actividades expiradas no se tomaran en cuenta<br>
				</div>
			</div>
		</div>
		
		`
	})