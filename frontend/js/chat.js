const username = prompt("아이디를 입력해주세요.");
const roomId = prompt("채팅방 번호를 입력해주세요.");
document.querySelector("#username").innerHTML = username;


const eventSource = new EventSource(`http://localhost:8080/room/${roomId}/chat`)
eventSource.onmessage = (event) => {    
    const data = JSON.parse(event.data);
    if (data.sender === username) {
        initMyMessage(data);
    } else {
        initOtherMessage(data);
    }
}


function getSendMessageBox(data) {
    return `
    <div class="sent_msg">
      <p>${data.message}</p>
      <span class="time_date">${data.sendAt} / ${data.sender}</span>
    </div>
    `;
}

function getReceiveMessageBox(data) {
    return `
    <div class="received_withd_msg">
      <p>${data.message}</p>
      <span class="time_date">${data.sendAt} / ${data.sender}</span>
    </div>
    `;
}


function initMyMessage(data) {
    let chatBox = document.querySelector("#chat-box");

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";

    data.sendAt = data.sendAt.substring(11,16) + " | " + data.sendAt.substring(5, 7) + "월" + data.sendAt.substring(8, 10) + "일";
    chatOutgoingBox.innerHTML = getSendMessageBox(data);
    chatBox.append(chatOutgoingBox);

    document.documentElement.scrollTop = document.body.scrollHeight;
}

function initOtherMessage(data) {
    let chatBox = document.querySelector("#chat-box");

    let chatIncomingBox = document.createElement("div");
    chatIncomingBox.className = "received_msg";

    data.sendAt = data.sendAt.substring(11,16) + " | " + data.sendAt.substring(5, 7) + "월" + data.sendAt.substring(8, 10) + "일";
    chatIncomingBox.innerHTML = getReceiveMessageBox(data);
    chatBox.append(chatIncomingBox);

    document.documentElement.scrollTop = document.body.scrollHeight;
}

async function addMessage() {
    let messageInput = document.querySelector("#chat-outgoing-msg");
    
    if (messageInput.value.length != 0) {
        let chat = {
            sender: username,
            roomId: roomId,
            message: messageInput.value
        };

        fetch("http://localhost:8080/chat", {
            method: "post",
            body: JSON.stringify(chat), 
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        messageInput.value = "";
    }
}

/**
 * button 클릭시 메시지 전송
 */
document.querySelector("#chat-send").addEventListener("click", ()=> {
    addMessage();
});

/**
 * Enter 입력시 메시지 전송
 */
document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e)=> {
    if (e.keyCode === 13) {
        addMessage();
    }
});
