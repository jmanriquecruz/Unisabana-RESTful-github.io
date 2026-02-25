export class RecommendationEngine {

    static generate(method, url, rules) {

        const suggestions = [];

        // 1️⃣ Normalizar segmentos
        let segments = url.toLowerCase().split("/").filter(Boolean);

        // 2️⃣ Asegurar /api
        if (segments[0] !== "api") {
            segments.unshift("api");
            suggestions.push("Debe iniciar con /api/");
        }

        // 3️⃣ Eliminar verbos comunes
        const verbs = ["get", "create", "update", "delete"];
        segments = segments.map(seg => {
            verbs.forEach(v => {
                if (seg.startsWith(v)) {
                    seg = seg.replace(v, "");
                    suggestions.push("Use sustantivos en lugar de verbos.");
                }
            });
            return seg;
        });

        // 4️⃣ Recurso principal
        if (segments.length > 1) {

            let resource = segments[1];

            if (!resource.endsWith("s")) {
                resource = resource + "s";
                suggestions.push("Use plural para los recursos.");
            }

            segments[1] = resource;
        }

        // 5️⃣ Reconstruir limpio
        const recommended = "/" + segments.join("/");

        return {
            recommended,
            suggestions
        };
    }
}