export function req(url: string, method: string, body?: object, headertoken?: string) {
    return (fetch(`http://10.10.1.250:4201/${url}`, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'authorization': `Baurer ${headertoken}` },
        body: JSON.stringify(body)
    }).then(response => response.json())
    );
}