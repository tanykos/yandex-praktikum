import Block from '../../utils/Block';
import chatsData from '../../data/chatsData.json';

class ListChatsPage extends Block {
  constructor() {
    super({
      onClick: () => console.log('Clicked'),
      chatDetails: chatsData.chatDetails,
      chatsData: chatsData.chatsList,
    });
  }

  render() {
    console.log('chatsData', chatsData);
    /* html */
    return `
    <main class="layout-col-2 layout-footer-stick">
      <div class="sidebar-chat">
        <header>
          <a href="./profile-page" class="icon-link item-left">
            Профиль
            <i class="fa-solid fa-chevron-right"></i>
          </a>

          <form class="form-group has-search">
            <span class="input-search-icon">
              <span class="fa fa-search"></span>
            </span>
            <input type="text" class="input-search" placeholder="Поиск">
          </form>
        </header>

        {{#each chatsData}}
          {{{ChatSection chatsData=this}}}
        {{/each}}
        
      </div>

      <div class="layout-wrap">
        <div class="scroll-wrap">
          <div class="scroll-hidden">
            <header>
              <div class="row-items-3">
                <span class="item-1">
                  <span class="chat-avatar"></span>
                </span>
                <span class="item-2 text-bold">ChatName</span>
                <span class="item-3">
                  <span class="chat-avatar"><i class="fa-solid fa-ellipsis-vertical"></i></span>
                </span>
              </div>
            </header>

            <div class="content-wrap">
              <div class="content-scroll">
                <section class="chat-detail">
                  <p class="chat-date title-center">25 ноября</p>
                  <div class="message">
                    <p class="message-text">Мы вынуждены отталкиваться от того, что реализация намеченных плановых заданий в значительной степени обусловливает важность кластеризации усилий. </p>
                    <p class="message-time">13:00</p>
                  </div>

                  <div class="message message-user">
                    <p class="message-text">Ok. </p>
                    <p class="message-time">13:15</p>
                  </div>
                </section>

                <section class="chat-detail">
                  <p class="chat-date title-center">27 ноября</p>
                  <div class="message">
                    <p class="message-text">Мы вынуждены отталкиваться от того, что реализация намеченных плановых заданий в значительной степени обусловливает важность кластеризации усилий. </p>
                    <p class="message-time">15:00</p>
                  </div>
                </section>
                
              </div>
            </div>
          
            <footer>
              <div class="row-items-3">
                <span class="item-1">
                  <button role="button" class="icon-btn">
                    <i class="fa-solid fa-paperclip"></i>
                  </button>
                </span>
                <span class="item-2">
                  <textarea class="chat-textarea" 
                    data-variant="filled" 
                    data-autosize="true" 
                    autocomplete="off" 
                    placeholder="Сообщение"  
                    style="height: 36px;"></textarea>
                </span>
                <span class="item-3">
                  <button class="chat-avatar icon-btn"><i class="fa-solid fa-circle-arrow-right icon-primary"></i></button>
                </span>
              </div>
            </footer>
          </div>
        </div>
      </div>
      
    </main>
    `;
  }
}

export default ListChatsPage;

// <div class="main-content">
//         <h4 class="text-gray">Выберите чат, чтобы отправить сообщение</h4>
//       </div>
