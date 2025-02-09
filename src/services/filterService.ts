// filter simple query params
function getFilter<T extends Record<string, any>>(
    searchParams: URLSearchParams,
    schema: { key: keyof T; type: "string" | "number" | "boolean" }[]
): Partial<T> {
    const filter: Partial<T> = {};

    schema.forEach(({ key, type }) => {
        const value = searchParams.get(key as string);

        if (value !== null && value !== "") {
            switch (type) {
                case "number":
                    filter[key] = Number(value) as T[keyof T]; 
                    break;
                case "boolean":
                    filter[key] = (value === "true") as T[keyof T]; 
                    break;
                default:
                    filter[key] = value as T[keyof T]; 
            }
        }
    });

    return filter;
}

const filterService = { 
    getFilter 
};

export default filterService;
