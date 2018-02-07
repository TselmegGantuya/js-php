function loadJSON(callback){
	  var xobj = new XMLHttpRequest()
        xobj.overrideMimeType("application/json")
    xobj.open('GET', 'js/data.json', true)
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText)
          }
    }
    xobj.send(null) 
}
var hi= document.getElementById('button')
if(hi){
hi.addEventListener('click', function(){
question()
})
}
function app(){
  loadJSON(function(response) {
     var jobj = JSON.parse(response)
     console.log(jobj)
     let stem = document.getElementById('stemmen')
     stem.innerHTML += "<div class='butdiv'><button class='navbutton'></button></div><div id='quest'></div>"	
   jobj.subjects.forEach(function(item, index)
   {
    let quest = document.getElementById('quest')
    index++
    quest.innerHTML += "<div id ='quest"+ index + "'><div class='title'>" + index  +"." + item.title + "</div><div class='question'>" + item.statement + "</div></div>"
    let questIndex = document.getElementById('')
console.log(item)
   })
 })
}
window.load = app()