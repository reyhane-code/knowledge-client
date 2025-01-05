import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import LikeButton from "../components/common/LikeButton";
import { useArticle } from "../hooks/useArticle";
import Image from "../components/common/Image";
import { ImageFormat } from "../enums";
import BookmarkButton from "../components/common/BookmarkButton";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useArticle(id!);

  if (isLoading)
    return <div className="flex justify-center items-center h-screen">
      <span className="loading loading-ring loading-lg"></span>
    </div>;

  if (error || !data) throw error;

  const paragraphs = data?.article.content.split('\r\n\r\n');

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center mb-8">
        {data.article.image && (
          <Image
            query={{ hashKey: data?.article.image, format: ImageFormat.WEBP, width: 1080, height: 720, quality: 100, fit: 'cover' }}
            altText={data.article.title}
            className="h-auto object-cover rounded-lg mb-4 aspect-video md:aspect-[16/9] lg:aspect-[21/9] max-h-screen"
          />
        )}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{data?.article.title}</h1>
          <div className="flex items-center gap-x-2">
            <LikeButton
              id={data?.article.id}
              entity="article"
              initialLikes={data?.likes}
            />
            <BookmarkButton id={data.article.id} entity="article" />
          </div>
        </div>
      </div>
      <div className="w-full text-lg leading-relaxed mb-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default ArticleDetailPage;
