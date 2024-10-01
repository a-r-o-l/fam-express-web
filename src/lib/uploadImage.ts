import axios from "axios";

const uri = import.meta.env.VITE_API_URL;

export const uploadImage = async (file: File, accessToken?: string) => {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${uri}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res) {
        return res;
      }
      return false;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  } else {
    console.error("No file selected");
  }
};
