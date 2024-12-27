import Comment from "../entities/Comment";

interface Props {
  comment: Comment;
}
const CommentItem = ({ comment }: Props) => {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <span className="text-base lg:text-lg font-medium">
          {comment.user.username ??
            `${comment.user.first_name} ${comment.user.last_name}`}
        </span>
      </div>

      <p className="text-sm">{comment.content}</p>
      <div className="flex justify-end w-full">
        {/* replay icon */}
      </div>
    </div>
  );
};

export default CommentItem;
