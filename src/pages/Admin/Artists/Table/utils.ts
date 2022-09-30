export const getPaginationState = (active: number, amount: number) => {
    if (amount < 5) {
        const pages: number[] = []
        for (let i = 1; i <= amount; i++) {
            pages.push(i)
        }
        return pages
    }

    if (amount === 1) return [1]

    if (active <= 4) return [1, 2, 3, 4, 5]

    if (active > 4 && active <= amount - 5) {
        return [active - 2, active - 1, active, active + 1, active + 2]
    }

    if (active > amount - 5) {
        return [amount - 4, amount - 3, amount - 2, amount - 1, amount]
    }

    const pages: number[] = []
    for (let i = 1; i <= amount; i++) {
        pages.push(i)
    }
    return pages
}
