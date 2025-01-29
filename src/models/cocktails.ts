import PinaColada from "../assets/pictures/pinaColada.jpg";
import Mojito from "../assets/pictures/mojito.png";
import StrawberryMargarita from "../assets/pictures/strawberryMargarita.jpg";
import DirtyShirley from "../assets/pictures/dirtyShirley.jpg";
import { Recipe } from "./recipe";

export const cocktailRecipes: Recipe[] = [
    {
        id: 1,
        name: "Pina Colada",
        image: PinaColada,
        ingredients: [
            "2 oz Bacardi Superior White Rum",
            "1 oz Coco Lopez Creme De Coconut",
            "1 oz heavy cream",
            "6 oz Pineapple Juice",
            "1 cup Ice"
        ],
        instructions: "Blend all ingredients with ice until smooth. Pour into chilled glass, garnish with pineapple slice and cherry."
    },
    {
        id: 2,
        name: "Mojito",
        image: Mojito,
        ingredients: [
            "6-8 mint leaves",
            "2 oz Bacardi Superior White Rum",
            "1 oz Master Of Mixes Simple Syrup",
            "1 oz Finest Call Single Pressed Lime Juice",
            "6 oz Schweppes Club Soda",
            "1 cup Ice"
        ],
        instructions: "Blend all ingredients with ice until smooth. Pour into chilled glass, garnish with pineapple slice and cherry."
    },
    {
        id: 3,
        name: "Strawberry Margarita",
        image: StrawberryMargarita,
        ingredients: [
            "5 strawberries",
            "2 oz Finest Call Single Pressed Lime Juice",
            "1 oz Master Of Mixes Simple Syrup",
            "1 oz Kavlana Triple Sec",
            "2 oz 1800 Silver Tequila",
            "1 cup Ice"
        ],
        instructions: "Blend all ingredients with ice until smooth. Pour into chilled glass, garnish with pineapple slice and cherry."
    },
    {
        id: 4,
        name: "Dirty Shirley",
        image: DirtyShirley,
        ingredients: [
            "2 oz Ketel One Vodka",
            "2 oz Schweppes Club Soda",
            "1 oz Grenadine Syrup",
            "1 cup Ice"
        ],
        instructions: "Blend all ingredients with ice until smooth. Pour into chilled glass, garnish with pineapple slice and cherry."
    }
]