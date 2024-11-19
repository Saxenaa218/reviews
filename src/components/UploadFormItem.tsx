import React from "react";
import { Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface UploadFormItemProps {
  name: string;
  label: string;
  rules?: any;
}

const UploadFormItem: React.FC<UploadFormItemProps> = ({
  name,
  label,
  rules,
}) => {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form.Item
      name={name}
      label={label}
      valuePropName="fileList"
      getValueFromEvent={normFile}
      rules={rules}
    >
      <Upload name={name} listType="picture" beforeUpload={() => false}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Form.Item>
  );
};

export default UploadFormItem;
