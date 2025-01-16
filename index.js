window.onload = function(){
  new Promise((resolve) => {
    let voiceOptionList = window.speechSynthesis.getVoices();
    if(voiceOptionList.length === 0){
      voiceOptionList = window.speechSynthesis.getVoices();
    }
    resolve(voiceOptionList)
  })
  .then(voiceOptionList => {
    function voiceOptionListSet(){
      const optionHtml = voiceOptionList.reduce((html, item) => {
        html += `<option value="${item.name}">${item.name}</option>`;
        return html;
      }, '');
      document.querySelector('#voice').innerHTML = optionHtml;
    }

    let voiceOptionListGet = setInterval(()=>{
      voiceOptionList = window.speechSynthesis.getVoices();
      if(voiceOptionList.length > 0){
        voiceOptionListSet();
        clearInterval(voiceOptionListGet);
      }
    }, 1000);
  });
}

const synth = window.speechSynthesis;
const voiceOptionList = synth.getVoices();
let speechSynthesisUtterance = new SpeechSynthesisUtterance();

document.querySelector('.footer button').addEventListener('click', function(){
  synth.cancel();
  let word = document.querySelector('.main textarea').value;
  speechSynthesisUtterance.text = word;
  synth.speak(speechSynthesisUtterance);
});

document.querySelector('.btns button').addEventListener('click', function(){
  speechSynthesisUtterance.rate = 1;
  speechSynthesisUtterance.pitch = 1;
  document.querySelector('#rate').value = 1;
  document.querySelector('#pitch').value = 1;
  document.querySelector('#rate').nextElementSibling.innerText = 1;
  document.querySelector('#pitch').nextElementSibling.innerText = 1;
});

document.querySelector('#voice').addEventListener('input', function(e){
  let voiceOptionList = synth.getVoices();
  let voice = voiceOptionList.find(item => item.name === e.target.value);
  speechSynthesisUtterance.voice = voice;
  document.querySelector('#lang').innerText = voice.lang;
});

document.querySelector('#rate').addEventListener('input', function(e){
  speechSynthesisUtterance.rate = e.target.value;
  e.target.nextElementSibling.innerText = e.target.value;
});

document.querySelector('#pitch').addEventListener('input', function(e){
  speechSynthesisUtterance.pitch = e.target.value;
  e.target.nextElementSibling.innerText = e.target.value;
});