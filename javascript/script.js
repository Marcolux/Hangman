console.log(`it's working`)

const newList4=[]
const newList7=[]
const newList10=[]

const word=document.getElementById('word')
const lvl= document.getElementById('difficulty')
const hangName= document.getElementById('hangmanPlayer')
const playerName= document.getElementById('player')
const intro=document.getElementById('gameIntroToo')
const gameRules=document.getElementById('GameRules')
const bodyB=document.getElementById('bodyB')
const category=document.getElementById('category')

const startButton =document.getElementById('start')
const game = document.getElementById('game')
const hint= document.getElementById('hint')
const definitionText=document.getElementById("definitionText")
const win=[]
const message = document.getElementById('winOrLose')
let elemRl = document.getElementById("RightLegPic");
let elemLl = document.getElementById("leftLegPic");
let elemRa = document.getElementById("rightArmPic");
let elemBd = document.getElementById("bodyPic");
let elemLa = document.getElementById("leftArmPic");
let elemHp = document.getElementById("headPic");

startButton.addEventListener('click',initGame)

const chuckSays = document.getElementById('chuckSays')
const url2 ='https://api.chucknorris.io/jokes/random'

// Function that start the game

function initGame(){

   intro.style.display='none'
   hangName.innerText=playerName.value
   game.style.display= 'flex'
   
   bodyB.style.background ="rgba(81, 108, 54, 0.845)"
   
   gameRules.style.display='none'
   chuckSays.style.display='flex'
   fetchWord()
   chuck()
}


//Fetch the word from APi and assign it to the game. Word is picked by the length and category 


function fetchWord(){
   
   newList4.length=0
   newList7.length=0
   newList10.length=0
   
   
   let topic=document.getElementById('selSub').value
   let topic2=topic.split(',')
   let topic3 = topic2[0]

   const url= 'https://api.datamuse.com//words?topics='+topic

   console.log(topic3)
   let categ = document.createElement('h4')
   categ.innerText = topic3
   category.append(categ)
   //console.log(url)
   
   fetch (url)
   .then( (response) => { return response.json();})
   
   .then((jsonData) => {
      jsonData.forEach(data => {
         // console.log(data.word)
         
         if(data.word.length<=4){
            newList4.push(data.word) 
         } else if (data.word.length>4 && data.word.length<=7 ){
            newList7.push(data.word)
         }else if( data.word.length>7 && data.word.length<=10 ) {
            newList10.push(data.word)
         }
         
      });
      
      let oneWord4= newList4[Math.floor(Math.random() * newList4.length)];
      let oneWord7= newList7[Math.floor(Math.random() * newList7.length)];
      let oneWord10= newList10[Math.floor(Math.random() * newList10.length)];
      
      // console.log(oneWord4,oneWord10,oneWord7)
      let oneWord4U=oneWord4.toUpperCase()
      let oneWord7U=oneWord7.toUpperCase()
      let oneWord10U=oneWord10.toUpperCase()
      //console.log(oneWord4U)
      //console.log(oneWord7U)
      //console.log(oneWord10U)
      
      if(difficulty.value === "four"){ word.value=oneWord4U}
      else if(difficulty.value==="seven"){ word.value=oneWord7U}
      else if(difficulty.value==="ten"){ word.value=oneWord10U}
      
     
      
      
      let word2 = document.createElement('h1')
      word2.innerText = word.value
      word.append(word2)
      word2.id = 'word2'

      console.log(word.value)
      word2.style.display='none'

      breakLetter ()
      matchAlphabet()
      

   });  
   
} 




//brake the word in letters and hide them

