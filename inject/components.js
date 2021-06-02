Vue.component('vcd-homework', {
		template: /* HTML */
		`
		<div  class="cd-list">
			<i class="cd-list-icon mdi" :class="data.isGroup? 'mdi-account-group' : 'mdi-bag-personal'"></i>
			<div class="cd-list-content">
				<a class="cd-list-more mdl-button mdl-button--raised mdl-button--colored" :href="parent.protocol + '://aulavirtual.unamad.edu.pe/web/homework?s=' + data.sectionId">Más</a>
				<div class="cd-list-title">{{data.title}}</div>
				<!--<div class="cd-list-description" v-html="homework.description"></div>-->
				<div class="cd-list-subtitle">CURSO: {{data.nameCourse}}</div>
				<div class="cd-list-subtitle2">
					Fin: {{data.dateEndString}} | {{data.isGroup ? 'GRUPAL':'INDIVIDUAL'}} | Intentos: {{data.intents - data.homeworkstds}}/{{data.intents}}
				</div>
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
				<a v-if="forum.differenceTime < 0" class="cd-list-more mdl-button mdl-button--colored" :href="parent.protocol + '://aulavirtual.unamad.edu.pe/web/forum/details?f=' + forum.forumId + '&s=' + forum.sectionId">Ir</a>
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
			<div class="mdl-typography--headline">Info</div><br>
			<div class="cd-list">
				<div class="cd-list-content">
					Version: 0.0.3 beta<br><br>
					Notas de la versión<br>
					- Correccion de peticiones https que inpedian acceder a la api de la web.<br>
					- Deteccion de tareas grupales
				</div>
			</div>
			<div class="cd-list">
				<div class="cd-list-content">
					Version: 0.0.2 beta<br><br>
					Modulos: Cursos, Tareas, Conferencias, Foros.<br>
					<br>
					Notas de la versión:<br>
					- Esta aplicación recopila informacion proveida por API de esta web.<br>
					- La información se actualiza cada 1 minuto aproximadamente.<br>
					- El historial de tareas, foros y conferencias son descartados por la aplicación si su fecha de fin a llegado<br>
				</div>
			</div>
		</div>
		
		`
	})