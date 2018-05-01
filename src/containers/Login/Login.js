import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import { Github, Google, Facebook, Instagram, LinkedIn, Twitter } from '../../components/Icons'
import './Login.css'
import { requestLogin } from '../../reducers/session'
import {
  API_BASE_URL,
  GOOGLE_AUTH_PATH,
  FACEBOOK_AUTH_PATH,
  LINKEDIN_AUTH_PATH,
  GITHUB_AUTH_PATH,
  INSTAGRAM_AUTH_PATH,
  TWITTER_AUTH_PATH
} from '../../constants'

const providers = {
  'Github': { Icon: Github, color: '#333333', authPath: GITHUB_AUTH_PATH },
  'Google': { Icon: Google, color: '#CF4332', authPath: GOOGLE_AUTH_PATH },
  'Facebook': { Icon: Facebook, color: '#3B5999', authPath: FACEBOOK_AUTH_PATH },
  'Instagram': { Icon: Instagram, color: '#CF4332', authPath: INSTAGRAM_AUTH_PATH },
  'LinkedIn': { Icon: LinkedIn, color: '#1A82B9', authPath: LINKEDIN_AUTH_PATH },
  'Twitter': { Icon: Twitter, color: '#5AA4EB', authPath: TWITTER_AUTH_PATH }
}

class Login extends Component {

  constructor(props) {
    super()
    this.state = {
      provider: providers[props.provider]
    }
  }
  onClick() {
    const { provider } = this.state
    const { authPath } = provider
    this.props.dispatch(requestLogin())
    window.location.href = `${API_BASE_URL}${authPath}`
  }

  render() {
    const { provider } = this.state
    const { Icon, color } = provider

    return(
      <RaisedButton
        onClick={() => this.onClick()}
        icon={<Icon />}
        label={` Sign in with ${this.props.provider}`}
        backgroundColor={color}
        labelColor='#FFF'
        fullWidth={true}
        style={{ marginBottom: '10px' }}
      />
    )
  }
}

Login.propTypes = {
  provider: PropTypes.string.isRequired
}

export default connect()(Login)