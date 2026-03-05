window.APP_UTILS = {
    bindClickById: function (id, handler) {
        var element = document.getElementById(id);
        if (element) {
            element.onclick = handler;
        }
    },
    removeClassAfterDelay: function (selector, className, delayMs) {
        setTimeout(function () {
            document.querySelectorAll(selector).forEach(function (element) {
                element.classList.remove(className);
            });
        }, delayMs);
    }
};