function breakLetter (){
   let word2 = document.getElementById('word2')
   // console.log(word2.innerText)
   let brWord= word2.innerText
   
   let hiddenLetters = brWord.split('')
   console.log(hiddenLetters)
   for (i=0;i<hiddenLetters.length;i++){
      
      
      let background = document.createElement('div') 
      let letter = document.createElement('h2')
      
      letter.innerText= hiddenLetters[i]

      if (letter.innerText===' '||letter.innerText==='-'){
         letter.style.display='flex'
         letter.innerText='-'
         win.push(letter)
         
      }
      
      word.append(background)
      background.append(letter)
      
      letter.className="letter"
      background.className = 'backGr'
   }
   
   // console.log(word2)
   
}



//Match the buttons to the letters of the hidden word

function matchAlphabet(){

   //first we select the letter of the hidden word and we store them in an array 
   let letters =document.querySelectorAll("h2")
   const arr = Array.prototype.slice.call(letters)

   const alphabets=document.getElementsByClassName('buttons')
   let word3 = document.getElementById('word2')
   let brWord2= word3.innerText
   let hiddenLettersS = brWord2.split('')

   for (let alphabet of alphabets) {

         alphabet.addEventListener("click", (e)=>{

         chuck()

         let et = e.target.innerText

         if (hiddenLettersS.includes(et)){ arr.forEach(ar =>{
            
            if (et===ar.innerText ){
               win.push(ar)
               console.log(win)
               ar.style.display="flex";

               alphabet.innerText='√'
               alphabet.disabled = true 
          
               if (win.length===arr.length){ message.innerText='Chuck let you win!' 
               for (let alphabet of alphabets){
                  alphabet.disabled = true 
                  arr.forEach(ar =>{ar.style.display="flex";}) }}
            }})  }
          
            else{
               if (elemHp.style.left===""){ 
                  headMove() 
                  elemHp.style.display = "flex"   }
               else if (elemHp.style.left==="50vw"&& elemBd.style.left !== '49vw'){
                  bodyMove()
                  elemBd.style.display = 'flex'
               }else if (elemHp.style.left==="50vw" && elemBd.style.left === '49vw' && elemRa.style.left!=='42vw'){
                  rightArmMove()
                  elemRa.style.display = 'flex'
               } else if (elemHp.style.left==="50vw" && elemBd.style.left === '49vw' && elemRa.style.left==='42vw' && elemLa.style.left!== '57vw'){
                  leftArmMove() 
                  elemLa.style.display = 'flex'
               } else if (elemHp.style.left==="50vw" && elemBd.style.left === '49vw' && elemRa.style.left==='42vw' && elemLa.style.left === '57vw' && elemRl.style.left !== '52vw'){
                  rightLegMove() 
                  elemRl.style.display = 'flex'
               
               } else if (elemHp.style.left==="50vw" && elemBd.style.left === '49vw' && elemRa.style.left==='42vw' && elemLa.style.left === '57vw'  && elemRl.style.left === '52vw' && elemLl.style.left !== '48vw'){
                  leftLegMove()
                  elemLl.style.display = 'flex'
               } 

            e.target.innerText='X'
            alphabet.disabled = true 
         }
            
         })}

}
         
         
let clickCount=0

//button hint function

hint.addEventListener('click',function randPick(){
   console.log(win)
   //clicking hint we call Chuck Norris api
   chuck()
   //then we go throu the alphabet buttons and we store them in an array
   let letters =document.getElementsByClassName("letter")
   let arr = Array.prototype.slice.call(letters)
  //then we filter the letters already shown that are stored in win array
   const newArr=(arr,win)=>{
      const filtered = arr.filter(el=>{
         return win.indexOf(el) === -1
      })
      return filtered
   }

   let filteredArray = newArr(arr,win)
   
   //next we pick a random letter from the filtered array

   let randLett= filteredArray[Math.floor(Math.random() * filteredArray.length)]
  

   //then we disable the alphabet button with the random letter value once the letter is shown

   const alphabets=document.getElementsByClassName('buttons')
   for (let alphabet of alphabets){
      if (randLett.innerText === alphabet.innerText){
         alphabet.disabled = true 
         alphabet.innerText='√'
      }
   }

   //reveal the random letter picked from the filtered array

   arr.forEach( lett => {
      
      if (lett.innerText===randLett.innerText){
         lett.style.display='flex'
      
         win.push(randLett.innerText)
         
      }
   })
   
   count()
})

