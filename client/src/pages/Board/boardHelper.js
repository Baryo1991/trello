export const initialState = {
  columns: [
    {
      id: "column-1",
      title: "To-do",
      type: "To Do",
      cards: [
        {
          id: "task-1",
          title: "Take out the garbage",
        },
        {
          id: "task-2",
          title: "Watch my favorite show",
        },
        { id: "task-3", title: "Charge my phone" },
        {
          id: "task-4",
          title: "Cook dinner",
        },
      ],
    },
    {
      id: "column-2",
      title: "In Progress",
      type: "To Do",
      cards: [],
    },
    {
      id: "column-3",
      title: "Done",
      type: "To Do",
      cards: [],
    },
  ],
};

export const compareArrayObj = (a, b, field) => {
  return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
};
