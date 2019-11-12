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
let bit = [];

function createGrid(){
    container.innerHTML = ""; 
    let leadsRef = firebase.database().ref('grid');
    leadsRef.on('value', function(snapshot) {
            let val = snapshot.val()
            if(val !== null){
                bit = []
                bit.push(val)
                generateCharacter()

            }else{
                bit = []
                for (let x = 0; x < 64; x++) {
                    let div = document.createElement('div');
                    div.className = x;
                    bit.push(0);
                    container.append(div)
                } 

            }
            
    }); 
    
    
}createGrid();



function pushFirebase(){
    console.log(bit)
    firebase.database().ref("/grid").set(bit)

}

function loopFirebase(){
    let leadsRef = firebase.database().ref('character');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            bit = []
            let char = childSnapshot.val();
            bit.push(char);
            console.log(bit)
        });
    }); 
    generateCharacter()
}

function generateCharacter() {
    let i = 0;
    bit.forEach((element, index) => {
            container.innerHTML = ""; 

        for( let key in element){
                i++
                let div = document.createElement('div');
                div.id = element[key];
                div.className = i;
                container.append(div)
        };     
    })
}

function LoopRaspberry(){
    firebase.database().ref("/pi").set({
        loop: true
    })

}
function VoordeurSelect(){
    grid.addEventListener('click', function(evt) {
        //let target = evt.target;
        bit[evt.target.className] = 2;
        evt.target.style.backgroundColor = 'green'; 
        console.log(bit)
        pushFirebase()   
     }, false);    
}
function AchterdeurSelect(){
    grid.addEventListener('click', function(evt) {
        let target = evt.target;
        bit[target.className] = 3;
        target.style.backgroundColor = 'green'; 
        pushFirebase()   
     }, false);    
}
function ContactSelect(){
    grid.addEventListener('click', function(evt) {
        let target = evt.target;
        bit[target.className] = 4;
        target.style.backgroundColor = 'blue'; 
        pushFirebase()  
     }, false);  
}

function LichtSelect(){
    grid.addEventListener('click', function(evt) {
        let target = evt.target;
        bit[target.className] = 5;
        target.style.backgroundColor = 'Yellow';   
        pushFirebase()   
     }, false);    
}
function edit(){
    grid.addEventListener('click', function(evt) {
        let target = evt.target;
        bit[target.className] = 0;
        target.style.backgroundColor = '';
        pushFirebase()  
     
     }, false);
}
document.getElementById("voordeur").addEventListener("click", VoordeurSelect);
document.getElementById("stopcontact").addEventListener("click", ContactSelect);
document.getElementById("achterdeur").addEventListener("click", AchterdeurSelect);
document.getElementById("lichtpunten").addEventListener("click", LichtSelect);
document.getElementById("edit").addEventListener("click", edit);




