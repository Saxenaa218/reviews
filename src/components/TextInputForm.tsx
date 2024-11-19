import React from "react";
import { Button, Checkbox, Form, Input, Rate } from "antd";
import FormItemUpload from "./UploadFormItem";

const TextInputForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      form={form}
      name="textTestimonialRecord"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item name="rating">
        <Rate />
      </Form.Item>
      <Form.Item name="feedback">
        <Input.TextArea placeholder="Please share your feedback" rows={4} />
      </Form.Item>
      <FormItemUpload name="attachImage" label="Attach Image" />
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input your name",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        tooltip="Your email address will not be shared publicly"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail",
          },
          {
            required: true,
            message: "Please input your E-mail",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="title" label="Company Title">
        <Input />
      </Form.Item>
      <Form.Item name="company" label="Company Name">
        <Input />
      </Form.Item>

      <Form.Item
        name="socialLink"
        label="Your social link (e.g. LinkedIn)"
        rules={[
          {
            type: "url",
            message: "Please share a valid social link",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="address" label="Your address">
        <Input />
      </Form.Item>

      {/* <FormItemUpload name="profilePicture" label="Upload Profile Picture" /> */}

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error("Please select the checkbox to proceed")
                  ),
          },
        ]}
      >
        <Checkbox>
          I give permission to use this testimonial across social channels and
          other marketing efforts
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <div className="flex gap-2 w-full justify-end">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default TextInputForm;
