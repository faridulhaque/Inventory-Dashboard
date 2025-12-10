export const getToken = (): string => {
  const token = localStorage.getItem("token") || "";
  if (token) return token;
  else return "";
};

export const uploadImage = async (file: File) => {
  const fd = new FormData();
  fd.append("image", file);
  fd.append("name", file.name);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: fd,
    }
  );

  const data = await res.json();

  if (!data.success) {
    console.error("Upload error:", data);
    throw new Error("Failed to upload");
  }

  return data.data.url;
};
