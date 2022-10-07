/**Local Storage */

export const setLocalData = (key: string, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalData = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};
