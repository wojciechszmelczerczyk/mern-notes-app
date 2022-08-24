import "../custom.css";
import { Container } from "reactstrap";
import { getTokenOrRefresh } from "../tokenUtil";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import NoteService from "../services/noteService.js";
import React from "react";
import Buffer from "../components/Buffer";
import { languages } from "../data/languages";
import noteService from "../services/noteService.js";

const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

export default function SaveNoteComponent() {
  const [text, setText] = useState("Listening on changes...");
  const [redirect, setRedirect] = useState(false);
  const [recognizingText, setRecognizingText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [isListening, setListening] = useState(false);
  const [stopRecognizing, setStopRecognizing] = React.useState(() => noop);
  const [language, setLanguage] = useState("en-US");

  function noop() {}

  const navigate = useNavigate();

  const at = localStorage.getItem("at");

  // get current note title
  let noteId = localStorage.getItem("note_id");

  useEffect(() => {
    // // check for valid speech key/region
    const tokenRes = getTokenOrRefresh().then((res) => res);
    if (tokenRes.authToken === null) {
      setText(`FATAL_ERROR: ${tokenRes.error}`);
    }

    NoteService.getSingleNote(at, noteId).then((res) =>
      setNoteTitle(res["data"]["title"])
    );
  }, []);

  function handleLanguage(lang) {
    setLanguage(lang);
  }

  async function cancel() {
    await noteService.deleteNote(at, noteId);
    localStorage.removeItem("note_id");
    navigate("/");
  }

  async function createRecognizer() {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    );
    speechConfig.speechRecognitionLanguage = language;
    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    console.log(audioConfig);
    const recognizer = new speechsdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );
    return recognizer;
  }

  async function saveNote() {
    const noteId = localStorage.getItem("note_id");
    const savedNote = await NoteService.saveNote(at, text, noteId);
    if (savedNote) {
      localStorage.removeItem("note_id");
      setRedirect(true);
    } else {
      // some handler
    }
  }

  function handleText(e) {
    console.log(e.target.value);
  }

  async function mic() {
    if (!isListening) {
      setText("speak into your microphone...");
      let text = "";
      const recognizer = await createRecognizer();

      recognizer.startContinuousRecognitionAsync(
        () => {
          console.log("start listening");
          document.querySelector(".fa-microphone").className =
            "fas fa-microphone-slash";

          // toggle listening to true
          setListening(true);
        },
        (err) => {
          console.log(err);
        }
      );

      recognizer.recognizing = (s, e) => {
        setRecognizingText(e.result.text);
      };

      recognizer.recognized = (s, e) => {
        setRecognizingText("");
        if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
          text += e.result.text;
          setText(text);
        } else if (e.result.reason === speechsdk.ResultReason.NoMatch) {
          setText(text);
        }
      };

      recognizer.canceled = (s, e) => {
        if (e.reason === speechsdk.CancellationReason.Error) {
          console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
          console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
          console.log(
            "CANCELED: Did you set the speech resource key and region values?"
          );
        }
      };

      setStopRecognizing(() => () => {
        recognizer.stopContinuousRecognitionAsync();
        recognizer.close();
      });
    } else {
      stopRecognizing();
      setListening(false);
      document.querySelector(".fa-microphone-slash").className =
        "fas fa-microphone fa-lg mr-2";
      setStopRecognizing(() => noop);
    }
  }
  return (
    <Container className='app-container'>
      {!redirect ? (
        <>
          <h1 className='display-4 mb-3'>{noteTitle}</h1>
          <div className='row main-container'>
            <div className='col-6'>
              <i className='fas fa-microphone fa-lg mr-2' onClick={mic}></i>
              Convert speech to text from your mic.
            </div>
            <textarea rows='10' cols='50' value={text} onChange={handleText} />
            <Buffer text={recognizingText} />
          </div>
          <button className='btn btn-success saveNoteBtn' onClick={saveNote}>
            Save note
          </button>
          <div className='saveDropdownContainer'>
            <div className='dropdown'>
              <button
                className='btn btn-primary dropdown-toggle'
                type='button'
                id='dropdownLangButton'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                {language}
              </button>
              <ul
                className='dropdown-menu'
                aria-labelledby='dropdownLangButton'
              >
                {languages.map((lang) => (
                  <li key={lang}>
                    <a
                      onClick={(e) => handleLanguage(e.currentTarget.innerText)}
                      className='dropdown-lang'
                    >
                      {lang}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button className='btn btn-danger cancelSaveNoteBtn' onClick={cancel}>
            Cancel
          </button>
        </>
      ) : (
        <Navigate to='/' />
      )}
    </Container>
  );
}
