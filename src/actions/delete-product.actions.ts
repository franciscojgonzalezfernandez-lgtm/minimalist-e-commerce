import { teslaApi } from "@/api/TesloApi";

export const deleteProductAction = async (id: string): Promise<boolean> => {
  try {
    const { data } = await teslaApi.delete(`/products/${id}`, {
      data: { id },
    });
    return true;
  } catch (err) {
    console.log(err);
  }
};
