(function() {
  const track = document.getElementById('cardsTrack');
  const viewport = document.getElementById('cardsViewport');
  const prevBtn = document.getElementById('rail-prev');
  const nextBtn = document.getElementById('rail-next');
  const idxEl = document.getElementById('rail-index');
  const totalEl = document.getElementById('rail-total');

  let pageIndex = 0;
  let pagesTotal = 1;
  function pad2(n){ return String(n).padStart(2,'0'); }

  function computePages() {
    const cardEls = Array.from(track.children);
    if (cardEls.length === 0) { pagesTotal = 1; return; }
    const cardWidth = cardEls[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).getPropertyValue('--gap')) || 24;
    const viewportWidth = viewport.getBoundingClientRect().width;
    const perView = Math.max(1, Math.floor((viewportWidth + gap) / (cardWidth + gap)));
    pagesTotal = Math.max(1, Math.ceil(cardEls.length / perView));
    totalEl.textContent = pad2(pagesTotal);
    if (pageIndex > pagesTotal - 1) pageIndex = pagesTotal - 1;
    update();
  }
  function update() {
    const offset = pageIndex * viewport.getBoundingClientRect().width;
    track.style.transform = `translateX(${-offset}px)`;
    idxEl.textContent = pad2(pageIndex + 1);
    prevBtn.disabled = pageIndex === 0;
    nextBtn.disabled = pageIndex >= pagesTotal - 1;
  }
  prevBtn.addEventListener('click', () => { pageIndex = Math.max(0, pageIndex - 1); update(); });
  nextBtn.addEventListener('click', () => { pageIndex = Math.min(pagesTotal - 1, pageIndex + 1); update(); });
  window.addEventListener('resize', computePages);
  computePages();
})();