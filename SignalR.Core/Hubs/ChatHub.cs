using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalR.Core.Hubs
{
    /// <summary>
    /// 测试signalr 类
    /// ChatHub 类继承自 SignalR Hub 类。 Hub 类管理连接、组和消息。
    /// 可通过已连接客户端调用 SendMessage，以向所有客户端发送消息。
    /// </summary>
    public class ChatHub:Hub
    {
        /// <summary>
        /// 发送消息
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
