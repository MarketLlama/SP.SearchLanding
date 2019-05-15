import * as React from 'react';
import styles from './SearchLanding.module.scss';
import { ISearchLandingProps } from './ISearchLandingProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SearchLanding extends React.Component<ISearchLandingProps, {}> {
  public render(): React.ReactElement<ISearchLandingProps> {
    return (
      <div className={ styles.searchLanding }>
        <div className={ styles.container }>

        </div>
      </div>
    );
  }
}
