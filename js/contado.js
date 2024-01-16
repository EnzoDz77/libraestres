document.addEventListener('DOMContentLoaded', function () {
    const countdownElement = document.getElementById('cuenta-atras');
    const controlButton = document.getElementById('btn-control');
    const minutesElement = document.getElementById('minutos');
  
    let countdownValue;
    let countdownInterval;
  
    function updateCountdownFromThree() {
      if (countdownValue > 0) {
        countdownElement.textContent = countdownValue;
        countdownValue--;
      } else {
        clearInterval(countdownInterval);
        startFiveMinuteCountdown();
      }
    }
  
    function startCountdownFromThree() {
      countdownValue = 3;
      countdownElement.textContent = countdownValue;
  
      controlButton.textContent = 'DETENER'; // Cambiar texto del botón
      controlButton.removeEventListener('click', startCountdownFromThree);
      controlButton.addEventListener('click', stopCountdown); // Agregar event listener para detener
      countdownInterval = setInterval(updateCountdownFromThree, 1000);
    }
  
    function startFiveMinuteCountdown() {
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
          controlButton.textContent = 'INICIAR'; // Restaurar texto del botón
          controlButton.removeEventListener('click', stopCountdown);
          controlButton.addEventListener('click', startCountdownFromThree); // Agregar event listener para iniciar
        }
      }, 1000);
    }
  
    function stopCountdown() {
      clearInterval(countdownInterval);
      countdownElement.textContent = '3'; // Restablecer el contador a 3
      minutesElement.textContent = '5:00'; // Restablecer los minutos
      controlButton.textContent = 'INICIAR'; // Restaurar texto del botón
      controlButton.removeEventListener('click', stopCountdown);
      controlButton.addEventListener('click', startCountdownFromThree); // Agregar event listener para iniciar
    }
  
    controlButton.addEventListener('click', startCountdownFromThree);
  });
  
  