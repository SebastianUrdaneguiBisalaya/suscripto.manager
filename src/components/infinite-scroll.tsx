import icons from "@/constants/icons";

export default function InfiniteScroll() {
  return (
    <div className="overflow-x-hidden pt-12 py-4 px-4 flex flex-row gap-20 max-w-4xl group">
      <ul className="min-w-full list-none shrink-0 flex flex-row gap-4 items-center justify-between animate-scroll group-hover:[animation-play-state:paused]">
        {
            icons.map((icon, index) => (
              <li key={index}>
                <div className="flex justify-center items-center opacity-50">
                  {icon.icon}
                </div>
              </li>
            ))
        }
      </ul>
      <ul className="min-w-full list-none shrink-0 flex flex-row gap-4 items-center justify-between animate-scroll group-hover:[animation-play-state:paused]">
        {
            icons.map((icon, index) => (
              <li key={index}>
                <div className="flex justify-center items-center opacity-50">
                  {icon.icon}
                </div>
              </li>
            ))
        }
      </ul>
    </div>
  );
}
