// app.js
import { validateRest } from "./restValidator.js";
document.addEventListener("DOMContentLoaded", () => {

    const analyzeBtn = document.getElementById("analyzeBtn");
    analyzeBtn.addEventListener("click", analyze);

});

function analyze() {

    const method = document.getElementById("method").value;
    const url = document.getElementById("url").value.trim();

    const trafficLight = document.getElementById("trafficLight");
    const scoreValue = document.getElementById("scoreValue");
    const tooltip = document.getElementById("rulesTooltip");
    const recommendation = document.getElementById("recommendedEndpoint");

    // Validación básica
    if (!url) {
        scoreValue.innerText = "Score: 0%";
        recommendation.innerText = "Ingrese un endpoint para analizar.";
        trafficLight.className = "traffic-light red";
        tooltip.innerHTML = "No hay datos para analizar.";
        return;
    }

    const result = validateRest(method, url, document.getElementById("strictMode").checked);

    // 🎯 Mostrar Score
    scoreValue.innerText = "Score: " + result.score + "%";

    // 🚦 Semáforo
    trafficLight.className = "traffic-light";

    if (result.score >= 80) {
        trafficLight.classList.add("green");
    } else if (result.score >= 50) {
        trafficLight.classList.add("yellow");
    } else {
        trafficLight.classList.add("red");
    }

    // 🛈 Construir tooltip dinámico con reglas
    tooltip.innerHTML = "<strong>Reglas REST con Ponderación:</strong><br><br>";

    result.rules.forEach(rule => {

        const icon = rule.passed ? "✔" : "✖";
        const color = rule.passed ? "#22c55e" : "#ef4444";

        tooltip.innerHTML += `
            <div style="color:${color}; margin-bottom:6px;">
                ${icon} ${rule.name} (${rule.weight} pts)
            </div>
        `;
    });

    // 🤖 Endpoint recomendado
    recommendation.innerText = method + " " + result.recommended;
}