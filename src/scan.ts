import mapper from "./mapper";
import { BlogPost } from "./class";
const scan = async () => {
  for await (const item of mapper.scan(BlogPost)) {
    console.log(item);
  }
};
scan();
