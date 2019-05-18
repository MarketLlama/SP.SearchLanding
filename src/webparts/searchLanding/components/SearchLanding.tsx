import * as React from 'react';
import styles from './SearchLanding.module.scss';
import { ISearchLandingProps } from './ISearchLandingProps';
import { ISearchLandingState }  from './ISearchLandingState';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { DisplayMode } from '@microsoft/sp-core-library';

export default class SearchLanding extends React.Component<ISearchLandingProps, ISearchLandingState> {
  constructor(props :ISearchLandingProps ) {
    super(props);
    this.state = {
      searchString : ''
    };
  }

  public render(): React.ReactElement<ISearchLandingProps> {
    const pictureURL = encodeURI(this.props.backgroundImageURL);
    const slideStyle: React.CSSProperties = {};
    slideStyle.backgroundImage = `linear-gradient(${this.props.defaultColor}, ${this.props.defaultColor}), url("${pictureURL}")`;

    const textStyle: React.CSSProperties = {};
    textStyle.color = this.props.textColor;

    return (
      <div className={ styles.searchLanding }>
        <div className={ styles.container }>
          <div className={styles.backgroundImage} style={slideStyle}>
            <div className={styles.containerText} style={textStyle} >
              {
                this.props.displayMode === DisplayMode.Edit && (
                  <p className={styles.title} >
                    <textarea placeholder={this.props.title}
                    onChange={this._onChangeTitle}
                    defaultValue={this.props.title} />
                  </p>
                )
              }
              {
                this.props.displayMode !== DisplayMode.Edit && this.props.title &&
                <p className={styles.title} >{this.props.title}</p>
              }
              {
                this.props.displayMode === DisplayMode.Edit && (
                  <p className={styles.description} >
                    <textarea placeholder={this.props.title}
                    onChange={this._onChangeDescription}
                    defaultValue={this.props.title} />
                  </p>
                )
              }
              {
                this.props.displayMode !== DisplayMode.Edit && this.props.title &&
                <p className={styles.description}>{this.props.description}</p>
              }
            </div>
            <div className={styles.searchboxInput} >
              <Icon iconName="Search" className={styles.searchBoxIcon} />
              <input type="search"
                placeholder="Search.."
                onKeyDown={this._onEnter}
                onChange={event => {this.setState({searchString: event.target.value});}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _onChangeTitle = (event) =>{
    this.props.fUpdateProperty(event.target.value , 'title');
  }

  private _onChangeDescription = (event) =>{
    this.props.fUpdateProperty(event.target.value , 'description');
  }

  private _onEnter = (e) => {
    if (e.key === 'Enter') {
      const q = encodeURI(this.state.searchString);
      const url = `${this.props.context.pageContext.site.absoluteUrl}/_layouts/15/search.aspx/siteall?q=${q}`;
      window.location.href = url;
    }
  }
}
