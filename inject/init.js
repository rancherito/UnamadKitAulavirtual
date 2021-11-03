(() => {
	let protocol = location.protocol == "https:" ? 'https' : 'http'
	if (window.location.pathname != '/login') {

		/*{
			let wrapper = htmlToElement(`<div class="cd-anunces"></div>`);
			let anunces = document.querySelectorAll('.page-content>.ng-scope > *:nth-child(2) > .row')[0]
			anunces.parentNode.appendChild(wrapper);
			wrapper.appendChild(anunces)
		}*/
		document.body.appendChild(htmlToElement(
			/*html*/
		`<div id="vueapp">
			<div id="nav-native-fix">
				<a style="background-color: var(--panel-light)" title="Cerrar Sesión" href="/" className="cd-btn-native" id="other-close-session" v-show="applyNewStyle">
					<svg style="width:24px;height:24px" viewBox="0 0 24 24">
						<path fill="#FFF" d="M12,3L20,9V21H15V14H9V21H4V9L12,3Z" />
					</svg>
				</a>
				<a title="Cerrar Sesión" href="/logout" className="cd-btn-native" id="other-home" v-show="applyNewStyle">
					<svg style="height:24px" viewBox="0 0 24 24">
						<path fill="#FFF" d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
					</svg>
					<span style="padding-left: .5rem">Cerrar Sesion</span>
				</a>
			</div>
			
			<vcd-info-notify></vcd-info-notify>
			<div id="cd-navmenu" :class="{'cd-navmenu-open': openPanel}">
				<template v-if="openPanel">
					<div style="padding-top: 60px; display: flex; flex-direction: column">
						
					</div>
				</template>
				<div style="display: flex; flex-direction: column">
					<vue-custom-tooltip label="Horario" position="is-left">
						<a class="cd-btn-navmenu"  href="#" @click="openPanel = true; moduleActiveId = 'md_schedule_2'" :class="{active: moduleActiveId == 'md_schedule'}" id="btn_id_schedule">
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
								<a target="_blank" href="https://chrome.google.com/webstore/detail/unamad-aulavirtual-qacces/lichjjhggabiijdmbhnkfkbfgdjigecl" class="cd-btn">LINK DE LA EXTENSIÓN</a>
						
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
				<vcd-module title="Horario" v-show="moduleActiveId == 'md_schedule_2'">
					<cd-schedule-2></cd-schedule-2>
				</vcd-module>
					
				<vcd-module :title="modulesTitles[tabposition]" v-show="moduleActiveId == 'md_activities'">				
					<div style="display: flex; flex-direction: column; height: 100%">
						<div class="mdl-dialog__content acd-fadeOut" v-show="tabposition == 0">
							<div style="display: grid; gap: 1rem; grid-teamplate-column: 1fr">
								<div 
								style="display: grid; gap: .5rem" 
								v-for="course in coursesList" 
								v-if="generalActividities.filter(e=>e.type != 'CONFERENCE').filter(e=>e.courseName == course.name).length"
								>
									<div v-for="activity of generalActividities.filter(e=>e.type != 'CONFERENCE').filter(e=>e.courseName == course.name)">
										
										<vcd-activity :data="activity"></vcd-activity>
									</div>
								</div>
							</div>
								
														
						</div>
						<div class="mdl-dialog__content acd-fadeOut" v-show="tabposition == 1">
							<div style="display: grid; gap: 1rem; grid-teamplate-column: 1fr">
								<div 
								style="display: grid; gap: .5rem" 
								v-for="course in coursesList" 
								v-if="generalActividitiesArchived.filter(e=>e.type != 'CONFERENCE').filter(e=>e.courseName == course.name).length"
								>
									<div v-for="activity of generalActividitiesArchived.filter(e=>e.type != 'CONFERENCE').filter(e=>e.courseName == course.name)">
										<vcd-activity :data="activity"></vcd-activity>
									</div>
								</div>
							</div>
						</div>

						<div class="mdl-dialog__content acd-fadeOut" v-show="tabposition == 'dashboard'">
							<div class="cd-dashconferences">
								<div v-for="conference of generalActividities.filter(e=>e.type == 'CONFERENCE')" class="cd-dashconferences-item">
									<div :style="{fill: colorCourse(conference.courseName).solid}">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path class="uim-tertiary" d="M12,22A10,10,0,1,1,22,12,10.01177,10.01177,0,0,1,12,22Z"></path><path class="uim-primary" d="M10,16.89062A2.00839,2.00839,0,0,1,8,14.8877V9.1123a2.00085,2.00085,0,0,1,3-1.73242l5,2.8877a2.00064,2.00064,0,0,1,0,3.46484l-5,2.8877A1.99618,1.99618,0,0,1,10,16.89062Z"></path></svg>
										<span>{{conference.courseName.slice(0,22)}}</span>
										<b v-if="now > (new Date(conference.dateBegin)).getTime()" class="acd-fadeOut" style="animation-iteration-count: infinite; animation-duration: 2s; animation-name: fadeOut2;"></b>
									</div>
									<span style="background: var(--panel); height: 30px; width: 80px; border-radius: var(--rounded); font-size: .8rem" class="f-c">
										<vcd-countdown2 :date="now > (new Date(conference.dateBegin)).getTime() ? conference.dateEnd: conference.dateBegin"></vcd-countdown2>
									</span>
								</div>
							</div>
							<v-box></v-box>
							<div class="cd-dashboard">
								<a class="f-c cd-dashboard-item" @click="tabposition=0" href="#" :style="{fill: colors[0]}">
									<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" ><path class="uim-tertiary" d="M5.1,4h14c0.6,0,1,0.4,1,1v14c0,0.6-0.4,1-1,1h-14c-0.6,0-1-0.4-1-1V5C4.1,4.4,4.5,4,5.1,4z"></path><path class="uim-primary" d="M22.1,14V5c0-1.7-1.3-3-3-3h-14c-1.7,0-3,1.3-3,3v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3L22.1,14C22.1,14,22.1,14,22.1,14z M5.1,4h14c0.6,0,1,0.4,1,1v8h-2.5c-0.7,0-1.3,0.3-1.7,0.9L14.5,16H9.6l-1.4-2.1c-0.4-0.6-1-0.9-1.7-0.9H4.1V5C4.1,4.4,4.5,4,5.1,4z"></path></svg>
									<v-box></v-box>
									<span>Actividades</span>
								</a>
								<a class="f-c cd-dashboard-item" @click="tabposition=1" href="#" v-if="generalActividitiesArchived.length" :style="{fill: colors[1]}">
									<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" ><circle cx="10" cy="8.5" r="5" class="uim-quaternary"></circle><path class="uim-tertiary" d="M13.30884,12.22253C12.42566,13.00806,11.27496,13.5,10,13.5s-2.42566-0.49194-3.30884-1.27747C3.92603,13.48206,2,16.26324,2,19.5c0,0.00018,0,0.00037,0,0.00055C2.00012,20.05267,2.44788,20.50012,3,20.5h14c0.00018,0,0.00037,0,0.00055,0c0.55212-0.00012,0.99957-0.44788,0.99945-1C18,16.26324,16.07397,13.48206,13.30884,12.22253z"></path><path class="uim-primary" d="M18.3335,13.5c-0.26526,0.0003-0.51971-0.10515-0.707-0.293l-1.3335-1.333c-0.38694-0.39399-0.38123-1.02706,0.01275-1.414c0.38897-0.38202,1.01228-0.38202,1.40125,0l0.62647,0.626l1.95953-1.96c0.39399-0.38694,1.02706-0.38123,1.414,0.01275c0.38202,0.38897,0.38202,1.01227,0,1.40125l-2.6665,2.667C18.85321,13.39485,18.59877,13.5003,18.3335,13.5z"></path></svg>
									<v-box></v-box>
									<span>A. Archivadas</span>
								</a>
								<a class="f-c cd-dashboard-item" @click="moduleActiveId = 'md_schedule_2'" href="#" :style="{fill: colors[2]}">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="uim-tertiary" d="M22,9H2V6c0-1.65685,1.34315-3,3-3h14c1.65685,0,3,1.34315,3,3V9z"></path><path class="uim-quaternary" d="M2,19c0.00183,1.65613,1.34387,2.99817,3,3h14c1.65613-0.00183,2.99817-1.34387,3-3V9H2V19z"></path><path class="uim-primary" d="M7,7C6.44772,7,6,6.55228,6,6V2c0-0.55228,0.44772-1,1-1s1,0.44772,1,1v4C8,6.55228,7.55228,7,7,7z M17,7c-0.55228,0-1-0.44772-1-1V2c0-0.55228,0.44772-1,1-1s1,0.44772,1,1v4C18,6.55228,17.55228,7,17,7z"></path><circle cx="7" cy="13" r="1" class="uim-primary"></circle><circle cx="17" cy="13" r="1" class="uim-primary"></circle><circle cx="12" cy="13" r="1" class="uim-primary"></circle><circle cx="12" cy="17" r="1" class="uim-primary"></circle><circle cx="7" cy="17" r="1" class="uim-primary"></circle><circle cx="17" cy="17" r="1" class="uim-primary"></circle></svg>
									<v-box></v-box>
									<span>Horario</span>
								</a>
								<a class="f-c cd-dashboard-item" @click="moduleActiveId = 'md_sync'" href="#" :style="{fill: colors[3]}">
									<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="uim-tertiary" d="m2,6l-2,0l0,-4a2,2 0 0 1 2,-2l4,0l0,2l-4,0m20,-2a2,2 0 0 1 2,2l0,4l-2,0l0,-4l-4,0l0,-2l4,0m-20,18l0,4l4,0l0,2l-4,0a2,2 0 0 1 -2,-2l0,-4l2,0m20,4l0,-4l2,0l0,4a2,2 0 0 1 -2,2l-4,0l0,-2l4,0z"/><path class="uim-primary" d="m4,4l6,0l0,6l-6,0l0,-6m16,0l0,6l-6,0l0,-6l6,0m-6,11l2,0l0,-2l-2,0l0,-2l2,0l0,2l2,0l0,-2l2,0l0,2l-2,0l0,2l2,0l0,3l-2,0l0,2l-2,0l0,-2l-3,0l0,2l-2,0l0,-4l3,0l0,-1m2,0l0,3l2,0l0,-3l-2,0m-12,5l0,-6l6,0l0,6l-6,0m2,-14l0,2l2,0l0,-2l-2,0m10,0l0,2l2,0l0,-2l-2,0m-10,10l0,2l2,0l0,-2l-2,0m-2,-5l2,0l0,2l-2,0l0,-2m5,0l4,0l0,4l-2,0l0,-2l-2,0l0,-2m2,-5l2,0l0,4l-2,0l0,-4"/></svg>
									<v-box></v-box>
									<span>Sincronización QR</span>
								</a>
								<a class="f-c cd-dashboard-item" @click="moduleActiveId = 'md_share'" href="#" :style="{fill: colors[4]}">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="uim-tertiary" d="M18,10c-2.20914,0-4-1.79086-4-4s1.79086-4,4-4s4,1.79086,4,4C21.99765,8.20816,20.20816,9.99765,18,10z M18,22c-2.20914,0-4-1.79086-4-4s1.79086-4,4-4s4,1.79086,4,4C21.99765,20.20816,20.20816,21.99765,18,22z M6,16c-2.20914,0-4-1.79086-4-4s1.79086-4,4-4s4,1.79086,4,4C9.99765,14.20816,8.20816,15.99765,6,16z"></path><path class="uim-primary" d="M9.81915 10.87286l5.10223-2.3476c-.42291-.51483-.72577-1.12769-.84937-1.8103L8.79431 9.14337C9.27545 9.61407 9.62341 10.20996 9.81915 10.87286zM14.92139 15.47473l-5.10321-2.34808c-.19623.66272-.54443 1.25848-1.0257 1.72913l5.27954 2.42926C14.19562 16.60242 14.49847 15.98956 14.92139 15.47473z"></path></svg>
									<v-box></v-box>
									<span>Compartir</span>
								</a>
								<a class="f-c cd-dashboard-item" @click="moduleActiveId = 'md_info'" href="#" :style="{fill: colors[5]}">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><circle cx="12" cy="12" r="10" class="uim-tertiary"></circle><path class="uim-primary" d="M12 17a.99943.99943 0 0 1-1-1V12a1 1 0 0 1 2 0v4A.99943.99943 0 0 1 12 17zM12 9a.9994.9994 0 0 1-.37988-.08008A1.14718 1.14718 0 0 1 11.29 8.71.98946.98946 0 0 1 11 8a.83154.83154 0 0 1 .08008-.37988A1.14718 1.14718 0 0 1 11.29 7.29a1.02883 1.02883 0 0 1 .33008-.21.99414.99414 0 0 1 .75976 0 1.03947 1.03947 0 0 1 .33008.21A1.05232 1.05232 0 0 1 13 8a.99042.99042 0 0 1-1 1z"></path></svg>
									<v-box></v-box>
									<span>Información</span>
								</a>
								<a class="f-c cd-dashboard-item" @click="loadCourses" href="#" :style="{fill: colors[6]}">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path class="uim-tertiary" d="M18.42926,7.7542A6.99612,6.99612,0,0,0,5.06079,9.64433,3.994,3.994,0,0,0,6,17.52177H17A4.98638,4.98638,0,0,0,18.42926,7.7542Z"></path><path class="uim-primary" d="M15,16.75H12.75a1,1,0,0,1,0-2H14V13.5a1,1,0,0,1,2,0v2.25A1,1,0,0,1,15,16.75Z"></path><path class="uim-primary" d="M12,20.5a4,4,0,1,1,3.87158-4.99658,1.00011,1.00011,0,1,1-1.93847.49316,2.00218,2.00218,0,1,0-.61084,2,1.00012,1.00012,0,0,1,1.31543,1.50684A4.01637,4.01637,0,0,1,12,20.5Z"></path></svg>
									<v-box></v-box>
									<span>Actualizar</span>
								</a>
								<a class="f-c cd-dashboard-item" @click="applyNewStyle = !applyNewStyle; applyTheme()" href="#" :style="{fill: colors[7]}">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path class="uim-quaternary" d="M15,23h-2c-1.10405-0.00126-1.99874-0.89595-2-2v-4c0.00126-1.10405,0.89595-1.99874,2-2h2c1.10405,0.00126,1.99874,0.89595,2,2v4C16.99874,22.10405,16.10405,22.99874,15,23z"></path><path class="uim-tertiary" d="M18,9h-8C8.34389,8.99819,7.00181,7.65611,7,6V4c0.00181-1.65611,1.34389-2.99819,3-3h8c1.65611,0.00181,2.99819,1.34389,3,3v2C20.99819,7.65611,19.65611,8.99819,18,9z"></path><path class="uim-primary" d="M12,11H6c-0.55206-0.00055-0.99945-0.44794-1-1V7c0.00055-0.55206,0.44794-0.99945,1-1h1V4H6C4.34387,4.00183,3.00183,5.34387,3,7v3c0.00183,1.65613,1.34387,2.99817,3,3h6c0.55206,0.00055,0.99945,0.44794,1,1v1h2v-1C14.99817,12.34387,13.65613,11.00183,12,11z"></path></svg>
									<v-box></v-box>
									<span>{{applyNewStyle ? 'Quitar Tema' :'Cambiar Tema'}}</span>
								</a>
							</div>
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
					
					</div>
				</vcd-module>
			</div>
			
		</div>
		`
		))


		

		//CREAMOS LAS VARIABLES QUE ALMACENAREMOS EN EL LOCALSTORAGE DEL SITIO WEB PARA EVITAR RECARGAS
		let defdata = createStorage({
			schedule: {
				data: [],
				default: true
			},
			generalActividities: [],
			generalActividitiesArchived: [],
			coursesList: [],
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
				days: ['LU', 'MA', 'MI', 'JU', 'VI'],
				updating: false,
				protocol: protocol,
				modulesTitles: {
					'-1': 'Información adicional',
					0: 'Actividades Pendientes',
					1: 'Actividades Archivadas',
					'dashboard': 'DASHBOARD',
					3: 'Lista de Foros',
					4: 'Lista de Exámenes',
					'qr': 'Sync',
					'share': 'Compartir'
				},
				icon_link: 'mdi-cursor-pointer',
				now: (new Date()).getTime(),
				qr: '',
				colors: ['#697ce2', '#f5b551', '#3dbbf4', '#f9445a', '#00d06a', '#845aec', '#77858f', '#17997c', '#09a281', '#204f6e']
			},
			computed: {
//
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
					this.openPanel = false 
					this.moduleActiveId = 'md_activities'
				},
				//CREATE FUNCTION TO CONVERT HLS TO RGB STRING
				hlsToRgb({h, l, s}) {
					var r, g, b;

					if (s == 0) {
						r = g = b = l; // achromatic
					} else {
						function hue2rgb(p, q, t) {
							if (t < 0) t += 1;
							if (t > 1) t -= 1;
							if (t < 1 / 6) return p + (q - p) * 6 * t;
							if (t < 1 / 2) return q;
							if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
							return p;
						}

						var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
						var p = 2 * l - q;
						r = hue2rgb(p, q, h + 1 / 3);
						g = hue2rgb(p, q, h);
						b = hue2rgb(p, q, h - 1 / 3);
					}

					return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;	
				},
				hslToHex({h, s, l}) {
					var r, g, b;

					if (s == 0) {
						r = g = b = l; // achromatic
					} else {
						function hue2rgb(p, q, t) {
							if (t < 0) t += 1;
							if (t > 1) t -= 1;
							if (t < 1 / 6) return p + (q - p) * 6 * t;
							if (t < 1 / 2) return q;
							if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
							return p;
						}

						var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
						var p = 2 * l - q;
						r = hue2rgb(p, q, h + 1 / 3);
						g = hue2rgb(p, q, h);
						b = hue2rgb(p, q, h - 1 / 3);
					}

					return '#' + Math.round(r * 255).toString(16) + Math.round(g * 255).toString(16) + Math.round(b * 255).toString(16);
				},
				hexToHSL(hex) {
					var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
					var r = parseInt(result[1], 16);
					var g = parseInt(result[2], 16);
					var b = parseInt(result[3], 16);
					r /= 255, g /= 255, b /= 255;
					var max = Math.max(r, g, b), min = Math.min(r, g, b);
					var h, s, l = (max + min) / 2;

					if (max == min) {
						h = s = 0; // achromatic
					} else {
						var d = max - min;
						s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
						switch (max) {
							case r: h = (g - b) / d + (g < b ? 6 : 0); break;
							case g: h = (b - r) / d + 2; break;
							case b: h = (r - g) / d + 4; break;
						}
						h /= 6;
					}

					return {h, s, l};
				},
				saturateColor(color, saturation) {
					let hsl = this.hexToHSL(color)
					hsl.l = .43
					hsl.s = .90
					return this.hlsToRgb(hsl)
				},
				colorCourse(course) {
					if (course.includes(' (')) course = this.removeGroupsText(course)
					let color = this.colors[this.courses.list.findIndex(e => e.name == course) ?? 0]
					let color2 = this.saturateColor(color)
					
					return {linear: `linear-gradient(35deg, ${color2}, ${color})`, solid: color}
				},
				randomNumber(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
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
				async loadLibrary(courses){
					for (const course of courses) {
						let response = await fetch(this.protocol + `://aulavirtual.unamad.edu.pe/web/unit/${course.sectionId}/get?s=${course.sectionId}`)
						if (response.ok) {
							(await response.json()).forEach(unit => {
								if (unit.contents.length) {
									unit.contents.forEach(content => {
										fetch(this.protocol + `://aulavirtual.unamad.edu.pe/web/unit/contenidos/${content.id}`).then(e => e.json()).then(contentDeep => {
											//console.log(contentDeep);
										})
									});
									/**/
								}
								
							})
							
								//console.log(info);
							/*if (info.contents.length) {
							}
							*/
						}
					}
				},
				async loadConferences() {
					let listconferences = []
					let protoConferences = []
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
								if (conference.state != "Finalizado" || (new Date(conference.endTime)).getTime() > this.now || true) {
									listconferences.push(conference);
									course.conferences++
								}
							});
						}
						course.conferencesUpdating = !1
					}
					this.conferences.list = listconferences
					listconferences.forEach(conference => {
						protoConferences.push({
							id: conference.id,
							dateBegin: conference.startTime,
							dateEnd: conference.endTime,
							title: conference.title,
							courseName: conference.nameCourse,
							unit: conference.classid,
							isEnded: conference.state.toLowerCase() == "finalizado",
							type: 'CONFERENCE',
							url: conference.url,
							sectionId: conference.sectionId
						})
					})
					protoConferences = protoConferences.filter((e, i) => i < 4)
					this.generalActividities = this.generalActividities.filter(e => e.type != 'CONFERENCE').concat(protoConferences)
				},
				async loadHomeworks(courses) {
					var listhomework = []
					var protoHomeworks = []

					for (let course of courses) {
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
									protoHomeworks.push({
										id: task.id,
										dateBegin: task.dateBeginCustom,
										dateEnd: task.dateEndCustom,
										title: task.title,
										courseName: task.nameCourse,
										unit: task.unidad,
										isEnded: task.state != 'ACT',
										type: 'HOMEWORK',
										intents: task.intents,
										intentsUseds: task.homeworkstds,
										description: task.description,
										sectionId: task.sectionId,
										isGroup: task.isGroup,
										url: this.protocol + '://aulavirtual.unamad.edu.pe/web/homework/upload?h='+ task.id +'&s=' + task.sectionId,
										urlPanel: this.protocol + '://aulavirtual.unamad.edu.pe/web/homework?s=' + task.sectionId
									});
									if (task.homeworkstds == 0) course.homeworks.count++
								}
							});
						}
						course.homeworks.isUpdating = !1
					}
					this.homeworks.list = listhomework
					this.generalActividities = this.generalActividities.filter(e => e.type != 'HOMEWORK').concat(protoHomeworks.filter(e => e.intentsUseds == 0))
					this.generalActividitiesArchived = this.generalActividitiesArchived.filter(e => e.type != 'HOMEWORK').concat(protoHomeworks.filter(e => e.intentsUseds > 0))
				},
				async loadExams() {
					let exams = []
					let protoExams = []
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
					exams.forEach(exam => {
						protoExams.push({
							id: exam.evaluationId,
							dateBegin: exam.dateBegin,
							intents: exam.intent,
							courseName: exam.nameCourse,
							unit: exam.unidad,
							sectionId: exam.sectionId,
							type: 'EXAM',
							url: this.protocol + '://aulavirtual.unamad.edu.pe/web/evaluations/ListAllTests?s=' + exam.sectionId,
							urlPanel: this.protocol + '://aulavirtual.unamad.edu.pe/web/evaluations/ListAllTests?s=' + exam.sectionId
						})
					})
					this.generalActividities = this.generalActividities.filter(e => e.type != 'EXAM').concat(protoExams)
				},
				async loadForums() {
					let listforums = []
					let protoForums = []
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
					listforums.forEach(forum => {
						protoForums.push({
							id: forum.forumId,
							dateBegin: forum.dateBegin,
							dateEnd: forum.dateEnd,
							title: forum.name,
							courseName: forum.nameCourse,
							unit: forum.unidadName,
							isEnded: forum.isEnded,
							type: 'FORUM',
							answers: forum.answers,
							myAnswers: forum.participations,
							sectionId: forum.sectionId,
							url: this.protocol + '://aulavirtual.unamad.edu.pe/web/forum/details?f=' + forum.forumId + '&s=' + forum.sectionId,
							urlPanel: this.protocol + '://aulavirtual.unamad.edu.pe/web/forum?s=' + forum.sectionId
						})
					})
					this.generalActividities = this.generalActividities.filter(act => act.type != 'FORUM').concat(protoForums.filter(forum => forum.myAnswers == 0))
					this.generalActividitiesArchived = this.generalActividitiesArchived.filter(act => act.type != 'FORUM').concat(protoForums.filter(forum => forum.myAnswers > 0))
				},
				loadData2() {
					this.loadConferences()
					this.loadExams()
					this.loadHomeworks(this.courses.list)
					this.loadForums()

					this.loadLibrary(this.courses.list)
				},
				async loadCourses() {

					this.updating = true
					let response = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/user/info/system/courseinrole')
					if (response.ok) {
						response.json().then(data => {
							this.coursesList = data
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
					if (message.schedule != undefined) {
						message.schedule.forEach(e => {
							e.startNormalized = {day: new Date(e.start).getDay(), hour: new Date(e.start).getHours(), minute: new Date(e.start).getMinutes()}
							e.endNormalized = {day: new Date(e.end).getDay(), hour: new Date(e.end).getHours(), minute: new Date(e.end).getMinutes()}
						})
						this.schedule.data = message.schedule
					}
				});
				chrome.runtime.sendMessage('getinfo');
			},
			mounted() {
				document.querySelector('.quick-nav-trigger')?.addEventListener('click', ()=>{
					this.minimizeApp()
				})
				this.applyTheme()
				document.addEventListener('keyup', (e) => {
					if(e.key === "Escape") {
						this.minimizeApp()
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