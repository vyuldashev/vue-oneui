function stringReplacement(template, parameter) {
    // To uppercase
    if (/^[A-Z]+$/.test(template)) {
        return parameter.toUpperCase();
    }

    // To capitalize case
    if (/^[A-Z]/.test(template)) {
        return parameter[0].toUpperCase() + parameter.slice(1);
    }

    // Default lower case
    return parameter.toLowerCase();
}

function toTemplateCase(template, parameter) {
    switch (typeof parameter) {
        case 'string':
            return stringReplacement(template, parameter);
        default:
            return parameter;
    }
}

function makeReplacements(title, params) {
    return title.replace(/:(\w+)/g, (_, template) => {
        const key = template.toLowerCase();

        return params.hasOwnProperty(key) ? toTemplateCase(template, params[key]) : '';
    });
}

export default function resolveRouteTitle(route) {
    if (route.hasOwnProperty('meta') && route.meta.hasOwnProperty('title')) {
        let title = typeof route.meta.title === "function" ? route.meta.title(route.params) : route.meta.title;

        return /:\w+/.test(title) ? makeReplacements(title, route.params) : title;
    }

    return null;
}
