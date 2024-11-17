export interface PageProps {
    searchParams?: Promise<{
        search?: string;
        rd?: string;
        tag?: string[];
    }>;
}

export interface PageInfoProps {
    posts: {
        id: string;
        title: string;
        content: string;
        tag: {
            id: string;
            name: string;
        };
        author: {
            id: string;
            first_name: string;
            last_name: string;
            email: string;
            profile_image: string | null;
            created_at: Date;
            updated_at: Date;
        };
    }[];
    resultLength: number;
}
