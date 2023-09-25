export const valueBetween = (min: number, max: number) =>{
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const valueBetweenRange = (range: number[]) =>{
    return valueBetween(range[0], range[1])
}