function randomBG() {
    //const image = new Image();
    const images = ['BG/001.jpg', 'BG/002.jpg'];
    const chosenImg = images[Math.floor(Math.random() * images.length)];
    const bgImg = document.createElement('img');
    bgImg.classList.add('backImg');
    bgImg.src = `img/${chosenImg}`;
  
    document.body.append(bgImg);
  }
  
  randomBG();  