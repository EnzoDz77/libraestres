document.addEventListener('DOMContentLoaded', function () {
  const countdownElement = document.getElementById('cuenta-atras');
  const controlButton = document.getElementById('btn-control');
  const minutesElement = document.getElementById('minutos');
  const cruzElement = document.querySelector('.cruz');

  let countdownValue;
  let countdownInterval;
  let isAnimating = false;

  // Secuencia de instrucciones
  const instructions = ['INHALAR', 'MANTENLO', 'EXHALAR', 'MANTENLO'];
  let instructionIndex = 0;

  function updateCountdownFromThree() {
    if (countdownValue > 0) {
      countdownElement.textContent = countdownValue;
      countdownValue--;
    } else {
      clearInterval(countdownInterval);
      countdownElement.textContent = ''; // Dejar el espacio en blanco para las instrucciones
      startAnimationsAndCountdown(); // Iniciar las animaciones y el contador de minutos al llegar a 1
    }
  }

  function startAnimationsAndCountdown() {
    isAnimating = true;
    animateCross(); // Iniciar la animación de la cruz

    let timeInSeconds = 5 * 60;

    countdownInterval = setInterval(function () {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;

      const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      minutesElement.textContent = formattedTime;

      timeInSeconds--;

      if (timeInSeconds < 0) {
        clearInterval(countdownInterval);
        minutesElement.textContent = 'Tiempo terminado';
        controlButton.textContent = 'INICIAR';
        controlButton.removeEventListener('click', stopCountdown);
        controlButton.addEventListener('click', startCountdownFromThree);
        cruzElement.classList.remove('iluminado', 'iluminado-horizontal', 'iluminado-vertical'); // Quitamos todas las clases al llegar a 0
        countdownElement.textContent = '3'; // Restablecer el contenido del contador
        isAnimating = false;
      }
    }, 1000);
  }

  function animateCross() {
    if (!isAnimating) {
      return;
    }

    // Obtener la siguiente instrucción
    const currentInstruction = instructions[instructionIndex];

    // Mostrar la instrucción actual en el contador
    countdownElement.textContent = currentInstruction;

    // Verificar la instrucción actual y aplicar las clases correspondientes
    if (currentInstruction === 'INHALAR') {
      cruzElement.classList.add('iluminado-horizontal');
      cruzElement.classList.remove('iluminado-vertical');
    } else if (currentInstruction === 'MANTENLO') {
      cruzElement.classList.remove('iluminado-horizontal');
      cruzElement.classList.add('iluminado-vertical');
    } else if (currentInstruction === 'EXHALAR') {
      cruzElement.classList.add('iluminado-horizontal');
      cruzElement.classList.remove('iluminado-vertical');
    }

    // Incrementar el índice solo cuando la cruz está en posición horizontal
    if (cruzElement.classList.contains('iluminado-horizontal')) {
      instructionIndex = (instructionIndex + 1) % instructions.length;
    }

    // Establecer un intervalo para la siguiente animación
    setTimeout(() => {
      animateCross();
    }, 4000); // Cambiar cada 4 segundos
  }

  function startCountdownFromThree() {
    cruzElement.classList.remove('iluminado', 'iluminado-horizontal', 'iluminado-vertical'); // Quitamos todas las clases al reiniciar el contador
    countdownValue = 3;
    countdownElement.textContent = countdownValue;
    instructionIndex = 0; // Reiniciar el índice de instrucciones

    controlButton.textContent = 'DETENER';
    controlButton.removeEventListener('click', startCountdownFromThree);
    controlButton.addEventListener('click', stopCountdown);
    countdownInterval = setInterval(updateCountdownFromThree, 1000);
  }

  function stopCountdown() {
    clearInterval(countdownInterval);
    isAnimating = false; // Establecer la variable de animación a false
    instructionIndex = 0; // Reiniciar el índice de instrucciones

    // Restablecer el contador y eliminar el texto de instrucciones
    countdownElement.textContent = '3';

    minutesElement.textContent = '5:00';
    controlButton.textContent = 'INICIAR';
    controlButton.removeEventListener('click', stopCountdown);
    controlButton.addEventListener('click', startCountdownFromThree);
    cruzElement.classList.remove('iluminado', 'iluminado-horizontal', 'iluminado-vertical'); // Quitamos todas las clases al detener el contador
  }

  controlButton.addEventListener('click', startCountdownFromThree);
});






























  
  