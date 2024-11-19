"use client";

import { Button, Image, Modal } from "antd";
import { useState } from "react";
import { Space } from "@/types/space";
import TextInputForm from "@/components/TextInputForm";

const TextRecordButton: React.FC<{ data: Space }> = ({ data }) => {
  let [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const { logo, message, questions } = data;

  return (
    <>
      <Button
        className="rounded bg-black py-2 px-4 text-sm text-white data-[hover]:bg-black data-[active]:bg-black"
        onClick={showModal}
      >
        Send in text
      </Button>
      <Modal
        title="Write text testimonial to"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        maskClosable={false}
        centered
      >
        <div className="my-5">
          <div className="flex gap-5 flex-col items-center my-10">
            <Image src={logo} alt={message} width={100} height={100} />
            <h2 className="uppercase font-bold">Questions</h2>
            <ul className="list-disc list-inside">
              {questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </div>
          <TextInputForm onCancel={handleCancel} />
        </div>
      </Modal>
    </>
  );
};

export default TextRecordButton;
