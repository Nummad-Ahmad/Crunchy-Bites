import CheesyFries from '../assets/images/chessyfries.jpg';
import FrenchFries from '../assets/images/frenchfries.jpg';
import Samosa from '../assets/images/samosa.jpg';
import Lemonade from '../assets/images/lemonade.jpg';
import ChocoMilk from '../assets/images/choco.jpg';

export function getFoodItems(month) {
    const foodItems = [
        {
            name: "Samosa",
            img: Samosa,
            desc: "Crispy and flavorful samosas filled with spiced potatoes, wrapped in a golden, flaky crust. A perfect snack."
        },
        {
            name: "Cheesy Fries",
            img: CheesyFries,
            desc: "Our cheesy and crispy fries loaded with rich, melted cheese and creamy mayo. A perfect blend of crunch and cheesy goodness."
        },
        {
            name: "French Fries",
            img: FrenchFries,
            desc: "Crispy and golden, our French fries are perfectly seasoned and fried to perfection. Light, crunchy and quick snack."
        }
    ];

    const seasonalItem =
        (month <= 10 && month > 2)
            ? {
                name: "Lemonade",
                img: Lemonade,
                desc: "Refreshingly sweet and tangy lemonade, bursting with fresh citrus flavor in every sip. Perfect for battling the summer heat."
            }
            : {
                name: "Hot Choco Milk",
                img: ChocoMilk,
                desc: "Rich and creamy hot chocolate milk, blending smooth cocoa with velvety warmth. Perfect for cozy moments and chilly days."
            };

    return [...foodItems, seasonalItem];
}