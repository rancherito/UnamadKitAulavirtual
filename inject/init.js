(() => {
	let protocol = location.protocol == "https:" ? 'https' : 'http'
	if (window.location.pathname != '/login') {

		/*{
			let wrapper = htmlToElement(`<div class="cd-anunces"></div>`);
			let anunces = document.querySelectorAll('.page-content>.ng-scope > *:nth-child(2) > .row')[0]
			anunces.parentNode.appendChild(wrapper);
			wrapper.appendChild(anunces)
		}*/
		document.head.appendChild(htmlToElement('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css">'))
		document.body.appendChild(htmlToElement(
			/*html*/
			`
		
		<div id="vueapp">
			<div id="nav-native-fix">
				<a style="background-color: var(--panel-light)" title="Cerrar Sesión" href="/" className="cd-btn-native" id="other-close-session" v-show="applyNewStyle">
					<svg style="width:24px;height:24px" viewBox="0 0 24 24">
						<path fill="#FFF" d="M12,3L20,9V21H15V14H9V21H4V9L12,3Z" />
					</svg>
				</a>
				<a title="Cerrar Sesión" href="/logout" className="cd-btn-native" id="other-close-session" v-show="applyNewStyle">
					<svg style="height:24px" viewBox="0 0 24 24">
						<path fill="#FFF" d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
					</svg>
				</a>
			</div>
			
			<vcd-info-notify></vcd-info-notify>
			<div id="cd-navmenu" :class="{'cd-navmenu-open': openPanel}">
				<template v-if="openPanel">
					<div style="padding-top: 60px; display: flex; flex-direction: column">
						<vue-custom-tooltip label="Información de versiones" position="is-left">
							<a v-show="moduleActiveId" href="#" class="cd-btn-navmenu" @click="moduleActiveId = 'md_info'" :class="{active: moduleActiveId == 'md_info'}">
								<svg style="width:24px;height:24px" viewBox="0 0 24 24">
									<path fill="#FFF" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
								</svg>
							</a>
						</vue-custom-tooltip>
						<vue-custom-tooltip label="Compartir" position="is-left">
							<a v-show="moduleActiveId" class="cd-btn-navmenu" @click="moduleActiveId = 'md_share'" :class="{active: moduleActiveId == 'md_share'}" href="#">
								<svg style="width:24px;height:24px" viewBox="0 0 24 24">
									<path fill="#FFF" d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
								</svg>
							</a>
						</vue-custom-tooltip>
						<vue-custom-tooltip label="Actualizar datos" position="is-left">
							<a v-show="moduleActiveId" href="#" @click="loadCourses" class="cd-btn-navmenu" :disabled="updating">
								<svg style="width:24px;height:24px" viewBox="0 0 24 24" :class="updating ? 'mdi-spin' : ''">
									<path fill="#fff" d="M19 12V13.5C21.21 13.5 23 15.29 23 17.5C23 18.32 22.75 19.08 22.33 19.71L21.24 18.62C21.41 18.28 21.5 17.9 21.5 17.5C21.5 16.12 20.38 15 19 15V16.5L16.75 14.25L16.72 14.22C16.78 14.17 16.85 14.13 19 12M19 23V21.5C16.79 21.5 15 19.71 15 17.5C15 16.68 15.25 15.92 15.67 15.29L16.76 16.38C16.59 16.72 16.5 17.1 16.5 17.5C16.5 18.88 17.62 20 19 20V18.5L21.25 20.75L21.28 20.78C21.22 20.83 21.15 20.87 19 23M13 17.5C13 13.91 15.91 11 19.5 11C20.78 11 21.97 11.38 23 12C22.13 10.9 20.84 10.14 19.35 10.03C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.03C2.34 8.36 0 10.9 0 14C0 17.31 2.69 20 6 20H13.5C13.18 19.23 13 18.39 13 17.5Z" />
								</svg>
							</a>
						</vue-custom-tooltip>
						<vue-custom-tooltip label="Sincronizar" position="is-left">
							<a v-show="moduleActiveId" class="cd-btn-navmenu" @click="moduleActiveId = 'md_sync'" :class="{active: moduleActiveId == 'md_sync'}" href="#">
								<svg style="width:24px;height:24px" viewBox="0 0 24 24">
									<path fill="#FFF" d="M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z" />
								</svg>
							</a>
						</vue-custom-tooltip>
					</div>
				</template>
				<div style="display: flex; flex-direction: column">
					<vue-custom-tooltip label="Cambiar tema" position="is-left">
						<a class="cd-btn-navmenu" @click="applyNewStyle = !applyNewStyle; applyTheme()" href="#" v-if="!openPanel">
							<svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="applyNewStyle">
								<path fill="#FFF" d="M20.65,20.87L18.3,18.5L12,12.23L8.44,8.66L7,7.25L4.27,4.5L3,5.77L5.78,8.55C3.23,11.69 3.42,16.31 6.34,19.24C7.9,20.8 9.95,21.58 12,21.58C13.79,21.58 15.57,21 17.03,19.8L19.73,22.5L21,21.23L20.65,20.87M12,19.59C10.4,19.59 8.89,18.97 7.76,17.83C6.62,16.69 6,15.19 6,13.59C6,12.27 6.43,11 7.21,10L12,14.77V19.59M12,5.1V9.68L19.25,16.94C20.62,14 20.09,10.37 17.65,7.93L12,2.27L8.3,5.97L9.71,7.38L12,5.1Z" />
							</svg>
							<svg style="width:24px;height:24px" viewBox="0 0 24 24" v-else>
								<path fill="currentColor" d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z" />
							</svg>
						</a>
					</vue-custom-tooltip>
					
					

					<vue-custom-tooltip label="Horario" position="is-left">
						<a class="cd-btn-navmenu"  href="#" @click="openPanel = true; moduleActiveId = 'md_schedule'" :class="{active: moduleActiveId == 'md_schedule'}" id="btn_id_schedule">
							<svg style="width:24px;height:24px" viewBox="0 0 24 24">
								<path fill="#FFF" d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z" />
							</svg>
						</a>
					</vue-custom-tooltip>
					<vue-custom-tooltip label="Panel principal" position="is-left">
						<a class="cd-btn-navmenu" @click="openPanel = true; moduleActiveId = 'md_activities'" href="#" :class="{active: moduleActiveId == 'md_activities'}">
							<span v-if="actividities > 0 && moduleActiveId != 1">{{actividities}}</span>
							<svg style="width:24px;height:24px" viewBox="0 0 24 24">
								<path fill="#FFF" d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
							</svg>
						</a>
					</vue-custom-tooltip>
					<vue-custom-tooltip label="Cerrar panel (ESC)" position="is-left">
						<a v-if="openPanel" class="cd-btn-navmenu" @click="openPanel = false; moduleActiveId = 'md_activities'" href="#">
							<svg style="width:24px;height:24px" viewBox="0 0 24 24">
								<path fill="#fff" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
							</svg>
						</a>
					</vue-custom-tooltip>
				</div>
				
			</div>
			
			<div v-show="openPanel">
				<cd-schedule v-show="moduleActiveId == 'md_schedule'"></cd-schedule>
				<vcd-module title="Información de versiones" v-show="moduleActiveId == 'md_info'">
					<vcd-info></vcd-info>
				</vcd-module>
				<vcd-module title="Compartir" v-show="moduleActiveId == 'md_share'">
					<div class="f-c" style="height: 100%">
						<div style="flex: 1;" class="f-c">
							<div style="color: white; font-size: 4rem; padding-bottom: 4rem"> <i class="mdi mdi-school"></i></div>
							<p style="text-align: center">
								Una aplicación hecha por estudiantes para estudiantes, gracias por hacer uso de esta herramienta.
								Si deseas compartir esta extensión con otros compañeros, de seguro lo agradeceran. :D<br><br>
								<a target="_blank" style="border-radius: var(--rounded)" href="https://chrome.google.com/webstore/detail/unamad-aulavirtual-qacces/lichjjhggabiijdmbhnkfkbfgdjigecl" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">LINK DE LA EXTENSIÓN</a>
						
							</p>
							
						</div>
					</div>
				</vcd-module>
				<vcd-module title="Sincronizar" v-show="moduleActiveId == 'md_sync'">
					<div class="f-c" style="height: 100%">
						<div style="background: white; border-radius: 1rem; padding: 1rem">
							<div ref="qrplaceholder"></div>
						</div>
						<br>
						<span style="text-align: center">Este código QR es único y solo te pertenece a ti, ¡No lo compartas!<span>
						<div style="text-align: center">Módulo en fase experimental</div>
					</div>
				</vcd-module>

					
				<vcd-module :title="modulesTitles[tabposition]" v-show="moduleActiveId == 'md_activities'">				
					<div style="display: flex; flex-direction: column;">
						<div class="mdl-dialog__content acd-fadeOut" v-show="tabposition == 0">
						
							<div v-for="course in courses_list" class="cd-list">
								<i :style="{color: colorCourse(course.name)}" class="cd-list-icon mdi" :class="course.exams.isUpdating || course.homeworks.isUpdating || course.forums.isUpdating|| course.conferencesUpdating ? 'mdi-loading mdi-spin' : 'mdi-book'"></i>
								
								<div class="cd-list-content" >
									
									<div class="cd-list-title" :style="{color: colorCourse(course.name)}">{{course.name}}</div>
									<div 
										class="cd-list-subtitle2" 
										v-if="course.homeworks.count + course.forums.count + course.conferences + course.exams.count">

										<span v-if="course.homeworks.count" class="cd-pointer mdl-chip mdl-chip-sm" @click="tabposition = 1">
											<span class="mdl-chip__text">{{'Tareas: ' + course.homeworks.count}}</span>
										</span>
										<span v-if="course.forums.count" class="cd-pointer mdl-chip mdl-chip-sm" @click="tabposition = 3">
											<span class="mdl-chip__text">{{'Foros: ' + course.forums.count}}</span>
										</span>
										<span v-if="course.conferences" class="cd-pointer mdl-chip mdl-chip-sm" @click="tabposition = 2">
											<span class="mdl-chip__text">{{'Confer.: ' + course.conferences}}</span>
										</span>
										<span v-if="course.exams.count" class="cd-pointer mdl-chip mdl-chip-sm" @click="tabposition = 4">
											<span class="mdl-chip__text">{{'Exam.: ' + course.exams.count}}</span>
										</span>
									</div>
									
									<div class="cd-list-subtitle2" v-else>
										<span style="height: 24px; display: block">Sin actividades pendientes</span>
									</div>
								</div>
							</div>
							
						</div>
						<div class="mdl-dialog__content acd-fadeOut" v-show="tabposition == 1">
							<div v-if="homeworks_list.get.length + homeworks_list.archived.length">
								<vcd-helper-list></vcd-helper-list>
								<vcd-homework v-for="homework in homeworks_list.get" :data="homework"></vcd-homework>
								<vcd-homework class="acd-fadeOut" v-for="homework in homeworks_list.archived" :data="homework"></vcd-homework>
								<!--
								//BOTON PARA OCULTAR TAREAS REALIZADAS
								<div class="cd-btn-archived" :class="{'cd-bg-secondary': homeworks.viewArchived}" @click="homeworks.viewArchived = !homeworks.viewArchived">
									<span v-show="!homeworks.viewArchived">{{homeworks_list.archived.length}}</span>
									{{homeworks.viewArchived ? 'Ocultar Realizados' : 'Ver Realizados'}}
								</div>-->
								
							</div>
							<vcd-void-box v-else text="tareas"></vcd-void-box>
						</div>

						<div class="mdl-dialog__content acd-fadeOut" v-show="tabposition == 2">
							<div v-if="conferences_list.length">
								<vcd-helper-list></vcd-helper-list>
								<vcd-conference v-for="(conference, i) in conferences_list" :data="conference"></vcd-conference>
							</div>
							<vcd-void-box v-else text="coferencias"></vcd-void-box>
							
						</div>
						<div class="mdl-dialog__content acd-fadeOut" v-show="tabposition == 3">
							<div v-if="forums_list.get.length + forums_list.archived.length">
								<vcd-helper-list></vcd-helper-list>
								<vcd-forums v-for="forum in forums_list.get" :data="forum"></vcd-forums>
								<vcd-forums v-for="forum in forums_list.archived" :data="forum"></vcd-forums>
							</div>
							<vcd-void-box v-else text="foros"></vcd-void-box>
						</div>
						<div class="mdl-dialog__content acd-fadeOut" v-show="tabposition == 4">
							<div v-if="exams.list.length">
								<vcd-helper-list></vcd-helper-list>
								<vcd-exam :data="exam" v-for="exam of exams.list"></vcd-exam>
							</div>
							<vcd-void-box v-else text="Exámenes"></vcd-void-box>
						</div>
						<div class="cd-tabsbox">
							<vcd-tabbox text="Menu" :counter="actividities" tabid="0">
								<svg-mdi path="M16,20H20V16H16M16,14H20V10H16M10,8H14V4H10M16,8H20V4H16M10,14H14V10H10M4,14H8V10H4M4,20H8V16H4M10,20H14V16H10M4,8H8V4H4V8Z"></svg-mdi>
							</vcd-tabbox>
							<vcd-tabbox text="Tareas" :counter="homeworks_list.get.length" tabid="1">
								<svg-mdi path="M16,5V4A2,2 0 0,0 14,2H10A2,2 0 0,0 8,4V5A4,4 0 0,0 4,9V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V9A4,4 0 0,0 16,5M10,4H14V5H10V4M12,9L14,11L12,13L10,11L12,9M18,16H9V18H8V16H6V15H18V16Z"></svg-mdi>
							</vcd-tabbox>
							<vcd-tabbox text="Conferencias" :counter="conferences_list.length" tabid="2">
								<svg-mdi path="M18,16L14,12.8V16H6V8H14V11.2L18,8M20,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"></svg-mdi>
							</vcd-tabbox>
							<vcd-tabbox text="Foros" :counter="forums_list.get.length" tabid="3">
								<svg-mdi path="M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7A2,2 0 0,1 7,5H21A2,2 0 0,1 23,7V17A2,2 0 0,1 21,19H16.9L13.2,22.71C13,22.89 12.76,23 12.5,23H12M3,15H1V3A2,2 0 0,1 3,1H19V3H3V15Z"></svg-mdi>
							
							</vcd-tabbox>
							<vcd-tabbox text="Exámenes":counter="exams.list.length" tabid="4">
								<svg-mdi path="M17,21L14.25,18L15.41,16.84L17,18.43L20.59,14.84L21.75,16.25M12.8,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19A2,2 0 0,1 21,5V12.8C20.12,12.29 19.09,12 18,12L17,12.08V11H7V13H14.69C13.07,14.07 12,15.91 12,18C12,19.09 12.29,20.12 12.8,21M12,15H7V17H12M17,7H7V9H17"></svg-mdi>
							
							</vcd-tabbox>
						</div>
					
					</div>
				</vcd-module>
			</div>
			
		</div>
		`
		))


		

		//CREAMOS LAS VARIABLES QUE ALMACENAREMOS EN EL LOCALSTORAGE DEL SITIO WEB PARA EVITAR RECARGAS
		let defdata = createStorage({
			schedule: {
				data: []
			},
			exams: {
				list: []
			},
			courses: {
				list: []
			},
			homeworks: {
				list: []
			},
			conferences: {
				list: []
			},
			forums: {
				list: []
			},
			openPanel: false,
			tabposition: 0,
			moduleActiveId: 0,
			internetDate: null,
			localDate: null,
			user: null,
			applyNewStyle: false
		})
		if (defdata.variables.applyNewStyle) document.body.id = "bodyView"
		else document.body.removeAttribute('id')
		new Vue({
			el: '#vueapp',
			data: {
				...defdata.variables,
				months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
				days: ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'],
				updating: false,
				protocol: protocol,
				modulesTitles: {
					'-1': 'Información adicional',
					0: 'Menu principal',
					1: 'Tareas pendientes',
					2: 'Conferencias',
					3: 'Lista de Foros',
					4: 'Lista de Exámenes',
					'qr': 'Sync',
					'share': 'Compartir'
				},
				icon_link: 'mdi-cursor-pointer',
				now: (new Date()).getTime(),
				qr: '',
				colors: ['#4a9bed', '#ff5722', '#f5be39', '#cd4242', '#4caf50', '#845aec', '#77858f', '#563c63', '#280fb4', '#204f6e']
			},
			computed: {

				homeworks_list() {
					const l = [...this.homeworks.list].sort((a, b) => a.dateEnd > b.dateEnd ? 1 : -1)

					let l_info = {
						get: [],
						archived: []
					}
					l.forEach(e => {
						if (e.homeworkstds) l_info.archived.push(e)
						else l_info.get.push(e)
					});

					return l_info
				},
				conferences_list() {
					return [...this.conferences.list].sort((a, b) => a.endTime > b.endTime ? 1 : -1)
				},
				courses_list() {
					return [...this.courses.list].sort((a, b) => (b.homeworks.count + b.forums.count + b.conferences) - (a.homeworks.count + a.forums.count + a.conferences))
				},
				forums_list() {
					const l = [...this.forums.list].sort((a, b) => a.dateEnd > b.dateEnd ? 1 : -1)
					let l_info = {
						get: [],
						archived: []
					}
					l.forEach(e => {
						if (e.participations) l_info.archived.push(e)
						else l_info.get.push(e)
					});
					return l_info
				},
				actividities() {
					return this.homeworks_list.get.length + this.conferences_list.length + this.forums_list.get.length + this.exams.list.length
				}
			},
			watch: {
				...defdata.mutations
			},
			methods: {
				applyTheme(){
					
					if (this.applyNewStyle) document.body.id = "bodyView"
					else document.body.removeAttribute('id')
					
				},
				minimizeApp() {
					this.moduleActiveId = 0
				},
				colorCourse(course) {
					if (course.includes(' (')) course = this.removeGroupsText(course)
					return this.colors[this.courses.list.findIndex(e => e.name == course) ?? 0]
				},
				removeGroupsText(course) {
					return course.replace(/ \([a-z]\)/gi, '').slice(6)
				},
				addZeroTime(num) {
					return (num > 9 ? '' : '0') + num
				},
				calculeNow() {
					if (this.internetDate != null && this.localDate != null) this.now = this.$root.internetDate + (new Date().getTime() - this.$root.localDate);
				},
				dateDiffInDays(a, b) {
					const _MS_PER_DAY = 1000 * 60
					if (typeof a == 'string') a = new Date(a)
					if (typeof b == 'string') b = new Date(b)

					const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes());
					const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes());
					return Math.floor((utc2 - utc1) / _MS_PER_DAY);
				},
				async loadConferences() {
					let listconferences = []
					for (let course of this.courses.list) {
						course.conferences = 0
						course.conferencesUpdating = !0

						let response = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/conference/list?s=' + course.sectionId);
						if (response.ok) {
							(await response.json()).forEach(conference => {
								let a = new RegExp("^(http|https)://", "i")
								if (!a.test(conference.url)) conference.url = 'https://' + conference.url
								conference.sectionId = course.sectionId
								conference.nameCourse = course.name
								if (conference.state != "Finalizado" || (new Date(conference.endTime)).getTime() > this.now) {
									listconferences.push(conference);
									course.conferences++
								}
							});
						}
						course.conferencesUpdating = !1
					}
					this.conferences.list = listconferences

				},
				async loadHomeworks() {
					var listhomework = []

					for (let course of this.courses.list) {
						course.homeworks.isUpdating = !0
						course.homeworks.count = 0
						let res = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/homework/list?s=' + course.sectionId);
						if (res.ok) {
							(await res.json()).forEach(task => {
								let [date, hour] = task.dateEnd.split(' ');
								let [day, mount, year] = date.split('/')

								task.dateEndCustom = `${year}-${mount}-${day}T${hour}`;

								[date, hour] = task.dateBegin.split(' ');
								[day, mount, year] = date.split('/')

								task.dateBeginCustom = `${year}-${mount}-${day}T${hour}`;
								task.sectionId = course.sectionId
								task.nameCourse = course.name

								if (task.state == 'ACT' || (new Date(task.dateEndCustom)).getTime() > this.now) {
									listhomework.push(task);
									if (task.homeworkstds == 0) course.homeworks.count++
								}
							});
						}
						course.homeworks.isUpdating = !1
					}
					this.homeworks.list = listhomework


				},
				async loadExams() {
					let exams = []
					for (let course of this.courses.list) {
						course.exams.isUpdating = !0
						course.exams.count = 0

						const res = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/Evaluations/ListAllEvaluations?s=' + course.sectionId)
						if (res.ok) {
							(await res.json()).forEach(exam => {
								exam.sectionId = course.sectionId
								exam.nameCourse = course.name
								course.exams.count++
								exams.push(exam)
							})
						}
						course.exams.isUpdating = !1
					}
					this.exams.list = exams
				},
				async loadForums() {
					let listforums = []
					for (const course of this.courses.list) {
						course.forums.count = 0
						course.forums.isUpdating = !0
						let response = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/forum/list?s=' + course.sectionId)
						if (response.ok) {
							for (const forum of (await response.json())) {
								forum.sectionId = course.sectionId
								forum.nameCourse = course.name
								forum.participations = 0


								if (forum.state || (new Date(forum.dateEnd)).getTime() > this.now) {

									listforums.push(forum);

									//VERIFICAMOS SI HAY PARTICIPACIONES NUESTRAS EN LOS FOROS DE ANTERIORES PETICIONES, SI LAS HAY, NO LAS VERIFICAMOS, Y SI NO, LAS VERIFICAMOS
									let countParticipations = this.forums.list.find(e => e.forumId == forum.forumId)?.participations ?? 0
									if (countParticipations) forum.participations = countParticipations
									else {
										let resFourms = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/forum/detail?f=' + forum.forumId);
										if (resFourms.ok) {
											const d = await resFourms.json()
											for (const val of d.pages) {
												let resForumPage = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/forum/answers/list?f=' + d.forumId + '&page=' + (val - 1))
												if (resForumPage.ok) {
													(await resForumPage.json()).forEach(page => {
														if (page.userName.toLowerCase().replace(/\s/g, '') == this.user.name.toLowerCase().replace(/\s/g, '')) forum.participations++
													})
												}


											}
										}
									}

									if (forum.participations == 0) course.forums.count++

								}
							}
						}
						course.forums.isUpdating = !1
					}
					this.forums.list = listforums;

				},
				loadData2() {
					this.loadConferences()
					this.loadExams()
					this.loadHomeworks()
					this.loadForums()
				},
				async loadCourses() {

					this.updating = true
					let response = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/user/info/system/courseinrole')
					if (response.ok) {
						response.json().then(data => {
							this.updating = false
							this.courses.list = data.map(d => {
								return {
									homeworks: {
										isUpdating: !1,
										count: 0,
										viewArchived: !1
									},
									exams: {
										isUpdating: !1,
										count: 0,
										viewArchived: !1
									},
									forums: {
										isUpdating: !1,
										count: 0,
										viewArchived: !1
									},
									conferencesUpdating: !1,
									conferences: 0,
									...d
								}
							})
							this.loadData2()
						})
					}
				}
			},

			async created() {
				//this.calculeTimes()
				this.calculeNow()
				setInterval(this.calculeNow, 1000)

				if (this.user == null) {
					let responseGetUser = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/user/info/data')
					if (responseGetUser.ok) this.user = await responseGetUser.json()

				}

				fetch(this.protocol + '://academico.unamad.edu.pe/timeutc').then(res => res.json()).then(data => {
					///console.log(typeof data, data);
					const pre_utc = new Date((data.currentFileTime / 10000 - 11644473600000) - (1000 * 60 * 60 * 5))
					this.internetDate = (new Date(`${pre_utc.getUTCFullYear()}-${this.addZeroTime(pre_utc.getUTCMonth() + 1)}-${this.addZeroTime(pre_utc.getUTCDate())}T${this.addZeroTime(pre_utc.getUTCHours())}:${this.addZeroTime(pre_utc.getUTCMinutes())}:${this.addZeroTime(pre_utc.getUTCSeconds())}`)).getTime();
					this.localDate = (new Date()).getTime();
				}).catch(e => {
					console.log('ERROR');
					this.internetDate = (new Date()).getTime();
					this.localDate = (new Date()).getTime();
				})
				this.loadCourses()
				setInterval(() => {

					console.log('Update');
					this.loadData2()

				}, 1000 * 90)

				chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
					if (message.schedule != undefined) this.schedule.data = message.schedule
				});
				chrome.runtime.sendMessage('getinfo');
			},
			mounted() {
				this.applyTheme()
				document.addEventListener('keyup', (e) => {
					if(e.key === "Escape") {
						this.openPanel = false 
						this.moduleActiveId = 'md_activities'
					}
				})
				chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
					if (message.qrstring != undefined) {
						let bqr = new QRCode({
							content: message.qrstring,
							width: 400,
							height: 400
						});

						this.$refs.qrplaceholder.innerHTML = bqr.svg()
					}
				});
			}
		})
	}

})();