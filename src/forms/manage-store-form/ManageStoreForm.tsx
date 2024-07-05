import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Store } from "@/types";
import { useEffect } from "react";

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "Store name is required",
    }),
    city: z.string({
      required_error: "City is required",
    }),
    country: z.string({
      required_error: "Country is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "Delivery price is required",
      invalid_type_error: "Must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated delivery date is required",
      invalid_type_error: "Must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "Please select at least one cuisine",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required"),
        imageFile: z.instanceof(File).optional(),
        imageUrl: z.string().optional(),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type StoreFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Store;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageStoreForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<StoreFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );

    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedStore = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedStore);
  }, [form, restaurant]);

  const onSubmit = async (formDataJson: StoreFormData) => {
    console.log("Form Data JSON:", formDataJson);  // Debug log
  
    const formData = new FormData();
  
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
    formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());
  
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
  
    formDataJson.menuItems.forEach((menuItem: any, index) => {
      console.log(`Processing menu item ${index}:`, menuItem);  // Debug log
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
      console.log(menuItem.imageFile, "Image File");  // Debug log
  
      if (menuItem.imageFile instanceof File) {
        formData.append(`menuItems[${index}][imageFile]`, menuItem.imageFile);
      } else if (menuItem.imageUrl) {
        formData.append(`menuItems[${index}][imageUrl]`, menuItem.imageUrl);
      }
    });
  
    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageStoreForm;