// Api call to find a definition of the word
const fetchDefiniftion = ()=>{
   
   // getting the hidden word
   let word4=word2.innerText.toLowerCase()

   fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word4}`)
   .then( (response)=>{
      return response.json()
})
   .then((jsonData) => {

   let response = jsonData[0]
   let responseManings=response.meanings[0]

   definitionText.innerText=responseManings.definitions[0].definition
   if(response.meanings[0]===null){
      definitionText.innerText="Sorry Pal, there's no definitions for this word"
   }
   })
}

//function to limit the hints to 2, counts how many time gets clicked
function count(){
   clickCount++   
   // console.log(clickCount)
   let letters =document.getElementsByClassName("letter")

   if(clickCount===4 ){ hint.disabled=true }
  
}


function increment(value, step){ return value+=step}
function renderNum(num){console.log('hi')}

// move the body parts
function headMove() {
   
   let pos = 2;
   //clearInterval(moving);
 
   movingHd = setInterval(()=>{
     renderNum(pos)  
     pos = increment(pos, 1)
     
     elemHp.style.left = pos + 'vw'; 
     
      if (pos === 50){clearInterval(movingHd)}
      
   }, 10);
   //console.log(pos)
}


function bodyMove() {
   
      let pos = 2;
      //clearInterval(moving);
    
      movingBd = setInterval(()=>{
        renderNum(pos)  
        pos = increment(pos, 1)
        
        elemBd.style.left = pos + 'vw'; 
        
         if (pos === 49){clearInterval(movingBd)}
      
      }, 10);
     // console.log(pos)
      }

function rightArmMove() {
   
         let pos = 2;
         //clearInterval(moving);
       
         movingRa = setInterval(()=>{
           renderNum(pos)  
           pos = increment(pos, 1)
           
           elemRa.style.left = pos + 'vw'; 
           
            if (pos === 42){clearInterval(movingRa)}
         
         }, 10);
       //  console.log(pos)
         }

 function leftArmMove() {
   
            let pos = 2;
            //clearInterval(moving);
          
            movingLa = setInterval(()=>{
              renderNum(pos)  
              pos = increment(pos, 1)
              
              elemLa.style.left = pos + 'vw'; 
              
               if (pos === 57){clearInterval(movingLa)}
            
            }, 10);
          //  console.log(pos)
}


function leftLegMove() {
   const alphabets=document.getElementsByClassName('buttons')
   let letters =document.querySelectorAll("h2")
   const arr = Array.prototype.slice.call(letters)
   for (let alphabet of alphabets){
      alphabet.disabled = true 
      arr.forEach(ar =>{ar.style.display="flex";})}
   
      
   message.innerText='You should know by now...Nobody can beat Chuck Norris!!'
               let pos = 2;
               //clearInterval(moving);
             
               movingLl = setInterval(()=>{
                 renderNum(pos)  
                 pos = increment(pos, 1)
                 
                 elemLl.style.left = pos + 'vw'; 
                 
                  if (pos === 48){clearInterval(movingLl)}
               
               }, 10);
             //  console.log(pos)
}

function rightLegMove() {
   
   let pos = 25;
   //clearInterval(moving);
 
   movingRl = setInterval(()=>{
     renderNum(pos)  
     pos = increment(pos, 1)
     
     elemRl.style.left = pos + 'vw'; 
     
      if (pos === 52){clearInterval(movingRl)}
   
   }, 10);
  // console.log(pos)
}


// Api call to Chuck Norris jokes
function chuck(){
fetch (url2)
   .then( (response) => { return response.json();})
   
   .then((jsonData) => {
      
         chuckSays.innerText=jsonData.value
      })}


