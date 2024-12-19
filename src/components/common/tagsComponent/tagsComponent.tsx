import { uniqueId } from "lodash";
import Badge from "react-bootstrap/Badge";
import { Article } from "../../../types";

const TagsComponent = ({ article }: { article: Article }) => (
  <div className="tags">
    {article.tagList?.length ? (
      article.tagList.map((item) => (
        <Badge
          bg="secondary"
          className="badge badge-pill badge-light"
          key={uniqueId("tag_")}
        >
          {item}
        </Badge>
      ))
    ) : (
      <Badge bg="secondary" className="badge badge-pill badge-light">
        #безтегов
      </Badge>
    )}
  </div>
);

export default TagsComponent;
