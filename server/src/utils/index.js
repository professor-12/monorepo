export function formatZodError(error) {
    let _error = []
    let formatted = {};

    if (typeof error == "string") {
        _error = JSON.parse(error)
    } 
    _error.forEach((err) => {
        const field = err.path.join(".") || "form";
        formatted[field] = err.message;
    });

    return formatted;
}
