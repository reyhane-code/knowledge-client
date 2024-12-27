import useComments from "../hooks/useComments";

interface Props {
    entityType: string;
    entityId: number;
}

const CommentsList = ({ entityType, entityId }: Props) => {
    const { data, error, isLoading } = useComments(entityType, entityId)
    
    return <div></div>
}


export default CommentsList