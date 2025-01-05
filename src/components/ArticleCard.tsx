import { Link } from "react-router-dom";
import Image from "./common/Image";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { ImageFormat } from "../enums";
import Article from "../entities/Article";

interface Props {
  article: Article;
  likes?: number;
}

const ArticleCard = ({ article, likes }: Props) => {
  return (
    <Link
      to={`/articles/${article.id}`}
      className="group bg-base-300 cursor-pointer rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg"
    >
      <Image
        query={{ hashKey: article.image, format: ImageFormat.WEBP, width: 300, height: 300, quality: 100 }}
        altText={article.title}
        className="object-cover w-full h-48 md:h-64 lg:h-80 xl:h-96 group-hover:scale-105 transition duration-300 ease-in-out"
      />
      <div className="p-3">
        <div className="flex flex-col justify-between h-full">
          <h2 className="text-lg lg:text-xl font-bold">{article.title}</h2>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-1">
              <span className="text-sm">{article.view}</span>
              <FaEye className="text-md" />
            </div>
            <div className="flex items-center space-x-1">
              {likes !== undefined && (
                <>
                  <span className="text-sm">{likes}</span>
                  <FaHeart className="text-md" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
