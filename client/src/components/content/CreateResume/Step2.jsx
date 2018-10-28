/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';

import PropTypes from 'prop-types';
import { Icon, Input, Modal } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('fetch', 'create')
@observer
class Step2 extends React.Component {
  static propTypes = {
    fetch: PropTypes.shape({
      github: PropTypes.shape({
        avatar_url: PropTypes.string,
        bio: PropTypes.string,
        blog: PropTypes.string,
        company: PropTypes.string,
        created_at: PropTypes.string,
        email: PropTypes.string,
        events_url: PropTypes.string,
        followers: PropTypes.number,
        following: PropTypes.number,
        followers_url: PropTypes.string,
        following_url: PropTypes.string,
        gists_url: PropTypes.string,
        location: PropTypes.string,
        login: PropTypes.string,
        name: PropTypes.string,
        public_gists: PropTypes.number,
        public_repos: PropTypes.number,
        repos_url: PropTypes.string,
        starred_url: PropTypes.string,
        subscriptions_url: PropTypes.string,
        updated_at: PropTypes.string,
        gravatar_id: PropTypes.string,
        hireable: PropTypes.bool,
        html_url: PropTypes.string,
      }),
      medium: PropTypes.shape({}),
      fetchGithub: PropTypes.func,
      fetchMedium: PropTypes.func,
      loading: PropTypes.bool,
    }).isRequired,
    form: PropTypes.shape({
      setFieldsValue: PropTypes.func,
      getFieldValue: PropTypes.func,
      getFieldsValue: PropTypes.func,
      getFieldDecorator: PropTypes.func,
    }).isRequired,
    create: PropTypes.shape({
      setGithub: PropTypes.func,
      setMedium: PropTypes.func,
    }).isRequired,
  };

  state = {
    modal: false,
    current: '',
  };

  showModal = (service) => {
    this.setState({
      modal: true,
      current: service || '',
    });
  };

  hideModal = () => {
    this.setState({
      modal: false,
      current: '',
    });
  };

  handleOk = () => {
    console.log(this.props.form.getFieldsValue());
    if (this.state.current === 'github') {
      this.props.form.setFieldsValue('github', this.props.fetch.github);
      this.props.create.setGithub(this.props.fetch.github);
    }
    if (this.state.current === 'medium') {
      this.props.form.setFieldsValue('medium', this.props.fetch.medium);
      this.props.create.setMedium(this.props.fetch.medium);
    }
    console.log(this.props.form.getFieldsValue());
    this.hideModal();
  };

  handleCancel = () => {
    this.hideModal();
  };

  handleEnter = () => {
    if (this.state.current === 'github') {
      this.props.fetch.fetchGithub(this.props.form.getFieldValue('github'));
    } else if (this.state.current === 'medium') {
      this.props.fetch.fetchMedium(this.props.form.getFieldValue('github'));
    }
  };

  render() {
    const { fetch } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { current, modal } = this.state;
    return (
      <div className="block connect-social-block">
        <h2>Социальные профили</h2>
        <div className="connect-social-container">
          <div
            className="connect-social gh"
            onClick={() => this.showModal('github')}
          >
            <Icon type="github" />
          </div>
          <div
            className="connect-social md"
            onClick={() => this.showModal('medium')}
          >
            <Icon type="medium" />
          </div>
        </div>
        <Modal
          title={`Введите ваш юзернейм на ${current}`}
          visible={modal}
          onOk={() => this.handleOk()}
          onCancel={() => this.handleCancel()}
          confirmLoading={fetch.loading}
          cancelText="Закрыть"
        >
          <div className="preview-account">
            {!(fetch.status >= 200 && fetch.status < 300) && (
              <p>Нет такого пользователя</p>
            )}
            {current === 'github' &&
              fetch.github &&
              !fetch.loading &&
              fetch.status === 200 && (
                <React.Fragment>
                  <h3 className="preview-account-title">Это вы?</h3>
                  <div className="preview-account-photo">
                    <img src={fetch.github.avatar_url} alt="" />
                    <div className="preview-account-name">
                      {fetch.github.name}
                      <br />
                      <div className="preview-account-desc">
                        {fetch.github.bio}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            {current === 'medium' &&
              fetch.medium &&
              !fetch.loading &&
              fetch.status === 200 && <div>Privet medium</div>}
            {current &&
              getFieldDecorator(current)(<Input
                disabled={fetch.loading}
                onPressEnter={this.handleEnter}
              />)}
          </div>
        </Modal>
      </div>
    );
  }
}

export default Step2;
