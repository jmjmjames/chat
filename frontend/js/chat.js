const eventSource = new EventSource("http://localhost:8080/sender/jm/receiver/jongmin")

eventSource.onmessage = (event) => {
    console.log(1, event);
    const data = JSON.parse(event.data);
    console.log(2, data);
    initMessage(data);
}

function getSendMessageBox(messgae, time) {
    return `
    <div class="sent_msg">
      <p>${messgae}</p>
      <span class="time_date"> ${time}</span>
    </div>
    `;
}

function initMessage(data) {
    let chatBox = document.querySelector("#chat-box");
    let messageInput = document.querySelector("#chat-outgoing-msg");
    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";

    let time = data.sendAt.substring(11,16) + " | " + data.sendAt.substring(5, 7) + "월" + data.sendAt.substring(8, 10) + "일";
    chatOutgoingBox.innerHTML = getSendMessageBox(data.message, time);
    chatBox.append(chatOutgoingBox);
    messageInput.value = "";
}

function getKoDate() {
    const now = new Date();
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); 
    const koreaTimeDiff = 9 * 60 * 60 * 1000; 
    const koreaNow = new Date(utcNow + koreaTimeDiff);
    return koreaNow;
}

async function addMessage() {
    let messageInput = document.querySelector("#chat-outgoing-msg");
    
    if (messageInput.value.length != 0) {
        let chatBox = document.querySelector("#chat-box");
        let chatOutgoingBox = document.createElement("div");
        chatOutgoingBox.className = "outgoing_msg";

        let date = getKoDate();
        let now;
        if (date.getMonth() < 10) {
            now = date.getHours() + ":" + date.getMinutes() + " | 0" + (date.getMonth() + 1) + "월" + date.getDate() + "일";
        } else {
            now = date.getHours() + ":" + date.getMinutes() + " | " + (date.getMonth() + 1) + "월" + date.getDate() + "일";
        }

        let chat = {
            sender: "jm",
            receiver: "jongmin",
            message: messageInput.value
        };

        /**
         * let response = fetch(...): response에 null이 들어감 because of 비동기통신
         * 따라서 await를 걸어줘야한다 -> function 자체를 async 비동기 함수로 설정
         * async 를 걸지 않으면 아래의 코드가 실행되지 않는다.(block)
         */
        let response = await fetch("http://localhost:8080/chat", {
            method: "post",
            body: JSON.stringify(chat),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        console.log(response);
        
        // await를 걸지 않으면 pending(시간이 걸려서)
        let parseResponse = await response.json();
        console.log(parseResponse);

        chatOutgoingBox.innerHTML = getSendMessageBox(messageInput.value, now);
        chatBox.append(chatOutgoingBox);
        messageInput.value = "";
    }
}

document.querySelector("#chat-send").addEventListener("click", ()=> {
    addMessage();
});

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e)=> {
    if (e.keyCode === 13) {
        addMessage();
    }
});

