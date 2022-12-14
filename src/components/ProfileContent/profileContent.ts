import UserController from '../../controllers/UserController';
import Block from '../../utils/Block';
import { closeModal } from '../../utils/helpers';
import { formDataImg } from '../../utils/uploadImg';

interface ProfileContentProps {
  formData?: Record<string, unknown>;
  pageData: string;
  inputsData: string;
  actionsData: string;
  modalData?: string;
  isAvatarEdit?: boolean;
  formId: string;
  onSubmit?: () => void;
}

class ProfileContent extends Block {
  constructor({
    formData, pageData, inputsData, actionsData, modalData, isAvatarEdit = false, formId, onSubmit,
  }: ProfileContentProps) {
    super({
      formData,
      pageData,
      inputsData,
      actionsData,
      modalData,
      formId,
      isAvatarEdit,
      onSubmitImg: (e : Event) => this.onSubmitImg(e),
      events: {
        submit: onSubmit,
      },
    });
  }

  static componentName = 'ProfileContent';

  onSubmitImg(e : Event) {
    e.stopPropagation();
    // inputId = modalId + Form-input
    const inputId = 'profileAvatarForm-input';
    const data = formDataImg(e, inputId);
    if (data) {
      UserController.updateAvatar(data)
        .then(
          () => { closeModal(e, 'profileAvatar'); },
          // eslint-disable-next-line no-console
          (error) => { console.log(error); },
        );
    }
  }

  render() {
    const src = this.props.formData.avatar ? `https://ya-praktikum.tech/api/v2/resources/${this.props.formData.avatar}` : '//:0';

    /* html */
    return `
    <div class="profile-wrap">
      {{#if isAvatarEdit}}
        {{{Avatar modalId="profileAvatar" avatarPath=formData.avatar}}}        
      
        {{{Modal modalId="profileAvatar" onSubmit=onSubmitImg modalData=modalData userId=formData.id}}}
      {{else}}
        <div class="avatar-wrapper">
          <img class="profile-pic" src=${src} alt="Avatar"/>
        </div>
      {{/if}}
    
      <h1 class="title-center">{{formData.display_name}}</h1>

      <form id={{formId}} novalidate>
        <div class="profile-content">
          {{#each inputsData}}
            {{{InputInline inputsData=this formData=../formData isEdit=../pageData.isEdit}}}
          {{/each}}
        </div>
      
        <div class="profile-actions">
            {{#each actionsData}}
              <div class="actions-item">
                {{#if ../pageData.isEdit}}
                  {{{Button label=this.link-title}}}
                {{else}}
                  {{{Link label=this.link-title to=this.linkHref logoutLink=this.logoutLink className="action-link"}}}
                {{/if}}
              </div>
            {{/each}}
        </div>
      </form>
        
    </div>
    `;
  }
}

export default ProfileContent;
