import mapper from "./mapper";
import { BlogPost } from "./class";
const query = async () => {
  for await (const foo of mapper.query(BlogPost, { id: "bar1" })) {
    console.log(foo);
  }
};
query();
