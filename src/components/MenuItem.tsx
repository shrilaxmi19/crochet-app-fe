import { MenuItem } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";

type Props = {
  menuItem: MenuItem;
  addToCart: () => void;
};

const MenuItems = ({ menuItem, addToCart }: Props) => {
  console.log("MenuItems received menuItem:", menuItem);

  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ₹{(menuItem.price / 100).toFixed(2)}
        {menuItem.imageUrl ? (
          <div>
          
            <AspectRatio ratio={16 / 9} className="mt-4">
              <img
                src={menuItem.imageUrl}
                alt={menuItem.name}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        ) : (
          <p>No image available</p>
        )}
      </CardContent>
    </Card>
  );
};


export default MenuItems;
