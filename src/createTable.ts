import mapper from "./mapper";
import { BlogPost } from "./class";

mapper.createTable(BlogPost, {
  readCapacityUnits: 1,
  writeCapacityUnits: 1,
  streamViewType: "NONE",
  indexOptions: {
    anIndex: {
      type: "local",
      projection: "all"
    },
    anotherIndex: {
      type: "global",
      projection: ["aField", "anotherField"],
      readCapacityUnits: 1,
      writeCapacityUnits: 1
    }
  }
});
