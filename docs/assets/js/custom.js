document$.subscribe(function() {
  const secretWord = "open";
  const body = document.body;

  // Function to open the password prompt
  function promptForPassword() {
    Swal.fire({
      title: 'Enter Password',
      input: 'password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Unlock',
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        if (password === secretWord) {
          return true;
        }
        else {
          Swal.showValidationMessage('Incorrect password!');
          return false;
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("authenticated", "true");
        document.body.setAttribute("data-auth", "true");
        Swal.fire({
          title: 'Success!',
          text: 'Hidden content unlocked.',
          icon: 'success',
          timer: 1500
        });
      }
    });
  }

  // Check if authenticated from previous session
  if (localStorage.getItem("authenticated") === "true") {
    body.setAttribute("data-auth", "true");
  }

  // MutationObserver to add class to "Develop" folder
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === "childList" || mutation.type === "subtree") {
        const developLink = document.querySelector('label[for="__nav_2"] .md-ellipsis'); // Assuming __nav_2 is for Develop
        if (developLink && developLink.textContent.trim() === 'Develop') {
          const parentLi = developLink.closest('.md-nav__item--nested');
          if (parentLi && !parentLi.classList.contains('secret-item')) {
            parentLi.classList.add('secret-item');
            // console.log('Added secret-item class to Develop folder.'); // Removed log
          }
        }
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Глобальные переменные для отслеживания состояния модификаторов
  let isCtrlPressed = false;
  let isAltPressed = false;

  document.addEventListener("keydown", function(event) {
      // console.log("ALL KEY PRESS:", "Key:", event.key, "Code:", event.code, "Ctrl:", event.ctrlKey, "Alt:", event.altKey, "Shift:", event.shiftKey); // Removed log

      // Обновляем состояние модификаторов
      if (event.key === "Control") isCtrlPressed = true;
      if (event.key === "Alt") isAltPressed = true;

      // Проверяем комбинацию (Ctrl + Alt + P)
      if (isCtrlPressed && isAltPressed && event.code === "KeyP") { // Используем event.code для клавиши 'P'
          // console.log("Ctrl+Alt+P hotkey pressed!"); // Removed log
          event.preventDefault(); // Prevent default browser behavior
          promptForPassword();
      }
  });

  document.addEventListener("keyup", function(event) {
      // Обновляем состояние модификаторов при отпускании
      if (event.key === "Control") isCtrlPressed = false;
      if (event.key === "Alt") isAltPressed = false;
  });
});
