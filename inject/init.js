(() => {
	let protocol = location.protocol == "https:" ? 'https' : 'http'
	if(window.location.pathname != '/login'){

	function htmlToElement(html) {var template = document.createElement('template');html = html.trim();template.innerHTML = html;return template.content.firstChild;}

	document.head.appendChild(htmlToElement('<link rel="stylesheet" href="https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css">'))
	document.body.appendChild(htmlToElement(
		/*html*/
	`<div id="vueapp">
		<a id="btn-modal" @click="modal.enable = !modal.enable" href="#">
			<span v-if="actividities">{{actividities}}</span>
			{{actividities ? 'Actividades' :'Sin Actividades'}}
		</a>
		<div id="modelinject" style="display: none;" v-show="modal.enable">
			<div ref="modal" class="mdl-dialog">
				<div class="mdl-layout__header">
					<div class="mdl-layout__header-row" style="padding: 0 1rem; justify-content: space-between">
						<div>
							<a href="#" class="cd-nav-btn mdl-button" :class="tabposition == 0 ? 'active' : ''" @click="tabposition = 0">({{courses_list.length}}) Cursos</a>
							
							<a v-show="homeworks_list.length" href="#" class="cd-nav-btn mdl-button " :class="tabposition == 1 ? 'active' : ''" @click="tabposition = 1">({{homeworks_list.length}}) Tareas</a>
							
							<a v-show="conferences_list.length" href="#" class="cd-nav-btn mdl-button " :class="tabposition == 2 ? 'active' : ''" @click="tabposition = 2">({{conferences_list.length}}) Conferencias</a>
							
							<a v-show="forums.list.length" href="#" class="cd-nav-btn mdl-button " :class="tabposition == 3? 'active' : ''" @click="tabposition = 3">({{forums.list.length}}) Foros</a>
						</div>	
						<a href="#" class="cd-nav-btn mdl-button" :class="tabposition == -1 ? 'active' : ''" @click="tabposition = -1" style="margin-left: 1rem;padding: 0; min-width: 36px">
							<i class="mdi mdi-information"></i>
						</a>
					</div>
				</div>

				
				<div class="mdl-dialog__content" v-show="tabposition == -1">
					<vcd-info/>
				</div>
				
				<div class="mdl-dialog__content" v-show="tabposition == 0">
					<div class="mdl-typography--headline">Lista de cursos</div><br>
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
								<span style="height: 20px; display: block">Sin actividades pendientes</span>
							</div>
						</div>
					</div>
					
				</div>
				
				<div class="mdl-dialog__content" v-show="tabposition == 3">
					<div class="mdl-typography--headline">Lista de Foros</div><br>
					<vcd-forums v-for="forum in forums.list" :data="forum"></vcd-forums>
				</div>
				<div class="mdl-dialog__content" v-show="tabposition == 1">
					<div class="mdl-typography--headline">Tareas pendientes</div><br>
					<vcd-homework v-for="homework in homeworks_list" :data="homework"></vcd-homework>
				</div>

				<div class="mdl-dialog__content" v-show="tabposition == 2">
					<div class="mdl-typography--headline">Conferencias</div><br>
					<vcd-conference v-for="(conference, i) in conferences_list" :data="conference"></vcd-conference>
				</div>

				<div class="mdl-dialog__actions">
					<a href="#" @click="modal.enable = !modal.enable" class="mdl-button">Cerrar</a>
					<a href="#" @click="loadCourses" class="mdl-button mdl-button--raised mdl-button--colored" :disabled="updating">{{updating ? 'Espere...' : 'Actualizar'}}</a>
					
				</div>
			</div>
		</div>
	</div>
		`))
	
	

	if (localStorage.getItem('openmodal') == undefined) localStorage.setItem('openmodal', true)
	

	new Vue({
		el: '#vueapp',
		data: {
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
			mounts: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			updating: false, 
			protocol: protocol
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
			actividities(){
				return this.courses.list.reduce((acum, c) => acum + c.homeworks + c.forums + c.conferences, 0)
			}
		},
		watch: {
			'modal.enable': function(val){
				localStorage.setItem('openmodal', val)
			}
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

							conference.dateEndString = `${day} ${this.mounts[mount - 1]} ${year}, ${conference.start}`;

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
							task.sectionId = course.sectionId
							task.nameCourse = course.name
							task.dateEndString = `${day} ${this.mounts[mount - 1]} ${year}, ${hour}`;

							if (task.state == 'ACT') {
								listhomework.push(task); 
								course.homeworks += 1
							}
						});
					}
					course.homeworksUpdating = !1
				}
				this.homeworks.list = listhomework


			},
			loadForums(){
				this.forums.list = []
				this.courses.list.forEach(course => {
					course.forums = 0
					course.forumsUpdating = !0
					$.get(this.protocol + '://aulavirtual.unamad.edu.pe/web/forum/list?s=' + course.sectionId, forums => {
						course.forumsUpdating = !1
						//console.log(forums);
						forums.forEach(forum => {
							forum.sectionId = course.sectionId
							forum.nameCourse = course.name

							let [date, hour] = forum.dateEndView.split(' ');
							let [day, mount, year] = date.split('/')
							forum.dateEndString = `${day} ${this.mounts[mount - 1]} ${year}, ${hour}`;

							[date, hour] = forum.dateStartView.split(' ');
							[day, mount, year] = date.split('/')
							forum.dateStartString = `${day} ${this.mounts[mount - 1]} ${year}, ${hour}`;

							forum.differenceTime = this.dateDiffInDays(new Date(), forum.dateBegin);
							if(forum.state) {this.forums.list.push(forum); course.forums++}
						});
					})
				});
			},
			loadData2(){
				this.loadConferences()
				this.loadHomeworks()
				this.loadForums()
			},
			loadCourses(){
				this.modal.enable = JSON.parse(localStorage.getItem('openmodal').toLowerCase())

				this.updating = true
				$.get(this.protocol + '://aulavirtual.unamad.edu.pe/web/user/info/system/courseinrole', data => {
					this.updating = false
					this.courses.list = data.map(d => {return {homeworksUpdating: !1, homeworks: 0, forumsUpdating: !1, forums: 0, conferencesUpdating: !1, conferences: 0, ...d}})
					this.loadData2()
					

				})
			}
		},
		created(){
			this.loadCourses()
			setInterval(()=>{
				console.log('Update Data');
				this.loadData2()
				
			}, 1000 * 60)
		},
		mounted(){
			
		}
	})
}
	
})();
