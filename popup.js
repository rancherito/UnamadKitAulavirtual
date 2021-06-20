const app = $('#app')
const text = $('#text')
const input = $('input')

let data = []
let da = localStorage.getItem('data')
if (da == undefined) localStorage.setItem('data', JSON.stringify(data))
else data = JSON.parse(da)

function aa() {
	localStorage.setItem('data', JSON.stringify(data))
	app.find('*').remove()
	data.forEach(e => {
		app.append(`<div>${e}</div>`)
	})
}
aa()
data._set = (val) => {data = [];val.forEach(e => {data.push(e)});aa()}
data._push = (val) => {data.push(val);aa()}


chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
		data._push(message)
		console.log(message);

		sendResponse(54454554)
		return true
});

$('button').click(() => {
	if (input.val() != '') {
		data._push(input.val())
		input.val('')
	}
})




chrome.tabs.query({
	active: true,
	currentWindow: true
}, function (tabs) {

	if (tabs[0].url.includes('://aulavirtual.unamad.edu.pe')) {
		//text.text('ESTAMOS EN EN AULA YEA')
		chrome.tabs.sendMessage(tabs[0].id, 'HOLA');
	} else {
		//text.text('NO ESTAMOS EN EN AULA, :|')
	}
});