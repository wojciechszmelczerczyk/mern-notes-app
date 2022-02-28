import React, { Component } from "react";
import { Container } from "reactstrap";
import { getTokenOrRefresh } from "./tokenUtil";
import "./custom.css";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";

const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayText: "INITIALIZED: ready to test speech...",
    };
  }

  async componentDidMount() {
    // check for valid speech key/region
    const tokenRes = await getTokenOrRefresh();
    if (tokenRes.authToken === null) {
      this.setState({
        displayText: "FATAL_ERROR: " + tokenRes.error,
      });
    }
  }

  async sttFromMic() {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    );
    speechConfig.speechRecognitionLanguage = "pl-PL";

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );

    this.setState({
      displayText: "speak into your microphone...",
    });

    recognizer.startContinuousRecognitionAsync((result) => {
      let displayText = "";
      recognizer.recognized = (s, e) => {
        if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
          displayText += e.result.text;
          this.setState({ displayText: displayText });
        } else if (e.result.reason === speechsdk.ResultReason.NoMatch) {
          this.setState({
            displayText:
              "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.",
          });
        }
      };
    });
  }

  async stopFunc() {}

  render() {
    return (
      <Container className="app-container">
        <h1 className="display-4 mb-3">Speech sample app</h1>

        <div className="row main-container">
          <div className="col-6">
            <i
              className="fas fa-microphone fa-lg mr-2"
              onClick={() => this.sttFromMic()}
            ></i>
            Convert speech to text from your mic.
            <button onClick={() => this.stopFunc()}>Stop</button>
          </div>
          <div className="col-6 output-display rounded">
            <code style={{ color: "white" }}>{this.state.displayText}</code>
          </div>
        </div>
      </Container>
    );
  }
}
