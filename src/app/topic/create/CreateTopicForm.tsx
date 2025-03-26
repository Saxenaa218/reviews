"use client";

import { Form, Input, Button, List, Checkbox, Upload } from "antd";
import { message as antMessage } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useTopicStore } from "@/hooks/useTopicStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateTopicForm: React.FC = () => {
  const [form] = Form.useForm();
  const { topicFormData, setTopicFormData } = useTopicStore();
  const { data: sessionData } = useSession();
  const { push } = useRouter();

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...topicFormData.questions];
    newQuestions[index] = value;
    setTopicFormData({ questions: newQuestions });
  };

  const addQuestion = () => {
    setTopicFormData({
      questions: [...topicFormData.questions, ""],
    });
  };

  const removeQuestion = (index: number) => {
    const newQuestions = topicFormData.questions.filter((_, i) => i !== index);
    setTopicFormData({ questions: newQuestions });
  };

  const onFinish = async (values: any) => {
    try {
      // TODO: uplaod to s3 and save filePath to DB then call this below
      const response = await fetch("/api/topic/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: sessionData?.user?.email,
          ...topicFormData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      antMessage.success("Topic created successfully!");
      push("/dashboard");
    } catch (error) {
      console.error("Error creating topic:", error);
      antMessage.error("Failed to create topic");
    }
  };

  const beforeUpload = (file: File) => {
    if (!file) return false;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setTopicFormData({ logo: e.target.result as string });
      }
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Topic</h2>
      <p className="text-gray-600 mb-6">
        After the Topic is created, it will generate a dedicated page for
        collecting testimonials.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          topicFormData,
        }}
        onValuesChange={(changedValues) => {
          const filteredChangedValues = { ...changedValues };
          if ("logo" in filteredChangedValues) {
            delete filteredChangedValues.logo;
          }
          setTopicFormData(filteredChangedValues);
        }}
      >
        <Form.Item
          label="Topic Name"
          name="topicName"
          rules={[{ required: true, message: "Topic Name is required" }]}
        >
          <Input placeholder="Enter topic name" />
        </Form.Item>

        <Form.Item
          name="logo"
          label="Upload Icon"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload an icon!" }]}
        >
          <Upload
            name="icon"
            listType="picture"
            beforeUpload={beforeUpload}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Header Title"
          name="title"
          rules={[{ required: true, message: "Header Title is required" }]}
        >
          <Input placeholder="Would you like to give a shoutout for xyz?" />
        </Form.Item>

        <section className="flex gap-3">
          <Form.Item
            name="allowVideo"
            valuePropName="checked"
            initialValue={topicFormData.allowText}
          >
            <Checkbox>Allow Video</Checkbox>
          </Form.Item>
          <Form.Item
            name="allowText"
            valuePropName="checked"
            initialValue={topicFormData.allowText}
          >
            <Checkbox>Allow Text</Checkbox>
          </Form.Item>
        </section>

        <Form.Item
          label="Your Custom Message"
          name="message"
          rules={[{ required: true, message: "Custom Message is required" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Write a warm message to your customers..."
          />
        </Form.Item>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Questions</h3>
          <List
            dataSource={topicFormData.questions}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <div className="w-full flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                    className="flex-1"
                    placeholder={`Question ${index + 1}`}
                  />
                  <Button
                    danger
                    onClick={() => removeQuestion(index)}
                    disabled={topicFormData.questions.length <= 1}
                  >
                    Remove
                  </Button>
                </div>
              </List.Item>
            )}
          />
          <Button type="dashed" onClick={addQuestion} className="mt-2">
            Add Question
          </Button>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Create Topic
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTopicForm;
