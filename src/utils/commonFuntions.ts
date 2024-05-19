export const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

export const flattenObject = (obj: any, prefix = "") => {
    return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + "." : "";
        if (typeof obj[k] === "object" && obj[k] !== null) {
            Object.assign(acc, flattenObject(obj[k], pre + k));
        } else {
            acc[pre + k] = obj[k];
        }
        return acc;
    }, {});
};

export const formatKeyForPlaceholder = (key: string) => {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/\./g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
};
