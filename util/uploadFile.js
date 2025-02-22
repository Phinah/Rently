const unsignedUploadPreset = "ywb3cnzo";

// *********** Upload file to Cloudinary ******************** //
export default async function uploadFile(file) {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  const fd = new FormData();
  fd.append("upload_preset", unsignedUploadPreset);
  fd.append("tags", "browser_upload"); // Optional - add tags for image admin in Cloudinary
  fd.append("file", file);

  let response = await fetch(url, {
    method: "POST",
    body: fd,
  });
  let data = await response.json();
  return data.secure_url;
}
