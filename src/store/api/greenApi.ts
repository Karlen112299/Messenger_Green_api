import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AuthForm, SendMessageResponse, SendMessageTypes, GetStateInstanceResponse, ReceiveNotificationResponse } from "../../types";

const baseQuery: BaseQueryFn = ( ...baseQueryArgs ) => {
  return fetchBaseQuery({
      baseUrl:'https://7105.api.greenapi.com',
      prepareHeaders: async (headers) => {
        headers.set('Content-Type','application/json')
      },
  })(...baseQueryArgs)
}

export const greenApi = createApi({
    reducerPath: "greenApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
      getStateInstance: builder.query<GetStateInstanceResponse, AuthForm>({
        query: (data) => ({
          url: `/waInstance${data.idInstance}/getStateInstance/${data.apiTokenInstance}`,
        }),
      }),
      sendMessage: builder.mutation<SendMessageResponse, SendMessageTypes<AuthForm>>({
        query:(params) => ({
          url:`/waInstance${params.data.idInstance}/sendMessage/${params.data.apiTokenInstance}`,
          method: "POST",
          body:{
            chatId: params.chatId,
            message: params.message
          }
        })
      }),
      getMessage: builder.query<ReceiveNotificationResponse, AuthForm>({
        query:(data) => ({
          url:`/waInstance${data.idInstance}/receiveNotification/${data.apiTokenInstance}`,
        })
      }),
    }),
  });
  
  export const { useLazyGetStateInstanceQuery, useSendMessageMutation, useLazyGetMessageQuery } = greenApi;