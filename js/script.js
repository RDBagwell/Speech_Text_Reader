const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const read = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const textBoxEl = document.getElementById('text-box');
const synth = window.speechSynthesis;

const message = new SpeechSynthesisUtterance();
const data = [
    {
      image: '../img/drink.jpg',
      text: "I'm Thirsty"
    },
    {
      image: '../img/food.jpg',
      text: "I'm Hungry"
    },
    {
      image: '../img/tired.jpg',
      text: "I'm Tired"
    },
    {
      image: './img/hurt.jpg',
      text: "I'm Hurt"
    },
    {
      image: '../img/happy.jpg',
      text: "I'm Happy"
    },
    {
      image: '../img/angry.jpg',
      text: "I'm Angry"
    },
    {
      image: '../img/sad.jpg',
      text: "I'm Sad"
    },
    {
      image: '../img/scared.jpg',
      text: "I'm Scared"
    },
    {
      image: '../img/outside.jpg',
      text: 'I Want To Go Outside'
    },
    {
      image: '../img/home.jpg',
      text: 'I Want To Go Home'
    },
    {
      image: '../img/school.jpg',
      text: 'I Want To Go To School'
    },
    {
      image: '../img/grandma.jpg',
      text: 'I Want To Go To Grandmas'
    }
];

data.forEach(createBox);

// Store voices
let voices = [];

function createBox(item) {
    const box = document.createElement('div');
    const {image, text} = item;
    box.classList.add('box');
    box.innerHTML = `
      <img src="${image}" alt="${text}">
      <p class="info">${text}</p>
    `;

  box.addEventListener('click', ()=>{
    setTextMessage(text);
    speakText();

    box.classList.add('active');
    setTimeout(()=> box.classList.remove('active'), 800);
  });  
  main.appendChild(box);
}

function getVoices() {
  voices = synth.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    if(voice.name ==="Google US English"){
      option.selected = true;
    }
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

function setTextMessage(text){
  message.text = text;
}

function speakText(){
  synth.speak(message);
}

function setVoice(e){
   message.voice = voices.find(voice => voice.name === e.target.value);
}

toggleBtn.addEventListener('click', ()=> textBoxEl.classList.toggle('show'));
closeBtn.addEventListener('click', ()=> textBoxEl.classList.remove('show'));
synth.addEventListener('voiceschanged', getVoices);
voicesSelect.addEventListener('change', setVoice);

read.addEventListener('click', ()=>{
  if(textArea.value){
    setTextMessage(textArea.value);
    speakText();
  } else {
    alert('Must put text in box');
  }

});

getVoices()