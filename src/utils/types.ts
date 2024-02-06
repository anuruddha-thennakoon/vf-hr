export type ResourceType = {
    id: string;
    name: string;
};

export type SkillType = {
    id: number;
    name: string;
};

export type FormFields = {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    skills: SkillType[];
};