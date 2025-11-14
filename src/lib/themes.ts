export interface Theme {
  name: string;
  gradients: string[];
}

export const themes: Theme[] = [
  { name: "LOVE", gradients: ["linear-gradient(to right, #ff512f, #dd2476)"] },
  {
    name: "REGRET",
    gradients: ["linear-gradient(to right, #3a7bd5, #3a6073)"],
  },
  { name: "FUNNY", gradients: ["linear-gradient(to right, #f7971e, #ffd200)"] },
  {
    name: "STRESS",
    gradients: ["linear-gradient(to right, #1e3c72, #2a5298)"],
  },
  {
    name: "RANDOM",
    gradients: ["linear-gradient(to right, #43cea2, #185a9d)"],
  },
];
