window.onload = function(){
  new Promise((resolve) => {
    let voiceOptionList = window.speechSynthesis.getVoices();
    if(voiceOptionList.length){
      voiceOptionList = window.speechSynthesis.getVoices();
    }
    resolve(voiceOptionList)
  })
  .then(voiceOptionList => {
    const optionHtml = voiceOptionList.reduce((html, item) => {
      html += `
      <option value="${item.name}">
        ${item.name}
      </option>
      `;
      return html;
    }, '');
    document.querySelector('#voice').innerHTML = optionHtml;

    let testingHtml = `
    <table>
      <tr>
        <td>default</td>
        <td>lang</td>
        <td>localService</td>
        <td>name</td>
        <td>voiceURI</td>
      </tr>
    `;
    testingHtml += voiceOptionList.reduce((html, item)=>{
      html += `
      <tr>
        <td>${item.default}</td>
        <td>${item.lang}</td>
        <td>${item.localService}</td>
        <td>${item.name}</td>
        <td>${item.voiceURI}</td>
      </tr>
      `;
      return html;
    }, '');
    testingHtml += `</table>`;

    document.querySelector('.testing').innerHTML = testingHtml;
  });
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