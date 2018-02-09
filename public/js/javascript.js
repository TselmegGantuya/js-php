var currentq
var answers=[]
var jobj
var partijennumb=[]
var result=[]
//Loading JSON
function loadJSON(callback)
{
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

//Buttons
//Start
let start= document.getElementById('start')
if(start){
  start.addEventListener('click', function(){
    document.getElementById('stemmen').style.display = 'flex'
    document.getElementById('begin').style.display = 'none'
    document.getElementById('quest1').style.display = 'flex'
    currentq = 1
    console.log(jobj)
  })
}
//Back
let back= document.getElementById('back')
if(back){
  back.addEventListener('click', function(){
    nav()
  })
}
function nav()
{
  if(currentq == 1)
  {
    document.getElementById('stemmen').style.display = 'none'
    document.getElementById('begin').style.display = 'flex'
  }
  else
  {
    document.getElementById('quest'+currentq).style.display = 'none'
    currentq--
    answers.splice(-1,1)
    document.getElementById('quest'+currentq).style.display = 'flex'
  }
}
//Showexp
function showexp(self)
{
  if(self.nextSibling.style.display == 'flex'){
    self.nextSibling.style.display = 'none'
  }else
  {
    self.nextSibling.style.display = 'flex'
  }
}
//Answers
function answer(answer)
{
  if(currentq == 3)
  {
    answers.push(answer)
    document.getElementById('stemmen').style.display = 'none'
    document.getElementById('quest'+currentq).style.display = 'none'
    document.getElementById('party').style.display = 'flex'
  }else{
    answers.push(answer)
    document.getElementById('quest'+currentq).style.display = 'none'
    currentq++
    document.getElementById('quest'+currentq).style.display = 'flex'
  }
}
//Last
let results= document.getElementById('results')
if(results){
  results.addEventListener('click', function(){

    partijennumb.forEach(function(item,index)
    {
      var partij = jobj.parties[item]
      console.log(partij)
      jobj.subjects.forEach(function(item,index)
      {
          item.parties.forEach(function(item,index)
          {
            if(item.name == partij.name)
            {
              partij = item
            }
          })
        console.log(answers)
        console.log(partij)
        if(answers[index] == partij.position)
        {
          result.push(partij.name)
        }
      })
      
    })
    console.log(result)
    if(result == null)
    {
      document.getElementById('party').style.display = 'none'
      document.getElementById('stemmen').style.display = 'flex'
      document.getElementById('quest1').style.display = 'flex'
      currentq = 1
      alert("Er was geen beschikbaar partij voor u. Probeer nog een keer.")
    }else{
    document.getElementById('result').style.display = 'flex'
    document.getElementById('party').style.display = 'none'
}
count_thing(result)
  })
}
//Result
//Party choose
function mark(val, hi)
{
  console.log(val)
  if(partijennumb.includes(val))
  {
    let numb = partijennumb.indexOf(val)
    partijennumb.splice(numb,1)
    hi.style.color = "black"
  }else{
    partijennumb.push(val)

    hi.style.color = 'blue'
  }
  console.log(partijennumb)
}
function count_thing(array_elements) {

    array_elements.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 0) {
                document.getElementById('resultaat').innerHTML += "<div class='show'><h5>" + current + "</h5><p>" + cnt + "</p>"
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        document.getElementById('resultaat').innerHTML += "<div class='show'><h5>" + current + "</h5><p>" + cnt + "</p>"
    }

}

//Building
function app()
{
  loadJSON(function(response) 
  {
    jobj = JSON.parse(response)	
    jobj.subjects.forEach(function(item, index)
    {
      let quest = document.getElementById('quest')
      index++
      quest.innerHTML += "<div class='questsection' id ='quest"+ index + "'><div class='title'>" + index  +"." + item.title + "</div><div class='question'>" + item.statement + "</div><div class = 'quest-buttons'><button onclick=answer('pro') class = 'eens'>Eens</button><button onclick=answer('ambivalent') class = 'geen'>Geen van beide</button><button onclick=answer('contra') class='oneens'>Oneens</button><button onclick='answer(4)' class='skip'>Sla deze vraag over</button></div><div id='party" + index + "'></div></div>"
      let partyIndex = document.getElementById('party' + index)
      partyIndex.innerHTML += "<statement id='wat' onclick='showexp(this)'>Wat vinden de partijen</statement><div class ='whatsparty' id='whatsparty" + index + "'><div id ='eensparty" + index + "'><h3>Eens</h3></div><div id ='geenparty" + index + "'><h3>Geen van beide</h3></div><div id ='oneensparty" + index + "'><h3>Oneens</h3></div></div>"
      var question = index
      item.parties.forEach(function(item, index)
      {
        if(item.position == 'pro')
        {
            let eens = document.getElementById("eensparty" + question)
          eens.innerHTML += "<h4>" + item.name + "</h4><p>" + item.explanation + "</p>"
        }else if(item.position == 'contra')
        {
          let oneens = document.getElementById("oneensparty" + question)
          oneens.innerHTML += "<h4>" + item.name + "</h4><p>" + item.explanation + "</p>"
        }else
        {
          let geen = document.getElementById("geenparty" + question)
          geen.innerHTML += "<h4>" + item.name + "</h4><p>" + item.explanation + "</p>"
        }

      })

  })
  jobj.parties.forEach(function(item,index){
    document.getElementById('choose').innerHTML += "<li><p onclick='mark(" + index + ", this)'>" + item.name + "</p></li>"
  })

 })
}
window.load = app()