import React, { Component } from 'react';
import { connect } from 'react-redux';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { fetchProfile } from '../../reducers/profile';

const mapState = ({ profile }) => ({ profile });
const mapDispatch = { fetchProfile };

const ProviderProfile = (provider) => {
  return (
    Object.keys(provider).map(key => {
      return(
        key !== 'urls' ?
          <ListItem
            key={key}
            primaryText={key}
            secondaryText={provider[key]}
          />
          : 
          Object.keys(provider['urls'] || []).map(k => (
            <ListItem
              key={k}
              primaryText={k}
              secondaryText={provider['urls'][k]}
            />
          )
        )
      )
    })
  )
}

class Profile extends Component {

  state = {
    selectedProviderSlug: ''
  }

  componentWillMount() {
    this.props.fetchProfile();
  }

  showProfile = p => this.setState({ selectedProviderSlug: p })

  render() {
    const { profile } = this.props
    const { selectedProviderSlug } = this.state
    const { providers, email } = profile
    const selectedProvider = providers[selectedProviderSlug] || {}
    return (
      <GridList cols={12} cellHeight='auto'>
        <GridTile cols={3}>
          <List>
            <Subheader>Accounts</Subheader>
            {
              Object
                .keys(providers)
                .map(p => (
                  <ListItem
                    key={p}
                    primaryText={p}
                    onClick={() => this.showProfile(p)}
                  />
                )
              )
            }
          </List>
        </GridTile>  
        <GridTile cols={9}>
          <List>
            { selectedProviderSlug && (
                <div>
                  <ListItem
                    primaryText='Provider'
                    secondaryText={selectedProviderSlug}
                  />
                  <ListItem
                    primaryText='Email'
                    secondaryText={email}
                  />
                </div>  
              )
            }
            
            {
              ProviderProfile(selectedProvider)
            }
          </List>
        </GridTile>
      </GridList>  
    );
  }
}

export default connect(mapState, mapDispatch)(Profile);
