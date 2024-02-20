import ChatBox from '../Component/ChatBox'
import UserBox from '../Component/UserBox'
import '../styled/Chat.css'

const Chat = () => {
  return (
    <div className='chat_section'>
        <UserBox />
        <ChatBox />
    </div>
  )
}

export default Chat