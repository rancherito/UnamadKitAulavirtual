(() => {
	let protocol = location.protocol == "https:" ? 'https' : 'http'
	if(window.location.pathname != '/login'){

	/*{
		let wrapper = htmlToElement(`<div class="cd-anunces"></div>`);
		let anunces = document.querySelectorAll('.page-content>.ng-scope > *:nth-child(2) > .row')[0]
		anunces.parentNode.appendChild(wrapper);
		wrapper.appendChild(anunces)
	}*/
	document.head.appendChild(htmlToElement('<link rel="stylesheet" href="https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css">'))
	document.head.appendChild(htmlToElement('<link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet"></link>'))

	document.body.appendChild(htmlToElement(
		/*html*/
	`<div id="vueapp">
		<div v-if="applyNewStyle" v-html="styleAula"></div>
		<div id="cd-navmenu" :class="menuTabposition == 0 ? '' : 'cd-navmenu-open'">
			<div style="padding-top: 60px">
				<a v-show="menuTabposition" href="#" class="cd-btn-navmenu" @click="tabposition = -1; menuTabposition = 1">
					<i class="mdi mdi-information"></i>
				</a>
				<a v-show="menuTabposition" href="#" @click="loadCourses" class="cd-btn-navmenu" :disabled="updating">
					<i class="mdi mdi-reload" :class="updating ? 'mdi-spin' : ''"></i>
				</a>
				<a class="cd-btn-navmenu" @click="applyNewStyle = !applyNewStyle" href="#">
					<i class="mdi" :class="applyNewStyle ? 'mdi-invert-colors-off' : 'mdi-format-color-fill'"></i>
				</a>
			</div>
			<div>
				
				<a v-if="schedule.data.length" class="cd-btn-navmenu" @click="menuTabposition = 2" href="#" :class="menuTabposition == 2 ? 'active' : ''">
					<i class="mdi mdi-calendar"></i>
				</a>
				<a class="cd-btn-navmenu" @click="menuTabposition = 1" href="#" :class="menuTabposition == 1 || menuTabposition == 0 ? 'active' : ''">
					<span v-if="actividities">{{actividities}}</span>
					<i class="mdi mdi-school"></i>
				</a>
				<a v-if="menuTabposition != 0" class="cd-btn-navmenu" @click="menuTabposition = 0" href="#">
					<i class="mdi mdi-close"></i>
				</a>
			</div>
			
		</div>
		
		<div id="modalschedule" style="display: none;" v-show="menuTabposition == 2">
			<div class="cd-schedule-container f-c">
				<div class="cd-schedule">
					<div class="cd-schedule-head">
						<span style="width: 60px; background: var(--panel)"></span>
						<span v-for="(day, i) of days" style="width: calc(20% - (60px / 5))" :style="{background: (new Date()).getDay() == i + 1? 'var(--panel)' : 'transparent'}">
							{{day}}
						</span>
					</div>
					<div class="cd-schedule-body" :style="{'max-height': (scheduleTimes.hours.length * 40) + 'px'}">
						<div class="cd-schedule-hours">
							<span v-for="(hour, h) in scheduleTimes.hours" class="f-c" style="height: 40px; max-height: 40px}">
								<b style="transform: translateY(-50%)">{{hour}}</b>
							</span>
						</div>
						<div class="cd-schedule-courses">
							<div class="cd-schedule-day" v-for="(day, i) in scheduleTimes.schedule">
								<div v-for="courses of day" style="overflow: hidden" v-if="courses.size" :style="{background: (new Date()).getDay() == i? 'var(--panel)' : 'transparent', height: (courses.size * 40) + 'px', 'max-height': (courses.size * 40) + 'px'}">
									<div v-for="course in courses.courses" class="cd-schedule-course" :class="{'cd-schedule-dcourse' :courses.courses.length > 1}" :style="{'max-width': (100/courses.courses.length) + '%', 'width': (100/courses.courses.length) + '%'}">
										<span class="f-c" :style="{background: colorCourse(course.title)}">{{removeGroupsText(course.title)}}</span> 
									</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		<div id="modelinject" class="acd-fadeOut" style="display: none;" v-show="menuTabposition == 1">
			
			<div class="cd-dialog">
				
				
				<div class="cd-dialog-actions-top">
					<div class="mdl-typography--headline" style="color: white">{{modulesTitles[tabposition]}}</div>
					<div style="display: flex">						
					</div>
					
				</div>

				
				
				<div style="flex: 1;">
					<div class="mdl-dialog__content" v-show="tabposition == -1">
						<vcd-info/>
					</div>
					
					<div class="mdl-dialog__content f-c" style="height: 100%" v-show="tabposition == 'qr'">
						<div style="background: white; border-radius: 1rem; padding: 1rem">
							<div ref="qrplaceholder"></div>
						</div>
						<br>
						<span>NO compartas este codigo QR<span>
						
					</div>
					<div class="mdl-dialog__content acd-fadeOut" v-show="tabposition == 0">
						<div v-for="course in courses_list" class="cd-list">
							<i class="cd-list-icon mdi" :class="course.exams.isUpdating || course.homeworks.isUpdating || course.forums.isUpdating|| course.conferencesUpdating ? 'mdi-loading mdi-spin' : 'mdi-book'"></i>
							<div class="cd-list-content">
								<div class="cd-list-title">{{course.name}}</div>
								<div 
									class="cd-list-subtitle2" 
									v-if="course.homeworks.count + course.forums.count + course.conferences + course.exams.count">

									<span v-if="course.homeworks.count" class="mdl-chip mdl-chip-sm">
										<span class="mdl-chip__text">{{'Tareas: ' + course.homeworks.count}}</span>
									</span>
									<span v-if="course.forums.count" class="mdl-chip mdl-chip-sm">
										<span class="mdl-chip__text">{{'Foros: ' + course.forums.count}}</span>
									</span>
									<span v-if="course.conferences" class="mdl-chip mdl-chip-sm">
										<span class="mdl-chip__text">{{'Confer.: ' + course.conferences}}</span>
									</span>
									<span v-if="course.exams.count" class="mdl-chip mdl-chip-sm">
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
							//BOTON PAR OCULPTAR TAREAS REALIZADAS
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
						<div v-if="forums_list.get.length">
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
				<div class="cd-tabsbox">
					<vcd-tabbox text="Menu" icon="mdi-folder-home" :counter="actividities" tabid="0"></vcd-tabbox>
					<vcd-tabbox text="Tareas" icon="mdi-bag-personal" :counter="homeworks_list.get.length" tabid="1"></vcd-tabbox>
					<vcd-tabbox text="Conferencias" icon="mdi-message-video" :counter="conferences_list.length" tabid="2"></vcd-tabbox>
					<vcd-tabbox text="Foros" icon="mdi-forum" :counter="forums_list.get.length" tabid="3"></vcd-tabbox>
					<vcd-tabbox text="Exámenes" icon="mdi-text-box" :counter="exams.list.length" tabid="4"></vcd-tabbox>
				</div>
			</div>
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
		conferences:{
			list: []
		},
		forums: {
			list: []
		},
		tabposition: 0,
		menuTabposition: 0,
		internetDate: null,
		localDate: null,
		user: null,
		applyNewStyle: false
	})
	

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
				'qr': 'Generar Llave'
			},
			icon_link: 'mdi-cursor-pointer',
			now: (new Date()).getTime(),
			styleAula: styleAula,
			colors: ['#4a9bed', '#ff5722', '#f5be39', '#cd4242', '#4caf50', '#845aec', '#77858f', '#563c63', '#280fb4', '#204f6e']
		},
		computed: {
			scheduleTimes(){
				let times2 = [], h = {}, times3 = []

				this.schedule.data.forEach(course => {
					let [s, e] = [(new Date(course.start)).getHours(), (new Date(course.end)).getHours()]
					for (let i = 0; i < e - s; i++) if (!times2.find(e => e == s + i)) times2.push(s + i)
				})
				times2.sort((a, b) => a - b)
				for (let i = times2[0] - 1; i <= times2[times2.length - 1] + 1; i++) times3.push(i)
				

				for (let i = 1; i <= 5; i++) {
					h[i] = {}
					times3.forEach(e => {
						let tem = this.schedule.data.filter(course => {
							const [dateS, dateE] = [new Date(course.start), new Date(course.end)]
							return dateS.getDay() == i && (e >= dateS.getHours() && e < dateE.getHours())
						})
						h[i][e] = {size: 1, courses: tem}
					})

					for (let ii = 0; ii < times3.length - 1; ii++) {
						const [currentTime, afterTime] = [h[i][times3[ii]], h[i][times3[ii + 1]]];
						if (
							times3[ii] + 1 == times3[ii + 1] && 
							currentTime.courses.length == afterTime.courses.length &&
							[...currentTime.courses].sort((a,b) => a.title > b.title ? 1 : -1).reduce((a, b) => a + b.title, '') == [...afterTime.courses].sort((a,b) => a.title > b.title ? 1 : -1).reduce((a, b) => a + b.title, '')
						) {
							afterTime.size += currentTime.size
							currentTime.size = 0
						}
					}
				}

				return {schedule: h, hours: times3};
			},
			homeworks_list(){
				const l = [...this.homeworks.list].sort((a,b) => a.dateEnd > b.dateEnd ? 1 : -1)

				let l_info = {get: [], archived: []}
				l.forEach(e => {
					if (e.homeworkstds) l_info.archived.push(e)
					else l_info.get.push(e)
				});

				return l_info
			},
			conferences_list(){
				return [...this.conferences.list].sort((a,b) => a.endTime > b.endTime ? 1 : -1)
			},
			courses_list(){
				return [...this.courses.list].sort((a,b) => (b.homeworks.count + b.forums.count + b.conferences) - (a.homeworks.count + a.forums.count + a.conferences))
			},
			forums_list(){
				const l = [...this.forums.list].sort((a,b) => a.dateEnd > b.dateEnd ? 1 : -1)
				let l_info = {get: [], archived: []}
				l.forEach(e => {
					if (e.participations) l_info.archived.push(e)
					else l_info.get.push(e)
				});
				return l_info
			},
			actividities(){
				return this.homeworks_list.get.length + this.conferences_list.length +  this.forums_list.get.length + this.exams.list.length
			}
		},
		watch: {
			...defdata.mutations,
		},
		methods: {
			colorCourse(course){
				if (course.includes(' (')) course = this.removeGroupsText(course)
				return this.colors[this.courses.list.findIndex(e => e.name == course) ?? 0]
			},
			removeGroupsText(course){
				return course.replace(/ \([a-z]\)/gi, '').slice(6)
			},
			addZeroTime(num){
				return (num > 9 ? '' : '0')+num
			},
			calculeNow(){
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
			getCookie(name) {
				const value = `; ${document.cookie}`;
				const parts = value.split(`; ${name}=`);
				if (parts.length === 2) return parts.pop().split(';').shift();
			},
			async loadConferences(){
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
							if(conference.state != "Finalizado") {listconferences.push(conference); course.conferences++}
						});
					}
					course.conferencesUpdating = !1
				}
				this.conferences.list = listconferences

			},
			async loadHomeworks(){
				var listhomework = []
				
				for (let course of this.courses.list) {
					course.homeworks.isUpdating = !0
					course.homeworks.count = 0
					let res = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/homework/list?s=' + course.sectionId);
					if(res.ok){
						(await res.json()).forEach(task => {
							let [date, hour] = task.dateEnd.split(' ');
							let [day, mount, year] = date.split('/')

							task.dateEndCustom = `${year}-${mount}-${day}T${hour}`;
							
							[date, hour] = task.dateBegin.split(' ');
							[day, mount, year] = date.split('/')

							task.dateBeginCustom = `${year}-${mount}-${day}T${hour}`;
							task.sectionId = course.sectionId
							task.nameCourse = course.name

							if (task.state == 'ACT') {
								listhomework.push(task); 
								if(task.homeworkstds == 0) course.homeworks.count++
							}
						});
					}
					course.homeworks.isUpdating = !1
				}
				this.homeworks.list = listhomework


			},
			async loadExams(){
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
			async loadForums(){
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
							if(forum.state){

								listforums.push(forum);

								//VERIFICAMOS SI HAY PARTICIPACIONES NUESTRAS EN LOS FOROS DE ANTERIORES PETICIONES, SI LAS HAY, NO LAS VERIFICAMOS, Y SI NO, LAS VERIFICAMOS
								let countParticipations = this.forums.list.find(e => e.forumId == forum.forumId)?.participations ?? 0
								if (countParticipations) forum.participations = countParticipations
								else {
									let resFourms = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/forum/detail?f=' + forum.forumId);
									if (resFourms.ok) {
										const d = await resFourms.json()
										for (const val of d.pages) {
											let resForumPage = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/forum/answers/list?f='+ d.forumId +'&page=' + (val - 1))
											if(resForumPage.ok){
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
			loadData2(){
				this.loadConferences()
				this.loadExams()
				this.loadHomeworks()
				this.loadForums()
			},
			async loadCourses(){

				this.updating = true
				let response = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/user/info/system/courseinrole')
				if (response.ok) {
					response.json().then(data => {
						this.updating = false
						this.courses.list = data.map(d => {return {
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
							conferencesUpdating: !1, conferences: 0, 
							...d
						}})
						this.loadData2()
					})
				}
			}
		},

		async created(){
			//this.calculeTimes()
			this.calculeNow()
			setInterval(this.calculeNow, 1000)

			if(this.user == null){
				let responseGetUser = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/user/info/data')
				if (responseGetUser.ok) this.user = await responseGetUser.json()
				
			}
			

			fetch(this.protocol + '://campus.unamad.edu.pe/timeutc').then(res => res.json()).then(data=>{
				///console.log(typeof data, data);
				const pre_utc = new Date((data.currentFileTime/10000 - 11644473600000) - (1000 * 60 * 60 * 5))
				this.internetDate = (new Date(`${pre_utc.getUTCFullYear()}-${this.addZeroTime(pre_utc.getUTCMonth() + 1)}-${this.addZeroTime(pre_utc.getUTCDate())}T${this.addZeroTime(pre_utc.getUTCHours())}:${this.addZeroTime(pre_utc.getUTCMinutes())}:${this.addZeroTime(pre_utc.getUTCSeconds())}`)).getTime();
				this.localDate = (new Date()).getTime();
			}).catch( e => {
				console.log('ERROR');
				this.internetDate = (new Date()).getTime();
				this.localDate = (new Date()).getTime();
			})
			this.loadCourses()
			setInterval(()=>{
				
				console.log('Update');
				this.loadData2()
				
			}, 1000 * 90)




			chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
				if (message.schedule != undefined) this.schedule.data = message.schedule
				//if (message.qrstring != undefined) console.log(message.qrstring)
			});
			chrome.runtime.sendMessage('getinfo');
		},
		mounted(){
		}
	})
}
	
})();
