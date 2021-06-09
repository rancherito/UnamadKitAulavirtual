(() => {
	let protocol = location.protocol == "https:" ? 'https' : 'http'
	if(window.location.pathname != '/login'){

	
	document.head.appendChild(htmlToElement('<link rel="stylesheet" href="https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css">'))
	document.body.appendChild(htmlToElement(
		/*html*/
	`<div id="vueapp">
		<a id="cd-btn-modal" @click="modal.enable = !modal.enable" href="#">
			<span v-if="actividities">{{actividities}}</span>
			<i class="mdi mdi-school"></i>
		</a>
		<div id="modelinject" style="display: none;" v-show="modal.enable">
			<div ref="modal" class="cd-dialog">
				
				
				<div class="cd-dialog-actions-top">
					<div class="mdl-typography--headline" style="color: white">{{modulesTitles[tabposition]}}</div>
					<div style="display: flex">
						<a href="#" class="f-c mdl-button mdl-button--icon" :class="tabposition == -1 ? 'active' : ''" @click="tabposition = -1">
							<i class="mdi mdi-information mdi-24px f-c"></i>
						</a>
						<a href="#" @click="loadCourses" class="f-c mdl-button mdl-button--icon" :disabled="updating">
							<i class="mdi mdi-reload mdi-24px f-c" :class="updating ? 'mdi-spin' : ''"></i>
						</a>
						
						<a href="#" @click="modal.enable = !modal.enable" class="f-c mdl-button mdl-button--icon">
							<i class="mdi mdi-close mdi-24px f-c"></i>
						</a>
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
					<div class="mdl-dialog__content" v-show="tabposition == 0">
						<div v-for="course in courses_list" class="cd-list">
							<i class="cd-list-icon mdi" :class="course.homeworksUpdating || course.forumsUpdating || course.conferencesUpdating ? 'mdi-loading mdi-spin' : 'mdi-book'"></i>
							<div class="cd-list-content">
								<div class="cd-list-title">{{course.name}}</div>
								<div 
									class="cd-list-subtitle2" 
									v-if="course.homeworks + course.forums + course.conferences">

									<span v-if="course.homeworks" class="mdl-chip mdl-chip-sm">
										<span class="mdl-chip__text">{{'Tareas: ' + course.homeworks}}</span>
									</span>
									<span v-if="course.forums" class="mdl-chip mdl-chip-sm">
										<span class="mdl-chip__text">{{'Foros: ' + course.forums}}</span>
									</span>
									<span v-if="course.conferences" class="mdl-chip mdl-chip-sm">
										<span class="mdl-chip__text">{{'Confer.: ' + course.conferences}}</span>
									</span>
								</div>
								<div class="cd-list-subtitle2" v-else>
									<span style="height: 24px; display: block">Sin actividades pendientes</span>
								</div>
							</div>
						</div>
						
					</div>
					<div class="mdl-dialog__content" v-show="tabposition == 1">
						<div style="display: flex; justify-content: space-between; padding-bottom: .5rem">
							<span style="padding: .5rem 1rem; background-color: var(--panel); border-radius: .5rem">Inicia</span>
							<span style="padding: .5rem 1rem; background-color: var(--panel); border-radius: .5rem">Termina en | Link</span>
						</div>
						<vcd-homework v-for="homework in homeworks_list" :data="homework"></vcd-homework>
					</div>

					<div class="mdl-dialog__content" v-show="tabposition == 2">
						<vcd-conference v-for="(conference, i) in conferences_list" :data="conference"></vcd-conference>
					</div>
					<div class="mdl-dialog__content" v-show="tabposition == 3">
						<vcd-forums v-for="forum in forums.list" :data="forum"></vcd-forums>
					</div>
				</div>
				<div class="cd-tabsbox">
					<a href="#" class="cd-nav-btn" :class="tabposition == 0 ? 'active' : ''" @click="tabposition = 0">
						<div>
							<b>{{courses_list.length}}</b>
							<i class="mdi mdi-book"></i>
						</div>
						<span>Cursos</span>
					</a>
					
					<a href="#" class="cd-nav-btn" :class="tabposition == 1 ? 'active' : ''" @click="tabposition = 1">
						<div>
							<b v-show="homeworks_list.length">{{homeworks_list.length}}</b>
							<i class="mdi mdi-bag-personal"></i>
						</div>
						<span>Tareas</span>
					</a>
					
					<a href="#" class="cd-nav-btn" :class="tabposition == 2 ? 'active' : ''" @click="tabposition = 2">
						<div>
							<b v-show="conferences_list.length">{{conferences_list.length}}</b>
							<i class="mdi mdi-message-video"></i>
						</div>
						<span >Conferencias</span>
					</a>
					
					<a href="#" class="cd-nav-btn" :class="tabposition == 3? 'active' : ''" @click="tabposition = 3">
						<div>
							<b v-show="forums_list.length">{{forums_list.length}}</b>
							<i class="mdi mdi-forum"></i>
						</div>
						<span>Foros</span>
					</a>
				
				</div>
			</div>
		</div>
	</div>
		`))

	
	
	
	let defdata = createStorage({
		modal: {
			enable: true
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
	})
	

	new Vue({
		el: '#vueapp',
		data: {
			...defdata.variables,
			months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			updating: false, 
			protocol: protocol,
			modulesTitles: {
				'-1': 'Info', 
				0: 'Lista de cursos', 
				1: 'Tareas pendientes', 
				2: 'Conferencias', 
				3: 'Lista de Foros', 
				'qr': 'Generar Llave'
			}
		},
		computed: {
			homeworks_list(){
				return [...this.homeworks.list].sort((a,b) => a.dateEnd > b.dateEnd ? -1 : 1)
			},
			conferences_list(){
				return [...this.conferences.list].sort((a,b) => a.endTime > b.endTime ? 1 : -1)
			},
			courses_list(){
				return [...this.courses.list].sort((a,b) => (b.homeworks + b.forums + b.conferences) - (a.homeworks + a.forums + a.conferences))
			},
			forums_list(){
				return [...this.forums.list].sort((a,b) => a.dateStartView > b.dateStartView ? 1 : -1)
			},
			actividities(){
				return this.courses.list.reduce((acum, c) => acum + c.homeworks + c.forums + c.conferences, 0)
			}
		},
		watch: {
			...defdata.mutations
		},
		methods: {
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
							const [day, mount, year] = conference.date.split('/')

							conference.dateEndString = `${day} ${this.months[mount - 1]} ${year}, ${conference.start}`;

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
					course.homeworksUpdating = !0
					course.homeworks = 0
					let res = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/homework/list?s=' + course.sectionId);
					if(res.ok){
						(await res.json()).forEach(task => {
							let [date, hour] = task.dateEnd.split(' ');
							let [day, mount, year] = date.split('/')

							task.dateEndCuston = `${year}-${mount}-${day} ${hour}`
							
							task.sectionId = course.sectionId
							task.nameCourse = course.name
							task.dateEndString = `${day} ${this.months[mount - 1]} ${year}, ${hour}`;

							[date, hour] = task.dateBegin.split(' ');
							[day, mount, year] = date.split('/')

							task.dateBeginCuston = `${year}-${mount}-${day} ${hour}`

							if (task.state == 'ACT') {
								
								listhomework.push(task); 
								course.homeworks += 1
							}
						});
					}
					course.homeworksUpdating = !1
				}
				if (listhomework.length) {
					console.log(listhomework[0]);
				}
				this.homeworks.list = listhomework


			},
			async loadForums(){
				let listforums = []
				for (const course of this.courses.list) {
					course.forums = 0
					course.forumsUpdating = !0
					let response = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/forum/list?s=' + course.sectionId)
					if (response.ok) {
						(await response.json()).forEach(forum => {
							forum.sectionId = course.sectionId
							forum.nameCourse = course.name

							let [date, hour] = forum.dateEndView.split(' ');
							let [day, mount, year] = date.split('/')
							forum.dateEndString = `${day} ${this.months[mount - 1]} ${year}, ${hour}`;

							[date, hour] = forum.dateStartView.split(' ');
							[day, mount, year] = date.split('/')
							forum.dateStartString = `${day} ${this.months[mount - 1]} ${year}, ${hour}`;

							forum.differenceTime = this.dateDiffInDays(new Date(), forum.dateBegin);
							if(forum.state){listforums.push(forum); course.forums++}
						});
					}
					course.forumsUpdating = !1
				}
				this.forums.list = listforums;
				
			},
			async loadData2(){
				await this.loadConferences()
				await this.loadHomeworks()
				await this.loadForums()
			},
			async loadCourses(){

				this.updating = true
				let response = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/user/info/system/courseinrole')
				if (response.ok) {
					response.json().then(data => {
						this.updating = false
						this.courses.list = data.map(d => {return {homeworksUpdating: !1, homeworks: 0, forumsUpdating: !1, forums: 0, conferencesUpdating: !1, conferences: 0, ...d}})
						this.loadData2()
					})
				}
			}
		},
		created(){
			
			this.loadCourses()
			setInterval(()=>{
				console.log('Update Data');
				this.loadData2()
				
			}, 1000 * 90)
		},
		mounted(){
		}
	})
}
	
})();
