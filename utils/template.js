const customTemplate = (attachments) => {
    console.log(attachments[0].content.buttons);
    const buttons = buttonsValue(attachments[0].content.buttons);
    return {
        type: "template",
        payload: {
            template_type: "button",
            text: attachments[0].content.text,
            buttons: buttons,
        }
    }
}

module.exports = {customTemplate};

const buttonsValue = (buttons) => {
    let buttonValue = [];
    for (let i = 0; i < buttons.length; i ++) {
        switch (buttons[i].type){
            case "openUrl":
                buttonValue.push({
                    "type": "web_url",
                    "url": buttons[i].value,
                    "title": buttons[i].title,
                });
                break;
            case "postBack":
                buttonValue.push({
                    "type": "postback",
                    "payload":buttons[i].value,
                    "title": buttons[i].title,
                });
                break;
            default:
                break;
        }
        
    }
    return buttonValue;
}