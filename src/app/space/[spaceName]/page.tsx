import TextRecordButton from "@/components/TextRecordButton";
import VideoRecordButton from "@/components/VideoRecordButton";
import { Space } from "@/types/space";

async function SpaceViewer({ params }: { params: { spaceName: string } }) {
  const res = await fetch(`http://localhost:3000/api/${params.spaceName}`);
  const data: Space = await res.json();

  if (!data) return "Loading...";

  return (
    <div>
      <div className="flex flex-col gap-10 items-center m-20">
        {/* <Image src={data?.logo} alt={data?.title} width={200} height={200} /> */}
        <h2>{data?.title}</h2>
        <p>{data?.message}</p>
        <p className="uppercase">Questions</p>
        <ul>
          {data?.questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>

        <section>
          <div className="flex gap-5 items-center w-full">
            <VideoRecordButton />
            <TextRecordButton data={data} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default SpaceViewer;
