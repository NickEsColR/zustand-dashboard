import { StateCreator, create } from "zustand";
import { Task, type TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
// import { produce } from "immer";
import { immer } from "zustand/middleware/immer";

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;

  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title:string, status:TaskStatus) => void;

  setDraggingTaskId: (id: string) => void;
  removeDraggingTaskId: () => void;
  changeProgress: (id: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    'ABC-1':{id: 'ABC-1', title: 'Task 1', status: 'OPEN'},
    'ABC-2':{id: 'ABC-2', title: 'Task 2', status: 'IN_PROGRESS'},
    'ABC-3':{id: 'ABC-3', title: 'Task 3', status: 'OPEN'},
    'ABC-4':{id: 'ABC-4', title: 'Task 4', status: 'OPEN'},
  },
  getTaskByStatus: (status:TaskStatus) => {
    return Object.values(get().tasks).filter((task) => task.status === status);
  },
  addTask: (title, status) => {
    const newTask = {id:uuidv4(), title, status};

    //?immer middleware
    set((state) => {
      state.tasks[newTask.id] = newTask;
    });

    //?npm install immer
    // set ( produce((state:TaskState)=> {
    //   state.tasks[newTask.id] = newTask;
    // }))
    //nativa
    // set({
    //   tasks: {
    //     ...get().tasks,
    //     [newTask.id]: newTask,
    //   },
    // });
  },
  setDraggingTaskId: (id) => {
    set({draggingTaskId: id});
  },
  removeDraggingTaskId: () => {
    set({draggingTaskId: undefined});
  },
  changeProgress: (id, status) => {
    // const task = get().tasks[id];
    // set({
    //   tasks: {
    //     ...get().tasks,
    //     [id]: {
    //       ...task,
    //       status,
    //     },
    //   },
    // });
    set(state => {
      state.tasks[id].status = status;
    })
  },
  onTaskDrop: (status) => {
    const draggingTaskId = get().draggingTaskId;
    if (draggingTaskId) {
      get().changeProgress(draggingTaskId, status);
      get().removeDraggingTaskId();
    }
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      immer(storeApi),
      {
        name: "tasks-store",
      }
    )
  )
);