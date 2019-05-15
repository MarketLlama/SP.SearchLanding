import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'SearchLandingWebPartStrings';
import SearchLanding from './components/SearchLanding';
import { ISearchLandingProps } from './components/ISearchLandingProps';

export interface ISearchLandingWebPartProps {
  description: string;
}
//https://github.com/SharePoint/sp-dev-fx-webparts/tree/dev/samples/react-comparer
export default class SearchLandingWebPart extends BaseClientSideWebPart<ISearchLandingWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISearchLandingProps > = React.createElement(
      SearchLanding,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
