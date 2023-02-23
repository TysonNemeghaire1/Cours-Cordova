import './scss/index.scss';

document.body.addEventListener('click', (e) => {
    const color = Math.floor(Math.random() * 3);
    const square = document.createElement('div');
    if (color === 0) square.classList.add('red');
    if (color === 1) square.classList.add('blue');
    if (color === 2) square.classList.add('green');
    document.body.appendChild(square);
})