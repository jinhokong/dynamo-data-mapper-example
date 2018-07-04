import mapper from "./mapper";
import { BlogPost } from "./class";

mapper
  .get(
    Object.assign(new BlogPost(), {
      id: "bar1"
    })
  )
  .then(myItem => {
    console.log(myItem);
  })
  .catch(err => {
    console.warn(err);
  });
