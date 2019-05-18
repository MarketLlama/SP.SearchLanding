import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";

export interface ISearchLandingProps {
  context : WebPartContext;
  description: string;
  title : string;
  backgroundImageURL : string;
  defaultColor : string;
  textColor : string;
  displayMode : DisplayMode;
  fUpdateProperty: (value: string, prop :string) => void;
}
