import axios from "axios";
import { Request, Response } from "express";

const speechTokenController = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  const speechKey = process.env.SPEECH_KEY;
  const speechRegion = process.env.SPEECH_REGION;
  console.log(speechKey, speechRegion);
  if (
    speechKey === "paste-your-speech-key-here" ||
    speechRegion === "paste-your-speech-region-here"
  ) {
    res
      .status(400)
      .send("You forgot to add your speech key or region to the .env file.");
  } else {
    const headers = {
      headers: {
        "Ocp-Apim-Subscription-Key": speechKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      const tokenResponse = await axios.post(
        `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
        null,
        headers
      );
      res.send({ token: tokenResponse.data, region: speechRegion });
    } catch (err) {
      res.status(401).send("There was an error authorizing your speech key.");
    }
  }
};

export default speechTokenController;
