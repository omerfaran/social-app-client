import axios from "axios";

const uploadPic = async (media) => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "social_media");
    form.append("cloud_name", "indersingh");

    const res = await axios.post(process.env.CLOUDINARY_URL, form);
    return res.data.url.replace("http", "https");
  } catch (error) {
    console.log(error, "error");
    return;
  }
};

export default uploadPic;
