import { useParams, Route, useRouteMatch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { Link } from "react-router-dom";
import useHttp from "../components/hooks/use-http";
import { getSingleQuote } from "../components/lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

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

const QuoteDetails = () => {
  const match = useRouteMatch();
  // console.log(match);

  const params = useParams();

  const { quoteId } = params;

  const {
    sendRequest,
    data: loadedQuote,
    error,
    status,
  } = useHttp(getSingleQuote, true);

  // const quote = DUMMY_QUOTE.find((quote) => quote.id === params.quoteId);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centerd">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">No Quote Found</p>;
  }

  if (!loadedQuote) {
    return <p>No quote found with this id {params.quoteId}</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {/*       <HighlightedQuote text={DUMMY_QUOTE.text} author={DUMMY_QUOTE.author} />
       */}
      {/* below adding route path dynamically */}
      <Route path={`${match.url}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      {/* <Route path={`/quotes/${params.quoteId}/comments`}> */}

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetails;
