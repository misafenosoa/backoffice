document.getElementById('toggleButton').addEventListener('click', function() {
    // Récupérer l'élément body
    var bodyElement = document.body;

    // Vérifier si la classe 'sidebar-icon-only' est déjà présente
    if (bodyElement.classList.contains('sidebar-icon-only')) {
        // Si la classe est présente, la supprimer
        bodyElement.classList.remove('sidebar-icon-only');
    } else {
        // Sinon, ajouter la classe 'sidebar-icon-only'
        bodyElement.classList.add('sidebar-icon-only');
    }
});