import { useEffect, useState } from "react";
import useUserData from "../hooks/userUserData";
import ArticleGrid from "./ArticleGrid";
import { IGetArticlesResponse } from "../responses/get-articles.response";

const contentMapping = {
    article: {
        hook: useUserData<IGetArticlesResponse>,
        GridComponent: ArticleGrid,
    }
};

interface UserContentFeedProps {
    contentType: keyof typeof contentMapping;
    requestType: string
}

const UserContentFeed: React.FC<UserContentFeedProps> = ({ contentType, requestType }) => {
    const { hook } = contentMapping[contentType];
    const { data, error, isLoading } = hook(contentType, requestType);
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get('page') || '1', 10);
    const [page, setPage] = useState<number>(initialPage);

    useEffect(() => {
        setPage(initialPage);
    }, [initialPage]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (contentType === 'article') {
        return (
            <ArticleGrid
                data={data as IGetArticlesResponse}
                error={error}
                isLoading={isLoading}
                setPage={setPage}
                page={page}
                perPage={10}
            />
        );
    }

    return null;
};

export default UserContentFeed;
