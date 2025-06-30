import { getQuoteOfTheDay } from "../../utils/quotes";

function QuoteCard() {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg p-2 border border-gray-300 dark:border-gray-600 shadow-sm mt-2">
      <p className="italic text-base leading-relaxed before:content-['“'] after:content-['”']">
        {getQuoteOfTheDay()}
      </p>
    </div>
  );
}

export default QuoteCard;
