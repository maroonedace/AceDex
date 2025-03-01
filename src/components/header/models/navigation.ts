import CocktailSvg from "../../../assets/svg/cocktail.svg";

export type CollectionLinkContent = {
  text: string;
  icon: string;
  url: string;
}

export const collectionLinks: CollectionLinkContent[] = [
  {
    text: "Cocktails",
    icon: CocktailSvg,
    url: "/cocktails",
  },
  {
    text: "Pokemon",
    icon: CocktailSvg,
    url: "/pokemon",
  },
];
