/**
 * Alterne l'affichage entre les sous-pages (onglets de traces ou de bilan)
 * @param {string} subPageId - L'ID de la sous-page spécifique à afficher
 */
function switchSubPage(subPageId) {
    // 1. Masquer toutes les sous-pages présentes sur la page actuelle
    document.querySelectorAll('.sub-page').forEach(subPage => {
        subPage.classList.remove('active');
    });
    
    // 2. Désactiver tous les boutons d'onglets de la page actuelle
    document.querySelectorAll('.sub-btn').forEach(button => {
        button.classList.remove('active');
    });
    
    // 3. Afficher la sous-page demandée
    const targetSubPage = document.getElementById(subPageId);
    if (targetSubPage) {
        targetSubPage.classList.add('active');
    }
    
    // 4. Activer le bouton d'onglet cliqué
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}