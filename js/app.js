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

let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    // Masquer la diapo actuelle
    slides[currentSlide].classList.remove('active');

    // Calculer le nouvel index
    currentSlide += direction;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    // Afficher la nouvelle diapo
    slides[currentSlide].classList.add('active');
}

// ==========================================================================
// AMÉLIORATIONS VISUELLES AVANCÉES (DASHBOARD INTERACTIF)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {

    /* ----------------------------------------------------------------------
       1. EFFET DE PARALLAXE 3D INTERACTIF SUR LES CARTES (.card)
       ---------------------------------------------------------------------- */
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calcul de la position de la souris à l'intérieur de la carte (entre -0.5 et 0.5)
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            // Inclinaison maximale de 8 degrés
            const tiltX = (y * -12).toFixed(2);
            const tiltY = (x * 12).toFixed(2);
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Réinitialisation fluide lorsque la souris sort de la carte
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });

    /* ----------------------------------------------------------------------
       2. ANIMATION D'APPARITION AU DÉFILEMENT (SCROLL REVEAL DISCRET)
       ---------------------------------------------------------------------- */
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.08
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // L'animation ne se joue qu'une seule fois
            }
        });
    }, observerOptions);

    // On applique l'effet sur les paragraphes, cartes, listes et boîtes de traces
    const elementsToAnimate = document.querySelectorAll('#main-content p, .card, .flex-container, .trace-box, .visual-callout-box, h3');
    
    elementsToAnimate.forEach(el => {
        // État initial invisible et légèrement décalé vers le bas
        el.style.opacity = "0";
        el.style.transform = "translateY(15px)";
        el.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        scrollObserver.observe(el);
    });
});