export function hexStringToNumber(hex: string) : number{
    return parseInt(trimOX(hex), 16);
}

export function trimOX(hex: string) : string { 
    return hex.slice(2, hex.length);
}