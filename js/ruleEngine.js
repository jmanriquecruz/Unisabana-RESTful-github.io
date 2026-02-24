
import { ApiPrefixRule } from "./ApiPrefixRule.js";
import { NoVerbRule } from "./ApiPrefixRule.js";
import { PluralRule } from "./ApiPrefixRule.js";
import { HttpMethodRule } from "./ApiPrefixRule.js";
import { IdRule } from "./ApiPrefixRule.js";
import { StrictLowercaseRule } from "./ApiPrefixRule.js";
import { StrictSnakeCaseRule } from "./ApiPrefixRule.js";

export  class RuleEngine {

    constructor(strict = false) {
        this.rules = [
            new ApiPrefixRule(),
            new NoVerbRule(),
            new PluralRule(strict),
            new HttpMethodRule(),
            new IdRule()
        ];

        if (strict) {
            this.rules.push(new StrictLowercaseRule());
            this.rules.push(new StrictSnakeCaseRule());
        }
    }

    evaluate(context) {

        let score = 100;
        const results = [];

        this.rules.forEach(rule => {

            const passed = rule.validate(context);

            if (!passed) score -= rule.weight;

            results.push({
                name: rule.name,
                weight: rule.weight,
                passed
            });

        });

        if (score < 0) score = 0;

        return {
            score,
            rules: results
        };
    }
}