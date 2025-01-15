window.onload = function(){
  const voiceOptionList = synth.getVoices();
  const optionHtml = voiceOptionList.reduce((html, item) => {
    html += `<option value="${item.lang}">${item.name}</option>`;
    return html;
  }, '');

  document.querySelector('#voice').innerHTML = optionHtml;
}

const synth = window.speechSynthesis;
const voiceOptionList = synth.getVoices();
let speechSynthesisUtterance = new SpeechSynthesisUtterance();

document.querySelector('.footer button').addEventListener('click', function(){
  synth.cancel();
  let word = document.querySelector('.box textarea').value;
  speechSynthesisUtterance.text = word;
  synth.speak(speechSynthesisUtterance);
});

document.querySelector('#voice').addEventListener('input', function(e){
  let voiceOptionList = synth.getVoices();
  let voice = voiceOptionList.find(item => item.lang === e.target.value);
  speechSynthesisUtterance.voice = voice;
});

document.querySelector('#rate').addEventListener('input', function(e){
  speechSynthesisUtterance.rate = e.target.value;
  e.target.nextElementSibling.innerText = e.target.value;
});

document.querySelector('#pitch').addEventListener('input', function(e){
  speechSynthesisUtterance.pitch = e.target.value;
  e.target.nextElementSibling.innerText = e.target.value;
});

setTimeout(() => {
  let langSetting = 'zh-TW';
  let voiceSelected = synth.getVoices().find(item => item.lang === langSetting);
  speechSynthesisUtterance.voice = voiceSelected;
  document.querySelector('#voice').value = langSetting;
}, 500);