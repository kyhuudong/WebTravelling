import React,{Component} from 'react';
// get our fontawesome imports
import { faCommentDots, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/chatbot.css'
import bot from './Component-image/chatbot.png';
class ChatBot extends Component{
    constructor(props){
        super(props);
        this.state = {
            tours: [],
            name:'',
            userMessage: '',
            conversation: [],
        };
    }
    componentDidMount() {
        fetch('http://localhost:3001/tours')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded : true,
                        tours : result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded : true,
                        error
                    });
                }
            )
    }
    handleChange = event => {
        this.setState({ userMessage: event.target.value });
    }
    sendError(){
        const msg = {
            text: "Xin lỗi, hiện tại chatbot đang gặp sự cố. Vui lòng liên hệ với chúng tôi để được hỗ trợ.",
            user: 'ai',
        };
        this.setState({
            conversation: [...this.state.conversation, msg],
        });
    }
    handleVoice = event => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'vi-VN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.start();
        const buttonVoice = document.getElementById("voice");
        recognition.addEventListener('speechstart', () => {
            buttonVoice.classList.add("speak");
            console.log('Speech has been detected.');
        });
        var check = false;
        recognition.addEventListener('result', (e) => {
            console.log('Result has been detected.');
            let last = e.results.length - 1;
            let text = e.results[last][0].transcript;
            this.setState({ userMessage: text });
            document.getElementById("send-btn").click();
            buttonVoice.classList.remove("speak");
        });

        setTimeout(()=>{
            buttonVoice.classList.remove("speak");
        }, 4000);

    }

    handleSubmit = event => {
        event.preventDefault();
        
        if (!this.state.userMessage.trim()) return;
        const msg = {
          text: this.state.userMessage,
          user: 'human',
        };

        this.setState({
            conversation: [...this.state.conversation, msg],
        });

        fetch('http://localhost:5000/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: this.state.userMessage,
          }),
        })
        .then(response => response.text())
        .then(result => {
            if(result === 'tours') {
                const msg = {
                    text: 'You can review some tour of SBoTour such as:',
                    user: 'ai',
                };
                this.setState({
                    conversation: [...this.state.conversation, msg],
                });
                this.state.tours.map(tour => {
                    var tour_summaries = "Tour code: " + tour.tour_id + "\nTour name: " + tour.tour_name
                        + ".\n Price: " + tour.tour_cost + "USD";
                    const msg = {
                        text: tour_summaries,
                        user: 'ai',
                    };
                    this.setState({
                        conversation: [...this.state.conversation, msg],
                    });              
                });
                return;
            }
            const msg = {
                text: result,
                user: 'ai',
            };
            this.setState({
                conversation: [...this.state.conversation, msg],
            });
            if(document.getElementById("speech").checked == true){
                this.synthVoice(result)
            }
        })
        .catch(error => {
            console.log('error', error);
            this.sendError();
        });
        this.setState({ userMessage: '' });
    };
    updateScroll(){
        try {
            var element = document.getElementById("message");
            element.scrollTop = element.scrollHeight;
        } catch (e) {
        
        }
    }
    openChatbot(){
        var box = document.getElementById("chatbot");
        if (box.classList.contains('hidden')) {
            box.classList.remove('hidden');
            setTimeout(function () {
              box.classList.remove('visuallyhidden');
            }, 20);
          } else {
            box.classList.add('visuallyhidden');    
            box.addEventListener('transitionend', function(e) {
              box.classList.add('hidden');
            }, {
              capture: false,
              once: true,
              passive: false
            });
          }
    }
    synthVoice(text) {
        try {
            window.speechSynthesis.cancel();
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            utterance.voice = voices[3];
            
            utterance.text = text.split("  ")[0];
            synth.speak(utterance);
        } catch (e) {
            console.log(e);
        }
    }

    changeSpeech() {
        try {
            window.speechSynthesis.cancel();
        } catch (e) {
            console.log(e);
        }
    }

    formatDate() {
        const date = new Date();
        const h = "0" + date.getHours();
        const m = "0" + date.getMinutes();
      
        return `${h.slice(-2)}:${m.slice(-2)}`;
    }

    render(){
        const ChatBubble = (text, i, className) => {
            setTimeout(() => {
                this.updateScroll();
            }, 0);
            if(className==='ai') {
                return (
                    <div key={`${className}-${i}`} className={`chat-bubble`}>
                        <div className="msg left-msg">
                          <div
                              className="msg-img ai"
                          ></div>
                          <div className="msg-bubble">
                              <div className="msg-info">
                                  <div className="msg-info-name">Bot</div>
                                  <div className="msg-info-time">{this.formatDate()}</div>
                              </div>
                              <div className="msg-text">
                                  {text}
                              </div>
                          </div>
                      </div>
                    </div>
                  );
            } else {
                return (
                    <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
                        <div className="msg right-msg">
                          <div
                              className="msg-img human-bg"
                          ></div>
                          <div className="msg-bubble">
                              <div className="msg-info">
                                <div className="msg-info-name">You</div>
                                  <div className="msg-info-time">{this.formatDate()}</div>
                              </div>
      
                              <div className="msg-text">
                                  {text}
                              </div>
                          </div>
                      </div>
                    </div>
                  );
            }
        };
  
        const chat = this.state.conversation.map((e, index) =>
        ChatBubble(e.text, index, e.user));
        return(
            <div className="container">
                <div id="container">
                    <div className="chat-window box hidden" id="chatbot">
                        <div className="bot-header">
                            <div className="icon"><img src={bot} className="bot"></img></div>
                            <h1 className="title-bot">Chatbot</h1>
                            <label className="switch">
                                <input type="checkbox" id="speech" onChange={()=>this.changeSpeech()}/>
                                <span className="slider round"></span>
                            </label>
                            <div className="label-speech">
                                <label>Speech</label>
                            </div>
                        </div>
                        <div className="conversation-view" id="message">{chat}</div>
                        <div className="message-box">
                            
                            <form className="form-input" onSubmit={this.handleSubmit}>
                                <div className="icon-voice">
                                    <button id="voice" className="speak-icon">
                                        <FontAwesomeIcon icon={faMicrophone} onClick={this.handleVoice}/>
                                    </button>
                                </div>
                                <input
                                    value={this.state.userMessage}
                                    onInput={this.handleChange}
                                    className="text-input"
                                    type="text"
                                    autoFocus
                                    placeholder="Type your message"
                                />
                                
                                <button id="send-btn" className="button-send" value={this.state.userMessage}
                                    onInput={this.handleChange}>Send</button>
                                
                            </form>
                        </div>
                    </div>
                    <div className="messenge" onClick={this.openChatbot}>
                        <FontAwesomeIcon icon={faCommentDots} className="icon-mess" />
                    </div>
                </div>
            </div>
        );
    }
}
export default ChatBot;