import dotenv from 'dotenv';

dotenv.config()
export interface Message {
  text: string
  sender: string
  loading?: boolean
}

export interface ApiResponse {
  status?: number
  text?: string
  citation?: Array<Citation>
}

export interface Citation {
  file_name: string;
  file_path: string;
  page_label: string;
}


export async function fetchAIResponse(
  query: string, type: string
): Promise<ReadableStream | null> {
  const url = `${process.env.NEXT_PUBLIC_CHAT_SERVER_URL}/v1/ask`;
  const body: object = {
    type, query
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.body
  
}

export async function fetchAICitations(input: string): Promise<ApiResponse> {
  const url = `${process.env.NEXT_PUBLIC_CHAT_SERVER_URL}/v1/ask`;
  try {
    const body:object = {
      type: 'non-streaming',  // citations work only with non-streaming
      query: input
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(response);

    return {
      // status: response.status,
      // text: data.response,
      citation: data.citation 
    };
  } catch (error) {
    console.error("Error fetching data from endpoint:", error);
    throw error;
  }
}