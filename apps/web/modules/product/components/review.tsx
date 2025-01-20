import { Star, StarHalf } from "lucide-react";

const ReviewsComponent = () => {
  const ratings = {
    excellent: { count: 100, label: "Excellent" },
    good: { count: 11, label: "Good" },
    average: { count: 3, label: "Average" },
    belowAverage: { count: 8, label: "Below\nAverage" },
    poor: { count: 1, label: "Poor" },
  };

  const reviews = [
    {
      id: 1,
      author: "Aisha Bello",
      rating: 4.5,
      date: "13 January, 2025",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    },
    {
      id: 2,
      author: "Aisha Bello",
      rating: 4.5,
      date: "13 January, 2025",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    },
  ];

  const RatingStars = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={i}
            className="w-[2.4rem] h-[2.4rem] fill-[#FFBE0A] text-yellow-400"
          />
        ))}
        {hasHalfStar && (
          <StarHalf className="w-[2.4rem] h-[2.4rem] fill-[#FFBE0A] text-yellow-400" />
        )}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star
            key={i + fullStars}
            className="w-[2.4rem] h-[2.4rem] text-yellow-400"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="text-white border-t border-[#848484] pt-[8rem]">
      <h1 className="text-[2.4rem] leading-[3.2rem] font-medium mb-[4.8rem]">
        Reviews
      </h1>

      {/* Rating Summary */}
      <div className="flex gap-[6rem] mb-[9.4rem] ">
        <div className="bg-[#282828] w-[184px] h-[192px] rounded-[25px] flex flex-col justify-center items-center">
          <div className="text-[5.6rem] leading-[5.6rem] font-medium mb-[1.6rem]">
            4.8
          </div>
          <div className="text-[1.5rem] leading-[1.6rem] text-[#848484] mb-[1.6rem]">
            of 125 reviews
          </div>
          <RatingStars rating={4.8} />
        </div>

        <div className="flex-1">
          {Object.entries(ratings).map(([key, { count, label }]) => (
            <div
              key={key}
              className="flex gap-[2.4rem] items-center mb-[2.4rem]"
            >
              <div className="w-[116px] text-[1.8rem] leading-[1.6rem] text-[#B8B8B8]">
                {label}
              </div>
              <div className="flex-1 bg-zinc-800 h-2 rounded-full">
                <div
                  className="bg-[#FFBE0A] h-2 rounded-full"
                  style={{ width: `${(count / 100) * 100}%` }}
                />
              </div>
              <div className="w-8 text-right text-[1.6rem] leading-[1.6rem] font-medium text-[#B8B8B8]">
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-[2rem]">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-[#282828] p-[2.2rem] rounded-[2rem] border border-[rgba(255,255,255,0.38)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-[5.6rem] h-[5.6rem] bg-gray-600 rounded-full overflow-hidden">
                <img
                  src="/images/girl.png"
                  alt={review.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium mb-1 text-[1.6rem] leading-[2.7rem]">
                  {review.author}
                </div>
                <RatingStars rating={review.rating} />
              </div>
              <div className="ml-auto text-[1rem] leading-[15px] text-white">
                {review.date}
              </div>
            </div>
            <p className="text-[rgba(255,255,255,0.63)] text-[1.4rem] leading-[1.6rem] font-normal">
              {review.content}
            </p>
            <div className="flex justify-end gap-[1.2rem] items-center">
              <span>
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2327 3H8.56957C6.10148 3 4.86744 3 4.10071 3.73223C3.33398 4.46447 3.33398 5.64297 3.33398 8L3.42248 13H13.2327C15.0853 13 16.0116 13 16.4046 12.5212C16.5133 12.3888 16.593 12.2367 16.6386 12.0742C16.8039 11.4867 16.2482 10.779 15.1366 9.36367C14.6742 8.77488 14.4431 8.48049 14.4018 8.14592C14.3899 8.04898 14.3899 7.95102 14.4018 7.85408C14.4431 7.51951 14.6742 7.22512 15.1366 6.63637C16.2482 5.22101 16.8039 4.51333 16.6386 3.92582C16.593 3.76326 16.5133 3.61118 16.4046 3.47873C16.0116 3 15.0853 3 13.2327 3Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3.33398 18.0001V7.16675"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
              <button className="flex items-center gap-2 text-[1.2rem] leading-[2.7rem] font-medium text-white">
                Flag Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsComponent;
