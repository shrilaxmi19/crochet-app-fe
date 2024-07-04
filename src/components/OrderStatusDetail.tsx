import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  const getTotalCost = () => {
    if (order.totalAmount && typeof order.totalAmount === "number") {
      return (order.totalAmount / 100).toFixed(2);
    } else {
      const totalAmount = order.cartItems.reduce((total, item: any) => {
        const menuItem = order.restaurant.menuItems.find(
          (menuItem) => menuItem._id === item.menuItemId
        );
        return total + (menuItem ? menuItem.price * item.quantity : 0);
      }, 0);
      const totalWithDelivery = totalAmount + order.restaurant.deliveryPrice;
      return (totalWithDelivery / 100).toFixed(2);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your Order</span>
        <ul>
          {order.cartItems.map((item) => (
            <li key={item._id}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>₹{getTotalCost()}</span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
