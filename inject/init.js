(() => { if(window.location.pathname != '/login'){
	$('head').append('<link rel="stylesheet" href="https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css">')
	$(
		/*html*/
	`<div id="vueapp">
		<button id="btn-modal" @click="modal.enable = !modal.enable" href="#"  class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
			<i class="mdi mdi-plus"></i>
		</button>
		<div id="modelinject" style="display: none;" v-show="modal.enable">
			<div ref="modal" class="mdl-dialog">
				<div class="mdl-layout__header">
					<div class="mdl-layout__header-row" style="padding: 0 1rem">
						<ul class="mdl-navigation">
							
							<a href="#" class="cd-nav-btn mdl-button " :class="tabposition == 0 ? 'active' : ''" @click="tabposition = 0">({{courses_list.length}}) Cursos</a>
							
							<a v-show="homeworks_list.length" href="#" class="cd-nav-btn mdl-button " :class="tabposition == 1 ? 'active' : ''" @click="tabposition = 1">({{homeworks_list.length}}) Tareas</a>
							
							<a v-show="conferences_list.length" href="#" class="cd-nav-btn mdl-button " :class="tabposition == 2 ? 'active' : ''" @click="tabposition = 2">({{conferences_list.length}}) V. Conferencias</a>
							
							<a v-show="forums.list.length" href="#" class="cd-nav-btn mdl-button " :class="tabposition == 3? 'active' : ''" @click="tabposition = 3">({{forums.list.length}}) Foros</a>
							
						</ul>
					</div>
				</div>
				<div class="mdl-dialog__content" v-show="tabposition == 3">
					<div class="mdl-typography--headline">Lista de Foros</div><br>
					<div v-for="forum in forums.list" class="cd-list">
						<div class="cd-list-content">
							<a v-if="forum.differenceTime < 0" class="cd-list-more mdl-button mdl-button--colored" :href="'https://aulavirtual.unamad.edu.pe/web/forum/details?f=' + forum.forumId + '&s=' + forum.sectionId">Ir</a>
							<div class="cd-list-title">{{forum.name}}</div>
							<div class="cd-list-subtitle">CURSO: {{forum.nameCourse}}</div>
							<div class="cd-list-subtitle2">Inicia: {{forum.dateStartString}}</div>
							
							<div class="cd-list-subtitle2">Termina: {{forum.dateEndString}}</div>
						</div>
					</div>
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
				<div class="mdl-dialog__content" v-show="tabposition == 1">
					<div class="mdl-typography--headline">Tareas pendientes</div><br>
					<div v-for="homework in homeworks_list" class="cd-list">
						<i class="cd-list-icon mdi" :class="homework.isGroup? 'mdi-account-group' : 'mdi-bag-personal'"></i>
						<div class="cd-list-content">
							<a class="cd-list-more mdl-button mdl-button--raised mdl-button--colored" :href="'https://aulavirtual.unamad.edu.pe/web/homework?s=' + homework.sectionId">Ver Más</a>
							<div class="cd-list-title">{{homework.title}}</div>
							<!--<div class="cd-list-description" v-html="homework.description"></div>-->
                    		<div class="cd-list-subtitle">CURSO: {{homework.nameCourse}}</div>
							<div class="cd-list-subtitle2">Fin: {{homework.dateEndString}} | {{homework.isGroup ? 'GRUPAL':'INDIVIDUAL'}} | Intentos: {{homework.intents - homework.homeworkstds}}/{{homework.intents}}</div>
						</div>
					</div>
				</div>

				<div class="mdl-dialog__content" v-show="tabposition == 2">
					<div class="mdl-typography--headline">Conferencias</div><br>
					<div v-for="conference in conferences_list" class="cd-list">
						<div class="cd-list-content">
							<a class="cd-list-more mdl-button mdl-button--raised mdl-button--colored" :href="conference.url" target="_blank" :disabled="false">Abrir</a>
							<div class="cd-list-title">{{conference.title}}</div>
							<div class="cd-list-subtitle">CURSO: {{conference.nameCourse}}</div>
							<div class="cd-list-subtitle2">Inicia: {{conference.dateEndString}}</div>
						</div>
					</div>
				</div>

				<div class="mdl-dialog__actions">
					<a href="#" @click="modal.enable = !modal.enable" class="mdl-button">Cerrar</a>
					<a href="#" @click="loadCourses" class="mdl-button mdl-button--raised mdl-button--colored" :disabled="updating">{{updating ? 'Espere...' : 'Actualizar'}}</a>
					
				</div>
			</div>
		</div>
	</div>
		`).prependTo($('body'))
	
	

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
			updating: false
		},
		computed: {
			homeworks_list(){
				return this.homeworks.list.sort((a,b) => a.dateEnd > b.dateEnd ? -1 : 1)
			},
			conferences_list(){
				return this.conferences.list.sort((a,b) => a.endTime > b.endTime ? -1 : 1)
			},
			courses_list(){
				return this.courses.list.sort((a,b) => (b.homeworks + b.forums + b.conferences) - (a.homeworks + a.forums + a.conferences))
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

			loadConferences(){
				this.conferences.list = []
				this.courses.list.forEach(d1 => {
					d1.conferences = 0
					d1.conferencesUpdating = !0
					$.get('https://aulavirtual.unamad.edu.pe/web/conference/list?s=' + d1.sectionId, data3 => {
						//console.log(data3);
						d1.conferencesUpdating = !1
						data3.forEach(d3 => {
							let a = new RegExp("^(http|https)://", "i")
							
							if (!a.test(d3.url)) d3.url = 'https://' + d3.url

							const [day, mount, year] = d3.date.split('/')
							d3.dateEndString = `${day} ${this.mounts[mount - 1]} ${year}, ${d3.start}`;

							d3.sectionId = d1.sectionId
							d3.nameCourse = d1.name
							if(d3.state != "Finalizado") {this.conferences.list.push(d3); d1.conferences++}
						});
					})
				});

			},
			loadHomeworks(){
				this.homeworks.list = []
				

				this.courses.list.forEach(d1 => {
					//OBTENIENDO LISTA DE TAREAS PENDIENTES
					d1.homeworks = 0
					d1.homeworksUpdating = !0
					$.get('https://aulavirtual.unamad.edu.pe/web/homework/list?s=' + d1.sectionId, data2 => {
						//console.log(data2);
						d1.homeworksUpdating = !1
						data2.forEach(d2 => {
							const [date, hour] = d2.dateEnd.split(' ');
							const [day, mount, year] = date.split('/')
							d2.sectionId = d1.sectionId
							d2.dateEndString = `${day} ${this.mounts[mount - 1]} ${year}, ${hour}`;
							d2.nameCourse = d1.name
							if(d2.state == "ACT" && d2.intents > d2.homeworkstds) {this.homeworks.list.push(d2); d1.homeworks++;}
						});
						console.log(this.homeworks);
					})
				});
			},
			loadForums(){
				this.forums.list = []
				this.courses.list.forEach(course => {
					course.forums = 0
					course.forumsUpdating = !0
					$.get('https://aulavirtual.unamad.edu.pe/web/forum/list?s=' + course.sectionId, forums => {
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
				$.get('https://aulavirtual.unamad.edu.pe/web/user/info/system/courseinrole', data => {
					this.updating = false
					this.courses.list = data.map(d => {return {homeworksUpdating: !1, homeworks: 0, forumsUpdating: !1, forums: 0, conferencesUpdating: !1, conferences: 0, ...d}})
					this.loadData2()
					

				})
			}
		},
		created(){
			this.loadCourses()
			setInterval(()=>{
				this.loadData2()
				console.log('Update Data');
			}, 1000 * 60)
		},
		mounted(){
			
		}
	})
}
	
})();
