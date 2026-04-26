import CheesyFries from '../assets/images/chessyfries.jpg';
import FrenchFries from '../assets/images/frenchfries.jpg';
import Samosa from '../assets/images/samosa.jpg';
import Lemonade from '../assets/images/lemonade.jpg';
import ChocoMilk from '../assets/images/choco.jpg';

export function getFoodItems(month) {
    const baseItems = [
        {
            key: "samosa",
            name: "Samosa",
            img: Samosa,
            desc: "Crispy and flavorful samosas filled with spiced potatoes, wrapped in a golden, flaky crust. A perfect snack."
        },
        {
            key: "cheesyFries",
            name: "Cheesy Fries",
            img: CheesyFries,
            desc: "Our cheesy and crispy fries loaded with rich, melted cheese and creamy mayo. A perfect blend of crunch and cheesy goodness."
        },
        {
            key: "fries",
            name: "French Fries",
            img: FrenchFries,
            desc: "Crispy and golden, our French fries are perfectly seasoned and fried to perfection. Light, crunchy and quick snack."
        }
    ];

    const seasonalItem =
        (month <= 10 && month > 2)
            ? {
                key: "lemonade",
                name: "Lemonade",
                img: Lemonade,
                desc: "Refreshingly sweet and tangy lemonade, bursting with fresh citrus flavor in every sip. Perfect for summer heat."
            }
            : {
                key: "chocoMilk",
                name: "Hot Choco Milk",
                img: ChocoMilk,
                desc: "Rich and creamy hot chocolate milk, blending smooth cocoa with velvety warmth. Perfect for cozy moments."
            };

    return [...baseItems, seasonalItem];
}