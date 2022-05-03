import { v4 as uuid } from "uuid";

export default {
  name: "workshop",
  columns: {
    todo: {
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
    "in-progress": {
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
    done: {
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
    new: {
      tasks: [
        {
          description:
            "some textsome textsome textsome textsome textsome textsome text",
          name: "woah ",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    "another one": {
      tasks: [
        {
          description:
            "some textsome textsome textsome textsome textsome textsome text",
          name: "lulz",
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
  },
};
