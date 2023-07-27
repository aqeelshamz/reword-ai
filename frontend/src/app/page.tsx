"use client";
import serverURL from "@/utils/utils";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { FiPlus, FiMoreHorizontal, FiSettings, FiUser, FiCpu, FiLogOut, FiCopy, FiMoon, FiImage } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [text, setText] = useState<string>("");
  const [tone, setTone] = useState<number>(0);
  const [length, setLength] = useState<number>(1);
  const [rewritesCount, setRewritesCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [rewrites, setRewrites] = useState<string[]>([""]);
  const rewritesModalRef = useRef<null | HTMLLabelElement>(null);
  const moreModalRef = useRef<null | HTMLLabelElement>(null);
  const [moreMenuOpen, setMoreMenuOpen] = useState<boolean>(false);
  const [generateTextWithAIPrompt, setGenerateTextWithAIPrompt] = useState<string>("");

  const [theme, setTheme] = useState<null | any | string>(
    "light"
  );

  const toggleDarkMode = (x: any) => {
    if (x.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  const rewrite = async () => {
    if (text.length < 3 || loading) return;

    setLoading(true);
    const config = {
      method: "POST",
      url: `${serverURL}/rewordai/rewrite`,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        text: text,
        tone: tone,
        length: length,
        rewrites: rewritesCount
      }
    };

    axios(config)
      .then((response) => {
        setLoading(false);
        setRewrites(response.data);
        rewritesModalRef.current?.click();
        console.log(response)
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Something went wrong!");
      });
  }

  const doMore = async (type: number) => {
    const doMoreType = ["continue-writing", "summarise", "explain", "give-example", "counterargument", "define", "shorten", "expand"][type];
    if (text.length < 3 || loading) return;

    setLoading(true);
    const config = {
      method: "POST",
      url: `${serverURL}/rewordai/${doMoreType}`,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        text: text,
      }
    };

    axios(config)
      .then((response) => {
        setLoading(false);
        setText(response.data);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Something went wrong!");
      });
  }

  const generateTextWithAI = async () => {
    if (generateTextWithAIPrompt.length < 5 || loading) return;

    setLoading(true);
    const config = {
      method: "POST",
      url: `${serverURL}/rewordai/generate-text-with-ai`,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
      data: {
        prompt: generateTextWithAIPrompt,
      }
    };

    axios(config)
      .then((response) => {
        setLoading(false);
        setText(response.data);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Something went wrong!");
      });
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTheme(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
      if (!localStorage.getItem("token")) {
        window.location.href = "/login";
      }
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme: string = localStorage.getItem("theme")!.toString();
    document.querySelector("html")!.setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <main className="flex bg-base-100 h-screen w-screen p-2" onClick={() => {
      if (moreMenuOpen) setMoreMenuOpen(false);
    }}>
      {/* Sidebar */}
      <div className='flex flex-col p-5 min-w-[275px] max-w-[15vw] h-full rounded-md max-sm:hidden'>
        <p className="mb-5 font-semibold">📝 RewordAI ✨</p>
        <label className='btn btn-primary' htmlFor='newchat_modal'><FiPlus /> NEW DOCUMENT</label>
        <div className='p-0 my-2 h-full w-full overflow-hidden hover:overflow-y-auto'>

        </div>
        <hr />
        <div tabIndex={0} className='cursor-pointer dropdown dropdown-top flex items-center mt-2 hover:bg-base-200 p-2 rounded-lg'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center'>
              <div className="avatar placeholder mr-2">
                <div className="bg-blue-700 text-white mask mask-squircle w-10">
                  <span><FiUser /></span>
                </div>
              </div>
              <p className='font-semibold'>User</p>
            </div>
            <FiMoreHorizontal />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-2">
            <label htmlFor='settings_modal'><li className='flex'><p><FiSettings />Settings</p></li></label>
            <hr className='my-2' />
            <li className='flex' onClick={() => {
              localStorage.clear()
              window.location.href = "/login";
            }}><p><FiLogOut className="text-red-600" />Logout</p></li>
          </ul>
        </div>
      </div>
      {/* Main */}
      <div className='flex flex-col items-center justify-center ml-2 p-5 border-base-300 border-[1px] w-full h-full rounded-lg 2xl:items-center'>
        <div className="flex flex-col w-full max-w-[50vw]">
          <div className="flex mb-4 items-center">
            <p className="mr-2 font-semibold">Tone: </p>
            {
              ["✨ Normal", "👟 Casual", "💼 Formal", "📝 Academic", "📖 Creative"].map((e, i: number) => {
                return <button className={'btn btn-sm mr-2 ' + (tone == i ? 'btn-primary' : '')} onClick={() => setTone(i)}>{e}</button>
              })
            }
          </div>
          <div className="flex mb-4 items-center">
            <p className="mr-2 font-semibold">Length: </p>
            {
              ["📝 Short", "📄 Medium", "📚 Long"].map((e, i: number) => {
                return <button className={'btn btn-sm mr-2 ' + (length == i ? 'btn-primary' : '')} onClick={() => setLength(i)}>{e}</button>
              })
            }
          </div>
          <div className="flex mb-3 items-center">
            <p className="mr-2 font-semibold">Rewrites: </p>
            <input type="number" className="input input-bordered w-20" onChange={(x) => setRewritesCount(parseInt(x.target.value))} value={rewritesCount} min={1} max={10} placeholder="1" />
          </div>
          <textarea className='bg-base-100 mt-5 text-md min-h-[25vh] p-2 rounded-md outline-none border-2 border-base-300' onChange={(x) => setText(x.target.value)} value={text} placeholder='Write or paste your text here...' autoFocus></textarea>
          <div className="flex mt-2"><label htmlFor="generatetext_modal" className="btn btn-xs">Generate text with AI</label></div>
          <div className="mt-7 flex items-center">
            <button className={'btn btn-primary ' + (text.length < 3 || loading ? "opacity-50" : "")} onClick={() => rewrite()}>{loading ? <span className="loading loading-spinner"></span> : "📝 "}Rewrite</button>
            <details className="dropdown dropdown-top" onToggle={(x) => setMoreMenuOpen(x.currentTarget.open)} open={moreMenuOpen}>
              <summary tabIndex={0} className='btn ml-2'>✨ More</summary>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li onClick={() => { doMore(0); setMoreMenuOpen(false) }}><a>➡️ Continue Writing</a></li>
                <li onClick={() => { doMore(1); setMoreMenuOpen(false) }}><a>📝 Summarise</a></li>
                <li onClick={() => { doMore(2); setMoreMenuOpen(false) }}><a>🧠 Explain</a></li>
                <li onClick={() => { doMore(3); setMoreMenuOpen(false) }}><a>☝️ Give an example</a></li>
                <li onClick={() => { doMore(4); setMoreMenuOpen(false) }}><a>🎯 Counterargument</a></li>
                <li onClick={() => { doMore(5); setMoreMenuOpen(false) }}><a>📖 Define</a></li>
                <li onClick={() => { doMore(6); setMoreMenuOpen(false) }}><a>✏️ Shorten</a></li>
                <li onClick={() => { doMore(7); setMoreMenuOpen(false) }}><a>📚 Expand</a></li>
              </ul>
            </details>
          </div>
        </div>
        {/* Rewrites Modal */}
        <label ref={rewritesModalRef} htmlFor="rewrites_modal" hidden></label>
        <input type="checkbox" id="rewrites_modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">✨📝 Rewrites ({rewrites.length})</h3>
            <div className="max-h-[40vh] overflow-y-auto">
              {rewrites.map((e, i: number) => {
                return <div className="hover:bg-base-200 rounded-lg px-2 cursor-pointer" onClick={() => { setText(e); }}>
                  <p className="py-4">{e}<button className="btn btn-sm ml-2" onClick={() => {
                    navigator.clipboard.writeText(e);
                    toast.success("Copied to clipboard!");
                  }}><FiCopy /></button></p>
                </div>
              })}
            </div>
            <div className="modal-action">
              <label htmlFor="rewrites_modal" className="btn">Close</label>
            </div>
          </div>
        </div>
        {/* More Modal */}
        <input type="checkbox" id="generatetext_modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">✨ Generate Text with AI</h3>
            <textarea className="textarea textarea-bordered w-full" placeholder="Your AI prompt" onChange={(x) => setGenerateTextWithAIPrompt(x.target.value)} value={generateTextWithAIPrompt} autoFocus></textarea>
            <div className="modal-action">
              <label htmlFor="generatetext_modal" className="btn">Close</label>
              <label htmlFor={generateTextWithAIPrompt.length > 5 ? "generatetext_modal" : ""} className={"btn btn-primary " + (generateTextWithAIPrompt.length < 5 ? "opacity-50" : "")} onClick={() => generateTextWithAI()}>✨ Generate</label>
            </div>
          </div>
          <label ref={moreModalRef} className="modal-backdrop" htmlFor="generatetext_modal">Close</label>
        </div>
        {/* Settings Modal */}
        <input type="checkbox" id="settings_modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="flex items-center font-bold text-lg"><FiSettings className="mr-1" /> Settings</h3>
            <div className="form-control">
              <label className="label cursor-pointer">
                <p className="flex items-center py-4"><FiMoon className='mr-2' />Dark Theme</p>
                <input type="checkbox" className="toggle" checked={theme === "dark"} onChange={(x) => toggleDarkMode(x)} />
              </label>
            </div>
            <div className="modal-action">
              <label htmlFor="settings_modal" className="btn">Close</label>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="settings_modal">Cancel</label>
        </div>
      </div>
      <ToastContainer />
    </main>
  )
}
