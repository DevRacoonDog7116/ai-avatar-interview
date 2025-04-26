import { execCommand } from "../utils/files.mjs";
import path from 'path'

const tmpDir = '/tmp'

const getPhonemes = async ({ message }) => {
  try {
    const time = new Date().getTime();
    console.log(`Starting conversion for message ${message}`);
    const rootDir = process.cwd();
    const suffix = path.join(tmpDir, `message_${message}`)
    await execCommand(
      { command: `ffmpeg -y -i ${suffix}.mp3 ${suffix}.wav` }
      // -y to overwrite the file
    );
    console.log(`Conversion done in ${new Date().getTime() - time}ms`);
    await execCommand({
      command: `./bin/rhubarb -f json -o ${suffix}.json ${suffix}.wav -r phonetic`,
    });
    // -r phonetic is faster but less accurate
    console.log(`Lip sync done in ${new Date().getTime() - time}ms`);
  } catch (error) {
    console.error(`Error while getting phonemes for message ${message}:`, error);
  }
};

export { getPhonemes };
