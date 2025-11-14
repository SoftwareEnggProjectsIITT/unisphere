export interface Theme {
  name: string;
  gradients: string[];
}

export const themes: Theme[] = [
  {
    name: "LOVE",
    gradients: [
      "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
      "linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%)",
      "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    ],
  },
  {
    name: "REGRET",
    gradients: [
      "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
      "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
      "linear-gradient(135deg, #d3cce3 0%, #e9e4f0 100%)",
    ],
  },
  {
    name: "FUNNY",
    gradients: [
      "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
      "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    ],
  },
  {
    name: "STRESS",
    gradients: [
      "linear-gradient(135deg, #f6f9fc 0%, #e9eff5 100%)",
      "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
      "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    ],
  },
  {
    name: "RANDOM",
    gradients: [
      "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    ],
  },
];
