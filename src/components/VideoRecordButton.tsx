"use client";

import { Button, message, Modal } from "antd";
import React, { useRef, useState } from "react";

const VideoRecordModal = () => {
  const [video, setVideo] = useState("");
  const [open, setOpen] = useState(false);

  const onRecordingComplete = (data: Blob) => {
    console.log(data);
    const videoUrl = URL.createObjectURL(data);
    setVideo(videoUrl);
  };

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <Button onClick={toggle}>Send in Video</Button>
      <Modal
        title="Send Video Review"
        open={open}
        onOk={toggle}
        onCancel={toggle}
        footer={null}
      >
        <div>
          {video && <video src={video} controls autoPlay />}
          <VideoRecorder onRecordingComplete={onRecordingComplete} />
        </div>
      </Modal>
    </div>
  );
};

export const VideoRecorder: React.FC<{
  onRecordingComplete: (blob: Blob) => void;
}> = ({ onRecordingComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current!.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          onRecordingComplete(event.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message);
      } else {
        message.error("An unknown error occurred");
      }
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current!.stop();
    videoRef.current!.srcObject = null;
    setIsRecording(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <video className="transform -scale-x-100" ref={videoRef} autoPlay />
      <Button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
    </div>
  );
};

export default VideoRecordModal;
