export const sortDataArray = (array: [], sortingMethod: string) => {
    const sortedData = [...array];
    sortedData.sort((a: any, b: any) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        return sortingMethod === "desc"
            ? nameB.localeCompare(nameA)
            : nameA.localeCompare(nameB);
    });
    return sortedData;
};

export const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
}

export const extractSelectedItems = <T extends { id: string }>(
    data: T[],
    isSelected: any[]
): string[] => {
    if (isSelected.length !== data.length) {
        throw new Error('isSelected array must have the same length as data');
    }

    const selectedIds = data.reduce((acc, item, index) => {
        if (isSelected[index]) {
            acc.push(item.id);
        }
        return acc;
    }, [] as string[]);

    return selectedIds;
};