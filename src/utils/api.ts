export const fetchResources = async () => {
    const response = await fetch(`http://localhost:4000/resources`);
    const data = await response.json();
    return data;
};

export const fetchResource = async (resourceId: string) => {
    const response = await fetch(`http://localhost:4000/resources/${resourceId}`);
    const data = await response.json();
    return data;
};

export const fetchSkills = async (resourceId: string) => {
    const response = await fetch(
        `http://localhost:4000/resources/${resourceId}/skills`
    );
    const data = await response.json();
    return data;
};

export const fetchAllSkills = async () => {
    const response = await fetch(
        `http://localhost:4000/skills`
    );
    const data = await response.json();
    return data;
};

export const addResource = async (postData: {}) => {
    const response = await fetch(`http://localhost:4000/resources`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    });
    const data = await response.json();
    return data;
};