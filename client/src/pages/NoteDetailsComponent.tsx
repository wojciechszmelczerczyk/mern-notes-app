/* eslint-disable jsx-a11y/anchor-is-valid */
import "../css/custom.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import NoteService from "../services/noteService";
import download from "js-file-download";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
import { Container } from "reactstrap";
import { getTokenOrRefresh } from "../utils/tokenUtil";
import Buffer from "../components/Buffer";
import { languages } from "../data/languages";
import WaveSurfer from "wavesurfer.js";
import MicrophonePlugin from "wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js";

export default function NoteDetailsComponent() {
  const [isLoggedIn] = useContext(AuthContext);
  let [text, setText] = useState("Listening on changes...");
  const textStateRef = useRef();
  textStateRef.current = text as any;
  const [recognizingText, setRecognizingText] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [isListening, setListening] = useState(false);
  const [stopRecognizing, setStopRecognizing] = useState(() => noop);
  const [language, setLanguage] = useState("en-US");
  let textarea = document.querySelector("textarea");
  const xxx = document.querySelector(".titleVisualizerContainer");

  let { id } = useParams();
  let navigate = useNavigate();
  let at = localStorage.getItem("at");

  let placeholder = `Tipsℹ️

  1. Toggle on/off voice recognition by clicking microphone icon.
  
  2. Change recognizing language by clicking blue button.

  3. Save note by clicking green button.

  4. Download note with format pdf/txt by clicking yellow button.
  `;

  function noop() {}

  // get current note title

  useEffect(() => {
    // check global state of app if auth if not redirect to login
    if (!isLoggedIn) navigate("/login");

    localStorage.setItem("note_id", id);

    let noteId = localStorage.getItem("note_id");

    getTokenOrRefresh().then((res) => {
      if (res.authToken === null) {
        setText(`FATAL_ERROR: ${res.error}`);
      }
    });

    NoteService.getSingleNote(at, noteId).then((res) => {
      setNoteTitle(res["data"]["title"]);

      setText(res["data"]["content"]);
    });
  }, []);

  function handleLanguage(lang) {
    setLanguage(lang);
  }

  async function createRecognizer() {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    );
    speechConfig.speechRecognitionLanguage = language;
    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();

    const recognizer = new speechsdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );
    return recognizer;
  }

  function createVisualizer() {
    const visualizerContainer = document.createElement("div");

    visualizerContainer.id = "waveform";

    xxx.appendChild(visualizerContainer);

    return WaveSurfer.create({
      container: "#waveform",
      waveColor: "red",
      barWidth: 2,
      barRadius: 3,
      barGap: 3,
      cursorWidth: 0,
      interact: false,
      plugins: [MicrophonePlugin.create()],
    });
  }

  async function saveNote() {
    const noteId = localStorage.getItem("note_id");
    const savedNote = await NoteService.saveNote(at, text, noteId);
    if (savedNote) {
      setRedirect(true);
    }
  }

  function handleText(e) {
    setText(e.value);
  }

  function caretPositionSave() {
    window.localStorage.setItem(
      "caretPosition",
      textarea.selectionStart.toString()
    );
  }

  function caretPositionLoad() {
    if (localStorage.getItem("caretPosition")) {
      textarea.selectionStart = parseInt(localStorage.getItem("caretPosition"));
      textarea.selectionEnd = parseInt(localStorage.getItem("caretPosition"));
    }
  }

  async function mic() {
    if (!isListening) {
      const recognizer = await createRecognizer();
      const waveVisualizer = createVisualizer();

      recognizer.startContinuousRecognitionAsync(
        () => {
          console.log("start listening");
          document.querySelector(".fa-microphone").className =
            "fas fa-microphone-slash";

          // toggle listening to true
          setListening(true);

          waveVisualizer.microphone.start();
        },
        (err) => {
          console.log(err);
        }
      );

      recognizer.recognizing = (s, e) => {
        caretPositionSave();
        setRecognizingText(e.result.text);
      };

      recognizer.recognized = (s, e) => {
        setRecognizingText("");

        if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
          textStateRef.current += (e.result.text + " ") as any;
          setText(textStateRef.current);
          caretPositionLoad();
        } else if (e.result.reason === speechsdk.ResultReason.NoMatch) {
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
        waveVisualizer.microphone.stopDevice();
        document.getElementById("waveform").remove();
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

  async function downloadNote(format) {
    const res = await NoteService.downloadNote(at, id, format);
    if (res.headers["content-type"] === "application/pdf") {
      download(res.data, "note.pdf");
    } else {
      download(res.data, "note.txt");
    }
    navigate("/");
  }

  return (
    <>
      <Container className='app-container'>
        {!redirect ? (
          <>
            <div className='titleVisualizerContainer'>
              <h1 className='saveNoteTitle display-4 mb-3'>{noteTitle}</h1>
            </div>
            <div className='row main-container'>
              <div className='col-6'>
                <i className='fas fa-microphone fa-lg mr-2' onClick={mic}></i>
                Convert speech to text from your mic.
              </div>
              <textarea
                placeholder={placeholder}
                rows={10}
                cols={50}
                value={text}
                onChange={(e) => handleText(e.target)}
              />
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
                        onClick={(e) =>
                          handleLanguage(e.currentTarget.innerText)
                        }
                        className='dropdown-lang'
                      >
                        {lang}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className='btn btn-danger cancelSaveNoteBtn'
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <div className='downloadButtonContainer dropdown'>
              <button
                className='btn btn-warning dropdown-toggle'
                type='button'
                id='dropdownMenuButton'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Download
              </button>
              <ul
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton'
              >
                <li>
                  <a
                    className='dropdown-item'
                    onClick={(e) => downloadNote(e.currentTarget.innerText)}
                  >
                    pdf
                  </a>
                </li>
                <li>
                  <a
                    className='dropdown-item'
                    onClick={(e) => downloadNote(e.currentTarget.innerText)}
                  >
                    txt
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Navigate to='/' />
        )}
      </Container>
    </>
  );
}
