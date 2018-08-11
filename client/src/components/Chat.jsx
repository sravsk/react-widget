import React from 'react';
import { Icon} from 'antd';

class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			renderChat : props.renderChat
		}
	}

	openChatService = () => {
		this.setState({
			renderChat : 'knowhow-chat-wrapper-show'
		})
	}

	render(){
		return(
			<div>
				<div className="knowhow-chat-box">
					<span className="knowhow-chat-title">Start a conversation</span><br/>
					<div className="knowhow-chat-newConversation" onClick={this.openChatService}>
					<Icon 
	          type="wechat" 
	          style={{ fontSize: 22}} 
	          className="dock-button"/>
					<span>New Conversation</span>
	      	</div>
				</div>
				<div className={this.state.renderChat}></div>
			</div>
			)
	}
}


export default Chat;