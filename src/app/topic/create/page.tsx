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
      <div className="h-full flex justify-center">
        <div>
          <p>
            This card is mere the reflection of how the user will see the card
            and the content
          </p>
          <TestimonialPage
            allowText={allowText}
            allowVideo={allowVideo}
            header={title}
            subheading={message}
            logo={logo}
            questions={questions}
          />
        </div>
      </div>
      <CreateTopicForm />
    </div>
  );
};

export default CreateTopic;
