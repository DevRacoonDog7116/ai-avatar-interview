import { convertTextToSpeech } from "./elevenLabs.mjs";
import { getPhonemes } from "./rhubarbLipSync.mjs";
import { readJsonTranscript, audioFileToBase64 } from "../utils/files.mjs";
import fs from 'fs'
import path from 'path'

const MAX_RETRIES = 10;
const RETRY_DELAY = 0;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const tmpDir = 'tmp';

const lipSync = async ({ messages }) => {
  await Promise.all(
    messages.map(async (message, index) => {
      //const fileName = `tmp/message_${index}.mp3`;
      const fileName = path.join(process.cwd(), tmpDir, `message_${index}.mp3`);
      for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
          
          await convertTextToSpeech({ text: message.text, fileName });
          await delay(RETRY_DELAY);
          break;
        } catch (error) {
          if (error.response && error.response.status === 429 && attempt < MAX_RETRIES - 1) {
            await delay(RETRY_DELAY);
          } else {
            throw error;
          }
        }
      }
     console.log("--------fileExisting--------------", fs.existsSync(fileName));
     console.log(`Message ${index} converted to speech`);
    })
  );

  await Promise.all(
    messages.map(async (message, index) => {
      const fileName = `audios/message_${index}.mp3`;

      try {
        await getPhonemes({ message: index });
        message.audio = await audioFileToBase64({ fileName });
        message.lipsync = await readJsonTranscript({ fileName: `tmp/message_${index}.json` });
      } catch (error) {
        console.error(`Error while getting phonemes for message ${index}:`, error);
      }
    })
  );

  return messages;
};

export { lipSync };
