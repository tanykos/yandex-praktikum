import { ChatsAPI } from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';

class ChatsController {
  constructor(private api: ChatsAPI) {}

  async create(title: string) {
    await this.api.create(title);

    this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.read();

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

  async addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
    await this.fetchChats();
  }

  async deleteUserToChat(id: number, userId: number) {
    this.api.deleteUsers(id, [userId]);
    await this.fetchChats();
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.fetchChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }
}

const chatsController = new ChatsController(new ChatsAPI());

export default chatsController;
