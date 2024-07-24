import PageNotFound from "../../assets/404.svg"
export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <img src={PageNotFound} alt="page_not_found_photo" className="img_404"/>
      {/* <p>Page not found</p> */}
    </div>
  );
}
