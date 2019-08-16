"use strict";
//创建并启动连接。
//向“提交”按钮添加一个用于向中心发送消息的处理程序。
//向连接对象添加一个用于从中心接收消息并将其添加到列表的处理程序。
var baseUrl = "http://localhost:5002";
//$.connection.hub.url = baseUrl + "/chatHub";
//var connection = $.connection(baseUrl + "/chatHub");
var connection =new signalR.HubConnectionBuilder().withUrl( "/chatHub").build();
//var connection = new signalR.HubConnection(new signalR.HttpConnection(baseUrl + "/chatHub"));
//$.connection.hub.url = baseUrl + "/chatHub";
//var connection = $.connection.hub;
//var chat = $.connection.hub;
//chat.url = "http://localhost:5000/chatHub";
//var connection = $.connection.hub.url = 'http://localhost:9370/signalr';
//var connection=$.hubConnection(baseUrl + "/chatHub");
//var connection = $.hubConnection(baseUrl + "/chatHub");

//var connection = $.hubConnection(baseUrl + "/chatHub");
//var hubProxy = connection.createHubProxy('signalr');
document.getElementById('sendButton').disabled = true;
console.log(connection);
connection.on('ReceiveMessage', function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodeMsg = user + " says " + msg;
    var li = document.createElement('li');
    li.textContent = encodeMsg;
    document.getElementById('messagesList').appendChild(li);
});


connection.start().then(function () {
    console.log('completed');
    document.getElementById('sendButton').disabled = false;
}).catch(function (err) {
    console.log('error');
    return console.error(err.toString());
});

document.getElementById('sendButton').addEventListener('click', function (event) {
    var user = document.getElementById('userInput').value;
    var message = document.getElementById('messageInput').value;

    connection.invoke('sendMessage', user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

