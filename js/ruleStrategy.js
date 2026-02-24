// ===== Base Strategy =====
export class RuleStrategy {
    constructor(name, weight) {
        this.name = name;
        this.weight = weight;
    }

    validate(context) {
        throw new Error("validate() debe implementarse");
    }
}