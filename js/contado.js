document.addEventListener('DOMContentLoaded', function () {
  const countdownElement = document.getElementById('cuenta-atras');
  const controlButton = document.getElementById('btn-control');
  const minutesElement = document.getElementById('minutos');
  const cruzElement = document.querySelector('.cruz');

  let countdownValue;
  let countdownInterval;
  let animationInterval;
  let inhaloTextoElement; // Variable para almacenar la referencia al elemento de texto

  function updateCountdownFromThree() {
    if (countdownValue > 0) {
      countdownElement.textContent = countdownValue;
      countdownValue--;
    } else {
      clearInterval(countdownInterval);
      startAnimationsAndCountdown(); // Iniciar las animaciones y el contador de minutos al llegar a 1
    }
  }

  function startAnimationsAndCountdown() {
    inhaloTextoElement = createInhaloTextoElement(); // Crear el elemento de texto
    document.body.appendChild(inhaloTextoElement); // Agregar el elemento de texto al cuerpo del documento
    cruzElement.classList.add('iluminado-horizontal'); // Iniciar con iluminación horizontal
    animationInterval = setInterval(animateCross, 8000); // Alternar las animaciones cada 8 segundos

    let timeInSeconds = 5 * 60;

    countdownInterval = setInterval(function () {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;

      const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      minutesElement.textContent = formattedTime;

      timeInSeconds--;

      if (timeInSeconds < 0) {
        clearInterval(countdownInterval);
        clearInterval(animationInterval); // Detener el intervalo de animación al llegar a 0
        removeInhaloTextoElement(); // Eliminar el elemento de texto
        minutesElement.textContent = 'Tiempo terminado';
        controlButton.textContent = 'INICIAR';
        controlButton.removeEventListener('click', stopCountdown);
        controlButton.addEventListener('click', startCountdownFromThree);
        cruzElement.classList.remove('iluminado', 'iluminado-horizontal'); // Quitamos ambas clases al llegar a 0
      }
    }, 1000);
  }

  function animateCross() {
    cruzElement.classList.toggle('iluminado'); // Alternar la clase iluminado
    cruzElement.classList.toggle('iluminado-horizontal'); // Alternar la clase iluminado-horizontal
  }

  function startCountdownFromThree() {
    clearInterval(animationInterval); // Detener el intervalo de animación al reiniciar el contador
    removeInhaloTextoElement(); // Eliminar el elemento de texto al reiniciar el contador
    cruzElement.classList.remove('iluminado', 'iluminado-horizontal'); // Quitamos ambas clases al reiniciar el contador
    countdownValue = 3;
    countdownElement.textContent = countdownValue;

    controlButton.textContent = 'DETENER';
    controlButton.removeEventListener('click', startCountdownFromThree);
    controlButton.addEventListener('click', stopCountdown);
    countdownInterval = setInterval(updateCountdownFromThree, 1000);
  }

  function stopCountdown() {
    clearInterval(countdownInterval);
    clearInterval(animationInterval); // Detener el intervalo de animación al detener el contador
    removeInhaloTextoElement(); // Eliminar el elemento de texto al detener el contador
    countdownElement.textContent = '3';
    minutesElement.textContent = '5:00';
    cruzElement.classList.remove('iluminado', 'iluminado-horizontal'); // Quitamos ambas clases al detener el contador
    controlButton.textContent = 'INICIAR';
    controlButton.removeEventListener('click', stopCountdown);
    controlButton.addEventListener('click', startCountdownFromThree);
  }

  function createInhaloTextoElement() {
    const element = document.createElement('p');
    element.className = 'inhalo-texto';
    element.id = 'inhaloTexto';
    element.textContent = 'INHALAR';
    return element;
  }

  function removeInhaloTextoElement() {
    if (inhaloTextoElement && inhaloTextoElement.parentNode) {
      inhaloTextoElement.parentNode.removeChild(inhaloTextoElement);
    }
  }

  controlButton.addEventListener('click', startCountdownFromThree);
});





  
  