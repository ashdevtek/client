import { nanoid } from "nanoid";

export async function fetchKnowledgeSource() {
  try {
    const url = `${process.env.NEXT_PUBLIC_CHAT_SERVER_URL}/v1/knowledgesource`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const filesWithIds = data.files.map((file: any) => ({
      name: file,
      id: nanoid(),
    }));
    return filesWithIds;
  } catch (error) {
    console.error("Error fetching files:", error);
  }
}

export async function uploadFile(formData:FormData) {
  const url = `${process.env.NEXT_PUBLIC_CHAT_SERVER_URL}/v1/uploadfile/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });
  return response;
}
