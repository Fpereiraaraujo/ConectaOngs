import useUserInfo from "../hooks/useUserInfo";
import {useState} from "react";
import axios from "axios";
import Avatar from "./Avatar";
import Upload from "./Upload";
import {PulseLoader} from "react-spinners";
import Card from "./Card";

export default function PostForm({onPost,compact,parent,placeholder='What\'s happening?'}) {
  const {userInfo,status} = useUserInfo();
  
  const [text,setText] = useState('');
  const [images,setImages] = useState([]);

  async function handlePostSubmit(e) {
    e.preventDefault();
    await axios.post('/api/posts', {text,parent,images});
    setText('');
    setImages([]);
    if(onPost) {
      onPost();
    }
  }

  if (status === 'loading') {
    return '';
  }
  return (
    <Card>
    <form className="mx-5" onSubmit={handlePostSubmit}>
      <div className={(compact ? 'items-center' : '') + " flex"}>
        <div className="">
          <Avatar src={userInfo?.image} />
        </div>
        <div className="grow pl-2">
          <Upload
            onUploadFinish={src => setImages(prev => [...prev,src])}
          >{({isUploading}) => (
            <div>
              <textarea className={(compact ? 'h-10 mt-1' : 'h-12')+" w-full p-3 h-14"}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder={placeholder} />
              <div className="flex -mx-2">
                {images.length > 0 && images.map(img => (
                  <div className="h-24 m-2" key={img}>
                    <img src={img} alt="" className="h-24" />
                  </div>
                ))}
                {isUploading && (
                  <div className="h-24 w-24 m-2 bg-twitterBorder flex items-center justify-center">
                    <PulseLoader size={14} color={'#fff'} />
                  </div>
                )}
              </div>
            </div>
          )}</Upload>
          {!compact && (
            <div >
            <div className="flex gap-5 items-center mt-2">
              <div>
          <label className="flex gap-1">
            <input type="file" className="hidden" multiple />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="hidden md:block"></span>
          </label>
        </div>Fotos
          <div className="grow text-right">
              <button className="bg-twitterBlue text-white px-6 py-1 rounded-md">Postar</button>
          </div>
            </div>
            </div>
          )}
        </div>
        {compact && (
          <div className="pl-2">
            <button className="bg-twitterBlue  text-white px-6 py-1 rounded-md">Comentar</button>
          </div>
        )}
      </div>
    </form>
    </Card>
  );
}