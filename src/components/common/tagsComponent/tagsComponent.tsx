import { uniqueId } from "lodash";
import { Article } from "../../../types";
import Badge from 'react-bootstrap/Badge';


const TagsComponent = ({ article }: { article: Article }) => {
  return <div className="article-preview__tags">
    {article.tagList?.length ? (
      article.tagList.map((item) => <Badge bg="secondary" className="badge badge-pill badge-light" key={uniqueId("tag_")}>{item}</Badge>)
    ) : (
      <p>#безтегов</p>
    )}
  </div>;
};

export default TagsComponent;
