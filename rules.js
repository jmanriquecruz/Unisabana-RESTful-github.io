import { RuleStrategy } from "./ruleStrategy.js";

export  class ApiPrefixRule extends RuleStrategy {
    constructor() {
        super("Inicia con /api", 15);
    }

    validate({ url }) {
        return url.startsWith("/api/");
    }
}

export  class NoVerbRule extends RuleStrategy {
    constructor() {
        super("No usa verbos", 20);
    }

    validate({ url }) {
        return !/get|create|update|delete/i.test(url);
    }
}

export  class PluralRule extends RuleStrategy {
    constructor(strict) {
        super("Usa sustantivo plural", 15);
        this.strict = strict;
    }

    validate({ url }) {
        const segments = url.split("/").filter(Boolean);
        if (segments.length < 2) return true;
        return segments[1].endsWith("s") || !this.strict;
    }
}

export  class HttpMethodRule extends RuleStrategy {
    constructor() {
        super("Método HTTP coherente", 20);
    }

    validate({ method, url }) {
        const segments = url.split("/").filter(Boolean);
        if (method === "POST" && segments.length > 2) return false;
        return true;
    }
}

export  class IdRule extends RuleStrategy {
    constructor() {
        super("ID correcto", 15);
    }

    validate({ url }) {
        const segments = url.split("/").filter(Boolean);
        if (segments.length > 2) {
            return !isNaN(segments[2]);
        }
        return true;
    }
}

export  class StrictLowercaseRule extends RuleStrategy {
    constructor() {
        super("No mayúsculas en URL", 10);
    }

    validate({ url }) {
        return url === url.toLowerCase();
    }
}

export class StrictSnakeCaseRule extends RuleStrategy {
    constructor() {
        super("No usar snake_case", 10);
    }

    validate({ url }) {
        return !url.includes("_");
    }
}