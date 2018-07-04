import { embed } from "@aws/dynamodb-data-mapper";
import {
  attribute,
  hashKey,
  table,
  rangeKey
} from "@aws/dynamodb-data-mapper-annotations";

class Comment {
  @attribute() author?: string;

  @attribute() postedAt?: Date;

  @attribute() text?: string;
}

@table("TESTEST")
class BlogPost {
  @hashKey() id: string;

  @attribute() author?: string;

  @attribute() postedAt?: Date;

  @attribute({ defaultProvider: () => new Date() })
  createdAt: Date;

  @attribute() text?: string;

  @attribute({ memberType: embed(Comment) })
  replies?: Array<Comment>;
}

export { BlogPost, Comment };
