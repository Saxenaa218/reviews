import { Image } from "antd";
import React from "react";

interface TestimonialPageProps {
  header: string;
  subheading: string;
  logo?: string;
  questions: string[];
  allowVideo: boolean;
  allowText: boolean;
}

const TestimonialPage: React.FC<TestimonialPageProps> = ({
  header,
  subheading,
  logo,
  questions,
  allowVideo,
  allowText,
}) => {
  return (
    <div className="max-w-md bg-white rounded-lg shadow-lg p-6 h-fit">
      {/* Header Section */}
      <div className="text-center mb-6">
        {logo && (
          <Image
            src={logo}
            alt="Logo"
            width={64}
            height={64}
            className="mx-auto mb-4 rounded-full"
          />
        )}
        <h1 className="text-2xl font-bold text-gray-800">{header}</h1>
        <p className="text-gray-600">{subheading}</p>
      </div>

      {/* Questions Section */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Questions</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {questions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        {allowVideo && (
          <button className="w-full flex items-center justify-center bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition">
            <span className="mr-2">🎥</span> Record a Video
          </button>
        )}
        {allowText && (
          <button className="w-full flex items-center justify-center bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition">
            <span className="mr-2">✍️</span> Send in Text
          </button>
        )}
      </div>
    </div>
  );
};

export default TestimonialPage;
