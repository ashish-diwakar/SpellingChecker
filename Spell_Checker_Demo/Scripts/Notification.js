﻿
function notify(type, message) {
    (() => {
        let n = document.createElement("div");
        let id = Math.random().toString(36).substr(2, 10);
        n.setAttribute("id", id);
        n.classList.add("notification", type);
        n.classList.add("fade_out")
        n.innerText = message;
        document.getElementById("notification-area").appendChild(n);
        setTimeout(() => {
            var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
            for (let i = 0; i < notifications.length; i++) {
                if (notifications[i].getAttribute("id") == id) {
                    notifications[i].classList.remove("fade_out")
                    notifications[i].classList.add("do_after_goan");
                    setTimeout(() => {
                        var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
                        for (let i = 0; i < notifications.length; i++) {
                            if (notifications[i].getAttribute("id") == id) {
                                notifications[i].remove();

                                break;
                            }
                        }
                    }, 500);
                    break;
                }
            }
        }, 5000);
    })();
}

function RenderNotificationDiv() {
    $('body').append('<div id="notification-area"></div>');
}
function notifySuccess(msg) {
    notify("success", msg);
}
function notifyError(msg) {
    notify("error", msg);
}
function notifyInfo(msg) {
    notify("info", msg);
}

