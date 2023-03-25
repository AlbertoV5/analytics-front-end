export const buildURL = (base: string, args: string[]) => {
    var url = `${base}`;
    args.forEach(item => {
        url = `${url}/${item}`
    });
    return url;
}