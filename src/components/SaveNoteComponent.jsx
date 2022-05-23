import NoteService from "../services/noteService.js";
import React from "react";
import { Container } from "reactstrap";
import { getTokenOrRefresh } from "../tokenUtil";
import "../custom.css";
import { useEffect, useState } from "react";
import axios from "axios";
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

export default function SaveNoteComponent() {
  const [text, setText] = useState("Listening on changes...");

  let [noteTitle, setNoteTitle] = useState("");
  let [isListening, setListening] = useState(false);

  useEffect(() => {
    // // check for valid speech key/region
    // const tokenRes = getTokenOrRefresh().then((res) => res);
    // if (tokenRes.authToken === null) {
    //   setText(`FATAL_ERROR: ${tokenRes.error}`);
    // }

    // get current note title
    let noteId = localStorage.getItem("note_id");
    axios
      .get(`http://localhost:3000/note/${noteId}`, { withCredentials: true })
      .then((res) => setNoteTitle(res["data"]["title"]));
  }, []);

  // async function createRecognizer() {
  //   const tokenObj = await getTokenOrRefresh();
  //   const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
  //     tokenObj.authToken,
  //     tokenObj.region
  //   );
  //   const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
  //   const recognizer = new speechsdk.SpeechRecognizer(
  //     speechConfig,
  //     audioConfig
  //   );
  //   return recognizer;
  // }

  const speechConfig = speechsdk.SpeechConfig.fromSubscription("", "");
  const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

  async function saveNote() {
    const noteId = localStorage.getItem("note_id");
    await NoteService.saveNote(text, noteId);
  }

  // Split Mic func into two funcs
  function startRecording() {
    setText("speak into your microphone...");
    let text = "";
    recognizer.startContinuousRecognitionAsync(
      () => {
        console.log("start listening");
        // document.querySelector(".fa-microphone").className =
        //   "fas fa-microphone-slash";

        // toggle listening to true
        setListening(true);
      },
      (err) => console.log(err)
    );

    recognizer.recognizing = (s, e) => {
      console.log(`RECOGNIZING: Text=${e.result.text}`);
    };

    recognizer.recognized = (s, e) => {
      if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
        text += e.result.text;
        setText(text);
      } else if (e.result.reason === speechsdk.ResultReason.NoMatch) {
        setText(
          "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly."
        );
        recognizer.stopContinuousRecognitionAsync();
        setListening(false);
      }
    };

    recognizer.canceled = (s, e) => {
      if (e.reason === speechsdk.CancellationReason.Error) {
        console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
        console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
        console.log(
          "CANCELED: Did you set the speech resource key and region values?"
        );
        recognizer.stopContinuousRecognitionAsync();
        setListening(false);
      }
    };
  }

  function stopRecording() {
    recognizer.stopContinuousRecognitionAsync();
    // document.querySelector(".fa-microphone-slash").className =
    //   "fas fa-microphone fa-lg mr-2";
    setListening(false);
    recognizer.close();
    // recognizer.stopContinuousRecognitionAsync(
    //   () => {
    //     console.log("stop listening");
    //     document.querySelector(".fa-microphone-slash").className =
    //       "fas fa-microphone fa-lg mr-2";
    //     // toggle listening to false
    //     setListening(!isListening);
    //     recognizer.close();
    //   },
    //   (err) => console.log(err)
    // );
  }

  function mic() {
    if (!isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  }
  return (
    <Container className='app-container'>
      <h1 className='display-4 mb-3'>{noteTitle}</h1>

      <div className='row main-container'>
        <div className='col-6'>
          <i className='fas fa-microphone fa-lg mr-2' onClick={mic}></i>
          Convert speech to text from your mic.
        </div>
        <div className='col-6 output-display rounded'>
          <code style={{ color: "white" }}>{text}</code>
        </div>
      </div>
      <button onClick={saveNote}>Save note</button>
    </Container>
  );
}
