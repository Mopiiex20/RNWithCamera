export function doLogin(data: any) {
    return {
        type: `@@LOGIN`,
        data
    }
};