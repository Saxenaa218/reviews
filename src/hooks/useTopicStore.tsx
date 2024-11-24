import { create } from "zustand";

interface TopicFormData {
  topicName: string;
  title: string;
  message: string;
  allowText: boolean;
  allowVideo: boolean;
  logo?: string;
  questions: string[];
}

interface TopicStore {
  topicFormData: TopicFormData;
  setTopicFormData: (data: Partial<TopicFormData>) => void;
}

export const useTopicStore = create<TopicStore>((set) => ({
  topicFormData: {
    topicName: "",
    title: "",
    message: "",
    allowText: false,
    allowVideo: false,
    questions: [
      "Who are you / what are you working on?",
      "How has our product / service helped you?",
      "What is the best thing about our product / service?",
    ],
  },
  setTopicFormData: (data) =>
    set((state) => ({
      topicFormData: { ...state.topicFormData, ...data },
    })),
}));
