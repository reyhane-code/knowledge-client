import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import useGame from "../hooks/useGame";
import LikeButton from "../components/common/LikeButton";
import GameScreenshots from "../components/GameScreenshots";
import BookmarkButton from "../components/common/BookmarkButton";
import Image from "../components/common/Image";
import { ImageFormat } from "../enums";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useGame(slug!);

  if (isLoading)
    return <span className="loading loading-ring loading-lg"></span>;

  if (error || !data) {
    console.log(error);
    throw error;
  }
  return (
    <div className="felx flex-col items-center justify-center max-w-[90vw]">
      <div className="col-start">
        {data.game.image && (
          <Image
            query={{ hashKey: data?.game.image, format: ImageFormat.WEBP, height: 720, width: 1080, quality: 100 }}
            altText={data.game.name}
            className="transform group-hover:scale-[1.05] transition-all duration-300 ease-in object-cover w-[90vw] md:w-[40rem] mx-auto"
          />
        )}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl">{data?.game.name}</h1>
          <div className="flex items-center gap-x-1">
            <LikeButton
              id={data?.game?.id}
              entity="game"
              initialLikes={data?.likes}
            ></LikeButton>
            <BookmarkButton id={data.game.id} entity="game" />
          </div>
        </div>
        <ExpandableText>{data?.game.description}</ExpandableText>
        <GameAttributes game={data} />
      </div>
      {data?.game?.screenshots && (
        <div>
          <GameScreenshots screenshots={data?.game?.screenshots} />
        </div>
      )}
    </div>
  );
};

export default GameDetailPage;
