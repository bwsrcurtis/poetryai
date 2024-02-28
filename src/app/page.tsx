"use client";
import { useState } from "react";
import parse from 'html-react-parser';
import Image from "next/image";

export default function Home() {
  const [theInput, setTheInput] = useState("");
  const [typeOfPoem, setTypeOfPoem] = useState("")
  const [moodOfPoem, setMoodOfPoem] = useState("")
  const [topicOfPoem, setTopicOfPoem] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Tell me the type of poem you would like me to write, how you would like it to make you feel, and what it should be about.",
    },
  ]);
  const [output, setOutput] = useState("")
  // below this

  
  const callGetResponse = async () => {
    setIsLoading(true);
    let temp = messages;
    temp.push({ role: "user", content: `Write me a poem with a title with these guidelines. Output title as html h1 tag and lines as p tags. 
    Type: ${typeOfPoem} Subject: ${topicOfPoem}  Mood: ${moodOfPoem}` });
    setMessages(temp);
    setTypeOfPoem("");
    setMoodOfPoem("");
    setTopicOfPoem("");
    console.log("Calling OpenAI...");

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.content);

    // setMessages((prevMessages) => [...prevMessages, output]);
    setOutput(output.content)
    setIsLoading(false);
  };

  const Submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callGetResponse();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden">
      <Image src='/poetryAILogo.svg' width={150} height={150} alt="Logo" className='absolute top-0 -z-10'/>
      <h1 className="text-6xl items-center justify-center font-mono text-tertiary text-center tracking-wider pt-9 h-36 bg-background/15 w-full">Poetry.AI</h1>

      <div className="flex py-2  h-[35rem] w-min[min-content] w-max[1500px] flex-col font-sans items-center bg-tertiary/25 rounded-xl drop-shadow-xl">
        <div className=" h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
          {messages.map((e) => {
            return (
              <div
                key={e.content}
                className={`w-[80%] rounded-md px-4 py-3 h-min ${
                  e.role === "assistant"
                    ? "self-center  bg-primary/75 text-gray-800"
                    : "hidden"
                } `}
              >
                {e.content}
              </div>
            );
          })}
              <div
                className={`w-[80%] rounded-md px-4 py-3 h-min ${
                  output != ""
                  ? "self-center bg-secondary/25 text-black text-center"
                  : "hidden"
                } `}
              >
                {parse(output)}
                
              </div>
            
          


          {isLoading ? (
            <div className="self-center  bg-background text-gray-800 w-max max-w-[18rem] rounded-md px-4 py-3 h-min">
              *thinking*
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="relative  w-[fit-content] bottom-4 flex justify-evenly sm:gap-1">
          <textarea
            value={typeOfPoem}
            onChange={(event) => setTypeOfPoem(event.target.value)}
            placeholder="Type"
            className="w-[fit-content] h-10 px-3 py-2
          resize-none overflow-y-auto text-black bg-gray-300 rounded outline-none"
            onKeyDown={Submit}
          />
          <textarea
            value={moodOfPoem}
            onChange={(event) => setMoodOfPoem(event.target.value)}
            placeholder="Mood"
            className="w-[fit-content] h-10 px-3 py-2
          resize-none overflow-y-auto text-black bg-gray-300 rounded outline-none"
            onKeyDown={Submit}
          />
          <textarea
            value={topicOfPoem}
            onChange={(event) => setTopicOfPoem(event.target.value)}
            placeholder="Subject"
            className="w-[fit-content] h-10 px-3 py-2
          resize-none overflow-y-auto text-black bg-gray-300 rounded outline-none"
            onKeyDown={Submit}
          />
        </div>
          <button
            onClick={callGetResponse}
            className="w-[fit-content] bg-background text-text px-4 py-2 rounded mb-2 hover:bg-tertiary hover:text-background hover:px-6"
          >
            Generate
          </button>
      </div>

      <div></div>
    </main>
  );
}
