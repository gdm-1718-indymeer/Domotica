var firebaseConfig = {
    apiKey: "AIzaSyA5eZg8DqgXx8bN4CuxUh7S02QR2Eg9seI",
    authDomain: "demotica-1b701.firebaseapp.com",
    databaseURL: "https://demotica-1b701.firebaseio.com",
    projectId: "demotica-1b701",
    storageBucket: "demotica-1b701.appspot.com",
    messagingSenderId: "1040562848744",
    appId: "1:1040562848744:web:d59f7b4eaa42c42bcb1a5d",
    measurementId: "G-6V0HG3HHGY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

let grid = document.getElementById('grid');
let container = document.getElementById('grid');
let login = localStorage.getItem('loggedIn');

let bit = [];

if(login == null){
    window.location.replace('register.html')
}
function createGrid(){
    if(container !== null){
    container.innerHTML = ""; 
    let leadsRef = firebase.database().ref('grid');
    leadsRef.on('value', function(snapshot) {
            let val = snapshot.val()
            if(val !== null){
                bit = []
                bit.push(val)
                generateCharacter()

            }    
    }); 
} 
}createGrid();

function pushFirebase(){
    console.log(bit)
    firebase.database().ref("grid").set(bit)

}

let measureRef = firebase.database().ref('temp');
 measureRef.child("temperature").on('value', function(snapshot) {
        document.getElementById("temp").innerHTML = snapshot.val()
})
measureRef.child("humidity").on('value', function(snapshot) {
        document.getElementById("hum").innerHTML = snapshot.val()
})

function generateCharacter() {
    let i = 0;
    bit.forEach((element, index) => {
            container.innerHTML = ""; 

        for( let key in element){
                i++
                let div = document.createElement('div');
                div.className = "p" + element[key];
                div.id = i;
                container.append(div)
        };     
    })
}


function VoordeurSelect(){
    if (this.classList.contains("active")) {
        let squares=document.querySelectorAll(".p2")

        for (i=0; i<squares.length; i++){
        squares[i].style.background="green";
        }
        firebase.database().ref("Booleans/voordeur").set({
            voordeur: false
        }) 
        this.classList.remove("active");
      } else  {
        this.classList.add("active")
        let squares=document.querySelectorAll(".p2")

        for (i=0; i<squares.length; i++){
        squares[i].style.background="red";
        }
        firebase.database().ref("Booleans/voordeur").set({
            voordeur: true
        }) 

      }
   
}
function AchterdeurSelect(){
    if (this.classList.contains("active")) {
        let squares2=document.querySelectorAll(".p3")

        for (i=0; i<squares2.length; i++){
        squares2[i].style.background="green";
        }
        firebase.database().ref("Booleans/achterdeur").set({
            achterdeur: false
        }) 
        this.classList.remove("active");
      } else {
        this.classList.add("active")
        let squares2=document.querySelectorAll(".p3")

        for (i=0; i<squares2.length; i++){
        squares2[i].style.background="red";
        }
        firebase.database().ref("Booleans/achterdeur").set({
            achterdeur: true
        }) 
      }
    
}
function ContactSelect(){
    if (this.classList.contains("active")) {
        let squares=document.querySelectorAll(".p4")

        for (i=0; i<squares.length; i++){
        squares[i].style.background="lightblue";
        }

        firebase.database().ref("Booleans/stopcontacten").set({
            stopcontacten: false
        }) 
        this.classList.remove("active");
      } else {
        this.classList.add("active")
        let squares=document.querySelectorAll(".p4")

        for (i=0; i<squares.length; i++){
        squares[i].style.background="darkblue";
        }
        firebase.database().ref("Booleans/stopcontacten").set({
            stopcontacten: true
        }) 
      } 
}

function LichtSelect(){
    if (this.classList.contains("active")) {
       
        let squares=document.querySelectorAll(".p5")

        for (i=0; i<squares.length; i++){
        squares[i].style.background="yellow";
        }
        firebase.database().ref("Booleans/lichtpunten").set({
            lichtpunten: false
        })   
        this.classList.remove("active");
      } else{
        this.classList.add("active")
        let squares=document.querySelectorAll(".p5")

        for (i=0; i<squares.length; i++){
        squares[i].style.background="rgb(143, 143, 19)";
        }
        firebase.database().ref("Booleans/lichtpunten").set({
            lichtpunten: true
        })   
      }
    
}
function Alarm(){
    var x = document.getElementById("myAudio"); 

    if (this.classList.contains("active")) {
        this.classList.remove("active")

        firebase.database().ref("Booleans/Alarm").set({
            Alarm: false
        }) 
        x.pause();
        x.currentTime = 0;
        let squares=document.querySelectorAll(".p5, .p4");
        for (i=0; i<squares.length; i++){
        squares[i].classList.remove("demo")
        }
        document.querySelector('#Alarm').innerHTML = "OFF";
        
      } else{
        this.classList.add("active")
        document.querySelector('#Alarm').innerHTML = "ON";
        x.play();
        x.currentTime = 10;

        firebase.database().ref("Booleans/voordeur").set({
            voordeur: false
        }) 
        firebase.database().ref("Booleans/achterdeur").set({
            achterdeur: false
        }) 
        firebase.database().ref("Booleans/Alarm").set({
            Alarm: true
        }) 
        let squares=document.querySelectorAll(".p5, .p4");

        for (i=0; i<squares.length; i++){
        squares[i].classList.add("demo")
        }
        let btn = document.querySelectorAll('.fancy-button');
        for (i=0; i<btn.length; i++){
            btn[i].classList.remove("active")
            }

        let squares2=document.querySelectorAll(".p3, .p2")

        for (i=0; i<squares2.length; i++){
        squares2[i].style.background="green";
        }
        /*firebase.database().ref("Booleans/lichtpunten").set({
            lichtpunten: true
        })  */ 
      }
}
function edit(){
    grid.addEventListener('click', function(evt) {
        let target = evt.target;
        bit[target.className] = 0;
        target.style.backgroundColor = '';
        //pushFirebase()  
     
     }, false);
}
document.getElementById("voordeur").addEventListener("click", VoordeurSelect);
document.getElementById("stopcontact").addEventListener("click", ContactSelect);
document.getElementById("achterdeur").addEventListener("click", AchterdeurSelect);
document.getElementById("lichtpunten").addEventListener("click", LichtSelect);
document.getElementById("AlarmBtn").addEventListener("click", Alarm);





