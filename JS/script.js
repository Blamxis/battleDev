document.addEventListener("DOMContentLoaded", () => {
    // Sélection des éléments du DOM
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submit');
    const errorMessage = document.getElementById('password-help');
    const toggleSwitch = document.getElementById('theme-switch');
    const body = document.body;
    const themeText = document.querySelector('.theme-switch-container em');

    // Valider le mot de passe
    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) {
            errors.push("Le mot de passe doit contenir au moins 8 caractères.");
        }
        if (!password.match(/[A-Z]/)) {
            errors.push("Le mot de passe doit inclure au moins une majuscule.");
        }
        if (!password.match(/[a-z]/)) {
            errors.push("Le mot de passe doit inclure au moins une minuscule.");
        }
        if (!password.match(/[0-9]/)) {
            errors.push("Le mot de passe doit inclure au moins un chiffre.");
        }
        if (!password.match(/[$&+,:;=?@#|'<>.^*()%!-]/)) {
            errors.push("Le mot de passe doit inclure au moins un caractère spécial.");
        }
        return errors;
    };

    // Afficher les erreurs
    const displayErrors = (errors) => {
        errorMessage.innerHTML = '';
        errors.forEach(error => {
            const errorElement = document.createElement('p');
            errorElement.textContent = error;
            errorMessage.appendChild(errorElement);
        });
    };

    // Soumission du formulaire
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const password = passwordInput.value;
        const errors = validatePassword(password);

        if (errors.length > 0) {
            displayErrors(errors); // Affiche les erreurs
        } else {
            errorMessage.innerHTML = '';
            alert('Formulaire soumis avec succès !');
            window.location.href = 'success.html';
        }
    });

    // Update texte du thème (clair et sombre)
    const updateThemeText = () => {
        if (body.classList.contains('dark-theme')) {
            themeText.textContent = 'Thème clair';
        } else {
            themeText.textContent = 'Thème sombre';
        }
    };

    // Basculer le thème
    const switchTheme = () => {
        body.classList.toggle('dark-theme'); // Bascule la classe dark-theme
        const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme); // Enregistre le thème dans localStorage
        updateThemeText(); // Met à jour le texte du thème
    };

    // Changement du switch de thème
    toggleSwitch.addEventListener('change', switchTheme);

    // Applique le thème actuel
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(`${currentTheme}-theme`);
        toggleSwitch.checked = currentTheme === 'dark';
    } else {
        body.classList.add('light-theme');
    }

    updateThemeText();
});
