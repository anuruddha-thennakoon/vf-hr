import { SkillType } from "./types";

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

export const extractSelectedItems = (
    data: SkillType[],
    selected: boolean[]
): number[] => {
    if (selected.length !== data.length) {
        throw new Error('isSelected array must have the same length as data');
    }

    const selectedIds = data.reduce((acc: number[], item: SkillType, index: number) => {
        if (selected[index]) {
            acc.push(item.id);
        }
        return acc;
    }, []);

    return selectedIds;
};

export const getErrorMessage = (error: unknown): string => {
    let message: string;
    if (error instanceof Error) {
        message = error.message;
    } else if (error && typeof error === 'object' && 'message' in error) {
        message = String(error.message);
    } else if (typeof error === 'string') {
        message = error;
    } else {
        message = 'Something went wrong';
    }
    return message;
}