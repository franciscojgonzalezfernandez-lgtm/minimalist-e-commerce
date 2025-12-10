import { teslaApi } from "@/api/TesloApi";

export const deleteProductAction = async (id: string): Promise<boolean> => {
  try {
    await teslaApi.delete(`/products/${id}`, {
      data: { id },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
