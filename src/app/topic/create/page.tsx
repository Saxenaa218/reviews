"use client";

import { useTopicStore } from "@/hooks/useTopicStore";
import CreateTopicForm from "./CreateTopicForm";
import TestimonialPage from "./TestimonialsPage";

const CreateTopic = () => {
  const {
    topicFormData: { logo, message, questions, title, allowText, allowVideo },
  } = useTopicStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-5">
      <TestimonialPage
        allowText={allowText}
        allowVideo={allowVideo}
        header={title}
        subheading={message}
        logo={logo}
        questions={questions}
      />
      <CreateTopicForm />
    </div>
  );
};

export default CreateTopic;
