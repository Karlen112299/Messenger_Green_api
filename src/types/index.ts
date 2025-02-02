export interface AuthForm {
    idInstance: string;
    apiTokenInstance: string;
}

export interface GetStateInstanceResponse {
    stateInstance: string;
}

export interface SendMessageTypes<T> {
    data: T;
    chatId:string;
    message:string;
    quotedMessageId?:string;
    linkPreview?:string;
}

export interface SendMessageResponse {
    idMessage: string
}
export interface ReceiveNotificationResponse {
    receiptId: number,
    body: {
        typeWebhook: string,
        instanceData: {
            idInstance: number,
            wid: string,
            typeInstance: string
        },
        timestamp: number,
        idMessage: string,
        senderData: {
            chatId:string,
            sender: string,
            senderName:string,
            senderContactName: string
        },
        messageData:{
            typeMessage:string,
            textMessageData:{
                textMessage:string
            }
        }
    }
}

export interface Chat {
    id: number;
    name: string;
}

export interface MessageType {
    id: string;
    message: string;
    type: 'sent'|'received';
    chatId: string;
}