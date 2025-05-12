import "./NotFoundStyle.scss";
import { useLanguage } from "../../services/LanguageService";

function NotFoundPage() {
const {content} = useLanguage();

  return (
  <article className="content">
    <h1>{content.notFoundPage_error404}</h1>
  </article>
  );
}

export default NotFoundPage;
