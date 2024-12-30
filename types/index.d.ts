import {
    Blog_likes,
    Bookmarked_Blog,
    Comment,
    Post,
    User,
} from "@prisma/client";

export type FormInputPost = {
    title: string;
    content: string;
    tagId?: string;
    authorId: string;
};

export interface TagsProps {
    searhtags?: string[];
    handleReadTimeToggle: (readTime: string) => void;
    handleTagToggle: (tag: string) => void;
}

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

export interface GetUserPostsProps {
    user_id?: string;
    first_name?: string | null;
    last_name?: string | null;
    type?: "DRAFT" | "PUBLISHED";
}

export interface PostProps {
    id: string;
    title: string;
    content: string;
    banner_url: string;
    createdAt: Date;
    author: User;
    tags: Tag[];
    comments: Comment[];
    blog_likes: Blog_likes[];
    bookmarked_blog: Bookmarked_Blog[];
}

export interface PostComments {
    comment_id: String;
    comment_content: String;
    commented_at: DateTime;
    post_id: String;
    post: Post;
    user_id: String;
    user: User;
}

export interface Tag {
    id: string;
    name: string;
}
