import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../components/hooks/use-http";
import { getAllQuotes } from "../components/lib/api";

import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

// const DUMMY_QUOTE = [
//   {
//     id: "q1",
//     author: "max",
//     text: "Learning React is fun..!",
//   },
//   {
//     id: "q2",
//     author: "maximilian",
//     text: "Learning React is great!",
//   },
// ];

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }
  return <QuoteList quotes={loadedQuotes} />;
  //   return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default AllQuotes;
