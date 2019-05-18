import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';

import * as strings from 'SearchLandingWebPartStrings';
import SearchLanding from './components/SearchLanding';
import { ISearchLandingProps } from './components/ISearchLandingProps';

export interface ISearchLandingWebPartProps {
  description: string;
  title : string;
  backgroundImageURL : string;
  defaultColor : string;
  textColor : string;
}
//https://github.com/SharePoint/sp-dev-fx-webparts/tree/dev/samples/react-comparer
export default class SearchLandingWebPart extends BaseClientSideWebPart<ISearchLandingWebPartProps> {

  private propertyFieldColor;
  private propertyFieldColorStyle;

  public render(): void {
    const element: React.ReactElement<ISearchLandingProps > = React.createElement(
      SearchLanding,
      {
        context : this.context,
        description: this.properties.description,
        title : this.properties.title,
        backgroundImageURL : this.properties.backgroundImageURL,
        defaultColor : this.properties.defaultColor,
        textColor : this.properties.textColor,
        displayMode : this.displayMode,
        fUpdateProperty: (value: string , prop : string) => {
          this.properties[prop] = value;
        },
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

  protected async loadPropertyPaneResources(): Promise<void> {
    // import additional controls/components
    const { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } = await import (
      /* webpackChunkName: 'pnp-propcontrols-number' */
      '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker'
    );

    this.propertyFieldColor = PropertyFieldColorPicker;
    this.propertyFieldColorStyle = PropertyFieldColorPickerStyle;
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
                this.propertyFieldColor(
                  'defaultColor', {
                    label: 'Default Color',
                    selectedColor: this.properties.defaultColor,
                    properties: this.properties,
                    disabled: false,
                    isHidden: false,
                    alphaSliderHidden: false,
                    style: this.propertyFieldColorStyle.Full,
                    iconName: 'Precipitation',
                    key: 'colorFieldId',
                    onPropertyChange: this.onPropertyPaneFieldChanged
                }),
                PropertyPaneDropdown('textColor',{
                  label : 'Text Color',
                  selectedKey : '#FFF',
                  options:[{
                    key: "#FFF",
                    text: "White"
                  },
                  {
                    key: "#000",
                    text: "Black"
                  },
                  {
                    key: '#3F3F3F',
                    text : 'Grey'
                  }]
                }),PropertyPaneTextField('backgroundImageURL',{
                  label : 'Background Image URL'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
