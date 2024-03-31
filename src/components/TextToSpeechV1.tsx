import { useEffect, useState } from "react";
import { Box, Button, Textarea } from "@chakra-ui/react";
import axios from "axios";
interface Prop {
  text: string;
}
const TextToSpeech = ({ text }: Prop) => {
  const [audiosrc, setAudiosrc] = useState("");
  useEffect(() => {
    requestSpeech(text);
  }, [text]);
  const requestSpeech = async (text: string) => {
    const api_key = import.meta.env.VITE_GOOGLE_SPEECH_TO_TEXT_API_KEY;
    const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${api_key}`;
    const payload = {
      audioConfig: {
        audioEncoding: "MP3",
        effectsProfileId: ["small-bluetooth-speaker-class-device"],
        pitch: 0,
        speakingRate: 1,
      },
      input: {
        text: text,
      },
      voice: {
        languageCode: "en-US",
        name: "en-US-Studio-O",
      },
    };

    await axios.post(endpoint, payload).then((res) => {
      console.log(res.data.audioContent);
      setAudiosrc(`data:audio/mp3;base64,${res.data.audioContent}`);
    });
  };

  return (
    <>
      {audiosrc && (
        <audio
          style={{ height: "36px", color: "#E2E8F0" }}
          src={audiosrc}
          controls
        />
      )}
    </>
  );
};

export default TextToSpeech;
