import { Order, Store } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyStore = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyStoreRequest = async (): Promise<Store> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/store`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyStore",
    getMyStoreRequest
  );

  return { restaurant, isLoading };
};

export const useCreateMyStore = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyStoreRequest = async (
    restaurantFormData: FormData
  ): Promise<Store> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/store`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const {
    mutate: createStore,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyStoreRequest);

  if (isSuccess) {
    toast.success("Store created!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { createStore, isLoading };
};

export const useUpdateMyStore = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateStoreRequest = async (
    restaurantFormData: FormData
  ): Promise<Store> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/store`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  const {
    mutate: updateStore,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateStoreRequest);

  if (isSuccess) {
    toast.success("Details Updated");
  }

  if (error) {
    toast.error("Unable to update the details");
  }

  return { updateStore, isLoading };
};

export const useGetMyStoreOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyStoreOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/store/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyStoreOrders",
    getMyStoreOrdersRequest
  );

  return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyStoreOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyStoreOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/store/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateStoreStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyStoreOrder);

  if (isSuccess) {
    toast.success("Order updated");
  }

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  return { updateStoreStatus, isLoading };
};
