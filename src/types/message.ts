export type JoinEvent = {
  type: "join";
  username: string;
  userId: string;
};

export type ChatMessage = {
  type: "chat";
  message: string;
};

export type ClientEvent = ChatMessage | JoinEvent;

export type UserJoined = {
  type: "user_joined";
  username: string;
  id: string;
};

export type UserLeft = {
  type: "user_left";
  username: string;
  id: string;
};

export type Welcome = {
  type: "welcome";
  message: string;
  id: string;
};

export type ErrorEvent = {
  type: "error";
  message: string;
  id: string;
};

export type ServerChatMessage = {
  type: "chat";
  id: number;
  username: string;
  message: string;
};

export type MessageHistory = {
  type: "message_history";
  messages: ServerChatMessage[];
  id: string;
};

export type ServerEvent =
  | UserJoined
  | UserLeft
  | Welcome
  | ServerChatMessage
  | ErrorEvent
  | MessageHistory;
