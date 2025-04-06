export const generateDynaimcParamRoute = (route, value, param = "id") => {
    return route.replace(`:${param}`, value);
};
