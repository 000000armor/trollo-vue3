import { v4 as uuid } from "uuid";

export default {
  name: "workshop",
  columns: [
    {
      name: "todo",
      tasks: [
        {
          description:
            "some text some textsome textsome textsome textsome textsome textsome text",
          name: "first task",
          id: uuid(),
          userAssigned: null,
        },
        {
          description:
            "some textsome textsome textsome textsome textsome textsome text",
          name: "second task",
          id: uuid(),
          userAssigned: null,
        },
        {
          description:
            "some textsome textsome textsome textsome textsome textsome text",
          name: "and thrid",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: "in-progress",
      tasks: [
        {
          description:
            "some textsome textsome textsome textsome textsome textsome text",
          name: "first task",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
  ],
};
