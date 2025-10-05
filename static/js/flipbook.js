function startFlipbook(pages, audioPath, imagePath, voiceGender) {
  let currentPage = 0;

  function showPage(index) {
    if (index < 0 || index >= pages.length) return;
    currentPage = index;

    const content = document.getElementById('page-content');
    content.innerHTML = `<h2>${pages[index].title}</h2><p>${pages[index].text}</p>`;
    
    if (pages[index].onShow) pages[index].onShow();
    narrate(pages[index].text);
  }

  function narrate(text) {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.9;
    utter.pitch = 1.2;
    utter.voice = synth.getVoices().find(v => v.name.includes("Female") || v.name.includes("Jenny"));
    synth.cancel();
    synth.speak(utter);
  }

  document.getElementById('next').onclick = () => showPage(currentPage + 1);
  document.getElementById('prev').onclick = () => showPage(currentPage - 1);

  window.logout = () => {
    fetch('/logout', { method: 'POST' }).then(() => (window.location.href = '/login'));
  };

  showPage(0);
}
