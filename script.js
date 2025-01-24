document.addEventListener("DOMContentLoaded", () => {
    const sections = [
        document.querySelector("#sobre"),
        document.querySelector("#habilidades"),
        document.querySelector("#contato")
    ];

    // Adiciona o efeito com um atraso entre as animações
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.remove("hidden");
            section.classList.add("slide-in");
        }, index * 1000); // 1 segundo de intervalo entre as seções
    });
});
