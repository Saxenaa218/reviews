import { Topic } from "@/types/topic";
import { useEffect, useState } from "react";

const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    (async () => {
      const topics = await (await fetch("/api/topic")).json();
      console.log(topics);
      setTopics(topics);
    })();
  }, []);

  return (
    <section>
      <h3>Hello Topics</h3>
    </section>
  );
};

export default Topics;
