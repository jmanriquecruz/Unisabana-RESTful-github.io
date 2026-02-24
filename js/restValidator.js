import { RuleEngine } from "./ruleEngine.js";
import { RecommendationEngine } from "./recommendationEngine.js";

export function validateRest(method, url, strict = false) {

    const engine = new RuleEngine(strict);
    const evaluation = engine.evaluate({ method, url });

    const recommendation = RecommendationEngine.generate(
        method,
        url,
        evaluation.rules
    );

    return {
        score: evaluation.score,
        rules: evaluation.rules,
        recommended: recommendation.recommended,
        suggestions: recommendation.suggestions
    };
}